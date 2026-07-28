/* =========================================================================
   SCRIPT.JS — SITE BEHAVIOUR
   =========================================================================
   This file reads the content from events.js (the CONFIG object) and:
     - builds each workshop card, including its date buttons and
       Continue button
     - opens the correct Tally form as a popup when a workshop's
       Continue button is clicked, pre-filled with the selected dates
     - builds the General Suggestions embed
     - loads the official Tally widget script exactly once

   You shouldn't need to edit this file for normal updates — for that,
   go to events.js instead. This file is here so the logic doesn't
   clutter up the HTML.
   ========================================================================= */

// -------------------------------------------------------------------------
// Small helper: safely escape text before inserting it into HTML, so a
// date label or description can never accidentally break the page.
// -------------------------------------------------------------------------
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// -------------------------------------------------------------------------
// Render workshop cards from CONFIG.workshops — title, details, date
// buttons, and a Continue button. If a workshop has no dateOptions yet,
// a friendly placeholder message is shown instead of empty buttons.
// -------------------------------------------------------------------------
function renderWorkshops() {
  const list = document.getElementById("workshop-list");
  list.innerHTML = "";

  CONFIG.workshops.forEach((w, workshopIndex) => {
    const card = document.createElement("div");
    card.className = "card";

    const hasDates = Array.isArray(w.dateOptions) && w.dateOptions.length > 0;

    let dateSectionHtml;
    if (hasDates) {
      const dateButtonsHtml = w.dateOptions.map((d, dateIndex) => `
        <button
          type="button"
          class="date-chip"
          aria-pressed="false"
          data-workshop="${workshopIndex}"
          data-date-index="${dateIndex}"
          data-date-label="${escapeHtml(d.label)}">
          <span class="check" aria-hidden="true">&#10003;</span>
          <span class="date-chip-text">${escapeHtml(d.label)}</span>
        </button>
      `).join("");

      dateSectionHtml = `
        <div class="date-label">Pick your date(s)</div>
        <div class="date-grid" id="date-grid-${workshopIndex}">
          ${dateButtonsHtml}
        </div>
        <button
          type="button"
          class="btn btn-primary continue-btn"
          id="continue-btn-${workshopIndex}"
          data-workshop="${workshopIndex}"
          aria-disabled="true"
          disabled>
          Continue
        </button>
      `;
    } else {
      // Requirement: the site must still work if a workshop currently
      // has no available dates — show a message instead of empty
      // buttons or a broken Continue button.
      dateSectionHtml = `
        <div class="date-label">No dates available yet</div>
        <p class="desc" style="margin:0;">Check back soon — new dates are added regularly.</p>
      `;
    }

    card.innerHTML = `
      <span class="tape"></span>
      <span class="card-kind">${escapeHtml(w.kind)}</span>
      <h3>${escapeHtml(w.title)}</h3>
      <div class="meta">${escapeHtml(w.when)} · ${escapeHtml(w.where)}</div>
      <p class="desc">${escapeHtml(w.description)}</p>
      <div class="spots">${escapeHtml(w.spots)}</div>
      ${dateSectionHtml}
    `;
    list.appendChild(card);
  });

  wireUpDateButtons();
  wireUpContinueButtons();
}

// -------------------------------------------------------------------------
// Date button toggle behaviour. Each button toggles independently
// (selecting one date does not deselect another), and every workshop's
// selections are scoped by its own data-workshop index, so Workshop 1
// and Workshop 2 selections never mix.
// -------------------------------------------------------------------------
function wireUpDateButtons() {
  document.querySelectorAll(".date-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const isPressed = chip.getAttribute("aria-pressed") === "true";
      chip.setAttribute("aria-pressed", String(!isPressed));
      updateContinueButton(chip.dataset.workshop);
    });
  });
}

// -------------------------------------------------------------------------
// Updates one workshop's Continue button: disabled with no dates
// selected, enabled with a count-aware label once at least one date is
// selected (e.g. "Continue with 1 selected date" /
// "Continue with 2 selected dates").
// -------------------------------------------------------------------------
function updateContinueButton(workshopIndex) {
  const btn = document.getElementById(`continue-btn-${workshopIndex}`);
  if (!btn) return;

  const selectedCount = document.querySelectorAll(
    `.date-chip[data-workshop="${workshopIndex}"][aria-pressed="true"]`
  ).length;

  if (selectedCount === 0) {
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
    btn.textContent = "Continue";
  } else {
    btn.disabled = false;
    btn.setAttribute("aria-disabled", "false");
    btn.textContent = selectedCount === 1
      ? "Continue with 1 selected date"
      : `Continue with ${selectedCount} selected dates`;
  }
}

// -------------------------------------------------------------------------
// WORKSHOP 1 & WORKSHOP 2 POPUP LOGIC
// Both Continue buttons share this exact same wiring — the only thing
// that differs between Workshop 1 and Workshop 2 is which workshop's
// data-workshop index it reads from (which in turn points at that
// workshop's own tallyFormId and dateOptions in events.js). This keeps
// the two workshops' logic identical and independent without
// duplicating code.
// -------------------------------------------------------------------------
function wireUpContinueButtons() {
  document.querySelectorAll(".continue-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const workshopIndex = btn.dataset.workshop;
      const workshop = CONFIG.workshops[workshopIndex];
      if (!workshop) return;

      const selectedChips = document.querySelectorAll(
        `.date-chip[data-workshop="${workshopIndex}"][aria-pressed="true"]`
      );
      if (selectedChips.length === 0) return; // safety check — button should already be disabled

      const selectedLabels = Array.from(selectedChips).map(
        (chip) => chip.dataset.dateLabel
      );

      // Join multiple dates using commas (never inside a single label —
      // see the comment in events.js), then encode the result safely
      // before it's sent to Tally.
      const joinedLabels = selectedLabels.join(",");
      const encodedSelectedDates = encodeURIComponent(joinedLabels);

      openWorkshopPopup(workshop.tallyFormId, encodedSelectedDates);
    });
  });
}

// -------------------------------------------------------------------------
// Opens a workshop's Tally form as a centred popup (via Tally's own
// popup API), pre-filling its "selectedDates" hidden field with the
// encoded, comma-joined date labels. Used for both Workshop 1 and
// Workshop 2 — only the formId and the selected dates change between
// the two calls.
// -------------------------------------------------------------------------
function openWorkshopPopup(formId, encodedSelectedDates) {
  if (typeof Tally === "undefined" || typeof Tally.openPopup !== "function") {
    // The Tally widget script may still be loading — try again shortly
    // rather than doing nothing.
    setTimeout(() => openWorkshopPopup(formId, encodedSelectedDates), 300);
    return;
  }
  Tally.openPopup(formId, {
    hiddenFields: {
      selectedDates: encodedSelectedDates
    }
  });
}

// -------------------------------------------------------------------------
// GENERAL SUGGESTIONS LOGIC
// Unlike the two workshops, General Suggestions is NOT a popup — it stays
// embedded directly in the page (its current visual design), never
// receives a selectedDates value, and never navigates visitors away from
// the site.
// -------------------------------------------------------------------------
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
      title="${escapeHtml(g.title)}">
    </iframe>
  `;
}

// -------------------------------------------------------------------------
// Loads the official Tally widget script exactly once, no matter how
// many forms are on the page (two popups + one embed). It also
// activates the General Suggestions iframe once the script is ready,
// and makes Tally.openPopup available for the two workshop Continue
// buttons.
// -------------------------------------------------------------------------
function loadTallyWidget() {
  const d = document;
  const w = "https://tally.so/widgets/embed.js";
  const activate = function () {
    if (typeof Tally !== "undefined") {
      Tally.loadEmbeds();
    } else {
      d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
        e.src = e.dataset.tallySrc;
      });
    }
  };
  if (typeof Tally !== "undefined") {
    activate();
  } else if (d.querySelector('script[src="' + w + '"]') == null) {
    const s = d.createElement("script");
    s.src = w;
    s.async = true;
    s.onload = activate;
    s.onerror = activate;
    d.body.appendChild(s);
  }
}

// -------------------------------------------------------------------------
// Apply CONFIG links to the relevant elements
// -------------------------------------------------------------------------
function applyLinks() {
  document.querySelector(".connect-instagram").href = CONFIG.links.instagramUrl;
}

renderWorkshops();
renderGeneralSuggestions();
loadTallyWidget();
applyLinks();
