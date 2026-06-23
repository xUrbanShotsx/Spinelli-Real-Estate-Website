"use client";
import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
  zoom?: number;
}

export default function ProjectMap({ lat, lng, zoom = 16 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import("leaflet").Map;

    (async () => {
      const L = (await import("leaflet")).default;

      // Prevent Leaflet's default icon from breaking in Next.js
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
        popupAnchor: [0, -40],
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

      // CartoDB light — no labels
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      L.marker([lat, lng], { icon: blueIcon }).addTo(map);
    })();

    return () => {
      map?.remove();
    };
  }, [lat, lng, zoom]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div ref={containerRef} style={{ width: "100%", height: "520px" }} />
    </>
  );
}
