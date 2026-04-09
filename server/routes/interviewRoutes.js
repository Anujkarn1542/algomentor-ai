const express = require("express");
const router = express.Router();

const {
  startInterview,
  continueInterview,
} = require("../controllers/interviewController");

router.post("/start", startInterview);
router.post("/continue", continueInterview);

module.exports = router;
