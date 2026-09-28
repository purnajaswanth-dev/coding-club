import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { registerForEvent } from '../services/api';
import { useToast } from './Toast';

const EMPTY = { name: '', email: '', rollNumber: '', year: '' };

/** Event registration form. Sends POST /events/:slug/register through services/api.js */
export default function RegisterModal({ event, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [ticket, setTicket] = useState(null);
  const toast = useToast();

  const close = () => {
    setForm(EMPTY);
    setErrors({});
    setTicket(null);
    onClose();
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.rollNumber.trim()) e.rollNumber = 'Enter your roll number';
    if (!form.year) e.year = 'Pick your year';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      const res = await registerForEvent(event.slug, form);
      setTicket(res.ticketId);
      toast('You’re registered! Check your email.');
    } catch (err) {
      toast(err.message);
    } finally {
      setSending(false);
    }
  };

  const field = (key, label, props = {}) => (
    <div className="field">
      <label htmlFor={`r-${key}`} className="label">{label}</label>
      <input id={`r-${key}`} className={`input ${errors[key] ? 'invalid' : ''}`} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} aria-invalid={!!errors[key]} {...props} />
      {errors[key] && <span className="error-text">{errors[key]}</span>}
    </div>
  );

  return (
    <Modal open={!!event} onClose={close} title={event ? `Register · ${event.title}` : ''}>
      {ticket ? (
        <div className="success">
          <span className="script red" style={{ fontSize: 48 }}>see you there</span>
          <h3 className="w" style={{ fontSize: 30 }}>You’re in!</h3>
          <p className="muted">Your ticket ID is <b className="mono" style={{ color: '#fff' }}>{ticket}</b>.</p>
          <Button variant="white" onClick={close}>Done</Button>
        </div>
      ) : (
        <form className="form" onSubmit={submit} noValidate>
          <h3 className="w" style={{ fontSize: 26, paddingRight: 50 }}>{event?.title}</h3>
          {field('name', 'Full name', { autoComplete: 'name' })}
          {field('email', 'College email', { type: 'email', autoComplete: 'email', placeholder: 'you@srmap.edu.in' })}
          <div className="form-grid">
            {field('rollNumber', 'Roll number', { placeholder: 'AP2xxxxxxxxxx' })}
            <div className="field">
              <label htmlFor="r-year" className="label">Year</label>
              <select id="r-year" className={`input ${errors.year ? 'invalid' : ''}`} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                <option value="">Select</option>
                <option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option>
              </select>
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>
          </div>
          <Button type="submit" variant="red" disabled={sending}>{sending ? 'Registering…' : 'Confirm registration'}</Button>
        </form>
      )}
    </Modal>
  );
}
