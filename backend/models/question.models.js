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
      type: String, 
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
      required: true, 
    },
  ],
  correctAnswer: {
    type: String,
    required: true, 
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
