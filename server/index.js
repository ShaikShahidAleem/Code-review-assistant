import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import { initDatabase, saveReview, getReview, getAllReviews } from './services/database.js';
import config from './config.js';

// Dynamically import the AI service based on configuration
let analyzeCode;
if (config.aiProvider === 'gemini') {
  const geminiModule = await import('./services/gemini.js');
  analyzeCode = geminiModule.analyzeCode;
  console.log('🤖 Using Google Gemini AI for code analysis');
} else {
  const openaiModule = await import('./services/openai.js');
  analyzeCode = openaiModule.analyzeCode;
  console.log('🤖 Using OpenAI for code analysis');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: config.fileUpload?.maxFileSize || 10 * 1024 * 1024 }, // Default 10MB
  abortOnLimit: true,
}));

// Handle Chrome DevTools requests gracefully
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.post('/api/review', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    const filename = file.name;
    const fileExt = path.extname(filename).toLowerCase().substring(1);
    
    if (config.fileUpload?.allowedFileTypes && !config.fileUpload.allowedFileTypes.includes(`.${fileExt}`)) {
      return res.status(400).json({ 
        error: `Unsupported file type. Allowed types: ${config.fileUpload.allowedFileTypes.join(', ')}` 
      });
    }

    const code = file.data.toString('utf8');
    const feedback = await analyzeCode(code, fileExt);
    
    const reviewId = await saveReview({
      filename,
      filetype: fileExt,
      original_code: code,
      review_report: feedback
    });

    res.json({
      id: reviewId,
      message: 'Code review completed successfully',
      feedback
    });
  } catch (error) {
    console.error('Error processing review:', error);
    res.status(500).json({ 
      error: 'Failed to process code review', 
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      error: 'Failed to fetch reviews',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/reviews/:id', async (req, res) => {
  try {
    const review = await getReview(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ 
      error: 'Failed to fetch review',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message, stack: err.stack })
  });
});

// Start the server
const startServer = async () => {
  try {
    await initDatabase();
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, '0.0.0.0', () => {
      const address = server.address();
      console.log(`Server running on http://localhost:${address.port}`);
      console.log('Press Ctrl+C to stop the server');
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
