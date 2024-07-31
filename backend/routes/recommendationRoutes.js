import express from 'express';
import { getRecommendations } from '../controllers/recommendationController.js'; // Adjust path if necessary

const router = express.Router();

router.get('/:userId', getRecommendations);

export default router;
