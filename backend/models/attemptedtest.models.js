import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AttemptedTestSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Test', // Reference to the Test model
    required: true,
  },
  score: {
    type: Number, // User's score for the test
    default: 0,
  },
  questions: [
    {
      question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
      status: { type: String, enum: ["attempted", "review", "unattempted"], default: "unattempted" },
      userAnswer: { type: String, required: true, default: "" },
      isCorrect: { type: Boolean, default: false }, 
    },
  ],
  attemptedAt: {
    type: Date,
    default: Date.now, 
  },
});


export default model('AttemptedTest', AttemptedTestSchema);