// server/src/routes/application.routes.js
const express = require('express');
const { authenticate } = require('../middleware/auth');
const { Application, User } = require('../models');
const { sendMail } = require('../utils/mailer');
const router = express.Router();

// POST /api/applications/submit
router.post('/submit', authenticate, async (req, res) => {
  try {
    const { position, resumeUrl, coverLetter, answers } = req.body;
    const application = await Application.create({
      userId: req.user.id,
      position,
      resumeUrl,
      coverLetter,
      answers: answers
    });

    const user = await User.findByPk(req.user.id);
    const previewUrl = await sendMail({
      to: user.email,
      subject: `Application Received: ${position}`,
      text: `Thanks ${user.name}. We received your application for ${position}.`
    });

    res.json({ application, emailPreviewUrl: previewUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/applications/my
router.get('/my', authenticate, async (req, res) => {
  try {
    const apps = await Application.findAll({ 
      where: { userId: req.user.id }, 
      order: [['createdAt', 'DESC']] 
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;