require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Handle errors and send a response with status and message
const handleResponse = (res, status, message) => {
  res.status(status).json({ error: message });
};

// Registration logic
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    handleResponse(res, 400, error.message);
  }
};

// Login logic
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      handleResponse(res, 401, 'Authentication failed');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      handleResponse(res, 401, 'Authentication failed');
      return;
    }

    // Generate and send a JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    // Remove the password from the user object in the response
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    // Create an object with both the user and token properties
    const responseObj = { user: userWithoutPassword, token };

    res.json(responseObj);
  } catch (error) {
    handleResponse(res, 500, 'Internal Server Error');
  }
};



