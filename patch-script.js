/**
 * Script de correction pour IRIS Interface v3.5
 * Placez ce fichier (patch-script.js) dans le dossier racine de l'application
 * et lancez-le avec : node patch-script.js
 */

const fs = require('fs');
const path = require('path');

// Répertoire racine de l'application (répertoire du script)
const rootDir = __dirname;

// Chemins des fichiers à modifier, relatifs à rootDir
const filesToPatch = {
  binaryMaze: 'js/binary-maze.js',
  neuralPuzzle: 'js/neural-puzzle.js',
  navigation: 'js/navigation.js',
  sequence: 'js/sequence.js'
};

// Corrections à appliquer
const patches = {
  binaryMaze: content => (
    content
      .replace(
        'const originalPerformAction = performAction;',
        '// const originalPerformAction = performAction; // Commenté pour éviter les redéclarations'
      )
      .replace(
        'performAction = function(action) {',
        'window.performAction = function(action) {'
      )
  ),

  neuralPuzzle: content => {
    // 1) Remplacer uniquement la déclaration
    let updated = content.replace(
      /const\s+correctSequence\s*=/,
      'window.neuralCorrectSequence ='
    );
    // 2) Remplacer les appels ultérieurs
    return updated.replace(/\bcorrectSequence\b/g, 'neuralCorrectSequence');
  },

  navigation: content => {
    let updated = content;
    if (!/function\s+setFocus/.test(updated)) {
      updated = `
// Fonction ajoutée automatiquement
function setFocus(element) {
  if (!element) return;
  
  if (currentFocusedElement) {
    currentFocusedElement.classList.remove('focused');
  }
  
  element.classList.add('focused');
  element.focus();
  currentFocusedElement = element;
}\n\n` + updated;
    }
    if (!/function\s+handleLogin/.test(updated)) {
      updated = `
// Fonction ajoutée automatiquement
function handleLogin() {
  const passwordInput = document.getElementById('password-input');
  const passwordError = document.getElementById('password-error');
  
  if (!passwordInput || !passwordError) return;
  
  if (passwordInput.value === passwords.admin) {
    playSound(audio.success);
    showInterface('admin');
  } else {
    playSound(audio.error);
    passwordError.classList.remove('hidden');
    passwordInput.value = '';
    passwordInput.focus();
  }
}\n\n` + updated;
    }
    return updated;
  },

  sequence: content => (
    content
      .replace(
        'const originalPerformAction = performAction;',
        '// const originalPerformAction = performAction; // Commenté pour éviter les redéclarations'
      )
      .replace(
        'performAction = function(action, ...args) {',
        'window.performAction = function(action, ...args) {'
      )
  )
};

async function applyPatches() {
  console.log('🔧 Démarrage des corrections pour IRIS Interface v3.5…');

  for (const [key, relPath] of Object.entries(filesToPatch)) {
    const fullPath = path.join(rootDir, relPath);
    const bakPath  = `${fullPath}.bak`;

    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Fichier introuvable : ${fullPath}`);
      continue;
    }

    try {
      const original = fs.readFileSync(fullPath, 'utf8');
      const patched  = patches[key](original);

      // Créer dossier de sauvegarde si nécessaire
      const bakDir = path.dirname(bakPath);
      if (!fs.existsSync(bakDir)) fs.mkdirSync(bakDir, { recursive: true });

      fs.writeFileSync(bakPath, original, 'utf8');
      fs.writeFileSync(fullPath, patched, 'utf8');

      console.log(`✅ Patch appliqué sur ${relPath}`);
    } catch (err) {
      console.error(`❌ Erreur sur ${relPath} :`, err.message);
    }
  }

  console.log('🎉 Toutes les corrections sont terminées. Sauvegardes en .bak');
  console.log('👉 N’oubliez pas de recharger votre navigateur pour voir les effets.');
}

applyPatches();
