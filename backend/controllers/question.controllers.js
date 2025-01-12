import Question from '../models/question.model.js';

// Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { description, images, difficulty, options, correctAnswer, points } = req.body;
    const question = new Question({
      description,
      images,
      difficulty,
      options,
      correctAnswer,
      points,
    });

    const savedQuestion = await question.save();
    res.status(201).json({ message: 'Question created successfully', question: savedQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

// Get all questions
// export const getAllQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching questions', error: error.message });
//   }
// };

// // Get a question by ID
// export const getQuestionById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const question = await Question.findById(id);
//     if (!question) return res.status(404).json({ message: 'Question not found' });

//     res.status(200).json(question);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching question', error: error.message });
//   }
// };

// Update a question
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
};

// Delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};
