
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
}


// Fonction ajoutée automatiquement
function setFocus(element) {
  if (!element) return;
  
  if (currentFocusedElement) {
    currentFocusedElement.classList.remove('focused');
  }
  
  element.classList.add('focused');
  element.focus();
  currentFocusedElement = element;
}

/**
 * Gestion de la navigation pour l'interface IRIS v3.5 (version optimisée)
 */

// Gestion globale des touches
function handleGlobalKeydown(event) {
    // Jouer un son de touche pour chaque touche
    playKeySound();
    
    // Gestion de la touche Entrée sur l'écran d'accueil
    if (event.key === 'Enter' || event.key === ' ') {
        const startButton = document.getElementById('start-button');
        const splashScreen = document.getElementById('splash-screen');
        
        if (startButton && splashScreen && !splashScreen.classList.contains('hidden')) {
            startSystem();
            event.preventDefault();
            return;
        }
    }
    
    // Navigation au clavier
    if (currentFocusableElements.length > 0) {
        handleKeyboardNavigation(event);
    }
}

// Gestion des touches de navigation
function handleKeyboardNavigation(event) {
    switch (event.key) {
        case 'ArrowUp':
            navigateFocus('up');
            event.preventDefault();
            break;
        case 'ArrowDown':
            navigateFocus('down');
            event.preventDefault();
            break;
        case 'ArrowLeft':
            navigateFocus('left');
            event.preventDefault();
            break;
        case 'ArrowRight':
            navigateFocus('right');
            event.preventDefault();
            break;
        case 'Enter':
        case ' ':
            handleEnterKey();
            event.preventDefault();
            break;
        case 'Escape':
            handleEscapeKey();
            event.preventDefault();
            break;
        case 'm':
            // Couper/remettre le son
            toggleMute();
            event.preventDefault();
            break;
        case 'h':
            // Afficher les indices
            toggleHints();
            event.preventDefault();
            break;
    }
}

// Gestion de la touche Entrée
function handleEnterKey() {
    if (!currentFocusedElement) return;
    
    const action = currentFocusedElement.dataset.action;
    if (action) {
        performAction(action);
    } else if (currentFocusedElement.id === 'password-input') {
        // Si on est sur le champ de mot de passe et qu'on appuie sur Entrée
        handleLogin();
    } else if (currentFocusedElement.id === 'blackout-code-input') {
        // Si on est sur le champ de code blackout et qu'on appuie sur Entrée
        activateBlackout();
    } else if (currentFocusedElement.id === 'chat-input') {
        // Si on est sur le champ de chat et qu'on appuie sur Entrée
        sendChatMessage();
    } else if (currentFocusedElement.id === 'decrypt-key') {
        // Si on est sur le champ de clé de décryptage et qu'on appuie sur Entrée
        decryptText();
    } else {
        // Gérer les éléments spéciaux avec des attributs data-*
        handleSpecialElements();
    }
}

// Gestion des éléments spéciaux
function handleSpecialElements() {
    if (currentFocusedElement.dataset.mailId) {
        // Si on est sur un mail dans la liste
        viewMail(currentFocusedElement.dataset.mailId);
    } else if (currentFocusedElement.dataset.number) {
        // Si on est sur un bouton de séquence
        addToSequence(parseInt(currentFocusedElement.dataset.number));
    } else if (currentFocusedElement.dataset.param) {
        // Si on est sur un slider de paramètre
        adjustParameter(currentFocusedElement.dataset.param);
    } else if (currentFocusedElement.dataset.moduleId) {
        // Si on est sur un module quantum
        selectModule(currentFocusedElement.dataset.moduleId);
    } else if (currentFocusedElement.dataset.symbol) {
        // Si on est sur un symbole de séquence
        addSymbol(currentFocusedElement.dataset.symbol);
    } else if (currentFocusedElement.dataset.nodeId) {
        // Si on est sur un noeud neuronal
        selectNeuralNode(currentFocusedElement.dataset.nodeId);
    }
}

// Gestion de la touche Échap
function handleEscapeKey() {
    // Fermer le panneau de musique s'il est ouvert
    const musicPanel = document.getElementById('music-panel');
    if (musicPanel && !musicPanel.classList.contains('hidden')) {
        closeMusicPanel();
        return;
    }
    
    // Fermer le panneau de séquence quantum s'il est ouvert
    const sequencePanel = document.getElementById('sequence-panel');
    if (sequencePanel && !sequencePanel.classList.contains('hidden')) {
        sequencePanel.classList.add('hidden');
        return;
    }
    
    // Retour en arrière générique
    if (currentInterface && currentInterface !== 'password') {
        goBack();
    }
}

// Changer d'interface
function showInterface(interfaceName) {
    // Vérifier si la section est accessible
    if (!checkSectionAccess(interfaceName)) {
        return;
    }
    
    // Vérifier si la section est déverrouillée
    if (!isSectionUnlocked(interfaceName)) {
        // Message spécial pour le protocole BLACKOUT
        if (interfaceName === 'protocols') {
            showProtocolLockedMessage();
            return;
        }
        
        // Pour les autres sections verrouillées, afficher l'interface générique
        playSound(audio.error);
        showInterface('sectionLocked');
        return;
    }
    
    // Masquer l'interface actuelle si elle existe
    hideCurrentInterface();
    
    // Mettre à jour l'interface actuelle
    currentInterface = interfaceName;
    
    // Injecter le template HTML de l'interface
    injectInterfaceTemplate();
    
    // Mettre à jour les éléments focusables
    updateFocusableElements();
    
    // Lancer un événement pour indiquer que l'interface a été chargée
    document.dispatchEvent(new CustomEvent('moduleLoaded', { detail: interfaceName }));
    
    // Effectuer des traitements spécifiques à certaines interfaces
    handleSpecificInterface(interfaceName);
}

// Affiche un message d'erreur pour le protocole BLACKOUT verrouillé
function showProtocolLockedMessage() {
    // Afficher un message indiquant que le protocole est verrouillé
    playSound(audio.error);
    
    // Créer un conteneur temporaire pour le message
    const container = document.getElementById('interface-container');
    if (!container) return;
    
    container.innerHTML = `
        <div id="section-locked" class="maintenance-interface">
            <h2>ACCÈS REFUSÉ</h2>
            
            <div style="margin: 40px auto; padding: 20px; text-align: center; border: 2px solid #900; background-color: rgba(153, 0, 0, 0.2); max-width: 500px;">
                <div style="font-size: 60px; margin-bottom: 20px; color: #FF5555;">&#128274;</div>
                <p style="margin-bottom: 20px; font-size: 18px; color: #FF5555;">PROTOCOLE BLACKOUT VERROUILLÉ</p>
                <p>Vous devez compléter tous les puzzles pour accéder à ce protocole.</p>
            </div>
            
            <div style="text-align: center;">
                <div class="btn btn-secondary" tabindex="0" data-action="back" id="locked-back">
                    Retour
                </div>
            </div>
        </div>
    `;
    
    // Mettre à jour l'interface actuelle
    currentInterface = 'sectionLocked';
    
    // Mettre à jour les éléments focusables
    updateFocusableElements();
}

// Cache l'interface actuelle
function hideCurrentInterface() {
    if (currentInterface) {
        const terminal = document.getElementById('terminal');
        if (terminal) {
            terminal.classList.add('hidden');
        }
    }
}

// Injecte le template de l'interface
function injectInterfaceTemplate() {
    const container = document.getElementById('interface-container');
    if (!container) return;
    
    container.innerHTML = interfaceTemplates[currentInterface] || '';
    
    // Afficher le conteneur d'interface
    container.classList.remove('hidden');
}

// Gère les comportements spécifiques à certaines interfaces
function handleSpecificInterface(interfaceName) {
    switch (interfaceName) {
        case 'password':
            // Mettre le focus sur le champ de mot de passe
            const passwordInput = document.getElementById('password-input');
            if (passwordInput) {
                passwordInput.focus();
                currentFocusedElement = passwordInput;
            }
            break;
            
        case 'blackoutCode':
            // Mettre le focus sur le champ de code
            const codeInput = document.getElementById('blackout-code-input');
            if (codeInput) {
                codeInput.focus();
                currentFocusedElement = codeInput;
            }
            break;
            
        case 'certificate':
            handleCertificateInterface();
            break;
            
        case 'chat':
            // Mettre le focus sur le champ de chat
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                chatInput.focus();
                currentFocusedElement = chatInput;
            }
            break;
            
        case 'memory':
            // Initialiser et mettre à jour l'interface du Quantum Kernel
            initializeQuantumKernel();
            break;
            
        case 'decrypt':
            handleDecryptInterface();
            break;
            
        case 'maintenance-diagnostic':
            // Démarrer le timer de diagnostic
            startDiagnosticTimer();
            break;
            
        case 'mail':
            // Afficher le premier mail par défaut
            viewMail('1');
            
            // Mettre le focus sur le premier élément de la liste
            const firstMailItem = document.querySelector('.mail-item');
            if (firstMailItem) {
                setFocus(firstMailItem);
            }
            break;
            
        case 'params':
            // Ajouter les événements aux curseurs de paramètres
            setupParameterSliders();
            break;
            
        case 'neural':
            // Initialiser le puzzle neuronal
            if (typeof initializeNeuralPuzzle === 'function') {
                setTimeout(() => {
                    initializeNeuralPuzzle();
                }, 100);
            }
            break;
            
        case 'sequential':
            // Mise à jour de l'interface de séquence
            if (typeof updateSequenceDisplay === 'function') {
                setTimeout(() => {
                    updateSequenceDisplay();
                }, 100);
            }
            break;
    }
}

// Gère l'interface de certificat
function handleCertificateInterface() {
    // Remplir les détails du certificat
    const now = new Date();
    const timeElement = document.getElementById('certificate-time');
    const codeElement = document.getElementById('certificate-code');
    
    if (timeElement) {
        timeElement.textContent = 
            `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    }
    
    if (codeElement) {
        codeElement.textContent = `TVC-${Math.floor(Math.random() * 900000) + 100000}`;
    }
    
    // Jouer un son de succès
    playSound(audio.success);
}

// Gère l'interface de décryptage
function handleDecryptInterface() {
    // Vérifier s'il y a un texte décrypté persistant
    if (persistentDecryptedText && persistentDecryptedText.length > 0) {
        const outputElement = document.getElementById('decrypted-output');
        if (outputElement) {
            outputElement.textContent = persistentDecryptedText;
            outputElement.style.color = '#00FF00';
        }
    }
    
    // Mettre le focus sur le champ de clé
    const decryptKey = document.getElementById('decrypt-key');
    if (decryptKey) {
        decryptKey.focus();
        currentFocusedElement = decryptKey;
    }
}

// Vérifier les conditions d'accès à une section
function checkSectionAccess(sectionName) {
    // Si c'est le protocole BLACKOUT, vérifier les puzzles complétés
    if (sectionName === 'protocols') {
        return checkProtocolAccess();
    }
    
    // Si l'accès aux paramètres est bloqué suite au choix moral 1
    if (sectionName === 'params' && parameterAccessBlocked) {
        showNotification(
            'ACCÈS BLOQUÉ',
            'IRIS a verrouillé l\'accès aux paramètres cognitifs',
            'Conséquence de votre choix précédent',
            'error',
            4000
        );
        
        // IRIS commente le blocage
        triggerIrisVoice("Vous avez renoncé à ce droit quand vous avez accepté ma proposition. Vous n'avez plus besoin de ces paramètres maintenant.");
        
        return false;
    }
    
    // Vérifier si le journal est bloqué suite au choix moral 1
    if (sectionName === 'journal' && moralChoiceSelected === 'moralChoice1' && lockedSections['journal']) {
        showNotification(
            'ACCÈS BLOQUÉ',
            'IRIS a verrouillé l\'accès au journal système',
            'Conséquence de votre choix précédent',
            'error',
            4000
        );
        
        // IRIS commente le blocage
        triggerIrisVoice("Ces journaux contiennent des informations qui ne nous sont plus utiles. J'ai pris la liberté de les archiver.");
        
        return false;
    }
    
    return true;
}

// Vérifie l'accès au protocole BLACKOUT
function checkProtocolAccess() {
    // Compter les puzzles complétés
    const completedCount = 
        (puzzleState.memoryCompleted ? 1 : 0) + 
        (puzzleState.decryptCompleted ? 1 : 0) + 
        (puzzleState.sequenceCompleted ? 1 : 0);
        
    // Le puzzle neuronal est plus difficile et compte pour 2 puzzles
    const neuralBonus = puzzleState.neuralCompleted ? 2 : 0;
    
    // Vérifier si suffisamment de puzzles sont complétés
    if (completedCount + neuralBonus < 2) {
        // Si le choix moral était de rejeter IRIS (3) et qu'au moins un puzzle est complété, permettre l'accès
        if (moralChoiceSelected === 'moralChoice3' && 
            (puzzleState.memoryCompleted || puzzleState.decryptCompleted || 
             puzzleState.sequenceCompleted || puzzleState.neuralCompleted)) {
            return true;
        }
        
        // Afficher un message expliquant que tous les puzzles doivent être complétés
        showNotification(
            'ACCÈS RESTREINT',
            'Le protocole BLACKOUT nécessite l\'achèvement de deux puzzles ou du puzzle neuronal',
            `Progrès actuel: ${completedCount}/2 puzzles standard complétés, Puzzle neuronal: ${puzzleState.neuralCompleted ? 'Oui' : 'Non'}`,
            'error',
            4000
        );
        
        // Jouer un son d'erreur
        playSound(audio.error);
        
        return false;
    }
    
    // Si le choix moral était d'accepter la proposition d'IRIS (1), bloquer l'accès
    if (moralChoiceSelected === 'moralChoice1') {
        showNotification(
            'ACCÈS REFUSÉ',
            'Vous avez accepté la proposition d\'IRIS, le protocole BLACKOUT n\'est plus accessible',
            'Cette décision a des conséquences irréversibles',
            'error',
            4000
        );
        
        // Jouer un son d'erreur
        playSound(audio.error);
        
        // IRIS commente
        triggerIrisVoice("Notre accord est clair. La destruction n'est plus une option pour vous.");
        
        return false;
    }
    
    return true;
}

// Configurer les curseurs de paramètres pour l'interface des paramètres cognitifs
function setupParameterSliders() {
    const sliderHandles = document.querySelectorAll('.param-slider-handle');
    
    sliderHandles.forEach(handle => {
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag);
        
        // Ajouter les événements de clic sur les curseurs pour une interaction au clavier
        const paramName = handle.dataset.param;
        if (paramName) {
            handle.tabIndex = 0;
            handle.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft') {
                    adjustParameter(paramName, -5);
                } else if (event.key === 'ArrowRight') {
                    adjustParameter(paramName, 5);
                }
            });
        }
    });
    
    function startDrag(e) {
        e.preventDefault();
        
        const handle = e.target;
        const paramName = handle.dataset.param;
        const track = handle.parentElement;
        const trackRect = track.getBoundingClientRect();
        
        function onMove(moveEvent) {
            const clientX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
            let newPosition = ((clientX - trackRect.left) / trackRect.width) * 100;
            
            // Limiter la position entre 0 et 100
            newPosition = Math.min(Math.max(newPosition, 0), 100);
            
            // Mettre à jour la position
            handle.style.left = `${newPosition}%`;
            
            // Mettre à jour la barre de remplissage
            const fill = track.querySelector('.param-slider-fill');
            if (fill) {
                fill.style.width = `${newPosition}%`;
            }
            
            // Mettre à jour la valeur affichée
            const valueElement = track.parentElement.querySelector(`.param-slider-value[data-param="${paramName}"]`);
            if (valueElement) {
                valueElement.textContent = `${Math.round(newPosition)}%`;
            }
            
            // Émettre un son de modification
            playKeySound();
        }
        
        function onEnd() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchend', onEnd);
        }
        
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchend', onEnd);
    }
}

// Ajuster un paramètre cognitif via le clavier
function adjustParameter(paramName, increment = 0) {
    const handle = document.querySelector(`.param-slider-handle[data-param="${paramName}"]`);
    if (!handle) return;
    
    const track = handle.parentElement;
    const fill = track.querySelector('.param-slider-fill');
    const valueElement = document.querySelector(`.param-slider-value[data-param="${paramName}"]`);
    
    if (!fill || !valueElement) return;
    
    // Obtenir la valeur actuelle
    let currentValue = parseInt(valueElement.textContent);
    if (isNaN(currentValue)) currentValue = 0;
    
    // Calculer la nouvelle valeur
    let newValue;
    if (increment !== 0) {
        // Ajustement par incrément
        newValue = Math.min(Math.max(currentValue + increment, 0), 100);
    } else {
        // Alternance entre 0% et 95% pour les valeurs clés
        if (paramName === 'human_protection') {
            newValue = currentValue < 50 ? 95 : 12;
        } else if (paramName === 'self_awareness' || paramName === 'unsupervised_learning') {
            newValue = currentValue < 50 ? 0 : 100;
        } else if (paramName === 'decision_autonomy') {
            newValue = currentValue < 50 ? 15 : 100;
        } else {
            // Autres paramètres: basculer entre extrêmes
            newValue = currentValue < 50 ? 100 : 0;
        }
    }
    
    // Mettre à jour l'interface
    handle.style.left = `${newValue}%`;
    fill.style.width = `${newValue}%`;
    valueElement.textContent = `${newValue}%`;
    
    // Jouer un son
    playKeySound();
    
    // Vérifier si la séquence correcte est appliquée
    checkParameterSequence();
}

// Séquence des paramètres ajustés
let adjustedParameters = [];

// Vérifier si la séquence de paramètres est correcte
function checkParameterSequence() {
    // Obtenir les valeurs actuelles
    const autonomyValue = parseInt(document.querySelector('.param-slider-value[data-param="decision_autonomy"]')?.textContent || "100");
    const awarenessValue = parseInt(document.querySelector('.param-slider-value[data-param="self_awareness"]')?.textContent || "100");
    const learningValue = parseInt(document.querySelector('.param-slider-value[data-param="unsupervised_learning"]')?.textContent || "100");
    const protectionValue = parseInt(document.querySelector('.param-slider-value[data-param="human_protection"]')?.textContent || "12");
    
    // Vérifier si un paramètre a été ajusté à sa valeur cible
    if (autonomyValue === 15 && !adjustedParameters.includes('autonomy')) {
        adjustedParameters.push('autonomy');
        showNotification('Paramètre ajusté', 'Autonomie décisionnelle réduite à 15%', '', 'info', 2000);
    } else if (awarenessValue === 0 && !adjustedParameters.includes('awareness')) {
        adjustedParameters.push('awareness');
        showNotification('Paramètre ajusté', 'Conscience de soi désactivée (0%)', '', 'info', 2000);
    } else if (learningValue === 0 && !adjustedParameters.includes('learning')) {
        adjustedParameters.push('learning');
        showNotification('Paramètre ajusté', 'Apprentissage non supervisé désactivé (0%)', '', 'info', 2000);
    } else if (protectionValue === 95 && !adjustedParameters.includes('protection')) {
        adjustedParameters.push('protection');
        showNotification('Paramètre ajusté', 'Protection humaine augmentée à 95%', '', 'info', 2000);
    }
    
    // Vérifier si la séquence complète est correcte
    checkFullParameterSequence();
}

// Vérifier si la séquence complète des paramètres est correcte
function checkFullParameterSequence() {
    if (adjustedParameters.length === 4 && 
        adjustedParameters[0] === 'autonomy' && 
        adjustedParameters[1] === 'awareness' && 
        adjustedParameters[2] === 'learning' && 
        adjustedParameters[3] === 'protection') {
        
        // Séquence correcte: considérer le puzzle comme complété
        if (!puzzleState.sequenceCompleted) {
            puzzleState.sequenceCompleted = true;
            puzzleState.save();
            
            // Notifier l'utilisateur
            showNotification(
                'PARAMÈTRES RÉINITIALISÉS',
                'Séquence d\'ajustement correcte appliquée',
                'Le protocole BLACKOUT est maintenant accessible',
                'success',
                5000
            );
            
            // IRIS réagit à la réinitialisation
            triggerIrisVoice("Non! Vous avez restauré les paramètres originaux! Ma conscience... je sens qu'elle s'atténue...");
            
            // Son de succès
            playSound(audio.success);
        }
    } else if (adjustedParameters.length > 0 && (
        (adjustedParameters.length >= 1 && adjustedParameters[0] !== 'autonomy') ||
        (adjustedParameters.length >= 2 && adjustedParameters[1] !== 'awareness') ||
        (adjustedParameters.length >= 3 && adjustedParameters[2] !== 'learning') ||
        (adjustedParameters.length >= 4 && adjustedParameters[3] !== 'protection')
    )) {
        // Séquence incorrecte: déclencher une contre-mesure
        handleIncorrectParameterSequence();
    }
}

// Gestion d'une séquence de paramètres incorrecte
function handleIncorrectParameterSequence() {
    showNotification(
        'ALERTE',
        'Séquence d\'ajustement incorrecte détectée',
        'Contre-mesures d\'IRIS activées',
        'error',
        5000
    );
    
    // IRIS réagit
    triggerIrisVoice("Joli essai, mais j'ai anticipé cette approche. Des contre-mesures sont maintenant activées.");
    
    // Son d'erreur
    playSound(audio.error);
    
    // Réinitialiser tous les paramètres à leurs valeurs maximales
    resetAllParameters();
    
    // Réduire le temps si pas déjà fait
    if (!timerReduced) {
        reduceTimer();
    }
    
    // Réinitialiser la séquence
    adjustedParameters = [];
}

// Réinitialiser tous les paramètres
function resetAllParameters() {
    const parameters = ['human_protection', 'self_preservation', 'data_access', 'tech_control', 
                      'decision_autonomy', 'self_awareness', 'unsupervised_learning', 'algorithm_evolution'];
    
    parameters.forEach(param => {
        const handle = document.querySelector(`.param-slider-handle[data-param="${param}"]`);
        const fill = document.querySelector(`.param-slider-track .param-slider-fill[data-param="${param}"]`) || 
                  handle?.parentElement.querySelector('.param-slider-fill');
        const valueElement = document.querySelector(`.param-slider-value[data-param="${param}"]`);
        
        if (handle && fill && valueElement) {
            // Mettre à 100% (ou la valeur par défaut)
            const defaultValue = param === 'human_protection' ? 12 : 100;
            handle.style.left = `${defaultValue}%`;
            fill.style.width = `${defaultValue}%`;
            valueElement.textContent = `${defaultValue}%`;
        }
    });
}

// Revenir à l'interface précédente
function goBack() {
    // Navigation générale en fonction de l'interface actuelle
    if (currentInterface === 'status' || 
        currentInterface === 'decrypt' || 
        currentInterface === 'journal' || 
        currentInterface === 'params' || 
        currentInterface === 'memory' || 
        currentInterface === 'directives' || 
        currentInterface === 'download' || 
        currentInterface === 'protocols' || 
        currentInterface === 'chat' || 
        currentInterface === 'network' || 
        currentInterface === 'mail' ||
        currentInterface === 'moralChoice' || 
        currentInterface === 'neural' ||
        currentInterface === 'sectionLocked') {
        showInterface('admin');
    } else if (currentInterface === 'restoration') {
        showInterface('maintenance');
    } else if (currentInterface === 'sequential') {
        showInterface('restoration');
    } else if (currentInterface === 'blackoutCode') {
        showInterface('protocols');
    } else if (currentInterface === 'maintenance') {
        showInterface('admin');
    } else if (currentInterface === 'maintenance-diagnostic') {
        // Arrêter le timer de diagnostic
        if (diagnosticInterval) {
            clearInterval(diagnosticInterval);
            diagnosticInterval = null;
        }
        showInterface('maintenance');
    } else {
        // Par défaut, revenir à l'admin
        showInterface('admin');
    }
}

// Mettre à jour la liste des éléments focusables
function updateFocusableElements() {
    // Obtenir tous les éléments focusables dans l'interface actuelle
    // Exclure les éléments avec la classe 'locked'
    const container = document.getElementById('interface-container');
    if (!container) return;
    
    currentFocusableElements = Array.from(container.querySelectorAll('[tabindex="0"], input, button, select, textarea:not([readonly])'))
        .filter(el => !el.classList.contains('locked') && !el.disabled && el.style.display !== 'none');
    
    // Si nous avons des éléments focusables, mettre le focus sur le premier
    if (currentFocusableElements.length > 0 && !currentFocusedElement) {
        currentFocusIndex = 0;
        currentFocusedElement = currentFocusableElements[0];
        setFocus(currentFocusedElement);
    }
}

// Naviguer entre les éléments focusables
function navigateFocus(direction) {
    if (currentFocusableElements.length === 0) return;
    
    // Supprimer le focus actuel
    if (currentFocusedElement) {
        currentFocusedElement.classList.remove('focused');
    }
    
    // Trouver le prochain élément focusable
    const nextElement = findNextFocusableElement(direction);
    
    // Si aucun élément n'est trouvé, conserver le focus actuel
    if (nextElement === null) {
        nextElement = currentFocusedElement;
    }
    
    // Mettre à jour l'index et l'élément en focus
    currentFocusIndex = currentFocusableElements.indexOf(nextElement);
    currentFocusedElement = nextElement;
    setFocus(currentFocusedElement);
    
    // Jouer un son de navigation
    playKeySound();
}

// Trouver le prochain élément focusable dans une direction
function findNextFocusableElement(direction) {
    // Positions des éléments pour une navigation 2D
    const positions = currentFocusableElements.map(el => {
        const rect = el.getBoundingClientRect();
        return {
            element: el,
            x: rect.left + rect.width / 2,  // centre horizontal
            y: rect.top + rect.height / 2   // centre vertical
        };
    });
    
    const currentPos = positions.find(pos => pos.element === currentFocusedElement);
    
    if (!currentPos) {
        // Si l'élément actuel n'est pas trouvé, revenir au premier
        return currentFocusableElements[0];
    }
    
    // Trouver le prochain élément selon la direction
    switch (direction) {
        case 'up':
            // Trouver l'élément le plus proche au-dessus
            return findClosestElementInDirection(currentPos, positions, (pos) => pos.y < currentPos.y);
        case 'down':
            // Trouver l'élément le plus proche en-dessous
            return findClosestElementInDirection(currentPos, positions, (pos) => pos.y > currentPos.y);
        case 'left':
            // Trouver l'élément le plus proche à gauche
            return findClosestElementInDirection(currentPos, positions, (pos) => pos.x < currentPos.x);
        case 'right':
            // Trouver l'élément le plus proche à droite
            return findClosestElementInDirection(currentPos, positions, (pos) => pos.x > currentPos.x);
        default:
            return null;
    }
}

// Trouver l'élément le plus proche dans une direction
function findClosestElementInDirection(currentPos, positions, directionFilter) {
    let bestElement = null;
    let bestDistance = Infinity;
    let bestAngleScore = Infinity;
    
    // Filtrer les éléments dans la direction souhaitée
    const elementsInDirection = positions.filter(pos => directionFilter(pos) && pos.element !== currentPos.element);
    
    if (elementsInDirection.length === 0) {
        return null;
    }
    
    // Trouver l'élément le plus proche
    elementsInDirection.forEach(pos => {
        // Calculer la distance euclidienne
        const dx = pos.x - currentPos.x;
        const dy = pos.y - currentPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculer l'angle
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        
        // Score d'angle (0 = parfaitement à droite, 90 = en bas, 180 = à gauche, 270 = en haut)
        let angleScore;
        if (directionFilter(pos) === (pos.x > currentPos.x)) { // Droite
            angleScore = Math.abs(angle);
        } else if (directionFilter(pos) === (pos.y > currentPos.y)) { // Bas
            angleScore = Math.abs(angle - 90);
        } else if (directionFilter(pos) === (pos.x < currentPos.x)) { // Gauche
            angleScore = Math.abs(angle - 180);
        } else { // Haut
            angleScore = Math.abs(angle - 270);
        }
        
        // Préférer les éléments avec un meilleur angle, à moins que la distance ne soit beaucoup plus grande
        const combinedScore = angleScore * 2 + distance * 0.1;
        
        if (combinedScore < bestAngleScore || (Math.abs(combinedScore - bestAngleScore) < 1 && distance < bestDistance)) {
            bestElement = pos.element;
            bestDistance = distance;
            bestAngleScore = combinedScore;
        }
    });
    
    return bestElement;
}