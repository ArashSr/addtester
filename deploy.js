const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Log environment for debugging
console.log('=== Environment Information ===');
console.log(`Node version: ${process.version}`);
console.log(`Current directory: ${process.cwd()}`);
console.log('Environment variables:', process.env.NODE_ENV);

// Create a build directory log function
function logDirectory(dir, indent = '') {
  if (!fs.existsSync(dir)) {
    console.log(`${indent}Directory does not exist: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir);
  console.log(`${indent}${dir}:`);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      logDirectory(filePath, indent + '  ');
    } else {
      console.log(`${indent}  ${file} (${stats.size} bytes)`);
    }
  });
}

// Run the build process
console.log('\n=== Running Build Process ===');
try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('\nRunning build command...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('\n=== Build Output Directory Structure ===');
  logDirectory('./dist');
  
  console.log('\n=== Build Success ===');
} catch (error) {
  console.error('\n=== Build Failed ===');
  console.error(error.toString());
  process.exit(1);
}

// Copy a basic _redirects file for Cloudflare
fs.writeFileSync('./dist/_redirects', '/* /index.html 200');
console.log('\nCreated _redirects file for SPA support');

console.log('\n=== Deployment Ready ==='); 