const express = require("express");
const router = express.Router();
const { register, login, verifyEmail, forgotPassword, resetPassword, refreshToken, logout } = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

module.exports = router;