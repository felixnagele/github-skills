"""Migrate a source skill repository into the github-skills monorepo, preserving history.

Uses git-filter-repo (--to-subdirectory-filter) to rewrite the source history so every
commit's files live under the skill's own subdirectory, then merges that history into
the monorepo and pushes the branch and tags.
"""

from __future__ import annotations

import argparse
import os
import shlex
import shutil
import stat
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urlparse

DEFAULT_BRANCHES = (
    "main",
    "master",
)  # preferred source branch names (fallback detection)
DEFAULT_BRANCH = DEFAULT_BRANCHES[0]  # ultimate fallback (dry-run / empty repo)
FILTER_REPO_CMD = ["git-filter-repo"]
GIT_URL_SCHEMES = {"http", "https", "ssh", "git", "file"}
GIT_SUFFIX = ".git"
MIRROR_SUFFIX = "-mirror.git"
WORK_PREFIX = "github-skills-migrate-"
WORK_SUFFIX = "-work"

EXIT_OK = 0
EXIT_USAGE = 2
EXIT_MERGE_CONFLICT = 5
EXIT_GIT_FAILURE = 10


class MigrationError(Exception):
    """Base class for migration failures."""


class PreflightError(MigrationError):
    """Environment or argument checks failed."""


class MergeConflictError(MigrationError):
    """The source history could not be merged without conflicts."""


class BranchNotFoundError(MigrationError):
    """The requested source branch does not exist in the source repository."""


def format_command(cmd: list[str]) -> str:
    """Format an argv list for display in a way that is safe on any OS."""
    parts = [str(x) for x in cmd]
    if os.name == "nt":
        return subprocess.list2cmdline(parts)
    return shlex.join(parts)


def run(
    cmd: list[str],
    cwd: Path | None = None,
    *,
    dry: bool = False,
    capture: bool = False,
):
    """Execute a command as an argv list, logging it first.

    In dry-run mode the command is only printed. With capture=True the stripped
    stdout is returned instead of an exit code.
    """
    print(f"[RUN] cwd={cwd or Path.cwd()} -> {format_command(cmd)}")
    if dry:
        return "" if capture else 0
    result = subprocess.run(
        cmd,
        cwd=cwd,
        check=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
        text=True,
    )
    return result.stdout.strip() if capture else 0


def has_tool(name: str) -> bool:
    """Return True if the command-line tool is available on PATH."""
    return shutil.which(name) is not None


def _git_capture(work_dir: Path, *args: str) -> str | None:
    """Run a read-only git command; return stripped stdout or None on failure."""
    try:
        return run(["git", *args], cwd=work_dir, capture=True)
    except subprocess.CalledProcessError:
        return None
    except OSError:
        return None


def repo_name_from_url(url: str) -> str:
    """Extract the repository name from a git URL or local path."""
    name = url.rstrip("/").split("/")[-1]
    name = name.removesuffix(GIT_SUFFIX)
    return name or "source"


def looks_like_git_url(url: str, dry: bool = False) -> bool:
    """Accept git URLs (scp-style or URL schemes) or existing local paths.

    In dry-run mode, non-existent local paths are also accepted so that
    commands can be previewed without creating anything.
    """
    if Path(url).exists():
        return True
    if url.startswith("git@"):
        return True
    parsed = urlparse(url)
    if parsed.scheme in GIT_URL_SCHEMES:
        return True
    return dry and ("/" in url or url.endswith(GIT_SUFFIX))


def detect_default_branch(work_dir: Path) -> str:
    """Detect the default branch of the freshly cloned work copy.

    Prefers the checked-out HEAD (always the source's default branch right
    after cloning), falls back to origin/HEAD, then to listing local heads.
    """
    out = _git_capture(work_dir, "symbolic-ref", "--short", "HEAD")
    if out:
        return out
    out = _git_capture(work_dir, "symbolic-ref", "refs/remotes/origin/HEAD")
    prefix = "refs/remotes/origin/"
    if out and out.startswith(prefix):
        return out[len(prefix) :]
    heads = _git_capture(
        work_dir, "for-each-ref", "--format=%(refname:short)", "refs/heads/"
    )
    if heads:
        lines = heads.splitlines()
        for candidate in DEFAULT_BRANCHES:
            if candidate in lines:
                return candidate
        return lines[0]
    return DEFAULT_BRANCH


@dataclass
class WorkContext:
    """Everything the migration steps need, resolved once up front."""

    source: str
    monorepo: str
    name: str
    work_root: Path
    branch: str | None = None
    dry_run: bool = False
    no_push: bool = False
    keep_work_dir: bool = False

    @property
    def folder(self) -> str:
        return self.name

    @property
    def mirror_dir(self) -> Path:
        return self.work_root / f"{self.name}{MIRROR_SUFFIX}"

    @property
    def work_dir(self) -> Path:
        return self.work_root / f"{self.name}{WORK_SUFFIX}"

    @property
    def monorepo_dir(self) -> Path:
        return self.work_root / "monorepo"

    @property
    def remote_name(self) -> str:
        return self.name.replace("/", "_").replace(" ", "_")


def preflight(ctx: WorkContext) -> None:
    """Check that the environment and arguments are usable."""
    if not has_tool("git"):
        raise PreflightError("git not found in PATH")
    if not has_tool("git-filter-repo"):
        raise PreflightError(
            "git-filter-repo not found. Run 'uv sync' and invoke via "
            "'uv run python migrate_skill.py'."
        )
    for label, target in (("source", ctx.source), ("monorepo", ctx.monorepo)):
        if not looks_like_git_url(target, dry=ctx.dry_run):
            raise PreflightError(
                f"{label} is neither a git URL nor an existing path: {target}"
            )


def warn_if_subdir_exists(ctx: WorkContext) -> None:
    """Warn about a likely conflict when the subdirectory already exists."""
    monorepo_path = Path(ctx.monorepo)
    if monorepo_path.is_dir() and (monorepo_path / ctx.folder).exists():
        print(
            f"[WARNING] subdirectory '{ctx.folder}' already exists in the monorepo; "
            "the merge may conflict.",
            file=sys.stderr,
        )


def rewrite_history(ctx: WorkContext) -> str:
    """Clone the source, rewrite its history into a subdirectory, return the branch."""
    run(["git", "clone", "--mirror", ctx.source, str(ctx.mirror_dir)], dry=ctx.dry_run)
    run(
        ["git", "clone", "--no-local", str(ctx.mirror_dir), str(ctx.work_dir)],
        dry=ctx.dry_run,
    )

    if ctx.branch:
        branch = ctx.branch
    elif ctx.dry_run:
        branch = DEFAULT_BRANCH
        print(
            f"[INFO] dry-run: assuming source branch {branch} "
            "(pass --branch to override)"
        )
    else:
        branch = detect_default_branch(ctx.work_dir)
    print(f"[INFO] using source branch: {branch}")

    run(
        FILTER_REPO_CMD + ["--to-subdirectory-filter", ctx.folder],
        cwd=ctx.work_dir,
        dry=ctx.dry_run,
    )
    if not ctx.dry_run:
        top = ", ".join(sorted(p.name for p in ctx.work_dir.iterdir())[:20])
        print(f"[INFO] rewritten work copy top-level entries: {top}")
    return branch


def merge_into_monorepo(ctx: WorkContext, branch: str) -> str:
    """Merge the rewritten history into the monorepo and return its branch."""
    run(["git", "clone", ctx.monorepo, str(ctx.monorepo_dir)], dry=ctx.dry_run)

    try:
        run(
            ["git", "remote", "remove", ctx.remote_name],
            cwd=ctx.monorepo_dir,
            dry=ctx.dry_run,
        )
    except subprocess.CalledProcessError:
        pass
    run(
        ["git", "remote", "add", ctx.remote_name, str(ctx.work_dir)],
        cwd=ctx.monorepo_dir,
        dry=ctx.dry_run,
    )
    run(
        ["git", "fetch", ctx.remote_name, "--tags"],
        cwd=ctx.monorepo_dir,
        dry=ctx.dry_run,
    )

    ref = f"refs/remotes/{ctx.remote_name}/{branch}"
    if (
        not ctx.dry_run
        and _git_capture(ctx.monorepo_dir, "show-ref", "--verify", "--quiet", ref)
        is None
    ):
        raise BranchNotFoundError(
            f"source branch '{branch}' was not found in the source repository "
            f"(checked ref {ref})"
        )

    mono_branch = _git_capture(ctx.monorepo_dir, "rev-parse", "--abbrev-ref", "HEAD")
    if not mono_branch or mono_branch == "HEAD":
        mono_branch = DEFAULT_BRANCH
    print(f"[INFO] merging into monorepo branch: {mono_branch}")

    local_ref = f"refs/heads/{mono_branch}"
    if (
        not ctx.dry_run
        and _git_capture(ctx.monorepo_dir, "show-ref", "--verify", "--quiet", local_ref)
        is None
    ):
        run(
            ["git", "checkout", "-b", mono_branch],
            cwd=ctx.monorepo_dir,
            dry=ctx.dry_run,
        )
    else:
        run(["git", "checkout", mono_branch], cwd=ctx.monorepo_dir, dry=ctx.dry_run)
    merge_msg = f"Merge {ctx.name} into {repo_name_from_url(ctx.monorepo)}"
    try:
        run(
            [
                "git",
                "merge",
                f"{ctx.remote_name}/{branch}",
                "--allow-unrelated-histories",
                "-m",
                merge_msg,
            ],
            cwd=ctx.monorepo_dir,
            dry=ctx.dry_run,
        )
    except subprocess.CalledProcessError:
        raise MergeConflictError(
            "Merge conflicts. Resolve manually in: " + str(ctx.monorepo_dir)
        ) from None
    return mono_branch


def push_monorepo(ctx: WorkContext, mono_branch: str) -> None:
    """Push the merged branch and tags, unless asked not to."""
    if ctx.no_push:
        print("[INFO] skipping push (--no-push)")
        return
    origin_ref = f"refs/remotes/origin/{mono_branch}"
    previous = _git_capture(ctx.monorepo_dir, "rev-parse", origin_ref)
    if previous:
        print(
            f"[INFO] origin/{mono_branch} is currently at {previous[:12]} "
            f"(revert if needed: git -C {ctx.monorepo_dir} push "
            f"--force-with-lease origin {previous}:refs/heads/{mono_branch})"
        )
    print("[INFO] pushing branch and tags to origin...")
    run(["git", "push", "origin", mono_branch], cwd=ctx.monorepo_dir, dry=ctx.dry_run)
    run(["git", "push", "origin", "--tags"], cwd=ctx.monorepo_dir, dry=ctx.dry_run)


def _force_rmtree(path: Path) -> None:
    """Remove a directory tree even if it contains read-only files (Windows)."""

    def on_error(func, p, exc_info):
        try:
            os.chmod(p, stat.S_IWRITE)
        except OSError:
            pass
        func(p)

    shutil.rmtree(path, onexc=on_error)


def main(argv: list[str] | None = None) -> int:
    """Entry point: migrate a source skill repo into the monorepo and push."""
    parser = argparse.ArgumentParser(
        description="Migrate a source skill repo into the github-skills monorepo and push."
    )
    parser.add_argument(
        "--monorepo", required=True, help="destination monorepo URL or path"
    )
    parser.add_argument("--source", required=True, help="source skill repo URL or path")
    parser.add_argument(
        "--branch",
        default=None,
        help="optional: source branch (auto-detected otherwise)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="print commands only; no changes or pushes",
    )
    parser.add_argument(
        "--no-push",
        action="store_true",
        help="merge locally but do not push to origin",
    )
    parser.add_argument(
        "--keep-work-dir",
        action="store_true",
        help="keep the work directory even after a successful push",
    )
    args = parser.parse_args(argv)

    ctx = WorkContext(
        source=args.source,
        monorepo=args.monorepo,
        name=repo_name_from_url(args.source),
        work_root=Path.cwd(),  # replaced below once the work root is known
        branch=args.branch,
        dry_run=args.dry_run,
        no_push=args.no_push,
        keep_work_dir=args.keep_work_dir,
    )

    try:
        preflight(ctx)
    except PreflightError as exc:
        print(f"[ERROR] {exc}", file=sys.stderr)
        return EXIT_USAGE

    if args.dry_run:
        work_root = Path.cwd()  # virtual: dry-run never creates anything
        created_root = None
    else:
        created_root = tempfile.mkdtemp(prefix=WORK_PREFIX)
        work_root = Path(created_root)
    ctx.work_root = work_root

    exit_code = EXIT_OK
    try:
        warn_if_subdir_exists(ctx)
        branch = rewrite_history(ctx)
        mono_branch = merge_into_monorepo(ctx, branch)
        push_monorepo(ctx, mono_branch)
    except MergeConflictError as exc:
        print(f"\n[ERROR] {exc}", file=sys.stderr)
        print(
            "Suggested: cd <dir> && git status && resolve && git add && git commit",
            file=sys.stderr,
        )
        exit_code = EXIT_MERGE_CONFLICT
    except BranchNotFoundError as exc:
        print(f"\n[ERROR] {exc}", file=sys.stderr)
        exit_code = EXIT_GIT_FAILURE
    except subprocess.CalledProcessError as exc:
        print(f"\n[ERROR] git command failed: {exc}", file=sys.stderr)
        exit_code = EXIT_GIT_FAILURE

    if exit_code == EXIT_OK:
        if args.dry_run:
            status = "dry run finished"
        elif args.no_push:
            status = "merged locally (--no-push)"
        else:
            status = "completed and pushed"
        print(f"\n[SUCCESS] {status}")
        print("Local working directory:", work_root)
        print("Mirror:", ctx.mirror_dir)
        print("Work copy (rewritten):", ctx.work_dir)
        print("Monorepo:", ctx.monorepo_dir)
        print(
            "\nDO NOT delete the source repo until you have verified the result online."
        )

    if created_root is not None:
        if exit_code == EXIT_OK and not args.no_push and not args.keep_work_dir:
            _force_rmtree(work_root)
            print(f"\n[INFO] cleaned up work directory: {work_root}")
        else:
            if exit_code != EXIT_OK:
                reason = "a step failed; resolve issues and delete when done"
            elif args.no_push:
                reason = "merged locally (--no-push); inspect and delete when done"
            else:
                reason = "kept via --keep-work-dir"
            print(f"\n[INFO] work directory kept: {work_root} ({reason})")

    return exit_code


if __name__ == "__main__":
    sys.exit(main())
