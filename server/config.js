import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 5000,
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4', // or 'gpt-3.5-turbo' for faster/cheaper analysis
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
