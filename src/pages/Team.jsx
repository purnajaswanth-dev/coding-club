import { useMemo, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { getMembers } from '../services/api';
import { MEMBER_GROUPS } from '../data/members';
import { SKILL_MATRIX } from '../data/site';
import { IMAGES } from '../data/images';
import MacWindow from '../components/MacWindow';
import Modal from '../components/Modal';
import CTA from '../components/CTA';
import { MemberCard } from '../components/Cards';
import { SkeletonGrid, ErrorState } from '../components/Loading';

export default function Team() {
  const { data, loading, error, reload } = useApi(() => getMembers(), []);
  const [group, setGroup] = useState('core');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data || []).filter((m) => {
      if (term) return [m.name, m.role, ...m.skills].join(' ').toLowerCase().includes(term);
      return m.group === group;
    });
  }, [data, group, q]);
  const president = data?.find((m) => m.role === 'President');
  const vp = data?.find((m) => m.role === 'Vice President');

  return (
    <>
      <div className="glow-tl" />
      <section className="page-hero" style={{ paddingBottom: 60 }}>
        <span className="eyebrow reveal in">Our team</span>
        <h1 className="w reveal in" style={{ fontSize: 'clamp(40px, 7.2vw, 104px)' }}>The humans<br />behind the code</h1>
      </section>

      <section className="container" style={{ position: 'relative', paddingBottom: 'var(--section)' }}>
        <div className="ghost w" style={{ top: -20 }}>Coding Club</div>
        <div className="split" style={{ position: 'relative' }}>
          <div className="stack reveal" style={{ gap: 18 }}>
            <div className="tinted" style={{ height: 'clamp(300px, 36vw, 520px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <img src={president?.image || IMAGES.p1} alt={president?.name || ''} style={{ position: 'static', width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src={vp?.image || IMAGES.p2} alt={vp?.name || ''} style={{ position: 'static', width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div className="stack" style={{ gap: 6 }}><span className="w" style={{ fontSize: 16 }}>{president?.name || 'Purna'}</span><span className="muted" style={{ fontSize: 14 }}>President</span></div>
              <div className="stack" style={{ gap: 6 }}><span className="w" style={{ fontSize: 16 }}>{vp?.name || 'Rahul'}</span><span className="muted" style={{ fontSize: 14 }}>Vice President</span></div>
            </div>
          </div>
          <div className="prose stack reveal d1" style={{ paddingTop: 16 }}>
            <p>The core team runs everything you see — workshops, contests, hackathon teams and the club’s own open-source projects. Every lead is a student who was once a first-year member.</p>
            <p>Leads rotate every year, and every member can grow into a role: build a project, mentor a junior, run an event. That’s how the club keeps shipping.</p>
            <div className="signed" style={{ marginTop: 22 }}><span className="script">Signed</span><span className="w">Coding Club</span></div>
          </div>
        </div>
      </section>

      <section className="container stack" style={{ gap: 44, paddingBottom: 'var(--section)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <h2 className="w display-md reveal" style={{ color: '#e4e4e4' }}>{q ? 'Search' : MEMBER_GROUPS.find((g) => g.id === group)?.label}</h2>
          <div className="stack" style={{ gap: 12, alignItems: 'flex-end' }}>
            <div className="pills" role="group" aria-label="Team group">
              {MEMBER_GROUPS.map((g) => (
                <button key={g.id} className={`pill ${group === g.id && !q ? 'active' : ''}`} aria-pressed={group === g.id} onClick={() => { setGroup(g.id); setQ(''); }}>{g.label}</button>
              ))}
            </div>
            <input type="search" className="input" aria-label="Search members by name or skill" placeholder="Search by name or skill — try “Spring Boot”" value={q} onChange={(e) => setQ(e.target.value)} style={{ borderRadius: 999, height: 48, width: 'min(420px, 100%)' }} />
          </div>
        </div>
        {loading && <SkeletonGrid count={4} cols="grid-4" height={470} />}
        {error && <ErrorState error={error} onRetry={reload} />}
        {!loading && !error && (list.length ? (
          <div className="grid-4">{list.map((m) => <MemberCard member={m} key={m.id} onOpen={setSelected} />)}</div>
        ) : (
          <div className="empty">No members match “{q}”.</div>
        ))}
      </section>

      <section className="container split" style={{ paddingBottom: 'var(--section)', alignItems: 'center', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)' }}>
        <div className="stack reveal" style={{ gap: 22 }}>
          <h2 className="w display-sm" style={{ color: '#e4e4e4' }}>Skill<br />matrix</h2>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.6 }}>Share of members active in each area, from member profiles.</p>
        </div>
        <MacWindow label="skills.json" className="reveal d1">
          <div style={{ padding: 'clamp(20px, 3vw, 34px)', display: 'flex', flexDirection: 'column', gap: 22 }}>
            {SKILL_MATRIX.map((s) => (
              <div className="skill" key={s.name}>
                <span className="w" style={{ fontSize: 14, color: '#d0d0d0' }}>{s.name}</span>
                <div className="skill-bar"><div style={{ width: `${s.pct}%` }} /></div>
                <span className="mono" style={{ fontSize: 14, textAlign: 'right', color: '#bdbdbd' }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </MacWindow>
      </section>

      <CTA script="Your name here?" title="Join the team" button="Apply now" />

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''}>
        {selected && (
          <div className="stack" style={{ gap: 20 }}>
            <img src={selected.image} alt={selected.name} style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 12 }} />
            <div className="stack" style={{ gap: 6 }}>
              <h3 className="w" style={{ fontSize: 32 }}>{selected.name}</h3>
              <span className="red w" style={{ fontSize: 13 }}>{selected.role}</span>
              <span className="muted">{selected.branch} · {selected.year}</span>
            </div>
            {selected.bio && <p style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{selected.bio}</p>}
            <div className="tags">{selected.skills.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href={selected.github} className="w" style={{ fontSize: 13 }}>GitHub ↗</a>
              <a href={selected.linkedin} className="w" style={{ fontSize: 13 }}>LinkedIn ↗</a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
