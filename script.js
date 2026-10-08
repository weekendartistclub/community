/* =========================================================================
   SCRIPT.JS — SITE BEHAVIOUR
   =========================================================================
   This file reads the content from events.js (the CONFIG object) and:
     - builds each "Upcoming Events" card from CONFIG.events — a photo
       (if there is one), details, and (if the event has a
       "registrationUrl") a button that opens that link in a new tab
     - builds each "Upcoming Workshops" card from CONFIG.workshops, the
       same way
     - applies your Instagram link

   The registration button is a normal link (<a href target="_blank">),
   so the browser handles it natively on desktop and mobile — no extra
   JavaScript is needed for it to work.

   You shouldn't need to edit this file for normal updates — for that,
   go to events.js instead. This file is here so the logic doesn't
   clutter up the HTML.
   ========================================================================= */

// -------------------------------------------------------------------------
// Small helper: safely escape text before inserting it into HTML, so a
// description or image path can never accidentally break the page.
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
// Builds every card in one list (events or workshops), in list order —
// photo, details, and a button if the entry has a "registrationUrl".
// Entries without a registrationUrl simply have no button.
// -------------------------------------------------------------------------
function renderCards(listId, items) {
  const list = document.getElementById(listId);
  if (!list) {
    console.error(`Weekend Artist site: could not find "#${listId}" in the page — no cards were rendered there.`);
    return;
  }
  list.innerHTML = "";

  items.forEach((item) => {
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

    // ---- Optional pieces — each only shown if it's set ----
    const kindHtml = item.kind
      ? `<span class="card-kind">${escapeHtml(item.kind)}</span>`
      : "";

    const metaParts = [item.when, item.where].filter(Boolean).map(escapeHtml);
    const metaHtml = metaParts.length
      ? `<div class="meta">${metaParts.join(" · ")}</div>`
      : "";

    const descHtml = item.description
      ? `<p class="desc">${escapeHtml(item.description)}</p>`
      : "";

    const spotsHtml = item.spots
      ? `<div class="spots">${escapeHtml(item.spots)}</div>`
      : "";

    // ---- Registration button: a real link that opens in a new tab ----
    // Uses the existing .btn .btn-primary .register-btn styling.
    const buttonHtml = item.registrationUrl
      ? `
        <a
          class="btn btn-primary register-btn"
          href="${escapeHtml(item.registrationUrl)}"
          target="_blank"
          rel="noopener noreferrer">
          ${escapeHtml(item.buttonText || "Sign Up")}
        </a>
      `
      : "";

    card.innerHTML = `
      <span class="tape"></span>
      ${imageHtml}
      ${kindHtml}
      <h3>${escapeHtml(item.title)}</h3>
      ${metaHtml}
      ${descHtml}
      ${spotsHtml}
      ${buttonHtml}
    `;
    list.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// Apply CONFIG links to the relevant elements
// -------------------------------------------------------------------------
function applyLinks() {
  document
    .querySelectorAll(".connect-instagram, .connect-instagram-inline")
    .forEach((link) => {
      link.href = CONFIG.links.instagramUrl;
    });
}

renderCards("event-list", CONFIG.events);
renderCards("workshop-list", CONFIG.workshops);
applyLinks();
