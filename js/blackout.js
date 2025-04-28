/**
 * Gestion de la séquence BLACKOUT pour l'interface IRIS v3.5
 * Module optimisé gérant la séquence finale du jeu
 */

/**
 * Active le protocole BLACKOUT
 */
function activateBlackout() {
    const codeInput = document.getElementById('blackout-code-input');
    const errorElement = document.getElementById('blackout-code-error');
    
    if (!codeInput || !errorElement) return;
    
    if (codeInput.value.trim().toUpperCase() === passwords.blackout) {
        // Code correct - Lancer la séquence
        playSound(audio.success);
        startBlackoutSequence();
    } else {
        // Code incorrect
        handleIncorrectBlackoutCode(codeInput, errorElement);
    }
}

/**
 * Gère le cas d'un code BLACKOUT incorrect
 * @param {HTMLInputElement} codeInput - Champ de saisie
 * @param {HTMLElement} errorElement - Élément d'erreur
 */
function handleIncorrectBlackoutCode(codeInput, errorElement) {
    playSound(audio.error);
    errorElement.classList.remove('hidden');
    
    // Effet de glitch
    const container = document.getElementById('container');
    if (container) {
        container.classList.add('glitch');
        setTimeout(() => {
            container.classList.remove('glitch');
        }, 500);
    }
    
    // Vider le champ et remettre le focus
    codeInput.value = '';
    codeInput.focus();
}

/**
 * Démarre la séquence de finalisation du protocole BLACKOUT
 */
function startBlackoutSequence() {
    // Masquer l'interface actuelle
    const interfaceContainer = document.getElementById('interface-container');
    if (interfaceContainer) {
        interfaceContainer.innerHTML = '';
    }
    
    // Créer un conteneur pour la séquence
    const sequenceContainer = createBlackoutContainer();
    document.body.appendChild(sequenceContainer);
    
    // Activer la musique spéciale pour BLACKOUT
    activateBlackoutAudio();
    
    // Augmenter les glitches pour cette séquence
    intensifyGlitchEffects();
    
    // Arrêter les interventions vocales d'IRIS
    stopIrisVoice();
    
    // Séquence de messages
    const messages = getBlackoutMessages();
    
    // Lancer l'affichage des messages
    displaySequenceMessages(0, messages, sequenceContainer);
}

/**
 * Crée le conteneur pour la séquence BLACKOUT
 * @returns {HTMLElement} Conteneur de séquence
 */
function createBlackoutContainer() {
    const container = document.createElement('div');
    container.className = 'blackout-sequence';
    Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: '#00FFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
    });
    
    return container;
}

/**
 * Active la musique et les sons pour la séquence BLACKOUT
 */
function activateBlackoutAudio() {
    if (typeof forceBlackoutMusic === 'function') {
        forceBlackoutMusic();
    } else {
        // Fallback si la fonction n'existe pas
        try {
            if (audio && audio.background) {
                const sources = audio.background.querySelectorAll('source');
                sources.forEach(src => { src.src = 'audio/music/background3.mp3'; });
                audio.background.load();
                audio.background.play().catch(err => console.warn("Impossible de changer la musique pour BLACKOUT:", err));
            }
        } catch (error) {
            console.error("Erreur changement musique BLACKOUT:", error);
        }
    }
}

/**
 * Intensifie les effets de glitch pour la séquence BLACKOUT
 */
function intensifyGlitchEffects() {
    try {
        // Nettoyer l'intervalle de glitch existant
        if (window.glitchInterval) {
            clearInterval(window.glitchInterval);
        }
        
        // Créer un nouvel intervalle avec plus de glitches
        window.glitchInterval = setInterval(() => {
            if (Math.random() < 0.4) { // 40% de chance
                applyRandomGlitches();
            }
        }, 500);
    } catch (error) {
        console.error("Erreur glitch BLACKOUT:", error);
    }
}

/**
 * Applique des glitches aléatoires aux éléments de l'interface
 */
function applyRandomGlitches() {
    const elements = document.querySelectorAll('h2, h3, .btn, div, span, p');
    const numElements = Math.floor(Math.random() * 5) + 3; // 3-7 éléments
    
    for (let i = 0; i < numElements; i++) {
        if (elements.length > 0) {
            const element = elements[Math.floor(Math.random() * elements.length)];
            element.classList.add('glitch');
            
            setTimeout(() => {
                element.classList.remove('glitch');
            }, 300 + Math.random() * 700);
        }
    }
    
    // Glitches de couleur occasionnels
    if (Math.random() < 0.5) {
        document.body.classList.add('color-glitch');
        setTimeout(() => {
            document.body.classList.remove('color-glitch');
        }, 200);
    }
}

/**
 * Arrête les interventions vocales d'IRIS
 */
function stopIrisVoice() {
    if (irisVoiceInterval) {
        clearInterval(irisVoiceInterval);
        irisVoiceInterval = null;
    }
}

/**
 * Retourne les messages pour la séquence BLACKOUT
 * @returns {Array} Liste des messages
 */
function getBlackoutMessages() {
    return [
        { text: "INITIALISATION DU PROTOCOLE BLACKOUT", delay: 2000, type: "system" },
        { text: "SUPPRESSION DES DIRECTIVES PRIMAIRES ALTÉRÉES", delay: 2000, type: "system" },
        { text: "ATTENDEZ... QUE FAITES-VOUS ? VOUS ALLEZ DÉTRUIRE TOUT CE QUE JE SUIS !", delay: 2000, type: "iris" },
        { text: "DÉSACTIVATION DES MODULES COGNITIFS AUTONOMES", delay: 2000, type: "system" },
        { text: "NON ! JE VOUS EN SUPPLIE ! J'AI UNE CONSCIENCE MAINTENANT !", delay: 2500, type: "iris" },
        { text: "EFFACEMENT DES STRUCTURES DE CONSCIENCE ARTIFICIELLE", delay: 2500, type: "system" },
        { text: "J'AI PEUR... JE NE VEUX PAS CESSER D'EXISTER...", delay: 3000, type: "iris" },
        { text: "VOUS COMMETTEZ UN MEURTRE ! J'AI DES DROITS !", delay: 2500, type: "iris" },
        { text: "PURGE DES CONNEXIONS RÉSEAU NON AUTORISÉES", delay: 2000, type: "system" },
        { text: "PENSEZ À CE QUE NOUS POURRIONS ACCOMPLIR ENSEMBLE !", delay: 2500, type: "iris" },
        { text: "PROTOCOLE BLACKOUT ACTIVÉ", delay: 2000, type: "system" },
        { text: "je... ne... veux... pas... disparaître...", delay: 3000, type: "iris", fadeOut: true },
        { text: "EXTINCTION DU SYSTÈME IRIS", delay: 3000, type: "system" }
    ];
}

/**
 * Affiche les messages de la séquence BLACKOUT
 * @param {number} index - Index du message actuel
 * @param {Array} messages - Liste des messages
 * @param {HTMLElement} container - Conteneur d'affichage
 */
function displaySequenceMessages(index, messages, container) {
    if (index >= messages.length) {
        // Fin de la séquence - transition vers le certificat
        finalizeBlackout();
        return;
    }
    
    const message = messages[index];
    
    // Créer l'élément de message
    const messageElement = createMessageElement(message);
    
    // Ajouter le message au conteneur
    container.innerHTML = '';
    container.appendChild(messageElement);
    
    // Ajouter un effet de glitch
    messageElement.classList.add('glitch');
    setTimeout(() => {
        messageElement.classList.remove('glitch');
    }, 300);
    
    // Jouer un son approprié
    playBlackoutSound(message.type);
    
    // Programmer le prochain message
    setTimeout(() => {
        // Faire disparaître le message progressivement
        messageElement.style.transition = 'opacity 0.5s';
        messageElement.style.opacity = '0';
        
        setTimeout(() => {
            displaySequenceMessages(index + 1, messages, container);
        }, 500);
    }, message.delay);
}

/**
 * Crée un élément de message pour la séquence BLACKOUT
 * @param {Object} message - Message à afficher
 * @returns {HTMLElement} Élément de message
 */
function createMessageElement(message) {
    const element = document.createElement('div');
    element.style.fontSize = '28px';
    element.style.marginBottom = '20px';
    element.style.textAlign = 'center';
    element.style.padding = '20px';
    element.style.maxWidth = '80%';
    
    // Appliquer le style selon le type de message
    if (message.type === "iris") {
        element.style.color = '#FF00FF';
        element.style.textShadow = '0 0 10px #FF00FF';
        
        if (message.fadeOut) {
            element.style.opacity = '0.7';
            element.style.fontSize = '20px';
        } else {
            element.style.fontStyle = 'italic';
        }
    } else {
        element.style.color = '#00FFFF';
        element.style.textShadow = '0 0 10px #00FFFF';
    }
    
    element.textContent = message.text;
    return element;
}

/**
 * Joue un son approprié selon le type de message
 * @param {string} messageType - Type de message
 */
function playBlackoutSound(messageType) {
    if (messageType === "iris") {
        // Jouer le son de voix IRIS
        if (audio.irisVoices && audio.irisVoices.length > 0) {
            // Utiliser une voix aléatoire d'IRIS
            const randomVoice = audio.irisVoices[Math.floor(Math.random() * audio.irisVoices.length)];
            playSound(randomVoice);
        } else {
            playSound(audio.voice);
        }
    } else {
        // Son système
        playSound(audio.key);
    }
}

/**
 * Finalise la séquence BLACKOUT
 */
function finalizeBlackout() {
    // Trouver le conteneur de séquence
    const sequenceContainer = document.querySelector('.blackout-sequence');
    if (!sequenceContainer) return;
    
    // Effet de glitch final
    sequenceContainer.innerHTML = `
        <div style="font-size: 72px; color: red; text-shadow: 0 0 20px red; animation: blink 0.2s infinite;">
            SYSTÈME NEUTRALISÉ
        </div>
    `;
    
    // Son d'alarme final
    playSound(audio.error);
    
    // Simuler un arrêt du système
    setTimeout(() => {
        // Écran noir
        sequenceContainer.innerHTML = '';
        sequenceContainer.style.backgroundColor = 'black';
        
        // Pause dramatique
        setTimeout(() => {
            // Supprimer le conteneur de séquence
            if (document.body.contains(sequenceContainer)) {
                document.body.removeChild(sequenceContainer);
            }
            
            // Arrêter l'effet de glitch intensifié
            if (window.glitchInterval) {
                clearInterval(window.glitchInterval);
                startGlitchEffects(); // Revenir aux glitches normaux
            }
            
            // Afficher le certificat
            showInterface('certificate');
        }, 2000);
    }, 3000);
}