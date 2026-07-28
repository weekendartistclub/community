/* =========================================================================
   SCRIPT.JS — SITE BEHAVIOUR
   =========================================================================
   This file reads the content from events.js (the CONFIG object) and
   turns it into the workshop cards and date buttons on the page.

   You shouldn't need to edit this file for normal updates — for that,
   go to events.js instead. This file is here so the logic doesn't
   clutter up the HTML.
   ========================================================================= */

// --- Render workshop cards (with their own date options) from CONFIG.workshops ---
function renderWorkshops() {
  const list = document.getElementById("workshop-list");
  list.innerHTML = "";
  CONFIG.workshops.forEach((w, wIndex) => {
    const isEvent = w.kind.toLowerCase().includes("event");
    const card = document.createElement("div");
    card.className = "card" + (isEvent ? " event" : "");

    const dateChips = w.dates.map((d, dIndex) => `
      <button type="button" class="date-chip" aria-pressed="false"
        data-workshop="${wIndex}" data-date-index="${dIndex}"
        data-date-text="${d.label} ${d.date}, ${d.time}">
        <strong>${d.date}</strong>${d.label} · ${d.time}
      </button>
    `).join("");

    card.innerHTML = `
      <span class="tape"></span>
      <span class="card-kind">${w.kind}</span>
      <h3>${w.title}</h3>
      <div class="meta">${w.where}</div>
      <p class="desc">${w.description}</p>
      <div class="spots">${w.spots}</div>
      <div class="date-label">${w.dates.length > 1 ? "Pick a date" : "Date"}</div>
      <div class="date-grid">${dateChips}</div>
    `;
    list.appendChild(card);
  });

  // Wire up tap-to-select behaviour, one selection per workshop card
  document.querySelectorAll(".date-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const workshop = chip.dataset.workshop;
      // un-press sibling chips within the same workshop card
      document.querySelectorAll(`.date-chip[data-workshop="${workshop}"]`)
        .forEach(sibling => sibling.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
    });
  });
}

// --- "Note my picks" — gathers the selected date per workshop ---
// NOTE: There's no database or backend here, so this simply shows a
// confirmation message on the page. To actually collect responses,
// the simplest no-cost option is to add a "which date works for you?"
// question inside your Tally form (linked in the suggestion sections) —
// Tally stores submissions for you for free.
function setupDateSubmit() {
  const btn = document.getElementById("date-submit");
  const confirmation = document.getElementById("date-confirmation");
  btn.addEventListener("click", () => {
    const picks = [];
    CONFIG.workshops.forEach((w, wIndex) => {
      const selected = document.querySelector(`.date-chip[data-workshop="${wIndex}"][aria-pressed="true"]`);
      if (selected) picks.push(`${w.title}: ${selected.dataset.dateText}`);
    });
    if (picks.length === 0) {
      confirmation.textContent = "Tap a date on at least one workshop first.";
    } else {
      confirmation.textContent = `Noted! ${picks.join(" · ")}. Want this to actually reach us? Mention these picks in the suggestion form below.`;
    }
    confirmation.classList.add("show");
  });
}

// --- Apply CONFIG links to the relevant elements ---
function applyLinks() {
  document.querySelectorAll('a[href*="YOUR_FORM_ID"]').forEach(a => a.href = CONFIG.links.tallyFormUrl);
  document.querySelector(".connect-instagram").href = CONFIG.links.instagramUrl;
}

renderWorkshops();
setupDateSubmit();
applyLinks();
