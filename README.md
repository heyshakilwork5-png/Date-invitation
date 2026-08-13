# Romantic Interactive Date Invitation Website

A 14-scene romantic, interactive date invitation website built with **HTML5, CSS3, and Vanilla JavaScript**.

## Folder Structure

```text
date-invitation/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
│
├── js/
│   ├── main.js
│   ├── calendar.js
│   ├── selection.js
│   ├── no-button.js
│   ├── confetti.js
│   └── animations.js
│
└── images/
    ├── hero.jpg
    ├── first-meeting.jpg
    ├── memory-1.jpg
    ├── memory-2.jpg
    ├── memory-3.jpg
    ├── memory-4.jpg
    ├── memory-5.jpg
    └── memory-6.jpg
```

## Setup Instructions

1. Keep the folder structure unchanged.
2. Open `index.html` directly in a browser.
3. For best local testing, use VS Code Live Server (optional).

## How To Run Locally

- Double-click `index.html`  
or  
- Use a local static server (Live Server / `python -m http.server`).

## Customization Guide

Edit **`js/main.js`** in the `CONFIG` object.

### Replace Person Name / Title

- `CONFIG.name`
- `CONFIG.title`

### Replace Main Messages

- `CONFIG.letterText`
- `CONFIG.reasons`

### Replace Music

- Put your music file in `audio/` (example: `audio/music.mp3`)
- Set:
  - `CONFIG.music = "audio/music.mp3"`

### Replace Photos

Replace files inside `images/`:

- `hero.jpg`
- `first-meeting.jpg`
- `memory-1.jpg` to `memory-6.jpg`

Or update image paths/captions in:

- `CONFIG.images.hero`
- `CONFIG.images.firstMeeting`
- `CONFIG.images.gallery`

### Change Available Dates

In `CONFIG`:

- `availableDates`: allow only exact dates (format `YYYY-MM-DD`)
- `unavailableDates`: block specific dates

If `availableDates` is empty, all future dates are selectable except `unavailableDates`.

### Change Time Options / Date Type Options

Edit:

- `CONFIG.times`
- `CONFIG.dateTypes`

## Deployment To GitHub Pages

1. Create a GitHub repository and upload this project.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: **main** (or your default) / root
4. Save.
5. Wait for deployment and open the generated GitHub Pages URL.

## Notes

- State is stored in `dateData` (`date`, `time`, `type`) and used in the date ticket automatically.
- Gallery uses lazy loading.
- Includes semantic HTML, keyboard-focus styles, and reduced-motion support.
