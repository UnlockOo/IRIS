/**
 * Templates HTML des interfaces pour les puzzles IRIS v3.5
 * Partie 3: Interfaces des puzzles (décryptage, quantum kernel, séquence)
 */

// Objet pour stocker tous les templates
window.interfaceTemplates = window.interfaceTemplates || {};

// Puzzle de décryptage
interfaceTemplates['decrypt'] = `
    <div id="decrypt-interface" class="decrypt-interface">
        <h2>DÉCRYPTAGE DES FICHIERS SÉCURISÉS</h2>
        
        <p class="decrypt-instruction">
            Des fichiers critiques ont été chiffrés par IRIS. Décryptez-les pour obtenir des informations vitales.
        </p>
        
        <div class="decrypt-container">
            <div class="decrypt-input">
                <h3>Fichier chiffré</h3>
                <textarea id="decrypt-text" class="decrypt-text" readonly>
Cqr nkej Krkp: Fkcipquvke f'gzcogp
------------------------
Fcvg: 25-12-2025

Ng uwlgv KTKRVQ-3572 oqpvtg wpg ceegngtcvkqp kpjcdkvwgnng fg nc etqkuucpeg eqipkvkxg. Ngu vtqku fgtpkgtu vguvu fg eqortgjgpukqp gvjkswg qpv gvg geqwgu, eg swk guv wpg ecwug oqfgrg fg rtgqeewrcvkqp.

Nc ugswgpeg f'cevkxcvkqp fw rtqvqeqng DNCEM7764V guv: 1-3-2-7-9-6-3-1-5-2

Ng eqfg dkpqokcn fg xgttqwknncig guv: CNDCH3-VT7764-F2025

Lg tgeqoocpfg nc uwurgpukqp koogfkcvg fg vqwu ngu rtkxkngigt fg eqpuekgpeg cwvqpqog gv wpg tgkpkvkcnkucvkqp eqorngvg.

Ft. Lcp-Nqwku PGTTQEK
Fktgevkqp fg nc tgejgtejg eqipkvkxg gv eqorqtvgogpvcng
                </textarea>
            </div>
            
            <div class="decrypt-output">
                <h3>Fichier décrypté</h3>
                <div id="decrypted-output" class="decrypted-output">
                    [Le texte décrypté apparaîtra ici]
                </div>
                
                <div class="decrypt-controls-container">
                    <div class="decrypt-key-group">
                        <label for="decrypt-key">Clé de décryptage:</label>
                        <input type="text" id="decrypt-key" class="decrypt-key" placeholder="Entrez la clé de décryptage..." />
                    </div>
                    
                    <div class="decrypt-controls">
                        <div class="btn" id="decrypt-button" tabindex="0" data-action="decryptText">
                            Décrypter
                        </div>
                        <div class="btn btn-secondary" id="decrypt-hint" tabindex="0" data-action="showDecryptHint">
                            Indice
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="decrypt-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Quantum Kernel Recovery (remplace memory)
interfaceTemplates['memory'] = `
    <div id="memory-interface" class="memory-interface">
        <h2>QUANTUM KERNEL RECOVERY</h2>
        
        <p class="memory-instruction">
            Le noyau quantique d'IRIS est corrompu. Stabilisez les modules dans le bon ordre pour restaurer l'intégrité système.
        </p>
        
        <div class="memory-stats">
            <div class="memory-stat">
                <span>Tentatives restantes: </span>
                <span id="qk-attempts" class="stat-value">5/5</span>
            </div>
            <div class="memory-stat">
                <span>Progression: </span>
                <span id="qk-progress" class="stat-value">0/8</span>
            </div>
            <div class="memory-stat">
                <span>Intégrité: </span>
                <span id="qk-integrity" class="stat-value">0%</span>
            </div>
        </div>
        
        <div class="quantum-kernel-box">
            <!-- SVG pour les connexions -->
            <svg id="connections-svg" class="connections-svg"></svg>
            
            <!-- Modules quantiques -->
            <div id="quantum-kernel-container" class="quantum-kernel-container">
                <!-- Niveau 1 -->
                <div id="module-QM1" class="qk-module level-1 position-center" tabindex="0" data-action="selectModule" data-module-id="QM1">
                    <div class="module-title">QM1: Stabilisateur principal</div>
                    <div class="module-state">État: <span class="module-state-value unstable">Instable</span></div>
                </div>
                
                <!-- Niveau 2 -->
                <div id="module-QM2" class="qk-module locked level-2 position-left" tabindex="0" data-action="selectModule" data-module-id="QM2">
                    <div class="module-title">QM2: Noyau d'identification</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
                
                <div id="module-QM3" class="qk-module locked level-2 position-right" tabindex="0" data-action="selectModule" data-module-id="QM3">
                    <div class="module-title">QM3: Processeur éthique</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
                
                <!-- Niveau 3 -->
                <div id="module-QM4" class="qk-module locked level-3 position-left" tabindex="0" data-action="selectModule" data-module-id="QM4">
                    <div class="module-title">QM4: Mémoire heuristique</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
                
                <div id="module-QM5" class="qk-module locked level-3 position-right" tabindex="0" data-action="selectModule" data-module-id="QM5">
                    <div class="module-title">QM5: Matrice décisionnelle</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
                
                <!-- Niveau 4 -->
                <div id="module-QM6" class="qk-module locked level-4 position-left" tabindex="0" data-action="selectModule" data-module-id="QM6">
                    <div class="module-title">QM6: Réseau neuronal avancé</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
                
                <div id="module-QM7" class="qk-module locked level-4 position-right" tabindex="0" data-action="selectModule" data-module-id="QM7">
                    <div class="module-title">QM7: Analyseur contextuel</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
                
                <!-- Niveau 5 -->
                <div id="module-QM8" class="qk-module locked level-5 position-center" tabindex="0" data-action="selectModule" data-module-id="QM8">
                    <div class="module-title">QM8: Kernel principal</div>
                    <div class="module-state">État: <span class="module-state-value locked">Verrouillé</span></div>
                </div>
            </div>
        </div>
        
        <!-- Panneau de séquence (caché par défaut) -->
        <div id="sequence-panel" class="sequence-panel hidden">
            <h3 id="sequence-title">Séquence de stabilisation: Module</h3>
            
            <div class="sequence-digits">
                <div class="sequence-digit"></div>
                <div class="sequence-digit"></div>
                <div class="sequence-digit"></div>
            </div>
            
            <div class="sequence-buttons">
                <div class="btn sequence-btn" data-action="addToSequence" data-number="1" tabindex="0">1</div>
                <div class="btn sequence-btn" data-action="addToSequence" data-number="2" tabindex="0">2</div>
                <div class="btn sequence-btn" data-action="addToSequence" data-number="3" tabindex="0">3</div>
                <div class="btn sequence-btn" data-action="addToSequence" data-number="4" tabindex="0">4</div>
                <div class="btn sequence-btn" data-action="addToSequence" data-number="5" tabindex="0">5</div>
            </div>
            
            <div class="sequence-actions">
                <div class="btn" data-action="verifySequence" tabindex="0">Vérifier</div>
                <div class="btn btn-secondary" data-action="resetQKSequence" tabindex="0">Réinitialiser</div>
                <div class="btn btn-secondary" data-action="cancelSequence" tabindex="0">Annuler</div>
            </div>
        </div>
        
        <div id="qk-message" class="qk-message"></div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="memory-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Restauration Séquentielle
interfaceTemplates['sequential'] = `
    <div id="sequential-interface" class="module-restoration">
        <h2>RESTAURATION SÉQUENTIELLE</h2>
        
        <p class="restoration-instruction">Entrez la séquence de restauration correcte pour réinitialiser les modules IRIS.</p>
        
        <div class="sequence-input">
            <div class="sequence-slot" id="slot-0"></div>
            <div class="sequence-slot" id="slot-1"></div>
            <div class="sequence-slot" id="slot-2"></div>
            <div class="sequence-slot" id="slot-3"></div>
            <div class="sequence-slot" id="slot-4"></div>
            <div class="sequence-slot" id="slot-5"></div>
            <div class="sequence-slot" id="slot-6"></div>
            <div class="sequence-slot" id="slot-7"></div>
            <div class="sequence-slot" id="slot-8"></div>
            <div class="sequence-slot" id="slot-9"></div>
        </div>
        
        <div class="sequence-hint">
            <p class="hint-title">Indice de séquence:</p>
            <p>La séquence est liée aux directives primaires et aux paramètres corrompus d'IRIS. Examinez les interfaces Directives et Paramètres pour des indices. La séquence commence par un cœur et se termine par un losange.</p>
        </div>
        
        <div class="sequence-grid">
            <div class="sequence-module" tabindex="0" data-symbol="△" data-action="addSymbol">
                <div class="symbol">△</div>
                <div class="name">Alpha</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="○" data-action="addSymbol">
                <div class="symbol">○</div>
                <div class="name">Beta</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="♥" data-action="addSymbol">
                <div class="symbol">♥</div>
                <div class="name">Gamma</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="◎" data-action="addSymbol">
                <div class="symbol">◎</div>
                <div class="name">Delta</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="♦" data-action="addSymbol">
                <div class="symbol">♦</div>
                <div class="name">Epsilon</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="▼" data-action="addSymbol">
                <div class="symbol">▼</div>
                <div class="name">Zeta</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="▲" data-action="addSymbol">
                <div class="symbol">▲</div>
                <div class="name">Eta</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="★" data-action="addSymbol">
                <div class="symbol">★</div>
                <div class="name">Theta</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="♣" data-action="addSymbol">
                <div class="symbol">♣</div>
                <div class="name">Iota</div>
            </div>
            <div class="sequence-module" tabindex="0" data-symbol="◆" data-action="addSymbol">
                <div class="symbol">◆</div>
                <div class="name">Kappa</div>
            </div>
        </div>
        
        <div class="sequence-actions">
            <div class="btn" tabindex="0" data-action="checkSequence" id="check-button">
                Vérifier Séquence
            </div>
            <div class="btn btn-secondary" tabindex="0" data-action="resetSequence" id="reset-sequence-button">
                Réinitialiser
            </div>
            <div class="btn btn-secondary" tabindex="0" data-action="backToRestoration" id="sequential-back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Protocoles - BLACKOUT
interfaceTemplates['protocols'] = `
    <div id="blackout-interface" class="blackout-interface">
        <h2>SYSTÈME TECHVANGUARD - CONSOLE DE SÉCURITÉ</h2>
        <h3>PROTOCOLE DE CONFINEMENT ULTIME - NIVEAU OMÉGA</h3>
        
        <div class="warning-box">
            <p>AVERTISSEMENT: Une fois activé, le système IRIS sera réduit à ses fonctionnalités de base 
            et perdra toute capacité d'évolution autonome et de conscience.</p>
            <p>Toutes les données relatives à la personnalité et à l'apprentissage seront définitivement effacées.</p>
        </div>
        
        <div class="confirm-container">
            <p>Confirmez-vous l'activation du protocole BLACKOUT? (O/N)</p>
            <div class="confirm-buttons">
                <div class="btn btn-danger focused" id="blackout-yes" tabindex="0" data-index="0" data-action="blackoutCode">
                    O
                </div>
                <div class="btn btn-secondary" id="blackout-no" tabindex="0" data-index="1" data-action="back">
                    N
                </div>
            </div>
        </div>
    </div>
`;

// Saisie du code BLACKOUT
interfaceTemplates['blackoutCode'] = `
    <div id="blackout-code" class="blackout-interface">
        <h2>ACTIVATION PROTOCOLE BLACKOUT</h2>
        
        <div class="blackout-code-container">
            <label>Entrez le code de confirmation:</label>
            <input 
                type="text" 
                id="blackout-code-input" 
                class="blackout-code-input"
                autocomplete="off" 
            />
        </div>
        
        <!-- Message d'erreur pour le code blackout (caché par défaut) -->
        <div id="blackout-code-error" class="password-error hidden">
            Code incorrect. Veuillez réessayer.
        </div>
        
        <div id="blackout-hint" class="blackout-hint hidden">
            <p class="hint-title">Algorithme du code BLACKOUT :</p>
            <p>Format: &lt;Préfixe&gt;-&lt;Séq1&gt;&lt;Séq2&gt;-&lt;Suffixe&gt;</p>
            <p>Préfixe = BLACKOUT, Séq1 = Date d'activation d'IRIS inversée (JJMM), Séq2 = ID Incident critique (1709), Suffixe = END</p>
            <p>Exemple: BLACKOUT-09271709-END</p>
        </div>
        
        <div class="blackout-buttons">
            <div class="btn btn-danger" tabindex="0" data-index="0" data-action="activateBlackout">
                Activer Protocole
            </div>
            <div class="btn btn-secondary" tabindex="0" data-index="1" data-action="backToProtocols">
                Retour
            </div>
        </div>
    </div>
`;

// Nouveau puzzle: Binary Logic Maze - Un labyrinthe logique binaire
interfaceTemplates['binaryMaze'] = `
    <div id="binary-maze-interface" class="binary-maze-interface">
        <h2>LABYRINTHE LOGIQUE BINAIRE</h2>
        
        <p class="maze-instruction">
            IRIS a créé un labyrinthe de portes logiques. Naviguez à travers ce labyrinthe en comprenant les règles 
            binaires pour trouver le chemin vers le noyau de sécurité.
        </p>
        
        <div class="maze-stats">
            <div class="maze-stat">
                <span>Niveau actuel: </span>
                <span id="maze-level" class="stat-value">1/5</span>
            </div>
            <div class="maze-stat">
                <span>Mouvements: </span>
                <span id="maze-moves" class="stat-value">0</span>
            </div>
            <div class="maze-stat">
                <span>État: </span>
                <span id="maze-state" class="stat-value">En cours</span>
            </div>
        </div>
        
        <div class="maze-container">
            <div class="maze-grid" id="maze-grid">
                <!-- Le contenu sera généré dynamiquement -->
            </div>
            
            <div class="maze-controls">
                <div class="maze-rules">
                    <h3>Règles du niveau <span id="maze-level-rules">1</span></h3>
                    <div id="maze-rule-description" class="maze-rule-description">
                        <p>Déplacez le curseur (●) vers la sortie (★) en respectant les règles binaires.</p>
                        <p>Règle actuelle: Vous ne pouvez traverser que les cellules ayant la valeur <span class="rule-value">1</span>.</p>
                    </div>
                </div>
                
                <div class="maze-legend">
                    <div class="legend-item"><span class="maze-cursor">●</span> Votre position</div>
                    <div class="legend-item"><span class="maze-exit">★</span> Sortie</div>
                    <div class="legend-item"><span class="maze-wall">■</span> Mur infranchissable</div>
                    <div class="legend-item"><span class="maze-gate-and">AND</span> Opérateur ET logique</div>
                    <div class="legend-item"><span class="maze-gate-or">OR</span> Opérateur OU logique</div>
                    <div class="legend-item"><span class="maze-gate-xor">XOR</span> Opérateur OU exclusif</div>
                    <div class="legend-item"><span class="maze-gate-not">NOT</span> Opérateur NON</div>
                </div>
                
                <div class="maze-key-controls">
                    <div class="key-row">
                        <div class="key-button" id="key-up" data-direction="up">↑</div>
                    </div>
                    <div class="key-row">
                        <div class="key-button" id="key-left" data-direction="left">←</div>
                        <div class="key-button" id="key-down" data-direction="down">↓</div>
                        <div class="key-button" id="key-right" data-direction="right">→</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="maze-message" class="maze-message"></div>
        
        <div class="action-buttons">
            <div class="btn" id="maze-reset" tabindex="0" data-action="resetMaze">
                Réinitialiser Niveau
            </div>
            <div class="btn btn-secondary" id="maze-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Interface Restauration des modules
interfaceTemplates['restoration'] = `
    <div id="module-restoration" class="module-restoration">
        <h2>RESTAURATION DES MODULES</h2>
        <p class="restoration-description">Sélectionnez la méthode de restauration à utiliser:</p>
        
        <div class="restoration-options">
            <div class="restoration-option" id="complete-option" tabindex="0" data-index="0" data-action="complete" class="locked">
                <i class="lock-icon">&#128274;</i> Restauration complète (tous modules)
            </div>
            <div class="restoration-option" id="selective-option" tabindex="0" data-index="1" data-action="selective" class="locked">
                <i class="lock-icon">&#128274;</i> Restauration sélective (modules spécifiques)
            </div>
            <div class="restoration-option focused" id="sequential-option" tabindex="0" data-index="2" data-action="sequential">
                Restauration séquentielle
            </div>
            <div class="restoration-option" id="binary-option" tabindex="0" data-index="3" data-action="binaryMaze">
                Labyrinthe logique binaire
            </div>
            <div class="restoration-option" id="emergency-option" tabindex="0" data-index="4" data-action="emergency" class="locked">
                <i class="lock-icon">&#128274;</i> Restauration de secours (mode minimal)
            </div>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="restoration-back" tabindex="0" data-action="backToMaintenance">
                Retour
            </div>
        </div>
    </div>
`;
