# AdBlock Tester

A modern, comprehensive tool for testing the effectiveness of your ad blocker against various ad networks, trackers, and analytics services.

## Features

- **Comprehensive Testing**: Checks ad blocker effectiveness against a wide range of advertising, tracking, and analytics domains
- **Detailed Results**: Provides percentage scores for blocked ad servers, trackers, and analytics services
- **Modern UI**: Clean, responsive interface with both light and dark mode support
- **Password Protection**: Secure access with password authentication
- **Customizable Settings**: Configure which domains to test against

## Live Demo

Visit the [live demo](https://addtester.pages.dev) to test your ad blocker. (pass ST2x@9pL7qRz#3D)

## Technology Stack

- HTML5, CSS3, JavaScript (ES6+)
- EJS (Embedded JavaScript) for templating
- SASS for styling
- LocalStorage for authentication persistence

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- A modern web browser

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/ArashSr/addtester.git
   cd addtester
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## How It Works

1. **Authentication**: 
   - The app requires a password to access the testing tools (a strong password with mixed characters)
   - Authentication status is stored in localStorage for persistent sessions

2. **Testing Process**:
   - The tool attempts to load resources from known ad servers, trackers, and analytics providers
   - It then measures which resources were blocked by your ad blocker
   - Results are calculated as percentages of blocked domains in each category

3. **Results Analysis**:
   - A comprehensive score shows your ad blocker's overall effectiveness
   - Detailed breakdowns show which specific domains were blocked or allowed

## Customization

You can customize various aspects of the AdBlock Tester:

- **Password**: Change the `correctPassword` variable in the authentication scripts
- **Test Domains**: Modify the domain lists in the adblock-test.js file
- **Styling**: The app supports light/dark mode toggling and uses CSS variables for theming

## Deployment

This project is designed to be easily deployed to any static hosting service:

1. Build the project:
   ```
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting service (Cloudflare Pages, Netlify, etc.)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Original concept inspired by various ad blocker testing tools
- SVG icons from various open-source icon libraries
