export default function Marquee({ items }) {
  const list = [...items, ...items];
  return (
    <div className="marquee" aria-label={items.join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        {list.map((t, i) => (
          <span key={i} className="w">{t}</span>
        ))}
      </div>
    </div>
  );
}
