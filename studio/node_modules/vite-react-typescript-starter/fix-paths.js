const fs = require('fs');
const path = require('path');

// Función para reemplazar rutas en un archivo
function fixPathsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Reemplazar todas las rutas que empiecen con /FerradasAutomotores/
    content = content.replace(/\/FerradasAutomotores\//g, '/');
    
    // Solo escribir si hubo cambios
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${path.relative(__dirname, filePath)}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Función para procesar directorio recursivamente
function processDirectory(dir) {
  let fixedCount = 0;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Procesar subdirectorios
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Procesar archivos TypeScript/React
      if (fixPathsInFile(filePath)) {
        fixedCount++;
      }
    }
  });
  
  return fixedCount;
}

// Procesar el directorio src
const srcDir = path.join(__dirname, 'src');
console.log('🔧 Fixing image paths...');
console.log('📁 Processing directory:', srcDir);

const totalFixed = processDirectory(srcDir);

console.log(`\n✅ Fixed ${totalFixed} files!`);
console.log('🎉 All image paths have been updated from /FerradasAutomotores/ to /');
console.log('\n📝 Next steps:');
console.log('1. Run: npm run build');
console.log('2. Run: npm run deploy'); 