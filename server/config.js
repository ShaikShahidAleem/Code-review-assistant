import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  
  // AI Provider: 'openai' or 'gemini'
  aiProvider: process.env.AI_PROVIDER || 'gemini',
  
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4', // or 'gpt-3.5-turbo' for faster/cheaper analysis
  },
  
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-pro', // Free tier model
  },
  
  fileUpload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: [
      '.js', '.jsx', '.ts', '.tsx', 
      '.py', '.java', '.c', '.cpp', 
      '.go', '.rb', '.php', '.cs',
      '.html', '.css', '.scss', '.json'
    ]
  }
};
