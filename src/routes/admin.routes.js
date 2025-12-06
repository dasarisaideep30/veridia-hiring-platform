// server/src/routes/admin.routes.js
const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const { Application, User } = require('../models');
const { sendMail } = require('../utils/mailer');
const router = express.Router();

// GET /api/admin/applications (Admin Only)
router.get('/applications', authenticate, requireRole('admin'), async (req, res) => {
  const { status } = req.query;
  const where = {};
  if (status) where.status = status;
  try {
    const apps = await Application.findAll({
      where,
      // Includes candidate details from the User table
      include: [{ model: User, as: 'candidate', attributes: ['id', 'name', 'email'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/applications/:id/status (Admin Only)
router.post('/applications/:id/status', authenticate, requireRole('admin'), async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    
    const app = await Application.findByPk(id, { include: [{ model: User, as: 'candidate' }] });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    
    app.status = status;
    await app.save();

    // Notify candidate of status change
    const previewUrl = await sendMail({
      to: app.candidate.email,
      subject: `Application Status Update: ${status}`,
      text: `Hello ${app.candidate.name}, your application for ${app.position} has been updated to: ${status}.`
    });

    res.json({ application: app, emailPreviewUrl: previewUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;