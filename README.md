# Jake's Birthday Week — A Star Wars Story 🌌

A birthday-week advent calendar for Jake: seven blast doors, one for each day
from **August 24 to August 30** (the birthday itself). Each door unlocks at
midnight on its date and reveals something different — photos, a quiz, a
holographic love letter, a date-night mission briefing, a coupon book, and a
grand fireworks finale.

## Run it

No installation, no build step. Just open `index.html` in a browser
(double-click it), or run a tiny local server if you prefer:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## The seven doors

| Date   | Episode | Title                      | What's inside                          |
| ------ | ------- | -------------------------- | -------------------------------------- |
| Aug 24 | I       | The Birthday Week Awakens  | Opening announcement + photo gallery   |
| Aug 25 | II      | Attack of the Clones       | Childhood / baby photos of Jake        |
| Aug 26 | III     | The Jedi Trials            | Interactive trivia quiz with ranks     |
| Aug 27 | IV      | A New Hope                 | Holographic love letter                |
| Aug 28 | V       | The Cantina Strikes Back   | Date-night mission briefing            |
| Aug 29 | VI      | The Fleet Arrives          | Relatives' ships with personal messages + countdown to midnight |
| Aug 30 | VII     | The Rise of Jake           | HAPPY BIRTHDAY finale with fireworks + coupon book |

## Editing the content

**Everything lives in `content.js`** — open it in any text editor. Search for
`[EDIT ME]` to find the spots waiting for your own words (the love letter, the
date-night plan, the finale message). Every title, quiz question, coupon and
caption can be changed there too. `main.js` and `styles.css` never need
touching.

To add photos, see [`assets/photos/README.md`](assets/photos/README.md).

## Secret preview tricks (don't show Jake 😉)

Doors unlock by the viewer's local date, but you can test everything early:

| URL                          | What it does                                  |
| ---------------------------- | --------------------------------------------- |
| `index.html?preview=1`       | Unlocks every door (shows a warning banner)   |
| `index.html?date=2026-08-27` | Pretends today is that date                   |
| `index.html?nointro=1`       | Skips the opening crawl                       |
| `index.html?preview=1&open=4` | Jumps straight into a given day's door       |

They combine: `index.html?preview=1&nointro=1`. The opening crawl plays once
per browser session; there's a "Replay opening crawl" button in the footer.

## Putting it online

Any static host works. Easiest options:

- **Netlify Drop** — go to <https://app.netlify.com/drop> and drag this whole
  folder onto the page. Done — you get a link to send Jake. (Free, no account
  needed to start; make an account to keep the link permanent and pick a nicer
  URL like `jakes-birthday-week.netlify.app`.)
- **GitHub Pages** — push this repo to GitHub, then in the repo: Settings →
  Pages → deploy from the `main` branch. The site appears at
  `https://<username>.github.io/<repo>/`.
- **Vercel** — `npx vercel` in this folder, or import the repo at vercel.com.

Note: doors unlock at midnight in the *viewer's* timezone — perfect as long as
Jake opens it from home. 🚀
