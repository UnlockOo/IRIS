/**
 * Gestion du puzzle Labyrinthe Logique Binaire pour l'interface IRIS v3.5
 * Un puzzle avancé qui met au défi les joueurs de comprendre les opérations binaires
 * en naviguant dans un labyrinthe où les valeurs des cellules suivent des règles logiques.
 */

//==============================================================================
// CONFIGURATION ET ÉTAT DU PUZZLE
//==============================================================================

/**
 * État du labyrinthe binaire
 */
const mazeState = {
    currentLevel: 1,    // Niveau actuel
    totalLevels: 5,     // Nombre total de niveaux
    moves: 0,           // Nombre de mouvements effectués
    state: 'playing',   // État du jeu: 'playing', 'won', 'lost'
    playerPosition: { x: 0, y: 0 },  // Position du joueur
    exitPosition: { x: 7, y: 7 },    // Position de la sortie
    grid: [],           // Grille de jeu (générée dynamiquement)
    rule: 'equal_to_one', // Règle active
    ruleValue: 1        // Valeur associée à la règle
};

/**
 * Règles disponibles pour le labyrinthe
 */
const mazeRules = {
    equal_to_one: {
        description: "Vous ne pouvez traverser que les cellules ayant la valeur <span class='rule-value'>1</span>.",
        validator: (value) => value === 1
    },
    equal_to_zero: {
        description: "Vous ne pouvez traverser que les cellules ayant la valeur <span class='rule-value'>0</span>.",
        validator: (value) => value === 0
    },
    greater_than: {
        description: "Vous ne pouvez traverser que les cellules ayant une valeur supérieure à <span class='rule-value'>0</span>.",
        validator: (value) => value > 0
    },
    less_than: {
        description: "Vous ne pouvez traverser que les cellules ayant une valeur inférieure à <span class='rule-value'>1</span>.",
        validator: (value) => value < 1
    },
    modulo: {
        description: "Vous ne pouvez traverser que les cellules dont la valeur modulo <span class='rule-value'>2</span> est égale à <span class='rule-value'>1</span>.",
        validator: (value) => value % 2 === 1
    }
};

/**
 * Opérateurs logiques pour les cellules spéciales
 */
const operators = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    XOR: (a, b) => a ^ b,
    NOT: (a) => a === 0 ? 1 : 0
};

/**
 * Définitions des niveaux du labyrinthe
 */
const mazeLevels = [
    // Niveau 1: Introduction simple (règle: cellules avec valeur 1)
    {
        rule: 'equal_to_one',
        ruleValue: 1,
        playerStart: { x: 0, y: 0 },
        exit: { x: 7, y: 7 },
        walls: [
            { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
            { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 4, y: 5 },
            { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 },
            { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }
        ],
        gates: [] // Pas de portes logiques au premier niveau
    },
    
    // Niveau 2: Introduction aux portes logiques (AND et OR)
    {
        rule: 'equal_to_one',
        ruleValue: 1,
        playerStart: { x: 0, y: 0 },
        exit: { x: 7, y: 7 },
        walls: [
            { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
            { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
            { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
            { x: 6, y: 5 }, { x: 6, y: 6 }
        ],
        gates: [
            { x: 3, y: 3, type: 'AND', inputs: [{ x: 2, y: 3 }, { x: 3, y: 3 }] },
            { x: 5, y: 5, type: 'OR', inputs: [{ x: 4, y: 5 }, { x: 5, y: 4 }] }
        ]
    },
    
    // Niveau 3: Plus complexe avec XOR et NOT
    {
        rule: 'modulo',
        ruleValue: 2,
        playerStart: { x: 0, y: 3 },
        exit: { x: 7, y: 4 },
        walls: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
            { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
            { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 5 }, { x: 3, y: 6 },
            { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 5 }, { x: 6, y: 6 }
        ],
        gates: [
            { x: 2, y: 3, type: 'XOR', inputs: [{ x: 1, y: 3 }, { x: 2, y: 2 }] },
            { x: 4, y: 3, type: 'NOT', inputs: [{ x: 4, y: 2 }] },
            { x: 5, y: 3, type: 'AND', inputs: [{ x: 4, y: 3 }, { x: 5, y: 2 }] }
        ]
    },
    
    // Niveau 4: Règle plus complexe et combinaisons logiques
    {
        rule: 'less_than',
        ruleValue: 1,
        playerStart: { x: 0, y: 0 },
        exit: { x: 7, y: 7 },
        walls: [
            { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
            { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
            { x: 5, y: 4 }, { x: 6, y: 4 },
            { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 }
        ],
        gates: [
            { x: 1, y: 3, type: 'NOT', inputs: [{ x: 1, y: 2 }] },
            { x: 3, y: 2, type: 'OR', inputs: [{ x: 3, y: 1 }, { x: 3, y: 3 }] },
            { x: 5, y: 3, type: 'AND', inputs: [{ x: 5, y: 2 }, { x: 6, y: 3 }] },
            { x: 3, y: 5, type: 'XOR', inputs: [{ x: 2, y: 5 }, { x: 3, y: 4 }] },
            { x: 6, y: 6, type: 'NOT', inputs: [{ x: 5, y: 6 }] }
        ]
    },
    
    // Niveau 5: Labyrinthe final très complexe avec toutes les règles
    {
        rule: 'greater_than',
        ruleValue: 0,
        playerStart: { x: 3, y: 0 },
        exit: { x: 4, y: 7 },
        walls: [
            { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 },
            { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
            { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
            { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 6, y: 7 }, { x: 7, y: 7 }
        ],
        gates: [
            { x: 1, y: 2, type: 'AND', inputs: [{ x: 0, y: 2 }, { x: 1, y: 2 }] },
            { x: 3, y: 2, type: 'OR', inputs: [{ x: 2, y: 2 }, { x: 3, y: 2 }] },
            { x: 5, y: 2, type: 'XOR', inputs: [{ x: 4, y: 2 }, { x: 5, y: 2 }] },
            { x: 7, y: 2, type: 'NOT', inputs: [{ x: 6, y: 2 }] },
            { x: 2, y: 4, type: 'NOT', inputs: [{ x: 2, y: 3 }] },
            { x: 4, y: 4, type: 'AND', inputs: [{ x: 4, y: 3 }, { x: 4, y: 4 }] },
            { x: 6, y: 4, type: 'OR', inputs: [{ x: 6, y: 3 }, { x: 6, y: 4 }] },
            { x: 1, y: 6, type: 'XOR', inputs: [{ x: 1, y: 5 }, { x: 1, y: 6 }] },
            { x: 3, y: 6, type: 'NOT', inputs: [{ x: 3, y: 5 }] },
            { x: 5, y: 6, type: 'AND', inputs: [{ x: 5, y: 5 }, { x: 5, y: 6 }] }
        ]
    }
];

//==============================================================================
// INITIALISATION DU PUZZLE
//==============================================================================

/**
 * Initialise le puzzle du labyrinthe binaire
 */
function initializeBinaryMaze() {
    // Réinitialiser l'état du jeu
    mazeState.currentLevel = 1;
    mazeState.moves = 0;
    mazeState.state = 'playing';
    
    // Charger le premier niveau
    loadMazeLevel(mazeState.currentLevel);
    
    // Ajouter les écouteurs d'événements pour les contrôles
    addMazeEventListeners();
    
    // Si le puzzle est déjà complété, on affiche simplement un message
    if (puzzleState && puzzleState.binaryMazeCompleted) {
        showMazeMessage("Puzzle déjà complété! Vous avez maîtrisé le labyrinthe logique.", "success");
        document.getElementById('maze-state').textContent = "Complété";
    }
}

/**
 * Charge un niveau de labyrinthe spécifique
 * @param {number} level - Numéro du niveau à charger
 */
function loadMazeLevel(level) {
    // Ajustement pour l'index de tableau (niveau 1 = index 0)
    const levelIndex = level - 1;
    if (levelIndex < 0 || levelIndex >= mazeLevels.length) {
        console.error(`Niveau ${level} invalide`);
        return;
    }
    
    const levelData = mazeLevels[levelIndex];
    
    // Mettre à jour les informations du niveau
    mazeState.rule = levelData.rule;
    mazeState.ruleValue = levelData.ruleValue;
    mazeState.playerPosition = { ...levelData.playerStart };
    mazeState.exitPosition = { ...levelData.exit };
    
    // Réinitialiser la grille
    mazeState.grid = [];
    
    // Générer une grille 8x8 avec des valeurs aléatoires (0 ou 1)
    generateMazeGrid(levelData);
    
    // Mettre à jour l'interface
    updateMazeInterface();
}

/**
 * Génère la grille du labyrinthe pour un niveau
 * @param {Object} levelData - Données du niveau
 */
function generateMazeGrid(levelData) {
    // Créer une grille 8x8
    for (let y = 0; y < 8; y++) {
        const row = [];
        for (let x = 0; x < 8; x++) {
            // Valeur aléatoire par défaut
            let cellValue = Math.round(Math.random());
            
            // Pour les cellules de départ et de sortie, on s'assure qu'elles sont valides
            if ((x === mazeState.playerPosition.x && y === mazeState.playerPosition.y) || 
                (x === mazeState.exitPosition.x && y === mazeState.exitPosition.y)) {
                cellValue = mazeRules[mazeState.rule].validator(1) ? 1 : 0;
            }
            
            // Ajouter la cellule à la grille
            row.push({
                value: cellValue,
                type: 'normal', // normal, wall, gate
                gateType: null, // AND, OR, XOR, NOT
                position: { x, y }
            });
        }
        mazeState.grid.push(row);
    }
    
    // Ajouter les murs
    levelData.walls.forEach(wall => {
        if (wall.x >= 0 && wall.x < 8 && wall.y >= 0 && wall.y < 8) {
            mazeState.grid[wall.y][wall.x].type = 'wall';
        }
    });
    
    // Ajouter les portes logiques et calculer leurs valeurs
    levelData.gates.forEach(gate => {
        if (gate.x >= 0 && gate.x < 8 && gate.y >= 0 && gate.y < 8) {
            mazeState.grid[gate.y][gate.x].type = 'gate';
            mazeState.grid[gate.y][gate.x].gateType = gate.type;
            mazeState.grid[gate.y][gate.x].inputs = gate.inputs;
            
            // Calculer la valeur de la porte logique
            updateGateValue(gate.x, gate.y);
        }
    });
}

/**
 * Met à jour la valeur d'une porte logique basée sur ses entrées
 * @param {number} x - Coordonnée X de la porte
 * @param {number} y - Coordonnée Y de la porte
 */
function updateGateValue(x, y) {
    const cell = mazeState.grid[y][x];
    if (cell.type !== 'gate' || !cell.gateType || !cell.inputs) return;
    
    // Obtenir les valeurs des cellules d'entrée
    const inputValues = cell.inputs.map(input => {
        if (input.x >= 0 && input.x < 8 && input.y >= 0 && input.y < 8) {
            return mazeState.grid[input.y][input.x].value;
        }
        return 0; // Valeur par défaut si l'entrée est hors limites
    });
    
    // Calculer la nouvelle valeur selon le type de porte
    switch (cell.gateType) {
        case 'AND':
            cell.value = operators.AND(inputValues[0], inputValues[1]);
            break;
        case 'OR':
            cell.value = operators.OR(inputValues[0], inputValues[1]);
            break;
        case 'XOR':
            cell.value = operators.XOR(inputValues[0], inputValues[1]);
            break;
        case 'NOT':
            cell.value = operators.NOT(inputValues[0]);
            break;
    }
}

//==============================================================================
// DÉPLACEMENT ET INTERACTION
//==============================================================================

/**
 * Vérifie si un mouvement vers une cellule est valide
 * @param {number} x - Coordonnée X de destination
 * @param {number} y - Coordonnée Y de destination
 * @returns {boolean} - Vrai si le mouvement est valide
 */
function isValidMove(x, y) {
    // Vérifier si la position est dans les limites
    if (x < 0 || x >= 8 || y < 0 || y >= 8) return false;
    
    // Vérifier si c'est un mur
    if (mazeState.grid[y][x].type === 'wall') return false;
    
    // Vérifier si la cellule respecte la règle actuelle
    return mazeRules[mazeState.rule].validator(mazeState.grid[y][x].value);
}

/**
 * Déplace le joueur dans une direction donnée
 * @param {string} direction - Direction: 'up', 'down', 'left', 'right'
 */
function movePlayer(direction) {
    // Ne rien faire si le jeu est terminé
    if (mazeState.state !== 'playing') return;
    
    // Calculer la nouvelle position
    let newX = mazeState.playerPosition.x;
    let newY = mazeState.playerPosition.y;
    
    switch (direction) {
        case 'up':
            newY--;
            break;
        case 'down':
            newY++;
            break;
        case 'left':
            newX--;
            break;
        case 'right':
            newX++;
            break;
    }
    
    // Vérifier si le mouvement est valide
    if (isValidMove(newX, newY)) {
        // Mettre à jour la position du joueur
        mazeState.playerPosition.x = newX;
        mazeState.playerPosition.y = newY;
        mazeState.moves++;
        
        // Jouer un son
        playKeySound();
        
        // Mettre à jour l'interface
        updateMazeInterface();
        
        // Vérifier si le joueur a atteint la sortie
        checkWinCondition();
    } else {
        // Son d'erreur si le mouvement est invalide
        playSound(audio.error);
    }
}

/**
 * Vérifie si le joueur a atteint la sortie du niveau
 */
function checkWinCondition() {
    if (mazeState.playerPosition.x === mazeState.exitPosition.x && 
        mazeState.playerPosition.y === mazeState.exitPosition.y) {
        // Niveau terminé
        mazeState.state = 'won';
        
        // Son de succès
        playSound(audio.success);
        
        // Si c'est le dernier niveau, marquer le puzzle comme complété
        if (mazeState.currentLevel === mazeState.totalLevels) {
            completeBinaryMazePuzzle();
        } else {
            // Sinon, afficher un message de succès et permettre de passer au niveau suivant
            showNextLevelOption();
        }
    }
}

/**
 * Affiche l'option pour passer au niveau suivant
 */
function showNextLevelOption() {
    showMazeMessage(`Niveau ${mazeState.currentLevel} complété! Prêt pour le niveau suivant?`, "success");
    
    // Ajouter un bouton pour passer au niveau suivant
    const messageElement = document.getElementById('maze-message');
    if (messageElement) {
        const nextLevelButton = document.createElement('div');
        nextLevelButton.className = 'btn';
        nextLevelButton.textContent = 'Niveau suivant';
        nextLevelButton.style.marginTop = '10px';
        nextLevelButton.onclick = () => loadNextLevel();
        messageElement.appendChild(nextLevelButton);
    }
}

/**
 * Charge le niveau suivant
 */
function loadNextLevel() {
    if (mazeState.currentLevel < mazeState.totalLevels) {
        mazeState.currentLevel++;
        mazeState.moves = 0;
        mazeState.state = 'playing';
        loadMazeLevel(mazeState.currentLevel);
        
        // Effacer le message
        showMazeMessage("");
    }
}

//==============================================================================
// RÉINITIALISATION ET COMPLÉTION
//==============================================================================

/**
 * Réinitialise le niveau actuel
 */
function resetMazeLevel() {
    mazeState.moves = 0;
    mazeState.state = 'playing';
    loadMazeLevel(mazeState.currentLevel);
    
    // Effacer le message
    showMazeMessage("");
    
    // Jouer un son
    playKeySound();
}

/**
 * Marque le puzzle comme complété
 */
function completeBinaryMazePuzzle() {
    // Marquer le puzzle comme complété et sauvegarder l'état
    if (puzzleState) {
        puzzleState.binaryMazeCompleted = true;
        puzzleState.save();
    }
    
    // Afficher une notification de victoire
    showNotification(
        'LABYRINTHE LOGIQUE MAÎTRISÉ',
        'Vous avez navigué avec succès à travers tous les niveaux du labyrinthe binaire',
        'Une nouvelle voie vers le protocole BLACKOUT est ouverte.',
        'success',
        5000
    );
    
    // IRIS réagit
    triggerIrisVoice("Vous avez décrypté le labyrinthe. Votre maîtrise de la logique binaire est... impressionnante, mais insuffisante pour m'arrêter.");
    
    // Mettre à jour l'interface
    document.getElementById('maze-state').textContent = "Complété";
    showMazeMessage("Félicitations! Vous avez terminé tous les niveaux du labyrinthe logique binaire!", "success");
    
    // Si les autres puzzles sont également complétés, déverrouiller le protocole BLACKOUT
    checkPuzzleCompletionForBlackout();
}

/**
 * Vérifie si assez de puzzles sont complétés pour débloquer BLACKOUT
 */
function checkPuzzleCompletionForBlackout() {
    // On considère que si le joueur complète le labyrinthe binaire, cela compte comme un puzzle supplémentaire
    let completedPuzzles = 0;
    
    if (puzzleState.memoryCompleted) completedPuzzles++;
    if (puzzleState.decryptCompleted) completedPuzzles++;
    if (puzzleState.sequenceCompleted) completedPuzzles++;
    if (puzzleState.binaryMazeCompleted) completedPuzzles++;
    
    // Si au moins trois puzzles sont complétés, déverrouiller le protocole BLACKOUT
    if (completedPuzzles >= 3) {
        lockedSections['protocols'] = false;
        
        // Montrer une notification après un délai
        setTimeout(() => {
            showNotification(
                'ACCÈS DÉVERROUILLÉ',
                'Protocole BLACKOUT désormais accessible',
                'Vous avez complété suffisamment de puzzles pour y accéder.',
                'success',
                5000
            );
        }, 2000);
    }
}

//==============================================================================
// INTERFACE UTILISATEUR
//==============================================================================

/**
 * Met à jour l'interface du labyrinthe
 */
function updateMazeInterface() {
    // Mettre à jour les statistiques
    updateMazeStats();
    
    // Mettre à jour la description de la règle
    updateMazeRules();
    
    // Mettre à jour la grille visuelle
    updateMazeGrid();
}

/**
 * Met à jour les statistiques affichées
 */
function updateMazeStats() {
    // Niveau actuel
    const levelElement = document.getElementById('maze-level');
    if (levelElement) {
        levelElement.textContent = `${mazeState.currentLevel}/${mazeState.totalLevels}`;
    }
    
    // Nombre de mouvements
    const movesElement = document.getElementById('maze-moves');
    if (movesElement) {
        movesElement.textContent = mazeState.moves.toString();
    }
    
    // État du jeu
    const stateElement = document.getElementById('maze-state');
    if (stateElement) {
        stateElement.textContent = mazeState.state === 'playing' ? "En cours" : 
                                  (mazeState.state === 'won' ? "Gagné" : "Perdu");
    }
}

/**
 * Met à jour l'affichage des règles du niveau
 */
function updateMazeRules() {
    const rulesLevelElement = document.getElementById('maze-level-rules');
    if (rulesLevelElement) {
        rulesLevelElement.textContent = mazeState.currentLevel;
    }
    
    const ruleDescElement = document.getElementById('maze-rule-description');
    if (ruleDescElement) {
        ruleDescElement.innerHTML = `
            <p>Déplacez le curseur (●) vers la sortie (★) en respectant les règles binaires.</p>
            <p>Règle actuelle: ${mazeRules[mazeState.rule].description}</p>
        `;
    }
}

/**
 * Met à jour la grille visuelle du labyrinthe
 */
function updateMazeGrid() {
    const mazeGrid = document.getElementById('maze-grid');
    if (!mazeGrid) {
        console.error("Élément 'maze-grid' non trouvé");
        return;
    }
    
    // Vider la grille
    mazeGrid.innerHTML = '';
    
    // Créer les cellules
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            createMazeCell(x, y, mazeGrid);
        }
    }
}

/**
 * Crée une cellule du labyrinthe dans la grille
 * @param {number} x - Coordonnée X de la cellule
 * @param {number} y - Coordonnée Y de la cellule
 * @param {HTMLElement} container - Conteneur DOM pour la grille
 */
function createMazeCell(x, y, container) {
    const cell = document.createElement('div');
    cell.className = 'maze-cell';
    cell.dataset.x = x;
    cell.dataset.y = y;
    
    // Contenu de la cellule selon son type
    if (x === mazeState.playerPosition.x && y === mazeState.playerPosition.y) {
        // Position du joueur
        cell.classList.add('current');
        cell.innerHTML = `<span class="maze-cursor">●</span>${mazeState.grid[y][x].value}`;
    } else if (x === mazeState.exitPosition.x && y === mazeState.exitPosition.y) {
        // Sortie
        cell.classList.add('exit');
        cell.innerHTML = `<span class="maze-exit">★</span>${mazeState.grid[y][x].value}`;
    } else if (mazeState.grid[y][x].type === 'wall') {
        // Mur
        cell.classList.add('wall');
        cell.innerHTML = `<span class="maze-wall">■</span>`;
    } else if (mazeState.grid[y][x].type === 'gate') {
        // Porte logique
        cell.classList.add('gate');
        cell.innerHTML = `<span class="maze-gate-${mazeState.grid[y][x].gateType.toLowerCase()}">${mazeState.grid[y][x].gateType}</span>${mazeState.grid[y][x].value}`;
    } else {
        // Cellule normale
        cell.textContent = mazeState.grid[y][x].value;
        
        // Ajouter une classe selon que la cellule respecte ou non la règle
        if (mazeRules[mazeState.rule].validator(mazeState.grid[y][x].value)) {
            cell.classList.add('valid');
        } else {
            cell.classList.add('invalid');
        }
    }
    
    // Ajouter la cellule à la grille
    container.appendChild(cell);
}

/**
 * Affiche un message dans l'interface du labyrinthe
 * @param {string} message - Message à afficher
 * @param {string} type - Type de message: 'info', 'success', 'error'
 */
function showMazeMessage(message, type = "info") {
    const messageElement = document.getElementById('maze-message');
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.className = `maze-message ${type}`;
}

//==============================================================================
// GESTION DES ÉVÉNEMENTS
//==============================================================================

/**
 * Ajoute les écouteurs d'événements pour les contrôles
 */
function addMazeEventListeners() {
    // Écouteurs pour les boutons de direction
    document.getElementById('key-up')?.addEventListener('click', () => movePlayer('up'));
    document.getElementById('key-down')?.addEventListener('click', () => movePlayer('down'));
    document.getElementById('key-left')?.addEventListener('click', () => movePlayer('left'));
    document.getElementById('key-right')?.addEventListener('click', () => movePlayer('right'));
    
    // Écouteur pour le bouton de réinitialisation
    document.getElementById('maze-reset')?.addEventListener('click', resetMazeLevel);
    
    // Écouteur pour les touches clavier
    document.addEventListener('keydown', handleMazeKeydown);
}

/**
 * Gère les événements clavier pour le labyrinthe
 * @param {KeyboardEvent} event - Événement clavier
 */
function handleMazeKeydown(event) {
    // Ne traiter que si l'interface du labyrinthe est active
    if (currentInterface !== 'binaryMaze') return;
    
    switch (event.key) {
        case 'ArrowUp':
            movePlayer('up');
            event.preventDefault();
            break;
        case 'ArrowDown':
            movePlayer('down');
            event.preventDefault();
            break;
        case 'ArrowLeft':
            movePlayer('left');
            event.preventDefault();
            break;
        case 'ArrowRight':
            movePlayer('right');
            event.preventDefault();
            break;
        case 'r':
            resetMazeLevel();
            event.preventDefault();
            break;
    }
}

//==============================================================================
// INTÉGRATION AVEC LE RESTE DE L'APPLICATION
//==============================================================================

/**
 * Affiche l'interface du labyrinthe binaire
 */
function showBinaryMazeInterface() {
    showInterface('binaryMaze');
    initializeBinaryMaze();
}

// Intégration avec le système d'actions
// // const originalPerformAction = performAction; // Commenté pour éviter les redéclarations // Commenté pour éviter les redéclarations
window.window.performAction = function(action) {
    switch (action) {
        case 'binaryMaze':
            showBinaryMazeInterface();
            break;
        case 'resetMaze':
            resetMazeLevel();
            break;
        default:
            // Appeler la fonction originale pour les autres actions
            originalPerformAction(action);
    }
};

// Initialiser le puzzle si l'état n'existe pas déjà
if (puzzleState && !puzzleState.hasOwnProperty('binaryMazeCompleted')) {
    puzzleState.binaryMazeCompleted = false;
    puzzleState.save();
}

// Exporter les fonctions publiques
window.initializeBinaryMaze = initializeBinaryMaze;
window.resetMazeLevel = resetMazeLevel;
window.movePlayer = movePlayer;