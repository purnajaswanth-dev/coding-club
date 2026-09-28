import { createContext, useCallback, useContext, useRef, useState } from 'react';

const ToastCtx = createContext(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef();
  const toast = useCallback((m) => {
    setMsg(m);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 3200);
  }, []);
  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">{msg}</div>
    </ToastCtx.Provider>
  );
}
