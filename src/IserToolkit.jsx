const { useState } = React;

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

function IserToolkit() {
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
        <div style={{ padding: "14px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3 }}>
          <span>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}><span>●●●</span><span>WiFi</span><span>78%</span></div>
        </div>
        <div style={{ padding: "16px 24px 0", position: "relative" }}>
          <div style={{ position: "absolute", top: -20, right: -40, width: 200, height: 200, background: `radial-gradient(circle, ${currentProfile.color}18 0%, transparent 70%)`, pointerEvents: "none" }} />
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
        <div style={{ margin: "16px 16px 0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[ { label: "CPU", val: deviceInfo.cpuUsage, temp: deviceInfo.cpuTemp, col: "#FF8C00" }, { label: "GPU", val: deviceInfo.gpuUsage, temp: deviceInfo.gpuTemp, col: "#00C2FF" } ].map(s => (
            <div key={s.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{s.label}</span><span style={{ fontSize: 11, color: s.col }}>{s.val}% · {s.temp}°C</span></div>
              <StatBar value={s.val} max={100} color={s.col} />
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {menuItems.map(item => (
              <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px" }}>
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{item.label}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
