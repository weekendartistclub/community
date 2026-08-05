/* =========================================================================
   SCRIPT.JS — SITE BEHAVIOUR
   =========================================================================
   This file reads the content from events.js (the CONFIG object) and:
     - builds each "Upcoming Events" card from CONFIG.events — a photo,
       details, and a button that links straight out to that event's
       registration page in a new tab (a real link, no JavaScript
       needed for it to work)
     - builds each "Upcoming Workshops" card from CONFIG.workshops —
       photo, details, and either date buttons + a Continue button, or
       a simple Register/Interest button
     - opens the correct Tally form as a popup when a workshop's button
       is clicked — pre-filled with selected dates for date-selection
       cards, or with no dates at all for simple interest/register cards
     - builds the General Suggestions embed
     - loads the official Tally widget script exactly once

   Click handling uses EVENT DELEGATION: instead of attaching a listener
   to every individual button after it's created, one listener sits on
   each card-list container (#event-list, #workshop-list) and figures
   out what was clicked. This means clicks are always caught correctly
   no matter when or how many times the cards inside are (re)built —
   there's no way for a button to end up "created after listeners were
   attached."

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
  if (!list) {
    console.error('Weekend Artist site: could not find "#workshop-list" in the page — no cards were rendered.');
    return;
  }
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
      // attached. type="button" is required so it never behaves like a
      // form-submit button.
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

  // Note: there is deliberately no per-button "wire up click listeners"
  // step here. Click handling for every button inside #workshop-list is
  // handled once, by delegation, in initWorkshopListClickHandling()
  // below — see the comment there for why.
}

// -------------------------------------------------------------------------
// Render every card from CONFIG.events, in list order — title, photo,
// details, and a button. Unlike workshop cards, an event card with a
// "registrationUrl" gets a real <a href target="_blank"> link for its
// button, so clicking it opens that page in a new tab using nothing but
// normal browser behaviour — no click handler required for that case.
//
// An event CAN still use a "tallyFormId" instead of "registrationUrl"
// (opening a Tally popup, the same way workshop Register buttons do) —
// that path is handled by initEventListClickHandling() further below,
// for any future event that needs it. Eat, Draw, Play doesn't use it
// today, since it links straight to registrationUrl instead.
// -------------------------------------------------------------------------
function renderEvents() {
  const list = document.getElementById("event-list");
  if (!list) {
    console.error('Weekend Artist site: could not find "#event-list" in the page — no events were rendered.');
    return;
  }
  list.innerHTML = "";

  CONFIG.events.forEach((item, eventIndex) => {
    const card = document.createElement("div");
    card.className = "card";

    // ---- Photograph (and optional status badge sticker on top of it) ----
    let imageHtml = "";
    if (item.image) {
      const badgeHtml = item.statusBadge
        ? `<span class="status-badge">${escapeHtml(item.statusBadge)}</span>`
        : "";
      imageHtml = `
        <div class="card-image-wrap">
          <img
            class="card-image"
            src="${escapeHtml(item.image)}"
            alt="${escapeHtml(item.imageAlt || "")}"
            loading="lazy">
          ${badgeHtml}
        </div>
      `;
    }

    // ---- Meta line (when/where) — only shown if at least one is set ----
    const metaParts = [item.when, item.where].filter(Boolean).map(escapeHtml);
    const metaHtml = metaParts.length
      ? `<div class="meta">${metaParts.join(" · ")}</div>`
      : "";

    // ---- Spots / status line — only shown if set ----
    const spotsHtml = item.spots
      ? `<div class="spots">${escapeHtml(item.spots)}</div>`
      : "";

    // ---- EAT, DRAW, PLAY (AND ANY FUTURE LINK-OUT EVENT) BUTTON LOGIC ----
    // "registrationUrl" wins if both are present. Reuses the exact same
    // .btn .btn-primary .register-btn classes workshop Register buttons
    // use, so the styling, hover, and focus states match automatically.
    let actionSectionHtml;
    if (item.registrationUrl) {
      actionSectionHtml = `
        <a
          class="btn btn-primary register-btn"
          href="${escapeHtml(item.registrationUrl)}"
          target="_blank"
          rel="noopener noreferrer">
          ${escapeHtml(item.buttonText || "Sign Up")}
        </a>
      `;
    } else if (item.tallyFormId) {
      actionSectionHtml = `
        <button
          type="button"
          class="btn btn-primary register-btn"
          data-event="${eventIndex}">
          ${escapeHtml(item.buttonText || "Register interest")}
        </button>
      `;
    } else {
      console.error(`Weekend Artist site: the event "${item.title || eventIndex}" has neither a registrationUrl nor a tallyFormId set in events.js — its button will not appear.`);
      actionSectionHtml = "";
    }

    card.innerHTML = `
      <span class="tape"></span>
      ${imageHtml}
      <span class="card-kind">${escapeHtml(item.kind || "")}</span>
      <h3>${escapeHtml(item.title)}</h3>
      ${metaHtml}
      <p class="desc">${escapeHtml(item.description)}</p>
      ${spotsHtml}
      ${actionSectionHtml}
    `;
    list.appendChild(card);
  });

  // Note: as with renderWorkshops(), there is deliberately no per-button
  // "wire up click listeners" step here. The one case that still needs
  // a click handler (a future tallyFormId-based event) is handled by
  // delegation, in initEventListClickHandling() below.
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
// EVENT DELEGATION for the Upcoming Events list — one click listener for
// #event-list. Today's only event (Eat, Draw, Play) uses a real <a
// href target="_blank"> link, which the browser handles natively with
// no JavaScript at all — this listener exists so that any FUTURE event
// using a Tally popup (a "tallyFormId" instead of "registrationUrl")
// works correctly too, without needing this file edited again.
// -------------------------------------------------------------------------
function initEventListClickHandling() {
  const list = document.getElementById("event-list");
  if (!list) {
    console.error('Weekend Artist site: could not find "#event-list" — event popup buttons (if any) will not respond to clicks.');
    return;
  }

  list.addEventListener("click", (event) => {
    const registerBtn = event.target.closest(".register-btn[data-event]");
    if (!registerBtn) return;

    const eventIndex = registerBtn.dataset.event;
    const item = CONFIG.events[eventIndex];
    if (!item) {
      console.error(`Weekend Artist site: no entry found in CONFIG.events at index ${eventIndex} for a Register button.`);
      return;
    }

    openTallyPopup(item.tallyFormId);
  });
}

// -------------------------------------------------------------------------
// EVENT DELEGATION for the Upcoming Workshops list — one click listener
// for the entire card list.
//
// WHY: previously each button type (.date-chip, .continue-btn,
// .register-btn) had its own listener attached individually, right
// after renderWorkshops() built the cards. That's the classic setup
// where a button "created after listeners were attached" silently gets
// no click behaviour at all — nothing throws an error, the button just
// does nothing when clicked. Attaching ONE listener to the container
// instead (#workshop-list, which already exists in index.html before
// script.js even runs) removes that failure mode completely: it
// doesn't matter when, how, or how many times the buttons inside it
// are created, clicks on them are still caught.
// -------------------------------------------------------------------------
function initWorkshopListClickHandling() {
  const list = document.getElementById("workshop-list");
  if (!list) {
    console.error('Weekend Artist site: could not find "#workshop-list" — card buttons will not respond to clicks.');
    return;
  }

  list.addEventListener("click", (event) => {
    const dateChip = event.target.closest(".date-chip");
    if (dateChip) {
      handleDateChipClick(dateChip);
      return;
    }

    const continueBtn = event.target.closest(".continue-btn");
    if (continueBtn) {
      handleContinueClick(continueBtn);
      return;
    }

    const registerBtn = event.target.closest(".register-btn");
    if (registerBtn) {
      handleRegisterClick(registerBtn);
      return;
    }
  });
}

// -------------------------------------------------------------------------
// Date button toggle behaviour. Each button toggles independently
// (selecting one date does not deselect another), and every workshop's
// selections are scoped by its own data-workshop index, so Workshop 1
// and Workshop 2 selections never mix.
// -------------------------------------------------------------------------
function handleDateChipClick(chip) {
  const isPressed = chip.getAttribute("aria-pressed") === "true";
  chip.setAttribute("aria-pressed", String(!isPressed));
  updateContinueButton(chip.dataset.workshop);
}

// -------------------------------------------------------------------------
// WORKSHOP 1 & WORKSHOP 2 POPUP LOGIC
// Both Continue buttons are handled by this exact same function — the
// only thing that differs between Workshop 1 and Workshop 2 is which
// workshop's data-workshop index it reads from (which in turn points at
// that workshop's own tallyFormId and dateOptions in events.js). This
// keeps the two workshops' logic identical and independent without
// duplicating code.
// -------------------------------------------------------------------------
function handleContinueClick(btn) {
  const workshopIndex = btn.dataset.workshop;
  const workshop = CONFIG.workshops[workshopIndex];
  if (!workshop) {
    console.error(`Weekend Artist site: no entry found in CONFIG.workshops at index ${workshopIndex} for a Continue button.`);
    return;
  }

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

  openTallyPopup(workshop.tallyFormId, encodedSelectedDates);
}

// -------------------------------------------------------------------------
// EAT, DRAW, PLAY (AND ANY FUTURE SIMPLE INTEREST/REGISTER CARD) POPUP
// LOGIC
// This button opens its Tally form immediately on click — there's no
// date selection to wait for, and no selectedDates value is ever passed
// (openTallyPopup is called with no second argument, so the hidden
// field is left out of the popup options entirely).
// -------------------------------------------------------------------------
function handleRegisterClick(btn) {
  const workshopIndex = btn.dataset.workshop;
  const workshop = CONFIG.workshops[workshopIndex];
  if (!workshop) {
    console.error(`Weekend Artist site: no entry found in CONFIG.workshops at index ${workshopIndex} for a Register button.`);
    return;
  }

  openTallyPopup(workshop.tallyFormId);
}

// -------------------------------------------------------------------------
// WHERE THE TALLY FORM IDs ARE USED
// Every popup on the page — both workshop Continue buttons and the Eat,
// Draw, Play Register button — opens its form through this one shared
// function, using the official Tally popup method:
//   window.Tally.openPopup(FORM_ID, options)
// It retries for a little while if the Tally widget script hasn't
// finished loading yet, and logs a clear console error if the form ID
// is missing, or if Tally never becomes available at all.
// -------------------------------------------------------------------------
const TALLY_POPUP_MAX_ATTEMPTS = 40; // roughly 12 seconds of retrying, 300ms apart

function openTallyPopup(formId, encodedSelectedDates) {
  if (!formId) {
    console.error("Weekend Artist site: tried to open a Tally popup, but no tallyFormId is set for this card in events.js.");
    return;
  }
  attemptOpenTallyPopup(formId, encodedSelectedDates, 0);
}

function attemptOpenTallyPopup(formId, encodedSelectedDates, attemptNumber) {
  if (typeof window.Tally !== "undefined" && typeof window.Tally.openPopup === "function") {
    const options = {};
    if (encodedSelectedDates) {
      options.hiddenFields = {
        selectedDates: encodedSelectedDates
      };
    }
    window.Tally.openPopup(formId, options);
    return;
  }

  if (attemptNumber >= TALLY_POPUP_MAX_ATTEMPTS) {
    console.error(`Weekend Artist site: the Tally widget script never became available — could not open the popup for form "${formId}". Check that https://tally.so/widgets/embed.js is loading successfully (e.g. not blocked by an ad blocker or network error).`);
    return;
  }

  // The Tally widget script may still be loading — try again shortly
  // rather than doing nothing.
  setTimeout(() => attemptOpenTallyPopup(formId, encodedSelectedDates, attemptNumber + 1), 300);
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
  if (!wrap) {
    console.error('Weekend Artist site: could not find "#general-suggestions-embed" — that form was not rendered.');
    return;
  }
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
// many forms are on the page (two workshop popups + one interest popup
// + one embed). It also activates the General Suggestions iframe once
// the script is ready, and makes window.Tally.openPopup available for
// every popup button.
// -------------------------------------------------------------------------
function loadTallyWidget() {
  const d = document;
  const w = "https://tally.so/widgets/embed.js";
  const activate = function () {
    if (typeof window.Tally !== "undefined") {
      window.Tally.loadEmbeds();
    } else {
      d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((e) => {
        e.src = e.dataset.tallySrc;
      });
    }
  };
  if (typeof window.Tally !== "undefined") {
    activate();
  } else if (d.querySelector('script[src="' + w + '"]') == null) {
    const s = d.createElement("script");
    s.src = w;
    s.async = true;
    s.onload = activate;
    s.onerror = function () {
      console.error("Weekend Artist site: the Tally widget script failed to load from " + w + " — popups and the General Suggestions form will not work.");
      activate();
    };
    d.body.appendChild(s);
  }
}

// -------------------------------------------------------------------------
// Apply CONFIG links to the relevant elements
// -------------------------------------------------------------------------
function applyLinks() {
  const instagramLink = document.querySelector(".connect-instagram");
  if (instagramLink) {
    instagramLink.href = CONFIG.links.instagramUrl;
  }
}

initEventListClickHandling();
initWorkshopListClickHandling();
renderEvents();
renderWorkshops();
renderGeneralSuggestions();
loadTallyWidget();
applyLinks();
