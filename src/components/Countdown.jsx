import { useEffect, useState } from 'react';

const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

export default function Countdown({ to }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  return (
    <div className="countdown" role="timer" aria-label={`${d} days ${h} hours ${m} minutes left`}>
      <div><span className="w">{pad(d)}</span><span className="label">Days</span></div>
      <div><span className="w">{pad(h)}</span><span className="label">Hours</span></div>
      <div><span className="w">{pad(m)}</span><span className="label">Minutes</span></div>
    </div>
  );
}
