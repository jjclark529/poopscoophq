"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface Zone {
  name: string;
  lat: number;
  lng: number;
  customers: number;
  leads: number;
  revenue: string;
  density: "High" | "Medium" | "Low";
}

interface ServiceAreaMapProps {
  zones: Zone[];
  center?: [number, number];
  zoom?: number;
  onZoneSelect?: (index: number) => void;
  selectedZone?: number | null;
}

const DENSITY_COLORS: Record<string, string> = {
  High: "#10b981",
  Medium: "#f59e0b",
  Low: "#ef4444",
};

export default function ServiceAreaMap({
  zones,
  center = [33.9533, -117.3962],
  zoom = 11,
  onZoneSelect,
  selectedZone,
}: ServiceAreaMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<L.CircleMarker[]>([]);

  // Fly to selected zone
  useEffect(() => {
    if (
      selectedZone !== null &&
      selectedZone !== undefined &&
      mapRef.current &&
      zones[selectedZone]
    ) {
      const z = zones[selectedZone];
      mapRef.current.flyTo([z.lat, z.lng], 13, { duration: 0.8 });
      // Open popup
      const circle = circlesRef.current[selectedZone];
      if (circle) circle.openPopup();
    }
  }, [selectedZone, zones]);

  const buildMap = useCallback(() => {
    if (!containerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Zone density circles
    circlesRef.current = [];
    zones.forEach((zone, i) => {
      const color = DENSITY_COLORS[zone.density];
      const radius = Math.max(12, zone.customers * 1.2);

      const circle = L.circleMarker([zone.lat, zone.lng], {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.35,
        weight: 2,
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: sans-serif; min-width: 160px;">
            <strong style="font-size: 14px;">${zone.name}</strong><br/>
            <div style="margin-top: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px 12px; font-size: 12px;">
              <span style="color: #6b7280;">Customers</span><span style="font-weight: 600;">${zone.customers}</span>
              <span style="color: #6b7280;">Leads</span><span style="font-weight: 600;">${zone.leads}</span>
              <span style="color: #6b7280;">Revenue</span><span style="font-weight: 600;">${zone.revenue}</span>
              <span style="color: #6b7280;">Density</span><span style="font-weight: 600; color: ${color};">${zone.density}</span>
            </div>
          </div>`
        );

      circle.on("click", () => {
        if (onZoneSelect) onZoneSelect(i);
      });

      circlesRef.current.push(circle);
    });

    // Density legend control
    const legend = new L.Control({ position: "bottomleft" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div");
      div.style.cssText =
        "background: white; padding: 10px 14px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); font-family: sans-serif; font-size: 12px; line-height: 1.8;";
      div.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px; color: #374151;">Zone Density</div>
        <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; display: inline-block;"></span> High</div>
        <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span> Medium</div>
        <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span> Low</div>
      `;
      return div;
    };
    legend.addTo(map);

    mapRef.current = map;

    // Fix tile rendering after mount
    setTimeout(() => map.invalidateSize(), 200);
  }, [zones, center, zoom, onZoneSelect]);

  useEffect(() => {
    buildMap();
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [buildMap]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden"
      style={{ height: "100%", minHeight: 500 }}
    />
  );
}
