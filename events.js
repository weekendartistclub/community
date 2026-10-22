/* =========================================================================
   EVENTS.JS — THE ONLY FILE YOU NEED TO EDIT FOR NORMAL UPDATES
   =========================================================================
   This is where all the actual content lives: events, workshops, and
   your Instagram link.

   You do NOT need to touch index.html, styles.css, or script.js to
   post a new event, add a workshop, or update a link — just edit the
   CONFIG object below and save the file.

   A few editing rules:
   - Keep the quotes "like this" around text.
   - Keep the commas between items.
   - Keep the curly braces { } and square brackets [ ] where they are —
     just change the text inside them.
   ========================================================================= */

const CONFIG = {

  // Cards shown in the "Upcoming Events" section, in the order they
  // appear on the page. These are one-off gatherings.
  //
  // REGISTRATION BUTTON:
  // If an event has a "registrationUrl", it gets a button (labelled with
  // "buttonText", or "Sign Up" if you leave that out) that opens that
  // link in a new browser tab. If an event has no "registrationUrl"
  // (for example, while it's postponed), it simply shows no button.
  //
  // PHOTOGRAPHS:
  // Every card can have an "image" (the file path) and "imageAlt" (a
  // short description of the photo, read aloud by screen readers). Both
  // are optional — leave them out entirely if a card has no photo yet.
  //
  // OTHER OPTIONAL FIELDS:
  //   - "kind" — a small label above the title (e.g. "Halloween Special").
  //   - "statusBadge" — a small sticker shown on top of the photo (e.g.
  //     "POSTPONED TILL FURTHER NOTICE"). Only shows if the card has a photo.
  //   - "when" and "where" — shown together on one line under the title.
  //   - "spots" — a small status line (e.g. "Limited spots").
  //   - "description" — a short paragraph about the event.
  events: [
    {
      kind: "Halloween Special",
      title: "Real Goddesses Howl at the Moon",
      when: "October 31, 7-11pm",
      where: "Cosmic Theatre Hub, Phileo Damansara",
      description: "An intimate all-girls Halloween photography party.",

      // EDIT ME: when you have a photo for this event:
      image: "images/real-goddess-howl-at-the-moon.jpg",
      imageAlt: "Short description of the photo",

      buttonText: "Sign Up",

      // Opens this Google Form in a new browser tab.
      registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdEJFZAk3AlIxBMxHonJL5MuwxYwXqVYc75fxyb1Ki-Gs43og/viewform?usp=header"
    },
    {
      kind: "We'll be back!",
      statusBadge: "POSTPONED TILL FURTHER NOTICE",
      title: "Eat, Draw, Play",
      where: "Date & Time TBA. Subak Restaurant, KL (near TTDI)",
      description: "*We're postponing this outdoor event till the skies clear. Follow us on Instagram for the latest updates.",

      // EDIT ME: swap this for the real photo once you have it.
      image: "images/eat-draw-play.jpg",
      imageAlt: "People sharing food, drawing"

      // No "registrationUrl" on purpose: this event is postponed, so
      // there is no sign-up button. Add a "registrationUrl" (and a
      // "buttonText") here when it's back on.
    }
  ],

  // Cards shown in the "Upcoming Workshops" section, in the order they
  // appear on the page. Workshops are announcements only for now —
  // there are no buttons on these cards.
  //
  // The same optional fields described above ("image", "imageAlt",
  // "statusBadge", "spots", "when", "where", "kind") work here too.
  // You can also give a workshop a "registrationUrl" (and "buttonText")
  // once registration opens, and its card will show a button that opens
  // that link in a new tab.
  workshops: [
    {
      kind: "Workshop",
      title: "Weekend Artist Signature",
      when: "Early 2027",
      where: "Venue TBA",
      description: "8-hours over a weekend: an immersive creative experience. Check out our IG reels for a preview.",
      spots: "TBA 2027",

      // EDIT ME: swap this for the real photo once you have it.
      image: "images/workshop-one.jpg",
      imageAlt: "Sharing circle"
    },
    {
      kind: "Workshop",
      title: "Weekend Artist Movement Edition",
      when: "2027",
      where: "Venue TBA",
      description: "A movement/dance focused session for those who think with their bodies.",
      spots: "TBA 2027",

      // EDIT ME: swap this for the real photo once you have it.
      image: "images/workshop-two.jpg",
      imageAlt: "movement exercise"
    }
  ],

  // Links used elsewhere on the page.
  links: {
    instagramUrl: "https://instagram.com/weekendartist.club"
  }
};
