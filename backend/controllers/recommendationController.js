import asyncHandler from 'express-async-handler';
import { getCollaborativeRecommendations } from '../utils/recommendationUtils.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const getRecommendations = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  // Fetch user interactions
  const user = await User.findById(userId).populate('interactions.product');
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const recommendations = getCollaborativeRecommendations(user.interactions);
  const recommendedProducts = await Product.find({ _id: { $in: recommendations } });

  res.json(recommendedProducts);
});

export { getRecommendations };
