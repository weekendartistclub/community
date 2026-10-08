# The Weekend Artist Community — Noticeboard

A simple, mobile-first noticeboard website. No build tools, no database,
no logins, no paid services required.

## What's in this folder

| File | What it does | Do I need to edit it? |
|---|---|---|
| `index.html` | The page structure | Rarely |
| `styles.css` | Colours, fonts, layout | Only for a design change |
| `events.js` | Your events, workshops, and links | **Yes — this is the one you'll edit most** |
| `script.js` | The code that builds the cards on the page | No |
| `images/` | Photos used on the cards | When you add or swap a photo |

## How sign-ups work

The website no longer uses Tally. An event gets a **Sign Up** button
only if it has a `registrationUrl` in `events.js`. The button is a
normal link that opens that page (for example a Google Form) in a new
browser tab. Events and workshops with no `registrationUrl` simply show
no button.

Your own forms (in Tally, Google Forms, etc.) are separate from this
website — nothing here creates, changes, or deletes them.

## Making updates (no coding needed)

Open `events.js` in any text editor (even Notepad or TextEdit) and change
the values inside the `CONFIG` object:

- **Edit event or workshop details** — title, date, location,
  description, and status line are all plain text fields.
- **Add a sign-up button to an event or workshop** — add these two
  lines to its entry (don't forget the comma after the line before
  them):

      buttonText: "Sign Up",
      registrationUrl: "https://your-form-link-here"

- **Remove a sign-up button** — delete its `registrationUrl` line.
- **Add or swap a photo** — save the photo in the `images` folder and
  set `image` and `imageAlt` on the card. Cards without a photo work
  fine too.
- **Change your Instagram link** — edit `instagramUrl` at the bottom of
  the file.

Save the file, refresh the page, and you're done. You don't need to touch
`index.html`, `styles.css`, or `script.js` for these updates.

### A note on the font

The design uses **Fraunces** (headings) and **DM Sans** (everything
else), both loaded free from Google Fonts.

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
4. **Drag and drop the site files** (`index.html`, `styles.css`,
   `events.js`, `script.js`) **and the `images` folder** into the upload
   area. Keep `index.html` at the top level.
5. Click **Deploy site**. After a few seconds, Cloudflare gives you a
   live link — that's your website, live on the internet.
6. **To update the site later:** edit `events.js` on your computer,
   then go back to your Pages project → **Create new deployment** →
   upload the same files again. Cloudflare replaces the old version
   automatically.

### Optional: connect your own domain

If you own a domain (e.g. `weekendartist.club`), open your Pages
project → **Custom domains** → **Set up a custom domain**, and follow
the on-screen steps. This works even if your domain wasn't bought
through Cloudflare.

## Testing changes on your own computer first

Just double-click `index.html` — it opens directly in your browser and
works the same as it will once deployed. This is a good way to check
your edits before uploading them.
