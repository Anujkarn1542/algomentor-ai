const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://algomentor-ai-pearl.vercel.app",
      /\.vercel\.app$/,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analysis", analysisRoutes);

// Routes (we'll add these soon)
app.get("/", (req, res) => res.json({ message: "AlgoMentor API running" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`),
    );
  })
  .catch((err) => console.error(err));
