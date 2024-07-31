import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  video: { type: String },
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
