import { useEffect, useRef, useState } from 'react';

function Counter({ value, prefix = '' }) {
  const ref = useRef(null);
  // Starts at the final value so the number is correct even before (or without) the animation.
  const [n, setN] = useState(value);
  useEffect(() => {
    if (typeof value !== 'number' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (e.boundingClientRect.top < 0) return; // already scrolled past: keep final value
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} className="w">{prefix}{n}</span>;
}

/** stats: [{ value, prefix, label }] */
export default function Stats({ stats }) {
  return (
    <div className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <Counter value={s.value} prefix={s.prefix} />
          <span className="label w">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
