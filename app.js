// app.js
require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const http = require('http');
const authRoutes = require('./app/routes/userRoutes');
const motivationRoutes = require('./app/routes/motivationRoutes ');
const workRoutes = require('./app/routes/workRoutes');
const userReminderRoutes = require('./app/routes/userReminderRoutes');
const reminderRoutes = require('./app/routes/reminderRoutes');
const socketConfig = require("./utils/socketApp.js");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection setup
connectDB();

// Create an HTTP server using your Express app
const server = http.createServer(app);
// Configure Socket.io
const io = socketConfig(server);
// console.log(io,"io")

app.use((req, res, next) => {
  req.io = io; // Attach the io object to the request object
  next(); // Move on to the next middleware
});

// Routes
app.use('/auth', authRoutes); // User authentication routes
app.use('/api/motivation', motivationRoutes);
app.use('/api/userReminder', userReminderRoutes);
app.use('/api/reminder', reminderRoutes);
app.use('/api/work', workRoutes);
// Start the server

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




