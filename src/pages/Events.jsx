import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getEvents } from '../services/api';
import { EVENT_TYPES } from '../data/events';
import MacWindow from '../components/MacWindow';
import Button from '../components/Button';
import CTA from '../components/CTA';
import Tinted from '../components/Tinted';
import { SkeletonGrid, ErrorState } from '../components/Loading';
import RegisterModal from '../components/RegisterModal';

export default function Events() {
  const { data, loading, error, reload } = useApi(() => getEvents(), []);
  const [selectedType, setSelectedType] = useState('All');
  const [registering, setRegistering] = useState(null);

  const allEvents = data || [];
  const featured = allEvents.find((e) => e.featured);

  // Filtered upcoming events (excluding featured if 'All' is selected to avoid duplication)
  const upcomingEvents = useMemo(() => {
    return allEvents.filter(
      (e) =>
        e.status === 'upcoming' &&
        (selectedType === 'All' || e.type === selectedType) &&
        !(selectedType === 'All' && e.featured),
    );
  }, [allEvents, selectedType]);

  // Filtered past events
  const pastEvents = useMemo(() => {
    return allEvents.filter(
      (e) => e.status === 'past' && (selectedType === 'All' || e.type === selectedType),
    );
  }, [allEvents, selectedType]);

  return (
    <>
      <div className="glow-top" style={{ background: 'radial-gradient(ellipse, rgba(229,32,46,.15), transparent 65%)' }} />

      {/* =========================================================
          1. EVENTS HERO
          ========================================================= */}
      <section className="page-hero">
        <div className="eyebrow reveal in">Engineering Sessions &amp; Competitions</div>
        <h1 className="w reveal in display-lg">EVENTS</h1>
        <p className="reveal in" style={{ maxWidth: 660, fontSize: 18, lineHeight: 1.6 }}>
          Hands-on workshops, 24-hour hackathons, algorithmic contests and industry tech talks. Every session produces open-source repositories, recorded streams and verifiable participation certificates.
        </p>
        <div className="reveal in mono" style={{ fontSize: 12, color: 'var(--red)', letterSpacing: '0.12em', fontWeight: 600 }}>
          WORKSHOPS &nbsp;/&nbsp; HACKATHONS &nbsp;/&nbsp; CONTESTS &nbsp;/&nbsp; TALKS &nbsp;/&nbsp; BOOTCAMPS
        </div>
      </section>

      {/* =========================================================
          2. FEATURED EVENT (Dominant Highlight)
          ========================================================= */}
      {featured && (
        <section className="container" style={{ maxWidth: 1240, paddingBottom: 60 }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span className="eyebrow">Featured Masterclass</span>
            <span className="mono red">● REGISTRATIONS OPEN</span>
          </div>

          <MacWindow label={`${featured.slug}.event`} className="reveal">
            <div className="split" style={{ gap: 0, gridTemplateColumns: 'minmax(0, 480px) minmax(0, 1fr)' }}>
              <div style={{ position: 'relative', minHeight: 460 }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,6,7,.2) 10%, rgba(134,18,28,.95) 95%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="tag" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>{featured.type}</span>
                    <span className="tag tag-red">Featured</span>
                  </div>
                  <div className="stack" style={{ gap: 8 }}>
                    <span className="script" style={{ fontSize: 40, color: '#ffd2d5' }}>hands-on engineering</span>
                    <span className="w" style={{ fontSize: 'clamp(30px, 3.4vw, 46px)', lineHeight: 1.05 }}>{featured.title}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: 'clamp(24px, 3.5vw, 44px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p className="muted" style={{ fontSize: 16, lineHeight: 1.65, marginBottom: 24 }}>
                    {featured.summary}
                  </p>

                  <div className="kv-grid">
                    <div className="kv">
                      <span className="label">Date</span>
                      <span className="w">{new Date(featured.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="kv">
                      <span className="label">Time</span>
                      <span className="w">{featured.time}</span>
                    </div>
                    <div className="kv">
                      <span className="label">Location</span>
                      <span className="w">{featured.venue}</span>
                    </div>
                    <div className="kv">
                      <span className="label">Speaker</span>
                      <span className="w" style={{ fontSize: 15 }}>{featured.speaker}</span>
                    </div>
                    <div className="kv">
                      <span className="label">Confirmed Seats</span>
                      <span className="w red">{featured.registrations} Attending</span>
                    </div>
                    <div className="kv">
                      <span className="label">Status</span>
                      <span className="w">{featured.capacity - featured.registrations} Spots Left</span>
                    </div>
                  </div>
                </div>

                <div className="btn-row" style={{ marginTop: 28, gap: 14 }}>
                  <Button variant="red" onClick={() => setRegistering(featured)}>Register Now</Button>
                  <Button to={`/events/${featured.slug}`} variant="white">View Full Agenda</Button>
                </div>
              </div>
            </div>
          </MacWindow>
        </section>
      )}

      {/* =========================================================
          3. CATEGORIES FILTER
          ========================================================= */}
      <section className="container" style={{ paddingBlock: '20px 30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">Category Filters</span>
            <h2 className="w" style={{ fontSize: 24, marginTop: 4 }}>Filter sessions</h2>
          </div>
          <div className="pills" role="group" aria-label="Filter events by category">
            {EVENT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={`pill ${selectedType === t ? 'active' : ''}`}
                aria-pressed={selectedType === t}
                onClick={() => setSelectedType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading && <div className="container" style={{ padding: '40px 0' }}><SkeletonGrid count={3} height={400} /></div>}
      {error && <div className="container"><ErrorState error={error} onRetry={reload} /></div>}

      {!loading && !error && (
        <>
          {/* =========================================================
              4. UPCOMING EVENTS SECTION
              ========================================================= */}
          <section className="container stack" style={{ gap: 32, paddingBottom: 80 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--line)', paddingBottom: 14 }}>
              <div>
                <span className="eyebrow">Upcoming Schedule</span>
                <h2 className="w display-sm" style={{ color: '#f0f0f0', marginTop: 4 }}>Upcoming Events</h2>
              </div>
              <span className="mono muted" style={{ fontSize: 13 }}>{upcomingEvents.length} Sessions Scheduled</span>
            </div>

            {upcomingEvents.length ? (
              <div className="grid-3">
                {upcomingEvents.map((e) => (
                  <div key={e.id} className="event-card-rich reveal">
                    <Tinted image={e.image} alt={e.title} tint={e.tint} style={{ height: 280 }}>
                      <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', gap: 8 }}>
                        <span className="tag">{e.type}</span>
                        <span className="tag tag-red">Upcoming</span>
                      </div>
                      <span className="w vt" style={{ position: 'absolute', right: 14, top: 16, fontSize: 46, opacity: 0.9 }}>
                        {e.type === 'Workshop' ? 'Learn' : e.type === 'Hackathon' ? 'Hack' : e.type === 'Contest' ? 'Code' : 'Talk'}
                      </span>
                      <div className="date" style={{ position: 'absolute', left: 18, bottom: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span className="w" style={{ fontSize: 32 }}>
                          {new Date(e.date).getDate() || '25'}
                        </span>
                        <span className="w" style={{ fontSize: 13, color: '#d0d0d0' }}>
                          {new Date(e.date).toLocaleString('en', { month: 'short', year: 'numeric' }) || 'Oct 2026'}
                        </span>
                      </div>
                    </Tinted>

                    <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, justifyContent: 'space-between' }}>
                      <div className="stack" style={{ gap: 8 }}>
                        <Link to={`/events/${e.slug}`}>
                          <h3 className="w" style={{ fontSize: 22, color: '#f0f0f0', transition: 'color 0.2s' }}>
                            {e.title}
                          </h3>
                        </Link>
                        <p className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>
                          {e.summary}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="mono muted" style={{ fontSize: 12 }}>
                          📍 {e.venue} · {e.time}
                        </span>
                        <button
                          type="button"
                          className="pill active"
                          style={{ height: 32, padding: '0 14px', fontSize: 11 }}
                          onClick={() => setRegistering(e)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">No upcoming events under this filter.</div>
            )}
          </section>

          {/* =========================================================
              5. PAST EVENTS SECTION (Dedicated Archive with Recap/Media)
              ========================================================= */}
          <section className="container stack" style={{ gap: 32, paddingBottom: 'var(--section)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--line)', paddingBottom: 14 }}>
              <div>
                <span className="eyebrow">Archive &amp; Recordings</span>
                <h2 className="w display-sm" style={{ color: '#d6d6d6', marginTop: 4 }}>Past Events &amp; Workshops</h2>
              </div>
              <span className="mono muted" style={{ fontSize: 13 }}>{pastEvents.length} Past Builds</span>
            </div>

            {pastEvents.length ? (
              <div className="grid-3">
                {pastEvents.map((e) => (
                  <div key={e.id} className="event-card-rich reveal" style={{ opacity: 0.9 }}>
                    <Tinted image={e.image} alt={e.title} tint={e.tint} style={{ height: 260 }}>
                      <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', gap: 8 }}>
                        <span className="tag">{e.type}</span>
                        <span className="tag" style={{ background: 'rgba(0,0,0,0.6)' }}>Completed</span>
                      </div>
                      <div className="date" style={{ position: 'absolute', left: 18, bottom: 18, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span className="w" style={{ fontSize: 28 }}>
                          {new Date(e.date).getDate() || '15'}
                        </span>
                        <span className="w" style={{ fontSize: 12, color: '#bdbdbd' }}>
                          {new Date(e.date).toLocaleString('en', { month: 'short', year: 'numeric' }) || 'Aug 2026'}
                        </span>
                      </div>
                    </Tinted>

                    <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1, justifyContent: 'space-between' }}>
                      <div className="stack" style={{ gap: 6 }}>
                        <Link to={`/events/${e.slug}`}>
                          <h3 className="w" style={{ fontSize: 20, color: '#e0e0e0', transition: 'color 0.2s' }}>
                            {e.title}
                          </h3>
                        </Link>
                        <p className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
                          {e.summary}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="mono muted" style={{ fontSize: 12 }}>
                          {e.registrations} Attendees
                        </span>
                        <Link
                          to={`/events/${e.slug}`}
                          className="pill"
                          style={{ height: 32, padding: '0 12px', fontSize: 11 }}
                        >
                          View Recap ↗
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty">No past events recorded for this category.</div>
            )}
          </section>
        </>
      )}

      {/* =========================================================
          6. CTA & REGISTRATION MODAL
          ========================================================= */}
      <CTA
        script="Hosting a technical event?"
        title="Co-host or sponsor a session with Coding Club"
        button="Get in touch with leads"
        to="/join#contact"
      />

      <RegisterModal event={registering} onClose={() => setRegistering(null)} />
    </>
  );
}
