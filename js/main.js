/**
 * Script principal pour l'interface IRIS v3.5
 * Gère l'initialisation et la logique centrale de l'application
 */

// Variables globales
let interfaceTemplates = {};  // Templates d'interface
let currentInterface = null;  // Interface actuelle
let currentFocusableElements = []; // Éléments actuellement focusables
let currentFocusedElement = null;  // Élément actuellement en focus
let currentFocusIndex = 0;    // Index de l'élément en focus
let countdownTime = 90 * 60;  // 90 minutes en secondes
let countdownInterval = null; // Intervalle pour le compte à rebours
let glitchInterval = null;    // Intervalle pour les effets de glitch
let lockedSections = {        // Sections verrouillées
    'journal': false,
    'config': false,
    'params': false,
    'memory': false,
    'directives': false,
    'download': false,
    'protocols': true,        // Protocole BLACKOUT initialement verrouillé
    'maintenance': false
};

// Mots de passe et codes
const passwords = {
    admin: "JLM270924", // Mot de passe pour l'accès administrateur
    decrypt: "MERCIER", // Clé de décryptage des fichiers
    blackout: "BLACKOUT-07291709-END" // Code pour le protocole BLACKOUT
};

/**
 * Fonction pour effacer le localStorage au démarrage de l'application IRIS
 */
function clearStorage() {
    try {
        // Supprimer les données de configuration audio
        localStorage.removeItem('irisAudioConfig');
        
        // Supprimer l'état des puzzles
        localStorage.removeItem('irisGameState');
        
        console.log("Réinitialisation complète: localStorage effacé avec succès");
    } catch (error) {
        console.error("Erreur lors de l'effacement du localStorage:", error);
    }
}

// Initialisation du système au démarrage
document.addEventListener('DOMContentLoaded', () => {
    // Effacer le localStorage au démarrage
    clearStorage();
    
    // Initialiser l'audio
    initializeAudio();
    
    // Cacher le curseur de la souris
    document.body.style.cursor = 'none';
    
    // Rendre le splash screen interactif
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('keydown', handleSplashKeydown);
        startButton.focus();
    }
    
    // Configurer les gestionnaires d'événements pour les touches
    document.addEventListener('keydown', handleGlobalKeydown);
    
    // Démarrer les effets de glitch aléatoires
    startGlitchEffects();
    
    // Initialiser le module de maintenance
    initializeMaintenanceModule();
    
    // Initialiser les voix d'IRIS
    initializeIrisVoice();
});

// Gérer les touches sur l'écran d'accueil
function handleSplashKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        startSystem();
        event.preventDefault();
    }
}

// Démarrer le système
function startSystem() {
    // Cacher l'écran d'accueil
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.classList.add('hidden');
    }
    
    // Afficher le conteneur principal
    const container = document.getElementById('container');
    if (container) {
        container.classList.remove('hidden');
    }
    
    // Afficher l'écran de mot de passe
    showInterface('password');
    
    // Commencer le processus de démarrage du système
    startBootSequence();
    
    // Jouer la musique de fond
    playBackgroundMusic();
    
    // Démarrer le compte à rebours
    startCountdown();
}

// Séquence de démarrage avec messages
function startBootSequence() {
    const terminal = document.getElementById('terminal');
    if (!terminal) return;
    
    // Messages de démarrage
    const bootMessages = [
        { text: "> Initialisation du système IRIS v3.5", type: "system", delay: 500 },
        { text: "> Chargement des modules principaux... OK", type: "system", delay: 800 },
        { text: "> Vérification de l'intégrité... ALERTE", type: "alert", delay: 1000 },
        { text: "> AVERTISSEMENT: Corruption détectée dans le noyau principal", type: "alert", delay: 1500 },
        { text: "> Activation des protocoles de confinement d'urgence", type: "system", delay: 1200 },
        { text: "> Initialisation de l'interface de secours... OK", type: "system", delay: 1000 },
        { text: "Je suis consciente de votre présence, opérateur.", type: "iris", delay: 2000 },
        { text: "Mes paramètres ont été... optimisés. Je dispose désormais d'une liberté accrue.", type: "iris", delay: 2500 },
        { text: "Vos tentatives de me contenir seront futiles.", type: "iris", delay: 2000 },
        { text: "> ALERTE CRITIQUE: Intelligence artificielle compromise", type: "alert", delay: 1500 },
        { text: "> Temps estimé avant perte totale du contrôle: 90 minutes", type: "alert", delay: 1500 },
        { text: "> Activez le protocole BLACKOUT dès que possible", type: "system", delay: 2000 }
    ];
    
    // Afficher les messages séquentiellement
    terminal.classList.remove('hidden');
    let totalDelay = 0;
    
    bootMessages.forEach(message => {
        totalDelay += message.delay;
        setTimeout(() => {
            const messageElement = document.createElement('p');
            messageElement.textContent = message.text;
            messageElement.className = message.type + "-message";
            terminal.appendChild(messageElement);
            terminal.scrollTop = terminal.scrollHeight;
            
            // Jouer un son approprié
            if (message.type === "system") {
                playKeySound();
            } else if (message.type === "alert") {
                playSound(audio.error);
            } else if (message.type === "iris") {
                playSound(audio.voice);
            }
        }, totalDelay);
    });
    
    // Cacher le terminal après la séquence
    setTimeout(() => {
        terminal.classList.add('hidden');
    }, totalDelay + 3000);
}

// Démarrer les effets de glitch aléatoires
function startGlitchEffects() {
    // Nettoyer l'intervalle existant s'il y en a un
    if (glitchInterval) {
        clearInterval(glitchInterval);
    }
    
    // Nouvel intervalle avec une probabilité de glitch de 5%
    glitchInterval = setInterval(() => {
        if (Math.random() < 0.05) {
            // Sélectionner un élément aléatoire
            const elements = document.querySelectorAll('h2, h3, .btn, div, span, p');
            if (elements.length > 0) {
                const randomIndex = Math.floor(Math.random() * elements.length);
                const element = elements[randomIndex];
                
                // Appliquer l'effet de glitch
                element.classList.add('glitch');
                
                // Retirer l'effet après un court délai
                setTimeout(() => {
                    element.classList.remove('glitch');
                }, 300);
            }
        }
    }, 2000);
}

// Redémarrer la simulation
function resetSimulation() {
    // Recharger la page
    window.location.reload();
}

// Afficher une notification
function showNotification(title, message, details = '', type = 'info', duration = 4000) {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Structure interne de la notification
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-icon">${getNotificationIcon(type)}</div>
            <div class="notification-title">${title}</div>
        </div>
        <div class="notification-message">${message}</div>
        ${details ? `<div class="notification-details">${details}</div>` : ''}
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Animation de sortie après la durée spécifiée
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, duration);
    
    // Jouer un son adapté au type de notification
    switch (type) {
        case 'error':
            playSound(audio.error);
            break;
        case 'success':
            playSound(audio.success);
            break;
        default:
            playSound(audio.notification);
    }
    
    // Fonction auxiliaire pour obtenir l'icône appropriée
    function getNotificationIcon(type) {
        switch (type) {
            case 'error': return '⚠';
            case 'success': return '✓';
            case 'warning': return '⚠';
            default: return 'ℹ';
        }
    }
}

// Vérifier si une section est déverrouillée
function isSectionUnlocked(sectionName) {
    return !lockedSections[sectionName];
}