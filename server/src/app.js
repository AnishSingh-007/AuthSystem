const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes")

const app = express();

// Security headers
app.use(helmet());

// Logging
app.use(morgan("dev"));

// Body parser
app.use(express.json());

// Cookies
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

module.exports = app;