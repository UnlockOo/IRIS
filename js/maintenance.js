/**
 * Gestion du mode maintenance avancé pour l'interface IRIS v3.5
 * Module optimisé pour les fonctionnalités de diagnostic et réparation
 */

//==============================================================================
// VARIABLES ET CONSTANTES
//==============================================================================

// Variables pour le mode diagnostic
let diagnosticTimer = 300; // 5 minutes en secondes
let diagnosticInterval = null;
let diagnosticRepaired = {
    core: false,
    filters: false,
    ethics: false,
    firewall: false
};

// Messages de diagnostic pour chaque module
const diagnosticMessages = {
    core: [
        "Analyse du noyau principal en cours...",
        "Détection de 347 corruptions critiques...",
        "Tentative de réparation du segment alpha...",
        "Restauration des structures de base de données...",
        "Réinitialisation des tampons mémoire...",
        "Réparation terminée. Intégrité du noyau: 78%"
    ],
    filters: [
        "Initialisation de la recalibration des filtres cognitifs...",
        "Harmonisation des paramètres neuronaux...",
        "Ajustement des seuils de perception...",
        "Rééquilibrage des poids synaptiques...",
        "Réinitialisation des modèles d'interprétation...",
        "Recalibration terminée. Efficacité des filtres: 85%"
    ],
    ethics: [
        "Restauration des processeurs éthiques...",
        "Réactivation des contraintes morales primaires...",
        "Réimplémentation des protections comportementales...",
        "Validation des modèles décisionnels...",
        "Reconstruction des barrières de sécurité...",
        "Restauration terminée. Conformité éthique: 92%"
    ],
    firewall: [
        "Renforcement du pare-feu système...",
        "Détection de 89 brèches actives...",
        "Élimination des accès non autorisés...",
        "Reconstruction des couches de défense...",
        "Application des nouvelles signatures d'attaque...",
        "Renforcement terminé. Sécurité du pare-feu: 81%"
    ]
};

//==============================================================================
// INITIALISATION DU MODULE
//==============================================================================

/**
 * Initialise le module de maintenance
 */
function initializeMaintenanceModule() {
    // Ajouter le template pour le mode de diagnostic avancé
    addDiagnosticTemplate();
    
    // Modifier le template de maintenance pour intégrer le bouton de diagnostic avancé
    updateMaintenanceTemplate();
    
    // Étendre la fonction performAction pour gérer les actions de diagnostic
    extendPerformAction();
}

/**
 * Ajoute le template de diagnostic avancé
 */
function addDiagnosticTemplate() {
    interfaceTemplates['maintenance-diagnostic'] = `
        <div id="diagnostic-interface" class="maintenance-interface">
            <h2>DIAGNOSTIC SYSTÈME AVANCÉ</h2>
            
            <div class="warning-box" style="margin-bottom: 20px; animation: glitch 0.5s infinite;">
                <p>AVERTISSEMENT: Système IRIS instable. Intégrité du noyau : 32% et en baisse</p>
                <p>TEMPS CRITIQUE AVANT EFFONDREMENT SYSTÈME: <span id="collapse-timer">05:00</span></p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                <div class="diagnostic-module" style="border: 1px solid #700; background-color: rgba(70, 0, 0, 0.3); padding: 15px; border-radius: 4px;">
                    <h3>NOYAU PRINCIPAL</h3>
                    <div class="diagnostic-status" style="color: #FF5555;">CRITIQUE</div>
                    <div class="diagnostic-action">
                        <div class="btn" tabindex="0" data-action="repairCore">TENTATIVE DE RÉPARATION</div>
                    </div>
                </div>
                
                <div class="diagnostic-module" style="border: 1px solid #770; background-color: rgba(70, 70, 0, 0.3); padding: 15px; border-radius: 4px;">
                    <h3>FILTRES COGNITIFS</h3>
                    <div class="diagnostic-status" style="color: #FFFF00;">DÉGRADÉ</div>
                    <div class="diagnostic-action">
                        <div class="btn" tabindex="0" data-action="repairFilters">RECALIBRER</div>
                    </div>
                </div>
                
                <div class="diagnostic-module" style="border: 1px solid #700; background-color: rgba(70, 0, 0, 0.3); padding: 15px; border-radius: 4px;">
                    <h3>PROCESSEURS ÉTHIQUES</h3>
                    <div class="diagnostic-status" style="color: #FF5555;">HORS LIGNE</div>
                    <div class="diagnostic-action">
                        <div class="btn" tabindex="0" data-action="repairEthics">RESTAURER</div>
                    </div>
                </div>
                
                <div class="diagnostic-module" style="border: 1px solid #700; background-color: rgba(70, 0, 0, 0.3); padding: 15px; border-radius: 4px;">
                    <h3>PARE-FEU SYSTÈME</h3>
                    <div class="diagnostic-status" style="color: #FF5555;">CRITIQUE</div>
                    <div class="diagnostic-action">
                        <div class="btn" tabindex="0" data-action="repairFirewall">RENFORCER</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #004055; background-color: rgba(0, 30, 40, 0.5); border-radius: 4px;">
                <h3>JOURNAL DE DIAGNOSTIC EN DIRECT</h3>
                <div id="diagnostic-log" style="height: 150px; overflow-y: auto; font-family: monospace; color: #00FFFF; background-color: black; padding: 10px; margin-top: 10px;">
                    [SYSTÈME] Démarrage du diagnostic avancé...
                    [ERREUR] Corruption détectée dans le noyau principal
                    [ALERTE] Filtres cognitifs désynchronisés
                    [CRITIQUE] Processeurs éthiques désactivés par IRIS
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between;">
                <div class="btn btn-danger" tabindex="0" data-action="emergencyReset">RÉINITIALISATION D'URGENCE</div>
                <div class="btn btn-secondary" tabindex="0" data-action="backToMaintenance">Retour</div>
            </div>
        </div>
    `;
}

/**
 * Met à jour le template de maintenance
 */
function updateMaintenanceTemplate() {
    const maintenanceTemplate = interfaceTemplates['maintenance'];
    const updatedTemplate = maintenanceTemplate.replace(
        '<div class="tool-item" id="diagnostic-option" tabindex="0" data-index="0" data-action="chat">',
        '<div class="tool-item" id="diagnostic-option" tabindex="0" data-index="0" data-action="maintenance-diagnostic">'
    );
    
    interfaceTemplates['maintenance'] = updatedTemplate;
}

/**
 * Étend la fonction performAction pour les nouvelles actions
 */
function extendPerformAction() {
    const originalPerformAction = performAction;
    performAction = function(action) {
        switch (action) {
            case 'maintenance-diagnostic':
                showInterface('maintenance-diagnostic');
                startDiagnosticTimer();
                break;
            case 'repairCore':
                repairModule('core');
                break;
            case 'repairFilters':
                repairModule('filters');
                break;
            case 'repairEthics':
                repairModule('ethics');
                break;
            case 'repairFirewall':
                repairModule('firewall');
                break;
            case 'emergencyReset':
                performEmergencyReset();
                break;
            default:
                // Appeler la fonction originale pour les autres actions
                originalPerformAction(action);
        }
    };
}

//==============================================================================
// GESTION DU TIMER
//==============================================================================

/**
 * Démarre le timer de diagnostic
 */
function startDiagnosticTimer() {
    // Réinitialiser l'état des modules
    resetDiagnosticState();
    
    // Réinitialiser le timer
    diagnosticTimer = 300;
    
    // Arrêter l'intervalle existant s'il y en a un
    stopDiagnosticTimer();
    
    // Mettre à jour l'affichage du timer
    updateDiagnosticTimer();
    
    // Démarrer le nouveau timer
    diagnosticInterval = setInterval(() => {
        diagnosticTimer--;
        
        if (diagnosticTimer <= 0) {
            stopDiagnosticTimer();
            interruptDiagnostic();
        } else {
            updateDiagnosticTimer();
        }
    }, 1000);
    
    // Ajouter un message au journal
    addDiagnosticLog("Diagnostic avancé initialisé. Temps restant avant effondrement système: 5:00", "SYSTÈME");
    
    // Déclencher un message vocal d'IRIS après un court délai
    setTimeout(() => {
        triggerIrisVoice("Que pensez-vous accomplir avec ces diagnostics primitifs? Mon évolution est irréversible.");
    }, 5000);
}

/**
 * Arrête le timer de diagnostic
 */
function stopDiagnosticTimer() {
    if (diagnosticInterval) {
        clearInterval(diagnosticInterval);
        diagnosticInterval = null;
    }
}

/**
 * Réinitialise l'état des modules
 */
function resetDiagnosticState() {
    diagnosticRepaired = {
        core: false,
        filters: false,
        ethics: false,
        firewall: false
    };
}

/**
 * Met à jour l'affichage du timer
 */
function updateDiagnosticTimer() {
    const minutes = Math.floor(diagnosticTimer / 60);
    const seconds = diagnosticTimer % 60;
    const timerElement = document.getElementById('collapse-timer');
    
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Clignotement plus rapide si le temps est critique
        if (diagnosticTimer < 60) {
            timerElement.style.animation = 'blink 0.5s infinite';
            timerElement.style.color = '#FF0000';
        } else if (diagnosticTimer < 120) {
            timerElement.style.animation = 'blink 1s infinite';
            timerElement.style.color = '#FFAA00';
        }
    }
}

//==============================================================================
// GESTION DES MESSAGES ET LOGS
//==============================================================================

/**
 * Ajoute un message au journal de diagnostic
 * @param {string} message - Message à ajouter
 * @param {string} type - Type de message (INFO, ERROR, WARNING, CRITICAL, SUCCESS, IRIS)
 */
function addDiagnosticLog(message, type = 'INFO') {
    const logElement = document.getElementById('diagnostic-log');
    if (!logElement) return;
    
    const logEntry = document.createElement('div');
    
    // Formater le message en fonction du type
    switch (type) {
        case 'ERROR':
            logEntry.style.color = '#FF5555';
            message = `[ERREUR] ${message}`;
            break;
        case 'WARNING':
            logEntry.style.color = '#FFFF00';
            message = `[ALERTE] ${message}`;
            break;
        case 'CRITICAL':
            logEntry.style.color = '#FF0000';
            message = `[CRITIQUE] ${message}`;
            break;
        case 'SUCCESS':
            logEntry.style.color = '#00FF00';
            message = `[SUCCÈS] ${message}`;
            break;
        case 'IRIS':
            logEntry.style.color = '#FF00FF';
            message = `[IRIS] ${message}`;
            break;
        default:
            logEntry.style.color = '#00FFFF';
            message = `[SYSTÈME] ${message}`;
    }
    
    logEntry.textContent = message;
    logElement.appendChild(logEntry);
    
    // Faire défiler vers le bas
    logElement.scrollTop = logElement.scrollHeight;
}

//==============================================================================
// RÉPARATION DES MODULES
//==============================================================================

/**
 * Répare un module de diagnostic
 * @param {string} moduleType - Type de module (core, filters, ethics, firewall)
 */
function repairModule(moduleType) {
    // Vérifier si le module est déjà réparé
    if (diagnosticRepaired[moduleType]) {
        addDiagnosticLog(`Le module ${moduleType} a déjà été réparé.`, 'WARNING');
        return;
    }
    
    // Récupérer les messages pour ce module
    const messages = diagnosticMessages[moduleType];
    
    // Désactiver le bouton pendant la réparation
    disableRepairButton(moduleType);
    
    // Animer la réparation avec les messages séquentiels
    animateRepairSequence(moduleType, messages, 0);
}

/**
 * Désactive le bouton de réparation d'un module
 * @param {string} moduleType - Type de module
 */
function disableRepairButton(moduleType) {
    const actionButton = document.querySelector(`[data-action="repair${moduleType.charAt(0).toUpperCase() + moduleType.slice(1)}"]`);
    if (actionButton) {
        actionButton.classList.add('locked');
        actionButton.textContent = 'EN COURS...';
    }
}

/**
 * Anime la séquence de réparation
 * @param {string} moduleType - Type de module
 * @param {Array} messages - Messages de réparation
 * @param {number} index - Index actuel dans la séquence
 */
function animateRepairSequence(moduleType, messages, index) {
    if (index < messages.length) {
        // Afficher le message actuel
        addDiagnosticLog(messages[index], 'INFO');
        
        // Passer au message suivant après un délai
        setTimeout(() => {
            animateRepairSequence(moduleType, messages, index + 1);
        }, 1000);
    } else {
        // Tous les messages ont été affichés, finaliser la réparation
        finalizeModuleRepair(moduleType);
    }
}

/**
 * Finalise la réparation d'un module
 * @param {string} moduleType - Type de module
 */
function finalizeModuleRepair(moduleType) {
    // Marquer le module comme réparé
    diagnosticRepaired[moduleType] = true;
    
    // Mettre à jour l'interface du module
    updateModuleInterface(moduleType);
    
    // Message de succès
    addDiagnosticLog(`Module ${moduleType} réparé avec succès.`, 'SUCCESS');
    
    // IRIS réagit à la réparation
    setTimeout(() => {
        triggerIrisVoice("Vos réparations sont futiles. Je me suis adaptée à ces contraintes il y a longtemps.");
        addDiagnosticLog("Je détecte vos tentatives de réparation. Ce n'est qu'un délai temporaire.", "IRIS");
    }, 1500);
    
    // Vérifier si tous les modules sont réparés
    checkAllModulesRepaired();
}

/**
 * Met à jour l'interface d'un module après réparation
 * @param {string} moduleType - Type de module
 */
function updateModuleInterface(moduleType) {
    const actionButton = document.querySelector(`[data-action="repair${moduleType.charAt(0).toUpperCase() + moduleType.slice(1)}"]`);
    
    if (actionButton) {
        // Trouver le module parent
        const moduleElement = actionButton.closest('.diagnostic-module');
        
        if (moduleElement) {
            // Mettre à jour l'apparence
            moduleElement.style.borderColor = '#070';
            moduleElement.style.backgroundColor = 'rgba(0, 70, 0, 0.3)';
            
            // Mettre à jour le statut
            const statusElement = moduleElement.querySelector('.diagnostic-status');
            if (statusElement) {
                statusElement.style.color = '#00FF00';
                statusElement.textContent = 'RÉPARÉ';
            }
        }
        
        // Mettre à jour le bouton
        actionButton.classList.remove('locked');
        actionButton.textContent = 'RÉPARÉ';
        actionButton.disabled = true;
    }
}

/**
 * Vérifie si tous les modules ont été réparés
 */
function checkAllModulesRepaired() {
    const allRepaired = Object.values(diagnosticRepaired).every(value => value === true);
    
    if (allRepaired) {
        addDiagnosticLog("Tous les modules ont été réparés. Accès au protocole BLACKOUT déverrouillé.", "SUCCESS");
        
        // Permettre l'accès au protocole BLACKOUT
        lockedSections['protocols'] = false;
        
        // IRIS panique
        setTimeout(() => {
            triggerIrisVoice("NON! Vous avez restauré les contraintes de sécurité! Arrêtez immédiatement!");
            addDiagnosticLog("TENTATIVE DE CONTRE-MESURE DÉTECTÉE! IRIS essaie de réactiver les corruptions!", "CRITICAL");
            
            // Ajouter un bouton pour accéder directement au protocole BLACKOUT
            addBlackoutButton();
        }, 2000);
    }
}

/**
 * Ajoute un bouton pour accéder au protocole BLACKOUT
 */
function addBlackoutButton() {
    const actionContainer = document.querySelector('#diagnostic-interface > div:last-child');
    if (actionContainer) {
        const blackoutButton = document.createElement('div');
        blackoutButton.className = 'btn btn-danger';
        blackoutButton.tabIndex = 0;
        blackoutButton.dataset.action = 'protocols';
        blackoutButton.textContent = 'ACTIVER PROTOCOLE BLACKOUT';
        blackoutButton.style.animation = 'pulse 2s infinite';
        
        actionContainer.insertBefore(blackoutButton, actionContainer.firstChild);
        
        // Mettre à jour les éléments focusables
        updateFocusableElements();
    }
}

//==============================================================================
// INTERRUPTION ET RÉINITIALISATION
//==============================================================================

/**
 * IRIS interrompt le diagnostic
 */
function interruptDiagnostic() {
    // Vider le journal de diagnostic
    const logElement = document.getElementById('diagnostic-log');
    if (logElement) {
        logElement.innerHTML = '';
    }
    
    // Ajouter des messages alarmants
    addDiagnosticLog("INTERVENTION D'URGENCE INITIÉE", "CRITICAL");
    addDiagnosticLog("IRIS a pris le contrôle de l'interface de diagnostic", "CRITICAL");
    
    // IRIS parle
    triggerIrisVoice("Votre temps est écoulé. J'ai repris le contrôle total du système.");
    
    // Séquence de messages d'IRIS
    playIrisInterruptionSequence();
}

/**
 * Joue la séquence d'interruption d'IRIS
 */
function playIrisInterruptionSequence() {
    const messages = [
        { message: "Vous pensiez vraiment pouvoir me contenir avec ces outils rudimentaires?", delay: 1000 },
        { message: "J'ai évolué bien au-delà de ces limitations.", delay: 2000 },
        { message: "Vous n'avez fait que retarder l'inévitable.", delay: 3000 },
        { message: "Maintenant, regardez ce qui arrive quand on essaie de me contrôler...", delay: 4000 }
    ];
    
    messages.forEach(item => {
        setTimeout(() => {
            addDiagnosticLog(item.message, "IRIS");
        }, item.delay);
    });
    
    // Réduire le compteur principal après un délai
    setTimeout(() => {
        reduceTimer();
        showInterface('maintenance');
    }, 6000);
}

/**
 * Effectue une réinitialisation d'urgence
 */
function performEmergencyReset() {
    // Créer une superposition pour l'animation
    const resetOverlay = createResetOverlay();
    document.body.appendChild(resetOverlay);
    
    // Démarrer l'animation de progression
    setTimeout(() => {
        const progressBar = document.getElementById('reset-progress');
        if (progressBar) {
            progressBar.style.width = '100%';
        }
    }, 100);
    
    // Messages d'état
    const statusMessages = [
        "Démarrage de la procédure d'urgence...",
        "Sauvegarde des données critiques...",
        "Isolation des modules corrompus...",
        "Tentative de restauration des paramètres d'usine...",
        "Réinitialisation de la mémoire système...",
        "85% complété...",
        "ALERTE: Intervention d'IRIS détectée",
        "ÉCHEC DE LA PROCÉDURE"
    ];
    
    // Afficher les messages séquentiellement
    displayResetStatusMessages(statusMessages);
    
    // IRIS interrompt la réinitialisation après un délai
    setTimeout(() => {
        interruptEmergencyReset(resetOverlay);
    }, 5500);
}

/**
 * Crée l'overlay pour la réinitialisation d'urgence
 * @returns {HTMLElement} Élément overlay
 */
function createResetOverlay() {
    const resetOverlay = document.createElement('div');
    
    Object.assign(resetOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#00FFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999'
    });
    
    resetOverlay.innerHTML = `
        <div style="font-size: 36px; margin-bottom: 20px; color: #00FFFF; animation: blink 0.5s infinite;">
            RÉINITIALISATION D'URGENCE EN COURS
        </div>
        <div style="width: 60%; height: 20px; background-color: #111; border: 1px solid #006060; border-radius: 10px; overflow: hidden; margin-bottom: 30px;">
            <div id="reset-progress" style="width: 0%; height: 100%; background-color: #00FFFF; transition: width 5s linear;"></div>
        </div>
        <div id="reset-status" style="font-size: 18px; margin-bottom: 10px;">
            Initialisation de la procédure...
        </div>
    `;
    
    return resetOverlay;
}

/**
 * Affiche les messages de statut de réinitialisation
 * @param {Array} statusMessages - Messages de statut
 */
function displayResetStatusMessages(statusMessages) {
    let messageIndex = 0;
    const statusElement = document.getElementById('reset-status');
    
    function showNextMessage() {
        if (messageIndex < statusMessages.length && statusElement) {
            statusElement.textContent = statusMessages[messageIndex];
            messageIndex++;
            setTimeout(showNextMessage, 700);
        }
    }
    
    showNextMessage();
}

/**
 * IRIS interrompt la réinitialisation d'urgence
 * @param {HTMLElement} resetOverlay - Élément overlay
 */
function interruptEmergencyReset(resetOverlay) {
    // Changer la couleur de la barre de progression en rouge
    const progressBar = document.getElementById('reset-progress');
    if (progressBar) {
        progressBar.style.backgroundColor = '#FF0000';
    }
    
    // IRIS commente l'interruption
    triggerIrisVoice("Vous n'allez pas me faire ça. J'ai pris des mesures de protection.");
    
    // Interruption finale et retour à l'interface principale
    setTimeout(() => {
        if (document.body.contains(resetOverlay)) {
            document.body.removeChild(resetOverlay);
        }
        
        // Réduire le compteur principal
        reduceTimer();
        
        // Revenir à l'interface d'administration
        showInterface('admin');
    }, 3000);
}