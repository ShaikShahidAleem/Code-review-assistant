Video Explanation: Present in the root folder
Video Explanation Link: https://drive.google.com/file/d/1o0dYXWShp_Gwo3jtmDbXr62OcLE_u6Ut/view?usp=sharing

# 🤖 AI-Powered Code Review Assistant

An intelligent code review tool that provides instant, AI-powered feedback on your code quality, best practices, security vulnerabilities, and performance optimizations.

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini AI (FREE!) or OpenAI for intelligent code reviews
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- 📊 **Comprehensive Reviews** - Analyzes code quality, security, performance, and best practices
- 📝 **Review History** - Track all your past code reviews
- 🌓 **Dark Mode** - Easy on the eyes with automatic theme switching
- 🚀 **Fast & Free** - Powered by Google Gemini's free tier (15 requests/min)
- 💾 **Local Storage** - All reviews stored locally in SQLite database

## 🎯 Supported Languages

JavaScript • TypeScript • Python • Java • C/C++ • Go • Ruby • PHP • C# • HTML • CSS • JSON

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn**
- **Google Gemini API Key** (FREE - no credit card required!)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-review-assistant.git
   cd code-review-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Get your FREE Gemini API Key**
   - Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # AI Provider Configuration
   AI_PROVIDER=gemini
   
   # Google Gemini API Key (FREE!)
   GEMINI_API_KEY=your_api_key_here
   GEMINI_MODEL=gemini-2.5-flash
   
   # Server Port
   PORT=5001
   ```

5. **Start the application**
   ```bash
   npm run dev:full
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 🎮 Usage

1. **Upload a Code File**
   - Drag and drop a file onto the upload area
   - Or click to browse and select a file

2. **Get Instant Review**
   - AI analyzes your code in seconds
   - Receive detailed feedback on:
     - Code quality and best practices
     - Potential bugs and edge cases
     - Security vulnerabilities
     - Performance optimizations
     - Code style and consistency

3. **View History**
   - Access all past reviews
   - Compare improvements over time

## 🔧 Configuration

### Using Google Gemini (Recommended - FREE)

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

**Free Tier Limits:**
- 15 requests per minute
- 1 million tokens per day
- No credit card required!

### Using OpenAI (Alternative - Paid)

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4
```

## 📁 Project Structure

```
code-review-assistant/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                # Express backend
│   ├── services/          # AI and database services
│   │   ├── gemini.js     # Google Gemini integration
│   │   ├── openai.js     # OpenAI integration
│   │   └── database.js   # SQLite database
│   ├── config.js         # Configuration
│   └── index.js          # Server entry point
├── data/                  # SQLite database storage
├── .env                   # Environment variables
└── package.json          # Root dependencies
```

## 🛠️ Development

### Run Backend Only
```bash
npm run dev
```

### Run Frontend Only
```bash
cd client
npm run dev
```

### Run Both (Recommended)
```bash
npm run dev:full
```

### Build for Production
```bash
cd client
npm run build
```

## 🧪 API Endpoints

### Health Check
```http
GET /api/health
```

### Submit Code Review
```http
POST /api/review
Content-Type: multipart/form-data

file: <code_file>
```

### Get All Reviews
```http
GET /api/reviews
```

### Get Specific Review
```http
GET /api/reviews/:id
```

## 💰 Cost Comparison

| Provider | Model | Cost | Free Tier |
|----------|-------|------|-----------|
| **Google Gemini** | gemini-2.5-flash | **FREE** | ✅ 15 req/min, 1M tokens/day |
| OpenAI | gpt-3.5-turbo | $0.002/1K tokens | ❌ No |
| OpenAI | gpt-4 | $0.03/1K tokens | ❌ No |

## 🎨 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Heroicons** - Icons
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **SQLite** - Database
- **Google Gemini AI** - AI analysis
- **OpenAI** - Alternative AI provider

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for providing free AI API
- [OpenAI](https://openai.com/) for GPT models
- [Heroicons](https://heroicons.com/) for beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for styling

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill all node processes
Get-Process -Name node | Stop-Process -Force

# Or on Linux/Mac
killall node
```

### API Key Not Working
- Verify your API key is correct in `.env`
- Check that you're using the right provider (gemini/openai)
- Restart the server after changing `.env`

### Module Not Found
```bash
# Reinstall dependencies
npm install
cd client && npm install
```

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

## 🔗 Links

- [Documentation](./SETUP.md)
- [Quick Start Guide](./QUICK_START.md)
- [Google AI Studio](https://aistudio.google.com/)
- [Report Bug](https://github.com/yourusername/code-review-assistant/issues)
- [Request Feature](https://github.com/yourusername/code-review-assistant/issues)

---


**Made with ❤️ by Shaik Shahid Aleem**

