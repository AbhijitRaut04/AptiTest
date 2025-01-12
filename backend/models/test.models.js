import mongoose from 'mongoose';
import Question from './question.models.js';

const { Schema, model } = mongoose;

const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: String,
    required: true, 
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'upcoming', 'started'],
    default: 'upcoming',
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: Question, // Reference to the Question model
    },
  ],
  attendedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],
  rankings: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' }, // User reference
      score: { type: Number, required: true }
    },
  ],
  isPublic: {
    type: Boolean,
    default: false, // Public for all admins if true
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export default model('Test', TestSchema);
