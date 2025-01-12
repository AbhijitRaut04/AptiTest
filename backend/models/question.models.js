import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String, // URLs for images related to the question
    },
  ],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  options: [
    {
      type: String,
      required: true, // Each option is a string
    },
  ],
  correctAnswer: {
    type: String,
    required: true, // The correct answer matches one of the options
  },
  points: {
    type: Number,
    required: true, // Points awarded for the correct answer
    default: 1, // Default point value
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export default model('Question', QuestionSchema);
