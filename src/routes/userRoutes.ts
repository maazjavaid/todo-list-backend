import express from "express";
const router = express.Router();

import { registerUser, loginUser } from "controllers/userController";

router.route("/").post(registerUser);
router.route("/login").post(loginUser);

export default router;
