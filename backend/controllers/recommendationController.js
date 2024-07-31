import { getCollaborativeRecommendations } from '../utils/recommendationLogic.js';

export const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    const recommendations = await getCollaborativeRecommendations(userId);
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
};
