import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';
import { MenuIcon, CloseIcon } from './Icons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo w" aria-label="Coding Club home">
          Coding Club <small>srm ap</small>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}>{l.label}</NavLink>
          ))}
          <span className="nav-sep" />
          <a href="#member-portal" onClick={(e) => e.preventDefault()} title="Coming soon — needs the backend">Member portal</a>
        </nav>
        <button className="nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <MenuIcon />
        </button>
      </header>

      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button className="nav-burger mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <CloseIcon />
        </button>
        {NAV_LINKS.map((l, i) => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className="w" style={{ transitionDelay: `${open ? i * 45 : 0}ms` }} tabIndex={open ? 0 : -1}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
