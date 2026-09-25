(() => {
  "use strict";
  const { byId, escapeHtml: html, mobileLayout } = window.CSSAMap;

  function createDetailPanel(onClose) {
    const dialog = byId("detailCard"), main = document.querySelector(".app-main");
    const close = byId("btnCloseDetail"), website = byId("shopLink"), nav = byId("btnNavMaps");
    let selected = null, returnTarget = null;

  function present() {
      // Native modal dialogs supply focus containment and inert backgrounds on mobile.
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
      if (dialog.open) dialog.close();
      if (mobileLayout.matches) dialog.showModal();
      else dialog.show();
  }
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", event => {
    if (event.key !== "Tab" || !dialog.matches(":modal")) return;
    const stops = [close, byId("detailBody"), nav, website]
      .filter(element => !element.disabled && !element.hidden);
    const first = stops[0], last = stops.at(-1), active = document.activeElement;
    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener("click", event => {
      const r = dialog.getBoundingClientRect();
      if (mobileLayout.matches && event.target === dialog &&
          (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => {
      // A breakpoint change closes and immediately reopens the same dialog.
      if (dialog.open) return;
      main.classList.remove("detail-open");
      selected = null;
      onClose();
      if (returnTarget?.isConnected) returnTarget.focus({ preventScroll: true });
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && dialog.open && !mobileLayout.matches) dialog.close();
    });
    mobileLayout.addEventListener("change", () => { if (dialog.open) present(); });
    nav.addEventListener("click", () => {
      if (!selected || selected.addressPending || !selected.lat || !selected.lng) return;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`, "_blank", "noopener,noreferrer");
    });
    return {
      open(partner, fromList) {
        selected = partner;
        returnTarget = fromList ? document.querySelector(`.partner-card[data-id="${partner.id}"]`) : document.activeElement;
        byId("cardIcon").textContent = partner.icon;
        byId("cardName").textContent = partner.name;
        byId("cardArea").textContent = partner.address;
        byId("cardPerk").textContent = partner.perk.replace(/[；;]/g, "\n").trim();
        byId("cardTags").innerHTML = partner.tags.map(tag => `<span class="tag-badge">#${html(tag)}</span>`).join("");
        nav.disabled = !!partner.addressPending || !partner.lat || !partner.lng;
        nav.textContent = nav.disabled ? "地址待确认" : "📍 导航路线";
        const validLink = /^https?:\/\//i.test(partner.website || "");
        website.hidden = !validLink;
        if (validLink) website.href = partner.website;
        else website.removeAttribute("href");
        website.setAttribute("aria-label", `${partner.name} 店铺链接（新窗口打开）`);
        main.classList.add("detail-open");
        present();
        byId("detailBody").scrollTop = 0;
      }
    };
  }

  Object.assign(window.CSSAMap, { createDetailPanel });
})();
