# patel-aaditya.github.io

Personal portfolio + blog. Portfolio at `/`, Zola blog at `/blog/`.

## Repo structure after migration

```
patel-aaditya.github.io/
├── portfolio/          ← this React app (contents of this zip)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── blog/               ← your existing Zola blog (clone from old repo)
│   ├── content/
│   ├── config.toml
│   └── ...
└── .github/
    └── workflows/
        └── deploy.yml  ← builds both, merges, deploys
```

## How to migrate — exact steps

### 1. Clone your existing blog repo locally
```bash
git clone https://github.com/patel-aaditya/patel-aaditya.github.io old-blog
```

### 2. Create a fresh local folder
```bash
mkdir patel-aaditya.github.io
cd patel-aaditya.github.io
git init
git branch -M main
```

### 3. Add the portfolio
```bash
# Unzip the portfolio zip into a folder called 'portfolio'
unzip portfolio-v2.zip
mv portfolio-v2 portfolio
```

### 4. Add the blog
```bash
# Copy your old Zola blog into a folder called 'blog'
cp -r ../old-blog blog
# Remove the old git history from the blog copy
rm -rf blog/.git
# Remove the old GitHub Actions from the blog copy
rm -rf blog/.github
```

### 5. Update your blog's config.toml base URL
Open `blog/config.toml` and change:
```toml
# Old:
base_url = "https://patel-aaditya.github.io"
# New:
base_url = "https://patel-aaditya.github.io/blog"
```

### 6. Push everything
```bash
git add .
git commit -m "feat: portfolio + blog unified"
git remote add origin https://github.com/patel-aaditya/patel-aaditya.github.io.git
git push -u origin main --force
```

### 7. Enable GitHub Pages
- Go to your repo → **Settings → Pages**
- Source: **GitHub Actions**
- Save

That's it. GitHub Actions will build the React portfolio and the Zola blog separately, merge them into one `dist/`, and deploy. Your site will be:

| URL | Content |
|-----|---------|
| `patel-aaditya.github.io` | Portfolio (this React app) |
| `patel-aaditya.github.io/blog` | Your existing Zola blog |
| `patel-aaditya.github.io/blog/the-empty-podium` | Individual posts |

## Local dev (portfolio only)
```bash
cd portfolio
npm install
npm run dev
```

## Updating blog posts
Edit markdown files in `blog/content/` as you always did. Push to main — auto-deploys.

## Updating portfolio content
Edit `portfolio/src/App.jsx` — the `PROJECTS` and `BLOG_POSTS` arrays at the top.
