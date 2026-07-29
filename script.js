/* =========================================================================
   SCRIPT.JS — SITE BEHAVIOUR
   =========================================================================
   This file reads the content from events.js (the CONFIG object) and:
     - builds each card (photo, details, and either date buttons + a
       Continue button, or a simple Register/Interest button)
     - opens the correct Tally form as a popup when a card's button is
       clicked — pre-filled with selected dates for workshop-style
       cards, or with no dates at all for simple interest/register cards
     - builds the General Suggestions embed
     - loads the official Tally widget script exactly once

   You shouldn't need to edit this file for normal updates — for that,
   go to events.js instead. This file is here so the logic doesn't
   clutter up the HTML.
   ========================================================================= */

// -------------------------------------------------------------------------
// Small helper: safely escape text before inserting it into HTML, so a
// date label, description, or image path can never accidentally break
// the page.
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
// Render every card from CONFIG.workshops, in list order — title,
// photo, details, and either:
//   - a row of date buttons + a Continue button (when the entry has a
//     "dateOptions" list), or
//   - a single button that opens its Tally form directly (when the
//     entry has no "dateOptions" list at all, like Eat, Draw, Play).
// If a workshop-style entry has an empty dateOptions list, a friendly
// placeholder message is shown instead of empty buttons.
// -------------------------------------------------------------------------
function renderWorkshops() {
  const list = document.getElementById("workshop-list");
  list.innerHTML = "";

  CONFIG.workshops.forEach((w, workshopIndex) => {
    const card = document.createElement("div");
    card.className = "card";

    // ---- Photograph (and optional status badge sticker on top of it) ----
    let imageHtml = "";
    if (w.image) {
      const badgeHtml = w.statusBadge
        ? `<span class="status-badge">${escapeHtml(w.statusBadge)}</span>`
        : "";
      imageHtml = `
        <div class="card-image-wrap">
          <img
            class="card-image"
            src="${escapeHtml(w.image)}"
            alt="${escapeHtml(w.imageAlt || "")}"
            loading="lazy">
          ${badgeHtml}
        </div>
      `;
    }

    // ---- Meta line (when/where) — only shown if at least one is set ----
    const metaParts = [w.when, w.where].filter(Boolean).map(escapeHtml);
    const metaHtml = metaParts.length
      ? `<div class="meta">${metaParts.join(" · ")}</div>`
      : "";

    // ---- Spots / status line — only shown if set ----
    const spotsHtml = w.spots
      ? `<div class="spots">${escapeHtml(w.spots)}</div>`
      : "";

    // ---- Date selection block OR simple register button ----
    const hasDateSelection = Object.prototype.hasOwnProperty.call(w, "dateOptions");
    let actionSectionHtml;

    if (hasDateSelection) {
      const hasDates = Array.isArray(w.dateOptions) && w.dateOptions.length > 0;

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

        actionSectionHtml = `
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
        actionSectionHtml = `
          <div class="date-label">No dates available yet</div>
          <p class="desc" style="margin:0;">Check back soon — new dates are added regularly.</p>
        `;
      }
    } else {
      // Simple interest/register card (e.g. Eat, Draw, Play) — one
      // button, always enabled, opens its Tally form with no dates
      // attached.
      actionSectionHtml = `
        <button
          type="button"
          class="btn btn-primary register-btn"
          data-workshop="${workshopIndex}">
          ${escapeHtml(w.buttonText || "Register interest")}
        </button>
      `;
    }

    card.innerHTML = `
      <span class="tape"></span>
      ${imageHtml}
      <span class="card-kind">${escapeHtml(w.kind)}</span>
      <h3>${escapeHtml(w.title)}</h3>
      ${metaHtml}
      <p class="desc">${escapeHtml(w.description)}</p>
      ${spotsHtml}
      ${actionSectionHtml}
    `;
    list.appendChild(card);
  });

  wireUpDateButtons();
  wireUpContinueButtons();
  wireUpRegisterButtons();
}

// -------------------------------------------------------------------------
// Date button toggle behaviour. Each button toggles independently
// (selecting one date does not deselect another), and every workshop's
// selections are scoped by its own data-workshop index, so Workshop 1
// and Workshop 2 selections never mix. Cards with no date buttons (like
// Eat, Draw, Play) simply have nothing for this function to attach to.
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
// EAT, DRAW, PLAY (AND ANY FUTURE SIMPLE INTEREST/REGISTER CARD) POPUP
// LOGIC
// These buttons open their Tally form immediately on click — there's no
// date selection to wait for, and no selectedDates value is ever passed
// (openWorkshopPopup is called with no second argument, so the hidden
// field is left out entirely — see openWorkshopPopup below).
// -------------------------------------------------------------------------
function wireUpRegisterButtons() {
  document.querySelectorAll(".register-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const workshopIndex = btn.dataset.workshop;
      const workshop = CONFIG.workshops[workshopIndex];
      if (!workshop) return;

      openWorkshopPopup(workshop.tallyFormId);
    });
  });
}

// -------------------------------------------------------------------------
// Opens a card's Tally form as a centred popup (via Tally's own popup
// API). When encodedSelectedDates is provided (workshop Continue
// buttons), it pre-fills the "selectedDates" hidden field. When it's
// left out (Eat, Draw, Play's Register Interest button), no hidden
// field is sent at all. Used by every popup button on the page — only
// the formId and the (optional) selected dates change between calls.
// -------------------------------------------------------------------------
function openWorkshopPopup(formId, encodedSelectedDates) {
  if (typeof Tally === "undefined" || typeof Tally.openPopup !== "function") {
    // The Tally widget script may still be loading — try again shortly
    // rather than doing nothing.
    setTimeout(() => openWorkshopPopup(formId, encodedSelectedDates), 300);
    return;
  }

  const options = {};
  if (encodedSelectedDates) {
    options.hiddenFields = {
      selectedDates: encodedSelectedDates
    };
  }

  Tally.openPopup(formId, options);
}

// -------------------------------------------------------------------------
// GENERAL SUGGESTIONS LOGIC
// Unlike the workshop and interest/register cards, General Suggestions is
// NOT a popup — it stays embedded directly in the page (its current
// visual design), never receives a selectedDates value, and never
// navigates visitors away from the site.
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
// many forms are on the page (three popups + one embed). It also
// activates the General Suggestions iframe once the script is ready,
// and makes Tally.openPopup available for every popup button.
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
