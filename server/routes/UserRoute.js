import express from "express";
import { login, logout, register } from "../controllers/UserController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";

const UserRoute = express.Router();

UserRoute.post("/register", register);
UserRoute.post("/login", login);
UserRoute.post("/logout", logout);
UserRoute.get("/verify-logged-token", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default UserRoute;
