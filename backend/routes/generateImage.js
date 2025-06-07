import express from 'express';
import { HfInference } from '@huggingface/inference';
import { v2 as cloudinary } from 'cloudinary';
import Image from '../models/Image.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const hf = new HfInference(process.env.HF_API_TOKEN);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate image
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate image using Hugging Face API
    const response = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
      parameters: {
        negative_prompt: 'blurry, low quality',
        num_inference_steps: 50,
      },
    });

    // Convert image buffer to base64
    const buffer = Buffer.from(await response.arrayBuffer());
    const base64Image = `data:image/png;base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'ai-images',
    });

    // Save to MongoDB
    const newImage = new Image({
      prompt,
      imageUrl: cloudinaryResult.secure_url,
    });
    await newImage.save();

    res.json({ imageUrl: cloudinaryResult.secure_url, prompt });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

export default router;