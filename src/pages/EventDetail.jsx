import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getEvent } from '../services/api';
import MacWindow from '../components/MacWindow';
import Button from '../components/Button';
import RegisterModal from '../components/RegisterModal';
import { BackIcon } from '../components/Icons';
import { ErrorState } from '../components/Loading';

export default function EventDetail() {
  const { slug } = useParams();
  const { data: ev, loading, error, reload } = useApi(() => getEvent(slug), [slug]);
  const [open, setOpen] = useState(false);

  if (loading) return <div className="container" style={{ paddingTop: 180 }}><div className="skeleton" style={{ height: 520 }} /></div>;
  if (error) return <div className="container" style={{ paddingTop: 180 }}><ErrorState error={error} onRetry={reload} /></div>;
  if (!ev) return <NotFoundBlock />;

  const date = new Date(ev.date);
  const dateLabel = Number.isNaN(date.getTime()) ? ev.date : date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="glow-tl" />
      <section className="page-hero" style={{ paddingBottom: 50 }}>
        <Link to="/events" className="eyebrow">All events</Link>
        <h1 className="w reveal in" style={{ fontSize: 'clamp(40px, 7vw, 110px)' }}>{ev.title}</h1>
        <p className="reveal in">{ev.summary}</p>
      </section>
      <section className="container" style={{ maxWidth: 1180, paddingBottom: 'var(--section)' }}>
        <MacWindow label={ev.type} className="reveal" style={{ height: 'clamp(260px, 42vw, 560px)' }}>
          <img src={ev.image} alt={ev.title} />
        </MacWindow>
        <div className="split" style={{ marginTop: 60 }}>
          <div className="kv-grid reveal">
            <div className="kv"><span className="label">Date</span><span className="w">{dateLabel}</span></div>
            <div className="kv"><span className="label">Time</span><span className="w">{ev.time}</span></div>
            <div className="kv"><span className="label">Venue</span><span className="w">{ev.venue}</span></div>
            <div className="kv"><span className="label">Speaker</span><span className="w">{ev.speaker}</span></div>
            <div className="kv"><span className="label">Registrations</span><span className="w red">{ev.registrations}</span></div>
            <div className="kv"><span className="label">Capacity</span><span className="w">{ev.capacity}</span></div>
          </div>
          <div className="stack reveal d1" style={{ gap: 24 }}>
            <h2 className="w" style={{ fontSize: 28 }}>Agenda</h2>
            {ev.agenda?.length ? (
              ev.agenda.map((a) => (
                <div key={a.time} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
                  <span className="mono red" style={{ fontSize: 14 }}>{a.time}</span>
                  <span style={{ color: 'var(--text-2)' }}>{a.item}</span>
                </div>
              ))
            ) : (
              <p className="muted">Agenda coming soon.</p>
            )}
            <div className="btn-row" style={{ marginTop: 16 }}>
              {ev.status === 'upcoming' ? (
                <Button variant="red" onClick={() => setOpen(true)}>Register now</Button>
              ) : (
                <Button variant="white" href="#">Slides &amp; recording</Button>
              )}
              <Button to="/events" icon={<BackIcon />}>Back</Button>
            </div>
          </div>
        </div>
      </section>
      <RegisterModal event={open ? ev : null} onClose={() => setOpen(false)} />
    </>
  );
}

function NotFoundBlock() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', justifyContent: 'center' }}>
      <h1 className="w display-md">Event not found</h1>
      <Button to="/events">All events</Button>
    </section>
  );
}
