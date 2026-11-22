const jwt = require("jsonwebtoken");

exports.verifyAccessToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = decoded; // { userId, roles }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Role-based access control
exports.requireRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];
        const hasRole = userRoles.some((role) => allowedRoles.includes(role));

        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden: insufficient role" });
        }
        next();
    };
};