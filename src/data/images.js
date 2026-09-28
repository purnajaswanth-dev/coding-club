// All photos used on the site live here, so they are easy to replace.
// They are free-to-use Unsplash photos (https://unsplash.com/license), loaded from Unsplash's CDN.
//
// To use your own photos: drop files in /public/images and replace the value, e.g.
//   hero: '/images/hero.jpg'
// Or run `npm run images:download` to save these photos locally into /public/images.

const u = (id, w = 1200, h) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`;

export const IMAGES = {
  hero: u('1504384764586-bb4cdc1707b0', 2000),
  heroSide: u('1637073849667-91120a924221', 900),
  reel: u('1631350397792-8e0c2de5b637', 1600),

  // Scenes
  hackathon: u('1631350397792-8e0c2de5b637', 1200),
  hackathonNight: u('1520110120835-c96534a4c984', 1200),
  lab: u('1719159381981-1327b22aff9b', 1200),
  pairCoding: u('1629904853893-c2c8981a1dc5', 1200),
  teamDesk: u('1514996937319-344454492b37', 1200),
  youngTech: u('1782388716252-d598f84ea62f', 1200),
  openOffice: u('1504384308090-c894fdcc538d', 1200),
  laptops: u('1563461660947-507ef49e9c47', 1200),
  meetup: u('1731160807880-daf859b64420', 1200),
  roundTable: u('1640163561346-7778a2edf353', 1200),
  workshop: u('1581091212911-f4efc3f71c48', 1200),
  stage: u('1592758080692-b6a5dbe9c725', 1400),
  talk: u('1762968274962-20c12e6e8ecd', 1200),
  talk2: u('1762968269894-1d7e1ce8894e', 1200),
  crowd: u('1593896385987-16bcbf9451e5', 1200),
  friends: u('1702564635728-7aeacaa370c8', 1200),
  groupPhoto: u('1569292567777-e5d61a759322', 1600),
  studentsWorking: u('1756273343749-63f7d6ea0cda', 1200),
  codeScreen: u('1515879218367-8466d910aaa4', 1200),
  codeMac: u('1555066931-4365d14bab8c', 1200),
  codeJava: u('1461749280684-dccba630e2f6', 1200),
  laptopCode: u('1573165265437-f5e267bb3db6', 1200),

  // Portraits (stand-ins until you add real member photos)
  p1: u('1649433658557-54cf58577c68', 700, 900),
  p2: u('1771165553611-fbe2655c3a91', 700, 900),
  p3: u('1697517529954-b6845f3245a0', 700, 900),
  p4: u('1767607740661-05e668190cdc', 700, 900),
  p5: u('1764740146693-4955d02c98f9', 700, 900),
  p6: u('1525457136159-8878648a7ad0', 700, 900),
  p7: u('1624610806209-82a4cbb4339a', 700, 900),
  p8: u('1604177091072-b7b677a077f6', 700, 900),
  p9: u('1507003211169-0a1dd7228f2d', 700, 900),
  p10: u('1564490215983-296e5f56b623', 700, 900),
  p11: u('1776440553775-75fc7e32abf7', 700, 900),
  p12: u('1609371497456-3a55a205d5eb', 700, 900),
};
