// Site-wide content and configuration
import { IMAGES } from './images';

export const SITE = {
  name: 'Coding Club',
  shortName: 'CODING CLUB',
  university: 'SRM University AP',
  universityShort: 'SRM AP',
  tagline: 'We ship code, not homework.',
  email: 'codingclub@srmap.edu.in',
  address: ['SRM University AP', 'Neerukonda, Mangalagiri Mandal', 'Guntur District, Andhra Pradesh 522240'],
  room: 'Tech Park Block, Room 302',
  recruitmentOpen: true,
  recruitmentDeadline: '2026-10-31T23:59:00+05:30',
  socials: [
    { label: 'GitHub', href: 'https://github.com/codingclub-srmap' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Discord', href: 'https://discord.gg' },
    { label: 'Instagram', href: 'https://instagram.com' },
  ],
};

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/join', label: 'Join' },
];

export const STATS = [
  { value: 248, prefix: '+', label: 'Active Members' },
  { value: 42, prefix: '+', label: 'Projects Shipped' },
  { value: 31, prefix: '+', label: 'Events Hosted' },
  { value: 840, prefix: '+', label: 'Registrations' },
];

export const TECH = [
  'React', 'Spring Boot', 'Python', 'Java', 'Node.js', 'Docker', 'AWS',
  'PostgreSQL', 'FastAPI', 'Git', 'Kubernetes', 'Next.js', 'C++', 'Flutter', 'Kafka', 'Redis',
];

export const TRACKS = [
  {
    id: 'build',
    title: 'Build',
    image: IMAGES.pairCoding,
    file: 'EventController.java',
    text: 'We design, code, review and deploy real products — web apps, APIs and mobile apps that students on campus actually use. Seniors review every pull request.',
    items: [
      { title: 'Web & App Development', text: 'React, Next.js, Spring Boot, Node and Flutter. Weekly build nights and a real deployment at the end of every cycle.' },
      { title: 'AI / ML', text: 'From classic ML to LLM apps. Reading groups, Kaggle sprints and projects with real datasets.' },
      { title: 'Open Source', text: 'Good-first-issues, contribution guides and a club GitHub organisation where every project is public.' },
      { title: 'Cloud & DevOps', text: 'Docker, CI/CD, AWS and Linux — learn to ship and run what you build.' },
    ],
  },
  {
    id: 'compete',
    title: 'Compete',
    image: IMAGES.hackathon,
    file: 'Weekly Contest · Live',
    text: 'Weekly contests, a daily problem and hackathon teams. We train DSA from arrays to dynamic programming and send teams to the biggest hackathons in the country.',
    items: [
      { title: 'Weekly contests', text: 'Every Sunday on our own judge. Live leaderboard, editorials the next day.' },
      { title: 'DSA bootcamps', text: 'Six-week bootcamps: arrays, hashing, trees, graphs, DP — with mock interviews.' },
      { title: 'Hackathon teams', text: 'Team formation, mentors and practice rounds before every major hackathon.' },
    ],
  },
];

export const TESTIMONIALS = [
  { handle: '@purna.dev', image: IMAGES.p1, tint: 'green', quote: 'Joining Coding Club in my first year changed my trajectory entirely. From writing my first Java loop to leading the backend of campus apps and mentoring 200+ juniors.' },
  { handle: '@sneha.design', image: IMAGES.p4, tint: 'amber', quote: 'The culture of shipping here is unmatched. You don’t just learn syntax in a slide deck; you design interfaces that hundreds of real college students interact with every single day.' },
  { handle: '@arjun.code', image: IMAGES.p3, tint: 'blue', quote: 'The senior code reviews and system design sessions directly helped me crack GSoC and national hackathons. It is the best place on campus to build serious software.' },
  { handle: '@rahul.ops', image: IMAGES.p2, tint: 'red', quote: 'The energy at 2:00 AM during our internal hackathons is electric. You find people who are just as obsessed with clean code and problem solving as you are.' },
  { handle: '@ananya.dsa', image: IMAGES.p6, tint: 'teal', quote: 'Our weekly CodeSprints and peer problem-solving groups transformed algorithmic problem-solving from a stressful chore into the most fun part of my weekend.' },
];

export const FAQS = [
  { q: 'Do I need prior coding experience to join?', a: 'No. Beginners start on our fundamentals track with a dedicated senior mentor. All we look for is genuine curiosity, problem-solving enthusiasm, and consistency.' },
  { q: 'Which branches and years are eligible?', a: 'Every department (CSE, ECE, Mechanical, Civil, Liberal Arts) and every year at SRM University AP. First-years are especially encouraged to apply.' },
  { q: 'What is the weekly time commitment?', a: 'Around 4–6 hours per week: one collaborative workshop or build night plus your project time. Contests and reading groups are self-paced.' },
  { q: 'Do members get certificates and credentials?', a: 'Yes — every workshop, bootcamp, hackathon participation and leadership role generates a cryptographically verifiable certificate ID on our platform.' },
  { q: 'Can I propose and lead my own project?', a: 'Absolutely. Pitch your concept at our bi-weekly build night. If two or three members want to collaborate, it officially becomes a club-supported project.' },
];

export const JOIN_FAQS = [
  { q: 'What happens during the interaction/interview?', a: 'A friendly 15-minute conversation about your interests, what you have built or what you are excited to learn. No tricky riddles or high-stress live coding.' },
  { q: 'I am a first-year student with no GitHub repo yet. Should I apply?', a: 'Yes, 100%! We prioritize passion, eagerness to learn, and commitment over existing resumes.' },
  { q: 'When will recruitment results be announced?', a: 'Within 5–7 days following the application deadline, delivered directly to your student email.' },
  { q: 'Can I participate in multiple tracks?', a: 'You start with one primary track (e.g. Web Dev, DSA, or AI) and can cross-collaborate or join other tracks after onboarding.' },
];

export const STORY = [
  { year: '2023', title: 'The First Whiteboard Meetup', text: 'A small group of enthusiastic students met in an empty classroom after hours to solve problems together and build real projects.' },
  { year: '2024', title: 'First National Hackathon Win', text: 'Our teams clinched 1st place in regional hackathons, and our open-source GitHub organization was officially created.' },
  { year: '2025', title: 'Scaling to 150+ Members & GSoC', text: 'Expanded specialized divisions for Web, DSA, AI/ML and Cloud. Members achieved selections in GSoC and Smart India Hackathon.' },
  { year: '2026', title: '248 Members & 42 Projects Shipped', text: 'Now the flagship student engineering community at SRM University AP, powering campus digital tools, hosting major hackathons, and competing nationally.' },
];

export const WHY_JOIN = [
  { big: 'Build', title: 'Ship Real Products', text: 'Work in teams to design, engineer, and deploy software used by hundreds of students across campus.', image: IMAGES.teamDesk, tint: 'blue' },
  { big: 'Learn', title: 'Senior Mentorship', text: 'Receive 1:1 guidance, rigorous PR code reviews, and mock interview prep from seniors who cracked top internships.', image: IMAGES.workshop, tint: 'green' },
  { big: 'Hack', title: 'Hackathon Delegations', text: 'Form squads with complementary skills, get travel grants, and compete at premier national hackathons.', image: IMAGES.hackathonNight, tint: 'red' },
  { big: 'Proof', title: 'Verifiable Portfolio', text: 'Build a standout GitHub history, verifiable certificates, and project case studies that impress technical recruiters.', image: IMAGES.laptopCode, tint: 'purple' },
];

export const RECRUIT_STEPS = [
  { n: '01', title: 'Submit Application', text: 'Complete the short application form detailing your background and track of interest.' },
  { n: '02', title: 'Profile Screening', text: 'The core team reviews every submission with an open, inclusive mindset.' },
  { n: '03', title: 'Shortlist Notification', text: 'Receive an email invitation to a short 1:1 conversation with track leads.' },
  { n: '04', title: 'Friendly Interaction', text: 'A casual 15-minute chat about your learning goals and project interests.' },
  { n: '05', title: 'Welcome to the Club', text: 'Official acceptance letter and onboarding into the private community Discord.' },
  { n: '06', title: 'Track Onboarding', text: 'Access club repositories, pick your first sprint issue, and meet your mentor.' },
];

export const SKILL_MATRIX = [
  { name: 'Frontend (React / Next.js / Flutter)', pct: 84 },
  { name: 'Backend (Spring Boot / Node / Go)', pct: 76 },
  { name: 'DSA & Competitive Programming', pct: 68 },
  { name: 'AI / ML & Data Science', pct: 52 },
  { name: 'Cloud, Docker & DevOps', pct: 40 },
  { name: 'UI / UX Design & Prototyping', pct: 36 },
];

export const SKILL_OPTIONS = [
  'Java', 'Spring Boot', 'React', 'Python', 'C++', 'Node.js', 'SQL', 'Docker', 'AWS', 'Machine Learning', 'Figma', 'Git', 'TypeScript', 'Flutter', 'Go',
];

export const TRACK_OPTIONS = [
  'Web & App Development',
  'DSA & Competitive Programming',
  'AI / ML & Data Engineering',
  'Cloud, DevOps & Open Source',
];
