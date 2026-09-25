# CSSA modularization and mobile detail repair

## Goal
Split the single-file map into maintainable files and repair the overlapping mobile detail/list experience.

## Requirements (append-only)
1. Separate HTML, styles, merchant data, map logic, search, and UI components.
2. Retain current merchant data, search behavior, core map and English major place names.
3. Make mobile details a single panel; preserve list position and focus on return; support small phones and tablets.
4. Add clear local run and maintenance documentation.
5. Fix map regression: both direct file:// and HTTP entry must initialize the map.
6. Run checks, then commit. Latest user instruction asks for commit; do not push.

## Decisions
- Native ES modules reproduced a file:// regression (0 merchants, no map). Replaced them with scoped classic defer scripts under one CSSAMap namespace.
- Native modal dialog on mobile; nonmodal card on desktop. Close returns to the same list DOM.
- Runtime merchant source is src/data/partners.js; CSV remains a historical source snapshot.

## Evidence
- file:// previously reproduced 0 records/0 tiles; fixed page showed 30 records, map markers and loaded tiles.
- All 10 JavaScript files passed `node --check`; `node --test tests/search.test.cjs` passed 6/6.
- Responsive browser sweep passed both `file://` and HTTP across seven viewports (320×568, 320×693, 390×844, 568×320, 768×1024, 1024×768, 1440×900): 30 listings, map and markers, no viewport overflow, and appropriate modal/nonmodal detail behavior.
- Mobile detail checks passed for complete long offers, fixed header/footer, close and focus/scroll restoration, Tab/Shift+Tab containment, Escape, and switching across the 860px breakpoint.
- Leaflet-blocked fallback passed: search/detail still work, navigation disables without map support; restoring the CDN loads tiles again.
- Data check: 30 unique merchants, 29 physical records with coordinates, and one online-only listing.
