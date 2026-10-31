"use client";
import { useState } from "react";
import { LABELS, Size, toHuman, toDog, fmt } from "./convert";

export default function Page() {
  const [mode, setMode] = useState<"d2h" | "h2d">("d2h");
  const [val, setVal] = useState("");
  const [size, setSize] = useState<Size>("m");
  const n = parseFloat(val);
  const ok = !isNaN(n) && n >= 0;
  const res = ok ? (mode === "d2h" ? toHuman(n, size) : toDog(n, size)) : null;
  const box = { padding: 10, fontSize: 18, borderRadius: 8, border: "1px solid #bbb", width: "100%", boxSizing: "border-box" as const };
  return (
    <main style={{ maxWidth: 420, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px #0002" }}>
      <h1 style={{ marginTop: 0 }}>🐶 Σκυλίσια χρόνια</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["d2h", "h2d"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #888", cursor: "pointer", background: mode === m ? "#222" : "#fff", color: mode === m ? "#fff" : "#222" }}>
            {m === "d2h" ? "Σκύλος → Άνθρωπος" : "Άνθρωπος → Σκύλος"}
          </button>
        ))}
      </div>
      <label>{mode === "d2h" ? "Ηλικία σκύλου (έτη)" : "Ανθρώπινη ηλικία (έτη)"}
        <input type="number" min="0" step="0.5" value={val} onChange={(e) => setVal(e.target.value)} style={box} />
      </label>
      <label style={{ display: "block", marginTop: 12 }}>Μέγεθος
        <select value={size} onChange={(e) => setSize(e.target.value as Size)} style={box}>
          {(Object.keys(LABELS) as Size[]).map((k) => <option key={k} value={k}>{LABELS[k]}</option>)}
        </select>
      </label>
      <div style={{ textAlign: "center", marginTop: 24, minHeight: 70 }} aria-live="polite">
        {res !== null && (<><div style={{ fontSize: 40, fontWeight: 700 }}>{fmt(res)} έτη</div>
          <div>{mode === "d2h" ? "ανθρώπινης ηλικίας" : "σκυλίσιας ηλικίας"}</div></>)}
      </div>
    </main>
  );
}
