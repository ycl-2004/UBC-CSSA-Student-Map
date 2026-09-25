(() => {
  "use strict";
  const byId = id => document.getElementById(id);
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  // Keep this breakpoint aligned with styles/responsive.css.
  const mobileLayout = window.matchMedia("(max-width: 860px)");

  Object.assign(window.CSSAMap, { byId, escapeHtml, mobileLayout });
})();
