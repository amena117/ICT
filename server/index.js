require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database Connection
// Fallback to local if no URI provided. 
// In a real scenario, this would be strictly env var.
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://amenbefekadu2009_db_user:B3DioogbDrFlcCkq@cluster0.oiijgpm.mongodb.net/?appName=Cluster0';
//B3DioogbDrFlcCkq   amenbefekadu2009_db_user
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('ICT Office API Server is Running. Secure. Compliant.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
