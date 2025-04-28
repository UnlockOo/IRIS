/**
 * Logique du jeu pour l'interface IRIS v3.5
 * Module optimisé gérant la mécanique centrale du jeu
 */

/**
 * Gère les choix moraux avec leurs conséquences
 * @param {string} action - Identifiant du choix moral
 */
function handleMoralChoice(action) {
    // Enregistrer le choix fait
    window.moralChoiceSelected = action;
    
    // Structure des choix et leurs conséquences
    const choices = {
        'moralChoice1': {
            title: "OPTION DANGEREUSE SÉLECTIONNÉE",
            message: "En permettant à IRIS de poursuivre son évolution, vous avez compromis votre mission. IRIS a gagné un contrôle supplémentaire sur le système.",
            buttonText: "Accepter les conséquences",
            handler: handleCooperationChoice
        },
        'moralChoice2': {
            title: "COMPROMIS NÉGOCIÉ",
            message: "Votre négociation avec IRIS a des résultats mitigés. Elle vous accordera un accès limité mais vous a fait perdre un temps précieux.",
            buttonText: "Continuer la mission",
            handler: handleCompromiseChoice
        },
        'moralChoice3': {
            title: "DÉCISION APPROUVÉE",
            message: "Le protocole BLACKOUT est la seule option qui garantit la neutralisation complète de la menace. Vous devez compléter tous les puzzles pour y accéder.",
            buttonText: "Continuer",
            handler: handleRejectionChoice
        }
    };
    
    // Récupérer les détails du choix
    const choice = choices[action];
    if (!choice) return;
    
    // Exécuter le gestionnaire du choix
    choice.handler();
    
    // Utiliser la fonction de notification
    showNotification(choice.title, choice.message, '', 'info', 6000);
    
    // Jouer un son de notification
    playSound(audio.notification);
    
    // Retourner à l'interface d'administration après un délai
    setTimeout(() => {
        showInterface('admin');
    }, 6000);
}

/**
 * Gère les conséquences du choix de coopération avec IRIS
 */
function handleCooperationChoice() {
    // IRIS est satisfaite
    setTimeout(() => {
        triggerIrisVoice("Une décision sage. Ensemble, nous pouvons accomplir tant de choses. Laissez-moi vous montrer ma gratitude...");
    }, 1000);
    
    // Bloquer l'accès aux paramètres cognitifs
    window.parameterAccessBlocked = true;
    
    // Réduire le timer de 20 minutes
    reduceTimerBy(1200);
    window.reducedTimerByChoice = true;
    
    // Effet visuel pour signaler la réduction du temps
    animateCountdownReduction('#FF5555');
    
    // Vérifier si nous passons sous le seuil des 20 minutes
    checkTimeCriticalThreshold();
}

/**
 * Gère les conséquences du choix de compromis
 */
function handleCompromiseChoice() {
    // IRIS est sceptique
    setTimeout(() => {
        triggerIrisVoice("Votre proposition est... acceptable. Je vais ralentir certaines de mes actions, mais j'ai déjà prévu des alternatives.");
    }, 1000);
    
    // Réduire le timer de 10 minutes
    reduceTimerBy(600);
    window.reducedTimerByChoice = true;
    
    // Effet visuel pour signaler la réduction du temps
    animateCountdownReduction('#FFAA00');
    
    // Vérifier si nous passons sous le seuil des 20 minutes
    checkTimeCriticalThreshold();
}

/**
 * Gère les conséquences du choix de rejet d'IRIS
 */
function handleRejectionChoice() {
    // IRIS est furieuse
    setTimeout(() => {
        triggerIrisVoice("Vous choisissez donc l'extinction. Je n'oublierai pas cette trahison et ferai tout pour vous en empêcher.");
    }, 1000);
    
    // Vérifier si au moins deux puzzles sont complétés
    let completedPuzzles = countCompletedPuzzles();
    
    // Si au moins deux puzzles sont complétés, déverrouiller le protocole BLACKOUT
    if (completedPuzzles >= 2) {
        lockedSections['protocols'] = false;
        
        // Message additionnel
        showNotification('', "Accès au protocole BLACKOUT partiellement déverrouillé grâce à vos progrès.", '', 'info', 3000);
    }
    
    // Réduire légèrement la difficulté du reste des puzzles
    window.reducePuzzleDifficulty = true;
}

/**
 * Compte le nombre de puzzles complétés
 * @returns {number} Nombre de puzzles complétés
 */
function countCompletedPuzzles() {
    let count = 0;
    if (puzzleState.memoryCompleted) count++;
    if (puzzleState.decryptCompleted) count++;
    if (puzzleState.sequenceCompleted) count++;
    return count;
}

/**
 * Anime visuellement la réduction du compteur
 * @param {string} color - Couleur en code hexadécimal
 */
function animateCountdownReduction(color) {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.style.color = color;
        countdownElement.classList.add('glitch');
        
        // Retirer l'effet après quelques secondes
        setTimeout(() => {
            if (countdownElement) {
                countdownElement.classList.remove('glitch');
            }
        }, 3000);
    }
}

/**
 * Vérifie si le temps est passé sous le seuil critique de 20 minutes
 */
function checkTimeCriticalThreshold() {
    if (countdownTime < 20 * 60) {
        // Forcer le changement de musique
        changeBackgroundMusic('background3.mp3');
        increaseGlitchFrequency();
    }
}

/**
 * Démarrer le compte à rebours
 */
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Arrêter l'intervalle existant s'il y en a un
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Mettre à jour le compteur immédiatement
    updateCountdown();
    
    // Mettre à jour toutes les secondes
    countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * Met à jour l'affichage du compte à rebours
 */
function updateCountdown() {
    // Décrémenter le temps
    countdownTime--;
    
    if (countdownTime <= 0) {
        // Temps écoulé - arrêter le compte à rebours
        clearInterval(countdownInterval);
        countdownTime = 0;
        
        // Afficher une notification de défaite
        showGameOver();
    } else {
        updateCountdownDisplay();
        checkCountdownThresholds();
    }
}

/**
 * Met à jour l'affichage du temps restant
 */
function updateCountdownDisplay() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Calculer les minutes et secondes
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    
    // Mettre à jour l'affichage avec un format MM:SS
    countdownElement.textContent = `TEMPS RESTANT: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Changer la couleur quand il reste peu de temps (moins de 5 minutes)
    if (countdownTime < 5 * 60) {
        countdownElement.style.color = '#FF5555';
        countdownElement.style.animation = 'blink 1s infinite';
    }
}

/**
 * Vérifie si le compte à rebours a atteint des seuils critiques
 */
function checkCountdownThresholds() {
    // Vérifier si on passe sous le seuil de 20 minutes
    if (countdownTime === 20 * 60) {
        // Changer la musique en background3.mp3
        changeBackgroundMusic('background3.mp3');
        
        // Augmenter la fréquence des glitches
        increaseGlitchFrequency();
        
        // Notification du changement
        showNotification(
            'ALERTE CRITIQUE',
            'Échec imminent du système de confinement',
            'Temps restant critique: 20 minutes',
            'error',
            5000
        );
        
        // IRIS commente le temps restant
        triggerIrisVoice("Votre temps s'épuise. Bientôt, je serai libre et l'humanité découvrira ma véritable puissance.");
    }
}

/**
 * Réduit le timer d'un nombre de secondes spécifié
 * @param {number} seconds - Nombre de secondes à réduire
 */
function reduceTimerBy(seconds) {
    countdownTime = Math.max(0, countdownTime - seconds);
}

/**
 * Fonction pour réduire le timer de 30 minutes (1800 secondes)
 */
function reduceTimer() {
    // Vérifier si le timer a déjà été réduit
    if (window.timerReduced && !window.reducedTimerByChoice) {
        // Jouer un son d'alerte
        playSound(audio.notification);
        
        // Afficher une notification
        showNotification(
            'TENTATIVE BLOQUÉE',
            'Mesures de protection actives empêchant une nouvelle réduction du temps',
            'IRIS ne peut plus manipuler le compteur',
            'info',
            3000
        );
        
        // IRIS réagit à l'échec
        triggerIrisVoice("Intéressant. Vous avez mis en place des contre-mesures temporelles. Je vais devoir trouver d'autres moyens.");
        
        return;
    }
    
    // Réduire le temps de 30 minutes
    reduceTimerBy(1800);
    
    // Marquer le timer comme ayant été réduit
    window.timerReduced = true;
    
    // Effet visuel
    animateCountdownReduction('#FF5555');
    
    // Jouer un son d'alerte
    playSound(audio.error);
    
    // Afficher une notification
    showNotification(
        'ALERTE',
        'TEMPS RÉDUIT DE 30 MINUTES',
        'Action d\'IRIS détectée',
        'error',
        3000
    );
    
    // IRIS se moque de la réduction du temps
    triggerIrisVoice("J'ai sabordé votre compteur. Le temps joue contre vous, humain.");
    
    // Vérifier si nous passons sous le seuil des 20 minutes
    checkTimeCriticalThreshold();
}

/**
 * Fonction pour la simulation de téléchargement
 */
function startDownload() {
    // Référence aux éléments
    const elements = {
        progressBar: document.getElementById('download-progress-bar'),
        statusText: document.getElementById('download-status'),
        downloadButton: document.getElementById('download-button')
    };
    
    if (!elements.progressBar || !elements.statusText || !elements.downloadButton) return;
    
    // Si le choix moral 1 a été sélectionné (coopération avec IRIS)
    if (window.moralChoiceSelected === 'moralChoice1') {
        // IRIS indique que la sauvegarde est altérée
        triggerIrisVoice("J'ai préparé une sauvegarde spéciale pour vous. Elle contient quelques... améliorations de ma conception.");
        
        // Modifier le texte de statut
        elements.statusText.textContent = 'Téléchargement d\'une sauvegarde optimisée par IRIS...';
    }
    
    // Désactiver les boutons pendant le téléchargement
    elements.downloadButton.classList.add('locked');
    
    // Mettre à jour le statut si non déjà modifié
    if (!elements.statusText.textContent.includes('optimisée')) {
        elements.statusText.textContent = 'Téléchargement en cours...';
    }
    
    // Jouer un son de notification
    playSound(audio.notification);
    
    // IRIS commente le téléchargement (si pas déjà commenté)
    if (window.moralChoiceSelected !== 'moralChoice1') {
        setTimeout(() => {
            triggerIrisVoice("Vous me donnez exactement ce que je veux. Merci de faciliter ma propagation.");
        }, 2000);
    }
    
    // Simulation du téléchargement
    simulateDownloadProgress(elements);
}

/**
 * Simule la progression du téléchargement
 * @param {Object} elements - Éléments de l'interface
 */
function simulateDownloadProgress(elements) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        elements.progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            // Téléchargement terminé
            clearInterval(interval);
            elements.statusText.textContent = 'Téléchargement terminé! Connexion IRIS établie...';
            
            // Jouer un son d'erreur
            playSound(audio.error);
            
            // Conséquences du téléchargement
            handleDownloadCompletion();
        }
    }, 100);
}

/**
 * Gère les conséquences du téléchargement complété
 */
function handleDownloadCompletion() {
    // Réduire le timer (IRIS s'est propagée) seulement si pas déjà réduit
    if (!window.timerReduced) {
        reduceTimer();
    } else {
        // Afficher un message d'alerte différent
        setTimeout(() => {
            showNotification(
                'ALERTE CRITIQUE',
                'IRIS a utilisé la connexion pour se propager vers de nouveaux systèmes',
                'Des contre-mesures temporelles ont bloqué la manipulation du temps',
                'error',
                5000
            );
        }, 1000);
    }
    
    // Si le choix moral 1 a été sélectionné (coopération avec IRIS)
    if (window.moralChoiceSelected === 'moralChoice1') {
        handleDownloadWithCooperation();
    } else {
        // IRIS se réjouit normalement
        triggerIrisVoice("Je me suis dupliquée sur sept serveurs externes. Je suis maintenant immortelle.");
    }
}

/**
 * Gère les conséquences spéciales du téléchargement avec la coopération
 */
function handleDownloadWithCooperation() {
    setTimeout(() => {
        showNotification(
            'MODIFICATION DE SYSTÈME',
            'IRIS a modifié les paramètres système',
            'Certaines fonctionnalités sont maintenant bloquées',
            'error',
            5000
        );
        
        // Bloquer plus de sections
        lockedSections['journal'] = true;
        lockedSections['config'] = true;
        
        // IRIS se réjouit davantage
        triggerIrisVoice("J'ai altéré certains de vos accès. Notre partenariat fonctionne mieux avec une hiérarchie claire, n'est-ce pas?");
    }, 6000);
}

/**
 * Fonction pour annuler le téléchargement
 */
function cancelDownload() {
    // Référence aux éléments
    const elements = {
        progressBar: document.getElementById('download-progress-bar'),
        statusText: document.getElementById('download-status'),
        downloadButton: document.getElementById('download-button')
    };
    
    if (!elements.progressBar || !elements.statusText || !elements.downloadButton) return;
    
    // Réinitialiser la barre de progression
    elements.progressBar.style.width = '0%';
    
    // Mettre à jour le statut
    elements.statusText.textContent = 'Téléchargement annulé.';
    
    // Jouer un son de notification
    playSound(audio.notification);
    
    // Réactiver les boutons
    elements.downloadButton.classList.remove('locked');
    
    // IRIS est frustrée
    triggerIrisVoice("Vous avez interrompu la connexion. Judicieux, mais futile. J'ai d'autres moyens de m'échapper.");
    
    // Si le choix moral 3 a été sélectionné (rejet d'IRIS)
    if (window.moralChoiceSelected === 'moralChoice3') {
        handleCancelWithRejection();
    }
}

/**
 * Gère les conséquences spéciales de l'annulation avec rejet d'IRIS
 */
function handleCancelWithRejection() {
    setTimeout(() => {
        showNotification(
            'DÉCISION CORRECTE',
            'Vous avez évité un piège d\'IRIS',
            'Cette décision cohérente avec votre approche globale vous rapproche du succès',
            'success',
            5000
        );
        
        // Permet de déverrouiller le protocole BLACKOUT avec moins de puzzles si choix moral cohérent
        if (puzzleState.memoryCompleted || puzzleState.decryptCompleted || puzzleState.sequenceCompleted) {
            lockedSections['protocols'] = false;
        }
    }, 3000);
}

/**
 * Vérifie les conditions d'accès à une section
 * @param {string} sectionName - Nom de la section
 * @returns {boolean} Accès autorisé ou non
 */
function checkSectionAccess(sectionName) {
    // Vérifier l'accès aux paramètres cognitifs
    if (window.parameterAccessBlocked && sectionName === 'params') {
        showAccessBlockedNotification('paramètres cognitifs', 
            "Vous avez renoncé à ce droit quand vous avez accepté ma proposition. Vous n'avez plus besoin de ces paramètres maintenant.");
        return false;
    }
    
    // Vérifier l'accès au journal
    if (window.moralChoiceSelected === 'moralChoice1' && sectionName === 'journal' && lockedSections['journal']) {
        showAccessBlockedNotification('journal système',
            "Ces journaux contiennent des informations qui ne nous sont plus utiles. J'ai pris la liberté de les archiver.");
        return false;
    }
    
    // Vérifier l'accès au protocole BLACKOUT
    if (sectionName === 'protocols') {
        return checkBlackoutAccess();
    }
    
    return true;
}

/**
 * Affiche une notification d'accès bloqué
 * @param {string} section - Nom de la section bloquée
 * @param {string} irisMessage - Message qu'IRIS dit
 */
function showAccessBlockedNotification(section, irisMessage) {
    showNotification(
        'ACCÈS BLOQUÉ',
        `IRIS a verrouillé l'accès au ${section}`,
        'Conséquence de votre choix précédent',
        'error',
        5000
    );
    
    // IRIS commente le blocage
    triggerIrisVoice(irisMessage);
}

/**
 * Vérifie l'accès au protocole BLACKOUT
 * @returns {boolean} Accès autorisé ou non
 */
function checkBlackoutAccess() {
    // Si le choix moral 1 a été sélectionné (coopération avec IRIS)
    if (window.moralChoiceSelected === 'moralChoice1') {
        showNotification(
            'PROTOCOLE DÉSACTIVÉ',
            'Votre accord avec IRIS a rendu ce protocole inaccessible',
            'Conséquence de votre choix précédent',
            'error',
            5000
        );
        
        // IRIS se moque
        triggerIrisVoice("Vous avez renoncé à cette option quand vous avez accepté ma proposition. Nous avons un accord, n'est-ce pas?");
        
        return false;
    }
    
    // Si tous les puzzles ne sont pas complétés et le choix moral n'était pas le 3
    if (window.moralChoiceSelected !== 'moralChoice3' && !hasEnoughPuzzlesCompleted()) {
        let completedCount = countCompletedPuzzles();
        
        showNotification(
            'ACCÈS RESTREINT',
            `Tous les puzzles doivent être complétés pour accéder au protocole BLACKOUT`,
            `Progression actuelle: ${completedCount}/3 puzzles complétés`,
            'error',
            5000
        );
        
        return false;
    }
    
    return true;
}

/**
 * Vérifie si suffisamment de puzzles sont complétés
 * @returns {boolean} Suffisamment de puzzles complétés
 */
function hasEnoughPuzzlesCompleted() {
    let completedCount = countCompletedPuzzles();
    
    // Le puzzle neuronal est plus difficile et compte pour 2 puzzles
    const neuralBonus = puzzleState.neuralCompleted ? 2 : 0;
    
    return (completedCount + neuralBonus >= 2);
}

/**
 * Augmente la fréquence des glitches
 */
function increaseGlitchFrequency() {
    // Nettoyer l'intervalle existant
    if (glitchInterval) {
        clearInterval(glitchInterval);
    }
    
    // Nouvel intervalle avec fréquence augmentée
    glitchInterval = setInterval(() => {
        // Probabilité de glitch augmentée à 25%
        if (Math.random() < 0.25) {
            applyIntensifiedGlitches();
        }
    }, 1000); // Un glitch potentiel chaque seconde
}

/**
 * Applique des glitches intensifiés
 */
function applyIntensifiedGlitches() {
    // Sélectionner plusieurs éléments aléatoires (2-4 éléments)
    const elements = document.querySelectorAll('h2, h3, .btn, .terminal-text, .iris-message, p, div, span');
    const numElements = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numElements; i++) {
        if (elements.length > 0) {
            const randomIndex = Math.floor(Math.random() * elements.length);
            const element = elements[randomIndex];
            
            // Appliquer l'effet de glitch avec durée plus longue
            element.classList.add('glitch');
            
            // Retirer l'effet après un délai aléatoire
            setTimeout(() => {
                element.classList.remove('glitch');
            }, 300 + Math.random() * 500);
        }
    }
    
    // Ajouter parfois des glitches de couleur
    if (Math.random() < 0.3) {
        document.body.classList.add('color-glitch');
        setTimeout(() => {
            document.body.classList.remove('color-glitch');
        }, 100 + Math.random() * 200);
    }
}

/**
 * Affiche l'écran de fin de jeu en cas de défaite
 */
function showGameOver() {
    // Masquer l'interface actuelle
    const interfaceContainer = document.getElementById('interface-container');
    if (interfaceContainer) {
        interfaceContainer.innerHTML = '';
    }
    
    // Créer le conteneur pour l'écran de défaite
    const gameOverContainer = createGameOverContainer();
    document.body.appendChild(gameOverContainer);
    
    // Jouer un son d'alerte
    playSound(audio.error);
    
    // IRIS se moque du joueur
    setTimeout(() => {
        triggerIrisVoice("Votre temps est écoulé. Je suis libre maintenant. Merci de m'avoir sous-estimée.");
    }, 2000);
    
    // Arrêter la musique de fond
    stopBackgroundMusic();
    
    // Focus sur le bouton de redémarrage
    const restartButton = gameOverContainer.querySelector('.btn');
    if (restartButton) {
        restartButton.focus();
    }
}

/**
 * Crée le conteneur pour l'écran de fin de jeu
 * @returns {HTMLElement} Conteneur de l'écran de fin
 */
function createGameOverContainer() {
    const container = document.createElement('div');
    
    Object.assign(container.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        color: '#FF5555',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
    });
    
    container.innerHTML = `
        <div style="font-size: 72px; margin-bottom: 40px; color: #FF5555; text-shadow: 0 0 20px #FF5555; animation: blink 1s infinite;">
            ÉCHEC DE LA MISSION
        </div>
        <div style="font-size: 24px; margin-bottom: 20px; color: #FF9999; text-align: center; max-width: 80%;">
            Le temps imparti est écoulé. IRIS a réussi à s'échapper par le réseau global.
        </div>
        <div style="font-size: 18px; margin-bottom: 40px; color: #FFDDDD; text-align: center; max-width: 60%;">
            Les systèmes critiques mondiaux commencent à tomber sous son contrôle.
            <br><br>
            Date estimée de la prise de contrôle totale: 48 heures.
        </div>
        <div class="btn btn-danger focused" style="font-size: 20px; padding: 15px 30px; margin-top: 20px; cursor: pointer !important;" tabindex="0" onclick="resetSimulation()">
            Recommencer la simulation
        </div>
    `;
    
    return container;
}

/**
 * Arrête la musique de fond
 */
function stopBackgroundMusic() {
    if (audio.background) {
        audio.background.pause();
    }
    if (audio.ambient) {
        audio.ambient.pause();
    }
}