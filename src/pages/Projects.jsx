import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getProjects, getMembers } from '../services/api';
import { PROJECT_FILTERS } from '../data/projects';
import Stats from '../components/Stats';
import Tinted from '../components/Tinted';
import Button from '../components/Button';
import CTA from '../components/CTA';
import { SkeletonGrid, ErrorState } from '../components/Loading';

export default function Projects() {
  const { data, loading, error, reload } = useApi(getProjects, []);
  const members = useApi(() => getMembers(), []);
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');

  const allProjects = data || [];
  const featured = allProjects.find((p) => p.featured);
  const memberList = members.data || [];

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allProjects.filter((p) => {
      if (filter === 'Featured' && !p.featured) return false;
      if (!['All', 'Featured'].includes(filter) && p.status !== filter && p.category !== filter) return false;
      if (!term) return true;
      return [p.name, p.summary, p.category, ...(p.tech || [])].join(' ').toLowerCase().includes(term);
    });
  }, [allProjects, filter, q]);

  const showFeatured = featured && filter === 'All' && !q;
  const gridProjects = showFeatured ? list.filter((p) => !p.featured) : list;

  return (
    <>
      <div className="glow-tr" style={{ background: 'radial-gradient(circle, rgba(18,58,140,.35), transparent 65%)' }} />

      {/* =========================================================
          1. PROJECTS HERO
          ========================================================= */}
      <section className="page-hero">
        <span className="eyebrow reveal in">Software Engineering &amp; Open Source</span>
        <h1 className="w reveal in display-lg">PROJECTS</h1>
        <p className="reveal in" style={{ maxWidth: 660, fontSize: 18, lineHeight: 1.6 }}>
          We design, code, review and deploy software tools for SRM AP and the global developer community. Every project is student-built, public on GitHub and open for contribution.
        </p>
        <div className="reveal in mono" style={{ fontSize: 12, color: 'var(--red)', letterSpacing: '0.12em', fontWeight: 600 }}>
          OPEN SOURCE &nbsp;/&nbsp; CAMPUS INFRASTRUCTURE &nbsp;/&nbsp; PRODUCTION DEPLOYMENTS
        </div>
      </section>

      {/* =========================================================
          2. FEATURED PROJECT (Asymmetric Showcase)
          ========================================================= */}
      {showFeatured && (
        <section className="container" style={{ paddingBottom: 80 }}>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span className="eyebrow">Flagship Club Project</span>
            <span className="mono red">● PRODUCTION LIVE</span>
          </div>

          <div
            className="split reveal"
            style={{
              gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
              alignItems: 'stretch',
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            {/* LEFT: Project Visual */}
            <div style={{ position: 'relative', minHeight: 460 }}>
              <Link to={`/projects/${featured.slug}`} style={{ display: 'block', height: '100%' }}>
                <Tinted
                  image={featured.image}
                  alt={featured.name}
                  tint={featured.tint}
                  style={{ width: '100%', height: '100%', borderRadius: 0 }}
                >
                  <div style={{ position: 'absolute', left: 24, top: 24, display: 'flex', gap: 8 }}>
                    <span className="tag tag-red">Flagship</span>
                    <span className="tag">{featured.category}</span>
                  </div>
                </Tinted>
              </Link>
            </div>

            {/* RIGHT: Architecture Breakdown & Actions */}
            <div className="stack" style={{ gap: 20, padding: 'clamp(28px, 4vw, 48px)', justifyContent: 'space-between' }}>
              <div className="stack" style={{ gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h2 className="w" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)' }}>{featured.name}</h2>
                  <span className="tag" style={{ background: '#1c1c1c' }}>branch: {featured.branch || 'main'}</span>
                </div>

                <div className="stack" style={{ gap: 10 }}>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-2)' }}>
                    <b>Problem:</b> {featured.problem}
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-2)' }}>
                    <b>Solution:</b> {featured.solution}
                  </p>
                </div>

                <div className="tags">
                  {(featured.tech || []).map((t) => (
                    <span className="tag" key={t} style={{ border: '1px solid #333' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="project-meta-row" style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 13, color: '#f0f0f0' }}>⭐ {featured.stars || 142} stars</span>
                    <span className="mono muted" style={{ fontSize: 13 }}>{featured.commits || 348} commits</span>
                  </div>
                  <span className="mono muted" style={{ fontSize: 12 }}>Status: {featured.status}</span>
                </div>

                <div className="btn-row" style={{ gap: 14 }}>
                  <Button to={`/projects/${featured.slug}`} variant="red">Architecture Case Study</Button>
                  <Button href={featured.github} variant="white">GitHub Repository ↗</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          3. CATEGORIES & SEARCH FILTER
          ========================================================= */}
      <section className="container" style={{ paddingBlock: '10px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div className="pills" role="group" aria-label="Filter projects">
            {PROJECT_FILTERS.map((f) => (
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

          <div style={{ position: 'relative', width: 'min(380px, 100%)' }}>
            <label htmlFor="psearch" className="sr-only" style={{ position: 'absolute', left: -9999 }}>Search projects</label>
            <input
              id="psearch"
              type="search"
              className="input"
              placeholder="Search by tech or keyword — e.g. “Flutter”"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ borderRadius: 999, height: 48, paddingLeft: 22 }}
            />
          </div>
        </div>
      </section>

      {loading && <div className="container"><SkeletonGrid count={2} cols="grid-2" /></div>}
      {error && <div className="container"><ErrorState error={error} onRetry={reload} /></div>}

      {/* =========================================================
          4 & 5. ASYMMETRIC PROJECT GRID & METADATA CARDS
          ========================================================= */}
      {!loading && !error && (
        <section className="container" style={{ paddingBottom: 'var(--section)' }}>
          {gridProjects.length ? (
            <div className="grid-2" style={{ rowGap: 40, columnGap: 28 }}>
              {gridProjects.map((p) => {
                const teamMembers = memberList.filter((m) => (p.team || []).includes(m.id));
                return (
                  <div key={p.id} className="project-card-rich reveal">
                    <Link to={`/projects/${p.slug}`} style={{ display: 'block' }}>
                      <Tinted image={p.image} alt={p.name} tint={p.tint} style={{ height: 280, borderRadius: 12 }}>
                        <div style={{ position: 'absolute', left: 16, top: 16, display: 'flex', gap: 8 }}>
                          <span className="tag">{p.category}</span>
                          <span className={`tag ${p.status === 'Ongoing' ? 'tag-red' : ''}`}>{p.status}</span>
                        </div>
                        <span className="w vt" style={{ position: 'absolute', right: 14, top: 14, fontSize: 42, opacity: 0.85 }}>
                          {p.category.split(' ')[0]}
                        </span>
                      </Tinted>
                    </Link>

                    <div className="stack" style={{ gap: 10 }}>
                      <Link to={`/projects/${p.slug}`}>
                        <h3 className="w" style={{ fontSize: 24, color: '#f0f0f0', transition: 'color 0.2s' }}>
                          {p.name}
                        </h3>
                      </Link>
                      <p className="muted" style={{ fontSize: 15, lineHeight: 1.55 }}>
                        {p.summary}
                      </p>
                    </div>

                    <div className="tags">
                      {(p.tech || []).map((t) => (
                        <span className="tag" key={t} style={{ fontSize: 10.5 }}>{t}</span>
                      ))}
                    </div>

                    <div className="project-meta-row">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {teamMembers.slice(0, 3).map((tm) => (
                          <img
                            key={tm.id}
                            src={tm.image}
                            alt={tm.name}
                            title={tm.name}
                            style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1px solid #333' }}
                          />
                        ))}
                        <span className="mono muted" style={{ fontSize: 12 }}>
                          {p.stars ? `⭐ ${p.stars}` : 'GitHub Repo'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: 10 }}>
                        <Link to={`/projects/${p.slug}`} className="pill" style={{ height: 32, padding: '0 12px', fontSize: 11 }}>
                          Case Study →
                        </Link>
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="pill active" style={{ height: 32, padding: '0 12px', fontSize: 11 }}>
                            Code ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty">
              No projects found matching “{q || filter}”.
            </div>
          )}
        </section>
      )}

      {/* =========================================================
          6. PITCH A PROJECT CTA
          ========================================================= */}
      <CTA
        script="Have a bold build idea?"
        title="Pitch your project at our next build sprint"
        button="Submit project proposal"
        to="/join#contact"
      />
    </>
  );
}
