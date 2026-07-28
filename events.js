/* =========================================================================
   EVENTS.JS — THE ONLY FILE YOU NEED TO EDIT FOR NORMAL UPDATES
   =========================================================================
   This is where all the actual content lives: workshops, their dates,
   and the links to your Tally form and Instagram.

   You do NOT need to touch index.html, styles.css, or script.js to
   post a new workshop, change a date, or update a link — just edit
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
  // "dates" is a list of date options people can pick between for THAT
  // workshop. A casual event usually only needs one date — just give
  // it a single-item list, like the Sunday Sketch Meetup below.
  //
  // Want to add a 4th workshop? Copy one whole { ... } block below,
  // paste it before the closing "]", and add a comma after the
  // block above it. Want to remove one? Delete its whole { ... } block
  // (and the trailing comma of the one before it, if you removed the
  // last one in the list).
  workshops: [
    {
      kind: "Workshop",
      title: "Intro to Watercolour",
      where: "Studio 3, PJ",
      description: "A relaxed first-timer's session on wet-on-wet washes, colour mixing, and loosening your hand.",
      spots: "8 of 12 spots left",
      dates: [
        { label: "Sat", date: "9 Aug", time: "10:00–12:30" },
        { label: "Sat", date: "16 Aug", time: "10:00–12:30" }
      ]
    },
    {
      kind: "Workshop",
      title: "Linocut Printmaking",
      where: "The Back Room",
      description: "Carve a simple block and pull your own prints to take home. All materials provided.",
      spots: "3 of 10 spots left",
      dates: [
        { label: "Sun", date: "17 Aug", time: "2:00–5:00" },
        { label: "Sun", date: "31 Aug", time: "2:00–5:00" }
      ]
    },
    {
      kind: "Casual event",
      title: "Sunday Sketch Meetup",
      where: "Taman Jaya Park",
      description: "Bring any sketchbook and medium. No teaching, no pressure — just drawing together and coffee after.",
      spots: "Open to everyone, drop in anytime",
      dates: [
        { label: "Sun", date: "24 Aug", time: "4:00–6:00" }
      ]
    }
  ],

  // Links used throughout the page.
  // - tallyFormUrl: your Tally form link (used by "Suggest a workshop"
  //   and "General suggestions"). Get this from Tally: Share → Copy link.
  // - instagramUrl: your Instagram profile link.
  links: {
    tallyFormUrl: "https://tally.so/r/YOUR_FORM_ID",
    instagramUrl: "https://instagram.com/weekendartist.club"
  }
};
