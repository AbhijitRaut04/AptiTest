import express from 'express';
import {
  createQuestion,
//   getAllQuestions,
//   getQuestionById,
  updateQuestion,
  deleteQuestion,
} from '../controllers/question.controllers.js';

const router = express.Router();

// Route to create a new question
router.post('/', createQuestion);

// Route to get all questions
// router.get('/', getAllQuestions);

// Route to get a question by ID
// router.get('/:id', getQuestionById);

// Route to update a question
router.put('/:id', updateQuestion);

// Route to delete a question
router.delete('/:id', deleteQuestion);

export default router;
