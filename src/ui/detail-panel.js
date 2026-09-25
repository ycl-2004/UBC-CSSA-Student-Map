(() => {
  "use strict";
  const { byId, escapeHtml: html, mobileLayout } = window.CSSAMap;

  function createDetailPanel(onClose) {
    const dialog = byId("detailCard"), main = document.querySelector(".app-main");
    const close = byId("btnCloseDetail"), usage = byId("usageNote"), nav = byId("btnNavMaps");
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
    const stops = [close, byId("detailBody"), nav, byId("btnHowToUse")]
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
      if (!selected || selected.onlineOnly || !selected.lat || !selected.lng) return;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`, "_blank", "noopener,noreferrer");
    });
    byId("btnHowToUse").addEventListener("click", () => {
      usage.hidden = !usage.hidden;
      byId("btnHowToUse").setAttribute("aria-expanded", String(!usage.hidden));
      if (!usage.hidden) usage.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    return {
      open(partner, fromList) {
        selected = partner;
        returnTarget = fromList ? document.querySelector(`.partner-card[data-id="${partner.id}"]`) : document.activeElement;
        byId("cardIcon").textContent = partner.icon;
        byId("cardName").textContent = partner.name;
        byId("cardArea").textContent = partner.onlineOnly ? "大温配送 · 线上订餐（无实体店）" : partner.address;
        byId("cardPerk").textContent = partner.perk.replace(/[；;]/g, "\n").trim();
        byId("cardDesc").textContent = partner.onlineOnly ? "提供大温地区线上订餐与配送服务。" : "凭有效 UBC CSSA 会员卡享受以上优惠；具体使用条件以店家说明为准。";
        byId("cardTags").innerHTML = partner.tags.map(tag => `<span class="tag-badge">#${html(tag)}</span>`).join("");
        nav.disabled = !!partner.onlineOnly || !partner.lat || !partner.lng;
        nav.textContent = nav.disabled ? "仅支持配送" : "📍 导航路线";
        usage.hidden = true;
        byId("btnHowToUse").setAttribute("aria-expanded", "false");
        usage.textContent = partner.onlineOnly ? "线上下单前请向商家确认会员优惠及配送范围。" : "点单、结账前出示有效 UBC CSSA 会员卡，并确认本次消费适用的优惠；官网折扣请按上方说明输入折扣码。";
        main.classList.add("detail-open");
        present();
        byId("detailBody").scrollTop = 0;
      }
    };
  }

  Object.assign(window.CSSAMap, { createDetailPanel });
})();
