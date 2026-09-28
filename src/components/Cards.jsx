import { Link } from 'react-router-dom';
import Tinted from './Tinted';

const fmtDate = (d) => {
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return { day: '[DD]', month: d };
  return { day: String(dt.getDate()).padStart(2, '0'), month: dt.toLocaleString('en', { month: 'short', year: 'numeric' }) };
};

export function EventCard({ event, className = '' }) {
  const { day, month } = fmtDate(event.date);
  const big = { Workshop: 'Learn', Hackathon: 'Hack', Contest: 'Code', 'Tech talk': 'Talk', Bootcamp: 'DSA', Showcase: 'Demo' }[event.type] || event.type;
  return (
    <Link to={`/events/${event.slug}`} className={`card-link event-card ${className}`}>
      <Tinted image={event.image} alt={event.title} tint={event.tint}>
        <span className="tag">{event.type}</span>
        <span className="w vt">{big}</span>
        <div className="date">
          <span className="w">{day}</span>
          <span className="w" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>{month}</span>
        </div>
      </Tinted>
      <span className="w name">{event.title}</span>
      <span className="muted" style={{ fontSize: 15 }}>{event.venue} · {event.time}</span>
    </Link>
  );
}

export function ProjectCard({ project, className = '' }) {
  return (
    <Link to={`/projects/${project.slug}`} className={`card-link project-card ${className}`}>
      <Tinted image={project.image} alt={project.name} tint={project.tint} />
      <div className="tags"><span className="tag">{project.category}</span><span className="tag">{project.status}</span></div>
      <span className="w name">{project.name}</span>
      <p className="muted" style={{ fontSize: 16, lineHeight: 1.55 }}>{project.summary}</p>
    </Link>
  );
}

export function MemberCard({ member, onOpen, className = '' }) {
  return (
    <button type="button" onClick={() => onOpen?.(member)} className={`card-link member-card ${className}`} style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Tinted image={member.image} alt={member.name} tint={member.tint}>
        <span className="w vt">{member.name}</span>
      </Tinted>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
        <span className="w" style={{ fontSize: 16 }}>{member.role}</span>
        <span className="muted" style={{ fontSize: 13 }}>{member.branch} · {member.year}</span>
      </div>
      <div className="tags">{member.skills.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
    </button>
  );
}
