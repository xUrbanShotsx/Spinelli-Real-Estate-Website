"use client";
import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
  suburbLabels?: { name: string; lat: number; lng: number }[];
}

const DEFAULT_SUBURBS = [
  { name: "Shellharbour City Centre", lat: -34.5645, lng: 150.8367 },
  { name: "Shell Cove",               lat: -34.5780, lng: 150.8430 },
  { name: "Blackbutt",                lat: -34.5678, lng: 150.8357 },
  { name: "Albion Park Rail",         lat: -34.5720, lng: 150.8060 },
];

export default function ProjectMap({ lat, lng, zoom = 16, suburbLabels = DEFAULT_SUBURBS }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import("leaflet").Map;

    (async () => {
      const L = (await import("leaflet")).default;

      // @ts-expect-error _getIconUrl not in types
      delete L.Icon.Default.prototype._getIconUrl;

      // Custom Spinelli blue drop pin
      const blueIcon = L.divIcon({
        className: "",
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 26 14 26S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="#5BC2E7"/>
          <circle cx="14" cy="14" r="5" fill="#ffffff"/>
        </svg>`,
        iconSize: [28, 40],
        iconAnchor: [14, 40],
      });

      map = L.map(containerRef.current!, {
        center: [lat, lng],
        zoom,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
        dragging: false,
        doubleClickZoom: false,
      });

      // Base: no labels
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Suburb name labels (manual, styled)
      suburbLabels.forEach(({ name, lat: sLat, lng: sLng }) => {
        L.marker([sLat, sLng], {
          icon: L.divIcon({
            className: "",
            html: `<span style="font-family:sans-serif;font-size:10px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:0.12em;white-space:nowrap;text-shadow:0 1px 2px rgba(255,255,255,0.9)">${name}</span>`,
            iconAnchor: [0, 6],
          }),
          interactive: false,
        }).addTo(map);
      });

      // Pin
      L.marker([lat, lng], { icon: blueIcon }).addTo(map);

      // Zoom control — bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);
    })();

    return () => {
      map?.remove();
    };
  }, [lat, lng, zoom, suburbLabels]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <style>{`.leaflet-control-zoom a { border-radius: 0 !important; border-color: #e0e0e0 !important; color: #0a172d !important; font-size: 16px !important; } .leaflet-control-zoom { border: none !important; box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important; }`}</style>
      <div ref={containerRef} style={{ width: "100%", height: "520px" }} />
    </>
  );
}
