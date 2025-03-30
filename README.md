# AdBlock Tester 🛡️

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://addtester.pages.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-orange.svg)](https://pages.cloudflare.com/)

A comprehensive, modern tool for testing the effectiveness of your ad blocker against various ad networks, trackers, and analytics services.

![AdBlock Tester](https://via.placeholder.com/800x400?text=AdBlock+Tester+Screenshot)

## ✨ Features

- **Comprehensive Testing** - Evaluates ad blocker effectiveness against a wide range of advertising, tracking, and analytics domains
- **Detailed Reports** - Provides percentage scores and breakdown of blocked elements
- **Modern UI/UX** - Clean, responsive interface with light and dark mode support
- **Secure Access** - Password protection for controlled usage
- **Customization** - Configure test domains and settings to match your needs

## 🚀 Live Demo

Test your ad blocker now: [addtester.pages.dev](https://addtester.pages.dev)

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Templating:** EJS (Embedded JavaScript)
- **Styling:** SASS/SCSS
- **Build System:** Webpack
- **Deployment:** Cloudflare Pages

## 🏁 Getting Started

### Prerequisites

- Node.js 14+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/ArashSr/addtester.git
cd addtester

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🧪 How It Works

1. **Authentication Flow**
   - Secure password protection with localStorage persistence
   - Session management for continued access

2. **Testing Methodology**
   - Attempts to load resources from known ad servers, trackers, and analytics
   - Measures which resources were successfully blocked
   - Calculates effectiveness percentages by category

3. **Result Analysis**
   - Overall effectiveness score
   - Detailed breakdown by category (ads, trackers, analytics)
   - List of blocked vs. unblocked domains

## ⚙️ Customization

```javascript
// Change authentication password
const correctPassword = 'your-secure-password';

// Modify test domains
const adDomains = ['example-ad.com', 'ads.example.net', ...];
const trackerDomains = ['tracker.example.com', ...];
```

## 📦 Deployment

### Cloudflare Pages (Recommended)

```bash
# Build the project
npm run build

# Deploy using custom Cloudflare build script
npm run cloudflare-build
```

### Other Static Hosting

Deploy the `dist` folder to any static hosting service like Netlify, Vercel, or GitHub Pages.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Original concept inspired by various ad blocker testing tools
- Icon libraries and open-source components used in the UI
