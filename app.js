const dotenvConfig = require("./config/env");
dotenvConfig(); // Call the function to load environment variables
const { Server } = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/database");
const configureSocket = require("./utils/socketApp.js");

const authRoutes = require("./app/routes/userRoutes");
const motivationRoutes = require("./app/routes/motivationRoutes");
const workRoutes = require("./app/routes/workRoutes");
const userReminderRoutes = require("./app/routes/userReminderRoutes");
const reminderRoutes = require("./app/routes/reminderRoutes");

const app = express();

// Create an HTTP server using your Express app
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let socketInstance;

// Configure Socket.io
configureSocket(io, (skt)=>{
  socketInstance = skt
});
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

// Database connection setup
connectDB();
app.use((req, res, next) => {
  req.io = socketInstance; // Attach the io object to the request object
  next(); // Move on to the next middleware
});
// Routes
app.use("/auth", authRoutes); // User authentication routes
app.use("/api/motivation", motivationRoutes);
app.use("/api/userReminder", userReminderRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/work", workRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});