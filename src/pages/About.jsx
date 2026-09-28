import Accordion from '../components/Accordion';
import MacWindow from '../components/MacWindow';
import Tinted from '../components/Tinted';
import Button from '../components/Button';
import { FAQS, STORY, SITE } from '../data/site';
import { IMAGES } from '../data/images';

export default function About() {
  return (
    <>
      <div className="glow-tl" />
      <section className="page-hero">
        <span className="eyebrow reveal in">About the club</span>
        <h1 className="h reveal in">
          How a few students turned a classroom into a <span className="script red">community</span>
        </h1>
        <p className="reveal in">Workshops, hackathons, contests and real projects — run by students, for students at {SITE.university}.</p>
      </section>

      <section className="container" style={{ position: 'relative', paddingBottom: 'var(--section)' }}>
        <div className="ghost w" style={{ top: -40 }}>Coding Club</div>
        <div className="split" style={{ position: 'relative' }}>
          <div className="stack reveal" style={{ gap: 18 }}>
            <MacWindow style={{ height: 'clamp(300px, 36vw, 520px)' }}>
              <img src={IMAGES.groupPhoto} alt="Coding Club members group photo" loading="lazy" />
            </MacWindow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <span className="w" style={{ fontSize: 15 }}>Purna Chand · President</span>
              <span className="w" style={{ fontSize: 15 }}>Rahul Sharma · Vice President</span>
            </div>
          </div>
          <div className="prose stack reveal d1" style={{ paddingTop: 10 }}>
            <p>Coding Club started at {SITE.university} with a handful of students solving problems after class. We couldn’t find a place on campus where you could actually build things with other people — so we made one.</p>
            <p>Today we’re 248 members across every branch and year. We’ve shipped 42 projects, hosted 31 events and welcomed 840 registrations. Our mission: make SRM AP the place where students learn by shipping — with real code reviews, real teams and real users.</p>
            <div className="signed" style={{ marginTop: 26 }}><span className="script">Signed</span><span className="w">Coding Club SRM AP</span></div>
          </div>
        </div>
      </section>

      <section className="container grid-2" style={{ paddingBottom: 'var(--section)', gap: 20 }}>
        <Tinted image={IMAGES.pairCoding} tint="red" className="reveal" style={{ minHeight: 480, padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span className="w" style={{ fontSize: 14 }}>Mission</span>
          <p className="h" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>Turn curious students into engineers who ship real software.</p>
        </Tinted>
        <Tinted image={IMAGES.meetup} tint="blue" className="reveal d1" style={{ minHeight: 480, padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span className="w" style={{ fontSize: 14 }}>Vision</span>
          <p className="h" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>A campus where everyone who wants to build has a team and a mentor.</p>
        </Tinted>
      </section>

      <section className="container stack" style={{ gap: 64, paddingBottom: 'var(--section)' }}>
        <h2 className="w display-md center reveal" style={{ color: '#e4e4e4' }}>Our story</h2>
        <div>
          {STORY.map((s) => (
            <div className="timeline-row reveal" key={s.title}>
              <span className="w red" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>{s.year}</span>
              <span className="w" style={{ fontSize: 'clamp(22px, 2.2vw, 30px)', color: '#e0e0e0' }}>{s.title}</span>
              <p className="muted" style={{ fontSize: 16, lineHeight: 1.6 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 'var(--section)' }}>
        <div className="split reveal" style={{ border: '1px solid var(--line)', background: 'var(--bg-2)', borderRadius: 18, padding: 'clamp(20px, 3vw, 40px)', gridTemplateColumns: 'minmax(0, 420px) minmax(0, 1fr)', alignItems: 'center' }}>
          <Tinted image={IMAGES.talk} tint="purple" style={{ height: 460 }}>
            <span className="w" style={{ position: 'absolute', bottom: 20, left: 20, fontSize: 14, fontWeight: 700, color: '#fff' }}>Faculty Mentorship</span>
          </Tinted>
          <div className="stack" style={{ gap: 32 }}>
            <span className="eyebrow">Faculty coordinator</span>
            <p className="h" style={{ fontSize: 'clamp(26px, 3vw, 40px)' }}>“Coding Club has created a vibrant developer ecosystem on campus where students don’t just learn theoretical concepts, but apply them by building production-ready tools and competing at the highest national levels.”</p>
            <div className="stack" style={{ gap: 8 }}>
              <span className="w" style={{ fontSize: 22 }}>Dr. S. K. Murthy</span>
              <span className="muted">Associate Professor, Department of Computer Science &amp; Engineering, {SITE.universityShort}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container split" style={{ paddingBottom: 'var(--section)', gridTemplateColumns: 'minmax(0, 420px) minmax(0, 1fr)' }}>
        <h2 className="w display-md reveal" style={{ color: '#e4e4e4' }}>FAQ</h2>
        <div className="reveal d1"><Accordion items={FAQS.map((f) => ({ title: f.q, text: f.a }))} /></div>
      </section>

      <section className="section center" style={{ paddingTop: 0 }}>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <Button to="/join" variant="red">Join the club</Button>
          <Button to="/team" variant="white">Meet the team</Button>
        </div>
      </section>
    </>
  );
}
