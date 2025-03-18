// This script ensures Cloudflare-specific configuration is in place
const fs = require('fs');
const path = require('path');

console.log('Setting up Cloudflare Pages configuration...');

// Ensure the dist folder exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('Created dist directory');
}

// Add _redirects file for SPA behavior
fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200');
console.log('Created _redirects file');

// Add _headers file for security headers
const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`;
fs.writeFileSync(path.join(distDir, '_headers'), headers);
console.log('Created _headers file');

// Update package.json to include Cloudflare deployment script
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add Cloudflare deployment script
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts['cf-build'] = 'npm run build && node cloudflare-config.js';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('Updated package.json with cf-build script');
}

console.log('Cloudflare Pages configuration completed'); 