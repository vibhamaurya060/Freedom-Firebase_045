import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Blacklist from "../models/blacklist.js";

import {config} from 'dotenv';
config();

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ msg: "Failed to fetch user." });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      if (!users || users.length === 0) {
        return res.status(404).json({ msg: "No users found." });
      }
  
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ msg: "Failed to fetch users." });
    }
  };
  


const SignUp = async (req, res) => {
  const { username, email, role, password, profilePicture, eventsBooked } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ msg: "User is already registered. Please try to login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      role: role || 'user',
      password: hashedPassword,
      profilePicture,
      eventsBooked: eventsBooked || []
    });

    await newUser.save();
    return res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Failed to register user. Please provide correct details." });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found. Please provide correct credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Please provide correct Password." });
    }

    const token = jwt.sign(
      { email, role: user.role, userID: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, role: user.role ,id: user._id});
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Please provide correct details.",error: error});
  }
};

const forgotPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please try to log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ msg: "Password updated successfully. Please try to login." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Failed to update password. Please try again later." });
  }
};

const logout = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const blacklistToken = new Blacklist({ token });
    await blacklistToken.save();
    return res.status(201).json({ msg: "User logged out successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: error.message });
  }
};

export { SignUp, logIn, getAllUsers, getUserById, forgotPassword, logout };