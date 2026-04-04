"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Client {
  name: string;
  lat: number;
  lng: number;
}

interface Lead {
  name: string;
  type: string;
  distance: string;
  confidence: string;
}

interface LeadMapProps {
  clients: Client[];
  selectedClient: number;
  radius: number;
  leads: Lead[];
}

function createColorIcon(color: string, label?: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color};
      width: ${label ? '24px' : '14px'};
      height: ${label ? '24px' : '14px'};
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
      font-weight: bold;
    ">${label || ''}</div>`,
    iconSize: [label ? 24 : 14, label ? 24 : 14],
    iconAnchor: [label ? 12 : 7, label ? 12 : 7],
    popupAnchor: [0, label ? -14 : -8],
  });
}

export default function LeadMap({ clients, selectedClient, radius, leads }: LeadMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const center = clients[selectedClient];
    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom: 15,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Draw radius circle
    L.circle([center.lat, center.lng], {
      radius: radius * 80,
      color: "#10b981",
      fillColor: "#10b981",
      fillOpacity: 0.1,
      weight: 2,
      dashArray: "5, 5",
    }).addTo(map);

    // Existing client markers (green)
    clients.forEach((client, i) => {
      const isSelected = i === selectedClient;
      L.marker([client.lat, client.lng], {
        icon: createColorIcon(isSelected ? "#10b981" : "#059669", isSelected ? "★" : undefined),
      })
        .addTo(map)
        .bindPopup(`<b>${client.name}</b><br><span style="color: #059669;">Existing client</span>`);
    });

    // Lead markers (gold/blue based on confidence)
    leads.forEach((lead) => {
      const offsetLat = center.lat + (Math.random() - 0.5) * (radius * 0.002);
      const offsetLng = center.lng + (Math.random() - 0.5) * (radius * 0.002);
      const color = lead.confidence === "High" ? "#f59e0b" : lead.confidence === "Medium" ? "#3b82f6" : "#9ca3af";
      L.marker([offsetLat, offsetLng], {
        icon: createColorIcon(color),
      })
        .addTo(map)
        .bindPopup(`<b>${lead.name}</b><br>${lead.type}<br><span style="color: ${color};">${lead.confidence} confidence</span>`);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [clients, selectedClient, radius, leads]);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ minHeight: 400 }} />
  );
}
