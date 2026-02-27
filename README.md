# rickyliu.github.io

Personal site for Ricky Liu — **"What Can This Human Do?"**

Live at: [helloricky.github.io](https://helloricky.github.io)

---

## ✏️ How to Update Content

All content lives in `index.html`. No build step. Edit and push.

### Update Contact Links

Search for these placeholders and replace with your real info:

```html
<!-- LinkedIn -->
<a href="https://linkedin.com/in/YOUR-LINKEDIN" ...>

<!-- Email -->
<a href="mailto:your@email.com" ...>
```

### Update Typewriter Phrases

Find the `phrases` array in the `<script>` section:

```js
const phrases = [
  'lead data engineering teams',
  'build AI products from zero',
  // Add or change anything here
];
```

### Add a New Project

Copy an existing `.project-card` block and change:
- `id="card-xyz"` (must be unique)
- The emoji in `.project-bg`
- `.project-type`, `.project-title-f`, `.project-back-title`, `.project-back-desc`
- The `.project-link` href
- The `flipCard('card-xyz')` call in the back button

### Change Experience Entries

Find `.timeline-item` blocks in the `#experience` section. Each has:
- `.timeline-period` — era label (NOW / CURRENT / EARLIER / ORIGIN)
- `.timeline-role` — job title
- `.timeline-company` — company / place
- `.timeline-desc` — description paragraph

### Update Skills

Find `.skill-card` blocks in `#skills`. Each has:
- `.skill-icon` — emoji
- `.skill-name` — name
- `.skill-desc` — one-sentence pitch
- `.skill-tags` — tags (copy/delete `.tag` spans)

---

## 🚀 Deploy

Just push to `main` — GitHub Pages serves `index.html` automatically.

```bash
git add .
git commit -m "update content"
git push
```

---

## 🎨 Style Variables

Colors and fonts are set as CSS variables at the top of `<style>`:

```css
:root {
  --amber: #f0a500;   /* accent color */
  --cyan:  #4dd9e0;   /* secondary accent */
  --obsidian: #080c10; /* background */
  /* ... */
}
```

---

Built with pure HTML/CSS/JS — no dependencies, no build tools, just vibes.
