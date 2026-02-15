require('dotenv').config();

const parsedPort = Number.parseInt(process.env.PORT || '', 10);

const config = {
  port: Number.isInteger(parsedPort) ? parsedPort : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || '',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-only-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

module.exports = config;
