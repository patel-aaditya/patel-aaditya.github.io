# Aaditya Patel, menu-hub portfolio

A game-menu style personal site. React + Vite, plain CSS, no other runtime dependencies.

## Run it

    npm install
    npm run dev        # local dev server
    npm run build      # production build into dist/

## Where things live

- `src/content/projects.js` : the project list (Projects screen)
- `src/content/profile.js`  : bio, facts, contact links (add your email in `contact`)
- `src/content/journal/*.md`: blog posts. Drop in a new .md file and it appears in the Journal.
  Front matter uses the same `+++ title / date / tags +++` block as the old Zola posts.
- `public/pdfs/`            : PDF versions of the older posts
- `src/components/Status.jsx`: the work-in-progress stats screen
- `src/components/Character.jsx`: the stand-in character on the main menu. Replace it with your own illustration; the menu's burst and the screen transitions are anchored to his mouth through `--ch`, `--cl`, `--ct` in `src/styles.css`.
- `src/components/Backdrop.jsx`: the moving blue, black and white background on the main menu (canvas, slow sine-wave ribbons in black, white and blue)
- `src/hub.css`, `src/loud.css`: main menu styling and the cut-out lettering
- `src/styles.css`          : all styling; the three moods are the `.theme-*` blocks

## Replacing the current site

1. In your repo, replace the contents of `portfolio/` with this folder (keep `.gitignore` if you like).
2. Replace `.github/workflows/deploy.yml` with `repo-files/.github/workflows/deploy.yml`.
   It builds only the React site, so Zola is no longer part of the deploy.
3. The old blog URLs (`/blog/`, `/blog/blog/<post>/`, `/blog/<post>/`) are covered by small redirect
   pages in `public/blog/` that send visitors to the matching Journal entry.
4. The `blog/` Zola folder at the repo root is no longer built. Keep it as an archive or delete it.

## Keyboard

Menu: Up/Down to select, Enter to open, 1 to 5 to jump, Esc to go back. Sound is off until switched on.
