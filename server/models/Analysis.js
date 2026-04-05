const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  language: { type: String, default: 'javascript' },
  topic: { type: String, default: 'General' },
  timeComplexity: String,
  spaceComplexity: String,
  complexityExplanation: String,
  pattern: [String],
  patternExplanation: String,
  issues: [String],
  hints: [String],
  optimizedApproach: String,
  optimizedCode: String,
  score: Number,
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);