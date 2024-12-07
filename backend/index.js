// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();





const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const otpSender = require('./controllers/otpSender');
const auth = require('./controllers/auth');

// Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
// Middleware
app.use(cors());
app.use(express.json());

// Mongoose setup
mongoose
    .connect('mongodb://localhost:27017/auction_management_system')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

    // Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', async (req, res) => {res.send('Server connected.');})
    app.post('/register', auth.register);

    app.post('/login', auth.login);

    // Route to generate and store OTP
app.post('/generate-otp', otpSender.generateOtp);

// Route to verify OTP
app.post('/verify-otp', otpSender.verifyOtp);


