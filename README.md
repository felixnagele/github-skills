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

- Python
- git available in PATH
- git-filter-repo installed
- Access to source and destination repositories

## 🚀 Quick Start

### Clone the repo and explore the exercises

```bash
git clone https://github.com/felixnagele/github-skills.git
cd github-skills
```

## 📦 Migration tool

A helper script to import a source repository (including full commit history) into a monorepo subdirectory using git-filter-repo.

```bash
python github_skills_migrate.py --monorepo {monorepo URL} --source {source repo URL}
```

### Options

- --monorepo - destination monorepo URL
- --source - source repo URL
- --branch - optional: source branch (auto-detect otherwise)
- --dry-run - print commands only; no changes or pushes

## 🧪 Running Tests

No tests are available.

## Contributing, License & Support

See [Community Profile](https://github.com/felixnagele/github-skills/community) for guidelines, license, and support.
