# The Weekend Artist Community — Noticeboard

A simple, mobile-first noticeboard website. No build tools, no database,
no logins, no paid services required.

## What's in this folder

| File | What it does | Do I need to edit it? |
|---|---|---|
| `index.html` | The page structure | Rarely |
| `styles.css` | Colours, fonts, layout | Only for a design change |
| `events.js` | Your workshops, Tally forms, and links | **Yes — this is the one you'll edit most** |
| `script.js` | The code that builds the page and loads the Tally forms | No |

## How the three Tally forms fit together

This site embeds three real Tally forms, right in the page:

1. **Weekend Artist Signature Workshop** — inside that workshop's card
2. **Weekend Artist Movement Workshop** — inside that workshop's card
3. **General Suggestions** — its own section, covering both future
   workshop ideas and general feedback in one form

Each one lets people pick a date and sign up (or leave a suggestion)
without ever leaving your page.

## Making updates (no coding needed)

Open `events.js` in any text editor (even Notepad or TextEdit) and change
the values inside the `CONFIG` object:

- **Edit workshop details** — title, month, location, description, and
  spots left are all plain text fields on each workshop.
- **Swap or update a Tally form** — each workshop has a `tally` block
  with `src`, `height`, and `title`. To get these from Tally:
  1. In Tally, open your form → **Share** → **Embed** → copy the code.
  2. Find `data-tally-src="..."` in that code — copy the URL into `src`.
  3. **Important:** if the URL includes `&hideTitle=1`, delete just that
     part so the form's own title shows (we did this for all three
     forms already, so new forms should match).
  4. Copy the `height="..."` number into `height`.
  5. Copy the `title="..."` text into `title`.
- **Add a workshop without a form yet** — set `tally: null` (see the
  Sunday Sketch Meetup for an example) — the card will just show its
  details with no embedded form.
- **Change the General Suggestions form** — edit the `generalSuggestions`
  block the same way as a workshop's `tally` block.
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
