const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const JWT_SECRET = "mdr_2003";

function generateTokens(user) {
  const accessToken = jwt.sign(
    { userId: user._id, userRole: user.role },
    JWT_SECRET,
    { expiresIn: "15d" }
  );

  return accessToken;
}

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        res.status(400).send("Invalid Credentials.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(422).send("Email already registered");
    }
    if (role.toLowerCase() === "admin") {
        res.status(401).send("Unauthorized!!! Cannot add admin directly.");
    }
    if (role.toLowerCase() !== "buyer" && role.toLowerCase() !== "seller") {
        res.status(422).send(`Invalid role: ${role}.`);
    }

    // Create new user
    const user = new User({
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        },
        accessToken,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid Credentials");
    }

    // Find user and verify password
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid email or password");
    }

    // Generate new tokens
    const accessToken = generateTokens(user);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email
        },
        accessToken,
      },
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
    register, 
    login
}