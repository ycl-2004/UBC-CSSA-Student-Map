(() => {
  "use strict";
  const { landmarks, districtGlows, coreCoordinates, outerAreaIds } = window.CSSAMap;
  const { createStickerIcon, addCluster } = window.CSSAMap;
  const L = window.L;

  function createPartnerMap(partners, onSelect) {
    const map = L.map("leafletMap", {
      center: [49.2350, -123.1250],
      zoom: 11,
      zoomSnap: 0.25,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: true,
      fadeAnimation: false
    });

    // Esri World Topo Map
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
      attribution: '<details class="map-attribution"><summary>Powered by Esri · 地图来源</summary><div>Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community</div></details>',
      updateWhenIdle: false,
      updateInterval: 100,
      keepBuffer: 3,
      maxZoom: 19
    }).addTo(map);

    map.attributionControl.setPrefix(false);

    const coreBounds = L.latLngBounds(coreCoordinates);
    const outerBounds = L.latLngBounds(partners.filter(p => outerAreaIds.has(p.area) && p.lat && p.lng).map(p => [p.lat, p.lng]));
    const allStoreBounds = L.latLngBounds(partners.filter(p => p.lat && p.lng).map(p => [p.lat, p.lng]));

    // Store markers, pastel district accents, and curated place labels.
    const markerGroup = L.layerGroup().addTo(map);
    const districtGroup = L.layerGroup().addTo(map);
    const landmarkGroup = L.layerGroup().addTo(map);
    let visiblePartners = [];
    let selectedId = null;

    districtGlows.forEach(area => L.circle([area.lat, area.lng], {
      radius: area.radius,
      color: area.color,
      weight: 1.5,
      opacity: 0.45,
      dashArray: "6 8",
      fillColor: area.color,
      fillOpacity: 0.05,
      interactive: false
    }).addTo(districtGroup));

    function renderLandmarks() {
      landmarkGroup.clearLayers();
      const zoom = map.getZoom();
      // When zoomed in close, street names on the map and merchant pins take center stage
      if (zoom >= 13.8) return;
      const visibleBounds = map.getBounds().pad(0.08);
      const coreNames = new Set(["Vancouver", "Downtown", "Richmond", "Burnaby", "UBC", "YVR Airport"]);
      const isCoreView = coreBounds.contains(map.getCenter());
      landmarks.filter(lm => lm.level === "major" && (!isCoreView || coreNames.has(lm.name)) && visibleBounds.contains([lm.lat, lm.lng])).forEach(lm => {
        const icon = L.divIcon({
          className: "custom-leaflet-marker",
          html: `<div class="landmark-badge ${lm.level} ${lm.tone} ${zoom < 11 ? "compact" : ""}">${lm.name}</div>`,
          iconSize: [0, 0]
        });
        L.marker([lm.lat, lm.lng], { icon, interactive: false, zIndexOffset: -500 }).addTo(landmarkGroup);
      });
    }

    function renderMarkers(visible) {
      markerGroup.clearLayers();
      const zoom = map.getZoom();
      const mapBounds = map.getBounds().pad(0.12);
      const nearby = visible.filter(p => p.lat && p.lng && mapBounds.contains([p.lat, p.lng]));
      const groups = new Map();

      nearby.forEach(p => {
        const point = map.latLngToContainerPoint([p.lat, p.lng]);
        const key = `${Math.floor(point.x / 54)}:${Math.floor(point.y / 54)}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(p);
      });

      groups.forEach(group => {
        if (group.length > 1 && zoom < 15) {
          addCluster(group, map, markerGroup);
          return;
        }
        group.forEach(p => {
          const isSel = selectedId === p.id;
          const marker = L.marker([p.lat, p.lng], {
            icon: createStickerIcon(p, isSel, isSel || zoom >= 14),
            title: `${p.name} · ${p.shortPerk || p.perk}`,
            zIndexOffset: isSel ? 1000 : 0
          });
          marker.on("click", (e) => {
            L.DomEvent.stopPropagation(e);
            onSelect(p.id, false);
          });
          marker.addTo(markerGroup);
        });
      });
    }

    const jumpPresets = {
      core: { bounds: coreBounds, maxZoom: 12.5 },
      ubc: { center: [49.2630, -123.2460], zoom: 15 },
      downtown: { center: [49.2815, -123.1170], zoom: 14 },
      vancouver: { bounds: L.latLngBounds(partners.filter(p => p.area === "vancouver").map(p => [p.lat, p.lng])), maxZoom: 12.5 },
      richmond: { center: [49.1790, -123.1330], zoom: 14 },
      burnaby: { center: [49.2290, -123.0030], zoom: 14 },
      outer: { bounds: outerBounds, maxZoom: 11.6 },
      all: { bounds: allStoreBounds, maxZoom: 10.8 }
    };

    function flyToPreset(dest) {
      const preset = jumpPresets[dest];
      if (!preset) return;
      if (preset.bounds) {
        map.flyToBounds(preset.bounds, { padding: [48, 48], maxZoom: preset.maxZoom, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.9 });
      } else {
        map.flyTo(preset.center, preset.zoom, { duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.9 });
      }
    }
    // Zoom also emits moveend. Coalesce paired events into one render per frame.
    let renderFrame = null;
    map.on("moveend zoomend", () => {
      if (renderFrame !== null) return;
      renderFrame = requestAnimationFrame(() => {
        renderFrame = null;
        renderMarkers(visiblePartners);
        renderLandmarks();
      });
    });
    // Leaflet requires invalidateSize after its container changes dimensions.
    // https://leafletjs.com/reference.html#map-invalidatesize
    new ResizeObserver(() => map.invalidateSize({ pan: false })).observe(document.getElementById("leafletMap"));
    map.fitBounds(coreBounds, { padding: [42, 42], maxZoom: 12.4 });
    renderLandmarks();
    return {
      update(visible, id) { visiblePartners = visible; selectedId = id; renderMarkers(visible); },
      focusPartner(partner) {
        if (partner.lat && partner.lng) map.flyTo([partner.lat, partner.lng], 15, { duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.8 });
      },
      flyToPreset,
      zoomIn: () => map.zoomIn(),
      zoomOut: () => map.zoomOut()
    };
  }

  Object.assign(window.CSSAMap, { createPartnerMap });
})();
