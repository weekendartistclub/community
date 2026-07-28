/* =========================================================================
   EVENTS.JS — THE ONLY FILE YOU NEED TO EDIT FOR NORMAL UPDATES
   =========================================================================
   This is where all the actual content lives: workshops and their real
   Tally sign-up forms, the general suggestions form, and your Instagram
   link.

   You do NOT need to touch index.html, styles.css, or script.js to
   post a new workshop, swap a Tally form, or update a link — just edit
   the CONFIG object below and save the file.

   A few editing rules:
   - Keep the quotes "like this" around text.
   - Keep the commas between items.
   - Keep the curly braces { } and square brackets [ ] where they are —
     just change the text inside them.
   ========================================================================= */

const CONFIG = {

  // Workshop + event cards shown in the "Upcoming workshops" section.
  //
  // "kind" can be "Workshop" or "Casual event" — it just changes the
  // label shown on the card and the colour of the little tape strip
  // (purple for workshops, yellow for casual events).
  //
  // "tally" is the embedded sign-up form for that workshop, where people
  // pick their date and reserve a spot. Leave "tally" set to null for
  // events that don't need a form (like a casual drop-in meetup).
  //
  // HOW TO GET A "tally" BLOCK FOR A NEW WORKSHOP:
  //   1. In Tally, open your form → Share → Embed → copy the code.
  //   2. Find data-tally-src="..." in that code — copy the URL into "src" below.
  //   3. IMPORTANT: if the URL contains "&hideTitle=1", delete just that
  //      part so the form's own title shows (that's what we did for all
  //      three forms on this site).
  //   4. Copy the height="..." number into "height" below.
  //   5. Copy the title="..." text into "title" below.
  //
  // Want to add a 4th workshop? Copy one whole { ... } block below,
  // paste it before the closing "]", and add a comma after the block
  // above it. Want to remove one? Delete its whole { ... } block (and
  // the trailing comma of the one before it, if you removed the last
  // item in the list).
  workshops: [
    {
      kind: "Workshop",
      title: "Weekend Artist Signature Workshop",
      when: "September 2026",
      where: "Studio 3, PJ",
      description: "Our flagship weekend workshop. Pick the date that works best for you and reserve your spot below.",
      spots: "Limited spots — pick your date below",
      tally: {
        src: "https://tally.so/embed/J9bda7?alignLeft=1&transparentBackground=1&dynamicHeight=1",
        height: 576,
        title: "1) Weekend Artist Signature Workshop (Sept 2026)"
      }
    },
    {
      kind: "Workshop",
      title: "Weekend Artist Movement Workshop",
      when: "October 2026",
      where: "Studio 3, PJ",
      description: "A hands-on, movement-focused session. Pick the date that works best for you and reserve your spot below.",
      spots: "Limited spots — pick your date below",
      tally: {
        src: "https://tally.so/embed/XxdJLz?alignLeft=1&transparentBackground=1&dynamicHeight=1",
        height: 628,
        title: "2) Weekend Artist Movement Workshop (Oct 2026)"
      }
    },
    {
      kind: "Casual event",
      title: "Sunday Sketch Meetup",
      when: "Sun, 24 Aug · 4:00–6:00",
      where: "Taman Jaya Park",
      description: "Bring any sketchbook and medium. No teaching, no pressure — just drawing together and coffee after.",
      spots: "Open to everyone, drop in anytime",
      tally: null
    }
  ],

  // The single "General Suggestions" form — covers both future workshop
  // ideas and general feedback (venue, timing, pricing, anything else).
  generalSuggestions: {
    src: "https://tally.so/embed/XxdJoP?alignLeft=1&transparentBackground=1&dynamicHeight=1",
    height: 300,
    title: "3) General Suggestions"
  },

  // Links used elsewhere on the page.
  links: {
    instagramUrl: "https://instagram.com/weekendartist.club"
  }
};
