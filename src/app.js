// server/src/app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const appRoutes = require('./routes/application.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Mount routes under the /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ message: 'Veridia Hiring API is operational' }));

module.exports = app;