import axios from 'axios';

const huggingFaceClient = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
  headers: {
    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    Accept: 'application/json',
  },
  // Note: responseType can be overridden per request if needed
});

export default huggingFaceClient;
