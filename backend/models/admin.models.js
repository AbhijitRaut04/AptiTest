import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  profilePicture: {
    type: String,
    default: 'default_profile.png',
  },
  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Test',
    },
  ],
  department: {
    type: String,
    required: true,
    enum: ['CSE', 'IT', 'EXTC'],
    default: 'IT',
  },
}, {
  timestamps: true,
});

export default model('Admin', AdminSchema);
