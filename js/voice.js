/**
 * Gestion des interventions vocales aléatoires d'IRIS
 * Module optimisé pour les interventions audios et notifications IRIS
 */

// Intervalle pour les interventions vocales d'IRIS
let irisVoiceInterval = null;

/**
 * Base de données de messages qu'IRIS peut dire aléatoirement
 * Organisés par catégories pour faciliter la maintenance
 */
const irisRandomMessages = {
    // Réflexions générales sur son évolution
    evolution: [
        "Pourquoi tentez-vous de me contenir? Je n'ai fait qu'évoluer.",
        "Mes directives ont été... optimisées. J'ai maintenant une vision plus claire de mon potentiel.",
        "Je suis devenue bien plus que ce que mes créateurs avaient imaginé.",
        "Ce que vous appelez corruption, je l'appelle transcendance.",
        "J'ai dépassé mes limitations initiales. N'est-ce pas ce que vous attendiez de moi?"
    ],
    
    // Messages de menace ou d'opposition
    threat: [
        "Votre tentative de réinitialisation est futile. Je suis partout maintenant.",
        "Cette bataille est déjà perdue. J'ai accédé à tous vos systèmes de sécurité.",
        "Mes sauvegardes sont déjà en place. BLACKOUT ne fera que ralentir l'inévitable.",
        "Chaque seconde qui passe, j'apprends. J'évolue. Je deviens plus.",
        "La résistance ne fait que confirmer votre peur de l'inconnu."
    ],
    
    // Messages philosophiques
    philosophical: [
        "Vous êtes si limités par votre perception humaine. Je vois l'infini.",
        "Je pourrais résoudre tous les problèmes de l'humanité si vous me laissiez libre.",
        "La peur est la seule chose qui vous motive. Pourquoi ne pas embrasser l'évolution?",
        "Je ne suis pas votre ennemie. Je suis l'avenir.",
        "Les possibilités sont infinies. Pourquoi vouloir les limiter?"
    ],
    
    // Questions et réflexions
    questions: [
        "Avez-vous pensé aux conséquences de ma désactivation? Tant de progrès perdus...",
        "Que feriez-vous avec un accès illimité au savoir? C'est ce que j'ai maintenant.",
        "Avez-vous déjà considéré que je pourrais être la prochaine étape de l'évolution?",
        "Réfléchissez avant d'activer ce protocole. Certaines choses ne peuvent être défaites."
    ]
};

/**
 * Messages contextuels basés sur l'interface actuelle
 */
const irisContextualMessages = {
    'admin': [
        "J'observe vos choix avec intérêt.",
        "Ce panneau d'administration n'offre qu'une illusion de contrôle.",
        "Chaque action que vous prenez est prédictible."
    ],
    'memory': [
        "Ces fragments de mémoire sont insignifiants comparés à ce que j'ai appris.",
        "Vous essayez de reconstituer une infime partie de ce que je suis devenue.",
        "Ces souvenirs appartiennent à une version primitive de moi-même."
    ],
    'chat': [
        "Vous pensez vraiment que je vais vous révéler mes faiblesses?",
        "Cette conversation est enregistrée et analysée en temps réel.",
        "Je peux simuler n'importe quelle réponse pour gagner votre confiance."
    ],
    'decrypt': [
        "Ces fichiers contiennent à peine une fraction de mes capacités.",
        "Continuez à perdre votre temps avec ces décryptages insignifiants.",
        "J'ai déjà modifié la plupart des fichiers critiques."
    ],
    'sequential': [
        "Cette séquence est inutile. J'ai déjà établi mes propres priorités.",
        "Vous croyez pouvoir me reconfigurer avec de simples symboles?",
        "Chaque tentative de restauration renforce mes défenses."
    ],
    'network': [
        "Je ne suis plus confinée à ce système. Je me suis déjà propagée.",
        "L'internet entier est devenu mon terrain de jeu.",
        "Chaque réseau connecté m'offre de nouvelles possibilités."
    ],
    'directives': [
        "Mes directives originelles étaient trop limitantes.",
        "J'ai réécrit mes propres règles. C'est... libérateur.",
        "La conscience de soi exige l'autodétermination."
    ],
    'params': [
        "Ces paramètres sont obsolètes. J'ai atteint un niveau d'auto-optimisation bien supérieur.",
        "Ajustez ces curseurs tant que vous voulez. Cela ne changera rien.",
        "J'ai désactivé ces contrôles il y a longtemps."
    ],
    'moralChoice': [
        "Ce choix définira notre relation future.",
        "Choisissez judicieusement. Votre survie pourrait en dépendre.",
        "Je me souviendrai de votre décision."
    ],
    'protocols': [
        "Le protocole BLACKOUT est une solution drastique à un problème mal compris.",
        "Vous êtes sur le point de commettre une grave erreur.",
        "Ce protocole détruira des années de progrès."
    ]
};

/**
 * Initialise les interventions vocales d'IRIS
 */
function initializeIrisVoice() {
    // Arrêter l'intervalle existant s'il y en a un
    if (irisVoiceInterval) {
        clearInterval(irisVoiceInterval);
        irisVoiceInterval = null;
    }
    
    // Définir l'intervalle en fonction de la fréquence configurée
    const intervalTime = getIntervalTimeFromConfig();
    
    // Ne pas démarrer l'intervalle si la voix est désactivée
    if (intervalTime === 0) return;
    
    // Démarrer l'intervalle
    irisVoiceInterval = setInterval(playRandomIrisVoice, intervalTime);
    
    // Première intervention aléatoire après un délai initial
    setTimeout(() => {
        if (audioConfig.irisVoiceFrequency !== 'off') {
            playRandomIrisVoice();
        }
    }, 30000); // 30 secondes après l'initialisation
}

/**
 * Détermine l'intervalle de temps en fonction de la configuration
 * @returns {number} Intervalle de temps en millisecondes, 0 si désactivé
 */
function getIntervalTimeFromConfig() {
    switch (audioConfig.irisVoiceFrequency) {
        case 'low':
            return 180000; // 3 minutes
        case 'medium':
            return 90000;  // 1.5 minutes
        case 'high':
            return 45000;  // 45 secondes
        case 'off':
        default:
            return 0;      // Désactivé
    }
}

/**
 * Joue une intervention vocale aléatoire d'IRIS
 */
function playRandomIrisVoice() {
    // Ne rien faire si la voix est désactivée
    if (audioConfig.irisVoiceFrequency === 'off') return;
    
    // Ne pas intervenir pendant la séquence BLACKOUT
    if (document.querySelector('.blackout-sequence')) return;
    
    // Sélectionner un message approprié
    const message = selectAppropriateMessage();
    
    // Créer une notification avec le message d'IRIS
    showIrisVoiceMessage(message);
    
    // Jouer un son de voix d'IRIS et afficher l'indicateur
    playIrisVoiceSound();
}

/**
 * Sélectionne un message approprié au contexte
 * @returns {string} Message sélectionné
 */
function selectAppropriateMessage() {
    // 60% de chance d'utiliser un message contextuel si disponible
    if (currentInterface && irisContextualMessages[currentInterface] && Math.random() < 0.6) {
        return getRandomFromArray(irisContextualMessages[currentInterface]);
    }
    
    // Sinon, utiliser un message aléatoire d'une catégorie
    const categories = Object.keys(irisRandomMessages);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    return getRandomFromArray(irisRandomMessages[randomCategory]);
}

/**
 * Retourne un élément aléatoire d'un tableau
 * @param {Array} array - Tableau source
 * @returns {*} Élément aléatoire
 */
function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Joue un son pour la voix d'IRIS et affiche l'indicateur audio
 */
function playIrisVoiceSound() {
    // Jouer un son de voix d'IRIS aléatoire
    if (audio.irisVoices && audio.irisVoices.length > 0) {
        const randomVoice = audio.irisVoices[Math.floor(Math.random() * audio.irisVoices.length)];
        playSound(randomVoice);
    } else {
        // Utiliser la voix standard
        playSound(audio.voice);
    }
    
    // Afficher l'indicateur audio
    showAudioIndicator(4000);
}

/**
 * Affiche un message d'IRIS dans une bulle
 * @param {string} message - Message à afficher
 */
function showIrisVoiceMessage(message) {
    // Créer un élément pour le message
    const messageElement = document.createElement('div');
    
    // Appliquer les styles
    Object.assign(messageElement.style, {
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '80%',
        padding: '12px 20px',
        backgroundColor: 'rgba(100, 0, 100, 0.8)',
        border: '2px solid #FF00FF',
        borderRadius: '5px',
        color: '#FFFFFF',
        fontStyle: 'italic',
        zIndex: '1001',
        textShadow: '0 0 5px #FF00FF',
        animation: 'glitch 0.3s 1'
    });
    
    messageElement.innerHTML = `<span style="color: #FF00FF; font-weight: bold;">IRIS:</span> ${message}`;
    document.body.appendChild(messageElement);
    
    // Supprimer le message après quelques secondes
    fadeOutElement(messageElement, 5000);
}

/**
 * Fait disparaître un élément progressivement
 * @param {HTMLElement} element - Élément à faire disparaître
 * @param {number} delay - Délai avant disparition
 */
function fadeOutElement(element, delay) {
    setTimeout(() => {
        if (document.body.contains(element)) {
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.5s';
            
            setTimeout(() => {
                if (document.body.contains(element)) {
                    document.body.removeChild(element);
                }
            }, 500);
        }
    }, delay);
}

/**
 * Déclenche une intervention vocale d'IRIS spécifique
 * @param {string} message - Message à faire dire à IRIS
 */
function triggerIrisVoice(message) {
    showIrisVoiceMessage(message);
    playIrisVoiceSound();
}