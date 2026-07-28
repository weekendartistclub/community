# The Weekend Artist Community — Noticeboard

A simple, mobile-first noticeboard website. No build tools, no database,
no logins, no paid services required.

## What's in this folder

| File | What it does | Do I need to edit it? |
|---|---|---|
| `index.html` | The page structure | Rarely |
| `styles.css` | Colours, fonts, layout | Only for a design change |
| `events.js` | Your workshops, dates, and links | **Yes — this is the one you'll edit most** |
| `script.js` | The code that builds the page from `events.js` | No |

## Making updates (no coding needed)

Open `events.js` in any text editor (even Notepad or TextEdit) and change
the values inside the `CONFIG` object:

- **Add or edit a workshop** — copy an existing `{ ... }` block inside
  `workshops: [ ]`, or edit one in place. Each workshop has a `dates`
  list — add more `{ label: ..., date: ..., time: ... }` entries to
  offer more than one date to choose from.
- **Change your links** — edit `tallyFormUrl` and `instagramUrl` at the
  bottom of the file.

Save the file, refresh the page, and you're done. You don't need to touch
`index.html`, `styles.css`, or `script.js` for these updates.

### A note on the date picker

Tapping a date and pressing "Note my picks" only shows a message on the
page — there's no database here, so nothing is actually saved or sent
anywhere. To collect real responses for free, add a question like
"which date works for you?" directly inside your Tally form (linked in
the suggestion sections) — Tally stores submissions for you at no cost.

### A note on the font

The design calls for **Glacial Indifference**, which is a paid font, so
it isn't loaded from the internet automatically. The site currently
falls back to a similar-looking free font. If you own the Glacial
Indifference files, open `styles.css`, find the commented `@font-face`
block near the top, and follow the instructions there.

## Before you go live

In `events.js`, replace the placeholder text:

- `YOUR_FORM_ID` (appears in `tallyFormUrl`) — get your real link from
  Tally: open your form → **Share** → copy the link.
- Double-check `instagramUrl` points to your real Instagram profile.

## Deploying to Cloudflare Pages (free)

You don't need any command-line tools for this — everything can be done
in the browser.

1. **Create a free Cloudflare account** at
   [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
   if you don't already have one.
2. In the Cloudflare dashboard, go to **Workers & Pages** in the left
   sidebar, then click **Create application** → **Pages** tab →
   **Upload assets**.
3. Give your project a name (e.g. `weekend-artist`) — this becomes part
   of your free web address, like `weekend-artist.pages.dev`.
4. **Drag and drop all four files** from this folder
   (`index.html`, `styles.css`, `events.js`, `script.js`) into the
   upload area. Make sure they're all at the same "top level" — don't
   upload the whole folder as a zip, and don't put them inside a
   sub-folder.
5. Click **Deploy site**. After a few seconds, Cloudflare gives you a
   live link (something like `https://weekend-artist.pages.dev`) —
   that's your website, live on the internet.
6. **To update the site later:** edit `events.js` on your computer,
   then go back to your Pages project → **Create new deployment** →
   upload the same four files again. Cloudflare replaces the old
   version automatically.

### Optional: connect your own domain

If you own a domain (e.g. `weekendartist.club`), open your Pages
project → **Custom domains** → **Set up a custom domain**, and follow
the on-screen steps. This works even if your domain wasn't bought
through Cloudflare.

## Testing changes on your own computer first

Just double-click `index.html` — it opens directly in your browser and
works the same as it will once deployed. This is a good way to check
your edits before uploading them.
