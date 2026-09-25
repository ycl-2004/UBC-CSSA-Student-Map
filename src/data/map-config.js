(() => {
  "use strict";
  const landmarks = [
    { name: "Vancouver", lat: 49.2900, lng: -123.1390, level: "major", tone: "vancouver" },
    { name: "Richmond", lat: 49.1665, lng: -123.1510, level: "major", tone: "richmond" },
    { name: "Burnaby", lat: 49.2390, lng: -123.0160, level: "major", tone: "burnaby" },
    { name: "UBC", lat: 49.2680, lng: -123.2550, level: "major", tone: "ubc" },
    { name: "YVR Airport", lat: 49.2040, lng: -123.1710, level: "major", tone: "airport" },
    { name: "Surrey", lat: 49.1825, lng: -122.8460, level: "major", tone: "richmond" },
    { name: "Coquitlam", lat: 49.2830, lng: -122.7930, level: "major", tone: "burnaby" },
    { name: "Langley", lat: 49.1040, lng: -122.6600, level: "major", tone: "vancouver" },
    { name: "Broadway", lat: 49.2640, lng: -123.1760, level: "local", tone: "vancouver" },
    { name: "Downtown", lat: 49.2840, lng: -123.1200, level: "local", tone: "vancouver" },
    { name: "Alexandra Rd", lat: 49.1795, lng: -123.1280, level: "local", tone: "richmond" },
    { name: "Metrotown", lat: 49.2250, lng: -123.0030, level: "local", tone: "burnaby" },
    { name: "Richmond Centre", lat: 49.1660, lng: -123.1360, level: "local", tone: "richmond" }
  ];

  const districtGlows = [
    { lat: 49.2815, lng: -123.1250, radius: 3300, color: "#ed8b79" },
    { lat: 49.1790, lng: -123.1350, radius: 3000, color: "#e7b74e" },
    { lat: 49.2280, lng: -123.0030, radius: 2700, color: "#927ddb" },
    { lat: 49.2606, lng: -123.2460, radius: 2500, color: "#51aa9b" }
  ];

  const coreCoordinates = [[49.158, -123.265], [49.300, -122.958]];
  const outerAreaIds = new Set(["langley", "surrey", "coquitlam"]);

  Object.assign(window.CSSAMap, { landmarks, districtGlows, coreCoordinates, outerAreaIds });
})();
