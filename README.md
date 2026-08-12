# github-skills 📚

My completed [GitHub Skills](https://learn.github.com/skills) exercises.
All exercises are stored as directories with their full commit history (extracted via [git-filter-repo](https://github.com/newren/git-filter-repo)).

## ✨ Features

- Contains all completed GitHub Skills exercises
- Each exercise stored in its own directory
- Full commit history preserved
- Original structure and progression of each module retained

## 🛠 Requirements

Required only if you want to use the migration script.

- uv (with a Python runtime)
- git
- Access to source and destination repositories

## 🚀 Quick Start

### Clone the repo and explore the exercises

```bash
git clone https://github.com/felixnagele/github-skills.git
cd github-skills
```

## 📦 Migration tool

A helper script to import a source repository (including full commit history) into a monorepo subdirectory using git-filter-repo.

### Setup

```bash
uv sync
```

### Usage

```bash
uv run python migrate_skill.py --monorepo {monorepo URL} --source {source repo URL}
```

### Options

- --monorepo - destination monorepo URL
- --source - source repo URL
- --branch - optional: source branch (auto-detected otherwise)
- --dry-run - print commands only; no changes, no files created
- --no-push - merge locally, skip pushing to origin (work directory is kept)
- --keep-work-dir - keep the work directory even after a successful push

The script works in a temporary system directory that is deleted automatically after a successful push. It is kept when a step fails (so you can resolve it), when using --no-push (the local merge is the result), or with --keep-work-dir; the path is printed in those cases.

## 📝 Note

This is a personal repository for tracking my progress and archiving my solutions. It is not intended for external contributions.
