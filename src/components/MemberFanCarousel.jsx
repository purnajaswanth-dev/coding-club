import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Tinted from './Tinted';
import { ChevronIcon } from './Icons';

// Positions for 5 cards: 0 = Far Left, 1 = Mid Left, 2 = Center Hero, 3 = Mid Right, 4 = Far Right
const SLOTS = [
  { x: -440, y: 70, scale: 0.78, rot: -16, opacity: 0.5, zIndex: 1 },
  { x: -220, y: 25, scale: 0.92, rot: -8, opacity: 0.85, zIndex: 3 },
  { x: 0, y: 0, scale: 1.08, rot: 0, opacity: 1, zIndex: 6 },
  { x: 220, y: 25, scale: 0.92, rot: 8, opacity: 0.85, zIndex: 3 },
  { x: 440, y: 70, scale: 0.78, rot: 16, opacity: 0.5, zIndex: 1 },
];

export default function MemberFanCarousel({ members = [] }) {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Take first 5 members or fallback
  const displayMembers = members.slice(0, 5);
  const count = displayMembers.length;

  const next = useCallback(() => {
    setOffset((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setOffset((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Continuous auto-rotation every 3.8s, paused on hover or reduced-motion
  useEffect(() => {
    if (count < 5) return undefined;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduceMotion || isPaused) return undefined;

    const timer = setInterval(() => {
      setOffset((o) => (o + 1) % count);
    }, 3800);

    return () => clearInterval(timer);
  }, [count, isPaused]);

  // Keyboard navigation when focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  if (count === 0) return null;

  return (
    <div
      className="member-carousel-wrapper"
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      role="region"
      aria-label="Rotating team members showcase"
      onKeyDown={handleKeyDown}
    >
      <div className="fan-carousel-stage">
        {displayMembers.map((m, index) => {
          // Calculate which slot (0..4) this member currently occupies
          const slotIndex = (index - offset + count) % count;
          const slot = SLOTS[slotIndex] || SLOTS[2];
          const isCenter = slotIndex === 2;

          return (
            <div
              key={m.id}
              className={`fan-card-container ${isCenter ? 'is-center' : ''}`}
              style={{
                transform: `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.rot}deg) scale(${slot.scale})`,
                opacity: slot.opacity,
                zIndex: slot.zIndex,
                cursor: isCenter ? 'default' : 'pointer',
              }}
              onClick={() => {
                if (!isCenter) {
                  // Rotate this card to center
                  setOffset((prev) => (prev + (slotIndex - 2) + count) % count);
                }
              }}
            >
              <Link
                to="/team"
                className="fan-card-link"
                tabIndex={isCenter ? 0 : -1}
                aria-label={`${m.name}, ${m.role} - View full profile`}
              >
                <Tinted
                  image={m.image}
                  alt={m.name}
                  tint={m.tint}
                  className="fan-card-tinted"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 22,
                    boxShadow: isCenter ? '0 30px 80px rgba(229, 32, 46, 0.3), 0 10px 30px rgba(0,0,0,0.8)' : '0 20px 50px rgba(0,0,0,0.7)',
                  }}
                >
                  <span className="w vt fan-name">{m.name}</span>
                  <div className="fan-role-badge">
                    <span className="w fan-role">{m.role}</span>
                    <span className="mono fan-sub">{m.branch}</span>
                  </div>
                  {isCenter && (
                    <div className="fan-center-indicator">
                      <span className="w" style={{ fontSize: 11, letterSpacing: '0.05em' }}>LEADERSHIP</span>
                    </div>
                  )}
                </Tinted>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Carousel Controls & Indicators */}
      <div className="fan-carousel-controls">
        <button
          type="button"
          className="fan-ctrl-btn prev"
          onClick={prev}
          aria-label="Previous member"
          title="Previous member"
        >
          <span style={{ transform: 'rotate(90deg)', display: 'grid' }}><ChevronIcon /></span>
        </button>

        <div className="fan-indicators" role="tablist" aria-label="Member carousel position">
          {displayMembers.map((m, i) => {
            const isCenter = (i - offset + count) % count === 2;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={isCenter}
                className={`fan-dot ${isCenter ? 'active' : ''}`}
                onClick={() => setOffset((i - 2 + count) % count)}
                aria-label={`Show ${m.name}`}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="fan-ctrl-btn next"
          onClick={next}
          aria-label="Next member"
          title="Next member"
        >
          <span style={{ transform: 'rotate(-90deg)', display: 'grid' }}><ChevronIcon /></span>
        </button>
      </div>

      <p className="mono center muted" style={{ fontSize: 13, marginTop: 12 }}>
        Use arrows or click cards to inspect team leads · Auto-rotates
      </p>
    </div>
  );
}
