import { Link, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getProject, getMembers } from '../services/api';
import MacWindow from '../components/MacWindow';
import Button from '../components/Button';
import { BackIcon } from '../components/Icons';
import { ErrorState } from '../components/Loading';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: p, loading, error, reload } = useApi(() => getProject(slug), [slug]);
  const members = useApi(() => getMembers(), []);

  if (loading) return <div className="container" style={{ paddingTop: 180 }}><div className="skeleton" style={{ height: 520 }} /></div>;
  if (error) return <div className="container" style={{ paddingTop: 180 }}><ErrorState error={error} onRetry={reload} /></div>;
  if (!p) {
    return (
      <section className="page-hero" style={{ minHeight: '70vh', justifyContent: 'center' }}>
        <h1 className="w display-md">Project not found</h1>
        <Button to="/projects">All projects</Button>
      </section>
    );
  }
  const team = (members.data || []).filter((m) => p.team?.includes(m.id));

  return (
    <>
      <div className="glow-tr" />
      <section className="page-hero" style={{ paddingBottom: 50 }}>
        <Link to="/projects" className="eyebrow">All projects</Link>
        <h1 className="w reveal in" style={{ fontSize: 'clamp(40px, 7vw, 110px)' }}>{p.name}</h1>
        <div className="tags" style={{ justifyContent: 'center' }}>
          <span className="tag">{p.category}</span><span className="tag tag-red">{p.status}</span>
        </div>
      </section>
      <section className="container" style={{ maxWidth: 1180, paddingBottom: 'var(--section)' }}>
        <MacWindow label={`${p.slug}.app`} className="reveal" style={{ height: 'clamp(260px, 42vw, 560px)' }}>
          <img src={p.image} alt={p.name} />
        </MacWindow>
        <div className="split" style={{ marginTop: 64 }}>
          <div className="stack reveal" style={{ gap: 36 }}>
            <div className="stack" style={{ gap: 12 }}><span className="label">Problem</span><p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--text-2)' }}>{p.problem}</p></div>
            <div className="stack" style={{ gap: 12 }}><span className="label">Solution</span><p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--text-2)' }}>{p.solution}</p></div>
            <div className="stack" style={{ gap: 12 }}><span className="label">Tech stack</span><div className="tags">{p.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div></div>
          </div>
          <div className="stack reveal d1" style={{ gap: 20 }}>
            <span className="label">Team</span>
            {team.map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
                <img src={m.image} alt="" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                <div className="stack" style={{ gap: 4 }}><span className="w" style={{ fontSize: 16 }}>{m.name}</span><span className="muted" style={{ fontSize: 14 }}>{m.role}</span></div>
              </div>
            ))}
            <div className="btn-row" style={{ marginTop: 16 }}>
              <Button href={p.live} variant="white">Live demo</Button>
              <Button href={p.github}>GitHub</Button>
              <Button to="/projects" icon={<BackIcon />}>Back</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
