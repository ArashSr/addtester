const fs = require('fs');
const path = require('path');

console.log('Starting static deployment...');

// Ensure the dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
}

// Check if index.html exists in dist
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  // Copy the root index.html to dist if it exists
  const rootIndexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(rootIndexPath)) {
    fs.copyFileSync(rootIndexPath, indexPath);
    console.log('Copied index.html from root to dist directory');
  } else {
    // Create a basic index.html if none exists
    const basicHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toolz</title>
</head>
<body>
    <h1>Toolz</h1>
    <p>A set of accessible web tools</p>
</body>
</html>`;
    fs.writeFileSync(indexPath, basicHtml);
    console.log('Created basic index.html in dist directory');
  }
}

// Ensure _redirects file exists
const redirectsPath = path.join(distDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/* /index.html 200!');
  console.log('Created _redirects file');
}

console.log('Static deployment preparation complete.');
console.log('Files ready in the dist directory for Cloudflare Pages deployment.'); 