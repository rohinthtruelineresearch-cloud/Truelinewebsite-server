const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const blogRoutes = require('./routes/blog');
const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');

app.use('/api/blog', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/products', require('./routes/products')); 
app.use('/api/event-highlights', require('./routes/eventHighlights')); 
app.use('/api/hosted-programmes', require('./routes/hostedProgrammes'));
app.use('/api/showcases', require('./routes/showcases'));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static('uploads')); 
console.log('Registering subscribers route...');
app.use('/api/subscribers', require('./routes/subscribers')); 

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
