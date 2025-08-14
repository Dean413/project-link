//route set up

const express = require("express")
const app = express();

const authRoutes = require ("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoute");
const projectRoutes = require("./routes/projectRoute");
const errorHandler = require("./middleware/errorHandler"); 
const cors = require("cors")


app.use(cors({ origin: 'https://project-link-one.vercel.app' }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorHandler);

module.exports = app;

