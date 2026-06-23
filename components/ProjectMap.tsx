"use client";
import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function ProjectMap({ lat, lng, zoom = 15 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import("leaflet").Map;

    (async () => {
      const L = (await import("leaflet")).default;

      // @ts-expect-error _getIconUrl not in types
      delete L.Icon.Default.prototype._getIconUrl;

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
        dragging: true,
        doubleClickZoom: true,
      });

      // Base: clean streets, no labels
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Labels only (suburb + place names from tile server — accurate positions)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      L.marker([lat, lng], { icon: blueIcon }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);
    })();

    return () => {
      map?.remove();
    };
  }, [lat, lng, zoom]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      <style>{`
        .leaflet-control-zoom a {
          border-radius: 0 !important;
          border-color: #e0e0e0 !important;
          color: #0a172d !important;
          font-size: 16px !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
        }
        .leaflet-grab { cursor: grab; }
        .leaflet-dragging .leaflet-grab { cursor: grabbing; }
      `}</style>
      <div ref={containerRef} style={{ width: "100%", height: "520px" }} />
    </>
  );
}
