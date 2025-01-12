import express from 'express';
import { createTest, getAllTests, getTestById, updateTest, deleteTest, addUserToTest, submitScore } from '../controllers/test.controllers.js';
import isUserSignin from '../middlewares/user.middlewares.js';

const router = express.Router();

// Routes for tests
router.post('/', createTest); // Create a new test
router.get('/', getAllTests); // Get all tests
router.get('/:id', getTestById); // Get a specific test by ID
router.put('/:id', updateTest); // Update a test
router.delete('/:id', deleteTest); // Delete a test

// Additional routes for test participants and scores
router.post('/:id/attend', isUserSignin, addUserToTest); // Add user to attended list
router.post('/:id/submit-score', submitScore); // Submit user's score

export default router;
