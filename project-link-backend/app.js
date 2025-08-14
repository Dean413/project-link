//route set up

const express = require("express")
const app = express();

const authRoutes = require ("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoute");
const projectRoutes = require("./routes/projectRoute");
const errorHandler = require("./middleware/errorHandler"); 
const cors = require("cors")

const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://project-link-one.vercel.app" // production frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

module.exports = app;

