import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up development environment...');

// Function to check if a command exists
function commandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Check Node.js version
function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  console.log(`📋 Node.js version: ${nodeVersion}`);
  
  if (majorVersion < 18) {
    console.warn('⚠️  Warning: Node.js 18+ is recommended for best compatibility');
  } else {
    console.log('✅ Node.js version is compatible');
  }
}

// Check if npm is available
function checkNpm() {
  if (commandExists('npm')) {
    console.log('✅ npm is available');
    return true;
  } else {
    console.error('❌ npm is not installed or not in PATH');
    return false;
  }
}

// Check if node_modules exists and install if needed
function checkAndInstallDependencies() {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found in current directory');
    console.log('Make sure you are in the project root directory');
    process.exit(1);
  }
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Installing dependencies...');
    try {
      execSync('npm install', { stdio: 'inherit', cwd: process.cwd() });
      console.log('✅ Dependencies installed successfully');
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
      console.log('Please run "npm install" manually and check for errors');
      process.exit(1);
    }
  } else {
    console.log('📦 Dependencies already installed');
  }
}

// Create necessary directories
function createDirectories() {
  const directories = [
    'public/data',
    'public/uploads',
    'content/blog',
    'dist'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Copy data files to public directory
function copyDataFiles() {
  const dataDir = path.join(process.cwd(), 'data');
  const publicDataDir = path.join(process.cwd(), 'public/data');
  
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const srcPath = path.join(dataDir, file);
        const destPath = path.join(publicDataDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`📄 Copied ${file} to public/data/`);
      }
    });
  }
}

// Run blog build
async function buildBlogData() {
  console.log('📝 Building blog data...');
  try {
    const { buildBlog } = await import('./build-blog.js');
    await buildBlog();
    console.log('✅ Blog data built successfully');
  } catch (error) {
    console.error('❌ Failed to build blog data:', error.message);
    console.log('⚠️  Continuing with fallback data...');
    
    // Create minimal fallback blog data
    const publicDataDir = path.join(process.cwd(), 'public/data');
    const fallbackFiles = {
      'blog-posts.json': [],
      'blog-categories.json': [],
      'blog-featured.json': []
    };
    
    Object.entries(fallbackFiles).forEach(([filename, content]) => {
      const filePath = path.join(publicDataDir, filename);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    });
    
    console.log('✅ Created fallback blog data');
  }
}

// Validate setup
function validateSetup() {
  const requiredFiles = [
    'package.json',
    'App.tsx',
    'main.tsx',
    'index.html',
    'styles/globals.css'
  ];
  
  const missingFiles = requiredFiles.filter(file => 
    !fs.existsSync(path.join(process.cwd(), file))
  );
  
  if (missingFiles.length > 0) {
    console.error('❌ Missing required files:');
    missingFiles.forEach(file => console.error(`   - ${file}`));
    process.exit(1);
  }
  
  console.log('✅ All required files are present');
}

// Main setup function
async function setup() {
  try {
    console.log('');
    
    // Check system requirements
    checkNodeVersion();
    if (!checkNpm()) {
      process.exit(1);
    }
    
    // Validate project structure
    validateSetup();
    
    // Install dependencies
    checkAndInstallDependencies();
    
    // Create necessary directories
    createDirectories();
    
    // Copy data files
    copyDataFiles();
    
    // Build blog data
    await buildBlogData();
    
    console.log('');
    console.log('🎉 Development environment setup complete!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run "npm run dev" to start the development server');
    console.log('2. Visit http://localhost:5173 to view your site');
    console.log('3. Run "npm run lint" to check code quality');
    console.log('4. Run "npm run build" to create production build');
    console.log('');
    console.log('For deployment instructions, see the setup guides in your project folder.');
    console.log('');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setup();
}

export { setup };