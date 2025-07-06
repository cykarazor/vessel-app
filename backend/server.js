// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Voyage = require('./models/Voyage');

// ✅ Import the voyages route (convert to CommonJS style)
const voyageRoutes = require('./routes/voyages');
const authRoutes = require('./routes/auth');

mongoose.connect(process.env.MONGODB_URI, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Auth routes
app.use('/api/auth', authRoutes);

// ✅ Voyage API routes (uses voyage schema correctly)
app.use('/api/voyages', voyageRoutes);

// ✅ Start server
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});
