import { useEffect, useRef, useState } from 'react';
import Tinted from './Tinted';
import MacWindow from './MacWindow';
import Button from './Button';
import { PlayIcon } from './Icons';
import { IMAGES } from '../data/images';

const TECH_ORBIT_ITEMS = [
  { id: 1, name: 'React 18', tag: 'Frontend', img: IMAGES.codeScreen, tint: 'blue' },
  { id: 2, name: 'Spring Boot 3', tag: 'Backend', img: IMAGES.codeJava, tint: 'red' },
  { id: 3, name: 'Python & AI', tag: 'Machine Learning', img: IMAGES.lab, tint: 'green' },
  { id: 4, name: 'Docker & K8s', tag: 'DevOps', img: IMAGES.laptopCode, tint: 'teal' },
  { id: 5, name: 'Apache Kafka', tag: 'Distributed', img: IMAGES.pairCoding, tint: 'purple' },
  { id: 6, name: 'PostgreSQL', tag: 'Database', img: IMAGES.codeMac, tint: 'amber' },
  { id: 7, name: 'Linux & C++', tag: 'Systems', img: IMAGES.hackathonNight, tint: 'red' },
  { id: 8, name: 'Next.js 15', tag: 'Full Stack', img: IMAGES.meetup, tint: 'blue' },
  { id: 9, name: 'Flutter', tag: 'Mobile', img: IMAGES.youngTech, tint: 'green' },
  { id: 10, name: 'AWS Cloud', tag: 'Infrastructure', img: IMAGES.stage, tint: 'amber' },
  { id: 11, name: 'Git & GitHub', tag: 'Open Source', img: IMAGES.talk, tint: 'purple' },
  { id: 12, name: 'Redis Cache', tag: 'High Speed', img: IMAGES.friends, tint: 'teal' },
];

export default function ScrollRing() {
  const [playing, setPlaying] = useState(false);
  const cardRefs = useRef([]);
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef(null);
  const isInteractingRef = useRef(false);
  const stopTimeoutRef = useRef(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      // Scroll DOWN (delta > 0) -> adds to angle -> items advance CLOCKWISE (left -> top -> right)
      // Scroll UP (delta < 0) -> subtracts from angle -> items advance COUNTER-CLOCKWISE (right -> top -> left)
      targetAngleRef.current += delta * 0.165;

      isInteractingRef.current = true;
      clearTimeout(stopTimeoutRef.current);
      stopTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 120);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const total = TECH_ORBIT_ITEMS.length;
    const angleStep = 360 / total; // 30 degrees per item across full 360 orbital ring

    // Animation Loop: Interpolates angle with spring damping and directly mutates card transform3d
    const updateOrbitalPositions = () => {
      // Smooth lerp damping towards target angle
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.1;

      // Get responsive radius based on window width
      const width = window.innerWidth;
      const radius = width > 1024 ? 760 : width > 768 ? 580 : 380;
      const cardHalfWidth = width > 1024 ? 130 : width > 768 ? 100 : 75;
      const cardHalfHeight = width > 1024 ? 190 : width > 768 ? 150 : 110;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;

        // Base angle + scroll offset
        let rawAngle = index * angleStep + currentAngleRef.current;

        // Normalize angle to range [-180, +180]
        let normAngle = (((rawAngle % 360) + 540) % 360) - 180;

        const rad = (normAngle * Math.PI) / 180;

        // Mathematical trajectory on fixed upper semicircle:
        // x = radius * sin(normAngle)
        // y = radius * (1 - cos(normAngle))
        const x = Math.round(radius * Math.sin(rad));
        const y = Math.round(radius * (1 - Math.cos(rad)));

        // Visibility / Opacity:
        // Visible when within [-95 deg, +95 deg] (upper semicircle arch)
        const absAngle = Math.abs(normAngle);
        let opacity = 0;
        let scale = 0.7;

        if (absAngle <= 90) {
          // Peak at normAngle = 0 (top center): opacity 1, scale 1.05
          // Fades towards edges: opacity 0.35 at 85 deg
          const progress = 1 - absAngle / 90;
          opacity = Math.max(0.15, Math.pow(progress, 0.65));
          scale = 0.78 + progress * 0.28;
        } else if (absAngle <= 105) {
          // Soft fade out boundary
          const fadeProgress = 1 - (absAngle - 90) / 15;
          opacity = Math.max(0, fadeProgress * 0.15);
          scale = 0.75;
        }

        const zIndex = Math.round((1 - absAngle / 180) * 10);
        // Subtle tangent orientation so card stays readable and upright
        const subtleTilt = normAngle * 0.35;

        // Apply 3D transform directly to card DOM node (Zero React re-render overhead)
        el.style.transform = `translate3d(${x - cardHalfWidth}px, ${y - cardHalfHeight}px, 0) rotate(${subtleTilt}deg) scale(${scale})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = zIndex;
        el.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none';
      });

      rafIdRef.current = requestAnimationFrame(updateOrbitalPositions);
    };

    rafIdRef.current = requestAnimationFrame(updateOrbitalPositions);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      clearTimeout(stopTimeoutRef.current);
    };
  }, []);

  return (
    <section className="scroll-ring-section" aria-label="Orbital technology ecosystem arc">
      {/* Scroll telemetry banner */}
      <div className="scroll-ring-indicator reveal">
        <span className="mono red">● ORBITAL SCROLL-DRIVEN ARCHITECTURE</span>
        <span className="muted">Scroll down to advance stack clockwise · Scroll up to reverse</span>
      </div>

      {/* The Geometrically Stationary Stage */}
      <div className="scroll-ring-viewport">
        {/* Stationary Origin Point: Cards orbit around this fixed focal center */}
        <div className="scroll-ring-fixed-origin">
          {TECH_ORBIT_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="scroll-ring-orbital-card"
              style={{ willChange: 'transform, opacity' }}
            >
              <Tinted
                image={item.img}
                tint={item.tint}
                className="scroll-ring-card-inner"
              >
                <span className="w vt scroll-ring-card-text">{item.name}</span>
                <div className="scroll-ring-card-tag">
                  <span className="tag" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', fontSize: 10 }}>
                    {item.tag}
                  </span>
                </div>
              </Tinted>
            </div>
          ))}
        </div>

        {/* Central Mask creating the semicircular backdrop */}
        <div className="scroll-ring-mask" aria-hidden="true" />

        {/* Central Hero Showcase Content (Fixed in the focus of the semicircle) */}
        <div className="scroll-ring-content">
          <div className="signed reveal">
            <span className="script">Signed</span>
            <span className="w">Coding Club SRM AP</span>
          </div>

          <h2 className="w reveal display-md" style={{ color: '#f0f0f0', letterSpacing: '-0.02em' }}>
            Hello, World.
          </h2>

          <p className="reveal lead center muted" style={{ maxWidth: 600, fontSize: 17, lineHeight: 1.6 }}>
            From your first terminal commit to scaling fault-tolerant cloud microservices. We build open-source tools, organize hackathons, and ship software that matters.
          </p>

          <MacWindow label="coding-club-showcase-reel.mp4" className="reel reveal">
            {playing ? (
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: '#070707' }}>
                <div className="stack center" style={{ gap: 12, padding: 24 }}>
                  <span className="mono red">▶ PLAYING CAMPUS SHOWCASE</span>
                  <p className="muted" style={{ maxWidth: 440 }}>
                    Coding Club SRM AP — 248 Members, 42 Projects, Hackathons &amp; Campus Builds.
                  </p>
                  <Button variant="white" onClick={() => setPlaying(false)}>Close Video</Button>
                </div>
              </div>
            ) : (
              <>
                <img src={IMAGES.reel} alt="Coding Club members collaborating at Hack SRM AP" loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(7,7,7,0.8) 100%)' }} />
                <button
                  type="button"
                  className="play"
                  aria-label="Play club showcase video"
                  onClick={() => setPlaying(true)}
                >
                  <PlayIcon />
                </button>
                <div style={{ position: 'absolute', left: 24, bottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="w" style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f0' }}>Campus Build Reel</span>
                  <span className="tag tag-red" style={{ height: 22, fontSize: 9 }}>90 SEC</span>
                </div>
              </>
            )}
          </MacWindow>

          <div className="btn-row reveal" style={{ justifyContent: 'center', marginTop: 10 }}>
            <Button to="/join" variant="red">Join the club</Button>
            <Button to="/projects" variant="white">See our projects</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
