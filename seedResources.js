const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TechResource = require('./models/TechResource');

dotenv.config();

const techResources = [
  {
    title: "Scaling LLMs in Production",
    description: "Engineering strategies for deploying large language models at scale—optimization, cost management, and latency reduction.",
    longDescription: "Deploying large language models (LLMs) requires a shift in engineering mindset. This resource covers quantization techniques, KV-cache optimization, load balancing strategies for GPU clusters, and effective ways to monitor hallucination rates in real-time production environments.",
    category: "BLOG",
    icon: "Zap",
    linkText: "Read More",
    linkUrl: "/contact"
  },
  {
    title: "MLOps Pipeline Architecture",
    description: "Build automated ML workflows from data ingestion to model deployment with CI/CD integration and monitoring.",
    longDescription: "A robust MLOps pipeline is the backbone of reliable AI. We detail the integration of feature stores, automated model retraining triggers, version control for data (DVC), and deployment patterns like Canary and Blue-Green for machine learning models.",
    category: "GUIDE",
    icon: "Database",
    linkText: "Read More",
    linkUrl: "/contact"
  },
  {
    title: "Computer Vision Systems",
    description: "End-to-end CV pipeline design—from real-time inference to edge deployment for production environments.",
    longDescription: "From industrial quality control to autonomous navigation, computer vision systems demand low latency. This guide explores TensorRT optimization, edge gateway architectures, and managing distributed camera feeds with centralized model orchestration.",
    category: "GUIDE",
    icon: "CircuitBoard",
    linkText: "Read More",
    linkUrl: "/contact"
  },
  {
    title: "Cloud Cost Optimization",
    description: "Strategic approaches to reducing cloud spend by 50% while maintaining performance and scalability.",
    longDescription: "Cloud waste is a silent killer of ROI. Learn about spot instance orchestration for training jobs, automated right-sizing of compute clusters, serverless inference patterns, and tagging strategies for granular cost attribution across high-scale AI projects.",
    category: "GUIDE",
    icon: "Layers",
    linkText: "Read More",
    linkUrl: "/contact"
  }
];

const seedResources = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Optional: Clear existing resources if you want a clean state
    // await TechResource.deleteMany({});
    // console.log('Cleared existing resources');

    // Only seed if empty or selectively add
    const count = await TechResource.countDocuments();
    if (count > 0) {
      console.log('TechResource collection not empty. Adding new resources if they do not exist based on title.');
      for (const res of techResources) {
        const exists = await TechResource.findOne({ title: res.title });
        if (!exists) {
          await TechResource.create(res);
          console.log(`Added: ${res.title}`);
        } else {
          console.log(`Skipped (already exists): ${res.title}`);
        }
      }
    } else {
      await TechResource.insertMany(techResources);
      console.log('Resources seeded successfully');
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedResources();
