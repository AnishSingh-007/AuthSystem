const crypto = require("crypto");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const { sendEmail } = require("../utils/email");

// Helper: set cookies
const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// ✅ REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, roles } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create email verification token
        const emailToken = crypto.randomBytes(32).toString("hex");
        const emailTokenHash = crypto
            .createHash("sha256")
            .update(emailToken)
            .digest("hex");

        const user = await User.create({
            name,
            email,
            password,
            roles: roles && roles.length ? roles : ["student"],
            emailVerificationToken: emailTokenHash,
            emailVerificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24h
        });

        console.log("user", user);

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`;

        console.log("verifyUrl", verifyUrl);

        await sendEmail({
            to: user.email,
            subject: "Verify your email",
            html: `Click here to verify: ${verifyUrl}`,
        });

        res.status(201).json({
            message: "Registered successfully. Please verify your email.",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed" });
    }
};

// ✅ LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(423).json({
                message: "Account locked. Try again later.",
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            user.failedLoginAttempts += 1;

            // Lock after 5 attempts
            if (user.failedLoginAttempts >= 5) {
                user.lockUntil = Date.now() + 30 * 60 * 1000; // 30 minutes
            }

            await user.save();
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Reset failed attempts
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        if (!user.isEmailVerified) {
            return res.status(403).json({ message: "Please verify your email first" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshTokenValue = generateRefreshToken();

        // Save refresh token in DB
        await RefreshToken.create({
            user: user._id,
            token: refreshTokenValue,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        // Set cookies
        setAuthCookies(res, accessToken, refreshTokenValue);

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                roles: user.roles,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
};


// ✅ VERIFY EMAIL-
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            emailVerificationToken: tokenHash,
            emailVerificationTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationTokenExpires = undefined;

        await user.save();

        res.json({ message: "Email verified successfully. You can now login." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Email verification failed" });
    }
};

// ✅ FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal user existence
            return res.json({ message: "If account exists, reset link sent" });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.passwordResetToken = resetTokenHash;
        user.passwordResetTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour

        await user.save();

        const resetUrl = `${process.env.SERVER_URL}/api/auth/reset-password?token=${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: "Reset your password",
            html: `Click here to reset your password: ${resetUrl}`,
        });

        res.json({ message: "If account exists, reset link sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Forgot password failed" });
    }
};

// ✅ RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { newPassword } = req.body;

        console.log("token", token);
        console.log("newPassword", newPassword);

        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

        const user = await User.findOne({
            passwordResetToken: tokenHash,
            passwordResetTokenExpires: { $gt: Date.now() },
        }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;

        await user.save(); // password will be re-hashed by pre-save hook

        res.json({ message: "Password reset successful. You can now login." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Reset password failed" });
    }
};

// ✅ REFRESH TOKEN
exports.refreshToken = async (req, res) => {
    try {
        const oldToken = req.cookies.refreshToken;
        if (!oldToken) {
            return res.status(401).json({ message: "No refresh token" });
        }

        const storedToken = await RefreshToken.findOne({ token: oldToken });

        if (!storedToken || storedToken.revoked || storedToken.expiresAt < Date.now()) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Token rotation: revoke old token
        storedToken.revoked = true;
        await storedToken.save();

        const user = await User.findById(storedToken.user);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshTokenValue = generateRefreshToken();

        await RefreshToken.create({
            user: user._id,
            token: newRefreshTokenValue,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        // Set cookies
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 15 * 60 * 1000,
        });

        res.cookie("refreshToken", newRefreshTokenValue, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Token refreshed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Refresh failed" });
    }
};

// ✅ LOGOUT
exports.logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await RefreshToken.findOneAndUpdate(
                { token: refreshToken },
                { revoked: true }
            );
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.json({ message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Logout failed" });
    }
};