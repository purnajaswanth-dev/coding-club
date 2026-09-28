export function SkeletonGrid({ count = 3, height = 460, cols = 'grid-3' }) {
  return (
    <div className={cols} aria-busy="true" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height }} />
      ))}
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="empty" role="alert">
      <p style={{ marginBottom: 16 }}>{error?.message || 'Something went wrong.'}</p>
      {onRetry && <button className="pill" onClick={onRetry}>Try again</button>}
    </div>
  );
}
