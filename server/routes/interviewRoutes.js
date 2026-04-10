const express = require("express");
const router = express.Router();

const {
  startInterview,
  continueInterview,
  generateInterviewReport,
} = require("../controllers/interviewController");

router.post("/start", startInterview);
router.post("/continue", continueInterview);
router.post("/report", generateInterviewReport);

module.exports = router;
