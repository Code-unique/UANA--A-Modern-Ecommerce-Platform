// interactionModel.js
import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  vector: [Number],
  actionType: String,
});

const Interaction = mongoose.model('Interaction', interactionSchema);

export { Interaction }; // Named export
