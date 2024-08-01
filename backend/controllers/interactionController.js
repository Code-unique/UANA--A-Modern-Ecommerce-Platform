
import { Interaction } from '../models/interactionModel.js';

export const saveInteraction = async (req, res) => {
  try {
    const { userId, productId, rating, vector } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const interaction = new Interaction({ userId, productId, rating, vector });
    await interaction.save();
    res.status(200).json({ message: 'Interaction saved successfully' });
  } catch (error) {
    console.error('Error saving interaction:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
