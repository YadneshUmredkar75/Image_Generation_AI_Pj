import express from 'express';
import huggingFaceClient from '../utils/huggingFaceClient.js';
import GeneratedImage from '../models/ImageGen.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt, user, modelUsed = 'StableDiffusion' } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Call Hugging Face API to generate image
    const response = await huggingFaceClient.post(
      '',
      { inputs: prompt },
      { responseType: 'arraybuffer' } // ensure binary data received
    );

    // Convert binary data to base64 string
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const imageUrl = `data:image/png;base64,${base64Image}`;

    // Save generated image to database (optional)
    const newImage = await GeneratedImage.create({
      user,
      prompt,
      modelUsed,
      imageUrl,
    });

    res.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

export default router;
