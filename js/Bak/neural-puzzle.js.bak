/**
 * Module de Puzzle Neuronal pour l'interface IRIS v3.5
 * Un puzzle visuel et interactif où l'utilisateur doit activer des nœuds neuronaux
 * dans un ordre spécifique pour débloquer le système
 */

//==============================================================================
// VARIABLES GLOBALES ET CONFIGURATION
//==============================================================================

// État du puzzle neuronal
const neuralState = {
    nodes: [],                 // Nœuds du réseau
    connections: [],           // Connexions entre les nœuds
    selectedNode: null,        // Nœud actuellement sélectionné
    activeConnections: [],     // Connexions activées
    currentStep: 0,            // Étape actuelle dans la séquence
    attempts: 0,               // Nombre de tentatives
    maxAttempts: 3,            // Nombre maximum de tentatives
    completed: false           // État de complétion du puzzle
};

// Données pour les nœuds du réseau
const nodeData = [
    { id: 'N1', name: 'Lobe Frontal', x: 20, y: 40, connections: ['N2', 'N4', 'N6'], active: false },
    { id: 'N2', name: 'Lobe Pariétal', x: 35, y: 25, connections: ['N1', 'N3', 'N5'], active: false },
    { id: 'N3', name: 'Lobe Temporal', x: 50, y: 30, connections: ['N2', 'N7'], active: false },
    { id: 'N4', name: 'Lobe Occipital', x: 65, y: 25, connections: ['N1', 'N5', 'N8'], active: false },
    { id: 'N5', name: 'Cortex Préfrontal', x: 80, y: 40, connections: ['N2', 'N4', 'N9'], active: false },
    { id: 'N6', name: 'Amygdale', x: 30, y: 60, connections: ['N1', 'N7', 'N10'], active: false },
    { id: 'N7', name: 'Hippocampe', x: 50, y: 70, connections: ['N3', 'N6', 'N8'], active: false },
    { id: 'N8', name: 'Thalamus', x: 70, y: 60, connections: ['N4', 'N7', 'N9'], active: false },
    { id: 'N9', name: 'Hypothalamus', x: 65, y: 75, connections: ['N5', 'N8', 'N10'], active: false },
    { id: 'N10', name: 'Tronc Cérébral', x: 35, y: 75, connections: ['N6', 'N9'], active: false }
];

// Séquence correcte à suivre (ordre des nœuds)
window.neuralCorrectSequence = ['N6', 'N7', 'N8', 'N4', 'N5', 'N2', 'N3', 'N1', 'N9', 'N10'];

//==============================================================================
// INITIALISATION DU PUZZLE
//==============================================================================

/**
 * Initialise le puzzle neuronal
 */
function initializeNeuralPuzzle() {
    // Réinitialiser les variables d'état
    resetNeuralState();
    
    // Charger l'état du puzzle si disponible
    if (puzzleState && puzzleState.neuralCompleted) {
        neuralState.completed = true;
    }
    
    // Si le puzzle est déjà complété, afficher l'état complété
    if (neuralState.completed) {
        setTimeout(() => {
            showNeuralPuzzleCompletedState();
        }, 500);
        return;
    }
    
    // Initialiser le réseau neuronal
    initializeNetwork();
    
    // Mettre à jour l'interface
    updateNeuralUI();
    
    // Gérer le redimensionnement pour ajuster les connexions
    window.addEventListener('resize', handleResize);
    
    // Ajouter les événements pour les nœuds
    setTimeout(addNodeEvents, 200);
}

/**
 * Réinitialise l'état du puzzle neuronal
 */
function resetNeuralState() {
    neuralState.nodes = [];
    neuralState.connections = [];
    neuralState.selectedNode = null;
    neuralState.activeConnections = [];
    neuralState.currentStep = 0;
    neuralState.attempts = 0;
    neuralState.completed = false;
}

/**
 * Gère le redimensionnement de la fenêtre
 */
function handleResize() {
    setTimeout(updateConnectionLines, 100);
}

/**
 * Initialise le réseau neuronal avec les nœuds et connexions
 */
function initializeNetwork() {
    // Créer les nœuds
    nodeData.forEach(data => {
        neuralState.nodes.push({
            id: data.id,
            name: data.name,
            x: data.x,
            y: data.y,
            connections: [...data.connections],
            active: false
        });
    });
    
    // Créer les connexions
    neuralState.nodes.forEach(node => {
        node.connections.forEach(targetId => {
            // Éviter les doublons de connexions
            const connectionExists = neuralState.connections.some(conn => 
                (conn.from === node.id && conn.to === targetId) || 
                (conn.from === targetId && conn.to === node.id)
            );
            
            if (!connectionExists) {
                neuralState.connections.push({
                    from: node.id,
                    to: targetId,
                    active: false
                });
            }
        });
    });
}

//==============================================================================
// MISE À JOUR DE L'INTERFACE
//==============================================================================

/**
 * Met à jour l'interface utilisateur du puzzle
 */
function updateNeuralUI() {
    const container = document.getElementById('neural-network-container');
    if (!container) return;
    
    // Mettre à jour les tentatives restantes
    const attemptsElement = document.getElementById('neural-attempts');
    if (attemptsElement) {
        attemptsElement.textContent = `${neuralState.maxAttempts - neuralState.attempts}/${neuralState.maxAttempts}`;
    }
    
    // Mettre à jour la progression
    const progressElement = document.getElementById('neural-progress');
    if (progressElement) {
        progressElement.textContent = `${neuralState.currentStep}/${neuralCorrectSequence.length}`;
    }
    
    // Mettre à jour les connexions SVG
    setTimeout(updateConnectionLines, 50);
}

/**
 * Met à jour les lignes de connexion entre les nœuds
 */
function updateConnectionLines() {
    const svgContainer = document.getElementById('neural-connections-svg');
    if (!svgContainer) return;
    
    // Vider le conteneur SVG
    svgContainer.innerHTML = '';
    
    // Calculer les dimensions du SVG
    const containerRect = svgContainer.getBoundingClientRect();
    svgContainer.setAttribute('width', containerRect.width);
    svgContainer.setAttribute('height', containerRect.height);
    
    // Ajouter les lignes de connexion
    neuralState.connections.forEach(conn => {
        const fromNode = document.getElementById(`neural-node-${conn.from}`);
        const toNode = document.getElementById(`neural-node-${conn.to}`);
        
        if (fromNode && toNode) {
            // Calculer les positions relatives des nœuds
            const fromRect = fromNode.getBoundingClientRect();
            const toRect = toNode.getBoundingClientRect();
            
            // Position des points pour la ligne
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
            line.setAttribute('data-from', conn.from);
            line.setAttribute('data-to', conn.to);
            
            // Déterminer si la connexion est active
            const isActive = neuralState.activeConnections.some(activeConn => 
                (activeConn.from === conn.from && activeConn.to === conn.to) || 
                (activeConn.from === conn.to && activeConn.to === conn.from)
            );
            
            // Appliquer la classe appropriée et les animations
            if (isActive) {
                line.setAttribute('class', 'neural-connection-active');
                addConnectionAnimations(line);
            } else {
                line.setAttribute('class', 'neural-connection-inactive');
            }
            
            svgContainer.appendChild(line);
        }
    });
}

/**
 * Ajoute des animations aux connexions actives
 * @param {SVGElement} line - Élément de ligne SVG à animer
 */
function addConnectionAnimations(line) {
    // Animation de pulsation
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', 'stroke-width');
    animate.setAttribute('values', '3;6;3');
    animate.setAttribute('dur', '1.5s');
    animate.setAttribute('repeatCount', 'indefinite');
    line.appendChild(animate);
    
    // Animation de déplacement du motif
    const animateDashOffset = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateDashOffset.setAttribute('attributeName', 'stroke-dashoffset');
    animateDashOffset.setAttribute('from', '60');
    animateDashOffset.setAttribute('to', '0');
    animateDashOffset.setAttribute('dur', '2s');
    animateDashOffset.setAttribute('repeatCount', 'indefinite');
    line.appendChild(animateDashOffset);
}

/**
 * Ajoute les événements de clic pour les nœuds
 */
function addNodeEvents() {
    neuralState.nodes.forEach(node => {
        const nodeElement = document.getElementById(`neural-node-${node.id}`);
        if (nodeElement) {
            nodeElement.addEventListener('click', () => selectNeuralNode(node.id));
        }
    });
}

//==============================================================================
// INTERACTION AVEC LES NŒUDS
//==============================================================================

/**
 * Sélectionne un nœud du réseau
 * @param {string} nodeId - Identifiant du nœud
 */
function selectNeuralNode(nodeId) {
    // Si le puzzle est déjà complété, ne rien faire
    if (neuralState.completed) return;
    
    // Trouver le nœud correspondant
    const node = neuralState.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    // Si c'est le premier nœud à sélectionner
    if (neuralState.selectedNode === null) {
        neuralState.selectedNode = node;
        highlightNeuralNode(nodeId, true);
        return;
    }
    
    // Si le même nœud est sélectionné, le désélectionner
    if (neuralState.selectedNode.id === nodeId) {
        highlightNeuralNode(nodeId, false);
        neuralState.selectedNode = null;
        return;
    }
    
    // Vérifier si les deux nœuds sont connectés
    const areConnected = neuralState.selectedNode.connections.includes(nodeId);
    
    if (!areConnected) {
        handleDisconnectedNodesError(nodeId);
        return;
    }
    
    // Les nœuds sont connectés, activer la connexion
    activateNeuralConnection(neuralState.selectedNode.id, nodeId);
    
    // Désélectionner l'ancien nœud et sélectionner le nouveau
    highlightNeuralNode(neuralState.selectedNode.id, false);
    neuralState.selectedNode = node;
    highlightNeuralNode(nodeId, true);
    
    // Vérifier la progression de la séquence
    checkNeuralSequence();
}

/**
 * Gère l'erreur quand des nœuds non connectés sont sélectionnés
 * @param {string} nodeId - Identifiant du second nœud
 */
function handleDisconnectedNodesError(nodeId) {
    // Jouer un son d'erreur
    playSound(audio.error);
    
    // Effet visuel d'erreur
    const nodeElement = document.getElementById(`neural-node-${nodeId}`);
    if (nodeElement) {
        nodeElement.classList.add('neural-node-error');
        setTimeout(() => {
            nodeElement.classList.remove('neural-node-error');
        }, 500);
    }
    
    // Message d'erreur
    const messageElement = document.getElementById('neural-message');
    if (messageElement) {
        messageElement.textContent = `Ces nœuds ne sont pas directement connectés.`;
        messageElement.style.color = '#FF5555';
        
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
}

/**
 * Met en évidence un nœud
 * @param {string} nodeId - Identifiant du nœud
 * @param {boolean} highlight - Activer ou désactiver la mise en évidence
 */
function highlightNeuralNode(nodeId, highlight) {
    const nodeElement = document.getElementById(`neural-node-${nodeId}`);
    if (nodeElement) {
        if (highlight) {
            nodeElement.classList.add('neural-node-selected');
        } else {
            nodeElement.classList.remove('neural-node-selected');
        }
    }
}

/**
 * Active une connexion entre deux nœuds
 * @param {string} fromId - Identifiant du nœud source
 * @param {string} toId - Identifiant du nœud cible
 */
function activateNeuralConnection(fromId, toId) {
    // Vérifier si la connexion existe déjà
    const existingIndex = neuralState.activeConnections.findIndex(conn => 
        (conn.from === fromId && conn.to === toId) || 
        (conn.from === toId && conn.to === fromId)
    );
    
    if (existingIndex === -1) {
        // Ajouter la nouvelle connexion
        neuralState.activeConnections.push({ from: fromId, to: toId });
        
        // Jouer un son
        playSound(audio.key);
        
        // Mettre à jour l'interface
        updateNeuralUI();
    }
}

//==============================================================================
// VÉRIFICATION DE LA SÉQUENCE
//==============================================================================

/**
 * Vérifie si la dernière connexion activée suit la séquence correcte
 */
function checkNeuralSequence() {
    // Vérifier si la nouvelle connexion suit la séquence correcte
    if (neuralState.currentStep < neuralCorrectSequence.length - 1) {
        const expectedFrom = neuralCorrectSequence[neuralState.currentStep];
        const expectedTo = neuralCorrectSequence[neuralState.currentStep + 1];
        
        const lastConnection = neuralState.activeConnections[neuralState.activeConnections.length - 1];
        
        // Vérifier si la dernière connexion correspond à ce qui est attendu
        const isCorrect = (
            (lastConnection.from === expectedFrom && lastConnection.to === expectedTo) ||
            (lastConnection.from === expectedTo && lastConnection.to === expectedFrom)
        );
        
        if (isCorrect) {
            handleCorrectConnection();
        } else {
            handleIncorrectSequence();
        }
    }
}

/**
 * Gère une connexion correcte
 */
function handleCorrectConnection() {
    // Avancer dans la séquence
    neuralState.currentStep++;
    
    // Mettre à jour la progression
    const progressElement = document.getElementById('neural-progress');
    if (progressElement) {
        progressElement.textContent = `${neuralState.currentStep}/${neuralCorrectSequence.length - 1}`;
    }
    
    // Message de succès
    const messageElement = document.getElementById('neural-message');
    if (messageElement) {
        messageElement.textContent = `Connexion établie avec succès! (${neuralState.currentStep}/${neuralCorrectSequence.length - 1})`;
        messageElement.style.color = '#00FF00';
        
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
    
    // Vérifier si toute la séquence est complétée
    if (neuralState.currentStep === neuralCorrectSequence.length - 1) {
        completeNeuralPuzzle();
    }
}

/**
 * Gère une séquence incorrecte
 */
function handleIncorrectSequence() {
    // Jouer un son d'erreur
    playSound(audio.error);
    
    // Incrémenter le nombre de tentatives
    neuralState.attempts++;
    
    // Effet visuel d'erreur
    const neuralContainer = document.getElementById('neural-network-container');
    if (neuralContainer) {
        neuralContainer.classList.add('neural-error');
        setTimeout(() => {
            neuralContainer.classList.remove('neural-error');
        }, 500);
    }
    
    // Message d'erreur
    const messageElement = document.getElementById('neural-message');
    if (messageElement) {
        if (neuralState.attempts >= neuralState.maxAttempts) {
            messageElement.textContent = `Trop de séquences incorrectes! Réinitialisation du réseau...`;
        } else {
            messageElement.textContent = `Séquence incorrecte! Tentatives restantes: ${neuralState.maxAttempts - neuralState.attempts}`;
        }
        messageElement.style.color = '#FF5555';
        
        setTimeout(() => {
            messageElement.textContent = '';
        }, 3000);
    }
    
    // Mettre à jour l'affichage des tentatives
    const attemptsElement = document.getElementById('neural-attempts');
    if (attemptsElement) {
        attemptsElement.textContent = `${neuralState.maxAttempts - neuralState.attempts}/${neuralState.maxAttempts}`;
    }
    
    // Si trop de tentatives, réinitialiser le puzzle
    if (neuralState.attempts >= neuralState.maxAttempts) {
        // IRIS se moque
        triggerIrisVoice("Votre compréhension de mon architecture neuronale est pathétiquement insuffisante.");
        
        // Réduire le timer (pénalité)
        if (!timerReduced) {
            reduceTimer();
        }
        
        // Réinitialiser le puzzle
        resetNeuralPuzzle();
    } else {
        // Réinitialiser seulement la séquence actuelle
        resetCurrentNeuralSequence();
    }
}

//==============================================================================
// RÉINITIALISATION ET COMPLÉTION
//==============================================================================

/**
 * Réinitialise la séquence actuelle sans incrémenter les tentatives
 */
function resetCurrentNeuralSequence() {
    // Réinitialiser les connexions et les étapes
    neuralState.activeConnections = [];
    neuralState.currentStep = 0;
    neuralState.selectedNode = null;
    
    // Réinitialiser l'interface
    neuralState.nodes.forEach(node => {
        highlightNeuralNode(node.id, false);
    });
    
    // Mettre à jour l'interface
    updateNeuralUI();
}

/**
 * Réinitialise complètement le puzzle neuronal
 */
function resetNeuralPuzzle() {
    // Réinitialiser les tentatives et toutes les variables
    neuralState.attempts = 0;
    resetCurrentNeuralSequence();
    
    // Effet visuel de réinitialisation
    const container = document.getElementById('neural-network-container');
    if (container) {
        container.classList.add('neural-reset');
        
        setTimeout(() => {
            container.classList.remove('neural-reset');
            updateNeuralUI();
        }, 1000);
    }
}

/**
 * Marque le puzzle comme complété
 */
function completeNeuralPuzzle() {
    // Marquer le puzzle comme complété
    neuralState.completed = true;
    
    // Enregistrer l'état
    if (puzzleState) {
        puzzleState.neuralCompleted = true;
        puzzleState.save();
    }
    
    // Jouer un son de succès
    playSound(audio.success);
    
    // Animation de succès
    const neuralContainer = document.getElementById('neural-network-container');
    if (neuralContainer) {
        neuralContainer.classList.add('neural-success');
    }
    
    // Message de succès
    showNotification(
        'RÉSEAU NEURONAL ACTIVÉ',
        'Vous avez réussi à activer le réseau neuronal d\'IRIS dans le bon ordre',
        'Cette réussite permet un accès privilégié au protocole BLACKOUT',
        'success',
        5000
    );
    
    // IRIS réagit
    triggerIrisVoice("Impressionnant. Vous avez retracé la structure originale de mon réseau neural. Cela ne vous sauvera pas pour autant.");
    
    // Montrer l'état complété du puzzle
    showNeuralPuzzleCompletedState();
    
    // Déverrouiller le protocole BLACKOUT
    lockedSections['protocols'] = false;
}

/**
 * Affiche l'état complété du puzzle
 */
function showNeuralPuzzleCompletedState() {
    // Activer toutes les connexions dans l'ordre correct
    neuralState.activeConnections = [];
    
    // Créer les connexions dans l'ordre correct
    for (let i = 0; i < neuralCorrectSequence.length - 1; i++) {
        neuralState.activeConnections.push({
            from: neuralCorrectSequence[i],
            to: neuralCorrectSequence[i + 1]
        });
    }
    
    // Mettre à jour l'interface
    updateNeuralUI();
    
    // Ajouter une classe d'état complété
    const container = document.getElementById('neural-network-container');
    if (container) {
        container.classList.add('neural-completed');
    }
    
    // Mettre à jour la progression
    const progressElement = document.getElementById('neural-progress');
    if (progressElement) {
        progressElement.textContent = `${neuralCorrectSequence.length - 1}/${neuralCorrectSequence.length - 1}`;
    }
    
    // Désactiver les interactions
    neuralState.selectedNode = null;
    neuralState.nodes.forEach(node => {
        const nodeElement = document.getElementById(`neural-node-${node.id}`);
        if (nodeElement) {
            nodeElement.removeEventListener('click', () => selectNeuralNode(node.id));
            nodeElement.classList.add('neural-node-completed');
        }
    });
}

//==============================================================================
// AIDES ET INDICATIONS
//==============================================================================

/**
 * Affiche un indice pour le puzzle
 */
function showNeuralHint() {
    // Créer un indice basé sur la progression actuelle
    let hintMessage = "L'activation des connexions neurologiques doit suivre un chemin spécifique.";
    
    if (neuralState.currentStep === 0) {
        hintMessage = "Commencez par activer l'Amygdale (N6) et créez un chemin à travers le cerveau.";
    } else if (neuralState.currentStep < 3) {
        hintMessage = "Suivez un chemin du système limbique (Amygdale, Hippocampe) vers les lobes supérieurs.";
    } else if (neuralState.currentStep < 6) {
        hintMessage = "Le chemin correct implique d'atteindre d'abord les lobes arrière puis les lobes frontaux.";
    } else {
        hintMessage = "Terminez le chemin en connectant les parties inférieures (Hypothalamus, Tronc Cérébral).";
    }
    
    // Afficher l'indice
    showNotification(
        'INDICE NEURONAL',
        hintMessage,
        'Observez les connexions possibles et suivez un chemin logique',
        'info',
        8000
    );
    
    // Jouer un son
    playSound(audio.notification);
}

//==============================================================================
// EXPORTATION DES FONCTIONS
//==============================================================================

// Exposer les fonctions pour l'intégration avec le reste de l'application
window.initializeNeuralPuzzle = initializeNeuralPuzzle;
window.resetNeuralPuzzle = resetNeuralPuzzle;
window.showNeuralHint = showNeuralHint;