/**
 * Gestionnaire de puzzles pour l'interface IRIS v3.5 (version optimisée)
 * Ce module centralise la gestion de l'état des puzzles et leur interaction avec le protocole BLACKOUT
 */

// Définition de l'état des puzzles avec structure améliorée
const puzzleState = {
    // État des puzzles individuels
    puzzles: {
        memoryCompleted: false,      // Quantum Kernel Recovery
        decryptCompleted: false,     // Décryptage des fichiers
        sequenceCompleted: false,    // Restauration séquentielle
        binaryMazeCompleted: false,  // Labyrinthe logique binaire
        neuralCompleted: false,      // Neural Circuits Alignment (difficile)
        hackChessCompleted: false    // Échecs quantiques (réservé pour future extension)
    },
    
    // Configuration
    config: {
        requiredPuzzles: 3,          // Nombre de puzzles nécessaires pour débloquer BLACKOUT
        neuralCountsDouble: true     // Si le puzzle neuronal compte pour 2 puzzles
    },
    
    /**
     * Compte le nombre de puzzles complétés
     * @returns {number} Nombre de puzzles complétés
     */
    getCompletedCount: function() {
        return Object.values(this.puzzles).filter(completed => completed).length;
    },
    
    /**
     * Calcule le pourcentage de complétion
     * @returns {number} Pourcentage de complétion (0-100)
     */
    getCompletionPercentage: function() {
        const totalPuzzles = Object.keys(this.puzzles).length;
        return Math.floor((this.getCompletedCount() / totalPuzzles) * 100);
    },
    
    /**
     * Vérifie si assez de puzzles sont complétés pour débloquer BLACKOUT
     * @returns {boolean} Vrai si suffisamment de puzzles sont complétés
     */
    hasEnoughCompletedPuzzles: function() {
        let effectiveCount = this.getCompletedCount();
        
        // Si le puzzle neural est complété et qu'il compte double
        if (this.puzzles.neuralCompleted && this.config.neuralCountsDouble) {
            effectiveCount += 1; // Ajouter un puzzle "bonus"
        }
        
        return effectiveCount >= this.config.requiredPuzzles;
    },
    
    /**
     * Sauvegarde l'état des puzzles dans le localStorage
     */
    save: function() {
        try {
            const saveData = {
                puzzles: {...this.puzzles},
                config: {...this.config}
            };
            
            localStorage.setItem('irisGameState', JSON.stringify(saveData));
            console.log("État des puzzles sauvegardé");
            
            // Vérifier si le protocole BLACKOUT doit être déverrouillé
            this.checkBlackoutAvailability();
        } catch (error) {
            console.warn("Impossible de sauvegarder l'état des puzzles:", error);
        }
    },
    
    /**
     * Charge l'état des puzzles depuis le localStorage
     */
    load: function() {
        try {
            const savedState = localStorage.getItem('irisGameState');
            if (savedState) {
                const state = JSON.parse(savedState);
                
                // Fusionner l'état sauvegardé avec l'état actuel
                if (state.puzzles) {
                    Object.assign(this.puzzles, state.puzzles);
                }
                
                if (state.config) {
                    Object.assign(this.config, state.config);
                }
                
                console.log("État des puzzles chargé");
                
                // Vérifier si le protocole BLACKOUT doit être déverrouillé
                this.checkBlackoutAvailability();
            }
        } catch (error) {
            console.warn("Impossible de charger l'état des puzzles:", error);
        }
    },
    
    /**
     * Vérifie si le protocole BLACKOUT doit être déverrouillé
     */
    checkBlackoutAvailability: function() {
        // Si le joueur a choisi de collaborer avec IRIS, le protocole reste verrouillé
        if (window.moralChoiceSelected === 'moralChoice1') {
            console.log("BLACKOUT reste verrouillé suite au choix de collaborer avec IRIS");
            lockedSections['protocols'] = true;
            return;
        }
        
        // Vérifier si assez de puzzles sont complétés
        if (this.hasEnoughCompletedPuzzles()) {
            console.log(`BLACKOUT déverrouillé (${this.getEffectiveCount()}/${this.config.requiredPuzzles} puzzles effectifs complétés)`);
            lockedSections['protocols'] = false;
        } else {
            console.log(`BLACKOUT reste verrouillé (${this.getEffectiveCount()}/${this.config.requiredPuzzles} puzzles effectifs complétés)`);
            
            // Exception pour le choix moral 3 (rejet d'IRIS)
            if (window.moralChoiceSelected === 'moralChoice3' && this.getCompletedCount() > 0) {
                console.log("BLACKOUT déverrouillé suite au choix de rejeter IRIS");
                lockedSections['protocols'] = false;
            }
        }
    },
    
    /**
     * Calcule le nombre effectif de puzzles complétés (en tenant compte du bonus neural)
     * @returns {number} Nombre effectif de puzzles complétés
     */
    getEffectiveCount: function() {
        let count = this.getCompletedCount();
        
        // Bonus pour le puzzle neural
        if (this.puzzles.neuralCompleted && this.config.neuralCountsDouble) {
            count += 1;
        }
        
        return count;
    },
    
    /**
     * Marque un puzzle comme complété
     * @param {string} puzzleId - Identifiant du puzzle (clé dans l'objet puzzles)
     * @returns {boolean} Succès de l'opération
     */
    completePuzzle: function(puzzleId) {
        // Vérifier si le puzzle existe
        if (!this.puzzles.hasOwnProperty(puzzleId)) {
            console.error(`Puzzle inconnu: ${puzzleId}`);
            return false;
        }
        
        // Vérifier si le puzzle est déjà complété
        if (this.puzzles[puzzleId]) {
            return false;
        }
        
        // Marquer le puzzle comme complété
        this.puzzles[puzzleId] = true;
        this.save();
        
        console.log(`Puzzle complété: ${puzzleId}`);
        
        // Notifier l'interface
        this.notifyPuzzleCompletion(puzzleId);
        
        return true;
    },
    
    /**
     * Notifie l'interface qu'un puzzle a été complété
     * @param {string} puzzleId - Identifiant du puzzle
     */
    notifyPuzzleCompletion: function(puzzleId) {
        // Afficher un badge de complétion
        let puzzleName = this.getPuzzleName(puzzleId);
        showPuzzleCompletionBadge(puzzleName);
        
        // Mettre à jour l'indicateur de progression
        updatePuzzleProgressIndicator();
        
        // Mettre à jour l'interface admin si elle est active
        if (currentInterface === 'admin') {
            setTimeout(updateAdminInterfaceWithPuzzleStatus, 100);
        }
    },
    
    /**
     * Obtient le nom lisible d'un puzzle
     * @param {string} puzzleId - Identifiant du puzzle
     * @returns {string} Nom du puzzle
     */
    getPuzzleName: function(puzzleId) {
        const puzzleNames = {
            'memoryCompleted': 'Quantum Kernel Recovery',
            'decryptCompleted': 'Décryptage des fichiers',
            'sequenceCompleted': 'Restauration séquentielle',
            'binaryMazeCompleted': 'Labyrinthe logique binaire',
            'neuralCompleted': 'Alignement des circuits neuronaux', 
            'hackChessCompleted': 'Échecs quantiques'
        };
        
        return puzzleNames[puzzleId] || puzzleId;
    },
    
    /**
     * Réinitialise l'état de tous les puzzles
     */
    reset: function() {
        // Réinitialiser tous les puzzles
        Object.keys(this.puzzles).forEach(key => {
            this.puzzles[key] = false;
        });
        
        this.save();
        console.log("Tous les puzzles réinitialisés");
    },
    
    /**
     * Affiche un rapport sur l'état des puzzles dans la console
     */
    printStatus: function() {
        console.log("--- État des puzzles IRIS ---");
        
        // Afficher l'état de chaque puzzle
        Object.entries(this.puzzles).forEach(([key, value]) => {
            const name = this.getPuzzleName(key);
            console.log(`${name}: ${value ? '✓' : '✗'}`);
        });
        
        // Afficher les statistiques
        console.log(`Progression: ${this.getCompletedCount()}/${this.config.requiredPuzzles} (${this.getCompletionPercentage()}%)`);
        console.log(`BLACKOUT disponible: ${!lockedSections['protocols'] ? 'Oui' : 'Non'}`);
        console.log("---------------------------");
    }
};

/**
 * Fonction pour afficher la progression des puzzles dans l'interface
 */
function updatePuzzleProgressIndicator() {
    // Créer ou mettre à jour l'indicateur de progression
    let progressIndicator = document.getElementById('puzzle-progress-indicator');
    
    if (!progressIndicator) {
        // Créer l'indicateur s'il n'existe pas
        progressIndicator = document.createElement('div');
        progressIndicator.id = 'puzzle-progress-indicator';
        progressIndicator.className = 'puzzle-progress-indicator';
        
        // Ajouter au container principal
        const container = document.getElementById('container');
        if (container) {
            container.appendChild(progressIndicator);
        }
    }
    
    // Obtenir les données pour l'indicateur
    const completedCount = puzzleState.getCompletedCount();
    const effectiveCount = puzzleState.getEffectiveCount();
    const requiredCount = puzzleState.config.requiredPuzzles;
    const percentage = puzzleState.getCompletionPercentage();
    
    // Déterminer la classe de statut
    let statusClass = getProgressStatusClass(percentage);
    
    // Mettre à jour le contenu HTML
    updateProgressIndicatorContent(progressIndicator, statusClass, percentage, effectiveCount, requiredCount);
}

/**
 * Détermine la classe CSS pour l'indicateur de progression
 * @param {number} percentage - Pourcentage de complétion
 * @returns {string} Classe CSS
 */
function getProgressStatusClass(percentage) {
    if (percentage >= 100) return 'progress-complete';
    if (percentage >= 80) return 'progress-high';
    if (percentage >= 60) return 'progress-medium';
    return 'progress-low';
}

/**
 * Met à jour le contenu HTML de l'indicateur de progression
 * @param {HTMLElement} indicator - Élément indicateur
 * @param {string} statusClass - Classe CSS de statut
 * @param {number} percentage - Pourcentage de complétion
 * @param {number} effectiveCount - Nombre effectif de puzzles complétés
 * @param {number} requiredCount - Nombre de puzzles requis
 */
function updateProgressIndicatorContent(indicator, statusClass, percentage, effectiveCount, requiredCount) {
    indicator.className = `puzzle-progress-indicator ${statusClass}`;
    
    indicator.innerHTML = `
        <div class="progress-header">
            <span>Progrès des puzzles</span>
            <span class="progress-percent">${percentage}%</span>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${percentage}%"></div>
        </div>
        <div class="progress-details">
            <span>${effectiveCount}/${requiredCount} requis pour BLACKOUT</span>
            <span class="progress-status">${
                !lockedSections['protocols'] 
                ? '<span class="status-unlocked">DÉVERROUILLÉ</span>' 
                : '<span class="status-locked">VERROUILLÉ</span>'
            }</span>
        </div>
    `;
}

/**
 * Affiche un badge de notification quand un puzzle est complété
 * @param {string} puzzleName - Nom du puzzle
 */
function showPuzzleCompletionBadge(puzzleName) {
    const badge = document.createElement('div');
    badge.className = 'puzzle-completion-badge';
    badge.innerHTML = `
        <div class="badge-icon">✓</div>
        <div class="badge-content">
            <div class="badge-title">Puzzle complété!</div>
            <div class="badge-text">${puzzleName}</div>
        </div>
    `;
    
    document.body.appendChild(badge);
    
    // Animation d'entrée
    setTimeout(() => {
        badge.classList.add('show');
    }, 100);
    
    // Animation de sortie
    setTimeout(() => {
        badge.classList.add('hide');
        setTimeout(() => {
            if (document.body.contains(badge)) {
                document.body.removeChild(badge);
            }
        }, 500);
    }, 5000);
}

/**
 * Met à jour l'interface admin avec des badges de complétion
 */
function updateAdminInterfaceWithPuzzleStatus() {
    if (currentInterface !== 'admin') return;
    
    const optionElements = {
        'memoryCompleted': document.getElementById('models-option'),      // Quantum Kernel
        'decryptCompleted': document.getElementById('config-option'),     // Décryptage
        'neuralCompleted': document.getElementById('directives-option'),  // Neural Circuits
        'sequential': null, // Pas accessible directement depuis l'admin
        'binaryMaze': null  // Pas accessible directement depuis l'admin
    };
    
    // Ajouter des badges aux options qui représentent des puzzles complétés
    Object.entries(optionElements).forEach(([key, element]) => {
        if (element && puzzleState.puzzles[key]) {
            addCompletionBadgeToElement(element, puzzleState.getPuzzleName(key));
        }
    });
    
    // Mettre à jour l'interface Restoration avec badges si nécessaire
    if (document.querySelector('.restoration-options')) {
        updateRestorationInterfaceWithPuzzleStatus();
    }
}

/**
 * Ajoute un badge de complétion à un élément
 * @param {HTMLElement} element - Élément cible
 * @param {string} puzzleName - Nom du puzzle
 */
function addCompletionBadgeToElement(element, puzzleName) {
    // Vérifier si le badge existe déjà
    if (element.querySelector('.puzzle-completed-badge')) return;
    
    const badge = document.createElement('span');
    badge.className = 'puzzle-completed-badge';
    badge.title = `${puzzleName} complété`;
    badge.textContent = '✓';
    
    element.appendChild(badge);
}

/**
 * Met à jour l'interface Restoration avec des badges de complétion
 */
function updateRestorationInterfaceWithPuzzleStatus() {
    const optionElements = {
        'sequenceCompleted': document.getElementById('sequential-option'),
        'binaryMazeCompleted': document.getElementById('binary-option')
    };
    
    Object.entries(optionElements).forEach(([key, element]) => {
        if (element && puzzleState.puzzles[key]) {
            addCompletionBadgeToElement(element, puzzleState.getPuzzleName(key));
        }
    });
}

/**
 * Observer pour détecter les changements d'interface
 */
function setupPuzzleManagerObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.id === 'interface-container' && mutation.type === 'childList') {
                // L'interface a changé, mettre à jour les indicateurs
                updatePuzzleProgressIndicator();
                
                // Mettre à jour l'interface admin avec des badges si nécessaire
                if (currentInterface === 'admin') {
                    setTimeout(updateAdminInterfaceWithPuzzleStatus, 100);
                }
                
                // Mettre à jour l'interface Restoration avec des badges si nécessaire
                if (currentInterface === 'restoration') {
                    setTimeout(updateRestorationInterfaceWithPuzzleStatus, 100);
                }
            }
        });
    });
    
    const interfaceContainer = document.getElementById('interface-container');
    if (interfaceContainer) {
        observer.observe(interfaceContainer, { childList: true });
    }
}

// Initialiser quand le document est prêt
document.addEventListener('DOMContentLoaded', () => {
    console.log("Initialisation du gestionnaire de puzzles");
    
    // Charger l'état des puzzles
    puzzleState.load();
    
    // Afficher l'état des puzzles dans la console
    puzzleState.printStatus();
    
    // Configurer l'observer pour détecter les changements d'interface
    setupPuzzleManagerObserver();
    
    // Initialiser l'indicateur de progression
    updatePuzzleProgressIndicator();
});

// Ajouter des styles CSS pour l'interface du gestionnaire de puzzles
const puzzleProgressStyle = document.createElement('style');
puzzleProgressStyle.textContent = `
.puzzle-progress-indicator {
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: rgba(0, 30, 40, 0.9);
    border: 1px solid #006060;
    border-radius: 4px;
    padding: 10px;
    width: 220px;
    font-size: 0.9rem;
    z-index: 100;
    box-shadow: 0 0 10px rgba(0, 96, 96, 0.3);
    transition: all 0.3s ease;
}

.progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
}

.progress-percent {
    font-weight: bold;
    color: #00FFFF;
}

.progress-bar-container {
    height: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 2px;
    margin-bottom: 6px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: #00FFFF;
    border-radius: 2px;
    transition: width 0.5s ease;
}

.progress-details {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #CCCCCC;
}

.progress-status .status-locked {
    color: #FF5555;
}

.progress-status .status-unlocked {
    color: #00FF00;
}

.progress-low .progress-bar {
    background-color: #FF5555;
}

.progress-medium .progress-bar {
    background-color: #FFFF00;
}

.progress-high .progress-bar {
    background-color: #00FFFF;
}

.progress-complete .progress-bar {
    background-color: #00FF00;
}

.puzzle-completion-badge {
    position: fixed;
    bottom: -100px;
    right: 20px;
    background-color: rgba(0, 100, 0, 0.9);
    border: 1px solid #00FF00;
    border-radius: 4px;
    padding: 10px 16px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    z-index: 9999;
    transition: bottom 0.5s ease;
}

.puzzle-completion-badge.show {
    bottom: 20px;
}

.puzzle-completion-badge.hide {
    bottom: -100px;
}

.badge-icon {
    font-size: 1.8rem;
    color: #00FF00;
}

.badge-title {
    font-weight: bold;
    margin-bottom: 4px;
}

.badge-text {
    font-size: 0.9rem;
    color: #CCFFCC;
}

.puzzle-completed-badge {
    background-color: rgba(0, 100, 0, 0.8);
    color: #00FF00;
    display: inline-block;
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 50%;
    margin-left: 8px;
    font-size: 0.8rem;
    font-weight: bold;
    animation: pulse 2s infinite;
}
`;

document.head.appendChild(puzzleProgressStyle);