(() => {
  "use strict";
  const { outerAreaIds } = window.CSSAMap;

  const searchTermsByCategory = {
    food: ["美食", "正餐", "餐厅", "restaurant", "dining", "food"],
    drink: ["饮品", "奶茶", "茶饮", "甜点", "饮料", "drink", "boba"],
    fun: ["玩乐", "娱乐", "fun"],
    life: ["生活", "日常", "life"]
  };
  const normalizeSearch = value => String(value || "").normalize("NFKC").toLowerCase().replace(/[.,/()·|_-]+/g, " ").trim();
  const categoryLabel = { food: "美食", drink: "饮品", fun: "玩乐", life: "生活" };

  function matchToken(token, str) {
    if (!token) return true;
    if (/^[a-z0-9]+$/i.test(token)) {
      const words = str.split(/\s+/);
      if (words.some(w => w.startsWith(token))) return true;
      const boundaryRegex = new RegExp('(?:^|[^a-z0-9])' + token + '(?:[^a-z0-9]|$)', 'i');
      return boundaryRegex.test(str);
    }
    return str.includes(token);
  }

  function filterPartners(partners, state) {
    const queryTokens = normalizeSearch(state.query).split(/\s+/).filter(Boolean);
    return partners.filter(p => {
      const matchCat = state.category === "all" || p.category === state.category;
      const matchArea = state.area === "all" || p.area === state.area || (state.area === "outer" && outerAreaIds.has(p.area));
      const searchable = normalizeSearch([
        p.name, p.area, p.areaLabel, p.perk, p.shortPerk, p.tags.join(" "), p.address,
        p.aliases?.join(" "), searchTermsByCategory[p.category]?.join(" ")
      ].join(" "));
      const matchQuery = !queryTokens.length || queryTokens.every(token => matchToken(token, searchable));
      return matchCat && matchArea && matchQuery;
    });
  }

  Object.assign(window.CSSAMap, { categoryLabel, filterPartners });
})();
