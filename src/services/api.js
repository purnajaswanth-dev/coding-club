/**
 * API layer — the ONLY place the UI gets data from.
 *
 * Every page calls functions from this file (never fetch() directly), so connecting a backend
 * means changing only this file and your .env:
 *
 *   VITE_USE_MOCK=true   -> returns the mock data from src/data (default, no backend needed)
 *   VITE_USE_MOCK=false  -> calls the REST endpoints below on VITE_API_URL
 *
 * Expected REST endpoints (see README.md for request/response shapes):
 *   GET  /stats
 *   GET  /members                     GET  /members/:id
 *   GET  /events?status=upcoming      GET  /events/:slug
 *   POST /events/:slug/register
 *   GET  /projects                    GET  /projects/:slug
 *   GET  /achievements
 *   POST /applications
 *   POST /contact
 */
import { MEMBERS } from '../data/members';
import { EVENTS } from '../data/events';
import { PROJECTS } from '../data/projects';
import { ACHIEVEMENTS } from '../data/achievements';
import { STATS } from '../data/site';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api').replace(/\/$/, '');

// ---------- HTTP client ----------

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request(path, { method = 'GET', body, headers } = {}) {
  const token = localStorageSafeGet('authToken'); // ready for JWT auth later
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) {
    throw new ApiError('Could not reach the server. Please try again.', 0);
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(data?.message || `Request failed (${res.status})`, res.status, data);
  return data;
}

function localStorageSafeGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

// Simulates network latency for mock mode so loading states are visible during development.
const mock = (data, ms = 250) => new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));

// ---------- Stats ----------

export const getStats = () => (USE_MOCK ? mock(STATS) : request('/stats'));

// ---------- Members ----------

export const getMembers = (group) =>
  USE_MOCK
    ? mock(group ? MEMBERS.filter((m) => m.group === group) : MEMBERS)
    : request(`/members${group ? `?group=${encodeURIComponent(group)}` : ''}`);

export const getMember = (id) =>
  USE_MOCK ? mock(MEMBERS.find((m) => String(m.id) === String(id)) || null) : request(`/members/${id}`);

// ---------- Events ----------

export const getEvents = (status) =>
  USE_MOCK
    ? mock(status ? EVENTS.filter((e) => e.status === status) : EVENTS)
    : request(`/events${status ? `?status=${status}` : ''}`);

export const getEvent = (slug) =>
  USE_MOCK ? mock(EVENTS.find((e) => e.slug === slug) || null) : request(`/events/${slug}`);

/** body: { name, email, rollNumber, year } -> { ticketId, message } */
export const registerForEvent = (slug, body) =>
  USE_MOCK
    ? mock({ ticketId: `CC-${Date.now().toString().slice(-6)}`, message: 'You are registered!' }, 700)
    : request(`/events/${slug}/register`, { method: 'POST', body });

// ---------- Projects ----------

export const getProjects = () => (USE_MOCK ? mock(PROJECTS) : request('/projects'));

export const getProject = (slug) =>
  USE_MOCK ? mock(PROJECTS.find((p) => p.slug === slug) || null) : request(`/projects/${slug}`);

// ---------- Achievements ----------

export const getAchievements = () => (USE_MOCK ? mock(ACHIEVEMENTS) : request('/achievements'));

// ---------- Forms ----------

/** Recruitment application. body: see Join page form fields -> { applicationId, message } */
export const submitApplication = (body) =>
  USE_MOCK
    ? mock({ applicationId: `APP-${Date.now().toString().slice(-6)}`, message: 'Application received' }, 900)
    : request('/applications', { method: 'POST', body });

/** Contact form. body: { name, email, topic, message } */
export const submitContact = (body) =>
  USE_MOCK ? mock({ message: 'Message sent' }, 700) : request('/contact', { method: 'POST', body });
