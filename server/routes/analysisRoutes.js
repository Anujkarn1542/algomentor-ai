const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { analyze, getHistory ,generateRoadmap} = require("../controllers/analysisController");

router.post("/analyze", protect, analyze);
router.get("/history", protect, getHistory);
router.post("/roadmap", protect, generateRoadmap);

module.exports = router;
