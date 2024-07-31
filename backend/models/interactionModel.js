// models/interactionModel.js

import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: Number, // or other relevant fields
  vector: [Number], // For similarity calculation
});

export const Interaction = mongoose.model('Interaction', interactionSchema);
