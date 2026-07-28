/* =========================================================================
   EVENTS.JS — THE ONLY FILE YOU NEED TO EDIT FOR NORMAL UPDATES
   =========================================================================
   This is where all the actual content lives: workshops, their date
   options, their Tally popup forms, the General Suggestions form, and
   your Instagram link.

   You do NOT need to touch index.html, styles.css, or script.js to
   post a new workshop, change a date option, or update a link — just
   edit the CONFIG object below and save the file.

   A few editing rules:
   - Keep the quotes "like this" around text.
   - Keep the commas between items.
   - Keep the curly braces { } and square brackets [ ] where they are —
     just change the text inside them.
   ========================================================================= */

const CONFIG = {

  // Workshop cards shown in the "Upcoming workshops" section. Each one
  // has its own set of date buttons and its own "Continue" button, which
  // opens that workshop's Tally form as a popup.
  //
  // WHERE THE TALLY FORM IDs ARE STORED:
  // Each workshop has a "tallyFormId" field below — that's the short
  // code from your Tally form's URL (e.g. the "aQX6bB" in
  // tally.so/r/aQX6bB). script.js reads this ID and uses it to open the
  // correct popup when someone clicks that workshop's Continue button.
  //
  // "dateOptions" is the list of date buttons shown on that workshop's
  // card. IMPORTANT:
  //   - Each "label" must match, word-for-word, one of the date options
  //     already set up inside that workshop's Tally form. If they don't
  //     match exactly, Tally won't recognise the selected date.
  //   - Never use a comma inside a label — commas are used to separate
  //     multiple selected dates before they're sent to Tally, so a
  //     comma inside a single label would be read as two dates.
  //   - If a workshop has no dates open yet, leave dateOptions as an
  //     empty list: dateOptions: [] — the site will show a friendly
  //     "no dates available yet" message instead of broken buttons.
  //
  // Want to add a 3rd workshop? Copy one whole { ... } block below,
  // paste it before the closing "]", and add a comma after the block
  // above it.
  workshops: [
    {
      kind: "Workshop",
      title: "Weekend Artist Signature",
      when: "September 2026",
      where: "Studio 3, PJ",
      description: "Our flagship weekend workshop. Select the date(s) that work for you, then continue to reserve your spot.",
      spots: "Limited spots — pick your date(s) below",

      // EDIT ME: replace with your real Workshop 1 Tally form ID.
      tallyFormId: "aQX6bB",

      // EDIT ME: these labels are placeholders — replace them with the
      // exact date options set up inside your Workshop 1 Tally form.
      dateOptions: [
        { label: "Sat 9 Aug · 10:00–12:30" },
        { label: "Sat 16 Aug · 10:00–12:30" }
      ]
    },
    {
      kind: "Workshop",
      title: "Weekend Artist Movement Edition",
      when: "October 2026",
      where: "Studio 3, PJ",
      description: "A hands-on, movement-focused session. Select the date(s) that work for you, then continue to reserve your spot.",
      spots: "Limited spots — pick your date(s) below",

      // EDIT ME: replace with your real Workshop 2 Tally form ID.
      tallyFormId: "aQXB9q",

      // EDIT ME: these labels are placeholders — replace them with the
      // exact date options set up inside your Workshop 2 Tally form.
      dateOptions: [
        { label: "Sun 17 Aug · 2:00–5:00" },
        { label: "Sun 31 Aug · 2:00–5:00" }
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
