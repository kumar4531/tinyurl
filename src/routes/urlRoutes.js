const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/Url');

// POST /api/shorten - Create shortened URL
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;

    // Validate URL
    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    if (!validUrl.isUri(originalUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check if URL already exists
    let url = await Url.findOne({ originalUrl });

    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        shortCode: url.shortCode,
      });
    }

    // Generate unique short code
    const shortCode = nanoid(7);

    // Create new URL entry
    url = new Url({
      originalUrl,
      shortCode,
    });

    await url.save();

    res.status(201).json({
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      shortCode: url.shortCode,
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/stats/:shortCode - Get URL statistics
router.get('/stats/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt,
    });
  } catch (error) {
    console.error('Error fetching URL stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
