const dotenvConfig = require('./config/env');
dotenvConfig(); // Call the function to load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/database');
const socketConfig = require('./utils/socketApp.js');

const authRoutes = require('./app/routes/userRoutes');
const motivationRoutes = require('./app/routes/motivationRoutes');
const workRoutes = require('./app/routes/workRoutes');
const userReminderRoutes = require('./app/routes/userReminderRoutes');
const reminderRoutes = require('./app/routes/reminderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection setup
connectDB();

// Create an HTTP server using your Express app
const server = http.createServer(app);

// Configure Socket.io
const io = socketConfig(server);

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
