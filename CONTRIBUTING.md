# Contributing to Code Review Assistant

First off, thank you for considering contributing to Code Review Assistant! 🎉

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why is this enhancement useful?
- **Proposed solution** if you have one
- **Alternative solutions** you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the code style** - we use ESLint and Prettier
3. **Write clear commit messages**
4. **Update documentation** if needed
5. **Test your changes** thoroughly
6. **Submit a pull request**

## 🏗️ Development Setup

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/code-review-assistant.git
   cd code-review-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your API keys to .env
   ```

4. **Start development servers**
   ```bash
   npm run dev:full
   ```

## 📝 Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Use **Prettier** for formatting
- Write **meaningful variable names**
- Add **comments** for complex logic
- Keep functions **small and focused**

## 🧪 Testing

Before submitting a PR:

- Test the upload functionality
- Test with different file types
- Test in both light and dark mode
- Test on different screen sizes
- Check for console errors

## 📦 Project Structure

```
code-review-assistant/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
├── server/           # Express backend
│   ├── services/
│   └── index.js
└── package.json
```

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- 🎨 **UI/UX improvements**
- 🌍 **Internationalization (i18n)**
- 🧪 **Testing** - unit tests, integration tests
- 📱 **Mobile responsiveness**
- 🔧 **New features** - see issues labeled "enhancement"
- 📚 **Documentation** improvements
- 🐛 **Bug fixes**

## 💬 Communication

- Use GitHub issues for bug reports and feature requests
- Be respectful and constructive
- Help others when you can

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on what's best for the community
- Show empathy towards others

## ✅ Checklist Before Submitting PR

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No new warnings generated
- [ ] Tested locally and works as expected
- [ ] Commit messages are clear and descriptive

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🙏
