/**
 * Système de chargement pour l'interface IRIS v3.5
 * Module optimisé pour initialiser l'application de manière séquentielle et fiable
 */

// Objet Loader pour gérer toutes les initialisations
const Loader = {
    // Liste des modules à charger
    modules: [
        { name: 'audio', loaded: false, init: initializeAudio },
        { name: 'templates', loaded: false, init: initializeTemplates },
        { name: 'navigation', loaded: false, init: initializeNavigation },
        { name: 'game-logic', loaded: false, init: initializeGameLogic },
        { name: 'puzzles', loaded: false, init: initializePuzzles },
        { name: 'maintenance', loaded: false, init: initializeMaintenanceModule },
        { name: 'voice', loaded: false, init: initializeIrisVoice },
        { name: 'binary-maze', loaded: false, init: initializeBinaryMaze }
    ],
    
    // État global de l'application
    initialized: false,
    
    /**
     * Démarre le processus de chargement
     */
    start: function() {
        console.log('🚀 Lancement du chargement IRIS v3.5...');
        this.clearStorage();
        this.prepareStartScreen();
        this.initializeModules();
    },
    
    /**
     * Nettoie le stockage local pour assurer un démarrage propre
     */
    clearStorage: function() {
        try {
            localStorage.removeItem('irisAudioConfig');
            localStorage.removeItem('irisGameState');
            console.log('✓ Réinitialisation du stockage effectuée');
        } catch (error) {
            console.error('❌ Erreur lors de l\'effacement du localStorage:', error);
        }
    },
    
    /**
     * Configure l'écran d'accueil
     */
    prepareStartScreen: function() {
        // Cacher le curseur de la souris
        document.body.style.cursor = 'none';
        
        // Configurer le bouton de démarrage
        const startButton = document.getElementById('start-button');
        if (startButton) {
            startButton.addEventListener('click', startSystem);
            startButton.addEventListener('keydown', handleStartButtonKeydown);
            startButton.focus();
        }
        
        // Ajouter un gestionnaire global pour l'écran d'accueil
        document.addEventListener('keydown', handleGlobalStartKey);
        
        /**
         * Gère les touches sur le bouton de démarrage
         * @param {KeyboardEvent} event - Événement clavier
         */
        function handleStartButtonKeydown(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                startSystem();
                event.preventDefault();
            }
        }
        
        /**
         * Gère les touches globales pour démarrer le système
         * @param {KeyboardEvent} event - Événement clavier
         */
        function handleGlobalStartKey(event) {
            const splashScreen = document.getElementById('splash-screen');
            if (splashScreen && !splashScreen.classList.contains('hidden')) {
                if (event.key === 'Enter' || event.key === ' ') {
                    startSystem();
                    event.preventDefault();
                }
            }
        }
    },
    
    /**
     * Initialise tous les modules séquentiellement
     */
    initializeModules: function() {
        // Initialiser chaque module avec un délai pour éviter de bloquer le thread principal
        this.modules.forEach((module, index) => {
            setTimeout(() => {
                try {
                    if (typeof module.init === 'function') {
                        module.init();
                        module.loaded = true;
                        console.log(`✓ Module ${module.name} initialisé`);
                    } else {
                        console.warn(`⚠ Fonction d'initialisation manquante pour ${module.name}`);
                    }
                } catch (error) {
                    console.error(`❌ Erreur lors de l'initialisation de ${module.name}:`, error);
                }
                
                // Vérifier si tous les modules sont chargés
                if (index === this.modules.length - 1) {
                    this.finalize();
                }
            }, index * 100);
        });
    },
    
    /**
     * Finalise l'initialisation et notifie que l'application est prête
     */
    finalize: function() {
        this.initialized = true;
        
        // Démarrer les effets de glitch aléatoires
        if (typeof startGlitchEffects === 'function') {
            startGlitchEffects();
        }
        
        // Charger l'état des puzzles
        if (typeof puzzleState !== 'undefined' && typeof puzzleState.load === 'function') {
            puzzleState.load();
        }
        
        console.log('✅ Initialisation IRIS v3.5 terminée');
        
        // Déclencher un événement pour indiquer que tout est chargé
        document.dispatchEvent(new CustomEvent('iris-loaded'));
    }
};

/**
 * Fonctions d'initialisation pour chaque module
 * Ces stubs seront remplacés par les vraies fonctions lors du chargement
 */

/**
 * Initialise les templates d'interface
 */
function initializeTemplates() {
    if (typeof window.initializeTemplates === 'function') {
        window.initializeTemplates();
    } else {
        console.log('Initialisation des templates via le loader global');
    }
}

/**
 * Initialise la navigation
 */
function initializeNavigation() {
    // Assurer que les gestionnaires de focus sont initialisés
    if (typeof updateFocusableElements === 'function') {
        updateFocusableElements();
    }
    console.log('Navigation initialisée');
}

/**
 * Initialise la logique du jeu
 */
function initializeGameLogic() {
    // Initialisation des variables de jeu
    window.moralChoiceSelected = null;
    window.parameterAccessBlocked = false;
    window.reducedTimerByChoice = false;
    window.timerReduced = false;
    
    console.log('Logique de jeu initialisée');
}

/**
 * Initialise les puzzles
 */
function initializePuzzles() {
    // Initialiser les états des puzzles s'ils n'existent pas
    if (typeof puzzleState !== 'undefined') {
        if (!puzzleState.hasOwnProperty('binaryMazeCompleted')) {
            puzzleState.binaryMazeCompleted = false;
        }
        console.log('États des puzzles initialisés');
    }
}

/**
 * Démarre le chargement au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    Loader.start();
});

/**
 * Fonction de diagnostic exposée globalement
 * @returns {Object} État du chargement
 */
window.diagnosticLoader = function() {
    console.table(Loader.modules);
    return {
        initialized: Loader.initialized,
        modules: Loader.modules.map(m => ({ name: m.name, loaded: m.loaded }))
    };
};