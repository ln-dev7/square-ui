const fs = require('fs');
const path = require('path');

// Configuration
const registryDir = path.join(__dirname, '../public/registry');
const templatesDir = path.join(__dirname, '../../templates');
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/';

// Options en ligne de commande
const args = process.argv.slice(2);
const showHelp = args.includes('--help') || args.includes('-h');
const forceUpdate = args.includes('--force') || args.includes('-f');
const verbose = args.includes('--verbose') || args.includes('-v');
const dryRun = args.includes('--dry-run') || args.includes('-d');

// Afficher l'aide
if (showHelp) {
  console.log(`
📚 Script d'ajout de contenu au registry

USAGE:
  node add-content-to-registry.js [OPTIONS]

DESCRIPTION:
  Ce script parcourt tous les fichiers JSON du registry et ajoute le champ
  "content" avec le contenu complet des fichiers référencés par les URLs GitHub.

OPTIONS:
  -h, --help          Affiche cette aide
  -v, --verbose       Mode verbeux (affiche tous les détails)
  -d, --dry-run       Mode simulation (ne modifie rien)
  -f, --force         Force la mise à jour même si content existe déjà

EXEMPLES:
  # Exécution normale
  node add-content-to-registry.js

  # Voir ce qui sera fait sans modifier
  node add-content-to-registry.js --dry-run

  # Mode verbeux pour voir tous les détails
  node add-content-to-registry.js --verbose

  # Forcer la mise à jour de tous les fichiers
  node add-content-to-registry.js --force

  # Combinaison d'options
  node add-content-to-registry.js --dry-run --verbose
`);
  process.exit(0);
}

// Statistiques
const stats = {
  jsonFiles: {
    total: 0,
    processed: 0,
    updated: 0,
    alreadyUpToDate: 0,
    skipped: 0,
    errors: 0
  },
  contentFiles: {
    total: 0,
    added: 0,
    alreadyExists: 0,
    notFound: 0,
    errors: 0
  },
  errors: []
};

/**
 * Valide qu'un fichier JSON est valide
 */
function validateJSON(filePath, content) {
  try {
    JSON.parse(content);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Convertit une URL GitHub en chemin local
 */
function githubUrlToLocalPath(githubUrl) {
  if (!githubUrl.startsWith(GITHUB_BASE_URL)) {
    return null;
  }
  const relativePath = githubUrl.replace(GITHUB_BASE_URL, '');
  return path.join(templatesDir, relativePath);
}

/**
 * Formate la taille d'un fichier
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Traite un fichier JSON du registry
 */
function processJSONFile(jsonFile) {
  const jsonPath = path.join(registryDir, jsonFile);
  stats.jsonFiles.total++;

  try {
    // Lire et valider le JSON
    const fileContent = fs.readFileSync(jsonPath, 'utf8');
    const validation = validateJSON(jsonPath, fileContent);
    
    if (!validation.valid) {
      stats.jsonFiles.errors++;
      stats.errors.push({
        type: 'invalid_json',
        file: jsonFile,
        error: validation.error
      });
      if (verbose) {
        console.log(`  ❌ JSON invalide: ${jsonFile} - ${validation.error}`);
      }
      return;
    }

    const content = JSON.parse(fileContent);
    let modified = false;
    let filesProcessed = 0;
    let filesAdded = 0;
    let filesAlreadyExist = 0;
    let filesNotFound = 0;

    if (!content.files || !Array.isArray(content.files)) {
      if (verbose) {
        console.log(`  ⏭️  Ignoré (pas de fichiers): ${jsonFile}`);
      }
      stats.jsonFiles.skipped++;
      return;
    }

    stats.jsonFiles.processed++;

    // Traiter chaque fichier référencé
    content.files.forEach((file, index) => {
      if (!file.path) return;

      // Vérifier si c'est une URL GitHub
      if (!file.path.startsWith(GITHUB_BASE_URL)) {
        if (verbose && file.path) {
          console.log(`    ⚠️  Path non-GitHub ignoré: ${file.path}`);
        }
        return;
      }

      stats.contentFiles.total++;
      filesProcessed++;

      const localPath = githubUrlToLocalPath(file.path);
      if (!localPath) {
        stats.contentFiles.errors++;
        stats.errors.push({
          type: 'invalid_url',
          file: jsonFile,
          path: file.path
        });
        return;
      }

      try {
        // Vérifier si le fichier existe
        if (!fs.existsSync(localPath)) {
          stats.contentFiles.notFound++;
          filesNotFound++;
          stats.errors.push({
            type: 'file_not_found',
            file: jsonFile,
            path: file.path,
            localPath: localPath
          });
          if (verbose) {
            console.log(`    ⚠️  Fichier introuvable: ${path.relative(process.cwd(), localPath)}`);
          }
          return;
        }

        // Lire le contenu du fichier
        const fileContent = fs.readFileSync(localPath, 'utf8');
        const fileStats = fs.statSync(localPath);

        // Vérifier si le content existe déjà
        if (file.content && !forceUpdate) {
          stats.contentFiles.alreadyExists++;
          filesAlreadyExist++;
          if (verbose) {
            console.log(`    ✓ Content déjà présent: ${path.basename(localPath)} (${formatFileSize(fileStats.size)})`);
          }
          return;
        }

        // Ajouter ou mettre à jour le content
        if (dryRun) {
          console.log(`    🔄 [DRY RUN] Ajouterait content pour: ${path.basename(localPath)}`);
        } else {
          file.content = fileContent;
          modified = true;
          stats.contentFiles.added++;
          filesAdded++;
          if (verbose) {
            console.log(`    ✓ Content ajouté: ${path.basename(localPath)} (${formatFileSize(fileStats.size)})`);
          }
        }
      } catch (error) {
        stats.contentFiles.errors++;
        stats.errors.push({
          type: 'read_error',
          file: jsonFile,
          path: file.path,
          localPath: localPath,
          error: error.message
        });
        if (verbose) {
          console.log(`    ❌ Erreur lecture: ${path.basename(localPath)} - ${error.message}`);
        }
      }
    });

    // Sauvegarder si modifié
    if (modified && !dryRun) {
      try {
        fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2) + '\n', 'utf8');
        stats.jsonFiles.updated++;
        console.log(`  ✅ Mis à jour: ${jsonFile} (${filesAdded} fichier${filesAdded > 1 ? 's' : ''} ajouté${filesAdded > 1 ? 's' : ''})`);
      } catch (error) {
        stats.jsonFiles.errors++;
        stats.errors.push({
          type: 'write_error',
          file: jsonFile,
          error: error.message
        });
        console.log(`  ❌ Erreur écriture: ${jsonFile} - ${error.message}`);
      }
    } else if (filesAlreadyExist === filesProcessed && filesProcessed > 0) {
      stats.jsonFiles.alreadyUpToDate++;
      if (verbose) {
        console.log(`  ✓ Déjà à jour: ${jsonFile}`);
      }
    }
  } catch (error) {
    stats.jsonFiles.errors++;
    stats.errors.push({
      type: 'process_error',
      file: jsonFile,
      error: error.message
    });
    console.log(`  ❌ Erreur traitement: ${jsonFile} - ${error.message}`);
  }
}

/**
 * Affiche le résumé des statistiques
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RÉSUMÉ');
  console.log('='.repeat(60));
  
  console.log('\n📁 Fichiers JSON:');
  console.log(`   Total:        ${stats.jsonFiles.total}`);
  console.log(`   Traités:      ${stats.jsonFiles.processed}`);
  console.log(`   Mis à jour:   ${stats.jsonFiles.updated}`);
  console.log(`   Déjà à jour:  ${stats.jsonFiles.alreadyUpToDate}`);
  console.log(`   Ignorés:      ${stats.jsonFiles.skipped}`);
  console.log(`   Erreurs:      ${stats.jsonFiles.errors}`);

  console.log('\n📄 Fichiers de contenu:');
  console.log(`   Total:              ${stats.contentFiles.total}`);
  console.log(`   Ajoutés:            ${stats.contentFiles.added}`);
  console.log(`   Déjà présents:      ${stats.contentFiles.alreadyExists}`);
  console.log(`   Introuvables:       ${stats.contentFiles.notFound}`);
  console.log(`   Erreurs:            ${stats.contentFiles.errors}`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️  ERREURS DÉTAILLÉES:');
    stats.errors.forEach((err, index) => {
      console.log(`\n   ${index + 1}. ${err.type.toUpperCase()}`);
      console.log(`      Fichier: ${err.file || 'N/A'}`);
      if (err.path) console.log(`      Path: ${err.path}`);
      if (err.localPath) console.log(`      Local: ${err.localPath}`);
      if (err.error) console.log(`      Erreur: ${err.error}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  
  if (dryRun) {
    console.log('⚠️  MODE DRY RUN - Aucune modification effectuée');
  }
}

// ============================================
// EXECUTION PRINCIPALE
// ============================================

console.log('🚀 Script d\'ajout de contenu au registry\n');
console.log('Options:');
if (dryRun) console.log('  🔍 Mode DRY RUN (simulation)');
if (forceUpdate) console.log('  🔄 Force la mise à jour même si content existe');
if (verbose) console.log('  📝 Mode verbeux activé');
console.log('');

// Vérifier que les répertoires existent
if (!fs.existsSync(registryDir)) {
  console.error(`❌ Erreur: Le répertoire ${registryDir} n'existe pas`);
  process.exit(1);
}

if (!fs.existsSync(templatesDir)) {
  console.error(`❌ Erreur: Le répertoire ${templatesDir} n'existe pas`);
  process.exit(1);
}

// Lire tous les fichiers JSON
const jsonFiles = fs.readdirSync(registryDir)
  .filter(f => f.endsWith('.json'))
  .sort();

if (jsonFiles.length === 0) {
  console.log('⚠️  Aucun fichier JSON trouvé dans le répertoire registry');
  process.exit(0);
}

console.log(`📂 ${jsonFiles.length} fichier${jsonFiles.length > 1 ? 's' : ''} JSON trouvé${jsonFiles.length > 1 ? 's' : ''}\n`);

// Traiter chaque fichier
jsonFiles.forEach(jsonFile => {
  processJSONFile(jsonFile);
});

// Afficher le résumé
printSummary();

// Code de sortie
if (stats.jsonFiles.errors > 0 || stats.contentFiles.errors > 0) {
  process.exit(1);
}

