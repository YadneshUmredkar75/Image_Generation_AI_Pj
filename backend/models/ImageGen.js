import mongoose from 'mongoose';

const imageGenerationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },
  modelUsed: { type: String, enum: ['StableDiffusion', 'DALL-E', 'MidJourney'], required: true },
  imageUrl: { type: String, required: true },
 
}, { timestamps: true });

export default mongoose.model('GeneratedImage', imageGenerationSchema);