import OpenAI from 'openai';
import config from '../config.js';

const openai = new OpenAI({
  apiKey: config.openai.apiKey
});

export async function analyzeCode(code, fileType) {
  // Check if API key is configured
  if (!config.openai.apiKey || config.openai.apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error('OpenAI API key is not configured. Please add your API key to the .env file. See SETUP.md for instructions.');
  }

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
\`\`\``;

    const response = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant that provides detailed code reviews with specific, actionable feedback.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing code with OpenAI:', error);
    throw new Error('Failed to analyze code with OpenAI');
  }
}
