import { useMemo, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { getAchievements } from '../services/api';
import { ACHIEVEMENT_FILTERS, ACHIEVEMENT_STATS, MILESTONES, GALLERY, SPONSORS } from '../data/achievements';
import Stats from '../components/Stats';
import Tinted from '../components/Tinted';
import Marquee from '../components/Marquee';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { SkeletonGrid, ErrorState } from '../components/Loading';

export default function Achievements() {
  const { data, loading, error, reload } = useApi(getAchievements, []);
  const [filter, setFilter] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const allAchievements = data || [];
  const list = useMemo(() => {
    return allAchievements.filter((a) => filter === 'All' || a.category === filter);
  }, [allAchievements, filter]);

  return (
    <>
      <div className="glow-top" style={{ background: 'radial-gradient(ellipse, rgba(148,96,8,.22), transparent 65%)' }} />

      {/* =========================================================
          1. ACHIEVEMENTS HERO
          ========================================================= */}
      <section className="page-hero">
        <div className="hero-rating reveal in">
          <span className="stars" aria-hidden="true">★★★★★</span>
          <span className="script">Proof of work, not claims</span>
        </div>
        <h1 className="w reveal in display-lg">ACHIEVEMENTS</h1>
        <p className="reveal in" style={{ maxWidth: 660, fontSize: 18, lineHeight: 1.6 }}>
          National hackathon podiums, ICPC Regional qualifications, Google Summer of Code contributions, and peer-reviewed IEEE research — earned by student developers at SRM AP.
        </p>
        <div className="reveal in mono" style={{ fontSize: 12, color: 'var(--red)', letterSpacing: '0.12em', fontWeight: 600 }}>
          HACKATHONS &nbsp;/&nbsp; CP &amp; ICPC &nbsp;/&nbsp; GSOC &nbsp;/&nbsp; IEEE RESEARCH &nbsp;/&nbsp; RECOGNITION
        </div>
      </section>

      {/* =========================================================
          2. VERIFIED STATS
          ========================================================= */}
      <section className="container reveal" style={{ paddingBlock: '20px 70px' }}>
        <Stats stats={ACHIEVEMENT_STATS} />
      </section>

      {/* =========================================================
          3. CATEGORIES & HIGHLIGHTED ACHIEVEMENTS
          ========================================================= */}
      <section className="container stack" style={{ gap: 40, paddingBottom: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">Hall of Fame</span>
            <h2 className="w display-sm" style={{ color: '#f0f0f0', marginTop: 4 }}>Major Wins &amp; Selections</h2>
          </div>
          <div className="pills" role="group" aria-label="Filter achievements">
            {ACHIEVEMENT_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`pill ${filter === f ? 'active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading && <SkeletonGrid count={3} height={440} />}
        {error && <ErrorState error={error} onRetry={reload} />}

        {!loading && !error && (
          <div className="grid-3" style={{ rowGap: 30 }}>
            {list.map((a) => (
              <div
                key={a.id}
                className="event-card-rich reveal"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedAchievement(a)}
              >
                <Tinted
                  image={a.image}
                  alt={a.event}
                  tint={a.tint}
                  style={{
                    height: 380,
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="tag tag-red" style={{ fontWeight: 700 }}>{a.category}</span>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{a.year}</span>
                  </div>

                  <div className="stack" style={{ gap: 8 }}>
                    <span className="script" style={{ fontSize: 42, lineHeight: 0.85, color: '#ffd2d5' }}>
                      {a.result}
                    </span>
                    <h3 className="w" style={{ fontSize: 24, color: '#fff' }}>{a.event}</h3>
                    <span className="mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                      👥 {a.team}
                    </span>
                  </div>
                </Tinted>

                <div style={{ padding: '16px 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className="muted" style={{ fontSize: 13, lineHeight: 1.4, margin: 0, maxWidth: 260 }}>
                    {a.description ? `${a.description.slice(0, 75)}...` : 'Click for verified details'}
                  </p>
                  <span className="pill" style={{ height: 30, padding: '0 12px', fontSize: 11 }}>
                    Proof →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          4. VERTICAL MILESTONES TIMELINE
          ========================================================= */}
      <section className="container stack" style={{ gap: 50, paddingBottom: 120 }}>
        <div className="center reveal">
          <span className="eyebrow">Evolution &amp; Trajectory</span>
          <h2 className="w display-md" style={{ color: '#e4e4e4', marginTop: 8 }}>
            Milestones Timeline
          </h2>
          <p className="muted" style={{ maxWidth: 540, margin: '8px auto 0', fontSize: 16 }}>
            Tracing the technical progress of Coding Club SRM AP from classroom problem-solving to national podiums.
          </p>
        </div>

        <div className="timeline-vertical reveal">
          {MILESTONES.map((m, idx) => (
            <div className="timeline-v-item" key={m.title}>
              <div className="timeline-v-node" />
              <div className="timeline-v-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span className="w red" style={{ fontSize: 28 }}>{m.year}</span>
                  <span className="tag" style={{ fontSize: 10 }}>Stage 0{idx + 1}</span>
                </div>
                <h3 className="w" style={{ fontSize: 20, color: '#f0f0f0' }}>{m.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          5. VISUAL GALLERY MASONRY
          ========================================================= */}
      <section className="container stack" style={{ gap: 40, paddingBottom: 'var(--section)' }}>
        <div className="center reveal">
          <span className="eyebrow">On the Ground</span>
          <h2 className="h title-lg" style={{ marginTop: 8 }}>Hackathons, Build Nights &amp; Podiums</h2>
        </div>
        <div className="masonry">
          {GALLERY.map((g, i) => (
            <Tinted
              key={i}
              image={g.image}
              alt={g.label}
              tint={['red', 'blue', 'green', 'purple', 'amber', 'teal'][i % 6]}
              className="reveal"
              style={{ height: g.h, '--tint': 'rgba(0,0,0,.65)' }}
            >
              <span className="label w" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>{g.label}</span>
            </Tinted>
          ))}
        </div>
      </section>

      {/* =========================================================
          6. SPONSORS MARQUEE & DETAIL MODAL
          ========================================================= */}
      <section className="stack center" style={{ gap: 36, alignItems: 'center', paddingBottom: 'var(--section)' }}>
        <div className="reveal">
          <span className="eyebrow">Industry Supporters</span>
          <h2 className="h title-lg" style={{ marginTop: 8 }}>Sponsors &amp; Ecosystem Partners</h2>
        </div>
        <div style={{ width: '100%' }}>
          <Marquee items={SPONSORS} />
        </div>
        <Button to="/join#contact" variant="white">Become an Ecosystem Partner</Button>
      </section>

      {/* Achievement Detail Modal */}
      <Modal
        open={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        title={selectedAchievement?.event || ''}
      >
        {selectedAchievement && (
          <div className="stack" style={{ gap: 20 }}>
            <img
              src={selectedAchievement.image}
              alt={selectedAchievement.event}
              style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 12 }}
            />
            <div className="stack" style={{ gap: 6 }}>
              <span className="tag tag-red" style={{ alignSelf: 'flex-start' }}>{selectedAchievement.category} · {selectedAchievement.year}</span>
              <span className="script red" style={{ fontSize: 36 }}>{selectedAchievement.result}</span>
              <h3 className="w" style={{ fontSize: 26 }}>{selectedAchievement.event}</h3>
              <span className="mono muted" style={{ fontSize: 14 }}>Team: {selectedAchievement.team}</span>
            </div>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.65, fontSize: 15 }}>
              {selectedAchievement.description}
            </p>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <Button href={selectedAchievement.proofUrl || 'https://github.com/codingclub-srmap'} variant="red">
                Verified Repository / Proof ↗
              </Button>
              <Button onClick={() => setSelectedAchievement(null)} variant="white">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
