(() => {
  "use strict";
  const { partners } = window.CSSAMap;
  const { filterPartners } = window.CSSAMap;
  const { createPartnerMap } = window.CSSAMap;
  const { createPartnerList, createDrawer } = window.CSSAMap;
  const { createDetailPanel } = window.CSSAMap;
  const { byId } = window.CSSAMap;

  const state = { category: "all", area: "all", query: "", selectedId: null };
  let visible = partners;
  const list = createPartnerList(selectPartner, clearFilters);
  createDrawer();
  const detail = createDetailPanel(() => {
    state.selectedId = null;
    list.select(null);
    map?.update(visible, null);
  });
  // Keep search and the merchant list useful even if the external map library fails.
  const map = window.L ? createPartnerMap(partners, selectPartner) : null;
  if (!map) {
    byId("mapUnavailable").hidden = false;
    document.querySelectorAll(".map-controls button, [data-jump]").forEach(button => button.disabled = true);
  }

  function render() {
    visible = filterPartners(partners, state);
    list.render(visible, state.selectedId);
    map?.update(visible, state.selectedId);
    const count = Number(state.category !== "all") + Number(state.area !== "all");
    byId("filterToggle").textContent = count ? `筛选 ${count}` : "筛选";
  }
  function selectPartner(id, fromList = false) {
    const partner = partners.find(p => p.id === id);
    if (!partner) return;
    state.selectedId = id;
    list.select(id);
    map?.update(visible, id);
    detail.open(partner, fromList);
    map?.focusPartner(partner);
  }
  function setJumpActive(jumpKey) {
    document.querySelectorAll("[data-jump]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.jump === jumpKey);
    });
  }
  function clearFilters() {
    Object.assign(state, { category: "all", area: "all", query: "" });
    byId("searchInput").value = "";
    document.querySelectorAll("[data-cat], [data-area]").forEach(button => {
      button.setAttribute("aria-pressed", String((button.dataset.cat || button.dataset.area) === "all"));
    });
    byId("activeCategoryHint").textContent = "全部类型";
    setJumpActive("core");
    render();
    map?.flyToPreset("core");
  }
  byId("searchInput").addEventListener("input", event => { state.query = event.target.value; render(); });
  document.querySelectorAll("[data-cat]").forEach(button => button.addEventListener("click", () => {
    state.category = button.dataset.cat;
    document.querySelectorAll("[data-cat]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    byId("activeCategoryHint").textContent = button.textContent.trim();
    render();
  }));
  document.querySelectorAll("[data-area]").forEach(button => button.addEventListener("click", () => {
    state.area = button.dataset.area;
    document.querySelectorAll("[data-area]").forEach(other => other.setAttribute("aria-pressed", String(other === button)));
    setJumpActive(state.area);
    render();
    map?.flyToPreset(state.area);
  }));
  document.querySelectorAll("[data-jump]").forEach(button => button.addEventListener("click", () => {
    setJumpActive(button.dataset.jump);
    map?.flyToPreset(button.dataset.jump);
  }));
  byId("btnZoomIn").addEventListener("click", () => map?.zoomIn());
  byId("btnZoomOut").addEventListener("click", () => map?.zoomOut());
  byId("btnResetView").addEventListener("click", () => {
    setJumpActive("core");
    map?.flyToPreset("core");
  });

  let toastTimer;
  function showToast(text) {
    const toast = byId("appToast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
  }
  byId("btnHowToCard").addEventListener("click", () => showToast("CSSA 会员可在微信公众号、迎新现场加入 CSSA 会员获取电子卡。"));
  byId("btnSuggest").addEventListener("click", () => showToast("欢迎私信 CSSA 市场部，推荐你想享受折扣的大温小店。"));

  // Visual viewport also contracts when a phone's on-screen keyboard is visible.
  function updateViewport() {
    if (!window.visualViewport || window.visualViewport.scale === 1) {
      document.documentElement.style.setProperty("--viewport-height", `${window.visualViewport?.height || window.innerHeight}px`);
    }
  }
  window.visualViewport?.addEventListener("resize", updateViewport);
  window.addEventListener("resize", updateViewport);
  updateViewport();
  setJumpActive("core");
  render();
})();
