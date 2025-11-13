# Scripts de Migration du Registry

Ce dossier contient les scripts utilitaires pour gérer et maintenir les fichiers JSON du registry.

## 📋 Scripts disponibles

### `add-content-to-registry.js`

Script principal qui ajoute automatiquement le champ `content` aux fichiers JSON du registry. Ce champ contient le contenu complet des fichiers référencés par les URLs GitHub.

## 🚀 Utilisation

### Commande de base

```bash
cd home
node scripts-migration/add-content-to-registry.js
```

### Options disponibles

| Option | Raccourci | Description |
|--------|-----------|-------------|
| `--help` | `-h` | Affiche l'aide intégrée |
| `--verbose` | `-v` | Mode verbeux (affiche tous les détails) |
| `--dry-run` | `-d` | Mode simulation (ne modifie rien) |
| `--force` | `-f` | Force la mise à jour même si `content` existe déjà |

### Exemples d'utilisation

#### 1. Exécution normale
Ajoute le champ `content` aux nouveaux fichiers JSON qui n'en ont pas encore.

```bash
node scripts-migration/add-content-to-registry.js
```

#### 2. Mode simulation (dry-run)
Voir ce qui sera fait sans modifier les fichiers.

```bash
node scripts-migration/add-content-to-registry.js --dry-run
```

#### 3. Mode verbeux
Afficher tous les détails de traitement, y compris les fichiers déjà à jour.

```bash
node scripts-migration/add-content-to-registry.js --verbose
```

#### 4. Forcer la mise à jour
Mettre à jour tous les fichiers, même ceux qui ont déjà un `content`.

```bash
node scripts-migration/add-content-to-registry.js --force
```

#### 5. Combinaison d'options
Combiner plusieurs options pour un contrôle total.

```bash
# Simulation avec détails
node scripts-migration/add-content-to-registry.js --dry-run --verbose

# Mise à jour forcée avec détails
node scripts-migration/add-content-to-registry.js --force --verbose
```

## 📖 Comment ça fonctionne

### Processus

1. **Détection automatique** : Le script parcourt automatiquement tous les fichiers `.json` dans `home/public/registry/`

2. **Validation** : Chaque fichier JSON est validé avant traitement

3. **Traitement** : Pour chaque fichier JSON :
   - Parcourt le tableau `files`
   - Extrait les `path` qui pointent vers GitHub (`https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/...`)
   - Convertit l'URL GitHub en chemin local (`templates/...`)
   - Lit le contenu du fichier local
   - Ajoute le champ `content` avec le contenu complet

4. **Sauvegarde** : Les fichiers JSON sont mis à jour avec le nouveau champ `content`

### Format du champ `content`

Le champ `content` est ajouté juste après le champ `path` dans chaque entrée du tableau `files` :

```json
{
  "files": [
    {
      "path": "https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/chat/components/chat/chat-input-box.tsx",
      "type": "registry:component",
      "target": "components/chat-input-box.tsx",
      "content": "import { ... } from \"lucide-react\";\n..."
    }
  ]
}
```

## 📊 Statistiques

Le script affiche un résumé détaillé après l'exécution :

```
📊 RÉSUMÉ
============================================================

📁 Fichiers JSON:
   Total:        22
   Traités:      22
   Mis à jour:   0
   Déjà à jour:  22
   Ignorés:      0
   Erreurs:      0

📄 Fichiers de contenu:
   Total:              89
   Ajoutés:            0
   Déjà présents:      89
   Introuvables:       0
   Erreurs:            0
```

## ⚠️ Gestion des erreurs

Le script gère plusieurs types d'erreurs :

- **JSON invalide** : Fichier JSON mal formé
- **Fichier introuvable** : Le fichier référencé n'existe pas localement
- **Erreur de lecture** : Impossible de lire le fichier
- **Erreur d'écriture** : Impossible de sauvegarder le JSON

Toutes les erreurs sont affichées dans le résumé avec les détails nécessaires pour le débogage.

## 🔄 Workflow recommandé

### Ajouter un nouveau composant au registry

1. Créer le fichier JSON dans `home/public/registry/`
2. Ajouter les `path` avec les URLs GitHub
3. Exécuter le script :

```bash
node scripts-migration/add-content-to-registry.js
```

Le script détectera automatiquement le nouveau fichier et ajoutera le `content` pour tous les fichiers référencés.

### Vérifier avant de commiter

Avant de commiter vos changements, utilisez le mode dry-run pour vérifier :

```bash
node scripts-migration/add-content-to-registry.js --dry-run --verbose
```

## 📁 Structure des fichiers

```
home/
├── scripts-migration/
│   ├── add-content-to-registry.js  # Script principal
│   ├── copy-registry-files.js      # Script de copie (ancien)
│   ├── verify-registry.js          # Script de vérification (ancien)
│   └── README.md                   # Cette documentation
├── public/
│   └── registry/                   # Fichiers JSON du registry
│       ├── chat.json
│       ├── chat-input-box.json
│       └── ...
└── templates/                      # Templates source
    ├── chat/
    ├── emails/
    └── task-management/
```

## 🛠️ Prérequis

- Node.js (version 12 ou supérieure)
- Accès au répertoire `templates/` avec les fichiers sources

## 💡 Conseils

- **Utilisez `--dry-run`** avant de faire des modifications importantes
- **Utilisez `--verbose`** pour déboguer les problèmes
- **Utilisez `--force`** avec précaution, seulement si vous voulez vraiment tout mettre à jour
- Le script est **idempotent** : vous pouvez l'exécuter plusieurs fois sans problème

## 🐛 Dépannage

### Le script ne trouve pas les fichiers

Vérifiez que :
- Les fichiers existent dans `templates/`
- Les URLs GitHub dans les JSON sont correctes
- Le format de l'URL correspond à : `https://raw.githubusercontent.com/ln-dev7/square-ui/master/templates/...`

### Le script ne met pas à jour certains fichiers

- Vérifiez que les fichiers ont bien un tableau `files`
- Vérifiez que les `path` commencent par l'URL GitHub correcte
- Utilisez `--verbose` pour voir les détails
- Utilisez `--force` si le `content` existe déjà et que vous voulez le mettre à jour

## 📝 Notes

- Le script préserve le formatage JSON existant (indentation de 2 espaces)
- Les fichiers sont triés alphabétiquement pour un traitement cohérent
- Le script ignore automatiquement les fichiers qui n'ont pas de tableau `files`
- Les chemins non-GitHub sont ignorés silencieusement (sauf en mode verbose)

## 🔗 Liens utiles

- [Documentation shadcn/ui Registry](https://ui.shadcn.com/docs/registry)
- [Format du registry JSON](https://ui.shadcn.com/schema/registry-item.json)

