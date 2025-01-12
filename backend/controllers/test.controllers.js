import Test from '../models/test.models.js';

// Create a new test
export const createTest = async (req, res) => {
  try {
    const { title, description, duration, isActive, questions, isPublic } = req.body;
    const newTest = new Test({
      title,
      description,
      duration,
      isActive,
      questions,
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
    const tests = await Test.find().populate('questions').populate('attendedUsers').populate('rankings.user');
    res.status(200).json(tests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single test by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions').populate('attendedUsers').populate('rankings.user');
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a test
export const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    test.attendedUsers.push(req.body.userId);
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
