const mongoose = require('mongoose');
const dotenv = require('dotenv');
const EventHighlight = require('./models/EventHighlight');

dotenv.config();

const API_BASE = 'http://localhost:5000/uploads'; // Or your deployed URL

// Mapping of image variables to filenames based on frontend/src/pages/Events.js imports
// Note: This mapping assumes the files were copied to backend/uploads/*.jpg exactly as named in the source directory
const imageMap = {
  a: 'a.jpg', b: 'b.jpg', c: 'c.jpg', d: 'd.jpg', e: 'e.jpg', f: 'f.jpg', g: 'g.jpg', h: 'h.jpg', i: 'i.jpg', 
  j: 'j.jpg', k: 'k.jpg', l: 'l.jpg', m: 'm.jpg', n: 'n.jpg', o: 'o.jpg', p: 'p.jpg', q: 'q.jpg', r: 'r.jpg', 
  s: 's.jpg', t: 't.jpg', u: 'u.jpg', v: 'v.jpg', w: 'w.jpg', x: 'x.jpg', y: 'y.jpg', z: 'z.jpg',
  A1: 'A1.jpg', A2: 'A2.jpg', A3: 'A3.jpg', A4: 'A4.jpg', A5: 'A5.jpg', A6: 'A6.jpg', A7: 'A7.jpg', A8: 'A8.jpg', A9: 'A9.jpg',
  B1: 'B1.jpg', B2: 'B2.jpg', B3: 'B3.jpg', B4: 'B4.jpg', B5: 'B5.jpg', B6: 'B6.jpg', B7: 'B7.jpg', B8: 'B8.jpg', BNI: 'BNI.jpg'
};

const highlightTiles = [
  {
      title: "Building Business In Worth",
      gallery: ['a', 'e', 'f', 'g', 'h'],
  },
  {
      title: "Designing Immersive Research Clinics",
      gallery: ['c', 'i', 'j', 'k'],
  },
  {
      title: "The Next Big Thing: Supply Chain",
      gallery: ['d', 'l', 'm', 'n'],
  },
  {
      title: "Transformation In A Time Of Disruption",
      gallery: ['A1', 'o', 'p', 'q'],
  },
  {
      title: "India's Branch Of The Future",
      gallery: ['A2', 'A3', 'r', 's'],
  },
  {
      title: "Campus Innovation Bootcamp",
      gallery: ['A3', 't', 'u', 'v'],
  },
  {
      title: "Future Readiness Showcase",
      gallery: ['A4', 'A5', 'w', 'x'],
  },
  {
      title: "Future Readiness Showcase",
      gallery: ['A6', 'A7', 'y', 'z'],
  },
  {
      title: "Future Readiness Showcase",
      gallery: ['A8', 'A9', 'B1', 'B2'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['B3', 'B4', 'B5', 'B6'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['B7', 'B8', 'BNI', 'e'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['f', 'g', 'h', 'i'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['j', 'k', 'l', 'm'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['n', 'o', 'p', 'q'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['r', 's', 't', 'u'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['v', 'w', 'x', 'y'],
  },
  {
    title: "Future Readiness Showcase",
    gallery: ['z', 'A1', 'A2', 'A3'],
  }
];

const seedHighlights = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Only seed if empty to avoid duplicates on re-runs
    const count = await EventHighlight.countDocuments();
    if (count > 0) {
        console.log('EventHighlights collection not empty. Skipping seed.');
        process.exit();
    }

    const highlights = highlightTiles.map(tile => ({
      title: tile.title,
      images: tile.gallery.map(imgKey => `${API_BASE}/${imageMap[imgKey] || 'a.jpg'}`)
    }));

    await EventHighlight.insertMany(highlights);
    console.log('Highlights seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedHighlights();
