const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HostedProgramme = require('./models/HostedProgramme');

dotenv.config();

const hostedEvents = [
  {
    date: "—",
    title: "STARTNET & SALEM CHAPTER LAUNCH",
    summary: "Launch event introducing STARTNET and the Salem chapter.",
  },
  {
    date: "July 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking meet-up for founders and professionals.",
  },
  {
    date: "—",
    title: "STARTNET ChatGPT & GenAI",
    summary: "Session focused on ChatGPT and Generative AI.",
  },
  {
    date: "—",
    title: "STARTNET Connect Zoom Up Meeting",
    summary: "Virtual Zoom catch-up under STARTNET Connect.",
  },
  {
    date: "—",
    title: "STARTNET Master Class – Prompt Engineering",
    summary: "Masterclass on prompt engineering techniques.",
  },
  {
    date: "August 2023",
    title: "STARTNET: Startup Tamilazh",
    summary: "Startup-focused gathering under the Tamilazh banner.",
  },
  {
    date: "August 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking meeting for the community.",
  },
  {
    date: "September 2023",
    title: "STARTNET Connect Monthly Networking Meeting – Mega Pitching",
    summary: "Networking meet featuring a mega pitching segment.",
  },
  {
    date: "October 2023",
    title: "STARTCONNECT Monthly Networking Meeting",
    summary: "Monthly networking session.",
  },
];

const seedProgrammes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const count = await HostedProgramme.countDocuments();
    if (count > 0) {
        console.log('HostedProgrammes collection not empty. If you want to re-seed, manually clear existing documents.');
        process.exit();
    }

    await HostedProgramme.insertMany(hostedEvents);
    console.log('Hosted Programmes seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProgrammes();
