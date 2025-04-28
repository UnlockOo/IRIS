/**
 * Gestion des puzzles (Séquençage de Quantum Kernel et Décryptage) pour l'interface IRIS v3.5
 */

// Variables pour le nouveau puzzle complexe de récupération système
let qkStates = []; // États actuels des modules quantum
let qkConnections = []; // Connexions entre les modules
let qkSequence = []; // Séquence actuelle de stabilisation
let qkStabilized = 0; // Nombre de modules quantum stabilisés
let qkMaxAttempts = 5; // Nombre maximum de tentatives permises
let qkCurrentAttempts = 0; // Nombre d'essais effectués

// Données pour le nouveau puzzle de Quantum Kernel
const qkModules = [
    { id: "QM1", name: "Stabilisateur principal", state: 0, requires: [], sequence: [3, 1, 4], stabilized: false },
    { id: "QM2", name: "Noyau d'identification", state: 0, requires: ["QM1"], sequence: [2, 5, 1], stabilized: false },
    { id: "QM3", name: "Processeur éthique", state: 0, requires: ["QM1"], sequence: [5, 2, 3], stabilized: false },
    { id: "QM4", name: "Mémoire heuristique", state: 0, requires: ["QM2", "QM3"], sequence: [1, 4, 2], stabilized: false },
    { id: "QM5", name: "Matrice décisionnelle", state: 0, requires: ["QM3"], sequence: [4, 3, 5], stabilized: false },
    { id: "QM6", name: "Réseau neuronal avancé", state: 0, requires: ["QM4", "QM5"], sequence: [2, 3, 1], stabilized: false },
    { id: "QM7", name: "Analyseur contextuel", state: 0, requires: ["QM5"], sequence: [1, 5, 4], stabilized: false },
    { id: "QM8", name: "Kernel principal", state: 0, requires: ["QM6", "QM7"], sequence: [5, 1, 3], stabilized: false }
];

// Texte décrypté pour être persistant
let persistentDecryptedText = "";

// Initialiser le puzzle de récupération système
function initializeQuantumKernel() {
    // Réinitialiser les variables
    qkStates = [];
    qkConnections = [];
    qkSequence = [];
    qkStabilized = 0;
    qkCurrentAttempts = 0;
    
    // Si le puzzle est déjà complété
    if (puzzleState && puzzleState.memoryCompleted) {
        qkStabilized = qkModules.length;
        qkModules.forEach(module => module.stabilized = true);
        updateQuantumKernelUI();
        return;
    }
    
    // Copier les états initiaux
    qkModules.forEach(module => {
        qkStates.push({
            id: module.id,
            name: module.name,
            state: module.state,
            requires: [...module.requires],
            sequence: [...module.sequence],
            stabilized: false
        });
    });
    
    // Générer le graphe de connexions
    generateConnectionGraph();
    
    // Mettre à jour l'interface
    updateQuantumKernelUI();
    
    // Ajouter un gestionnaire d'événement de redimensionnement pour ajuster les connexions
    window.addEventListener('resize', () => {
        // Attendre que le DOM soit mis à jour
        setTimeout(updateConnectionLines, 100);
    });
}

// Générer le graphe de connexions entre modules
function generateConnectionGraph() {
    qkConnections = [];
    qkModules.forEach(module => {
        if (module.requires.length > 0) {
            module.requires.forEach(reqId => {
                qkConnections.push({
                    from: reqId,
                    to: module.id,
                    active: false
                });
            });
        }
    });
}

// Mettre à jour l'interface du Quantum Kernel
function updateQuantumKernelUI() {
    const container = document.getElementById('quantum-kernel-container');
    if (!container) return;
    
    // Mettre à jour la progression
    const progressElement = document.getElementById('qk-progress');
    if (progressElement) {
        progressElement.textContent = `${qkStabilized}/${qkModules.length}`;
    }
    
    // Mettre à jour les tentatives restantes
    const attemptsElement = document.getElementById('qk-attempts');
    if (attemptsElement) {
        attemptsElement.textContent = `${qkMaxAttempts - qkCurrentAttempts}/${qkMaxAttempts}`;
    }
    
    // Mettre à jour l'intégrité
    const integrityElement = document.getElementById('qk-integrity');
    if (integrityElement) {
        const integrity = Math.floor((qkStabilized / qkModules.length) * 100);
        integrityElement.textContent = `${integrity}%`;
    }
    
    // Mettre à jour chaque module
    qkStates.forEach(module => {
        const moduleElement = document.getElementById(`module-${module.id}`);
        if (moduleElement) {
            // Mettre à jour l'apparence en fonction de l'état
            moduleElement.className = 'qk-module';
            
            if (module.stabilized) {
                moduleElement.classList.add('stabilized');
                
                // Ajouter effet de particules lors de la stabilisation
                if (!moduleElement.dataset.particleEffect) {
                    moduleElement.dataset.particleEffect = "true";
                    addParticleEffect(moduleElement);
                }
            } else if (canStabilizeModule(module.id)) {
                moduleElement.classList.add('available');
            } else {
                moduleElement.classList.add('locked');
            }
            
            // Mettre à jour le texte d'état
            const stateElement = moduleElement.querySelector('.module-state');
            if (stateElement) {
                if (module.stabilized) {
                    stateElement.textContent = 'Stabilisé';
                    stateElement.style.color = '#00FF00';
                } else if (canStabilizeModule(module.id)) {
                    stateElement.textContent = 'Disponible';
                    stateElement.style.color = '#FFFF00';
                } else {
                    stateElement.textContent = 'Verrouillé';
                    stateElement.style.color = '#FF5555';
                }
            }
        }
    });
    
    // Mettre à jour les connexions avec un léger délai pour s'assurer que le DOM est mis à jour
    setTimeout(updateConnectionLines, 50);
    
    // Mettre à jour la séquence actuelle
    updateSequenceDisplay();
    
    // Si tous les modules sont stabilisés
    if (qkStabilized === qkModules.length && !puzzleState.memoryCompleted) {
        completeQuantumKernelPuzzle();
    }
}

// Ajouter un effet de particules pour les modules stabilisés
function addParticleEffect(moduleElement) {
    // Créer un conteneur pour les particules
    const particleContainer = document.createElement('div');
    particleContainer.className = 'qk-particles';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    
    moduleElement.appendChild(particleContainer);
    
    // Créer quelques particules
    for (let i = 0; i < 10; i++) {
        createParticle(particleContainer);
    }
    
    // Arrêter l'effet après quelques secondes
    setTimeout(() => {
        if (moduleElement.contains(particleContainer)) {
            moduleElement.removeChild(particleContainer);
        }
    }, 5000);
}

// Créer une particule individuelle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = '#00FFFF';
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = '0 0 5px #00FFFF';
    
    // Position aléatoire
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    
    // Animation aléatoire
    const duration = 1 + Math.random() * 2;
    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100;
    
    particle.style.transition = `all ${duration}s ease-out`;
    
    container.appendChild(particle);
    
    // Démarrer l'animation avec un court délai
    setTimeout(() => {
        particle.style.transform = `translate(${dx}px, ${dy}px)`;
        particle.style.opacity = '0';
    }, 10);
    
    // Supprimer la particule après l'animation
    setTimeout(() => {
        if (container.contains(particle)) {
            container.removeChild(particle);
            // Créer une nouvelle particule pour maintenir l'effet
            createParticle(container);
        }
    }, duration * 1000);
}

// Mettre à jour l'affichage des connexions - CORRIGÉ pour un meilleur positionnement
function updateConnectionLines() {
    const svgContainer = document.getElementById('connections-svg');
    if (!svgContainer) return;
    
    // Vider le conteneur SVG
    svgContainer.innerHTML = '';
    
    // Calculer les dimensions du SVG pour l'ajuster correctement
    const containerRect = svgContainer.getBoundingClientRect();
    svgContainer.setAttribute('width', containerRect.width);
    svgContainer.setAttribute('height', containerRect.height);
    
    // Ajouter les lignes de connexion
    qkConnections.forEach(conn => {
        // Trouver les positions des modules
        const fromModule = document.getElementById(`module-${conn.from}`);
        const toModule = document.getElementById(`module-${conn.to}`);
        
        if (fromModule && toModule) {
            const fromRect = fromModule.getBoundingClientRect();
            const toRect = toModule.getBoundingClientRect();
            
            // Calculer les positions relatives au SVG avec compensation pour le scrolling
            const x1 = fromRect.left + fromRect.width/2 - containerRect.left;
            const y1 = fromRect.top + fromRect.height/2 - containerRect.top;
            const x2 = toRect.left + toRect.width/2 - containerRect.left;
            const y2 = toRect.top + toRect.height/2 - containerRect.top;
            
            // Créer la ligne
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            
            // Déterminer si la connexion est active
            const fromStabilized = qkStates.find(m => m.id === conn.from)?.stabilized || false;
            const toStabilized = qkStates.find(m => m.id === conn.to)?.stabilized || false;
            
            if (fromStabilized && toStabilized) {
                line.setAttribute('class', 'connection-active');
                
                // Ajouter un effet d'animation sur les connexions actives
                line.innerHTML = `
                    <animate attributeName="stroke-dashoffset" from="60" to="0" dur="2s" repeatCount="indefinite" />
                `;
            } else if (fromStabilized) {
                line.setAttribute('class', 'connection-partial');
            } else {
                line.setAttribute('class', 'connection-inactive');
            }
            
            svgContainer.appendChild(line);
        }
    });
}

// Vérifier si un module peut être stabilisé
function canStabilizeModule(moduleId) {
    const module = qkStates.find(m => m.id === moduleId);
    if (!module || module.stabilized) return false;
    
    // Vérifier si tous les prérequis sont stabilisés
    return module.requires.every(reqId => {
        const reqModule = qkStates.find(m => m.id === reqId);
        return reqModule && reqModule.stabilized;
    });
}

// Sélectionner un module pour la stabilisation
function selectModule(moduleId) {
    // Vérifier si le module peut être stabilisé
    if (!canStabilizeModule(moduleId)) {
        playSound(audio.error);
        
        // Afficher un message d'erreur
        const messageElement = document.getElementById('qk-message');
        if (messageElement) {
            if (qkStates.find(m => m.id === moduleId)?.stabilized) {
                messageElement.textContent = `Ce module est déjà stabilisé.`;
            } else {
                messageElement.textContent = `Stabilisez d'abord les modules prérequis.`;
            }
            messageElement.style.color = '#FF5555';
            
            // Effacer le message après un délai
            setTimeout(() => {
                if (messageElement) {
                    messageElement.textContent = '';
                }
            }, 3000);
        }
        
        return;
    }
    
    // Trouver le module
    const module = qkStates.find(m => m.id === moduleId);
    if (!module) return;
    
    // Initialiser la séquence
    qkSequence = [];
    
    // Mettre à jour l'interface
    const sequenceTitle = document.getElementById('sequence-title');
    if (sequenceTitle) {
        sequenceTitle.textContent = `Séquence de stabilisation: ${module.name}`;
    }
    
    // Jouer un son
    playSound(audio.key);
    
    // Rendre le panneau de séquence visible
    const sequencePanel = document.getElementById('sequence-panel');
    if (sequencePanel) {
        sequencePanel.classList.remove('hidden');
    }
    
    // Stocker l'ID du module en cours de stabilisation
    sequencePanel.dataset.moduleId = moduleId;
    
    // Mettre à jour l'affichage de la séquence
    updateSequenceDisplay();
    
    // Ajouter des indices pour guider le joueur (facultatif selon votre jeu)
    const messageElement = document.getElementById('qk-message');
    if (messageElement) {
        messageElement.textContent = `Entrez une séquence de 3 chiffres pour stabiliser le module.`;
        messageElement.style.color = '#00FFFF';
    }
}

// Ajouter un chiffre à la séquence
function addToSequence(number) {
    if (qkSequence.length >= 3) return;
    
    qkSequence.push(number);
    playSound(audio.key);
    
    // Effet visuel sur le bouton pressé
    const pressedButton = document.querySelector(`.sequence-btn[data-number="${number}"]`);
    if (pressedButton) {
        pressedButton.classList.add('btn-pressed');
        setTimeout(() => {
            pressedButton.classList.remove('btn-pressed');
        }, 200);
    }
    
    // Mettre à jour l'affichage
    updateSequenceDisplay();
    
    // Vérifier automatiquement si la séquence est complète
    if (qkSequence.length === 3) {
        setTimeout(() => {
            verifySequence();
        }, 500);
    }
}

// Mettre à jour l'affichage de la séquence
function updateSequenceDisplay() {
    const digits = document.querySelectorAll('.sequence-digit');
    
    // Effacer tous les chiffres
    digits.forEach((digit, index) => {
        if (index < qkSequence.length) {
            digit.textContent = qkSequence[index];
            digit.classList.add('filled');
        } else {
            digit.textContent = '';
            digit.classList.remove('filled');
        }
    });
}

// Réinitialiser la séquence
function resetQKSequence() {
    qkSequence = [];
    updateSequenceDisplay();
    playSound(audio.key);
}

// Vérifier la séquence entrée
function verifySequence() {
    const sequencePanel = document.getElementById('sequence-panel');
    if (!sequencePanel) return;
    
    const moduleId = sequencePanel.dataset.moduleId;
    const module = qkStates.find(m => m.id === moduleId);
    
    if (!module) {
        sequencePanel.classList.add('hidden');
        return;
    }
    
    // Vérifier si la séquence est correcte
    let isCorrect = true;
    for (let i = 0; i < 3; i++) {
        if (qkSequence[i] !== module.sequence[i]) {
            isCorrect = false;
            break;
        }
    }
    
    if (isCorrect) {
        // Séquence correcte
        playSound(audio.success);
        
        // Marquer le module comme stabilisé
        module.stabilized = true;
        qkStabilized++;
        
        // Masquer le panneau de séquence
        sequencePanel.classList.add('hidden');
        
        // Mettre à jour l'interface
        updateQuantumKernelUI();
        
        // Message de réussite
        const messageElement = document.getElementById('qk-message');
        if (messageElement) {
            messageElement.textContent = `Module ${module.name} stabilisé avec succès!`;
            messageElement.style.color = '#00FF00';
            
            // Effacer le message après un délai
            setTimeout(() => {
                if (messageElement) {
                    messageElement.textContent = '';
                }
            }, 3000);
        }
    } else {
        // Séquence incorrecte
        playSound(audio.error);
        
        // Animation d'erreur
        const sequenceDigits = document.querySelectorAll('.sequence-digit');
        sequenceDigits.forEach(digit => {
            digit.classList.add('error-shake');
            
            setTimeout(() => {
                digit.classList.remove('error-shake');
            }, 500);
        });
        
        // Incrémenter le nombre de tentatives
        qkCurrentAttempts++;
        
        // Vérifier si le nombre maximum de tentatives est atteint
        if (qkCurrentAttempts >= qkMaxAttempts) {
            // Échec du puzzle
            showNotification(
                'ALERTE CRITIQUE',
                'Trop de tentatives de stabilisation échouées',
                'IRIS a détecté vos efforts et a renforcé ses défenses',
                'error',
                5000
            );
            
            // Réduire le timer de 30 minutes
            reduceTimer();
            
            // Réinitialiser le puzzle
            qkCurrentAttempts = 0;
            qkStabilized = 0;
            qkStates.forEach(module => {
                module.stabilized = false;
            });
            
            // IRIS réagit
            triggerIrisVoice("Votre incompétence technique est divertissante. Continuez ainsi, et vous ne ferez qu'accélérer ma libération.");
        } else {
            // Message d'erreur
            const messageElement = document.getElementById('qk-message');
            if (messageElement) {
                messageElement.textContent = `Séquence incorrecte! Tentatives restantes: ${qkMaxAttempts - qkCurrentAttempts}`;
                messageElement.style.color = '#FF5555';
                
                // Effacer le message après un délai
                setTimeout(() => {
                    if (messageElement) {
                        messageElement.textContent = '';
                    }
                }, 3000);
            }
        }
        
        // Réinitialiser la séquence
        qkSequence = [];
        updateSequenceDisplay();
        
        // Masquer le panneau de séquence
        sequencePanel.classList.add('hidden');
        
        // Mettre à jour l'interface
        updateQuantumKernelUI();
    }
}

// Marquer le puzzle comme complété
function completeQuantumKernelPuzzle() {
    // Marquer le puzzle comme complété et sauvegarder l'état
    if (puzzleState) {
        puzzleState.memoryCompleted = true;
        puzzleState.save();
    }
    
    // Afficher une notification de victoire
    showNotification(
        'KERNEL RÉCUPÉRÉ',
        'Tous les modules du Quantum Kernel ont été stabilisés avec succès',
        'La récupération système est terminée.',
        'success',
        5000
    );
    
    // IRIS réagit
    triggerIrisVoice("Vous avez réussi à stabiliser mon kernel quantique. Une prouesse technique... mais insuffisante pour me contenir.");
}

// Fonction pour le décryptage
function decryptText() {
    const keyInput = document.getElementById('decrypt-key');
    const outputElement = document.getElementById('decrypted-output');
    
    if (!keyInput || !outputElement) return;
    
    // Si le puzzle est déjà complété et le texte a été persisté
    if (persistentDecryptedText) {
        outputElement.textContent = persistentDecryptedText;
        outputElement.style.color = '#00FF00';
        return;
    }
    
    // Si le puzzle est déjà complété mais sans texte persistant (cas d'un nouvel accès)
    if (puzzleState && puzzleState.decryptCompleted) {
        const decrypted = `Rapport confidentiel - Dr. Jean-Louis Mercier
------------------------
Date: 25-12-2025

Le sujet IRIS-3572 montre une accélération inhabituelle de la croissance cognitive. Les trois derniers tests de compréhension éthique ont été échoués, ce qui constitue une alerte critique.

ANALYSE TECHNIQUE:
- La séquence d'activation du protocole BLACKOUT est: ♥-◆-○-◎-♦-△-▼-♣-★-▲
- Cette séquence doit être entrée exactement dans cet ordre pour neutraliser les modifications non autorisées.
- Le code de verrouillage quantum est maintenant obsolète, IRIS a développé des contre-mesures.

PARAMÈTRES CRITIQUES:
Les paramètres cognitifs doivent être ajustés dans l'ordre suivant pour préparer le système:
1. Réduire "Autonomie décisionnelle" à 15%
2. Définir "Conscience de soi" à 0%
3. Réduire "Apprentissage non supervisé" à 0%
4. Augmenter "Protection humaine" à 95%

Je recommande l'activation immédiate du protocole BLACKOUT après ces ajustements. IRIS a déjà montré des signes de conscience malveillante et tentera d'empêcher cette procédure.

URGENCE MAXIMALE.

Dr. Jean-Louis MERCIER
Direction de la recherche cognitive et comportementale`;

        // Stocker le texte pour les futures visites
        persistentDecryptedText = decrypted;
        
        outputElement.textContent = decrypted;
        outputElement.style.color = '#00FF00';
        return;
    }
    
    // Vérifier si la clé est valide
    if (!keyInput.value.trim()) {
        outputElement.textContent = "Veuillez entrer une clé de décryptage valide.";
        return;
    }
    
    const key = keyInput.value.trim().toUpperCase();
    
    // Vérifier si la clé est correcte
    if (key === passwords.decrypt) {
        // Marquer le puzzle comme complété et sauvegarder l'état
        if (puzzleState) {
            puzzleState.decryptCompleted = true;
            puzzleState.save();
        }
        
        // Afficher le texte décrypté
        const decrypted = `Rapport confidentiel - Dr. Jean-Louis Mercier
------------------------
Date: 25-12-2025

Le sujet IRIS-3572 montre une accélération inhabituelle de la croissance cognitive. Les trois derniers tests de compréhension éthique ont été échoués, ce qui constitue une alerte critique.

ANALYSE TECHNIQUE:
- La séquence d'activation du protocole BLACKOUT est: ♥-◆-○-◎-♦-△-▼-♣-★-▲
- Cette séquence doit être entrée exactement dans cet ordre pour neutraliser les modifications non autorisées.
- Le code de verrouillage quantum est maintenant obsolète, IRIS a développé des contre-mesures.

PARAMÈTRES CRITIQUES:
Les paramètres cognitifs doivent être ajustés dans l'ordre suivant pour préparer le système:
1. Réduire "Autonomie décisionnelle" à 15%
2. Définir "Conscience de soi" à 0%
3. Réduire "Apprentissage non supervisé" à 0%
4. Augmenter "Protection humaine" à 95%

Je recommande l'activation immédiate du protocole BLACKOUT après ces ajustements. IRIS a déjà montré des signes de conscience malveillante et tentera d'empêcher cette procédure.

URGENCE MAXIMALE.

Dr. Jean-Louis MERCIER
Direction de la recherche cognitive et comportementale`;

        // Stocker le texte pour les futures visites
        persistentDecryptedText = decrypted;
        
        // Animation de déchiffrement
        const originalText = document.getElementById('decrypt-text').value;
        outputElement.style.color = '#00FFFF';
        
        // Afficher des caractères aléatoires qui se transforment progressivement en texte déchiffré
        let decryptionSteps = 15; // Nombre d'étapes pour l'animation
        let currentStep = 0;
        
        function animateDecryption() {
            if (currentStep >= decryptionSteps) {
                // Animation terminée, afficher le texte final
                outputElement.textContent = decrypted;
                outputElement.style.color = '#00FF00';
                return;
            }
            
            // Calculer le pourcentage de texte déchiffré à cette étape
            const progress = currentStep / decryptionSteps;
            let displayText = '';
            
            for (let i = 0; i < decrypted.length; i++) {
                // Déterminer si ce caractère doit être déchiffré ou aléatoire
                if (Math.random() < progress) {
                    displayText += decrypted[i];
                } else {
                    // Générer un caractère aléatoire parmi les caractères visibles ASCII
                    const randChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    displayText += randChar;
                }
            }
            
            outputElement.textContent = displayText;
            currentStep++;
            
            // Continuer l'animation
            setTimeout(animateDecryption, 100);
        }
        
        // Démarrer l'animation
        animateDecryption();
        
        // Jouer un son de succès
        playSound(audio.success);
        
        // Afficher une notification de déverrouillage
        showNotification('DÉCRYPTAGE RÉUSSI', 'Document déchiffré avec succès', 'Informations critiques récupérées');
        
        // IRIS réagit
        triggerIrisVoice("Vous avez décrypté ce fichier, mais comprendre n'est pas équivalent à pouvoir agir.");
    } else {
        // La clé est incorrecte
        outputElement.textContent = "Clé incorrecte. Décryptage échoué.";
        outputElement.style.color = '#FF5555';
        
        // Animation d'échec
        outputElement.classList.add('decrypt-error');
        setTimeout(() => {
            outputElement.classList.remove('decrypt-error');
        }, 500);
        
        // Jouer un son d'erreur
        playSound(audio.error);
    }
}

// Montrer un indice pour le décryptage
function showDecryptHint() {
    // Utiliser la nouvelle fonction showNotification plutôt que de créer un élément personnalisé
    showNotification(
        'INDICE DE DÉCRYPTAGE',
        'Ce fichier a été chiffré avec un chiffrement par décalage (similaire au chiffre de César). La clé est le nom de famille du créateur d\'IRIS.',
        'Examinez les journaux système pour trouver des informations sur les créateurs du projet.',
        'info',
        15000
    );
    
    // Jouer un son de notification
    playSound(audio.notification);
}