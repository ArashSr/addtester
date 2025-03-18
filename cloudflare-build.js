const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('===== Cloudflare Pages Specialized Build Script =====');
console.log(`Node version: ${process.version}`);
console.log(`Working directory: ${process.cwd()}`);

// Step 1: Ensure proper webpack configuration
function modifyWebpackConfig() {
  try {
    console.log('\nChecking webpack configuration...');
    const webpackMainPath = path.join(__dirname, 'config', 'webpack.main.js');
    
    if (fs.existsSync(webpackMainPath)) {
      let config = fs.readFileSync(webpackMainPath, 'utf8');
      
      // Check if publicPath needs to be modified
      if (config.includes('publicPath: \'/toolz/\'')) {
        console.log('Modifying publicPath in webpack config...');
        config = config.replace('publicPath: \'/toolz/\'', 'publicPath: \'/\'');
        fs.writeFileSync(webpackMainPath, config);
        console.log('✅ publicPath updated to "/"');
      } else {
        console.log('✅ publicPath is already correctly configured');
      }
    } else {
      console.log('⚠️ webpack.main.js not found. Skipping configuration check.');
    }
  } catch (error) {
    console.error('❌ Error modifying webpack config:', error.message);
  }
}

// Step 2: Run the build process
function runBuild() {
  try {
    console.log('\nInstalling dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('\nRunning build command...');
    execSync('npm run build', { stdio: 'inherit' });
    
    return true;
  } catch (error) {
    console.error('❌ Build process failed:', error.message);
    return false;
  }
}

// Step 3: Create necessary files for Cloudflare Pages
function setupCloudflareFiles() {
  try {
    console.log('\nSetting up Cloudflare-specific files...');
    const distDir = path.join(__dirname, 'dist');
    
    // Ensure dist directory exists
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
      console.log('Created dist directory');
    }
    
    // Add _redirects file for SPA behavior
    fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200');
    console.log('✅ Created _redirects file');
    
    return true;
  } catch (error) {
    console.error('❌ Error setting up Cloudflare files:', error.message);
    return false;
  }
}

// Step 4: Fallback to static deployment if build fails
function fallbackToStatic() {
  console.log('\n⚠️ Using fallback static deployment...');
  
  try {
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Create index.html if it doesn't exist
    const indexPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
      const staticHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toolz</title>
    <style>
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            color: #333;
            background-color: #f8fafc;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        h1 {
            color: #0f172a;
            margin-bottom: 16px;
        }
        .error-box {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            padding: 16px;
            margin: 24px 0;
            text-align: left;
            border-radius: 4px;
        }
        .button {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.2s;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Toolz</h1>
        <div class="error-box">
            <p><strong>Note:</strong> We're experiencing some issues with the full application build. 
            A temporary landing page is being displayed while we resolve these issues.</p>
        </div>
        <a href="https://github.com/ArashSr/addtester" class="button">View on GitHub</a>
    </div>
</body>
</html>`;
      fs.writeFileSync(indexPath, staticHtml);
      console.log('✅ Created fallback index.html');
    }
    
    // Create _redirects file
    fs.writeFileSync(path.join(distDir, '_redirects'), '/* /index.html 200');
    console.log('✅ Created _redirects file');
    
    return true;
  } catch (error) {
    console.error('❌ Error creating fallback files:', error.message);
    return false;
  }
}

// Run the deployment process
console.log('\n=== Starting deployment process ===\n');
modifyWebpackConfig();
const buildSuccess = runBuild();

if (buildSuccess) {
  setupCloudflareFiles();
  console.log('\n✅ Build completed successfully! Ready for Cloudflare Pages deployment.');
} else {
  fallbackToStatic();
  console.log('\n⚠️ Using fallback static deployment. Please check build errors above.');
}

console.log('\n=== Deployment process completed ==='); 