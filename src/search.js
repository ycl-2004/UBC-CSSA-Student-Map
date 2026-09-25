(() => {
  "use strict";
  const { outerAreaIds } = window.CSSAMap;

  const searchTermsByCategory = {
    food: ["美食", "正餐", "餐厅", "restaurant", "dining", "火锅", "food"],
    drink: ["饮品", "奶茶", "茶饮", "甜点", "饮料", "drink", "boba"],
    fun: ["玩乐", "ktv", "卡拉ok", "娱乐", "fun"],
    life: ["生活", "美容", "护肤", "健身", "life"]
  };
  const normalizeSearch = value => String(value || "").normalize("NFKC").toLowerCase().replace(/[.,/()·|_-]+/g, " ").trim();
  const categoryLabel = { food: "美食", drink: "饮品", fun: "玩乐", life: "生活" };

  function filterPartners(partners, state) {
    const queryTokens = normalizeSearch(state.query).split(/\s+/).filter(Boolean);
    return partners.filter(p => {
      const matchCat = state.category === "all" || p.category === state.category;
      const matchArea = state.area === "all" || p.area === state.area || (state.area === "outer" && outerAreaIds.has(p.area));
      const searchable = normalizeSearch([
        p.name, p.area, p.areaLabel, p.desc, p.perk, p.shortPerk, p.tags.join(" "), p.address,
        p.aliases?.join(" "), searchTermsByCategory[p.category]?.join(" ")
      ].join(" "));
      const matchQuery = !queryTokens.length || queryTokens.every(token => searchable.includes(token));
      return matchCat && matchArea && matchQuery;
    });
  }

  Object.assign(window.CSSAMap, { categoryLabel, filterPartners });
})();
