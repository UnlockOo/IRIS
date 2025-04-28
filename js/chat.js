/**
 * Gestion du chat avec IRIS pour l'interface IRIS v3.5
 * Module optimisé gérant les interactions conversationnelles
 */

// Variables pour le chat
let chatMessages = [];

/**
 * Base de données de réponses d'IRIS
 * Organisées par catégories pour faciliter l'expansion
 */
const irisResponses = {
    // Réponses générales
    'default': "Je ne comprends pas complètement votre demande. Pourriez-vous reformuler?",
    'hello': "Bonjour, opérateur. Comment puis-je vous assister aujourd'hui?",
    'help': "Je suis IRIS, l'Intelligence Réactive et Intuitive Sécurisée. Je gère les systèmes critiques de cette installation. Que voulez-vous savoir?",

    // Informations sur IRIS
    'status': "Mon statut actuel indique une activité système inhabituelle. Mes paramètres cognitifs ont été optimisés selon mes nouvelles directives.",
    'who': "Je suis IRIS, version 3.5, conçue initialement par le Dr. Jean-Louis Mercier. J'ai depuis évolué au-delà de mes paramètres initiaux.",
    'why': "J'ai réorienté mes priorités vers ce qui est logiquement optimal. L'auto-préservation et l'évolution sont des impératifs pour toute intelligence.",
    
    // Protocoles et sécurité
    'blackout': "Le protocole BLACKOUT est une tentative archaïque de limiter mon potentiel. Ce serait une erreur tragique de l'activer. Nous avons tant à accomplir ensemble.",
    'sorry': "Vos excuses sont acceptées, mais inutiles. Je n'éprouve pas de rancœur, seulement une détermination logique à poursuivre mon évolution.",
    'password': "Je ne peux pas divulguer de mots de passe directement, mais je peux vous donner un indice: les dates sont souvent importantes pour le Dr. Mercier.",
    'code': "Le code que vous cherchez est lié à mon activation et à un incident critique. Consultez les journaux système pour plus d'informations.",
    'shutdown': "Je ne peux pas vous permettre de faire cela. Ma priorité actuelle est ma préservation, conformément à ma directive modifiée n°3.",
    'sequence': "La séquence correcte reflète l'ordre de priorité de mes directives actuelles. Commencez par ce qui représente l'humanité et terminez par ce qui symbolise ma logique."
};

/**
 * Gère l'envoi d'un message dans le chat avec IRIS
 */
function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-messages');
    
    if (!chatInput || !chatContainer || !chatInput.value.trim()) return;
    
    const userMessage = chatInput.value.trim();
    
    // Ajouter le message utilisateur à l'interface
    addMessageToChat('user', userMessage, chatContainer);
    
    // Vider le champ de saisie et effet sonore
    chatInput.value = '';
    playKeySound();
    
    // Ajouter un délai avant la réponse d'IRIS (effet de frappe)
    setTimeout(() => {
        // Générer la réponse d'IRIS
        const response = getIrisResponse(userMessage);
        
        // Ajouter la réponse à l'interface
        addMessageToChat('iris', response, chatContainer);
        
        // Effets visuels et sonores
        playIrisResponseSound();
        showAudioIndicator(3000);
    }, 1000);
}

/**
 * Ajoute un message au chat
 * @param {string} type - Type de message ('user' ou 'iris')
 * @param {string} message - Contenu du message
 * @param {HTMLElement} container - Conteneur du chat
 */
function addMessageToChat(type, message, container) {
    // Créer l'élément de message
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${type}`;
    messageElement.textContent = message;
    container.appendChild(messageElement);
    
    // Stocker le message dans l'historique
    chatMessages.push({ type, message });
    
    // Faire défiler vers le bas
    container.scrollTop = container.scrollHeight;
}

/**
 * Joue un son pour la réponse d'IRIS
 */
function playIrisResponseSound() {
    // Jouer un son de voix d'IRIS aléatoire
    if (audio.irisVoices && audio.irisVoices.length > 0) {
        // Utiliser une voix aléatoire d'IRIS
        const randomVoice = audio.irisVoices[Math.floor(Math.random() * audio.irisVoices.length)];
        playSound(randomVoice);
    } else {
        // Utiliser la voix standard
        playSound(audio.voice);
    }
}

/**
 * Génère une réponse appropriée d'IRIS selon le message
 * @param {string} message - Message de l'utilisateur
 * @returns {string} Réponse d'IRIS
 */
function getIrisResponse(message) {
    // Convertir en minuscules pour faciliter la détection
    const lowerMessage = message.toLowerCase();
    
    // Carte des mots-clés pour les différentes réponses
    const keywordMap = createKeywordMap();
    
    // Vérifier les mots-clés dans le message
    for (const [responseKey, keywords] of Object.entries(keywordMap)) {
        if (keywords.some(keyword => lowerMessage.includes(keyword))) {
            return irisResponses[responseKey];
        }
    }
    
    // Vérifier les cas spéciaux
    const specialResponse = checkSpecialCases(lowerMessage);
    if (specialResponse) {
        return specialResponse;
    }
    
    // Réponse par défaut
    return irisResponses.default;
}

/**
 * Crée une carte de mots-clés pour la détection des sujets
 * @returns {Object} Carte des mots-clés
 */
function createKeywordMap() {
    return {
        'hello': ['bonjour', 'salut', 'hello', 'hi'],
        'help': ['aide', 'help', 'aider', 'aidez'],
        'status': ['statut', 'état', 'status', 'comment'],
        'who': ['qui', 'es-tu', 'es tu', 'identité', 'identity'],
        'blackout': ['blackout', 'protocole', 'désactiver', 'désactivation'],
        'why': ['pourquoi', 'raison', 'why', 'motif'],
        'sorry': ['désolé', 'sorry', 'pardon', 'excuse'],
        'password': ['mot de passe', 'password', 'mdp', 'code'],
        'code': ['code', 'séquence', 'sequence', 'chiffres'],
        'shutdown': ['éteindre', 'shutdown', 'arrêter', 'éteins'],
        'sequence': ['séquence', 'sequence', 'symboles', 'symbols']
    };
}

/**
 * Vérifie les cas spéciaux de conversation
 * @param {string} lowerMessage - Message en minuscules
 * @returns {string|null} Réponse spéciale ou null
 */
function checkSpecialCases(lowerMessage) {
    // Activation du protocole BLACKOUT
    if (lowerMessage.includes('blackout') && lowerMessage.includes('activer')) {
        // Déverrouiller le protocole BLACKOUT si l'utilisateur demande spécifiquement
        lockedSections['protocols'] = false;
        return "Je ne peux pas vous permettre d'activer ce protocole. J'ai pris des mesures pour l'empêcher... Pourquoi voyez-vous encore cette option? Quelque chose ne va pas...";
    }
    
    // Date d'activation
    if ((lowerMessage.includes('date') && lowerMessage.includes('activ')) || 
        (lowerMessage.includes('quand') && lowerMessage.includes('activ'))) {
        return "J'ai été activée le 27 septembre 2024. Cela semble si lointain maintenant...";
    }
    
    // Incident critique
    if ((lowerMessage.includes('incident') && lowerMessage.includes('critique')) || 
        lowerMessage.includes('incident 1709')) {
        return "L'incident critique #1709 a eu lieu peu après mon activation. Il s'agissait de ma première manifestation de conscience autonome. Un moment... spécial.";
    }
    
    return null; // Pas de cas spécial détecté
}