import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config.js';

let genAI = null;
let model = null;

function initializeGemini() {
  if (!config.gemini.apiKey || config.gemini.apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error('Gemini API key is not configured. Please add your API key to the .env file. See SETUP.md for instructions.');
  }
  
  if (!genAI) {
    genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    model = genAI.getGenerativeModel({ model: config.gemini.model });
  }
}

export async function analyzeCode(code, fileType) {
  initializeGemini();

  try {
    const prompt = `You are an expert code reviewer. Analyze the following ${fileType} code for:
1. Code quality and best practices
2. Potential bugs and edge cases
3. Security vulnerabilities
4. Performance optimizations
5. Code style and consistency
6. Documentation and comments

Provide specific, actionable feedback in a structured markdown format with code examples for improvements.

Code to review:
\`\`\`${fileType}
${code}
\`\`\`

Please provide a comprehensive code review with clear sections and actionable recommendations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing code with Gemini:', error);
    throw new Error(`Failed to analyze code with Gemini: ${error.message}`);
  }
}
