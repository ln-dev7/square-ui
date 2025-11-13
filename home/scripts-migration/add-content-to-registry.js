const fs = require('fs');
const path = require('path');

const registryDir = path.join(__dirname, '../public/registry');
const templatesDir = path.join(__dirname, '../../templates');
const jsonFiles = fs.readdirSync(registryDir).filter(f => f.endsWith('.json'));

console.log('📝 Ajout du champ "content" aux fichiers JSON du registry...\n');

let totalFiles = 0;
let updatedFiles = 0;
let errors = [];

jsonFiles.forEach(jsonFile => {
  const jsonPath = path.join(registryDir, jsonFile);
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let modified = false;
  
  if (content.files && Array.isArray(content.files)) {
    content.files.forEach(file => {
      if (file.path && file.path.startsWith('https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/')) {
        totalFiles++;
        
        // Convertir l'URL GitHub en chemin local
        const githubPath = file.path.replace('https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/', '');
        const localPath = path.join(templatesDir, githubPath);
        
        try {
          if (fs.existsSync(localPath)) {
            const fileContent = fs.readFileSync(localPath, 'utf8');
            
            // Ajouter le champ content seulement s'il n'existe pas déjà
            if (!file.content) {
              file.content = fileContent;
              modified = true;
            }
          } else {
            errors.push({
              json: jsonFile,
              path: file.path,
              localPath: localPath,
              error: 'File not found'
            });
          }
        } catch (error) {
          errors.push({
            json: jsonFile,
            path: file.path,
            localPath: localPath,
            error: error.message
          });
        }
      }
    });
    
    if (modified) {
      fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2) + '\n', 'utf8');
      updatedFiles++;
      console.log(`  ✓ Mis à jour: ${jsonFile}`);
    }
  }
});

console.log(`\n✅ Fichiers mis à jour: ${updatedFiles}`);
console.log(`📊 Total de fichiers traités: ${totalFiles}`);

if (errors.length > 0) {
  console.log(`\n⚠️  Erreurs rencontrées: ${errors.length}`);
  errors.forEach(err => {
    console.log(`  - ${err.json}: ${err.error} (${err.localPath})`);
  });
}

