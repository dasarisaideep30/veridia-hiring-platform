// server/src/index.js
require('dotenv').config();
const app = require('./app');
const { sequelize, User } = require('./models');
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    // 1. Connect to PostgreSQL
    await sequelize.authenticate();
    
    // 2. Sync models (creates tables)
    await sequelize.sync({ alter: true }); 
    console.log('Database synced');

    // 3. Create default admin if not exists (Admin credentials: admin@veridia.com / admin123)
    const adminEmail = 'admin@veridia.com';
    const admin = await User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash('admin123', 10);
      await User.create({ name: 'Admin', email: adminEmail, password_hash: hash, role: 'admin' });
      console.log(`Admin user created: ${adminEmail} / admin123`);
    }

    // 4. Start server
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}
bootstrap();