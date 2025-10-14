# Setup Instructions

## 🎉 NEW: Google Gemini Support (FREE!)

This application now supports **Google Gemini API** which has a **FREE tier**! No credit card required.

### 🚀 Quick Start with Gemini (Recommended - FREE!)

1. **Get a FREE Gemini API Key**:
   - Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key (starts with `AIza...`)

2. **Add the API Key to `.env`**:
   - Open the `.env` file in the root directory
   - Add your Gemini API key:
   ```env
   AI_PROVIDER=gemini
   GEMINI_API_KEY=AIzaSyD...your-actual-key
   GEMINI_MODEL=gemini-1.5-flash
   PORT=5001
   ```

3. **Install Dependencies & Start**:
   ```bash
   npm install
   npm run dev:full
   ```

**See [GEMINI_SETUP.md](GEMINI_SETUP.md) for detailed Gemini setup instructions.**

---

## Alternative: OpenAI (Paid)

If you prefer OpenAI instead:

1. **Get an OpenAI API Key**:
   - Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Sign in or create an account
   - Click "Create new secret key"
   - Copy the key (you won't be able to see it again!)

2. **Add the API Key to `.env`**:
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4
   PORT=5001
   ```

3. **Restart the Server**:
   ```bash
   npm run dev:full
   ```

## ✅ Database Schema Fixed

I've updated the database schema to match what the frontend expects:
- Added `filename` field
- Added `filetype` field
- Renamed `code` to `original_code`
- Renamed `feedback` to `review_report`

**Note**: If you have existing data in the database, you may need to delete the `data/code_reviews.db` file to recreate it with the new schema.

## 🔧 What Was Fixed

1. **Database Schema**: Updated to include filename and filetype
2. **API Endpoint**: Now properly saves filename and file extension
3. **Error Handling**: Better error messages for missing API key

## 💰 OpenAI API Costs

- **GPT-4**: ~$0.03 per 1K tokens (more expensive, better quality)
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (cheaper, faster)

To use GPT-3.5-turbo instead of GPT-4, edit `server/config.js`:
```javascript
openai: {
  apiKey: process.env.OPENAI_API_KEY || '',
  model: 'gpt-3.5-turbo', // Changed from 'gpt-4'
},
```

## 🧪 Testing Without OpenAI (Optional)

If you want to test the UI without spending money on OpenAI, you can temporarily modify `server/services/openai.js` to return mock data:

```javascript
export async function analyzeCode(code, fileType) {
  // Mock response for testing
  return `# Code Review for ${fileType} file

## Summary
This is a mock review for testing purposes.

## Issues Found
1. **Example Issue**: This is just test data
2. **Another Issue**: Replace with real OpenAI API key

## Recommendations
- Add your OpenAI API key to use real code analysis
`;
}
```

## 📝 Next Steps

1. Add your OpenAI API key to `.env`
2. Restart the server
