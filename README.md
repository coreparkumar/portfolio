# coreparkumar — GitHub Pages Portfolio

A Jekyll-powered portfolio site with a data-stream background, expandable project cards, and scroll-reveal animations.

## 🚀 Deploy to GitHub Pages

### Option A — Dedicated repo (recommended)

1. Create a new GitHub repo named `portfolio` (or any name you like)
2. Push this folder's contents to the `main` branch
3. Go to **Settings → Pages → Source: Deploy from branch → main / (root)**
4. Your site goes live at `https://coreparkumar.github.io/portfolio/`

> If you use a sub-path repo (not `coreparkumar.github.io`), set `baseurl: "/portfolio"` in `_config.yml`.

### Option B — User site (coreparkumar.github.io)

1. Create a repo named exactly `coreparkumar.github.io`
2. Push these files to `main`
3. Site is live at `https://coreparkumar.github.io` — no Pages configuration needed

## 🏗️ Run Locally with Jekyll

```bash
gem install bundler jekyll
bundle init
bundle add jekyll
bundle exec jekyll serve
# → http://localhost:4000
```

## 📁 Structure

```
.
├── _config.yml          # Jekyll configuration
├── _layouts/
│   └── default.html     # Base HTML shell
├── index.html           # All content (Jekyll front matter + HTML)
└── assets/
    ├── css/main.css     # Full design system
    └── js/main.js       # Matrix canvas, accordion, scroll reveal, typed text
```

## ✏️ Customise

- **Colors** — all design tokens are CSS custom properties at the top of `main.css`
- **Projects** — each `.project-card` in `index.html` is self-contained; add/remove freely
- **Typed phrases** — edit the `phrases` array in `main.js`
- **Stats** — the four hero stats are plain HTML in the `<header>` section
