# The Weekend Artist Community — Noticeboard

A simple, mobile-first noticeboard website. No build tools, no database,
no logins, no paid services required.

## What's in this folder

| File | What it does | Do I need to edit it? |
|---|---|---|
| `index.html` | The page structure | Rarely |
| `styles.css` | Colours, fonts, layout | Only for a design change |
| `events.js` | Your workshops, date options, Tally form IDs, and links | **Yes — this is the one you'll edit most** |
| `script.js` | The code that builds the page, runs the date pickers, and opens the Tally popups | No |

## How the three Tally forms fit together

- **Weekend Artist Signature** and **Weekend Artist Movement Edition**
  each have their own row of date buttons right on their workshop card.
  Visitors can select one or more dates, then tap **Continue**, which
  opens that workshop's real Tally form as a popup — with the dates
  they picked already attached to the form's `selectedDates` field.
- **General Suggestions** stays embedded directly in the page (not a
  popup) — it's a single form for both future workshop ideas and
  general feedback, and it never receives any date information.

## Making updates (no coding needed)

Open `events.js` in any text editor (even Notepad or TextEdit) and change
the values inside the `CONFIG` object:

- **Edit workshop details** — title, month, location, description, and
  spots left are all plain text fields on each workshop.
- **Change a workshop's Tally form** — update its `tallyFormId` (the
  short code from your Tally form's URL, e.g. the `aQX6bB` in
  `tally.so/r/aQX6bB`).
- **Add, remove, or edit date options** — each workshop has a
  `dateOptions` list. Every `label` must match, **word-for-word**, a
  date option that already exists inside that workshop's Tally form —
  otherwise Tally won't recognise the selected date. Never put a comma
  inside a label, since commas are used to separate multiple selected
  dates before they're sent to Tally.
- **A workshop with no dates yet** — set `dateOptions: []` (an empty
  list). The card will show a "no dates available yet" message instead
  of buttons.
- **Change the General Suggestions form** — edit the `src`, `height`,
  and `title` inside `generalSuggestions`, using the embed code Tally
  gives you under Share → Embed.
- **Change your Instagram link** — edit `instagramUrl` at the bottom of
  the file.

Save the file, refresh the page, and you're done. You don't need to touch
`index.html`, `styles.css`, or `script.js` for these updates.

### A note on the font

The design calls for **Glacial Indifference**, which is a paid font, so
it isn't loaded from the internet automatically. The site currently
falls back to a similar-looking free font. If you own the Glacial
Indifference files, open `styles.css`, find the commented `@font-face`
block near the top, and follow the instructions there.

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
   live link — that's your website, live on the internet.
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

Two things to test after any date-option or form-ID change:

1. Select one or more dates on a workshop card and confirm the
   Continue button updates its label and enables itself.
2. Click Continue and confirm the correct Tally form pops up, and that
   selecting dates on Workshop 1 never affects Workshop 2 (or vice
   versa).
