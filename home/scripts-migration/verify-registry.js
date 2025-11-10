const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la migration du registry...\n');

const registryDir = path.join(__dirname, '../public/registry');
const jsonFiles = fs.readdirSync(registryDir).filter(f => f.endsWith('.json'));

let totalFiles = 0;
let validFiles = 0;
let missingFiles = 0;
let errors = [];

jsonFiles.forEach(jsonFile => {
  const jsonPath = path.join(registryDir, jsonFile);
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  if (content.files && Array.isArray(content.files)) {
    content.files.forEach(file => {
      totalFiles++;
      
      // Convertir le path relatif en path absolu
      const absolutePath = path.join(registryDir, file.path);
      
      // Vérifier si le fichier existe
      if (fs.existsSync(absolutePath)) {
        validFiles++;
      } else {
        missingFiles++;
        errors.push({
          json: jsonFile,
          path: file.path,
          absolutePath: absolutePath
        });
      }
    });
  }
});

console.log('📊 Résultats de la vérification:\n');
console.log(`✅ Fichiers JSON traités: ${jsonFiles.length}`);
console.log(`✅ Références totales vérifiées: ${totalFiles}`);
console.log(`✅ Fichiers valides trouvés: ${validFiles}`);
console.log(`${missingFiles > 0 ? '❌' : '✅'} Fichiers manquants: ${missingFiles}\n`);

if (errors.length > 0) {
  console.log('⚠️  Fichiers manquants:');
  errors.forEach(err => {
    console.log(`  - ${err.json}: ${err.path}`);
  });
  process.exit(1);
} else {
  console.log('✨ Migration réussie ! Tous les fichiers sont accessibles.\n');
  console.log('📁 Structure du registry:');
  console.log('   home/');
  console.log('   └── public/');
  console.log('       ├── registry/         (fichiers JSON mis à jour)');
  console.log('       └── registry-files/   (fichiers sources copiés)');
  console.log('           ├── chat/');
  console.log('           ├── emails/');
  console.log('           └── task-management/');
  console.log('');
  console.log('🎯 Les chemins pointent maintenant vers ../registry-files/ au lieu de ../../../templates/');
}

