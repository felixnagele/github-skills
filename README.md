# github-skills

My completed GitHub Skills exercises

## Quick start

### Migrate a source repo into a monorepo subfolder and push

```bash
python github_skills_migrate.py --monorepo {mono repo link} --source {source repo link}
```

### Options

- --monorepo: destination monorepo URL
- --source: source repo URL
- --branch: optional: source branch (auto-detect otherwise)
- --dry-run: print commands only for review; no changes or pushes
