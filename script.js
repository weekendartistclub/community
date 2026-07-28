/* =========================================================================
   SCRIPT.JS — SITE BEHAVIOUR
   =========================================================================
   This file reads the content from events.js (the CONFIG object) and
   turns it into the workshop cards, the general suggestions embed, and
   loads the real Tally forms on the page.

   You shouldn't need to edit this file for normal updates — for that,
   go to events.js instead. This file is here so the logic doesn't
   clutter up the HTML.
   ========================================================================= */

// --- Render workshop cards from CONFIG.workshops, embedding each
//     workshop's Tally form (if it has one) so people can pick a date
//     and sign up right there in the card ---
function renderWorkshops() {
  const list = document.getElementById("workshop-list");
  list.innerHTML = "";
  CONFIG.workshops.forEach((w) => {
    const isEvent = w.kind.toLowerCase().includes("event");
    const card = document.createElement("div");
    card.className = "card" + (isEvent ? " event" : "");

    const tallyBlock = w.tally ? `
      <div class="date-label">Pick a date &amp; sign up</div>
      <div class="tally-embed-wrap">
        <iframe
          data-tally-src="${w.tally.src}"
          loading="lazy"
          width="100%"
          height="${w.tally.height}"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="${w.tally.title}">
        </iframe>
      </div>
    ` : "";

    card.innerHTML = `
      <span class="tape"></span>
      <span class="card-kind">${w.kind}</span>
      <h3>${w.title}</h3>
      <div class="meta">${w.when} · ${w.where}</div>
      <p class="desc">${w.description}</p>
      <div class="spots">${w.spots}</div>
      ${tallyBlock}
    `;
    list.appendChild(card);
  });
}

// --- Render the merged "General Suggestions" Tally form ---
function renderGeneralSuggestions() {
  const wrap = document.getElementById("general-suggestions-embed");
  const g = CONFIG.generalSuggestions;
  wrap.innerHTML = `
    <iframe
      data-tally-src="${g.src}"
      loading="lazy"
      width="100%"
      height="${g.height}"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
      title="${g.title}">
    </iframe>
  `;
}

// --- Load the Tally widget script and activate every embedded form on
//     the page (this is Tally's own recommended loading snippet,
//     wrapped in a reusable function since we now have three forms) ---
function loadTallyEmbeds() {
  const d = document;
  const w = "https://tally.so/widgets/embed.js";
  const v = function () {
    if (typeof Tally !== "undefined") {
      Tally.loadEmbeds();
    } else {
      d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
        e.src = e.dataset.tallySrc;
      });
    }
  };
  if (typeof Tally !== "undefined") {
    v();
  } else if (d.querySelector('script[src="' + w + '"]') == null) {
    const s = d.createElement("script");
    s.src = w;
    s.onload = v;
    s.onerror = v;
    d.body.appendChild(s);
  }
}

// --- Apply CONFIG links to the relevant elements ---
function applyLinks() {
  document.querySelector(".connect-instagram").href = CONFIG.links.instagramUrl;
}

renderWorkshops();
renderGeneralSuggestions();
loadTallyEmbeds();
applyLinks();
