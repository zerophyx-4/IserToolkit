// src/IserToolkit.jsx
const { useState } = React;

const deviceInfo = {
  rom: "HyperOS Port",
  android: "14",
  device: "cannon",
  maintainer: "haiser",
  cpu: "MediaTek Helio G85",
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
      <div style={{ width: `${(value / max) * 100}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function IserToolkit() {
  const [activeProfile, setActiveProfile] = useState("balanced");
  const [activeTab, setActiveTab] = useState("home");
  const currentProfile = profiles.find(p => p.id === activeProfile);

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'DM Sans', sans-serif", padding: "24px 16px" }}>
      <div style={{ width: 390, background: "#0F0F17", borderRadius: 40, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", color: "white" }}>
        <h1 style={{ fontSize: 22 }}>IserToolkit</h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>Status: {deviceInfo.rom}</p>
        {menuItems.map(item => (
            <div key={item.id} style={{ padding: "10px", borderBottom: "1px solid #333" }}>{item.icon} {item.label}</div>
        ))}
      </div>
    </div>
  );
}
