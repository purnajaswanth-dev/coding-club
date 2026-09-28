// Mock data shaped like GET /achievements
import { IMAGES } from './images';

export const ACHIEVEMENT_FILTERS = ['All', 'Hackathon', 'Competitive Programming', 'Open Source', 'Research', 'Award'];

export const ACHIEVEMENT_STATS = [
  { value: 18, prefix: '+', label: 'Hackathon Podiums' },
  { value: 45, prefix: '+', label: 'Contest Top Ranks' },
  { value: 120, prefix: '+', label: 'Open-Source PRs' },
  { value: 8, prefix: '+', label: 'Research Papers' },
];

export const ACHIEVEMENTS = [
  {
    id: 1,
    category: 'Hackathon',
    year: '2026',
    result: '1st Place Winner',
    event: 'Smart India Hackathon (SIH)',
    team: 'Team ByteForce (Purna, Arjun, Sneha, Rahul)',
    image: IMAGES.hackathon,
    tint: 'red',
    description: 'Built an AI-assisted crop disease detection & supply chain transparency platform for Ministry of Agriculture problem statement, securing the grand prize of ₹1,00,000.',
    proofUrl: 'https://github.com/codingclub-srmap',
  },
  {
    id: 2,
    category: 'Competitive Programming',
    year: '2026',
    result: 'ICPC Regional Finalists',
    event: 'ICPC Asia-Amritapuri Regional',
    team: 'Team NullPointer (Purna, Rahul, Arjun)',
    image: IMAGES.codeScreen,
    tint: 'blue',
    description: 'Ranked in the top 35 collegiate teams nationwide after solving 7 advanced algorithmic problems within 5 hours under intense competitive conditions.',
    proofUrl: 'https://github.com/codingclub-srmap',
  },
  {
    id: 3,
    category: 'Open Source',
    year: '2025',
    result: 'Selected Contributor',
    event: 'Google Summer of Code (GSoC)',
    team: 'Arjun Verma (Tech Lead)',
    image: IMAGES.laptopCode,
    tint: 'green',
    description: 'Selected for the Eclipse Foundation organization, contributing 12+ critical patches to the Eclipse Vert.x reactive microservices runtime.',
    proofUrl: 'https://github.com/codingclub-srmap',
  },
  {
    id: 4,
    category: 'Hackathon',
    year: '2025',
    result: 'Grand Finalists & Best UI',
    event: 'ETHIndia Hackathon 2025',
    team: 'Team WebCraft (Sneha, Rahul, Purna)',
    image: IMAGES.hackathonNight,
    tint: 'purple',
    description: 'Developed a decentralized carbon credit verification protocol with zero-knowledge proof credentials, winning the Best UI track award out of 450+ teams.',
    proofUrl: 'https://github.com/codingclub-srmap',
  },
  {
    id: 5,
    category: 'Research',
    year: '2025',
    result: 'Published at IEEE CCWC',
    event: 'IEEE Computing & Communication Conference',
    team: 'Purna Chand & Dr. CSE Faculty Mentor',
    image: IMAGES.talk2,
    tint: 'amber',
    description: 'Co-authored a peer-reviewed research paper titled "Optimizing Distributed Consensus in Edge IoT Networks using Lightweight Cryptographic Primitives".',
    proofUrl: 'https://github.com/codingclub-srmap',
  },
  {
    id: 6,
    category: 'Award',
    year: '2025',
    result: 'Best Technical Club on Campus',
    event: 'SRM AP Annual Student Excellence Awards',
    team: 'Coding Club SRM AP',
    image: IMAGES.stage,
    tint: 'teal',
    description: 'Recognized by the Vice-Chancellor and Directorate of Student Affairs for hosting 30+ impactful technical events and shipping campus-wide digital infrastructure.',
    proofUrl: 'https://github.com/codingclub-srmap',
  },
];

export const MILESTONES = [
  { year: '2023', title: 'Club Inception & First 40 Members' },
  { year: '2024', title: 'First National Hackathon Win & Open Source Org' },
  { year: '2025', title: '150+ Members · SIH Victory · GSoC Selection' },
  { year: '2026', title: '248 Members · 42 Projects · ICPC Regionals' },
];

export const GALLERY = [
  { image: IMAGES.hackathon, label: 'Smart India Hackathon Final', h: 360 },
  { image: IMAGES.talk, label: 'Distributed Systems Tech Talk', h: 240 },
  { image: IMAGES.groupPhoto, label: 'Coding Club Core 2026', h: 300 },
  { image: IMAGES.lab, label: 'Spring Boot Hands-On Lab', h: 420 },
  { image: IMAGES.crowd, label: 'Hack SRM AP Opening', h: 280 },
  { image: IMAGES.hackathonNight, label: 'Midnight Build Sprint', h: 340 },
  { image: IMAGES.friends, label: 'SIH Trophy Celebration', h: 240 },
  { image: IMAGES.meetup, label: 'Open Source Saturday', h: 380 },
  { image: IMAGES.stage, label: 'Demo Day Project Expo', h: 300 },
  { image: IMAGES.pairCoding, label: 'Weekly Pair Programming', h: 260 },
  { image: IMAGES.studentsWorking, label: 'DSA Bootcamp Final Round', h: 340 },
  { image: IMAGES.talk2, label: 'Guest Speaker from Uber', h: 280 },
];

export const SPONSORS = [
  'Google Cloud',
  'GitHub Campus',
  'Postman',
  'JetBrains',
  'Red Hat',
  'Polygon',
  'Vercel',
  'DigitalOcean',
];
