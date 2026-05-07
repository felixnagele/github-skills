import argparse
import datetime
import os
import shlex
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def run(cmd, cwd=None, dry=False, capture=False):
    """Execute shell command with logging and optional dry-run mode."""
    disp = " ".join(shlex.quote(str(x)) for x in cmd)
    print(f"[RUN] cwd={cwd or os.getcwd()} -> {disp}")
    if dry:
        return "" if capture else 0
    if capture:
        res = subprocess.run(
            cmd,
            cwd=cwd,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        return res.stdout.strip()
    subprocess.run(cmd, cwd=cwd, check=True)
    return 0


def has_tool(name):
    """Check if command-line tool is available in PATH."""
    return shutil.which(name) is not None


def git_filter_repo_command():
    """Return a command prefix that can run git-filter-repo."""
    if has_tool("git-filter-repo"):
        return ["git-filter-repo"]
    if has_tool("uv"):
        return ["uv", "tool", "run", "git-filter-repo"]
    return None


def repo_name_from_url(url: str) -> str:
    """Extract repository name from git URL."""
    s = url.rstrip("/").split("/")[-1]
    return s[:-4] if s.endswith(".git") else s


def timestamp():
    """Generate timestamp string for backup directories."""
    return datetime.datetime.now().strftime("%Y%m%dT%H%M%S")


def main():
    """Main entry point for repository migration."""
    DEFAULT_FOLDER = "github-skills-migrate"
    DEFAULT_BRANCH = "main"
    MONOREPO_SUBDIR = "monorepo"
    MIRROR_SUFFIX = "-mirror.git"
    WORK_SUFFIX = "-work"

    parser = argparse.ArgumentParser(
        description="Migrate source repo into monorepo subfolder and push."
    )
    parser.add_argument("--monorepo", required=True, help="destination monorepo URL")
    parser.add_argument("--source", required=True, help="source repo URL")
    parser.add_argument(
        "--branch", default=None, help="optional: source branch (auto-detect otherwise)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="print commands only; no changes or pushes",
    )
    args = parser.parse_args()

    if not has_tool("git"):
        print("ERROR: git not found in PATH", file=sys.stderr)
        sys.exit(2)

    if args.dry_run:
        work_root = (
            Path(tempfile.gettempdir()) / f"{DEFAULT_FOLDER}-{timestamp()}-dry-run"
        )
    else:
        work_root = Path(tempfile.mkdtemp(prefix=f"{DEFAULT_FOLDER}-"))

    src = args.source
    monorepo = args.monorepo
    name = repo_name_from_url(src)
    folder = name
    mirror_dir = work_root / f"{name}{MIRROR_SUFFIX}"
    work_dir = work_root / f"{name}{WORK_SUFFIX}"
    monorepo_dir = work_root / MONOREPO_SUBDIR
    remote_name = name.replace("/", "_").replace(" ", "_")
    branch = args.branch
    merge_msg = f"Merge {name} into {repo_name_from_url(monorepo)}"
    filter_repo_cmd = git_filter_repo_command()
    if filter_repo_cmd is None:
        print(
            "ERROR: git-filter-repo not found. Install uv or add git-filter-repo to PATH",
            file=sys.stderr,
        )
        sys.exit(2)

    try:
        run(["git", "clone", "--mirror", src, str(mirror_dir)], dry=args.dry_run)
        run(
            ["git", "clone", "--no-local", str(mirror_dir), str(work_dir)],
            dry=args.dry_run,
        )

        if not branch:
            try:
                out = run(
                    ["git", "remote", "show", "origin"],
                    cwd=str(work_dir),
                    dry=args.dry_run,
                    capture=True,
                )
                out = out if isinstance(out, str) else ""
                for line in out.splitlines():
                    head_line = line.strip()
                    if head_line.lower().startswith("head branch:"):
                        branch = head_line.split(":", 1)[1].strip()
                        break
            except Exception:
                pass
            if not branch:
                try:
                    heads_output = run(
                        [
                            "git",
                            "for-each-ref",
                            "--format=%(refname:short)",
                            "refs/heads/",
                        ],
                        cwd=str(work_dir),
                        dry=args.dry_run,
                        capture=True,
                    )
                    heads = heads_output if isinstance(heads_output, str) else ""
                    branch = (
                        DEFAULT_BRANCH
                        if DEFAULT_BRANCH in heads.splitlines()
                        else (
                            "master"
                            if "master" in heads.splitlines()
                            else DEFAULT_BRANCH
                        )
                    )
                except Exception:
                    branch = DEFAULT_BRANCH
        print(f"[INFO] using source branch: {branch}")

        run(
            filter_repo_cmd + ["--to-subdirectory-filter", folder],
            cwd=str(work_dir),
            dry=args.dry_run,
        )
        if not args.dry_run:
            print(
                "[INFO] rewritten work copy top-level entries:",
                ", ".join(sorted([p.name for p in work_dir.iterdir()])[:20]),
            )

        run(["git", "clone", monorepo, str(monorepo_dir)], dry=args.dry_run)

        try:
            run(
                ["git", "remote", "remove", remote_name],
                cwd=str(monorepo_dir),
                dry=args.dry_run,
            )
        except subprocess.CalledProcessError:
            pass
        run(
            ["git", "remote", "add", remote_name, str(work_dir)],
            cwd=str(monorepo_dir),
            dry=args.dry_run,
        )
        run(
            ["git", "fetch", remote_name, "--tags"],
            cwd=str(monorepo_dir),
            dry=args.dry_run,
        )

        try:
            mono_branch = run(
                ["git", "rev-parse", "--abbrev-ref", "HEAD"],
                cwd=str(monorepo_dir),
                dry=args.dry_run,
                capture=True,
            )
            mono_branch = mono_branch or DEFAULT_BRANCH
        except Exception:
            mono_branch = DEFAULT_BRANCH
        print(f"[INFO] merging into monorepo branch: {mono_branch}")

        run(["git", "checkout", mono_branch], cwd=str(monorepo_dir), dry=args.dry_run)
        try:
            run(
                [
                    "git",
                    "merge",
                    f"{remote_name}/{branch}",
                    "--allow-unrelated-histories",
                    "-m",
                    merge_msg,
                ],
                cwd=str(monorepo_dir),
                dry=args.dry_run,
            )
        except subprocess.CalledProcessError:
            print(
                "[ERROR] Merge conflicts. Resolve manually in:",
                monorepo_dir,
                file=sys.stderr,
            )
            print(
                "Suggested: cd",
                monorepo_dir,
                "&& git status && resolve && git add && git commit",
                file=sys.stderr,
            )
            sys.exit(5)

        if not args.dry_run:
            print("[INFO] pushing branch and tags to origin...")
            run(
                ["git", "push", "origin", mono_branch], cwd=str(monorepo_dir), dry=False
            )
            run(["git", "push", "origin", "--tags"], cwd=str(monorepo_dir), dry=False)

        print("\n[SUCCESS] Completed and pushed.")
        print("Local working directory:", work_root)
        print("Mirror:", mirror_dir)
        print("Work copy (rewritten):", work_dir)
        print("Monorepo:", monorepo_dir)
        print("\nDO NOT delete source repo until you verified online.")

    except subprocess.CalledProcessError as e:
        print("\n[ERROR] git command failed:", e, file=sys.stderr)
        print("Inspect working dir:", work_root, file=sys.stderr)
        sys.exit(10)


if __name__ == "__main__":
    main()
