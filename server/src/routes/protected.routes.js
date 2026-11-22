const express = require("express");
const router = express.Router();
const { verifyAccessToken, requireRoles } = require("../middleware/auth.middleware");

// Any logged-in user
router.get("/profile", verifyAccessToken, (req, res) => {
    res.json({ message: "This is your profile", user: req.user });
});

// Only admin
router.get(
    "/admin",
    verifyAccessToken,
    requireRoles("admin"),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);

// Developers & Security Experts
router.get(
    "/dev",
    verifyAccessToken,
    requireRoles("developer", "security_expert"),
    (req, res) => {
        res.json({ message: "Welcome Dev/Security Team" });
    }
);

module.exports = router;