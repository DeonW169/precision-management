require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const http = require("http");

const connectDB = require("./config/db");
const auth = require("./routes/auth/auth");

const app = express();

// Static folders
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS and Logging
app.use(cors());
app.use(morgan("dev"));

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Body parser
app.use(express.json({ limit: process.env.NODE_BODY_LIMIT || "1mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.NODE_BODY_LIMIT || "1mb",
  })
);
app.use(bodyParser.json());

// MongoDB connection
connectDB();

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes
app.use("/api/v1/auth", auth);
require("./routes")(app);

// Fallback static serving
app.use("/public", express.static("public"));
app.use("/uploads", express.static("uploads"));

// Health check and fallback page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "healthy.html"));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "error.html"));
});

// Start server
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
