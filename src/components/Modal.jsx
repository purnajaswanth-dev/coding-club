import { useEffect, useRef } from 'react';
import MacWindow from './MacWindow';
import { CloseIcon } from './Icons';

export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    ref.current?.querySelector('input,button,select,textarea')?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} ref={ref}>
        <MacWindow label={title}>
          <button className="nav-burger" aria-label="Close" onClick={onClose} style={{ position: 'absolute', right: 16, top: 16, display: 'grid' }}>
            <CloseIcon />
          </button>
          <div style={{ padding: 32 }}>{children}</div>
        </MacWindow>
      </div>
    </div>
  );
}
