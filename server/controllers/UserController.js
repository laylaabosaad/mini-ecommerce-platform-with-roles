import dotenv from "dotenv";
import UserModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export async function register(req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email address already in use" });
    }
    if (!req.body || !req.body.name || !req.body.password || !req.body.email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel.create({
      name: req.body.name,
      password: hash,
      email: req.body.email,
      role: "user",
    });
    res.status(201).json({
      message: "User successfully created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "User not successfully created. Please try again later",
      details: error.message,
    });
  }
}

export async function tokenCreation(res, id, name, email, role) {
  try {
    const maxAge = 3 * 60 * 60 * 1000;
    const token = jwt.sign({ id, name, email, role }, jwtSecret, {
      expiresIn: maxAge / 1000,
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: maxAge,
    });
    return token;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error creating token",
      details: error.message,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User doesn't exist. Kindly create an account" });
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      return res.status(400).json({ error: "Password isn't correct" });
    }
    const token = await tokenCreation(
      res,
      user._id,
      user.name,
      user.email,
      user.role
    );
    return res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "User not logged in. Please try again later",
      details: error.message,
    });
  }
}

export async function logout(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "Strict",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successful" });
}


