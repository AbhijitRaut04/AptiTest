import Test from '../models/test.models.js';

// Create a new test
export const createTest = async (req, res) => {
  try {
    const { title, description, duration, scheduledAt, isPublic } = req.body;
    const newTest = new Test({
      title,
      description,
      duration,
      scheduledAt,
      isPublic,
    });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('questions')
      .populate({
        path: 'attendedUsers',
        select: '-password -attendedTests'
      })
      .populate({
        path: 'rankings.user',
        select: '-password -attendedTests',
      });
    res.status(200).json(tests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single test by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate('questions')
      .populate({
        path: 'attendedUsers',
        select: '-password -attendedTests'
      })
      .populate({
        path: 'rankings.user',
        select: '-password -attendedTests',
      });
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a test
export const updateTest = async (req, res) => {
  try {
    const { title, description, duration, scheduledAt, isPublic } = req.body;
    const test = await Test.findByIdAndUpdate(req.params.id,
      { title, description, duration, scheduledAt, isPublic },
      { new: true });
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a test
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a user to the attendedUsers list
export const addUserToTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    // Add user to attendedUsers array
    test.attendedUsers.push(req.body.user._id);
    await test.save();
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Submit a user's score for the test
export const submitScore = async (req, res) => {
  try {
    const { userId, score } = req.body;
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    // Add score to rankings
    test.rankings.push({ user: userId, score });
    await test.save();
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
