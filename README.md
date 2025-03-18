# ⚠️ Project Archived

This project is no longer maintained and has been archived.
Thank you for your support and for being part of this journey. ❤️

# Toolz

<p align="center">
 <img src="src/assets/toolz/icon.svg" alt="Toolz"
	title="b2ntp" width="160" height="160" />
</p>
A set of testing and verification tools, with simple and beautiful design

## Ad Block Test  [Link](https://d3ward.github.io/toolz/adblock)
This tool allows you to check if your adblock solution is blocking enough hosts. With a simple UI and easy UX you can check how much you have blocked. The tool tries to connect to the most common domains for different categories (ads, analytics, bug tracking, social trackers, mix and OEMs).

If you don't block all the hosts but you want to , you can use
- My hosts txt list -> [d3Host.txt](https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.txt)
- Compressed adblock version -> [d3Host.adblock](https://raw.githubusercontent.com/d3ward/toolz/master/src/d3host.adblock)

d3Host list is also included in
- [Blokada](https://blokada.org/)
- [OISD List](https://oisd.nl/)


## Units Test of Viewport [Link](https://d3ward.github.io/toolz/units)
This tool is useful for testing different units for expressing a length in CSS.
One of them is the 'vh', where 100vh should be 100%, but on mobile browsers it isn't. Over the years, there has been a lot of talk about this problem on mobile browsers, mainly on Safari which uses WebKit, but Chromium browsers are affected as well. In addition to the test, there are in-depth studies and solutions available.

## Fontlist [Link](https://d3ward.github.io/toolz/fontlist)
This tool allows you to check the list of web safe fonts supported by your browser. These are the fonts that are installed by default on virtually every computer or mobile device. This is what makes them "safe". No matter where you are in the world or what device you are using, a web safe font will always load and display correctly.


## Contributing

If you have any problems with any of the tools, feel free to share them by opening an issue.
You can also suggest a new test tool to be created or added. Contributions are welcome and encouraged.


## License

Toolz is licensed under [(CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

# AdBlock Tester

A modern, comprehensive tool for testing the effectiveness of your ad blocker against various ad networks, trackers, and analytics services.

## Features

- **Comprehensive Testing**: Checks ad blocker effectiveness against a wide range of advertising, tracking, and analytics domains
- **Detailed Results**: Provides percentage scores for blocked ad servers, trackers, and analytics services
- **Modern UI**: Clean, responsive interface with both light and dark mode support
- **Password Protection**: Secure access with password authentication
- **Customizable Settings**: Configure which domains to test against

## Live Demo

Visit the [live demo](https://addtester.pages.dev) to test your ad blocker.

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
   - The app requires a password (default: "ams505") to access the testing tools
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
