# CLAUDE.md — Agent Instructions

Instructions for AI coding agents (Claude Code, Codex, etc.) working on this repo.

## Image Handling

**Always optimize images with Sharp before committing.**

```bash
npx sharp-cli --input path/to/image.jpg \
  --output path/to/image.jpg \
  --quality 80 --progressive
```

- Use quality 80 for JPEGs with progressive encoding
- Resize images wider than 1920px
- Run optimization on ANY new image added to the repo
- No exceptions — unoptimized images slow down the site

## Repo Info

- **Live site:** https://ricky-zheng.com
- **Hosted on:** GitHub Pages
- **Stack:** Static HTML/CSS/JS
