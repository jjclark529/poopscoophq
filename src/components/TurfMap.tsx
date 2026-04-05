"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Lead {
  lat: number;
  lng: number;
  type: "high" | "medium" | "low";
  address: string;
}

interface TurfMapProps {
  leads: Lead[];
  center: [number, number];
  zoom: number;
}

const TYPE_COLORS = { high: "#10b981", medium: "#f59e0b", low: "#3b82f6" };

export default function TurfMap({ leads, center, zoom }: TurfMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

    const map = L.map(containerRef.current, { center, zoom, zoomControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Radius circle
    L.circle(center, {
      radius: 800,
      color: "#10b981",
      fillColor: "#10b981",
      fillOpacity: 0.08,
      weight: 2,
      dashArray: "6, 4",
    }).addTo(map);

    // Lead markers
    leads.forEach((lead) => {
      const color = TYPE_COLORS[lead.type];
      L.circleMarker([lead.lat, lead.lng], {
        radius: 6,
        color,
        fillColor: color,
        fillOpacity: 0.7,
        weight: 1,
      })
        .addTo(map)
        .bindPopup(`<div style="font-family: sans-serif; font-size: 12px;">
          <strong>${lead.address}</strong><br/>
          <span style="color: ${color}; font-weight: 600;">${lead.type.charAt(0).toUpperCase() + lead.type.slice(1)} confidence</span>
        </div>`);
    });

    // Legend
    const legend = new L.Control({ position: "bottomleft" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.style.cssText = "background: white; padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); font-size: 11px; line-height: 1.8;";
      div.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 2px;">Lead Confidence</div>
        <div style="display: flex; align-items: center; gap: 5px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span> High</div>
        <div style="display: flex; align-items: center; gap: 5px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span> Medium</div>
        <div style="display: flex; align-items: center; gap: 5px;"><span style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; display: inline-block;"></span> Low</div>
      `;
      return div;
    };
    legend.addTo(map);

    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 200);

    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
  }, [leads, center, zoom]);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: 500 }} />;
}
