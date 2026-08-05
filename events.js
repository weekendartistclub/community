/* =========================================================================
   EVENTS.JS — THE ONLY FILE YOU NEED TO EDIT FOR NORMAL UPDATES
   =========================================================================
   This is where all the actual content lives: events, workshops, their
   date options, their Tally popup forms, the General Suggestions form,
   and your Instagram link.

   You do NOT need to touch index.html, styles.css, or script.js to
   post a new event, add a workshop, change a date option, or update a
   link — just edit the CONFIG object below and save the file.

   A few editing rules:
   - Keep the quotes "like this" around text.
   - Keep the commas between items.
   - Keep the curly braces { } and square brackets [ ] where they are —
     just change the text inside them.
   ========================================================================= */

const CONFIG = {

  // Cards shown in the "Upcoming Events" section, in the order they
  // appear on the page. These are one-off gatherings that don't use
  // date selection — each card has a "registrationUrl" and its button
  // simply links straight out to that page in a new tab (a real link,
  // not a Tally popup).
  //
  // PHOTOGRAPHS, "statusBadge", and "spots" work exactly the same way
  // here as they do for workshops — see the notes above the
  // "workshops" list below for details on all of those.
  //
  // EDIT ME — REGISTRATION LINK:
  // "registrationUrl" is the one thing you're most likely to need to
  // swap out. If you haven't finalised your Tally form yet, this is
  // the exact line to come back and replace:
  //     registrationUrl: "https://tally.so/forms/1AYvxb/share"
  events: [
    {
      kind: "Interest Check",
      statusBadge: "COMING SOON",
      title: "Eat, Draw, Play",
      where: "16th August, 4-7pm. Subak, KL",
      description: "Join us at our long Sunday doodle table. Come alone or with friends =) Just good food, one giant sheet of paper, crayons and a roomful of curious humans.",

      // EDIT ME: swap this for the real photo once you have it.
      image: "images/eat-draw-play.jpg",
      imageAlt: "People sharing food, drawing",

      buttonText: "Sign Up",

      // EDIT ME: replace with your final Tally form share link once
      // you've confirmed it. Clicking the "Sign Up" button opens this
      // exact URL in a new browser tab.
      registrationUrl: "https://tally.so/forms/1AYvxb/share"
    }
  ],

  // Cards shown in the "Upcoming Workshops" section, in the order they
  // appear on the page.
  //
  // Each entry falls into one of two kinds of card:
  //
  // 1) A WORKSHOP WITH DATE SELECTION — has a "dateOptions" list. People
  //    pick one or more dates, then a "Continue" button opens that
  //    workshop's Tally form as a popup with the selected dates attached.
  //
  // 2) A SIMPLE INTEREST/REGISTER CARD — does NOT have a "dateOptions"
  //    list at all (not even an empty one). Instead it has a
  //    "buttonText" and a "tallyFormId". Clicking its button opens that
  //    Tally form as a popup directly — no dates are selected or sent.
  //    (Events with a plain link-out button, like Eat, Draw, Play,
  //    belong in the "events" list above instead — see the note there.)
  //
  // WHERE THE TALLY FORM IDs ARE STORED:
  // Each workshop has a "tallyFormId" field — that's the short code from
  // your Tally form's URL (e.g. the "aQX6bB" in tally.so/r/aQX6bB).
  // script.js reads this ID to open the correct popup.
  //
  // PHOTOGRAPHS:
  // Every card can have an "image" (the file path) and "imageAlt" (a
  // short description of the photo, read aloud by screen readers). Both
  // are optional — leave them out entirely if a card has no photo yet.
  //
  // OTHER OPTIONAL FIELDS:
  //   - "statusBadge" — a small sticker shown on top of the photo (e.g.
  //     "COMING SOON"). Leave it out for cards that don't need one.
  //   - "spots" — a small status line shown near the button (e.g.
  //     "Limited spots — pick your date(s) below"). Leave it out if not
  //     needed.
  //
  // IMPORTANT for dateOptions:
  //   - Each "label" must match, word-for-word, one of the date options
  //     already set up inside that workshop's Tally form. If they don't
  //     match exactly, Tally won't recognise the selected date.
  //   - Never use a comma inside a label — commas are used to separate
  //     multiple selected dates before they're sent to Tally, so a
  //     comma inside a single label would be read as two dates.
  //   - If a workshop has no dates open yet, keep "dateOptions" as an
  //     empty list: dateOptions: [] — the site will show a friendly
  //     "no dates available yet" message instead of broken buttons.
  //     (This is different from leaving "dateOptions" out entirely,
  //     which turns the card into the simple interest/register kind
  //     described above.)
  //   - IMPORTANT: every { ... } block inside a list needs a comma
  //     after it, EXCEPT the very last one in that list. Missing a
  //     comma between two blocks is the most common typo — it breaks
  //     the whole file, not just that one date.
  workshops: [
    {
      kind: "Workshop Date Poll",
      title: "Weekend Artist Signature",
      when: "September 2026",
      where: "Venue TBA",
      description: "8-hours over a weekend: an immersive creative experience. Check out our IG reels for a preview. Select the date(s) that work for you.",
      spots: "Final dates will be announced end-August",

      // EDIT ME: swap this for the real photo once you have it.
      image: "images/workshop-one.jpg",
      imageAlt: "Sharing circle",

      // EDIT ME: replace with your real Workshop 1 Tally form ID.
      tallyFormId: "aQX6bB",

      // EDIT ME: these labels are placeholders — replace them with the
      // exact date options set up inside your Workshop 1 Tally form.
      dateOptions: [
        { label: "Sept 12 and 13 2026" },
        { label: "Sept 19 and 20 2026" },
        { label: "Sept 26 and 27 2026" }
      ]
    },
    {
      kind: "Workshop Date Poll",
      title: "Weekend Artist Movement Edition",
      when: "October 2026",
      where: "Venue TBA",
      description: "A movement/dance focused session for those who think with their bodies. Select the date(s) that work for you.",
      spots: "Final dates will be announced end-September",

      // EDIT ME: swap this for the real photo once you have it.
      image: "images/workshop-two.jpg",
      imageAlt: "movement exercise",

      // EDIT ME: replace with your real Workshop 2 Tally form ID.
      tallyFormId: "aQXB9q",

      // EDIT ME: these labels are placeholders — replace them with the
      // exact date options set up inside your Workshop 2 Tally form.
      dateOptions: [
        { label: "October 3 and 4 2026" },
        { label: "October 10 and 11 2026" },
        { label: "October 17 and 18 2026" },
        { label: "October 24 and 25 2026" },
        { label: "October 31 and Nov 1 2026" }
      ]
    }
  ],

  // The General Suggestions form — stays embedded directly on the page
  // (not a popup), and never receives any date information. Covers both
  // future workshop ideas and general feedback in one form.
  generalSuggestions: {
    src: "https://tally.so/embed/XxdJoP?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
    height: 344,
    title: "General Suggestions"
  },

  // Links used elsewhere on the page.
  links: {
    instagramUrl: "https://instagram.com/weekendartist.club"
  }
};
