import { Link } from 'react-router-dom';
import Button from '../components/Button';
import MacWindow from '../components/MacWindow';
import Marquee from '../components/Marquee';
import Stats from '../components/Stats';
import Accordion from '../components/Accordion';
import Tinted from '../components/Tinted';
import MemberFanCarousel from '../components/MemberFanCarousel';
import ScrollRing from '../components/ScrollRing';
import { SkeletonGrid } from '../components/Loading';
import { useApi } from '../hooks/useApi';
import { getMembers, getProjects, getStats } from '../services/api';
import { SITE, STATS, TECH, TRACKS, TESTIMONIALS } from '../data/site';
import { IMAGES } from '../data/images';

const BOARD = [
  { rank: '01', name: 'Purna', solved: '4 / 4', score: 400, top: true },
  { rank: '02', name: 'Arjun', solved: '4 / 4', score: 380 },
  { rank: '03', name: 'Sneha', solved: '3 / 4', score: 310 },
  { rank: '04', name: 'Rahul', solved: '3 / 4', score: 290 },
  { rank: '05', name: 'Ananya', solved: '3 / 4', score: 275 },
];

export default function Home() {
  const stats = useApi(getStats, []);
  const members = useApi(() => getMembers(), []);
  const projects = useApi(getProjects, []);

  const m = members.data || [];
  // Arrange top 5 leaders: [President, Vice President, Tech Lead, Event Lead, Project Lead]
  const fanPeople = m.length >= 5 ? [m[3], m[1], m[0], m[2], m[4]] : m;

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero" aria-label="Intro">
        <div className="hero-bg"><img src={IMAGES.hero} alt="" fetchpriority="high" /></div>
        <div className="hero-content">
          <div className="hero-rating reveal in">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span className="script">Loved by 248 members — The coding club of {SITE.university}</span>
          </div>
          <h1 className="w reveal in">We ship code<br /><span className="silver">not homework</span></h1>
        </div>
        <div className="hero-bottom">
          <Button to="/about">The club</Button>
          <p>Workshops, hackathons, contests and real projects. From your first commit to production — built together at SRM AP, every week.</p>
          <Button to="/events">Events</Button>
        </div>
      </section>

      <Marquee items={TECH} />

      {/* ---------- STATS ---------- */}
      <section className="container reveal" style={{ paddingBlock: 'clamp(70px, 9vw, 130px) clamp(90px, 11vw, 160px)' }}>
        <Stats stats={stats.data || STATS} />
      </section>

      {/* ---------- 5-POSITION ROTATING MEMBER CAROUSEL ---------- */}
      <section className="center stack reveal" style={{ alignItems: 'center', gap: 22, padding: '0 var(--pad) 20px' }}>
        <div className="eyebrow">Meet the community</div>
        <h2 className="h title-lg">Members &amp; Mentors</h2>
        <p className="muted" style={{ maxWidth: 580, fontSize: 18, lineHeight: 1.55 }}>
          248 students from every branch and year at SRM AP, building projects, reviewing PRs and teaching each other what they know.
        </p>
      </section>

      <div className="reveal">
        {members.loading ? (
          <div className="container" style={{ padding: '60px 0' }}><SkeletonGrid count={3} height={420} /></div>
        ) : (
          <MemberFanCarousel members={fanPeople} />
        )}
      </div>

      {/* ---------- SCROLL-DRIVEN SEMICIRCULAR IMAGE SYSTEM ---------- */}
      <ScrollRing />

      {/* ---------- WHAT WE DO ---------- */}
      <section style={{ padding: '80px 0 40px', background: 'radial-gradient(ellipse 50% 40% at 0% 20%, rgba(120,14,22,.35), transparent 70%)' }}>
        <h2 className="w center reveal" style={{ fontSize: 'clamp(48px, 10.4vw, 150px)', color: '#e4e4e4' }}>What we do</h2>
      </section>
      <section className="container stack" style={{ gap: 'clamp(90px, 11vw, 160px)', paddingBlock: '60px var(--section)' }}>
        {TRACKS.map((t, i) => (
          <div key={t.id} className={`track ${i % 2 ? 'reverse' : ''}`}>
            <MacWindow label={t.file} className="reveal">
              {t.id === 'compete' ? (
                <Leaderboard />
              ) : (
                <>
                  <img src={t.image} alt="Students coding together" loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,.55))' }} />
                </>
              )}
            </MacWindow>
            <div className="stack reveal d1" style={{ gap: 24 }}>
              <h3 className="w">{t.title}</h3>
              <p className="lead">{t.text}</p>
              <div style={{ marginTop: 10 }}><Accordion items={t.items} defaultOpen={-1} /></div>
              <Button to={t.id === 'compete' ? '/events' : '/projects'} style={{ alignSelf: 'flex-start', marginTop: 12 }}>Learn more</Button>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section stack" style={{ gap: 60, background: 'radial-gradient(ellipse 50% 45% at 100% 60%, rgba(120,14,22,.3), transparent 70%)' }}>
        <h2 className="h title-lg center reveal">What members say</h2>
        <div className="testimonials reveal" style={{ justifyContent: 'safe center' }}>
          {TESTIMONIALS.map((q, i) => (
            <figure className="quote-card" key={i} style={{ margin: 0 }}>
              <Tinted image={q.image} alt="" tint={q.tint}>
                <blockquote className="quote-text" style={{ margin: 0 }}>{q.quote}</blockquote>
              </Tinted>
              <figcaption className="w" style={{ fontSize: 22, color: '#d0d0d0' }}>{q.handle}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------- PROJECTS ---------- */}
      <section className="container stack" style={{ gap: 56, paddingBottom: 'var(--section)' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: 12 }}>Open source builds</span>
            <h2 className="h title-lg">Our projects</h2>
          </div>
          <Button to="/projects">See all 42 projects</Button>
        </div>
        {projects.loading ? (
          <SkeletonGrid count={2} cols="grid-2" />
        ) : (
          <div className="grid-2">
            {(projects.data || []).slice(0, 2).map((p) => (
              <Link to={`/projects/${p.slug}`} key={p.id} className="card-link project-card reveal">
                <Tinted image={p.image} alt={p.name} tint={p.tint} />
                <div className="tags">
                  <span className="tag">{p.category}</span>
                  <span className="tag tag-red">{p.status}</span>
                </div>
                <span className="w name">{p.name}</span>
                <p className="muted" style={{ fontSize: 15, lineHeight: 1.5 }}>{p.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Leaderboard() {
  return (
    <div style={{ position: 'absolute', inset: 0, padding: 'clamp(16px, 2.4vw, 30px)', display: 'flex', flexDirection: 'column', gap: 10, background: `linear-gradient(180deg, rgba(14,14,14,.86), rgba(14,14,14,.95)), url(${IMAGES.codeScreen}) center/cover` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid #1f1f1f' }}>
        <span className="w" style={{ fontSize: 22 }}>CodeSprint Leaderboard</span>
        <span className="mono red" style={{ fontSize: 13 }}>● LIVE CONTEST</span>
      </div>
      {BOARD.map((r) => (
        <div key={r.rank} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 70px 60px', alignItems: 'center', minHeight: 50, padding: '0 14px', borderRadius: 8, background: r.top ? 'rgba(229,32,46,.14)' : '#141414' }}>
          <span className="w" style={{ fontSize: 17, color: r.top ? 'var(--red)' : '#fff' }}>{r.rank}</span>
          <span style={{ fontSize: 16, fontWeight: 500 }}>{r.name}</span>
          <span className="mono muted" style={{ fontSize: 13 }}>{r.solved}</span>
          <span className="mono" style={{ fontSize: 13, textAlign: 'right' }}>{r.score}</span>
        </div>
      ))}
    </div>
  );
}
