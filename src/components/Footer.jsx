import { Link } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <span className="w">The club</span>
          <p>{SITE.room}<br />{SITE.address.map((l) => <span key={l}>{l}<br /></span>)}</p>
        </div>
        <div>
          <span className="w">Contact us</span>
          <a href={`mailto:${SITE.email.replace(/[[\]]/g, '')}`}>{SITE.email}</a>
        </div>
        <div>
          <span className="w">Pages</span>
          <div className="stack" style={{ gap: 8 }}>
            {NAV_LINKS.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
          </div>
        </div>
        <div>
          <span className="w">Social</span>
          <div className="stack" style={{ gap: 8 }}>
            {SITE.socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
          </div>
        </div>
      </div>
      <div className="footer-word w" aria-hidden="true">Coding Club</div>
      <div className="footer-bottom w">
        <span>© {new Date().getFullYear()} Coding Club · {SITE.university}. All rights reserved.</span>
        <button className="w" onClick={() => window.scrollTo({ top: 0 })} style={{ all: 'unset', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#bdbdbd' }}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
