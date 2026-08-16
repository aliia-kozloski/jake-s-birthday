# How to add photos

1. **Copy your photos into this folder** (`assets/photos/`).
   Use simple file names with no spaces — for example:
   `us-1.jpg`, `beach.jpg`, `baby-jake-1.jpg`

2. **iPhone photos:** if a photo is a `.heic` file, it won't display in most
   browsers. Export/convert it to JPEG first (on Mac: open in Preview →
   File → Export → JPEG. Or AirDrop it to your Mac, which usually converts
   automatically).

3. **Point the site at them.** Open `content.js`, find the gallery for the
   day you want, and replace a placeholder line:

   ```js
   // before
   { placeholder: true, caption: "Us, somewhere in the Outer Rim" },

   // after
   { src: "assets/photos/us-1.jpg", caption: "Us, somewhere in the Outer Rim" },
   ```

   Add as many `{ src: ..., caption: ... }` lines as you like — the gallery
   grid grows automatically. Keep the comma at the end of each line except
   the last one.

4. **Size tip:** photos around 1200px wide look great and load fast.
   Anything works, though — the site crops them into neat 4:3 frames.

## Fleet photos (Aug 29 — the relatives' ships)

Make a subfolder `assets/photos/fleet/` and put there, for each person, either:

- **A face photo** (e.g. `mom.jpg`) — square-ish crops look best; the site
  shows it as a big round portrait on top of that person's ship. No
  photoshop needed.
- **Or your own photoshopped ship** (e.g. `mom-ship.png`) — a PNG with a
  transparent background, roughly 800×600, works best. It replaces the
  drawn ship entirely.

Then in `content.js`, in the Aug 29 `ships:` list, un-comment and edit the
`photo:` or `image:` line for that person. Their messages and any extra
photos go in the same entry.

## Video messages

Each ship (and any day, via a `video` block) can play a video message.
Two ways to add one:

1. **A video file** — put it here (e.g. `assets/photos/fleet/mom.mp4`) and
   add `video: "assets/photos/fleet/mom.mp4"` to that person's ship entry.
   - Format matters: it must be **MP4 (H.264)** to play in all browsers.
     iPhone videos often aren't — either set the phone to record compatibly
     (Settings → Camera → Formats → **Most Compatible**) before recording,
     or just collect the videos as-is and have Claude convert & compress
     them (or use the free HandBrake app: preset "Fast 720p30").
   - Keep each clip roughly 1–2 minutes / under ~50 MB so the page stays
     fast. 720p is plenty.

2. **A YouTube link** — whoever recorded it uploads to YouTube, sets the
   video to **Unlisted**, and sends you the link. Add
   `video: "https://youtu.be/XXXX"` — the site embeds a player
   automatically. No file-size or format worries; small YouTube branding.
