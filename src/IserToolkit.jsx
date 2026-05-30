import './index.css';
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const deviceInfo = {
  rom: "HyperOS 3.1",
  android: "16",
  device: "Infinix HOT 50",
  maintainer: "haiser",
  cpu: "MediaTek Helio G100",
  cpuUsage: 23,
  cpuTemp: 38,
  gpuUsage: 11,
  gpuTemp: 35,
  ram: { used: 3.2, total: 6 },
  battery: { level: 78, temp: 31, health: "Good" },
};

const profiles = [
  { id: "gaming", label: "Gaming", icon: "⚡", color: "#FF4D4D", desc: "Max performance + thermal off" },
  { id: "performance", label: "Performance", icon: "🔥", color: "#FF8C00", desc: "High perf, thermal off" },
  { id: "balanced", label: "Balanced", icon: "⚖️", color: "#00C2FF", desc: "Default schedutil" },
  { id: "daily", label: "Daily Use", icon: "☀️", color: "#00E5A0", desc: "Optimized for daily" },
  { id: "battery", label: "Battery", icon: "🔋", color: "#A78BFA", desc: "Powersave mode" },
];

const menuItems = [
  { id: "system", label: "System Tweaks", icon: "⚙️", sub: "Flag Secure · Animation · Thermal · SELinux" },
  { id: "display", label: "Display", icon: "🖥️", sub: "Blur · Banner · Refresh Rate" },
  { id: "spoof", label: "Spoofing", icon: "🎭", sub: "Global · Per-app · Netflix · GPhotos" },
  { id: "media", label: "Media & Assets", icon: "🎨", sub: "Boot Anim · Sound FX" },
  { id: "perapp", label: "Per-app Settings", icon: "📱", sub: "Custom config per package" },
  { id: "hardware", label: "Hardware", icon: "🔦", sub: "Front Flash · Refresh Rate" },
  { id: "network", label: "Network", icon: "🌐", sub: "Ad Block" },
  { id: "info", label: "Device Info", icon: "📊", sub: "CPU · GPU · RAM · Battery live" },
];

function StatBar({ value, max, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 99, height: 4, overflow: "hidden", flex: 1 }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: color,
        borderRadius: 99,
        transition: "width 0.6s ease"
      }} />
    </div>
  );
}

export default function IserToolkit() {
  const [activeProfile, setActiveProfile] = useState("balanced");
  const [activeTab, setActiveTab] = useState("home");

  const currentProfile = profiles.find(p => p.id === activeProfile);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "24px 16px",
    }}>
      {/* Phone Frame */}
      <div style={{
        width: 390,
        minHeight: 780,
        background: "#0F0F17",
        borderRadius: 40,
        overflow: "hidden",
        boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Status Bar */}
        <div style={{ padding: "14px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3 }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}><span>●●●</span><span>WiFi</span><span>78%</span></div>
        </div>

        {/* Header */}
        <div style={{ padding: "16px 24px 0", position: "relative" }}>
          <div style={{ position: "absolute", top: -20, right: -40, width: 200, height: 200, background: `radial-gradient(circle, ${currentProfile.color}18 0%, transparent 70%)`, pointerEvents: "none", transition: "background 0.5s ease" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>IserToolkit</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>Good morning, haiser</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, border: "1px solid rgba(255,255,255,0.08)" }}>⚡</div>
          </div>
          <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 99, padding: "5px 12px" }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: "#00E5A0" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{deviceInfo.rom} · Android {deviceInfo.android}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ margin: "16px 16px 0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "CPU", value: deviceInfo.cpuUsage, max: 100, unit: "%", temp: deviceInfo.cpuTemp, color: "#FF8C00" },
            { label: "GPU", value: deviceInfo.gpuUsage, max: 100, unit: "%", temp: deviceInfo.gpuTemp, color: "#00C2FF" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span><span style={{ fontSize: 11, color: s.color }}>{s.value}{s.unit} · {s.temp}°C</span></div>
              <StatBar value={s.value} max={s.max} color={s.color} />
            </div>
          ))}
          {[
            { label: "RAM", value: deviceInfo.ram.used, max: deviceInfo.ram.total, unit: `${deviceInfo.ram.used}/${deviceInfo.ram.total}GB`, color: "#A78BFA" },
            { label: "Battery", value: deviceInfo.battery.level, max: 100, unit: `${deviceInfo.battery.level}% · ${deviceInfo.battery.temp}°C`, color: "#00E5A0" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</span><span style={{ fontSize: 11, color: s.color }}>{s.unit}</span></div>
              <StatBar value={s.value} max={s.max} color={s.color} />
            </div>
          ))}
        </div>

        {/* Profile Selector */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Performance Mode</span>
            <span style={{ fontSize: 11, color: currentProfile.color, fontWeight: 600 }}>{currentProfile.icon} {currentProfile.label}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => setActiveProfile(p.id)} style={{ flex: 1, padding: "10px 4px", borderRadius: 14, border: activeProfile === p.id ? `1.5px solid ${p.color}60` : "1.5px solid rgba(255,255,255,0.06)", background: activeProfile === p.id ? `${p.color}15` : "rgba(255,255,255,0.03)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.2s ease", outline: "none" }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <span style={{ fontSize: 9, color: activeProfile === p.id ? p.color : "rgba(255,255,255,0.35)", fontWeight: activeProfile === p.id ? 700 : 400, textAlign: "center", lineHeight: 1.2 }}>{p.label}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8, padding: "8px 12px", background: `${currentProfile.color}10`, border: `1px solid ${currentProfile.color}25`, borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: 99, background: currentProfile.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{currentProfile.desc}</span>
            <span style={{ marginLeft: "auto", fontSize: 10, color: currentProfile.color, fontWeight: 600, background: `${currentProfile.color}20`, padding: "2px 8px", borderRadius: 99 }}>ACTIVE</span>
          </div>
        </div>

        {/* Menu Grid */}
        <div style={{ padding: "16px 16px 0" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Features</span>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {menuItems.map((item, i) => (
              <button key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px 14px", cursor: "pointer", textAlign: "left", outline: "none", transition: "all 0.2s ease", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.4 }}>{item.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div style={{ marginTop: "auto", padding: "16px 24px 28px", display: "flex", justifyContent: "space-around", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)" }}>
          {[ { id: "home", icon: "⊞", label: "Home" }, { id: "profiles", icon: "◈", label: "Profiles" }, { id: "apps", icon: "◉", label: "Per-app" }, { id: "about", icon: "◎", label: "About" }, ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, outline: "none", padding: "4px 12px" }}>
              <span style={{ fontSize: 20, color: activeTab === tab.id ? "#00C2FF" : "rgba(255,255,255,0.25)" }}>{tab.icon}</span>
              <span style={{ fontSize: 10, color: activeTab === tab.id ? "#00C2FF" : "rgba(255,255,255,0.25)" }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<IserToolkit />);
}

import { createRoot } from "react-dom/client";
const container = document.getElementById('root');
if (container) createRoot(container).render(<IserToolkit />);
