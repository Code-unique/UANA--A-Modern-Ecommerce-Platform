import cosineSimilarity from 'cosine-similarity';
import {Interaction} from '../models/interactionModel.js'; // Update this to match your model path
import Product from '../models/productModel.js';

// Calculate similarity matrix
const calculateSimilarityMatrix = (interactions) => {
  const matrix = [];
  for (let i = 0; i < interactions.length; i++) {
    for (let j = i + 1; j < interactions.length; j++) {
      if (interactions[i]?.vector && interactions[j]?.vector) {
        const similarity = cosineSimilarity(interactions[i].vector, interactions[j].vector);
        matrix.push({ user1: interactions[i].userId, user2: interactions[j].userId, similarity });
      }
    }
  }
  return matrix;
};

// Find similar users
const findSimilarUsers = (userId, similarityMatrix) => {
  return similarityMatrix
    .filter(entry => entry.user1.toString() === userId.toString() || entry.user2.toString() === userId.toString())
    .map(entry => (entry.user1.toString() === userId.toString() ? entry.user2 : entry.user1));
};

// Fetch all user interactions
const getAllUserInteractions = async () => {
  try {
    // Fetch all user interactions
    return await Interaction.find({})
      .populate({
        path: 'productId',
        select: 'name vector', // Ensure vector is included
      })
      .exec();
  } catch (error) {
    console.error('Error fetching user interactions:', error.message);
    throw new Error('Error fetching user interactions');
  }
};

// Get collaborative recommendations
export const getCollaborativeRecommendations = async (userId) => {
  try {
    // Fetch all user interactions
    const allInteractions = await getAllUserInteractions();

    // Check if interactions are properly populated
    if (!Array.isArray(allInteractions)) {
      console.warn('All interactions are not an array or empty');
      return [];
    }

    // Calculate similarity matrix
    const similarityMatrix = calculateSimilarityMatrix(allInteractions);

    const recommendations = [];
    const userInteractions = allInteractions.find(interaction => interaction.userId && interaction.userId.toString() === userId.toString());

    if (!userInteractions) {
      console.warn(`No interactions found for userId: ${userId}`);
      return recommendations;
    }

    // Find similar users and generate recommendations
    const similarUsers = findSimilarUsers(userId, similarityMatrix);

    for (const similarUserId of similarUsers) {
      const similarUserInteractions = allInteractions.find(i => i.userId && i.userId.toString() === similarUserId.toString());
      
      if (!similarUserInteractions) {
        console.warn(`No interactions found for similarUserId: ${similarUserId}`);
        continue;
      }

      for (const item of similarUserInteractions.products) { // Ensure `products` field is used
        if (!userInteractions.products.some(interaction => interaction.productId && interaction.productId.equals(item.productId))) {
          if (!recommendations.includes(item.productId.toString())) {
            recommendations.push(item.productId.toString());
          }
        }
      }
    }

    return recommendations;
  } catch (error) {
    console.error('Error getting collaborative recommendations:', error.message);
    throw new Error('Error getting collaborative recommendations');
  }
};
