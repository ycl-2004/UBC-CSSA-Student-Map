(() => {
  "use strict";
  const { byId, escapeHtml: html, mobileLayout } = window.CSSAMap;
  const { categoryLabel } = window.CSSAMap;

  function createPartnerList(onSelect, onClear) {
    const list = byId("partnerList");
    function activate(event) {
      if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
      const card = event.target.closest(".partner-card[data-id]");
      if (!card) return;
      if (event.type === "keydown") event.preventDefault();
      onSelect(card.dataset.id, true);
    }
    list.addEventListener("click", event => {
      if (event.target.closest("#clearFiltersButton")) onClear();
      else activate(event);
    });
    list.addEventListener("keydown", activate);
    return {
      render(partners, selectedId) {
        byId("partnerCount").textContent = partners.length;
        list.innerHTML = partners.length ? partners.map(p => `
          <article class="partner-card ${selectedId === p.id ? "active" : ""}" data-id="${html(p.id)}" data-category="${html(p.category)}" tabindex="0" role="button" aria-label="${html(p.name)}，${html(p.perk)}" aria-haspopup="dialog">
            <div class="card-icon" aria-hidden="true">${html(p.icon)}</div>
            <div class="card-info">
              <div class="name">${html(p.name)}</div>
              <div class="sub"><span class="badge-area">${html(p.areaLabel.split("·")[0].trim())}</span><span>${p.onlineOnly ? "线上配送" : categoryLabel[p.category]}</span></div>
            </div>
            <div class="card-perk">${html(p.shortPerk || p.perk)}</div>
          </article>`).join("") : `
          <div class="empty-state" role="status"><p>没有找到匹配的小店</p><button type="button" id="clearFiltersButton">清除搜索和筛选</button></div>`;
      },
      select(id) {
        // Update only selection, keeping card DOM, keyboard focus, and list scroll intact.
        list.querySelectorAll(".partner-card").forEach(card => card.classList.toggle("active", card.dataset.id === id));
      }
    };
  }

  function createDrawer() {
    const sheet = byId("sidebarSheet"), handle = byId("drawerHandle"), toggle = byId("filterToggle");
    function setExpanded(expanded) {
      sheet.classList.toggle("sheet-expanded", expanded);
      handle.setAttribute("aria-expanded", String(expanded));
      byId("drawerToggleText").textContent = expanded ? "收起列表，查看地图" : "展开商家列表";
    }
    let touchY = null, dragged = false;
    handle.addEventListener("touchstart", event => { touchY = event.touches[0].clientY; dragged = false; }, { passive: true });
    handle.addEventListener("touchend", event => {
      if (touchY === null) return;
      const delta = event.changedTouches[0].clientY - touchY;
      if (Math.abs(delta) > 30) { dragged = true; setExpanded(delta < 0); }
      touchY = null;
    }, { passive: true });
    handle.addEventListener("click", () => {
      if (dragged) { dragged = false; return; }
      setExpanded(!sheet.classList.contains("sheet-expanded"));
    });
    toggle.addEventListener("click", () => {
      setExpanded(true);
      const open = sheet.classList.toggle("filters-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    byId("searchInput").addEventListener("focus", () => { if (mobileLayout.matches) setExpanded(true); });
    setExpanded(false);
    return { setExpanded };
  }

  Object.assign(window.CSSAMap, { createPartnerList, createDrawer });
})();
