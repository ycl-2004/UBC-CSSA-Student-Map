(() => {
  "use strict";
  const L = window.L;
  const { escapeHtml: html } = window.CSSAMap;

  function createStickerIcon(partner, isActive, showLabel) {
    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div class="merchant-sticker-pin category-${partner.category} ${isActive ? "active" : ""} ${showLabel ? "show-label" : ""}" data-id="${partner.id}">
          <div class="pin-sparkle">✦</div>
          <div class="pin-bubble">
            <div class="pin-icon">${partner.icon}</div>
          </div>
          <div class="pin-tail"></div>
          <div class="pin-caption">${html(partner.name)}</div>
        </div>
      `,
      iconSize: [0, 0]
    });
  }

  function addCluster(group, map, markerGroup) {
    const categoryCounts = group.reduce((counts, p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      return counts;
    }, {});
    const dominantCategory = Object.keys(categoryCounts).sort((a, b) => categoryCounts[b] - categoryCounts[a])[0];
    const colors = { food: "#e87864", drink: "#4ba99b", fun: "#8a76d5", life: "#d49a36" };
    const icon = L.divIcon({
      className: "custom-leaflet-marker",
      html: `<div class="merchant-cluster" style="--cluster-color:${colors[dominantCategory] || "#d8262c"}" aria-label="${group.length} 家店"><span>${group.length}</span></div>`,
      iconSize: [44, 48],
      iconAnchor: [22, 38]
    });
    const center = L.latLng(
      group.reduce((sum, p) => sum + p.lat, 0) / group.length,
      group.reduce((sum, p) => sum + p.lng, 0) / group.length
    );
    const marker = L.marker(center, { icon, title: `${group.length} 家合作店` });
    marker.on("click", (e) => {
      L.DomEvent.stopPropagation(e);
      const bounds = L.latLngBounds(group.map(p => [p.lat, p.lng]));
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        map.flyTo(center, Math.min(17, map.getZoom() + 2), { duration: 0.65 });
      } else {
        map.flyToBounds(bounds, { padding: [64, 64], maxZoom: 16, duration: 0.65 });
      }
    });
    marker.addTo(markerGroup);
  }

  Object.assign(window.CSSAMap, { createStickerIcon, addCluster });
})();
