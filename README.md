# Coding Club — SRM University AP (Frontend)

The club website's frontend, built with **React 18 + Vite + React Router**. It runs fully on mock data today and is built so a backend (Spring Boot, Node, Django…) can be connected later by changing **one file and one setting**.

Pages: Home · About · Events (+ event detail with registration) · Projects (+ project detail) · Team · Achievements · Join & Contact · 404.

---

## 1. Run it

Requires **Node.js 18+**.

```bash
npm install
npm run dev          # http://localhost:5173
```

Build for production:

```bash
npm run build        # output in /dist
npm run preview      # preview the build locally
```

### Photos
Photos are free Unsplash images loaded from Unsplash's CDN (see `src/data/images.js`).
To save them into the project so the site works offline and doesn't depend on Unsplash:

```bash
npm run images:download
```

This downloads every photo into `public/images/` and rewrites `src/data/images.js` to use the local files. To use your own photos, put them in `public/images/` and change the paths in `src/data/images.js`.

---

## 2. Project structure

```
src/
  main.jsx               App entry (router + toast provider)
  App.jsx                All routes
  styles/global.css      Design tokens (colours, fonts) + all styles, responsive
  services/api.js        ★ THE ONLY place data comes from (mock ↔ real backend)
  hooks/useApi.js        Loading / error state for any api.js call
  hooks/useReveal.js     Scroll-reveal animation
  data/                  Mock data — same shape the backend should return
    site.js              Club info, stats, FAQs, tracks, testimonials, form options
    members.js           GET /members
    events.js            GET /events
    projects.js          GET /projects
    achievements.js      GET /achievements (+ gallery, milestones, sponsors)
    images.js            Every photo URL in one place
  components/            Navbar, Footer, Button, MacWindow, Tinted, Cards, Modal,
                         RegisterModal, Accordion, Stats, Marquee, Countdown, Toast…
  pages/                 One file per page
scripts/download-images.mjs
```

**Editing content:** change the files in `src/data/`. Anything in `[square brackets]` is a placeholder for real details (dates, names, emails, results).

**Changing the look:** edit the variables at the top of `src/styles/global.css` (`--red`, `--bg`, fonts…).

---

## 3. Connecting a backend

1. Copy `.env.example` to `.env` and set:
   ```
   VITE_USE_MOCK=false
   VITE_API_URL=http://localhost:8080/api
   ```
2. Implement the endpoints below. Responses should match the objects in `src/data/*.js`.
3. Restart `npm run dev`.

Pages never call `fetch` directly — they call functions in `src/services/api.js`, which switch between mock data and HTTP. JWT support is already wired: if `localStorage.authToken` is set, it's sent as `Authorization: Bearer <token>`.

For local development you can proxy API calls through Vite instead of enabling CORS — see the commented `proxy` in `vite.config.js`.

### API contract

| Method | Endpoint | Used by | Request body | Response |
|---|---|---|---|---|
| GET | `/stats` | Home | – | `[{ value, prefix, label }]` |
| GET | `/members?group=core` | Home, Team, Project detail | – | `Member[]` |
| GET | `/members/:id` | – (ready) | – | `Member` |
| GET | `/events?status=upcoming` | Events | – | `Event[]` |
| GET | `/events/:slug` | Event detail | – | `Event` |
| POST | `/events/:slug/register` | Register modal | `{ name, email, rollNumber, year }` | `{ ticketId, message }` |
| GET | `/projects` | Home, Projects | – | `Project[]` |
| GET | `/projects/:slug` | Project detail | – | `Project` |
| GET | `/achievements` | Achievements | – | `Achievement[]` |
| POST | `/applications` | Join → application form | see below | `{ applicationId, message }` |
| POST | `/contact` | Join → contact form | `{ name, email, topic, message }` | `{ message }` |

Errors: return a non-2xx status with `{ "message": "Human-readable reason" }` — the UI shows that message in a toast.

**Object shapes** (full examples in `src/data/`):

```js
Member      { id, name, role, group: 'core'|'leads'|'members'|'alumni', branch, year, image, tint, skills[], github, linkedin, bio }
Event       { id, slug, title, type, status: 'upcoming'|'past', featured?, date: 'YYYY-MM-DD', time, venue, speaker,
              registrations, capacity, image, tint, summary, agenda: [{ time, item }] }
Project     { id, slug, name, status, featured?, category, image, tint, summary, problem, solution, tech[], team: memberId[], github, live }
Achievement { id, category, year, result, event, team, image, tint }
Application { name, email, rollNumber, branch, year, github, linkedin, codingProfile, track, skills[], why, projects, resumeName }
```

`tint` is one of `green | red | blue | purple | amber | teal` (the colour wash on photo cards).
The resume field currently sends only the file name; switch `submitApplication` to `FormData` when your backend accepts uploads.

---

## 4. Deploying

- **Vercel / Netlify:** build command `npm run build`, output folder `dist`. Add a rewrite of all routes to `/index.html` (Netlify: `public/_redirects` with `/* /index.html 200`).
- **Any static host without rewrites (e.g. GitHub Pages):** set `VITE_HASH_ROUTER=true` in `.env` before building — URLs become `/#/events` and work anywhere.
- **Served by your backend:** copy `dist/` into the backend's static folder (e.g. Spring Boot `src/main/resources/static`) and forward unknown routes to `index.html`.

---

## 5. Photo credits
Photos from [Unsplash](https://unsplash.com) under the Unsplash License. Portraits are stock stand-ins — replace them with real member photos before launch.
