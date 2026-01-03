const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    title: "Web App Suite",
    description: "Develop and deploy powerful, responsive applications with ease.",
    tag: "AI Solutions",
    accent: "#22D3EE",
    imageUrl: "", // Will map in frontend
    linkUrl: "#"
  },
  {
    title: "Chatbots",
    description: "Engage users instantly with intelligent chat interfaces that provide personalized, real-time support and interactions.",
    tag: "Innovation Tooling",
    accent: "#A855F7",
    imageUrl: "",
    linkUrl: "#"
  },
  {
    title: "AI Agents",
    description: "Empower automation and decision-making with intelligent agents that adapt, learn, and act in real time.",
    tag: "Encoded system",
    accent: "#38BDF8",
    imageUrl: "",
    linkUrl: "#"
  },
  {
    title: "Manuscript Acceleration Suite",
    description: "Advanced modelling environment engineered for accelerated research sprints.",
    tag: "Research Software",
    accent: "#F59E0B",
    imageUrl: "",
    linkUrl: "#"
  },
  {
    title: "IPR Commercialisation Suite",
    description: "Turn innovation into impact with tools for patent management and technology transfer.",
    tag: "Data Analytics",
    accent: "#22C55E",
    imageUrl: "",
    linkUrl: "#"
  },
  {
    title: "Accreditation Impact Suite",
    description: "Simplify institutional accreditation processes with automated analytics and insights",
    tag: "Encoded system",
    accent: "#818CF8",
    imageUrl: "",
    linkUrl: "#"
  }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
        
        // Clear existing products to avoid duplicates (optional, but good for "resetting" to previous state)
        // await Product.deleteMany({}); 
        // console.log('Cleared existing products');

        for (const p of products) {
            const exists = await Product.findOne({ title: p.title });
            if (!exists) {
                await Product.create(p);
                console.log(`Added: ${p.title}`);
            } else {
                console.log(`Skipped (already exists): ${p.title}`);
            }
        }
        
        console.log('Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
