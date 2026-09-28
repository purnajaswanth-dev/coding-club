import Button from '../components/Button';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '80vh', justifyContent: 'center' }}>
      <div className="glow-tl" />
      <span className="mono red">Error 404</span>
      <h1 className="w" style={{ fontSize: 'clamp(60px, 14vw, 200px)' }}>404</h1>
      <p>This page returned <span className="mono">undefined</span>. Let’s get you back on track.</p>
      <Button to="/" variant="red">Back home</Button>
    </section>
  );
}
