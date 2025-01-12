import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Regex for email validation
      'Please enter a valid email address',
    ],
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendedTests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Test', // Reference to the Test model
    },
  ],
  department: {
    type: String,
    required: true,
    enum: ['CSE', 'IT'], // Example departments
  },
  year: {
    type: String,
    required: true,
    enum: ['FY', 'SY', 'TY', 'BTech'],
  },
  accountStatus: {
    type: String, 
    enum: ['active', 'inactive', 'suspended'],
    default: 'active' 
  },
  profilePicture: {
    type: String,
    default: 'default_profile.png', // Default profile picture URL
  },
  idProof: {
    type: String, // URL for the uploaded ID proof
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export default model('User', UserSchema);
