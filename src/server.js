require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
const Url = require('./models/Url');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api', urlRoutes);

// Redirect route - Handle short URL redirects
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    url.clicks += 1;
    await url.save();

    // Redirect to original URL
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'TinyURL API is running',
    endpoints: {
      shorten: 'POST /api/shorten',
      stats: 'GET /api/stats/:shortCode',
      redirect: 'GET /:shortCode',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Base URL: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
});

module.exports = app;
