import Button from './Button';

export default function CTA({ script, title, button, to = '/join' }) {
  return (
    <section className="section center reveal" style={{ paddingTop: 0 }}>
      <div className="stack" style={{ alignItems: 'center', gap: 26 }}>
        <span className="script" style={{ fontSize: 44, color: '#bdbdbd' }}>{script}</span>
        <h2 className="w display-sm">{title}</h2>
        <Button to={to} variant="red" style={{ marginTop: 12 }}>{button}</Button>
      </div>
    </section>
  );
}
