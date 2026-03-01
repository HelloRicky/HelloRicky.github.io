# Images

Asset staging area for the portfolio site. Images here may or may not be used on the site later.

## Conventions

- Organize images into **sub-folders by topic** (e.g., `images/headshot/`, `images/projects/`)
- Multiple images for the same topic go in the same sub-folder
- Optionally add a `README.md` inside each sub-folder with notes about that topic

## Structure

```
images/
  headshot/
    photo1.jpg
    photo2.jpg
    README.md       ← optional notes for this topic
  projects/
    project-a-screenshot.png
    project-a-demo.gif
  experience/
    team-photo.jpg
```

## Sub-folder README template

```markdown
---
title: Headshot
description: Professional headshots for the portfolio hero section
date: 2026-03-01
tags: [headshot, portrait]
used_in: [hero]
---

Additional notes about images in this folder.
```

### Fields

| Field | Description |
|-------|-------------|
| `title` | Human-readable name for the topic |
| `description` | One-line summary of what these images are |
| `date` | Date added (YYYY-MM-DD) |
| `tags` | Free-form labels for categorization |
| `used_in` | List of sections/pages where images are referenced (empty if unused) |
