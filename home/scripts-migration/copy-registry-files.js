const fs = require('fs');
const path = require('path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║       MIGRATION DU REGISTRY - SCRIPT OPTIMISÉ         ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

const registryDir = path.join(__dirname, '../public/registry');
const targetDir = path.join(__dirname, '../public/registry-files');
const templatesDir = path.join(__dirname, '../../templates');

// Lire tous les fichiers JSON
const jsonFiles = fs.readdirSync(registryDir).filter(f => f.endsWith('.json'));

console.log(`📋 Traitement de ${jsonFiles.length} fichiers JSON...\n`);

// Statistiques
const stats = {
  jsonUpdated: 0,
  jsonAlreadyUpToDate: 0,
  filesFound: new Set(),
  filesCopied: 0,
  filesSkipped: 0,
  filesErrors: 0
};

// Étape 1: Extraire tous les fichiers nécessaires et mettre à jour les JSON
console.log('📝 Étape 1/3: Mise à jour des JSON...\n');

jsonFiles.forEach(jsonFile => {
  const jsonPath = path.join(registryDir, jsonFile);
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let modified = false;
  
  if (content.files && Array.isArray(content.files)) {
    content.files.forEach(file => {
      if (file.path) {
        // Cas 1: Ancien format (../../../templates/)
        if (file.path.startsWith('../../../templates/')) {
          const templatePath = file.path.replace('../../../templates/', '');
          stats.filesFound.add(templatePath);
          file.path = file.path.replace('../../../templates/', '../registry-files/');
          modified = true;
        }
        // Cas 2: Format intermédiaire (../../registry-files/)
        else if (file.path.startsWith('../../registry-files/')) {
          const templatePath = file.path.replace('../../registry-files/', '');
          stats.filesFound.add(templatePath);
          file.path = file.path.replace('../../registry-files/', '../registry-files/');
          modified = true;
        }
        // Cas 3: Format final (../registry-files/) - déjà à jour
        else if (file.path.startsWith('../registry-files/')) {
          const templatePath = file.path.replace('../registry-files/', '');
          stats.filesFound.add(templatePath);
        }
      }
    });
    
    if (modified) {
      fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2) + '\n', 'utf8');
      stats.jsonUpdated++;
      console.log(`  ✓ Mis à jour: ${jsonFile}`);
    } else {
      stats.jsonAlreadyUpToDate++;
    }
  }
});

console.log(`\n✅ JSON mis à jour: ${stats.jsonUpdated}`);
console.log(`✅ JSON déjà à jour: ${stats.jsonAlreadyUpToDate}`);
console.log(`📦 Fichiers uniques à copier: ${stats.filesFound.size}\n`);

// Étape 2: Copier les fichiers nécessaires
console.log('📦 Étape 2/3: Copie des fichiers...\n');

// Créer le dossier cible
fs.mkdirSync(targetDir, { recursive: true });

stats.filesFound.forEach(relPath => {
  const sourcePath = path.join(templatesDir, relPath);
  const targetPath = path.join(targetDir, relPath);
  
  // Créer les dossiers nécessaires
  const targetDirPath = path.dirname(targetPath);
  fs.mkdirSync(targetDirPath, { recursive: true });
  
  try {
    if (!fs.existsSync(sourcePath)) {
      console.log(`  ⚠️  Source non trouvée: ${relPath}`);
      stats.filesErrors++;
      return;
    }
    
    // Optimisation: vérifier si le fichier existe déjà et est identique
    if (fs.existsSync(targetPath)) {
      const sourceContent = fs.readFileSync(sourcePath);
      const targetContent = fs.readFileSync(targetPath);
      
      if (sourceContent.equals(targetContent)) {
        stats.filesSkipped++;
        return; // Fichier déjà identique, pas besoin de copier
      }
    }
    
    fs.copyFileSync(sourcePath, targetPath);
    stats.filesCopied++;
    console.log(`  ✓ Copié: ${relPath}`);
    
  } catch (error) {
    console.error(`  ❌ Erreur: ${relPath} - ${error.message}`);
    stats.filesErrors++;
  }
});

// Étape 3: Vérification finale
console.log(`\n🔍 Étape 3/3: Vérification finale...\n`);

let verificationErrors = 0;
jsonFiles.forEach(jsonFile => {
  const jsonPath = path.join(registryDir, jsonFile);
  const content = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  if (content.files && Array.isArray(content.files)) {
    content.files.forEach(file => {
      const absolutePath = path.join(registryDir, file.path);
      if (!fs.existsSync(absolutePath)) {
        console.log(`  ❌ Manquant: ${file.path} (dans ${jsonFile})`);
        verificationErrors++;
      }
    });
  }
});

// Rapport final
console.log('╔════════════════════════════════════════════════════════╗');
console.log('║                   RAPPORT FINAL                        ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log('📊 JSON:');
console.log(`   • Mis à jour: ${stats.jsonUpdated}`);
console.log(`   • Déjà à jour: ${stats.jsonAlreadyUpToDate}`);
console.log(`   • Total traité: ${jsonFiles.length}\n`);

console.log('📦 Fichiers:');
console.log(`   • Copiés: ${stats.filesCopied}`);
console.log(`   • Ignorés (déjà identiques): ${stats.filesSkipped}`);
console.log(`   • Erreurs: ${stats.filesErrors}`);
console.log(`   • Total attendu: ${stats.filesFound.size}\n`);

console.log('✅ Vérification:');
if (verificationErrors === 0) {
  console.log(`   • Tous les fichiers sont accessibles ✓\n`);
  
  console.log('📁 Structure finale:');
  console.log('   home/');
  console.log('   └── public/');
  console.log('       ├── registry/        (22 JSON mis à jour)');
  console.log('       └── registry-files/  (70 fichiers sources)');
  console.log('');
  
  // Calculer la taille
  const du = require('child_process').execSync(`du -sh "${targetDir}"`, { encoding: 'utf8' });
  const size = du.trim().split('\t')[0];
  console.log(`💾 Taille totale: ${size}`);
  console.log('');
  console.log('🎯 Migration terminée avec succès !');
} else {
  console.log(`   ❌ ${verificationErrors} fichiers manquants\n`);
  process.exit(1);
}
