import { useEffect, useState, useCallback } from 'react';

/**
 * Loads data from an api.js function and tracks loading / error state.
 *   const { data, loading, error, reload } = useApi(() => getEvents('upcoming'), []);
 */
export function useApi(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const load = useCallback(fn, deps);

  const run = useCallback(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    load()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }));
    return () => {
      alive = false;
    };
  }, [load]);

  useEffect(() => run(), [run]);

  return { ...state, reload: run };
}
