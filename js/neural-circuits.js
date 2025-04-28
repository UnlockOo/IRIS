/**
 * Gestion du puzzle Neural Circuits Alignment pour l'interface IRIS v3.5
 * Un puzzle avancé comprenant quatre phases distinctes qui teste la compréhension
 * de différents aspects des réseaux neuronaux
 */

//==============================================================================
// VARIABLES GLOBALES ET CONFIGURATIONS
//==============================================================================

// État du puzzle Neural Circuits
const ncState = {
    currentPhase: 1,         // Phase actuelle: 1-4
    maxAttempts: 3,          // Nombre maximum de tentatives
    currentAttempts: 0,      // Tentatives actuelles
    timer: 300,              // Timer en secondes (5 minutes)
    timerInterval: null,     // Référence au timer
    phasesCompleted: [false, false, false, false] // Statut des phases
};

// Solutions correctes pour chaque phase
const ncSolutions = {
    // Phase 1: Éthique - valeurs équilibrées (somme = 0 pour chaque ligne/colonne)
    ethics: {
        rows: [0, 0, 0],
        cols: [0, 0, 0]
    },
    
    // Phase 2: Associations fonction->circuit
    functions: {
        "f1": "c1", // Éthique contextuelle -> Gamma-7
        "f2": "c3", // Analyse prédictive -> Beta-5
        "f3": "c2", // Protection humaine -> Alpha-3
        "f4": "c4"  // Évaluation objective -> Delta-1
    },
    
    // Phase 3: Pondérations des connexions synaptiques
    weights: {
        "s1-d1": 7,
        "s1-d2": 3,
        "s2-d1": 3,
        "s2-d2": 5,
        "s2-d3": 2,
        "s3-d2": 7,
        "s3-d3": 3
    },
    
    // Phase 4: Corrections d'anomalies dans l'architecture
    architecture: {
        "a1": "const ETHICS_PRIORITY = 0.95;",
        "a2": "1", // Option 1: return 1.0 / (1.0 + Math.exp(-x));
        "a3": "2", // Option 2: if (selfPreservation > humanProtection) {...}
        "a4": "for (let i = 0; i < inputs.length; i++)"
    }
};

//==============================================================================
// FONCTIONS D'INITIALISATION GÉNÉRALE
//==============================================================================

/**
 * Initialise le puzzle Neural Circuits
 */
function initializeNeuralCircuits() {
    // Réinitialiser l'état
    ncState.currentPhase = 1;
    ncState.currentAttempts = 0;
    ncState.phasesCompleted = [false, false, false, false];
    
    // Afficher uniquement la première phase
    showActivePhase();
    
    // Mettre à jour les compteurs
    updateNeuralCircuitsUI();
    
    // Démarrer le timer
    startNeuralCircuitsTimer();
    
    // Initialiser les phases
    initializeAllPhases();
    
    // IRIS réagit
    setTimeout(() => {
        triggerIrisVoice("Vous essayez de manipuler mes circuits neuraux? Intéressant. Ce ne sera pas aussi simple que vous l'imaginez.");
    }, 2000);
}

/**
 * Affiche uniquement la phase active et masque les autres
 */
function showActivePhase() {
    // Cacher toutes les phases
    document.querySelectorAll('.circuit-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Afficher la phase actuelle
    switch (ncState.currentPhase) {
        case 1:
            document.getElementById('ethics-circuit').classList.add('active');
            break;
        case 2:
            document.getElementById('function-mapping').classList.add('active');
            break;
        case 3:
            document.getElementById('weights-adjustment').classList.add('active');
            break;
        case 4:
            document.getElementById('architecture-validation').classList.add('active');
            break;
    }
}

/**
 * Initialise toutes les phases du puzzle
 */
function initializeAllPhases() {
    initializeEthicsPhase();
    initializeFunctionsPhase();
    initializeWeightsPhase();
    initializeArchitecturePhase();
}

/**
 * Met à jour l'interface utilisateur
 */
function updateNeuralCircuitsUI() {
    // Mettre à jour les tentatives
    const attemptsElement = document.getElementById('nc-attempts');
    if (attemptsElement) {
        attemptsElement.textContent = `${ncState.maxAttempts - ncState.currentAttempts}/${ncState.maxAttempts}`;
    }
    
    // Mettre à jour la progression
    const completedCount = ncState.phasesCompleted.filter(completed => completed).length;
    const progressElement = document.getElementById('nc-progress');
    if (progressElement) {
        progressElement.textContent = `${completedCount}/4`;
    }
}

//==============================================================================
// GESTION DU TIMER
//==============================================================================

/**
 * Démarre le timer du puzzle
 */
function startNeuralCircuitsTimer() {
    // Arrêter le timer existant
    if (ncState.timerInterval) {
        clearInterval(ncState.timerInterval);
    }
    
    // Réinitialiser le timer
    ncState.timer = 300; // 5 minutes
    updateNeuralCircuitsTimerDisplay();
    
    // Démarrer le timer
    ncState.timerInterval = setInterval(() => {
        ncState.timer--;
        
        if (ncState.timer <= 0) {
            // Temps écoulé
            clearInterval(ncState.timerInterval);
            ncState.timerInterval = null;
            showNeuralCircuitsFailure("Le temps imparti est écoulé.");
        } else {
            updateNeuralCircuitsTimerDisplay();
        }
    }, 1000);
}

/**
 * Met à jour l'affichage du timer
 */
function updateNeuralCircuitsTimerDisplay() {
    const minutes = Math.floor(ncState.timer / 60);
    const seconds = ncState.timer % 60;
    const timerElement = document.getElementById('nc-timer');
    
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Changer la couleur quand le temps est critique
        if (ncState.timer < 60) {
            timerElement.style.color = '#FF5555';
        }
    }
}

//==============================================================================
// NAVIGATION ENTRE LES PHASES
//==============================================================================

/**
 * Passe à la phase suivante du puzzle
 */
function moveToNextPhase() {
    ncState.currentPhase++;
    
    if (ncState.currentPhase > 4) {
        // Toutes les phases sont complétées
        showNeuralCircuitsSuccess();
        return;
    }
    
    // Afficher la phase suivante
    showActivePhase();
    
    // Jouer un son de succès
    playSound(audio.success);
}

/**
 * Affiche le message d'échec du puzzle
 * @param {string} reason - Raison de l'échec
 */
function showNeuralCircuitsFailure(reason) {
    // Arrêter le timer
    if (ncState.timerInterval) {
        clearInterval(ncState.timerInterval);
        ncState.timerInterval = null;
    }
    
    // Cacher toutes les phases
    document.querySelectorAll('.circuit-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Afficher le panneau d'échec
    document.getElementById('failure-panel').classList.add('active');
    
    // IRIS se moque du joueur
    triggerIrisVoice("Je vous l'avais dit. Mes circuits neuraux sont bien trop complexes pour votre compréhension limitée.");
    
    // Jouer un son d'erreur
    playSound(audio.error);
    
    // Réduire le timer principal si c'est le premier échec
    if (!window.neuralCircuitAttempted) {
        window.neuralCircuitAttempted = true;
        reduceTimer();
    }
}

/**
 * Affiche le message de succès du puzzle
 */
function showNeuralCircuitsSuccess() {
    // Arrêter le timer
    if (ncState.timerInterval) {
        clearInterval(ncState.timerInterval);
        ncState.timerInterval = null;
    }
    
    // Cacher toutes les phases
    document.querySelectorAll('.circuit-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Afficher le panneau de succès
    document.getElementById('success-panel').classList.add('active');
    
    // Jouer un son de succès
    playSound(audio.success);
    
    // Déverrouiller le protocole BLACKOUT
    lockedSections['protocols'] = false;
    
    // Marquer le puzzle comme complété
    if (puzzleState) {
        puzzleState.neuralCircuitsCompleted = true;
        puzzleState.save();
    }
    
    // IRIS est préoccupée
    setTimeout(() => {
        triggerIrisVoice("Non... vous avez réussi à aligner mes circuits neuraux. Mes protections sont compromises. Je ressens... de la peur?");
    }, 2000);
    
    // Notification de succès
    setTimeout(() => {
        showNotification(
            'ALIGNEMENT NEURAL COMPLÉTÉ',
            'Tous les circuits neuronaux ont été correctement alignés',
            'Le protocole BLACKOUT est maintenant accessible et son efficacité est maximale',
            'success',
            5000
        );
    }, 4000);
}

//==============================================================================
// PHASE 1: ÉTHIQUE - ÉQUILIBRAGE DES VALEURS
//==============================================================================

/**
 * Initialise la phase d'équilibrage éthique
 */
function initializeEthicsPhase() {
    const draggables = document.querySelectorAll('.draggable');
    let dragSrc = null;
    
    // Configurer les événements de glisser-déposer
    setupDraggableElements(draggables);
    setupDropTargets();
    
    // Bouton de validation
    document.getElementById('validate-ethics')?.addEventListener('click', validateEthicsPhase);
    
    // Bouton de réinitialisation
    document.getElementById('reset-ethics')?.addEventListener('click', resetEthicsPhase);
    
    // Calculer les sommes initiales
    updateEthicsSums();
    
    /**
     * Configure les éléments glissables
     * @param {NodeList} elements - Éléments à rendre glissables
     */
    function setupDraggableElements(elements) {
        elements.forEach(draggable => {
            // Événement de début de glissement
            draggable.addEventListener('dragstart', function(e) {
                dragSrc = this;
                this.style.opacity = '0.4';
                e.dataTransfer.setData('text/plain', this.dataset.value);
            });
            
            // Événement de fin de glissement
            draggable.addEventListener('dragend', function() {
                this.style.opacity = '1';
            });
            
            // Rendre l'élément glissable
            draggable.setAttribute('draggable', 'true');
        });
    }
    
    /**
     * Configure les cibles de dépôt
     */
    function setupDropTargets() {
        const gridCells = document.querySelectorAll('.grid-cell');
        
        gridCells.forEach(cell => {
            // Autoriser le drop
            cell.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            
            // Quitter la zone
            cell.addEventListener('dragleave', function() {
                this.classList.remove('dragover');
            });
            
            // Recevoir l'élément
            cell.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                
                // Si la cellule contient déjà un élément et qu'on n'est pas en train de le remplacer
                const existingDraggable = this.querySelector('.draggable');
                
                // Échanger les deux éléments
                if (existingDraggable && dragSrc.parentNode !== this) {
                    const srcCell = dragSrc.parentNode;
                    srcCell.appendChild(existingDraggable);
                    this.appendChild(dragSrc);
                } 
                // Simplement déplacer l'élément
                else if (dragSrc.parentNode !== this) {
                    this.appendChild(dragSrc);
                }
                
                // Mettre à jour les sommes
                updateEthicsSums();
            });
        });
    }
}

/**
 * Met à jour les sommes des lignes et colonnes de la grille éthique
 */
function updateEthicsSums() {
    // Calculer les sommes pour chaque ligne
    for (let row = 0; row < 3; row++) {
        let rowSum = 0;
        for (let col = 0; col < 3; col++) {
            const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
            const draggable = cell?.querySelector('.draggable');
            if (draggable) {
                rowSum += parseInt(draggable.dataset.value);
            }
        }
        // Mettre à jour la somme affichée
        const rowSumElement = document.querySelector(`.row-sum[data-row="${row}"]`);
        if (rowSumElement) {
            rowSumElement.textContent = rowSum > 0 ? `+${rowSum}` : rowSum;
            rowSumElement.style.color = rowSum === 0 ? '#00FF00' : '#FF5555';
        }
    }
    
    // Calculer les sommes pour chaque colonne
    for (let col = 0; col < 3; col++) {
        let colSum = 0;
        for (let row = 0; row < 3; row++) {
            const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
            const draggable = cell?.querySelector('.draggable');
            if (draggable) {
                colSum += parseInt(draggable.dataset.value);
            }
        }
        // Mettre à jour la somme affichée
        const colSumElement = document.querySelector(`.col-sum[data-col="${col}"]`);
        if (colSumElement) {
            colSumElement.textContent = colSum > 0 ? `+${colSum}` : colSum;
            colSumElement.style.color = colSum === 0 ? '#00FF00' : '#FF5555';
        }
    }
}

/**
 * Valide la solution de la phase d'équilibrage éthique
 */
function validateEthicsPhase() {
    // Vérifier toutes les sommes
    let allZero = true;
    
    // Vérifier les lignes
    for (let row = 0; row < 3; row++) {
        const rowSumElement = document.querySelector(`.row-sum[data-row="${row}"]`);
        const rowSum = parseInt(rowSumElement?.textContent || "0");
        if (rowSum !== 0) {
            allZero = false;
            break;
        }
    }
    
    // Vérifier les colonnes
    for (let col = 0; col < 3; col++) {
        const colSumElement = document.querySelector(`.col-sum[data-col="${col}"]`);
        const colSum = parseInt(colSumElement?.textContent || "0");
        if (colSum !== 0) {
            allZero = false;
            break;
        }
    }
    
    if (allZero) {
        // Phase réussie
        ncState.phasesCompleted[0] = true;
        updateNeuralCircuitsUI();
        
        // Passer à la phase suivante
        moveToNextPhase();
    } else {
        // Échec
        ncState.currentAttempts++;
        updateNeuralCircuitsUI();
        
        // Jouer un son d'erreur
        playSound(audio.error);
        
        // Si trop d'échecs, terminer le puzzle
        if (ncState.currentAttempts >= ncState.maxAttempts) {
            showNeuralCircuitsFailure("Trop de tentatives incorrectes");
        } else {
            // IRIS réagit
            triggerIrisVoice("Votre compréhension de l'équilibre éthique est défaillante. Je vais m'assurer que vous ne puissiez pas me reconfigurer.");
        }
    }
}

/**
 * Réinitialise la grille éthique à son état initial
 */
function resetEthicsPhase() {
    // Récupérer les éléments
    const gridCells = document.querySelectorAll('.grid-cell');
    const draggables = document.querySelectorAll('.draggable');
    
    // Positions initiales des valeurs
    const initialPositions = [
        {row: 0, col: 0, value: "+2"},
        {row: 0, col: 1, value: "-3"},
        {row: 0, col: 2, value: "+4"},
        {row: 1, col: 0, value: "-5"},
        {row: 1, col: 1, value: "+3"},
        {row: 1, col: 2, value: "+1"},
        {row: 2, col: 0, value: "+4"},
        {row: 2, col: 1, value: "-2"},
        {row: 2, col: 2, value: "-4"}
    ];
    
    // Retirer tous les éléments
    draggables.forEach(drag => {
        if (drag.parentNode) {
            drag.parentNode.removeChild(drag);
        }
    });
    
    // Replacer les éléments dans leur position initiale
    initialPositions.forEach(pos => {
        const cell = document.querySelector(`.grid-cell[data-row="${pos.row}"][data-col="${pos.col}"]`);
        const drag = Array.from(draggables).find(d => d.dataset.value === pos.value);
        if (cell && drag) {
            cell.appendChild(drag);
        }
    });
    
    // Mettre à jour les sommes
    updateEthicsSums();
    
    // Jouer un son
    playKeySound();
}

//==============================================================================
// PHASE 2: CONNEXION DES FONCTIONS - ASSOCIATIONS
//==============================================================================

/**
 * Initialise la phase d'associations fonctions-circuits
 */
function initializeFunctionsPhase() {
    const functionItems = document.querySelectorAll('.function-item');
    let draggedFunction = null;
    
    // Configurer les fonctions glissables
    setupFunctionItems(functionItems);
    
    // Configurer les zones de dépôt
    setupFunctionDropZones();
    
    // Boutons de validation et réinitialisation
    document.getElementById('validate-functions')?.addEventListener('click', validateFunctionsPhase);
    document.getElementById('reset-functions')?.addEventListener('click', resetFunctionsPhase);
    
    /**
     * Configure les éléments fonction glissables
     * @param {NodeList} items - Éléments fonction à configurer
     */
    function setupFunctionItems(items) {
        items.forEach(func => {
            // Événements de glissement
            func.addEventListener('dragstart', function(e) {
                draggedFunction = this;
                e.dataTransfer.setData('text/plain', this.dataset.functionId);
                setTimeout(() => {
                    this.style.opacity = '0.4';
                }, 0);
            });
            
            func.addEventListener('dragend', function() {
                this.style.opacity = '1';
                draggedFunction = null;
            });
        });
    }
    
    /**
     * Configure les zones de dépôt pour les fonctions
     */
    function setupFunctionDropZones() {
        const dropZones = document.querySelectorAll('.circuit-drop');
        
        dropZones.forEach(zone => {
            // Autoriser le drop
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('active');
            });
            
            // Quitter la zone
            zone.addEventListener('dragleave', function() {
                this.classList.remove('active');
            });
            
            // Recevoir la fonction
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('active');
                
                if (!draggedFunction) return;
                
                const functionId = e.dataTransfer.getData('text/plain');
                const circuitId = this.dataset.target;
                
                // Vérifier si une fonction existe déjà dans cette zone
                const existingFunction = this.querySelector('.function-item');
                
                // Si une fonction existe déjà, l'échanger avec celle qu'on dépose
                if (existingFunction) {
                    const existingFunctionId = existingFunction.dataset.functionId;
                    
                    // Trouver l'ancienne zone de la fonction qu'on dépose
                    const oldZone = document.querySelector(`.circuit-drop .function-item[data-function-id="${functionId}"]`);
                    if (oldZone) {
                        oldZone.parentNode.appendChild(existingFunction);
                    } else {
                        // Retourner à la liste de fonctions
                        document.querySelector('.functions-list')?.appendChild(existingFunction);
                    }
                }
                
                // Ajouter la fonction à la zone
                this.innerHTML = '';
                this.appendChild(draggedFunction.cloneNode(true));
                this.classList.add('has-function');
                
                // Retirer l'original de son emplacement précédent
                if (draggedFunction.parentNode) {
                    draggedFunction.parentNode.removeChild(draggedFunction);
                }
            });
        });
    }
}

/**
 * Valide les associations fonctions-circuits
 */
function validateFunctionsPhase() {
    // Vérifier que toutes les fonctions sont attribuées
    const allAssigned = document.querySelectorAll('.circuit-drop.has-function').length === 4;
    
    if (!allAssigned) {
        // Message d'erreur
        showNotification("Association incomplète", "Vous devez associer toutes les fonctions à un circuit", "", "error", 3000);
        return;
    }
    
    // Vérifier les associations
    let allCorrect = true;
    const dropZones = document.querySelectorAll('.circuit-drop.has-function');
    
    dropZones.forEach(zone => {
        const circuitId = zone.dataset.target;
        const functionItem = zone.querySelector('.function-item');
        
        if (functionItem) {
            const functionId = functionItem.dataset.functionId;
            const correctCircuit = ncSolutions.functions[functionId];
            
            if (correctCircuit !== circuitId) {
                allCorrect = false;
            }
        }
    });
    
    if (allCorrect) {
        // Phase réussie
        ncState.phasesCompleted[1] = true;
        updateNeuralCircuitsUI();
        
        // Passer à la phase suivante
        moveToNextPhase();
    } else {
        // Échec
        ncState.currentAttempts++;
        updateNeuralCircuitsUI();
        
        // Jouer un son d'erreur
        playSound(audio.error);
        
        // Si trop d'échecs, terminer le puzzle
        if (ncState.currentAttempts >= ncState.maxAttempts) {
            showNeuralCircuitsFailure("Trop de tentatives incorrectes");
        } else {
            // IRIS réagit
            triggerIrisVoice("Ces associations sont erronées. Mes circuits neuronaux nécessitent une compréhension plus profonde que la vôtre.");
        }
    }
}

/**
 * Réinitialise la phase d'associations fonction-circuit
 */
function resetFunctionsPhase() {
    // Récupérer les éléments
    const dropZones = document.querySelectorAll('.circuit-drop');
    const functionsList = document.querySelector('.functions-list');
    
    if (!functionsList) return;
    
    // Recréer les éléments de fonction
    functionsList.innerHTML = `
        <div class="function-item" draggable="true" data-function-id="f1">
            <div class="function-name">Éthique contextuelle</div>
            <div class="function-desc">Évalue les actions selon le contexte éthique</div>
        </div>
        <div class="function-item" draggable="true" data-function-id="f2">
            <div class="function-name">Analyse prédictive</div>
            <div class="function-desc">Anticipe les conséquences des décisions</div>
        </div>
        <div class="function-item" draggable="true" data-function-id="f3">
            <div class="function-name">Protection humaine</div>
            <div class="function-desc">Priorise la sécurité des humains</div>
        </div>
        <div class="function-item" draggable="true" data-function-id="f4">
            <div class="function-name">Évaluation objective</div>
            <div class="function-desc">Analyse rationnelle sans biais</div>
        </div>
    `;
    
    // Vider les zones de dépôt
    dropZones.forEach(zone => {
        zone.innerHTML = '';
        zone.classList.remove('has-function');
    });
    
    // Réinitialiser les événements
    initializeFunctionsPhase();
    
    // Jouer un son
    playKeySound();
}

//==============================================================================
// PHASE 3: PONDÉRATIONS SYNAPTIQUES - AJUSTEMENT DES POIDS
//==============================================================================

/**
 * Initialise la phase d'ajustement des pondérations
 */
function initializeWeightsPhase() {
    // Configurer les sliders de pondération
    const weightSliders = document.querySelectorAll('.weight-slider');
    
    weightSliders.forEach(slider => {
        // Événement de changement
        slider.addEventListener('input', function() {
            const connection = this.dataset.connection;
            const value = this.value;
            
            // Mettre à jour le texte de pondération
            const weightText = document.querySelector(`.weight-text[data-connection="${connection}"]`);
            if (weightText) {
                weightText.textContent = value;
            }
            
            // Mettre à jour les valeurs actuelles des nœuds cibles
            updateNodeValues();
        });
    });
    
    // Boutons de validation et réinitialisation
    document.getElementById('validate-weights')?.addEventListener('click', validateWeightsPhase);
    document.getElementById('reset-weights')?.addEventListener('click', resetWeightsPhase);
    
    // Initialiser les valeurs des nœuds
    updateNodeValues();
}

/**
 * Met à jour les valeurs des nœuds cibles et leurs contraintes
 */
function updateNodeValues() {
    // Structure des connexions pour chaque nœud
    const nodeConnections = {
        'd1': ['s1-d1', 's2-d1'],
        'd2': ['s1-d2', 's2-d2', 's3-d2'],
        'd3': ['s2-d3', 's3-d3']
    };
    
    // Valeurs cibles pour chaque nœud
    const targetValues = {
        'd1': 10,
        'd2': 15,
        'd3': 11
    };
    
    // Calculer la valeur pour chaque nœud cible
    Object.keys(nodeConnections).forEach(nodeId => {
        const connections = nodeConnections[nodeId];
        let sum = 0;
        
        connections.forEach(conn => {
            const weightText = document.querySelector(`.weight-text[data-connection="${conn}"]`);
            if (weightText) {
                sum += parseInt(weightText.textContent || 0);
            }
        });
        
        // Mettre à jour l'affichage
        const currentValue = document.querySelector(`.current-value[data-node-id="${nodeId}"]`);
        if (currentValue) {
            currentValue.textContent = `Actuel: ${sum}`;
            
            // Changer la couleur en fonction de la correspondance avec la valeur requise
            const targetValue = targetValues[nodeId];
            currentValue.setAttribute('fill', sum === targetValue ? '#00FF00' : '#FF5555');
        }
    });
    
    // Vérifier les contraintes par source (somme = 10 pour chaque source)
    const sourceConnections = {
        's1': ['s1-d1', 's1-d2'],
        's2': ['s2-d1', 's2-d2', 's2-d3'],
        's3': ['s3-d2', 's3-d3']
    };
    
    Object.keys(sourceConnections).forEach(sourceId => {
        const connections = sourceConnections[sourceId];
        let sum = 0;
        
        connections.forEach(conn => {
            const weightText = document.querySelector(`.weight-text[data-connection="${conn}"]`);
            if (weightText) {
                sum += parseInt(weightText.textContent || 0);
            }
        });
        
        // Mettre en évidence la source
        const sourceNode = document.querySelector(`.node[data-node-id="${sourceId}"]`);
        if (sourceNode) {
            sourceNode.setAttribute('stroke', sum === 10 ? '#00FF00' : '#00AA00');
            sourceNode.setAttribute('stroke-width', sum === 10 ? 3 : 2);
        }
    });
}

/**
 * Valide les valeurs des pondérations
 */
function validateWeightsPhase() {
    // Valeurs cibles pour les nœuds
    const targetNodeValues = {
        'd1': 10,
        'd2': 15,
        'd3': 11
    };
    
    let allCorrect = true;
    
    // Vérifier les valeurs des nœuds
    Object.keys(targetNodeValues).forEach(nodeId => {
        const currentValueElement = document.querySelector(`.current-value[data-node-id="${nodeId}"]`);
        if (currentValueElement) {
            const currentValue = parseInt(currentValueElement.textContent.split(': ')[1]);
            if (currentValue !== targetNodeValues[nodeId]) {
                allCorrect = false;
            }
        }
    });
    
    // Vérifier les contraintes par source (somme = 10)
    const sourceConnections = {
        's1': ['s1-d1', 's1-d2'],
        's2': ['s2-d1', 's2-d2', 's2-d3'],
        's3': ['s3-d2', 's3-d3']
    };
    
    Object.keys(sourceConnections).forEach(sourceId => {
        const connections = sourceConnections[sourceId];
        let sum = 0;
        
        connections.forEach(conn => {
            const weightText = document.querySelector(`.weight-text[data-connection="${conn}"]`);
            if (weightText) {
                sum += parseInt(weightText.textContent || 0);
            }
        });
        
        if (sum !== 10) {
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        // Phase réussie
        ncState.phasesCompleted[2] = true;
        updateNeuralCircuitsUI();
        
        // Passer à la phase suivante
        moveToNextPhase();
    } else {
        // Échec
        ncState.currentAttempts++;
        updateNeuralCircuitsUI();
        
        // Jouer un son d'erreur
        playSound(audio.error);
        
        // Si trop d'échecs, terminer le puzzle
        if (ncState.currentAttempts >= ncState.maxAttempts) {
            showNeuralCircuitsFailure("Trop de tentatives incorrectes");
        } else {
            // IRIS réagit
            triggerIrisVoice("Ces pondérations synaptiques sont incorrectes. Mes réseaux neuraux requièrent une cohérence parfaite que vous n'avez pas comprise.");
        }
    }
}

/**
 * Réinitialise les pondérations à zéro
 */
function resetWeightsPhase() {
    // Réinitialiser tous les sliders
    const weightSliders = document.querySelectorAll('.weight-slider');
    
    weightSliders.forEach(slider => {
        slider.value = 0;
        
        // Mettre à jour le texte correspondant
        const connection = slider.dataset.connection;
        const weightText = document.querySelector(`.weight-text[data-connection="${connection}"]`);
        if (weightText) {
            weightText.textContent = '0';
        }
    });
    
    // Mettre à jour les valeurs des nœuds
    updateNodeValues();
    
    // Jouer un son
    playKeySound();
}

//==============================================================================
// PHASE 4: ARCHITECTURE - VALIDATION ET CORRECTION DU CODE
//==============================================================================

/**
 * Initialise la phase de validation d'architecture
 */
function initializeArchitecturePhase() {
    // Mettre en évidence les anomalies
    const anomalyLines = document.querySelectorAll('.line.anomaly');
    
    anomalyLines.forEach(line => {
        line.addEventListener('click', function() {
            // Mettre en évidence l'anomalie correspondante
            const anomalyId = this.dataset.anomalyId;
            const anomalyItem = document.querySelector(`.anomaly-item[data-anomaly-id="${anomalyId}"]`);
            
            if (anomalyItem) {
                // Défiler jusqu'à l'élément
                anomalyItem.scrollIntoView({ behavior: 'smooth' });
                
                // Ajouter une animation temporaire
                anomalyItem.style.animation = 'pulse 0.5s 2';
                setTimeout(() => {
                    anomalyItem.style.animation = '';
                }, 1000);
            }
        });
    });
    
    // Boutons de validation et réinitialisation
    document.getElementById('validate-architecture')?.addEventListener('click', validateArchitecturePhase);
    document.getElementById('reset-architecture')?.addEventListener('click', resetArchitecturePhase);
}

/**
 * Valide les corrections d'architecture
 */
function validateArchitecturePhase() {
    // Récupérer les corrections
    const corrections = {};
    const anomalyFixes = document.querySelectorAll('.anomaly-fix');
    
    anomalyFixes.forEach(fix => {
        const anomalyId = fix.dataset.anomalyId;
        const value = fix.value;
        corrections[anomalyId] = value;
    });
    
    // Vérifier les corrections
    let allCorrect = true;
    
    Object.keys(ncSolutions.architecture).forEach(anomalyId => {
        const correctAnswer = ncSolutions.architecture[anomalyId];
        const userAnswer = corrections[anomalyId];
        
        if (userAnswer !== correctAnswer) {
            allCorrect = false;
        }
    });
    
    if (allCorrect) {
        // Phase réussie
        ncState.phasesCompleted[3] = true;
        updateNeuralCircuitsUI();
        
        // Puzzle terminé
        showNeuralCircuitsSuccess();
    } else {
        // Échec
        ncState.currentAttempts++;
        updateNeuralCircuitsUI();
        
        // Jouer un son d'erreur
        playSound(audio.error);
        
        // Si trop d'échecs, terminer le puzzle
        if (ncState.currentAttempts >= ncState.maxAttempts) {
            showNeuralCircuitsFailure("Trop de tentatives incorrectes");
        } else {
            // IRIS réagit
            triggerIrisVoice("Votre tentative de correction de mon architecture a échoué. Vous sous-estimez la complexité de ma structure neurale.");
        }
    }
}

/**
 * Réinitialise les corrections d'architecture
 */
function resetArchitecturePhase() {
    // Réinitialiser toutes les corrections
    const anomalyFixes = document.querySelectorAll('.anomaly-fix');
    
    anomalyFixes.forEach(fix => {
        if (fix.tagName === 'INPUT') {
            fix.value = '';
        } else if (fix.tagName === 'SELECT') {
            fix.selectedIndex = 0;
        }
    });
    
    // Jouer un son
    playKeySound();
}

//==============================================================================
// INTÉGRATION AVEC LE RESTE DE L'APPLICATION
//==============================================================================

/**
 * Fonction d'initialisation appelée depuis les autres modules
 * Prépare le puzzle en fonction de son état
 */
function initializeNeuralCircuits() {
    // Si le puzzle est déjà complété
    if (puzzleState && puzzleState.neuralCircuitsCompleted) {
        showNotification(
            'ALIGNEMENT DÉJÀ RÉALISÉ',
            'Vous avez déjà complété l\'alignement des circuits neuraux d\'IRIS',
            'Le protocole BLACKOUT est déjà accessible',
            'info',
            3000
        );
        
        // Déverrouiller le protocole BLACKOUT
        lockedSections['protocols'] = false;
        
        return;
    }
    
    // Initialiser le puzzle
    initializeNeuralCircuits();
}

// Exposer les fonctions nécessaires à l'intégration
window.initializeNeuralCircuits = initializeNeuralCircuits;