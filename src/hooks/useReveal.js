import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Adds the `in` class to every `.reveal` element as it enters or exists in the viewport.
 * Uses both IntersectionObserver and MutationObserver to reliably catch dynamically loaded content from useApi.
 */
export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    const revealIfInViewport = (el) => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const rect = el.getBoundingClientRect();
      if (rect.top < vh + 100 && rect.bottom > -50) {
        el.classList.add('in');
        return true;
      }
      return false;
    };

    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.01 },
    );

    // Initial scan
    const scanAndObserve = () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const revealed = revealIfInViewport(el);
        if (!revealed) {
          io.observe(el);
        }
      });
    };

    scanAndObserve();

    // Observe DOM mutations to automatically reveal elements rendered after async API calls
    const mo = new MutationObserver(() => {
      scanAndObserve();
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // Fallback timers at 100ms, 300ms, 600ms for safety
    const t1 = setTimeout(scanAndObserve, 100);
    const t2 = setTimeout(scanAndObserve, 300);
    const t3 = setTimeout(scanAndObserve, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return pathname;
}
