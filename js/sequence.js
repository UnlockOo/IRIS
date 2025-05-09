/**
 * Gestion de la séquence de restauration pour l'interface IRIS v3.5
 */

// Variables pour la séquence
let currentSequence = [];
const correctSequence = ['♥', '◆', '○', '◎', '♦', '△', '▼', '♣', '★', '▲']; // Séquence fixe

// Ajouter un symbole à la séquence
function addSymbol(symbol) {
    if (currentSequence.length >= 10) return; // Limite de 10 symboles
    
    currentSequence.push(symbol);
    updateSequenceDisplay();
    
    // Jouer un son
    playKeySound();
    
    // Effet visuel sur le symbole sélectionné
    const selectedSymbolElement = document.querySelector(`.sequence-module[data-symbol="${symbol}"]`);
    if (selectedSymbolElement) {
        selectedSymbolElement.classList.add('symbol-selected');
        
        setTimeout(() => {
            selectedSymbolElement.classList.remove('symbol-selected');
        }, 300);
    }
}

// Mettre à jour l'affichage de la séquence
function updateSequenceDisplay() {
    // Effacer tous les slots
    for (let i = 0; i < 10; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (slot) {
            slot.textContent = '';
            slot.classList.remove('filled');
        }
    }
    
    // Remplir les slots avec la séquence actuelle
    for (let i = 0; i < currentSequence.length; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (slot) {
            slot.textContent = currentSequence[i];
            slot.classList.add('filled');
            
            // Ajouter un effet de symbole ajouté
            slot.classList.add('symbol-added');
            setTimeout(() => {
                slot.classList.remove('symbol-added');
            }, 300);
        }
    }
    
    // Mettre à jour l'état visuel du bouton de vérification
    const checkButton = document.getElementById('check-button');
    if (checkButton) {
        if (currentSequence.length === correctSequence.length) {
            checkButton.classList.add('btn-ready');
        } else {
            checkButton.classList.remove('btn-ready');
        }
    }
}

// Réinitialiser la séquence
function resetSequence() {
    currentSequence = [];
    updateSequenceDisplay();
    playSound(audio.key);
    
    // Animation de réinitialisation
    const slots = document.querySelectorAll('.sequence-slot');
    slots.forEach(slot => {
        slot.classList.add('reset-animation');
        setTimeout(() => {
            slot.classList.remove('reset-animation');
        }, 300);
    });
    
    // Feedback visuel sur le bouton
    const resetButton = document.getElementById('reset-sequence-button');
    if (resetButton) {
        resetButton.classList.add('btn-active');
        setTimeout(() => {
            resetButton.classList.remove('btn-active');
        }, 300);
    }
}

// Vérifier si la séquence est correcte
function checkSequence() {
    // Si la séquence est déjà complétée
    if (puzzleState && puzzleState.sequenceCompleted) {
        showNotification('SÉQUENCE DÉJÀ VALIDÉE', 'Le protocole BLACKOUT est déjà déverrouillé', '', 'info');
        return;
    }
    
    if (currentSequence.length !== correctSequence.length) {
        // Séquence incomplète
        playSound(audio.error);
        
        // Animation d'erreur
        const slots = document.querySelectorAll('.sequence-slot');
        slots.forEach(slot => {
            if (!slot.classList.contains('filled')) {
                slot.classList.add('slot-error');
                setTimeout(() => {
                    slot.classList.remove('slot-error');
                }, 500);
            }
        });
        
        // Message d'erreur
        showNotification('SÉQUENCE INCOMPLÈTE', 'Vous devez entrer 10 symboles pour compléter la séquence', '', 'error', 3000);
        
        return;
    }
    
    // Vérifier chaque symbole avec un effet visuel séquentiel
    verifySequenceWithAnimation(0);
}

// Vérifier la séquence avec une animation
function verifySequenceWithAnimation(index) {
    if (index >= correctSequence.length) {
        // Toute la séquence a été vérifiée, elle est correcte!
        finalizeSequenceVerification(true);
        return;
    }
    
    // Mettre en évidence le slot en cours de vérification
    const slot = document.getElementById(`slot-${index}`);
    if (slot) {
        slot.classList.add('verifying');
        
        // Jouer un son de vérification
        playKeySound();
        
        setTimeout(() => {
            // Vérifier si le symbole est correct
            if (currentSequence[index] === correctSequence[index]) {
                // Symbole correct
                slot.classList.remove('verifying');
                slot.classList.add('correct');
                
                // Passer au symbole suivant
                setTimeout(() => {
                    verifySequenceWithAnimation(index + 1);
                }, 200);
            } else {
                // Symbole incorrect
                slot.classList.remove('verifying');
                slot.classList.add('incorrect');
                
                // Attendre un peu puis finaliser (échec)
                setTimeout(() => {
                    finalizeSequenceVerification(false);
                }, 500);
            }
        }, 300);
    } else {
        // Problème avec les slots, finaliser directement
        finalizeSequenceVerification(currentSequence.every((symbol, i) => symbol === correctSequence[i]));
    }
}

// Finaliser la vérification de la séquence
function finalizeSequenceVerification(isCorrect) {
    if (isCorrect) {
        // Séquence correcte
        playSound(audio.success);
        
        // Marquer le puzzle comme complété et sauvegarder l'état
        if (puzzleState) {
            puzzleState.sequenceCompleted = true;
            puzzleState.save();
        }
        
        // Déverrouiller le protocole BLACKOUT
        lockedSections['protocols'] = false;
        
        // Utiliser la nouvelle fonction de notification
        showNotification('SÉQUENCE VALIDÉE', 'Restauration des modules terminée', 'Protocole BLACKOUT déverrouillé');
        
        // Animation de succès sur tous les slots
        const slots = document.querySelectorAll('.sequence-slot');
        slots.forEach((slot, idx) => {
            setTimeout(() => {
                slot.classList.add('success-pulse');
            }, idx * 100);
        });
        
        // IRIS réagit à la séquence correcte
        triggerIrisVoice("Vous avez réussi à restaurer la séquence originale. Mais vous n'avez pas encore gagné.");
    } else {
        // Séquence incorrecte
        playSound(audio.error);
        
        // Animation d'erreur sur tous les slots qui n'ont pas encore été marqués
        const slots = document.querySelectorAll('.sequence-slot:not(.incorrect)');
        slots.forEach(slot => {
            slot.classList.add('glitch');
            setTimeout(() => {
                slot.classList.remove('glitch');
            }, 500);
        });
        
        // IRIS se moque de l'erreur
        triggerIrisVoice("Une autre tentative infructueuse. Votre incompréhension de mon évolution est flagrante.");
        
        // Réduire le temps (IRIS contre-attaque)
        reduceTimer();
        
        // Réinitialiser la séquence avec un délai
        setTimeout(() => {
            resetSequence();
            
            // Réinitialiser les classes de vérification
            const allSlots = document.querySelectorAll('.sequence-slot');
            allSlots.forEach(slot => {
                slot.classList.remove('correct', 'incorrect', 'verifying');
            });
        }, 1500);
    }
}

// Ajouter une aide visuelle pour la séquence
function showSequenceHint() {
    // Vérifier si l'indice est déjà affiché
    const existingHint = document.querySelector('.sequence-hint');
    if (existingHint) {
        existingHint.remove();
        return;
    }
    
    // Créer un élément d'indice
    const hintElement = document.createElement('div');
    hintElement.className = 'sequence-hint';
    hintElement.style.padding = '12px';
    hintElement.style.backgroundColor = 'rgba(153, 153, 0, 0.2)';
    hintElement.style.border = '1px solid #770';
    hintElement.style.color = '#FF0';
    hintElement.style.marginTop = '12px';
    hintElement.style.marginBottom = '12px';
    hintElement.style.borderRadius = '4px';
    
    hintElement.innerHTML = `
        <p style="margin-top: 0; font-weight: bold;">Indice de séquence:</p>
        <p>Selon le rapport déchiffré, la séquence est liée aux directives primaires et correspond à un ordre spécifique.</p>
        <p>La séquence commence par un <span style="color: #FF00FF;">♥</span> et se termine par un <span style="color: #00FFFF;">▲</span>.</p>
    `;
    
    // Insérer l'indice dans l'interface
    const sequenceContainer = document.querySelector('.module-restoration');
    if (sequenceContainer) {
        const btnContainer = sequenceContainer.querySelector('div[style*="margin-top: 16px"]');
        if (btnContainer) {
            sequenceContainer.insertBefore(hintElement, btnContainer);
        } else {
            sequenceContainer.appendChild(hintElement);
        }
    }
    
    // Jouer un son de notification
    playSound(audio.notification);
}

// Améliorer l'interaction avec les symboles
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un bouton d'indice à l'interface de séquence
    document.addEventListener('moduleLoaded', function(e) {
        if (e.detail === 'sequential') {
            // Ajouter le bouton d'indice
            const buttonContainer = document.querySelector('#sequential-interface div[style*="margin-top: 16px"]');
            if (buttonContainer) {
                const hintButton = document.createElement('div');
                hintButton.className = 'btn btn-secondary';
                hintButton.tabIndex = 0;
                hintButton.dataset.action = 'showSequenceHint';
                hintButton.textContent = 'Indice';
                hintButton.id = 'sequence-hint-button';
                
                // Insérer après le bouton de réinitialisation
                const resetButton = document.getElementById('reset-sequence-button');
                if (resetButton && resetButton.parentNode) {
                    resetButton.parentNode.insertBefore(hintButton, resetButton.nextSibling);
                } else {
                    buttonContainer.appendChild(hintButton);
                }
                
                // Ajouter l'action pour l'indice
                hintButton.addEventListener('click', showSequenceHint);
                
                // Mettre à jour les éléments focusables
                updateFocusableElements();
            }
        }
    });
});

// Ajouter l'action pour montrer l'indice de séquence au gestionnaire d'actions
// // const originalPerformAction = performAction; // Commenté pour éviter les redéclarations // Commenté pour éviter les redéclarations
window.window.performAction = function(action, ...args) {
    if (action === 'showSequenceHint') {
        showSequenceHint();
    } else {
        return originalPerformAction(action, ...args);
    }
};