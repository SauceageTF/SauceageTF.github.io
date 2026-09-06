# Rohith Vidyasakar — Portfolio

A portfolio built as a KDE Plasma desktop, themed after Breeze Dark. React, Vite, Tailwind CSS.

## The conceit

The page is a desktop: wallpaper, a window holding the content, and a Plasma panel across the
bottom.

- **Panel** — launcher, task buttons that track the section you're reading, system tray with a
  live clock and the theme switcher
- **Window** — Breeze title bar; maximise widens it, minimise and close answer back
- **Content** — About, Work, Skills, Experience and Contact as Breeze list views and dialogs
- **KRunner** — `Alt+Space` (or the magnifier in the tray) opens search: jump to a section, open a
  project, flip the theme, mute the sound, or do arithmetic the way the real KRunner does.
  Arrow keys move, Enter runs, Esc closes.

Breeze Dark is the default. The switcher flips to Breeze (light); the choice is saved to
`localStorage`. Colours come from the real Breeze palette — `#3daee9` is the only accent.

## Getting started

```bash
npm install
npm run dev
```

## Editing content

All copy lives in `src/data/`:

- Name, email, GitHub, LinkedIn, experience, education: [src/data/site.js](src/data/site.js)
- Projects: [src/data/projects.js](src/data/projects.js)
- Skills: [src/data/skills.js](src/data/skills.js)

Palette and type are the CSS variables at the top of [src/index.css](src/index.css) and the theme
in [tailwind.config.js](tailwind.config.js).

## Credits

Wallpaper by [Pawel Czerwinski](https://unsplash.com/@pawel_czerwinski) on
[Unsplash](https://unsplash.com/photos/abstract-fluid-art-with-pink-and-teal-colors-M95RTPQCB5A),
bundled at `src/assets/wallpaper.jpg`.

The startup sound is Plasma 6's login sound, `ocean/stereo/desktop-login.oga` from
[KDE's Ocean sound theme](https://invent.kde.org/plasma/ocean-sound-theme) — © 2023 Guilherme
Marçal Silva, licensed **CC-BY-SA-4.0**. It is bundled unmodified (renamed to `.ogg` for the
bundler) at `src/assets/plasma-login.ogg`; its upstream notice sits beside it in
`src/assets/plasma-login.ogg.license`, and the licence text is in
[LICENSES/CC-BY-SA-4.0.txt](LICENSES/CC-BY-SA-4.0.txt).

Browsers block audio until the visitor interacts with the page, so the sound plays on load where
it's allowed and otherwise on the first click or keypress. The speaker icon in the panel's system
tray mutes it, and that choice is remembered in `localStorage`.

Breeze is the default theme of the [KDE Plasma desktop](https://kde.org/plasma-desktop/); this is
an homage, not an official KDE project.

## Deploying to GitHub Pages

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and deploys on every push to
`main`. One-time setup after pushing the repo to GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` — the site publishes to `https://<username>.github.io/<repo>/`.

Vite uses a relative `base: './'`, so it works for both user pages and project pages.
