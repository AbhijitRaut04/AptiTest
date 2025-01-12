import mongoose from 'mongoose';

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
    type: Number,
    required: true, // Duration in minutes
  },
  isActive: {
    type: Boolean,
    default: true, // Determines if the test is currently active
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question', // Reference to the Question model
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
