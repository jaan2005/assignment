'use client';
export default function DualRange({ min = 0, max = 1000, lo, hi, onChange }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div className="dual">
      <div className="track" />
      <div className="fill" style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }} />
      <input type="range" min={min} max={max} step={10} value={lo} aria-label="Minimum price"
        onChange={(e) => onChange(Math.min(Number(e.target.value), hi - 10), hi)} />
      <input type="range" min={min} max={max} step={10} value={hi} aria-label="Maximum price"
        onChange={(e) => onChange(lo, Math.max(Number(e.target.value), lo + 10))} />
    </div>
  );
}
