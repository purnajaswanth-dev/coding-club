import { useId, useState } from 'react';
import { ChevronIcon } from './Icons';

/** items: [{ title, text }] */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();
  return (
    <div style={{ borderTop: '1px solid var(--line)' }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className={`acc-item ${isOpen ? 'open' : ''}`}>
            <button
              className="acc-btn"
              aria-expanded={isOpen}
              aria-controls={`${base}-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.title}</span>
              <ChevronIcon />
            </button>
            <div className="acc-panel" id={`${base}-${i}`} role="region">
              <div><p>{it.text}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
