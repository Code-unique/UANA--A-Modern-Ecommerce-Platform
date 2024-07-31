// backend/routes/interactionRoutes.js
import express from 'express';
import { saveInteraction } from '../controllers/interactionController.js';

const router = express.Router();

router.post('/interaction', saveInteraction);

export default router;
