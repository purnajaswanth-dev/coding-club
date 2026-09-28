import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitApplication, submitContact } from '../services/api';
import { SITE, WHY_JOIN, RECRUIT_STEPS, JOIN_FAQS, SKILL_OPTIONS, TRACK_OPTIONS } from '../data/site';
import Tinted from '../components/Tinted';
import { IMAGES } from '../data/images';
import MacWindow from '../components/MacWindow';
import Button from '../components/Button';
import Accordion from '../components/Accordion';
import Countdown from '../components/Countdown';
import { BackIcon } from '../components/Icons';
import { useToast } from '../components/Toast';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const STEPS = ['Basics', 'Skills & links', 'Motivation', 'Review'];
const EMPTY_APP = {
  name: '', email: '', rollNumber: '', branch: '', year: '',
  github: '', linkedin: '', codingProfile: '', track: TRACK_OPTIONS[0], skills: [],
  why: '', projects: '', resumeName: '',
};

export default function Join() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 150);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <section className="hero" style={{ maxHeight: 960 }}>
        <div className="hero-bg"><img src={IMAGES.hackathonNight} alt="" /></div>
        <div className="stack" style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', gap: 36, textAlign: 'center', padding: '100px var(--pad) 40px' }}>
          <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', borderRadius: 999, border: '1px solid rgba(229,32,46,.45)', background: 'rgba(229,32,46,.1)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }} />
            <span className="w" style={{ fontSize: 12, fontWeight: 700 }}>
              {SITE.recruitmentOpen ? 'Recruitment open' : 'Recruitment closed'} · closes {new Date(SITE.recruitmentDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
          </div>
          <h1 className="w reveal in" style={{ fontSize: 'clamp(60px, 13vw, 190px)', lineHeight: 0.88 }}>Join the<br /><span className="silver">club</span></h1>
          <Countdown to={SITE.recruitmentDeadline} />
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Button variant="red" onClick={() => scrollTo('apply')}>Start application</Button>
            <Button variant="white" onClick={() => scrollTo('contact')}>Ask a question</Button>
          </div>
        </div>
      </section>

      <section className="container stack" style={{ gap: 60, paddingBlock: '80px var(--section)' }}>
        <h2 className="w display-md center reveal" style={{ color: '#e4e4e4' }}>What you get</h2>
        <div className="grid-4" style={{ rowGap: 18 }}>
          {WHY_JOIN.map((w, i) => (
            <Tinted key={w.title} image={w.image} tint={w.tint} className={`reveal d${i % 3}`} style={{ height: 460 }}>
              <span className="w vt" style={{ position: 'absolute', right: 14, top: 18, fontSize: 60 }}>{w.big}</span>
              <div className="stack" style={{ position: 'absolute', left: 26, bottom: 26, width: 200, gap: 12 }}>
                <span className="w" style={{ fontSize: 20 }}>{w.title}</span>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,.82)' }}>{w.text}</p>
              </div>
            </Tinted>
          ))}
        </div>
      </section>

      <section className="container stack" style={{ gap: 70, paddingBottom: 'var(--section)' }}>
        <h2 className="h title-lg center reveal">Six steps. No tricks.</h2>
        <div className="hsteps reveal" style={{ '--n': 6 }}>
          {RECRUIT_STEPS.map((s) => (
            <div className="hstep" key={s.title}>
              <span className="script red" style={{ fontSize: 34, lineHeight: 0.8 }}>{s.n}</span>
              <span className="w" style={{ fontSize: 20 }}>{s.title}</span>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.55 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="container stack" style={{ maxWidth: 1180, gap: 50, paddingBottom: 'var(--section)', scrollMarginTop: 90 }}>
        <div className="stack center" style={{ alignItems: 'center', gap: 22 }}>
          <span className="eyebrow">Application · about 8 minutes</span>
          <h2 className="w display-md">Apply</h2>
        </div>
        <ApplicationForm />
      </section>

      <section id="contact" className="container split" style={{ paddingBottom: 'var(--section)', scrollMarginTop: 90, gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 620px)' }}>
        <div className="stack reveal" style={{ gap: 40 }}>
          <h2 className="h" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>Questions? <span className="script red" style={{ fontSize: '1.4em', lineHeight: 0.6 }}>talk</span> to us.</h2>
          <div className="stack" style={{ gap: 26 }}>
            <div className="stack" style={{ gap: 8 }}><span className="label">Email</span><a href={`mailto:${SITE.email.replace(/[[\]]/g, '')}`} style={{ fontSize: 22 }}>{SITE.email}</a></div>
            <div className="stack" style={{ gap: 8 }}><span className="label">Find us</span><span style={{ fontSize: 20, lineHeight: 1.5 }}>{SITE.room}, {SITE.address.join(', ')}</span></div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', color: '#bdbdbd' }}>{SITE.socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}</div>
          </div>
          <MacWindow label="Map" style={{ height: 260 }}>
            <iframe
              title="SRM University AP on the map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=80.4908%2C16.4520%2C80.5228%2C16.4720&amp;layer=mapnik&amp;marker=16.4620%2C80.5068"
              style={{ border: 0, width: '100%', height: '100%', filter: 'invert(0.92) hue-rotate(180deg) grayscale(0.4)' }}
              loading="lazy"
            />
          </MacWindow>
        </div>
        <ContactForm />
      </section>

      <section className="container split" style={{ paddingBottom: 'var(--section)', gridTemplateColumns: 'minmax(0, 420px) minmax(0, 1fr)' }}>
        <h2 className="w display-sm reveal" style={{ color: '#e4e4e4' }}>Before<br />you apply</h2>
        <div className="reveal d1"><Accordion items={JOIN_FAQS.map((f) => ({ title: f.q, text: f.a }))} /></div>
      </section>
    </>
  );
}


/* ---------------- Application form (multi-step) ---------------- */
function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_APP);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);
  const toast = useToast();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSkill = (s) => set('skills', form.skills.includes(s) ? form.skills.filter((x) => x !== s) : [...form.skills, s]);

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.name.trim()) e.name = 'Enter your full name';
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
      if (!form.rollNumber.trim()) e.rollNumber = 'Enter your roll number';
      if (!form.branch) e.branch = 'Pick your branch';
      if (!form.year) e.year = 'Pick your year';
    }
    if (s === 1) {
      if (form.github && !/github\.com\/.+/i.test(form.github)) e.github = 'Use a link like github.com/username';
      if (!form.skills.length) e.skills = 'Pick at least one skill';
    }
    if (s === 2 && form.why.trim().length < 30) e.why = 'Tell us a little more (at least 30 characters)';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const next = () => validate(step) && setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    setSending(true);
    try {
      const res = await submitApplication(form);
      setDone(res.applicationId);
      toast('Application submitted!');
    } catch (err) {
      toast(err.message);
    } finally {
      setSending(false);
    }
  };

  const input = (k, label, props = {}) => (
    <div className="field">
      <label htmlFor={`a-${k}`} className="label">{label}</label>
      <input id={`a-${k}`} className={`input ${errors[k] ? 'invalid' : ''}`} value={form[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} {...props} />
      {errors[k] && <span className="error-text">{errors[k]}</span>}
    </div>
  );
  const select = (k, label, options) => (
    <div className="field">
      <label htmlFor={`a-${k}`} className="label">{label}</label>
      <select id={`a-${k}`} className={`input ${errors[k] ? 'invalid' : ''}`} value={form[k]} onChange={(e) => set(k, e.target.value)}>
        {options[0] !== TRACK_OPTIONS[0] && <option value="">Select</option>}
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {errors[k] && <span className="error-text">{errors[k]}</span>}
    </div>
  );

  if (done) {
    return (
      <MacWindow label="Application received" className="reveal in">
        <div className="success">
          <span className="script red" style={{ fontSize: 56 }}>welcome aboard</span>
          <h3 className="w" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Application sent</h3>
          <p className="muted">Your application ID is <b className="mono" style={{ color: '#fff' }}>{done}</b>. We’ll email you after screening.</p>
          <Button variant="white" onClick={() => { setDone(null); setForm(EMPTY_APP); setStep(0); }}>Submit another</Button>
        </div>
      </MacWindow>
    );
  }

  return (
    <MacWindow label={`Step ${step + 1} of 4 · ${STEPS[step]}`} className="reveal">
      <div className="progress"><div style={{ width: `${((step + 1) / 4) * 100}%` }} /></div>
      <form className="form" style={{ padding: 'clamp(20px, 3.4vw, 44px)' }} onSubmit={(e) => { e.preventDefault(); step === 3 ? submit() : next(); }} noValidate>
        <div className="steps-head">
          {STEPS.map((s, i) => (
            <span key={s} className={`w ${i === step ? 'on' : i < step ? 'done' : ''}`}>{i < step ? '✓' : `0${i + 1}`} {s}</span>
          ))}
        </div>

        {step === 0 && (
          <div className="form-grid">
            {input('name', 'Full name', { autoComplete: 'name' })}
            {input('email', 'College email', { type: 'email', autoComplete: 'email', placeholder: 'you@srmap.edu.in' })}
            {input('rollNumber', 'Roll number', { placeholder: 'AP2xxxxxxxxxx' })}
            {select('branch', 'Branch', ['CSE', 'CSE (AI & ML)', 'CSE (Data Science)', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'])}
            {select('year', 'Year', ['1st year', '2nd year', '3rd year', '4th year'])}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="form-grid">
              {input('github', 'GitHub profile', { type: 'url', placeholder: 'github.com/username' })}
              {input('linkedin', 'LinkedIn', { type: 'url', placeholder: 'linkedin.com/in/…' })}
              {input('codingProfile', 'LeetCode / Codeforces', { placeholder: 'Handle' })}
              {select('track', 'Preferred track', TRACK_OPTIONS)}
            </div>
            <div className="field">
              <span className="label">Skills — pick all that apply</span>
              <div className="tags" style={{ gap: 8 }}>
                {SKILL_OPTIONS.map((s) => (
                  <button type="button" key={s} className="chip-toggle" aria-pressed={form.skills.includes(s)} onClick={() => toggleSkill(s)}>{s}</button>
                ))}
              </div>
              {errors.skills && <span className="error-text">{errors.skills}</span>}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="field">
              <label htmlFor="a-why" className="label">Why do you want to join?</label>
              <textarea id="a-why" className={`input ${errors.why ? 'invalid' : ''}`} value={form.why} onChange={(e) => set('why', e.target.value)} placeholder="What do you want to build or learn?" />
              {errors.why && <span className="error-text">{errors.why}</span>}
            </div>
            <div className="field">
              <label htmlFor="a-projects" className="label">Projects you’ve built (optional)</label>
              <textarea id="a-projects" className="input" value={form.projects} onChange={(e) => set('projects', e.target.value)} placeholder="Links + one line on what each does" />
            </div>
            <div className="field">
              <span className="label">Resume (PDF, optional)</span>
              <label className="dropzone">
                <input type="file" accept="application/pdf" hidden onChange={(e) => set('resumeName', e.target.files?.[0]?.name || '')} />
                {form.resumeName ? <span>PDF · {form.resumeName}</span> : <span>Drop your resume here or <span className="red" style={{ textDecoration: 'underline' }}>browse</span></span>}
              </label>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="kv-grid">
            {[
              ['Name', form.name], ['Email', form.email], ['Roll number', form.rollNumber], ['Branch · Year', `${form.branch} · ${form.year}`],
              ['Track', form.track], ['Skills', form.skills.join(', ')], ['GitHub', form.github || '—'], ['Resume', form.resumeName || '—'],
            ].map(([k, v]) => (
              <div className="kv" key={k}><span className="label">{k}</span><span style={{ fontSize: 17, wordBreak: 'break-word' }}>{v}</span></div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', paddingTop: 8 }}>
          <Button onClick={back} icon={<BackIcon />} disabled={step === 0} style={{ visibility: step === 0 ? 'hidden' : 'visible' }}>Back</Button>
          <Button type="submit" variant="red" disabled={sending}>{step === 3 ? (sending ? 'Submitting…' : 'Submit application') : 'Continue'}</Button>
        </div>
      </form>
    </MacWindow>
  );
}

/* ---------------- Contact form ---------------- */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Joining the club', message: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = 'Enter a valid email';
    if (form.message.trim().length < 10) er.message = 'Write a short message';
    setErrors(er);
    if (Object.keys(er).length) return;
    setSending(true);
    try {
      await submitContact(form);
      toast('Message sent — we’ll reply soon.');
      setForm({ name: '', email: '', topic: 'Joining the club', message: '' });
    } catch (err) {
      toast(err.message);
    } finally {
      setSending(false);
    }
  };

  const f = (k, label, props = {}, Tag = 'input') => (
    <div className="field">
      <label htmlFor={`c-${k}`} className="label">{label}</label>
      <Tag id={`c-${k}`} className={`input ${errors[k] ? 'invalid' : ''}`} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} {...props} />
      {errors[k] && <span className="error-text">{errors[k]}</span>}
    </div>
  );

  return (
    <form className="form reveal d1" onSubmit={submit} noValidate style={{ border: '1px solid var(--line)', background: '#0b0b0b', borderRadius: 16, padding: 'clamp(22px, 3vw, 40px)', alignSelf: 'start' }}>
      {f('name', 'Name', { autoComplete: 'name' })}
      {f('email', 'Email', { type: 'email', autoComplete: 'email' })}
      <div className="field">
        <label htmlFor="c-topic" className="label">Topic</label>
        <select id="c-topic" className="input" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          <option>Joining the club</option><option>Sponsorship</option><option>Events</option><option>Something else</option>
        </select>
      </div>
      {f('message', 'Message', { style: { height: 150 } }, 'textarea')}
      <Button type="submit" variant="white" disabled={sending} style={{ alignSelf: 'flex-start' }}>{sending ? 'Sending…' : 'Send message'}</Button>
    </form>
  );
}
