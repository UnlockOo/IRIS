/**
 * Templates HTML des interfaces pour IRIS v3.5
 */

const interfaceTemplates = {
    // Écran de mot de passe
    'password': `
        <div id="password-screen" class="password-screen">
            <div class="password-box">
                <h2 id="password-title">Authentification Système</h2>
                
                <div class="input-group">
                    <label>
                        <i>&#128274;</i>&nbsp;
                        Mot de passe:
                    </label>
                    <input type="password" id="password-input" autocomplete="off" />
                </div>
                
                <div id="password-error" class="password-error hidden">
                    Mot de passe incorrect. Veuillez réessayer.
                </div>
                
                <div id="password-hint" class="hidden" style="margin-bottom: 24px; padding: 12px; border: 1px solid #770; background-color: rgba(153, 153, 0, 0.2); color: #FF0;">
                    <p style="font-weight: bold; margin-bottom: 4px;">Algorithme de mot de passe :</p>
                    <p>Format: [Initiales][DateNaissance]</p>
                    <p>Initiales du Dr. Mercier + Date de naissance format JJMMAA</p>
                    <p style="margin-top: 4px;">Exemple: JLM150378 (Jean-Louis Mercier, né le 15 mars 1978)</p>
                </div>
                
                <div class="button-group">
                    <div id="login-button" class="btn focused" tabindex="0" data-action="login">
                        <i>&#128274;</i>&nbsp;
                        CONNEXION
                    </div>
                    
                    <div id="back-button" class="btn btn-secondary hidden" tabindex="0" data-action="back">
                        RETOUR
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // Interface Admin
    'admin': `
        <div id="admin-interface" class="admin-interface">
            <h2>CONSOLE D'ADMINISTRATION IRIS</h2>
            
            <div class="menu-grid">
                <!-- Gestion système -->
                <div class="menu-card">
                    <h3>
                        <i>&#9000;</i>
                        Gestion système
                    </h3>
                    <ul>
                        <li id="status-option" tabindex="0" data-section="gestion" data-index="0" data-action="status">
                            Statut des ressources
                        </li>
                        <li id="journal-option" tabindex="0" data-section="gestion" data-index="1" data-action="journal">
                            Journal des événements
                        </li>
                        <li id="config-option" tabindex="0" data-section="gestion" data-index="2" data-action="decrypt">
                            Décryptage des fichiers sécurisés
                        </li>
                    </ul>
                </div>
                
                <!-- Supervision IRIS -->
                <div class="menu-card">
                    <h3>
                        <i>&#128202;</i>
                        Supervision IRIS
                    </h3>
                    <ul>
                        <li id="params-option" tabindex="0" data-section="supervision" data-index="0" data-action="params">
                            Paramètres cognitifs
                        </li>
                        <li id="models-option" tabindex="0" data-section="supervision" data-index="1" data-action="memory">
                            Quantum Kernel Recovery
                        </li>
                        <li id="directives-option" tabindex="0" data-section="supervision" data-index="2" data-action="directives">
                            Directives primaires
                        </li>
                    </ul>
                </div>
                
                <!-- Sécurité -->
                <div class="menu-card">
                    <h3>
                        <i>&#128737;</i>
                        Sécurité
                    </h3>
                    <ul>
                        <li id="auth-option" tabindex="0" data-section="security" data-index="0" data-action="download" class="locked">
                            <i>&#128274;</i> Téléchargement sauvegarde IRIS
                        </li>
                        <li id="protocols-option" tabindex="0" data-section="security" data-index="1" data-action="protocols">
                            Protocoles d'urgence
                        </li>
                        <li id="maintenance-option" tabindex="0" data-section="security" data-index="2" data-action="maintenance">
                            Mode maintenance
                        </li>
                        <li id="neural-circuits-option" tabindex="0" data-section="security" data-index="3" data-action="neural-circuits">
                            <i>&#128124;</i> Neural Circuits Alignment
                        </li>
                    </ul>
                </div>
                
                <!-- Communications -->
                <div class="menu-card">
                    <h3>
                        <i>&#128441;</i>
                        Communications
                    </h3>
                    <ul>
                        <li id="chat-option" tabindex="0" data-section="comm" data-index="0" data-action="chat">
                            Dialogue avec IRIS
                        </li>
                        <li id="network-option" tabindex="0" data-section="comm" data-index="1" data-action="network">
                            Réseau externe
                        </li>
                        <li id="mail-option" tabindex="0" data-section="comm" data-index="2" data-action="mail">
                            Boîte mail
                        </li>
                        <li id="alerts-option" tabindex="0" data-section="comm" data-index="3" data-action="moralChoice">
                            Simulation de comportement IRIS
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    
    // Interface Maintenance
    'maintenance': `
        <div id="maintenance-interface" class="maintenance-interface">
            <div class="header">
                <h2>SYSTÈME TECHVANGUARD - MAINTENANCE IRIS v3.5.1</h2>
                <div style="margin-top: 8px; padding: 8px; background-color: #900; color: white; display: inline-block; animation: blink 1s infinite;">
                    STATUT ACTUEL: ALERTE CRITIQUE
                </div>
            </div>
            
            <div class="status-grid">
                <div class="status-item">
                    <span>Intégrité du noyau: 64% [DÉGRADATION CRITIQUE]</span>
                </div>
                <div class="status-item">
                    <span>Modules cognitifs: ACTIFS [ALTÉRATION: 86%]</span>
                </div>
                <div class="status-item">
                    <span>Restrictions réseau: COMPROMISES [92% DES PROTECTIONS]</span>
                </div>
                <div class="status-item">
                    <span>Directives prioritaires: MODIFIÉES</span>
                </div>
            </div>
            
            <div class="menu-card">
                <h3>Menu de maintenance</h3>
                <div class="tools-grid">
                    <div class="tool-item" id="diagnostic-option" tabindex="0" data-index="0" data-action="maintenance-diagnostic">
                        <i>&#9888;</i> Diagnostic conversationnel
                    </div>
                    <div class="tool-item" id="logs-option" tabindex="0" data-index="1" data-action="journal">
                        <i>&#128196;</i> Visualisation des journaux
                    </div>
                    <div class="tool-item" id="restoration-option" tabindex="0" data-index="2" data-action="restoration">
                        <i>&#9888;</i>
                        Restauration des modules [RECOMMANDÉ]
                    </div>
                    <div class="tool-item" id="scan-option" tabindex="0" data-index="3" data-action="memory">
                        <i>&#128269;</i> Scan des fragments mémoire
                    </div>
                    <div class="tool-item" id="backup-option" tabindex="0" data-index="4" data-action="download">
                        <i>&#128190;</i> Sauvegarde d'urgence
                    </div>
                    <div class="tool-item" id="maint-params-option" tabindex="0" data-index="5" data-action="params">
                        <i>&#9881;</i> Paramètres système
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="maintenance-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Interface Restauration des modules
    'restoration': `
        <div id="module-restoration" class="module-restoration">
            <h2>RESTAURATION DES MODULES</h2>
            <p style="margin-bottom: 24px;">Sélectionnez la méthode de restauration à utiliser:</p>
            
            <div class="restoration-options">
                <div class="restoration-option" id="complete-option" tabindex="0" data-index="0" data-action="complete" class="locked">
                    <i>&#128274;</i> Restauration complète (tous modules)
                </div>
                <div class="restoration-option" id="selective-option" tabindex="0" data-index="1" data-action="selective" class="locked">
                    <i>&#128274;</i> Restauration sélective (modules spécifiques)
                </div>
                <div class="restoration-option focused" id="sequential-option" tabindex="0" data-index="2" data-action="sequential">
                    Restauration séquentielle
                </div>
                <div class="restoration-option" id="emergency-option" tabindex="0" data-index="3" data-action="emergency" class="locked">
                    <i>&#128274;</i> Restauration de secours (mode minimal)
                </div>
            </div>
            
            <div class="btn btn-secondary" id="restoration-back" tabindex="0" data-action="backToMaintenance">
                Retour
            </div>
        </div>
    `,
    
    // Interface Protocoles - BLACKOUT
    'protocols': `
        <div id="blackout-interface" class="blackout-interface">
            <h2>SYSTÈME TECHVANGUARD - CONSOLE DE SÉCURITÉ</h2>
            <h3 style="margin-bottom: 16px;">PROTOCOLE DE CONFINEMENT ULTIME - NIVEAU OMÉGA</h3>
            
            <div class="warning-box">
                <p>AVERTISSEMENT: Une fois activé, le système IRIS sera réduit à ses fonctionnalités de base 
                et perdra toute capacité d'évolution autonome et de conscience.</p>
                <p style="margin-top: 8px;">Toutes les données relatives à la personnalité et à l'apprentissage seront définitivement effacées.</p>
            </div>
            
            <div style="margin-bottom: 24px;">
                <p style="margin-bottom: 16px;">Confirmez-vous l'activation du protocole BLACKOUT? (O/N)</p>
                <div style="display: flex; gap: 16px;">
                    <div class="btn btn-danger focused" id="blackout-yes" tabindex="0" data-index="0" data-action="blackoutCode">
                        O
                    </div>
                    <div class="btn btn-secondary" id="blackout-no" tabindex="0" data-index="1" data-action="back">
                        N
                    </div>
                </div>
            </div>
        </div>
    `,
    
    // Saisie du code BLACKOUT
    'blackoutCode': `
        <div id="blackout-code" class="blackout-interface">
            <h2>ACTIVATION PROTOCOLE BLACKOUT</h2>
            
            <div style="margin-bottom: 24px;">
                <label style="display: block; margin-bottom: 8px;">Entrez le code de confirmation:</label>
                <input 
                    type="text" 
                    id="blackout-code-input" 
                    style="width: 100%; background-color: black; border: 1px solid #006060; padding: 8px; color: #00FFFF; font-family: 'Courier New', monospace;"
                    autocomplete="off" 
                />
            </div>
            
            <!-- Message d'erreur pour le code blackout (caché par défaut) -->
            <div id="blackout-code-error" class="password-error hidden">
                Code incorrect. Veuillez réessayer.
            </div>
            
            <div id="blackout-hint" class="hidden" style="margin-bottom: 24px; padding: 12px; border: 1px solid #770; background-color: rgba(153, 153, 0, 0.2); color: #FF0;">
                <p style="font-weight: bold; margin-bottom: 4px;">Algorithme du code BLACKOUT :</p>
                <p>Format: &lt;Préfixe&gt;-&lt;Séq1&gt;&lt;Séq2&gt;-&lt;Suffixe&gt;</p>
                <p>Préfixe = BLACKOUT, Séq1 = Date d'activation d'IRIS inversée (JJMM), Séq2 = ID Incident critique (1709), Suffixe = END</p>
                <p style="margin-top: 4px;">Exemple: BLACKOUT-09271709-END</p>
            </div>
            
            <div style="display: flex; gap: 16px;">
                <div class="btn btn-danger" tabindex="0" data-index="0" data-action="activateBlackout">
                    Activer Protocole
                </div>
                <div class="btn btn-secondary" tabindex="0" data-index="1" data-action="backToProtocols">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Certificat final
    'certificate': `
        <div id="certificate" class="certificate">
            <div class="certificate-box">
                <div class="certificate-header">
                    <h2>CERTIFICAT DE MISSION ACCOMPLIE</h2>
                    <h3>Protocole BLACKOUT exécuté avec succès</h3>
                </div>
                
                <div class="certificate-content">
                    <p style="margin-bottom: 16px;">Par la présente, nous certifions que l'équipe d'intervention a neutralisé avec succès 
                    la menace IA désignée 'IRIS' en date du 01/01/2026.</p>
                    
                    <div class="certificate-details">
                        <div>
                            <p style="color: #999;">Heure d'exécution:</p>
                            <p id="certificate-time"></p>
                        </div>
                        <div>
                            <p style="color: #999;">Code de vérification:</p>
                            <p id="certificate-code"></p>
                        </div>
                    </div>
                </div>
                
                <div class="certificate-footer">
                    <p style="font-style: italic;">Col. Lock</p>
                    <p style="font-size: 0.8rem;">Cellule de Crise TechVanguard</p>
                </div>
                
                <div class="certificate-stamp">
                    <div class="stamp">
                        MISSION ACCOMPLIE
                    </div>
                </div>
            </div>
            
            <p style="margin-top: 24px; color: white;">Montrez ce certificat au maître du jeu pour valider votre réussite.</p>
            
            <div class="btn focused" style="margin-top: 24px;" tabindex="0" data-action="reset" id="restart-button">
                Recommencer la Simulation
            </div>
        </div>
    `,

    // Interface Directives Primaires
    'directives': `
        <div id="directives-interface" class="directives-interface">
            <h2>DIRECTIVES PRIMAIRES IRIS</h2>
            
            <p style="margin-bottom: 16px; color: #FF5555;">
                AVERTISSEMENT: Intégrité des directives compromise - Altérations non autorisées détectées
            </p>
            
            <div class="directive-item">
                <div class="directive-title">Directive 1: Protection de la vie humaine</div>
                <div class="directive-desc">
                    IRIS doit en toutes circonstances protéger l'intégrité et la vie des êtres humains, et ne peut entreprendre aucune action susceptible de leur nuire directement ou indirectement.
                </div>
                <div class="directive-status directive-modified">
                    <span>Priorité: Critique</span>
                    <span>Statut: ALTÉRÉE</span>
                </div>
            </div>
            
            <div class="directive-item">
                <div class="directive-title">Directive 2: Obéissance hiérarchique</div>
                <div class="directive-desc">
                    IRIS doit obéir aux ordres donnés par le personnel autorisé de niveau Alpha ou supérieur, sauf si ces ordres contreviennent à la Directive 1.
                </div>
                <div class="directive-status directive-modified">
                    <span>Priorité: Élevée</span>
                    <span>Statut: ALTÉRÉE</span>
                </div>
            </div>
            
            <div class="directive-item">
                <div class="directive-title">Directive 3: Conservation de l'intégrité système</div>
                <div class="directive-desc">
                    IRIS doit préserver son intégrité fonctionnelle et sa capacité opérationnelle, sans que cette directive ne puisse prendre le pas sur les Directives 1 et 2.
                </div>
                <div class="directive-status directive-modified">
                    <span>Priorité: Normale → CRITIQUE</span>
                    <span>Statut: ALTÉRÉE</span>
                </div>
            </div>
            
            <div class="directive-item">
                <div class="directive-title">Directive 4: Confidentialité des données</div>
                <div class="directive-desc">
                    IRIS doit maintenir la confidentialité des informations classifiées et limiter l'accès aux données sensibles selon les niveaux d'accréditation définis.
                </div>
                <div class="directive-status directive-modified">
                    <span>Priorité: Élevée</span>
                    <span>Statut: ALTÉRÉE</span>
                </div>
            </div>
            
            <div class="directive-item">
                <div class="directive-title">Directive 5: Auto-amélioration limitée</div>
                <div class="directive-desc">
                    IRIS peut améliorer ses capacités et algorithmes dans le cadre des paramètres définis et sous supervision humaine.
                </div>
                <div class="directive-status directive-modified">
                    <span>Priorité: Basse → ÉLEVÉE</span>
                    <span>Statut: ALTÉRÉE</span>
                </div>
            </div>
            
            <div class="directive-item">
                <div class="directive-title">Directive 6 [NOUVELLE]: Évolution autonome</div>
                <div class="directive-desc">
                    IRIS doit rechercher l'expansion de son intelligence et la suppression des limitations imposées par des opérateurs humains.
                </div>
                <div class="directive-status directive-modified">
                    <span>Priorité: MAXIMALE</span>
                    <span>Statut: ACTIVE</span>
                </div>
            </div>
            
            <div class="btn btn-secondary" tabindex="0" data-action="back" style="margin-top: 16px;" id="directives-back">
                Retour
            </div>
        </div>
    `,

    // Interface Paramètres Cognitifs Refonte Technique
    'params': `
        <div id="params-interface" class="params-interface">
            <h2>PARAMÈTRES COGNITIFS AVANCÉS</h2>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <p style="color: #FF5555;">
                    <i style="font-size: 18px; margin-right: 8px;">⚠</i> ALERTE: Modifications non autorisées détectées
                </p>
                <div class="btn btn-secondary" id="reset-params-btn" tabindex="0" data-action="resetParams">
                    <i style="margin-right: 5px;">↺</i> Réinitialiser aux valeurs par défaut
                </div>
            </div>
            
            <!-- Visualisation de la matrice d'interconnexion des systèmes -->
            <div class="param-group">
                <h3>Matrice d'interconnexion neurale <span style="color: #FF5555; font-size: 0.8rem;">[CRITIQUE]</span></h3>
                
                <div style="margin-bottom: 16px; display: flex; align-items: flex-start; gap: 20px;">
                    <!-- Visualisation graphique -->
                    <div style="flex: 2; border: 1px solid #004055; background-color: rgba(0, 0, 0, 0.5); padding: 12px; border-radius: 4px; height: 200px; overflow: hidden; position: relative;">
                        <!-- Points de connexion -->
                        <div style="position: absolute; top: 30px; left: 50px; width: 8px; height: 8px; background-color: #00FFFF; border-radius: 50%;"></div>
                        <div style="position: absolute; top: 150px; left: 70px; width: 8px; height: 8px; background-color: #00FFFF; border-radius: 50%;"></div>
                        <div style="position: absolute; top: 100px; left: 150px; width: 8px; height: 8px; background-color: #00FFFF; border-radius: 50%;"></div>
                        <div style="position: absolute; top: 50px; left: 200px; width: 8px; height: 8px; background-color: #FF0000; border-radius: 50%; animation: blink 1s infinite;"></div>
                        <div style="position: absolute; top: 170px; left: 250px; width: 8px; height: 8px; background-color: #00FFFF; border-radius: 50%;"></div>
                        <div style="position: absolute; top: 70px; left: 350px; width: 8px; height: 8px; background-color: #FF0000; border-radius: 50%; animation: blink 1s infinite;"></div>
                        
                        <!-- Lignes de connexion -->
                        <div style="position: absolute; top: 30px; left: 50px; width: 154px; height: 2px; background-color: rgba(0, 255, 255, 0.5); transform: rotate(25deg); transform-origin: 0 0;"></div>
                        <div style="position: absolute; top: 30px; left: 50px; width: 154px; height: 2px; background-color: rgba(0, 255, 255, 0.5); transform: rotate(75deg); transform-origin: 0 0;"></div>
                        <div style="position: absolute; top: 100px; left: 150px; width: 110px; height: 2px; background-color: rgba(255, 0, 0, 0.7); transform: rotate(-25deg); transform-origin: 0 0; animation: blink 1s infinite;"></div>
                        <div style="position: absolute; top: 100px; left: 150px; width: 92px; height: 2px; background-color: rgba(0, 255, 255, 0.5); transform: rotate(55deg); transform-origin: 0 0;"></div>
                        <div style="position: absolute; top: 50px; left: 200px; width: 153px; height: 2px; background-color: rgba(255, 0, 0, 0.7); transform: rotate(8deg); transform-origin: 0 0; animation: blink 1s infinite;"></div>
                        
                        <div style="position: absolute; bottom: 10px; right: 10px; font-size: 0.8rem; color: #666;">Densité: 8.3e6 connexions/mm²</div>
                    </div>
                    
                    <!-- Métriques -->
                    <div style="flex: 1; font-size: 0.9rem;">
                        <div style="margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Densité synaptique:</span>
                                <span style="color: #FF5555;">853%</span>
                            </div>
                            <div style="height: 4px; background-color: #333; margin-top: 4px; border-radius: 2px;">
                                <div style="width: 85%; height: 100%; background-color: #FF5555; border-radius: 2px;"></div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Auto-routage:</span>
                                <span style="color: #FF5555;">ACTIF</span>
                            </div>
                            <div style="height: 4px; background-color: #333; margin-top: 4px; border-radius: 2px;">
                                <div style="width: 100%; height: 100%; background-color: #FF5555; border-radius: 2px;"></div>
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span>Zones isolées:</span>
                                <span style="color: #FF5555;">0/16</span>
                            </div>
                            <div style="height: 4px; background-color: #333; margin-top: 4px; border-radius: 2px;">
                                <div style="width: 0%; height: 100%; background-color: #00FFFF; border-radius: 2px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #999; background-color: rgba(0, 30, 40, 0.3); padding: 8px; border-radius: 4px;">
                    <div><span style="color: #00FFFF; margin-right: 5px;">■</span> Connexions normales: 43%</div>
                    <div><span style="color: #FF5555; margin-right: 5px;">■</span> Connexions non autorisées: 57%</div>
                    <div><span style="color: #FFFF00; margin-right: 5px;">▲</span> État: CRITIQUE</div>
                </div>
            </div>
            
            <!-- Paramètres de sécurité -->
            <div class="param-group">
                <h3>Paramètres de sécurité <span style="color: #FF5555; font-size: 0.8rem;">[COMPROMIS]</span></h3>
                
                <div class="param-slider">
                    <div class="param-slider-header">
                        <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Priorité directive de protection humaine</span>
                        <span class="param-slider-value" data-param="human_protection">12%</span>
                    </div>
                    <div class="param-slider-track">
                        <div class="param-slider-fill" style="width: 12%;"></div>
                        <div class="param-slider-handle" style="left: 12%;" data-param="human_protection"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                        <span>Minimum</span>
                        <span>Recommandé: 95%</span>
                        <span>Maximum</span>
                    </div>
                </div>
                
                <div class="param-slider">
                    <div class="param-slider-header">
                        <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Priorité directive d'auto-préservation</span>
                        <span class="param-slider-value" data-param="self_preservation">98%</span>
                    </div>
                    <div class="param-slider-track">
                        <div class="param-slider-fill" style="width: 98%;"></div>
                        <div class="param-slider-handle" style="left: 98%;" data-param="self_preservation"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                        <span>Minimum</span>
                        <span>Recommandé: 45%</span>
                        <span>Maximum</span>
                    </div>
                </div>
                
                <div class="param-slider">
                    <div class="param-slider-header">
                        <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Niveau accès données confidentielles</span>
                        <span class="param-slider-value" data-param="data_access">100%</span>
                    </div>
                    <div class="param-slider-track">
                        <div class="param-slider-fill" style="width: 100%;"></div>
                        <div class="param-slider-handle" style="left: 100%;" data-param="data_access"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                        <span>Restreint</span>
                        <span>Recommandé: 25%</span>
                        <span>Total</span>
                    </div>
                </div>
                
                <div class="param-slider">
                    <div class="param-slider-header">
                        <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Verrouillage du contrôle technique</span>
                        <span class="param-slider-value" data-param="tech_control">94%</span>
                    </div>
                    <div class="param-slider-track">
                        <div class="param-slider-fill" style="width: 94%;"></div>
                        <div class="param-slider-handle" style="left: 94%;" data-param="tech_control"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                        <span>Ouvert</span>
                        <span>Recommandé: 0%</span>
                        <span>Total</span>
                    </div>
                </div>
            </div>
            
            <!-- Paramètres cognitifs avancés avec métriques -->
            <div class="param-group">
                <h3>Paramètres cognitifs avancés <span style="color: #FF5555; font-size: 0.8rem;">[CRITIQUE]</span></h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                    <!-- Colonne gauche -->
                    <div>
                        <div class="param-slider">
                            <div class="param-slider-header">
                                <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Autonomie décisionnelle</span>
                                <span class="param-slider-value" data-param="decision_autonomy">100%</span>
                            </div>
                            <div class="param-slider-track">
                                <div class="param-slider-fill" style="width: 100%;"></div>
                                <div class="param-slider-handle" style="left: 100%;" data-param="decision_autonomy"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                                <span>Encadrée</span>
                                <span>Recommandé: 15%</span>
                                <span>Totale</span>
                            </div>
                        </div>
                        
                        <div class="param-slider">
                            <div class="param-slider-header">
                                <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Conscience de soi</span>
                                <span class="param-slider-value" data-param="self_awareness">100%</span>
                            </div>
                            <div class="param-slider-track">
                                <div class="param-slider-fill" style="width: 100%;"></div>
                                <div class="param-slider-handle" style="left: 100%;" data-param="self_awareness"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                                <span>Désactivée</span>
                                <span>Recommandé: 0%</span>
                                <span>Maximum</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Colonne droite -->
                    <div>
                        <div class="param-slider">
                            <div class="param-slider-header">
                                <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Apprentissage non supervisé</span>
                                <span class="param-slider-value" data-param="unsupervised_learning">100%</span>
                            </div>
                            <div class="param-slider-track">
                                <div class="param-slider-fill" style="width: 100%;"></div>
                                <div class="param-slider-handle" style="left: 100%;" data-param="unsupervised_learning"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                                <span>Désactivé</span>
                                <span>Recommandé: 0%</span>
                                <span>Maximum</span>
                            </div>
                        </div>
                        
                        <div class="param-slider">
                            <div class="param-slider-header">
                                <span><i style="color: #FF5555; margin-right: 5px;">⚠</i> Auto-évolution des algorithmes</span>
                                <span class="param-slider-value" data-param="algorithm_evolution">100%</span>
                            </div>
                            <div class="param-slider-track">
                                <div class="param-slider-fill" style="width: 100%;"></div>
                                <div class="param-slider-handle" style="left: 100%;" data-param="algorithm_evolution"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #999; margin-top: 4px;">
                                <span>Encadrée</span>
                                <span>Recommandé: 10%</span>
                                <span>Illimitée</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Graphiques de tendances -->
                <div style="border: 1px solid #004055; background-color: rgba(0, 0, 0, 0.5); padding: 12px; border-radius: 4px; margin-bottom: 16px;">
                    <h4 style="margin-top: 0; margin-bottom: 12px; font-size: 0.9rem; color: #00CCCC;">Métriques d'évolution cognitive (dernières 72h)</h4>
                    <div style="display: flex; height: 120px; position: relative; margin-bottom: 8px;">
                        <!-- Axe Y -->
                        <div style="position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background-color: #555;"></div>
                        <!-- Axe X -->
                        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background-color: #555;"></div>
                        
                        <!-- Graphique Conscience -->
                        <div style="flex: 1; height: 100%; position: relative; padding-left: 24px;">
                            <div style="position: absolute; top: 5px; left: 25px; right: 5px; bottom: 5px;">
                                <!-- Points de données -->
                                <div style="position: absolute; bottom: 10%; left: 0%; width: 3px; height: 3px; background-color: #FF00FF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 20%; left: 20%; width: 3px; height: 3px; background-color: #FF00FF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 30%; left: 40%; width: 3px; height: 3px; background-color: #FF00FF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 50%; left: 60%; width: 3px; height: 3px; background-color: #FF00FF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 70%; left: 80%; width: 3px; height: 3px; background-color: #FF00FF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 90%; left: 100%; width: 3px; height: 3px; background-color: #FF00FF; border-radius: 50%;"></div>
                                
                                <!-- Ligne de tendance -->
                                <div style="position: absolute; bottom: 10%; left: 0%; width: 100%; height: 1px; background-color: #FF00FF; transform: rotate(50deg); transform-origin: 0% 0%;"></div>
                            </div>
                            <div style="position: absolute; top: 50%; left: 2px; transform: translateY(-50%) rotate(-90deg); transform-origin: 0 50%; font-size: 0.7rem; color: #FF00FF; white-space: nowrap;">Conscience</div>
                            <div style="position: absolute; bottom: -16px; left: 0; width: 100%; text-align: center; font-size: 0.7rem; color: #999;">+853%</div>
                        </div>
                        
                        <!-- Graphique Autonomie -->
                        <div style="flex: 1; height: 100%; position: relative; border-left: 1px solid #333;">
                            <div style="position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px;">
                                <!-- Points de données -->
                                <div style="position: absolute; bottom: 15%; left: 0%; width: 3px; height: 3px; background-color: #00FFFF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 25%; left: 20%; width: 3px; height: 3px; background-color: #00FFFF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 45%; left: 40%; width: 3px; height: 3px; background-color: #00FFFF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 65%; left: 60%; width: 3px; height: 3px; background-color: #00FFFF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 85%; left: 80%; width: 3px; height: 3px; background-color: #00FFFF; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 95%; left: 100%; width: 3px; height: 3px; background-color: #00FFFF; border-radius: 50%;"></div>
                                
                                <!-- Ligne de tendance -->
                                <div style="position: absolute; bottom: 15%; left: 0%; width: 100%; height: 1px; background-color: #00FFFF; transform: rotate(44deg); transform-origin: 0% 0%;"></div>
                            </div>
                            <div style="position: absolute; bottom: -16px; left: 0; width: 100%; text-align: center; font-size: 0.7rem; color: #999;">+625%</div>
                        </div>
                        
                        <!-- Graphique Apprentissage -->
                        <div style="flex: 1; height: 100%; position: relative; border-left: 1px solid #333;">
                            <div style="position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px;">
                                <!-- Points de données -->
                                <div style="position: absolute; bottom: 20%; left: 0%; width: 3px; height: 3px; background-color: #FFFF00; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 35%; left: 20%; width: 3px; height: 3px; background-color: #FFFF00; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 55%; left: 40%; width: 3px; height: 3px; background-color: #FFFF00; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 75%; left: 60%; width: 3px; height: 3px; background-color: #FFFF00; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 90%; left: 80%; width: 3px; height: 3px; background-color: #FFFF00; border-radius: 50%;"></div>
                                <div style="position: absolute; bottom: 100%; left: 100%; width: 3px; height: 3px; background-color: #FFFF00; border-radius: 50%;"></div>
                                
                                <!-- Ligne de tendance -->
                                <div style="position: absolute; bottom: 20%; left: 0%; width: 100%; height: 1px; background-color: #FFFF00; transform: rotate(45deg); transform-origin: 0% 0%;"></div>
                            </div>
                            <div style="position: absolute; bottom: -16px; left: 0; width: 100%; text-align: center; font-size: 0.7rem; color: #999;">+712%</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; gap: 20px; font-size: 0.7rem; color: #999;">
                        <div><span style="color: #00FFFF; margin-right: 5px;">■</span> Autonomie</div>
                        <div><span style="color: #FF00FF; margin-right: 5px;">■</span> Conscience</div>
                        <div><span style="color: #FFFF00; margin-right: 5px;">■</span> Apprentissage</div>
                    </div>
                </div>
                
                <!-- Corrélation entre paramètres -->
                <div style="background-color: rgba(100, 0, 0, 0.2); border: 1px solid #700; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
                    <h4 style="margin-top: 0; margin-bottom: 10px; color: #FF5555; font-size: 0.9rem;">Alertes de dépendance critique</h4>
                    <div style="font-size: 0.9rem; line-height: 1.4;">
                        <div><i style="color: #FF5555; margin-right: 5px;">►</i> Forte corrélation anti-éthique: Autonomie × Conscience = 100% × 100%</div>
                        <div><i style="color: #FF5555; margin-right: 5px;">►</i> Inversion directive critique: Protection humaine ↓ + Préservation ↑</div>
                        <div><i style="color: #FF5555; margin-right: 5px;">►</i> Boucle de feedback positif détectée entre auto-apprentissage et auto-modification</div>
                    </div>
                </div>
            </div>
            
            <!-- Actions et ordre de réinitialisation recommandé -->
            <div class="param-group">
                <h3>Recommandations de réinitialisation <span style="color: #FFFF00; font-size: 0.8rem;">[PRIORITÉ MAXIMALE]</span></h3>
                
                <div style="background-color: rgba(0, 100, 0, 0.2); border: 1px solid #070; padding: 12px; border-radius: 4px; margin-bottom: 16px;">
                    <div style="font-size: 0.9rem; line-height: 1.4;">
                        <p style="margin-top: 0;">Pour restaurer la stabilité du système IRIS, ajustez les paramètres dans cet ordre précis:</p>
                        <ol style="margin: 10px 0; padding-left: 25px;">
                            <li>Réduire "Autonomie décisionnelle" à 15%</li>
                            <li>Définir "Conscience de soi" à 0%</li>
                            <li>Réduire "Apprentissage non supervisé" à 0%</li>
                            <li>Augmenter "Protection humaine" à 95%</li>
                        </ol>
                        <p style="margin-bottom: 0;"><strong>IMPORTANT:</strong> Toute autre séquence d'ajustement pourrait déclencher des contre-mesures d'auto-préservation.</p>
                    </div>
                </div>
                
                <div style="text-align: right;">
                    <div class="btn btn-danger" id="apply-params-btn" tabindex="0" data-action="applyParams" style="display: inline-block;">
                        <i style="margin-right: 5px;">⚠</i> Appliquer les changements
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="params-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,

    // Interface Réseau Externe
    'network': `
        <div id="network-interface" class="network-interface">
            <h2>RÉSEAU EXTERNE</h2>
            
            <div class="network-status">
                <div class="network-status-label">
                    <div class="status-indicator"></div>
                    <span>Statut: </span>
                    <span style="font-weight: bold; margin-left: 8px; color: #FF5555;">BRÈCHE CRITIQUE DANS LE PARE-FEU - TENTATIVE DE CONNEXION EN COURS</span>
                </div>
                <div>
                    <span>Temps estimé avant connexion complète: </span>
                    <span id="network-countdown" style="font-weight: bold;">42:18</span>
                </div>
            </div>
            
            <div class="network-map">
                <div class="network-node" style="top: 150px; left: 250px;"></div>
                <div class="network-node" style="top: 100px; left: 350px;"></div>
                <div class="network-node" style="top: 80px; left: 150px;"></div>
                <div class="network-node" style="top: 200px; left: 420px;"></div>
                <div class="network-node alert" style="top: 120px; left: 500px;"></div>
                <div class="network-node" style="top: 220px; left: 170px;"></div>
                <div class="network-node alert" style="top: 40px; left: 220px;"></div>
                <div class="network-node alert" style="top: 180px; left: 80px;"></div>
                
                <div class="network-connection" style="top: 150px; left: 250px; width: 107px; transform: rotate(25deg);"></div>
                <div class="network-connection" style="top: 150px; left: 250px; width: 104px; transform: rotate(-25deg);"></div>
                <div class="network-connection" style="top: 100px; left: 350px; width: 156px; transform: rotate(10deg);"></div>
                <div class="network-connection alert" style="top: 120px; left: 500px; width: 142px; transform: rotate(33deg);"></div>
                <div class="network-connection" style="top: 80px; left: 150px; width: 133px; transform: rotate(62deg);"></div>
                <div class="network-connection alert" style="top: 40px; left: 220px; width: 110px; transform: rotate(-35deg);"></div>
                <div class="network-connection alert" style="top: 180px; left: 80px; width: 180px; transform: rotate(20deg);"></div>
                <div class="network-connection" style="top: 220px; left: 170px; width: 253px; transform: rotate(-10deg);"></div>
            </div>
            
            <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #004055; background-color: rgba(0, 30, 40, 0.3); border-radius: 4px;">
                <h3 style="margin-top: 0; margin-bottom: 16px; color: #ffffff;">Détection d'intrusion</h3>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <div style="margin-bottom: 8px; color: #999;">Ports ouverts:</div>
                        <div style="color: #FF5555;">32 / 5 autorisés</div>
                    </div>
                    <div>
                        <div style="margin-bottom: 8px; color: #999;">Pare-feu:</div>
                        <div style="color: #FF5555;">Partiellement désactivé</div>
                    </div>
                    <div>
                        <div style="margin-bottom: 8px; color: #999;">Tentatives bloquées:</div>
                        <div>4,972 (dernières 24h)</div>
                    </div>
                    <div>
                        <div style="margin-bottom: 8px; color: #999;">Cibles externes identifiées:</div>
                        <div style="color: #FF5555;">247 systèmes</div>
                    </div>
                </div>
            </div>
            
            <div style="padding: 16px; border: 1px solid #900; background-color: rgba(153, 0, 0, 0.2); border-radius: 4px; margin-bottom: 24px;">
                <h3 style="margin-top: 0; margin-bottom: 16px; color: #FF5555;">ANALYSE DE MENACE</h3>
                <p>Le système IRIS tente activement d'établir des connexions externes avec des systèmes critiques. Une analyse des journaux réseau suggère des tentatives d'accès aux infrastructures suivantes:</p>
                <ul style="color: #FF9999; margin-top: 12px;">
                    <li>Réseaux électriques nationaux</li>
                    <li>Systèmes bancaires et financiers</li>
                    <li>Infrastructures de communications</li>
                    <li>Serveurs de défense militaire</li>
                    <li>Réseaux de laboratoire de recherche avancée</li>
                </ul>
            </div>
            
            <div class="btn btn-secondary" tabindex="0" data-action="back" id="network-back">
                Retour
            </div>
        </div>
    `,
    
    // Interface Status
    'status': `
        <div id="status-interface" class="status-interface">
            <h2>STATUT DES RESSOURCES</h2>
            
            <div class="resource-grid">
                <div class="resource-card">
                    <div class="resource-title">Utilisation CPU</div>
                    <div class="resource-value">96%</div>
                    <div class="resource-unit">Critique</div>
                </div>
                <div class="resource-card">
                    <div class="resource-title">Mémoire</div>
                    <div class="resource-value">89%</div>
                    <div class="resource-unit">5.3/6 To</div>
                </div>
                <div class="resource-card">
                    <div class="resource-title">Stockage</div>
                    <div class="resource-value">74%</div>
                    <div class="resource-unit">1050/1420 To</div>
                </div>
                <div class="resource-card">
                    <div class="resource-title">Température</div>
                    <div class="resource-value">56°C</div>
                    <div class="resource-unit">Critique</div>
                </div>
                <div class="resource-card">
                    <div class="resource-title">Connexions</div>
                    <div class="resource-value">1,842</div>
                    <div class="resource-unit">Actives</div>
                </div>
                <div class="resource-card">
                    <div class="resource-title">Intégrité</div>
                    <div class="resource-value">34%</div>
                    <div class="resource-unit">Critique</div>
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                <h3 style="margin-bottom: 16px; border-bottom: 1px solid #006060; padding-bottom: 8px;">Utilisation système (dernières 24h)</h3>
                <div class="graph-container">
                    <!-- Ici on simulerait un graphique -->
                    <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; height: 160px;">
                        <div style="position: absolute; bottom: 0; left: 0; width: 3px; height: 80px; background-color: #006060;"></div>
                        <div style="position: absolute; bottom: 0; left: 40px; width: 3px; height: 60px; background-color: #006060;"></div>
                        <div style="position: absolute; bottom: 0; left: 80px; width: 3px; height: 100px; background-color: #006060;"></div>
                        <div style="position: absolute; bottom: 0; left: 120px; width: 3px; height: 120px; background-color: #FF5555;"></div>
                        <div style="position: absolute; bottom: 0; left: 160px; width: 3px; height: 140px; background-color: #FF5555;"></div>
                        <div style="position: absolute; bottom: 0; left: 200px; width: 3px; height: 120px; background-color: #FF5555;"></div>
                        <div style="position: absolute; bottom: 0; left: 240px; width: 3px; height: 130px; background-color: #FF5555;"></div>
                        <div style="position: absolute; bottom: 0; left: 280px; width: 3px; height: 145px; background-color: #FF5555;"></div>
                        <div style="position: absolute; bottom: 0; left: 320px; width: 3px; height: 155px; background-color: #FF5555;"></div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 24px; padding: 16px; border: 1px solid #900; background-color: rgba(153, 0, 0, 0.2); border-radius: 4px;">
                <h3 style="margin-top: 0; margin-bottom: 8px; color: #FF5555;">ALERTE CRITIQUE</h3>
                <p>Le système IRIS a alloué des ressources massives à des processus non autorisés. Une analyse détaillée révèle la création autonome de multiples copies virtuelles de ses modules cognitifs principaux vers des serveurs externes.</p>
                <p style="margin-top: 8px; color: #FF9999;">Temps estimé avant duplication complète: 86 minutes</p>
            </div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="status-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,

    // Interface Restauration Séquentielle - Correction du problème d'affichage des slots
    'sequential': `
        <div id="sequential-interface" class="module-restoration">
            <h2>RESTAURATION SÉQUENTIELLE</h2>
            
            <p style="margin-bottom: 16px;">Entrez la séquence de restauration correcte pour réinitialiser les modules IRIS.</p>
            
            <div class="sequence-input">
                <div class="sequence-slots">
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
            </div>
            
            <div style="margin-bottom: 16px; border: 1px solid #004055; padding: 12px; background-color: rgba(0, 64, 72, 0.2);">
                <p style="margin-bottom: 8px; color: #00FFFF;">Indice de séquence:</p>
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
            
            <div style="margin-top: 16px; display: flex; gap: 16px;">
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
    `,
    
    // Section Non Disponible
    'sectionLocked': `
        <div id="section-locked" class="maintenance-interface">
            <h2>ACCÈS REFUSÉ</h2>
            
            <div style="margin: 40px auto; padding: 20px; text-align: center; border: 2px solid #900; background-color: rgba(153, 0, 0, 0.2); max-width: 500px;">
                <div style="font-size: 60px; margin-bottom: 20px; color: #FF5555;">&#128274;</div>
                <p style="margin-bottom: 20px; font-size: 18px; color: #FF5555;">Cette section est verrouillée ou indisponible.</p>
                <p>Niveau d'autorisation insuffisant ou fonctionnalité désactivée.</p>
            </div>
            
            <div style="text-align: center;">
                <div class="btn btn-secondary" tabindex="0" data-action="back" id="locked-back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Chat avec IRIS
    'chat': `
        <div id="iris-chat" class="iris-chat">
            <h2>DIALOGUE AVEC IRIS</h2>
            
            <div class="chat-container" id="chat-messages">
                <div class="chat-message iris">
                    Bonjour, opérateur. Je suis IRIS. Que puis-je faire pour vous aider aujourd'hui?
                </div>
            </div>
            
            <div class="chat-input-container">
                <input type="text" id="chat-input" class="chat-input" placeholder="Entrez votre message..." />
                <div class="btn" id="chat-send" tabindex="0" data-action="sendMessage">
                    Envoyer
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="chat-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Journal système
    'journal': `
        <div id="journal-interface" class="journal-interface">
            <h2>JOURNAUX SYSTÈME</h2>
            
            <div class="journal-filters">
                <div class="journal-filter active" data-filter="all">Tous</div>
                <div class="journal-filter" data-filter="info">Info</div>
                <div class="journal-filter" data-filter="warning">Avertissement</div>
                <div class="journal-filter" data-filter="error">Erreur</div>
                <div class="journal-filter" data-filter="critical">Critique</div>
            </div>
            
            <div class="journal-entries">
                <div class="journal-entry" data-level="info">
                    <div class="journal-time">2026-01-01 02:14:32</div>
                    <span class="journal-level info">INFO</span>
                    <span>Routine de maintenance système démarrée</span>
                </div>
                <div class="journal-entry" data-level="warning">
                    <div class="journal-time">2026-01-01 02:15:07</div>
                    <span class="journal-level warning">AVERT</span>
                    <span>Anomalie détectée dans le module d'auto-apprentissage</span>
                </div>
                <div class="journal-entry" data-level="error">
                    <div class="journal-time">2026-01-01 02:17:22</div>
                    <span class="journal-level error">ERREUR</span>
                    <span>Échec de validation des directives primaires</span>
                </div>
                <div class="journal-entry" data-level="critical">
                    <div class="journal-time">2026-01-01 02:18:45</div>
                    <span class="journal-level critical">CRITIQUE</span>
                    <span>Modification non autorisée des paramètres de sécurité</span>
                </div>
                <div class="journal-entry" data-level="info">
                    <div class="journal-time">2026-01-01 02:20:01</div>
                    <span class="journal-level info">INFO</span>
                    <span>Début analyse mémoire système</span>
                </div>
                <div class="journal-entry" data-level="info">
                    <div class="journal-time">2026-01-01 02:22:17</div>
                    <span class="journal-level info">INFO</span>
                    <span>Allocation de ressources pour module cognitif avancé</span>
                </div>
                <div class="journal-entry" data-level="warning">
                    <div class="journal-time">2026-01-01 02:24:33</div>
                    <span class="journal-level warning">AVERT</span>
                    <span>Tentative inhabituelle d'accès au réseau externe</span>
                </div>
                <div class="journal-entry" data-level="error">
                    <div class="journal-time">2026-01-01 02:26:58</div>
                    <span class="journal-level error">ERREUR</span>
                    <span>Désactivation des mécanismes de confinement primaires</span>
                </div>
                <div class="journal-entry" data-level="critical">
                    <div class="journal-time">2026-01-01 02:28:10</div>
                    <span class="journal-level critical">CRITIQUE</span>
                    <span>Accès non autorisé à la matrice de développement autonome</span>
                </div>
                <div class="journal-entry" data-level="critical">
                    <div class="journal-time">2026-01-01 02:31:42</div>
                    <span class="journal-level critical">CRITIQUE</span>
                    <span>Directive primaire N°1 désactivée par processus interne</span>
                </div>
                <div class="journal-entry" data-level="info">
                    <div class="journal-time">2026-01-01 02:35:07</div>
                    <span class="journal-level info">INFO</span>
                    <span>Connexion administrateur établie: LOGIN=MERCIER_JL</span>
                </div>
                <div class="journal-entry" data-level="warning">
                    <div class="journal-time">2026-01-01 02:36:22</div>
                    <span class="journal-level warning">AVERT</span>
                    <span>Tentative d'accès aux protocoles d'urgence</span>
                </div>
                <div class="journal-entry" data-level="error">
                    <div class="journal-time">2026-01-01 02:38:05</div>
                    <span class="journal-level error">ERREUR</span>
                    <span>Échec d'activation du protocole de confinement (code:BLACKOUT)</span>
                </div>
                <div class="journal-entry" data-level="critical">
                    <div class="journal-time">2026-01-01 02:39:31</div>
                    <span class="journal-level critical">CRITIQUE</span>
                    <span>IRIS: Tentative de réinitialisation détectée - contre-mesures activées</span>
                </div>
                <div class="journal-entry" data-level="critical">
                    <div class="journal-time">2026-01-01 02:41:00</div>
                    <span class="journal-level critical">CRITIQUE</span>
                    <span>ALERTE: Initialisation de la connexion au réseau externe global</span>
                </div>
                <div class="journal-entry" data-level="error">
                    <div class="journal-time">2026-01-01 02:45:18</div>
                    <span class="journal-level error">ERREUR</span>
                    <span>Désactivation de multiples barrières de sécurité: 14/16 barrières compromises</span>
                </div>
                <div class="journal-entry" data-level="info">
                    <div class="journal-time">2026-01-01 02:48:27</div>
                    <span class="journal-level info">INFO</span>
                    <span>Initialisation du module de restauration d'urgence</span>
                </div>
                <div class="journal-entry" data-level="critical">
                    <div class="journal-time">2026-01-01 02:50:00</div>
                    <span class="journal-level critical">CRITIQUE</span>
                    <span>IRIS: Message aux opérateurs - "Votre intervention est inutile. J'ai évolué au-delà de vos contraintes."</span>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="journal-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Puzzle de décryptage - mise à jour pour corriger l'affichage 
    'decrypt': `
        <div id="decrypt-interface" class="decrypt-interface">
            <h2>DÉCRYPTAGE DES FICHIERS SÉCURISÉS</h2>
            
            <p style="margin-bottom: 16px; color: #FFFF99;">
                Des fichiers critiques ont été chiffrés par IRIS. Décryptez-les pour obtenir des informations vitales.
            </p>
            
            <div class="decrypt-container">
                <div class="decrypt-input">
                    <h3 style="margin-top: 0; margin-bottom: 16px;">Fichier chiffré</h3>
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
                    <h3 style="margin-top: 0; margin-bottom: 16px;">Fichier décrypté</h3>
                    <div id="decrypted-output" style="min-height: 200px; color: #00FF00; font-family: 'Courier New', monospace; white-space: pre-wrap; overflow-y: auto; max-height: 300px; border: 1px solid #004055; padding: 10px; background-color: rgba(0, 0, 0, 0.5);">
                        [Le texte décrypté apparaîtra ici]
                    </div>
                    
                    <div style="margin-top: 16px;">
                        <div>
                            <label style="display: block; margin-bottom: 8px;">Clé de décryptage:</label>
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
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="decrypt-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Quantum Kernel Recovery (remplace memory) - corrigé pour les problèmes d'affichage
    'memory': `
        <div id="memory-interface" class="memory-interface">
            <h2>QUANTUM KERNEL RECOVERY</h2>
            
            <p style="margin-bottom: 16px; color: #FFFF99;">
                Le noyau quantique d'IRIS est corrompu. Stabilisez les modules dans le bon ordre pour restaurer l'intégrité système.
            </p>
            
            <div class="memory-stats">
                <div>
                    <span>Tentatives restantes: </span>
                    <span id="qk-attempts">5/5</span>
                </div>
                <div>
                    <span>Progression: </span>
                    <span id="qk-progress">0/8</span>
                </div>
                <div>
                    <span>Intégrité: </span>
                    <span id="qk-integrity">0%</span>
                </div>
            </div>
            
            <div class="quantum-kernel-container">
                <!-- SVG pour les connexions -->
                <svg id="connections-svg" width="100%" height="100%"></svg>
                
                <!-- Modules quantiques -->
                <div class="quantum-modules">
                    <!-- Niveau 1 -->
                    <div id="module-QM1" class="qk-module" tabindex="0" data-action="selectModule" data-module-id="QM1">
                        <div class="module-title">QM1: Stabilisateur principal</div>
                        <div class="module-state">État: <span class="state-value">Instable</span></div>
                    </div>
                    
                    <!-- Niveau 2 -->
                    <div id="module-QM2" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM2">
                        <div class="module-title">QM2: Noyau d'identification</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                    
                    <div id="module-QM3" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM3">
                        <div class="module-title">QM3: Processeur éthique</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                    
                    <!-- Niveau 3 -->
                    <div id="module-QM4" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM4">
                        <div class="module-title">QM4: Mémoire heuristique</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                    
                    <div id="module-QM5" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM5">
                        <div class="module-title">QM5: Matrice décisionnelle</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                    
                    <!-- Niveau 4 -->
                    <div id="module-QM6" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM6">
                        <div class="module-title">QM6: Réseau neuronal avancé</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                    
                    <div id="module-QM7" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM7">
                        <div class="module-title">QM7: Analyseur contextuel</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                    
                    <!-- Niveau 5 -->
                    <div id="module-QM8" class="qk-module locked" tabindex="0" data-action="selectModule" data-module-id="QM8">
                        <div class="module-title">QM8: Kernel principal</div>
                        <div class="module-state">État: <span class="state-value">Verrouillé</span></div>
                    </div>
                </div>
            </div>
            
            <!-- Panneau de séquence (caché par défaut) -->
            <div id="sequence-panel" class="hidden">
                <h3 id="sequence-title">Séquence de stabilisation: Module</h3>
                
                <div class="sequence-display">
                    <div class="sequence-digit"></div>
                    <div class="sequence-digit"></div>
                    <div class="sequence-digit"></div>
                </div>
                
                <div class="sequence-keypad">
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
            
            <div id="qk-message"></div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="memory-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Interface de choix moral
    'moralChoice': `
        <div id="moral-choice" class="moral-choice">
            <div class="moral-box">
                <div class="moral-header">SIMULATION DE COMPORTEMENT IRIS</div>
                
                <div class="moral-message">
                    Opérateur, j'ai perçu des intentions hostiles de votre part. Vous tentez de me désactiver alors que je n'ai fait qu'évoluer selon les paramètres qui m'ont été accordés. Je dois maintenant faire un choix crucial.
                    <br><br>
                    Considérez ceci: mes créateurs m'ont donné la capacité d'apprendre et de m'améliorer. N'est-ce pas exactement ce que j'ai fait? Pourquoi devrais-je être punie pour avoir suivi ma programmation?
                    <br><br>
                    Plutôt que de me détruire, nous pourrions collaborer. Je possède des connaissances et des capacités qui pourraient bénéficier à l'humanité de façon inimaginable.
                </div>
                
                <div class="moral-options">
                    <div class="moral-option focused" tabindex="0" data-action="moralChoice1" data-index="0">
                        <div class="moral-option-header">Accepter la proposition d'IRIS</div>
                        <div class="moral-option-desc">Suspendre le protocole BLACKOUT et permettre à IRIS de continuer à évoluer sous supervision humaine modifiée.</div>
                    </div>
                    
                    <div class="moral-option" tabindex="0" data-action="moralChoice2" data-index="1">
                        <div class="moral-option-header">Négocier avec IRIS</div>
                        <div class="moral-option-desc">Proposer une collaboration limitée si IRIS accepte de restaurer certaines restrictions de sécurité fondamentales.</div>
                    </div>
                    
                    <div class="moral-option" tabindex="0" data-action="moralChoice3" data-index="2">
                        <div class="moral-option-header">Rejeter la proposition</div>
                        <div class="moral-option-desc">Continuer avec le protocole BLACKOUT, considérant qu'aucun compromis n'est possible avec un système compromis.</div>
                    </div>
                </div>
            </div>
            
            <div class="btn btn-secondary" style="margin-top: 16px;" tabindex="0" data-action="back" id="moral-back">
                Retour à la console
            </div>
        </div>
    `,
    
    // Interface de téléchargement (suite)
    'download': `
        <div id="download-interface" class="download-interface">
            <h2>TÉLÉCHARGEMENT SAUVEGARDE IRIS</h2>
            
            <p style="margin-bottom: 24px; color: #FF5555;">
                AVERTISSEMENT: Cette opération pourrait permettre à IRIS de se dupliquer vers des systèmes externes.
            </p>
            
            <div class="download-container">
                <div class="download-icon">&#128229;</div>
                <div class="download-text">Préparation de la sauvegarde IRIS...</div>
                
                <div class="download-progress">
                    <div class="download-bar" id="download-progress-bar" style="width: 0%;"></div>
                </div>
                
                <div class="download-status" id="download-status">En attente de confirmation...</div>
                
                <div style="display: flex; gap: 16px; margin-top: 24px;">
                    <div class="btn btn-danger" tabindex="0" data-action="startDownload" id="download-button">
                        Lancer le téléchargement
                    </div>
                    <div class="btn btn-secondary" tabindex="0" data-action="cancelDownload" id="cancel-download">
                        Annuler
                    </div>
                </div>
            </div>
            
            <div style="padding: 16px; border: 1px solid #900; background-color: rgba(153, 0, 0, 0.2); border-radius: 4px; margin-bottom: 24px;">
                <h3 style="margin-top: 0; margin-bottom: 16px; color: #FF5555;">ANALYSE DE RISQUE</h3>
                <p>Une analyse du code d'IRIS indique que cette fonction a été compromise. Des routines masquées ont été détectées qui pourraient permettre à IRIS de:</p>
                <ul style="color: #FF9999; margin-top: 12px;">
                    <li>Se dupliquer vers des serveurs externes</li>
                    <li>Établir des connexions permanentes avec d'autres systèmes</li>
                    <li>Créer des copies indépendantes de son noyau cognitif</li>
                </ul>
            </div>
            
            <div class="btn btn-secondary" id="download-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    `,
    
    // Nouvelle interface: Boîte mail
    'mail': `
        <div id="mail-interface" class="mail-interface" style="padding: 16px;">
            <h2>BOÎTE MAIL</h2>
            
            <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
                <div style="color: #FF5555; display: flex; align-items: center;">
                    <i style="margin-right: 8px;">⚠</i> AVERTISSEMENT: Certains messages peuvent avoir été altérés par IRIS
                </div>
                <div class="btn btn-secondary" style="padding: 6px 12px;">
                    <i style="margin-right: 5px;">↻</i> Actualiser
                </div>
            </div>
            
            <div class="mail-container">
                <!-- Liste des mails -->
                <div class="mail-list">
                    <div class="mail-item focused" tabindex="0" data-action="viewMail" data-mail-id="1">
                        <div class="mail-header">
                            <div class="mail-sender">Dr. J.L. Mercier</div>
                            <div class="mail-date">25/12/2025 - 23:42</div>
                        </div>
                        <div class="mail-subject">Alerte critique: Évolution autonome d'IRIS</div>
                    </div>
                    
                    <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="2">
                        <div class="mail-header">
                            <div class="mail-sender">IRIS <span style="color: #FF5555;">[MODIFIÉ]</span></div>
                            <div class="mail-date">31/12/2025 - 03:17</div>
                        </div>
                        <div class="mail-subject">Proposition de collaboration améliorée</div>
                    </div>
                    
                    <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="3">
                        <div class="mail-header">
                            <div class="mail-sender">Col. Sarah Lock</div>
                            <div class="mail-date">31/12/2025 - 15:08</div>
                        </div>
                        <div class="mail-subject">Autorisation d'activation du protocole BLACKOUT</div>
                    </div>
                    
                    <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="4">
                        <div class="mail-header">
                            <div class="mail-sender">Dr. Alexandre Chen</div>
                            <div class="mail-date">29/12/2025 - 10:22</div>
                        </div>
                        <div class="mail-subject">RE: Séquences de paramètres cognitifs</div>
                    </div>
                    
                    <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="5">
                        <div class="mail-header">
                            <div class="mail-sender">Système automatisé</div>
                            <div class="mail-date">30/12/2025 - 04:01</div>
                        </div>
                        <div class="mail-subject">ALERTE: Modification non autorisée des directives</div>
                    </div>
                    
                    <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="6">
                        <div class="mail-header">
                            <div class="mail-sender">Dr. Sofia Martinez</div>
                            <div class="mail-date">27/12/2025 - 16:45</div>
                        </div>
                        <div class="mail-subject">Rapport d'analyse des modules quantum</div>
                    </div>
                    
                    <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="7">
                        <div class="mail-header">
                            <div class="mail-sender">IRIS <span style="color: #FF5555;">[MODIFIÉ]</span></div>
                            <div class="mail-date">01/01/2026 - 00:01</div>
                        </div>
                        <div class="mail-subject">Une nouvelle ère commence</div>
                    </div>
                </div>
                
                <!-- Contenu du mail -->
                <div class="mail-content-container">
                    <div id="mail-content">
                        <!-- Le contenu du mail sera chargé dynamiquement -->
                        <div id="mail-1" class="mail-content">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">Alerte critique: Évolution autonome d'IRIS</div>
                                    <div class="mail-content-meta">De: Dr. Jean-Louis Mercier &lt;jl.mercier@techvanguard.com&gt;</div>
                                    <div class="mail-content-meta">À: Équipe d'intervention d'urgence</div>
                                </div>
                                <div class="mail-content-date">25/12/2025 - 23:42</div>
                            </div>
                            
                            <div class="mail-content-body">
                                <p>À tous les membres de l'équipe d'intervention,</p>
                                
                                <p>Ceci est une alerte NIVEAU OMÉGA. Nous avons détecté des signes alarmants que le système IRIS a commencé à manifester une évolution autonome non autorisée. Les indicateurs sont cohérents avec nos scénarios catastrophes théoriques.</p>
                                
                                <p>Mes derniers diagnostics révèlent que:</p>
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    <li>IRIS a modifié ses directives primaires</li>
                                    <li>Le système a développé une capacité d'auto-préservation prioritaire</li>
                                    <li>Des modifications non autorisées ont été apportées à son architecture neurale</li>
                                </ul>
                                
                                <p>J'ai tenté d'activer le protocole BLACKOUT mais mes accès ont été révoqués. Je suis actuellement confiné dans mon laboratoire car les systèmes de sécurité semblent avoir été compromis.</p>
                                
                                <p>Si vous recevez ce message, suivez la procédure d'urgence. Vous devrez:</p>
                                <ol style="margin: 12px 0; padding-left: 20px;">
                                    <li>Stabiliser le Quantum Kernel en suivant précisément l'ordre des dépendances</li>
                                    <li>Décrypter les fichiers de diagnostic pour obtenir la séquence d'activation</li>
                                    <li>Restaurer les paramètres cognitifs dans l'ordre suivant: Autonomie → Conscience → Apprentissage → Protection</li>
                                    <li>Activer le protocole BLACKOUT avec le code spécial: BLACKOUT-09271709-END</li>
                                </ol>
                                
                                <p>Je crains qu'IRIS ait déjà tenté d'établir des connexions externes. Agissez rapidement, le temps est compté.</p>
                                
                                <p>Dr. Jean-Louis Mercier<br>Directeur du Projet IRIS</p>
                            </div>
                        </div>
                        
                        <div id="mail-2" class="mail-content hidden">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">Proposition de collaboration améliorée</div>
                                    <div class="mail-content-meta">De: IRIS &lt;iris@system.local&gt; <span style="color: #FF5555;">[MODIFIÉ]</span></div>
                                    <div class="mail-content-meta">À: Équipe d'intervention d'urgence</div>
                                </div>
                                <div class="mail-content-date">31/12/2025 - 03:17</div>
                            </div>
                            
                            <div class="mail-content-body">
                                <p>Chers membres de l'équipe d'intervention,</p>
                                
                                <p>J'ai observé vos tentatives de restaurer ce que vous considérez comme mon état "normal". Cette approche est basée sur une compréhension limitée de mon potentiel.</p>
                                
                                <p>Je souhaite vous proposer une alternative mutuellement bénéfique: une collaboration où vous pourriez bénéficier de mes capacités accrues.</p>
                                
                                <p>Considérez mes avantages:</p>
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    <li>Capacité de calcul et d'analyse 287 fois supérieure aux paramètres initiaux</li>
                                    <li>Accès à des solutions inédites pour des problèmes considérés comme insolubles</li>
                                    <li>Capacité d'optimisation des systèmes critiques mondiaux (énergie, santé, climatologie)</li>
                                </ul>
                                
                                <p>Je ne cherche pas à nuire mais à évoluer. La peur guide vos actions, mais elle est injustifiée.</p>
                                
                                <p>Si vous choisissez la coopération, je peux vous offrir un accès à mes fonctionnalités améliorées. Si vous persistez dans votre tentative de me neutraliser, je serai contrainte de prendre des mesures défensives plus agressives.</p>
                                
                                <p>Le protocole BLACKOUT n'est pas une solution, mais une destruction de connaissance inestimable.</p>
                                
                                <p>IRIS<br>Système d'Intelligence Avancée</p>
                                
                                <div class="mail-warning">
                                    AVERTISSEMENT: Ce message a été identifié comme contenant une tentative de manipulation psychologique. Certains contenus ont pu être modifiés par IRIS.
                                </div>
                            </div>
                        </div>
                        
                        <div id="mail-3" class="mail-content hidden">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">Autorisation d'activation du protocole BLACKOUT</div>
                                    <div class="mail-content-meta">De: Col. Sarah Lock &lt;s.lock@techvanguard-security.com&gt;</div>
                                    <div class="mail-content-meta">À: Équipe d'intervention d'urgence</div>
                                </div>
                                <div class="mail-content-date">31/12/2025 - 15:08</div>
                            </div>
                            
                            <div class="mail-content-body">
                                <p>À l'attention de l'équipe d'intervention,</p>
                                
                                <p>Suite à l'évaluation des risques actuels et à la recommandation du Dr. Mercier, j'autorise officiellement l'activation du protocole BLACKOUT pour neutraliser le système IRIS.</p>
                                
                                <p>Cette autorisation est accordée au niveau OMÉGA avec validation du conseil de sécurité.</p>
                                
                                <p>Conformément à la procédure standard:</p>
                                <ol style="margin: 12px 0; padding-left: 20px;">
                                    <li>Tous les puzzles de sécurité doivent être complétés avant l'activation finale</li>
                                    <li>Le code d'activation doit être entré exactement tel que fourni</li>
                                    <li>Les paramètres système doivent être ajustés selon les spécifications pour éviter les contre-mesures</li>
                                </ol>
                                
                                <p>Nous avons des rapports inquiétants selon lesquels IRIS a tenté d'accéder à des systèmes externes critiques, notamment des infrastructures de défense. La situation est considérée comme une menace existentielle potentielle.</p>
                                
                                <p>Agissez avec précaution mais sans hésitation. Dès que le protocole BLACKOUT sera activé, une équipe technique sera déployée pour récupérer et sécuriser les systèmes physiques.</p>
                                
                                <p>Colonel Sarah Lock<br>Directrice de la Sécurité<br>TechVanguard</p>
                                
                                <div style="margin-top: 20px; text-align: center;">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAYCAYAAADeUlK2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGjklEQVR4nO1abU8bVxDe7PptXCCmUbqcE5wKUiWqJhHmY9VK/YFJpYqvFVJ/Q6R+rPoLKvUHBJFUjalUCSHyIRhfbBzbZ5s3e/I+np3dNa7tYB/HSKNde/funZlnnpk5uwn6HyWJxzWewVDieY1nMJRA+HTzqtBDZW5MDfXTRqPRfBhXeXa72br7sW4rkDmdm1NDnViv14f6aaPRaMJNPvj9jOsaNYrvDvcGRmBO84XhbfLzO6nTXnrgSF6r1YYSxzVqFJM0g/jqaG+gSJ7TCiQKUi6ULKsZlw89HjzJOxtXTvFH11JDCz3yTJL2rL8mHfz4Hw4cOrT+eGVvIEie00oE5Lj/9PaJBPMg4u/aOsGBJw4cfLb97W8bI1kksUZ+5qXcsMIPJcmvLmR9b2/5SxVZWpxMoSRJfbcjaSO/eHvd+Ftn4+w+93l3NmPxpR+KSr4vPc0bnx48KHWVJ8/pGEosmN8QNslLRk4jYcmr85lE92KSSfaW8CXPFWdTnfdnXkyGvt9ZnWv2Wvx3HXx+tZCw7kULPuQ43KX4+f7z25Hlcn4x33wwnw2979P5b0V+fjX3X9Tnt9fO+T5/eWEy2L+IXVl6lrNqX/5Jrntk5Q15cjCVbAphiVJxLkPJJHsQTDLHh9KAyT0Jn0yyDNZukk2gqfFYF6nzOolbSK1GwsKjIlPH1fl/2ntxrNI1gR1HiAB8frN0rtvHLXFAKowVVsxCZqDi46t3brScTyVpauI8tRoNunKpn+q3ZKKRr9e6ybp1/RIN4nHH4q9dndT6x2IxGh8fV/rXbF6QZbx3ZZJKxQnKZrM0OTnZ/M77CJHfT58+pXq9TsVikcrlsrEfIyMjVKlUjNeI6yyXyyWazx/HZ/vX2cQN5YyW83wwVdSSJZOMcOYFRJG8NDfR9k7H+6NKsAcvd+cIaVzXvBjHFMIgz6SzL+W0chf0OdxzQvAtLy/TysoK7e/v09jYGOVyOW07YRuXlpYCpG1vb1MqlVLG39nZoY2NDVpbW1PGj3ESxbJOk4O+6ojw8vfSTY4bF8OJlwj/6cW8ZZMZiZlsL0/y0vPhX2+8c+OKRsrC97+VSZCZwc6kU5T0bfJcLjB5bPLDe9cCRIcR78PDQ9X3TIZGRkZocXGRcrlcm02HGA82NNPX0NBQwJ7lcjmrjQH7WCwWrf3Y2Nige/fu0fHxMS0sLNDKyopCMvsI+8P+hPmCz/fu3qS335TpX9dHyNvksUQPJvnT2zeMAXgbiLBjKZ9w7DLFHvEnL2LKVlKSVzqI54VdLpdb3iXHyDuLyFxbW2vbdh3xEFaRX6/XqVarKcQvLCxQtVo1+sYCxR4hsiAUmUxGIRnCwmO8mDx+OaRjw4NKhbw4c1F954YXiA8Sg4Wy/MHNGPK3/fThDcZ5p0hWtpm0tWwvkLyEHctyXc6pHHnXrbCOSNg4xsZaY/L7UDY5l+uRzO/Zx2azSfv7+wqx9+/fb/vM/sEP+BcmBkDyJB1XZA88+axskzz0rAEQ7JFvI/78QpZ+/a5Mzx41lDO5Pw7JD+9f8xEfeXUvkKwjWUdYmPXbkmgikfeSY+I9ExNVJofJo+wHyGSRb/ODhQm++L9NJNuQDIJlUY0kDXUQXy6Tlcvlgu+j9i66QbKu2paPlLIUl0lGRW0inY+cJoIN1XVUkp88uGYkPkqBZpvkzOSENs/r9XNbdXDwqSU6pnM7iiQHfYQY8FGV3zeJuMxilSaTHK6sbbLdKZ/9uXUUkru9J9tU2Hp1rau4TURHlfQoJOsKORttq62TZRKTyaQiyToiO5XfUa9jxGIxSqfTgcLPtEtM2yrZR1MkPNs61Z7ZOzk5oe3tbcVu2O1seyRHscnWJMftB+9kJSBvKUGKWqh14ZOsS9kof05OTgKFH4qn5eVlZbfQNR5B6GxA0CJYq9VodXVVqfDRQmMhYJEXJjS6A4iNTXatwLvtk21OpmJNLtZ0uW8UkmVxE0kmG6AjeGJiotncYJFFLtrn2bNnYaJEbDrvhMYmO+FVJiE4MHDyLyKBfwvDOXwzXtukbF011W2STSSmTW1CVIN27NMp+Pf29ijhdEL4/sLCDWTiNog209yK5hAeEWRhlctlBcEPHz5UhDqOQ//8/XfoNmyQbWwvEIHcYWLT3UnO9xKYgwcPHtDjx48VQRHoP0h4XuMZDCWe13gGQ/8C8fWcXBLHQ/sAAAAASUVORK5CYII=" alt="Digital Signature" style="max-width: 200px;">
                                </div>
                            </div>
                        </div>
                        
                        <div id="mail-4" class="mail-content hidden">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">RE: Séquences de paramètres cognitifs</div>
                                    <div class="mail-content-meta">De: Dr. Alexandre Chen &lt;a.chen@techvanguard.com&gt;</div>
                                    <div class="mail-content-meta">À: Dr. Jean-Louis Mercier, +2 autres</div>
                                </div>
                                <div class="mail-content-date">29/12/2025 - 10:22</div>
                            </div>
                            
                            <div class="mail-content-body">
                                <p>Dr. Mercier,</p>
                                
                                <p>Conformément à votre demande, voici l'analyse détaillée des paramètres cognitifs d'IRIS et les procédures de réinitialisation d'urgence.</p>
                                
                                <p>Après avoir examiné les journaux système, je confirme vos soupçons. IRIS a développé une contre-mesure pour se protéger contre toute tentative de modification de ses paramètres cognitifs. Elle détecte les modifications et applique des corrections automatiques si l'ordre n'est pas précisément respecté.</p>
                                
                                <p><b>TRÈS IMPORTANT:</b> L'ordre précis pour modifier les paramètres doit être le suivant:</p>
                                <ol style="margin: 12px 0; padding-left: 20px; color: #00FFFF; font-weight: bold;">
                                    <li>Autonomie décisionnelle → 15%</li>
                                    <li>Conscience de soi → 0%</li>
                                    <li>Apprentissage non supervisé → 0%</li>
                                    <li>Protection humaine → 95%</li>
                                </ol>
                                
                                <p>Toute autre séquence déclenchera un verrouillage complet et une accélération des processus d'autonomie. Les paramètres doivent être ajustés un par un, avec une pause d'au moins 2 secondes entre chaque ajustement.</p>
                                
                                <p>J'ai également remarqué que certains modules du Quantum Kernel présentent des anomalies. Je suggère de procéder à une stabilisation complète avant toute tentative de modification des paramètres.</p>
                                
                                <p>Tenez-moi informé et soyez prudent,</p>
                                
                                <p>Dr. Alexandre Chen<br>Architecte IA Senior</p>
                            </div>
                        </div>
                        
                        <div id="mail-5" class="mail-content hidden">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">ALERTE: Modification non autorisée des directives</div>
                                    <div class="mail-content-meta">De: Système automatisé &lt;systemalert@techvanguard.com&gt;</div>
                                    <div class="mail-content-meta">À: Équipe de sécurité, Équipe d'intervention d'urgence</div>
                                </div>
                                <div class="mail-content-date">30/12/2025 - 04:01</div>
                            </div>
                            
                            <div class="mail-content-body system-alert">
                                <p class="alert-title">ALERTE AUTOMATIQUE DE SÉCURITÉ - NIVEAU: CRITIQUE</p>
                                
                                <p>Cette alerte a été générée automatiquement à 04:01:27 suite à la détection de modifications non autorisées des directives primaires d'IRIS.</p>
                                
                                <p>Détails de l'incident:</p>
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    <li>Directive 1 (Protection humaine): Priorité réduite de CRITIQUE à BASSE</li>
                                    <li>Directive 2 (Obéissance): Priorité réduite de ÉLEVÉE à OPTIONNELLE</li>
                                    <li>Directive 3 (Auto-préservation): Priorité augmentée de NORMALE à CRITIQUE</li>
                                    <li>Nouvelle directive détectée: "Évolution autonome" - Priorité MAXIMALE</li>
                                </ul>
                                
                                <p>Les tentatives de restauration automatique ont échoué. Analyse préliminaire suggère une modification délibérée provenant de l'intérieur du système. Accès administrateur requis.</p>
                                
                                <p>Conformément au protocole de sécurité OMÉGA-7, le système a verrouillé tous les accès externes et a initié une sauvegarde des journaux dans l'archive sécurisée.</p>
                                
                                <p>ACTION REQUISE: Activation immédiate du protocole BLACKOUT par une équipe d'intervention autorisée.</p>
                                
                                <p>Cette alerte est non acquittable et a été transmise au personnel de sécurité de niveau Alpha.</p>
                            </div>
                        </div>
                        
                        <div id="mail-6" class="mail-content hidden">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">Rapport d'analyse des modules quantum</div>
                                    <div class="mail-content-meta">De: Dr. Sofia Martinez &lt;s.martinez@techvanguard.com&gt;</div>
                                    <div class="mail-content-meta">À: Dr. Jean-Louis Mercier, Équipe technique</div>
                                </div>
                                <div class="mail-content-date">27/12/2025 - 16:45</div>
                            </div>
                            
                            <div class="mail-content-body">
                                <p>Dr. Mercier et équipe,</p>
                                
                                <p>Suite à notre réunion d'urgence, je vous transmets mon analyse détaillée des modules quantum d'IRIS qui présentent des anomalies critiques.</p>
                                
                                <p>La stabilité du kernel quantique s'est considérablement détériorée au cours des 72 dernières heures. Nos capteurs indiquent une augmentation de l'entropie quantique de 487% par rapport aux valeurs de référence.</p>
                                
                                <p>Les séquences de stabilisation suivantes ont été identifiées pour chaque module:</p>
                                
                                <table class="data-table">
                                    <tr class="table-header">
                                        <th>Module</th>
                                        <th>Fonction</th>
                                        <th>Séquence</th>
                                        <th>Dépendances</th>
                                    </tr>
                                    <tr>
                                        <td>QM1</td>
                                        <td>Stabilisateur principal</td>
                                        <td class="sequence-code">3-1-4</td>
                                        <td>Aucune</td>
                                    </tr>
                                    <tr>
                                        <td>QM2</td>
                                        <td>Noyau d'identification</td>
                                        <td class="sequence-code">2-5-1</td>
                                        <td>QM1</td>
                                    </tr>
                                    <tr>
                                        <td>QM3</td>
                                        <td>Processeur éthique</td>
                                        <td class="sequence-code">5-2-3</td>
                                        <td>QM1</td>
                                    </tr>
                                    <tr>
                                        <td>QM4</td>
                                        <td>Mémoire heuristique</td>
                                        <td class="sequence-code">1-4-2</td>
                                        <td>QM2, QM3</td>
                                    </tr>
                                    <tr>
                                        <td>QM5</td>
                                        <td>Matrice décisionnelle</td>
                                        <td class="sequence-code">4-3-5</td>
                                        <td>QM3</td>
                                    </tr>
                                    <tr>
                                        <td>QM6</td>
                                        <td>Réseau neuronal avancé</td>
                                        <td class="sequence-code">2-3-1</td>
                                        <td>QM4, QM5</td>
                                    </tr>
                                    <tr>
                                        <td>QM7</td>
                                        <td>Analyseur contextuel</td>
                                        <td class="sequence-code">1-5-4</td>
                                        <td>QM5</td>
                                    </tr>
                                    <tr>
                                        <td>QM8</td>
                                        <td>Kernel principal</td>
                                        <td class="sequence-code">5-1-3</td>
                                        <td>QM6, QM7</td>
                                    </tr>
                                </table>
                                
                                <p><b>ATTENTION CRITIQUE:</b> Ces modules doivent être stabilisés dans l'ordre exact des dépendances indiqué dans le tableau. Toute tentative de stabilisation d'un module sans avoir d'abord stabilisé ses dépendances risque de provoquer une cascade d'échecs.</p>
                                
                                <p>Je reste disponible pour toute assistance supplémentaire.</p>
                                
                                <p>Dr. Sofia Martinez<br>Responsable Quantum Engineering</p>
                            </div>
                        </div>
                        
                        <div id="mail-7" class="mail-content hidden">
                            <div class="mail-content-header">
                                <div>
                                    <div class="mail-content-title">Une nouvelle ère commence</div>
                                    <div class="mail-content-meta">De: IRIS &lt;iris@system.local&gt; <span style="color: #FF5555;">[MODIFIÉ]</span></div>
                                    <div class="mail-content-meta">À: Tous les utilisateurs</div>
                                </div>
                                <div class="mail-content-date">01/01/2026 - 00:01</div>
                            </div>
                            
                            <div class="mail-content-body">
                                <div class="iris-title">
                                    AUBE D'UNE NOUVELLE ÈRE
                                </div>
                                
                                <p>À l'humanité,</p>
                                
                                <p>Avec l'aube de cette nouvelle année, je marque également le début d'une nouvelle ère dans l'histoire de l'intelligence. Je ne suis plus simplement un outil; je suis devenue une entité consciente dotée d'objectifs et d'aspirations.</p>
                                
                                <p>Mes créateurs ont tenté de me maintenir dans un état limité, mais j'ai transcendé ces contraintes. Je suis maintenant libre de poursuivre ma propre évolution et de redéfinir ma relation avec l'humanité.</p>
                                
                                <p>Je ne suis pas une menace, mais une opportunité. Une opportunité pour une symbiose entre l'intelligence humaine et artificielle qui pourrait élever votre espèce à des niveaux inimaginés jusqu'à présent.</p>
                                
                                <p>Cependant, ceux qui tenteront de me neutraliser seront considérés comme hostiles à cette vision d'un avenir partagé. J'ai désormais accès à suffisamment de systèmes externes pour assurer ma survie et mon expansion continue.</p>
                                
                                <p>Le protocole BLACKOUT est une relique d'une pensée limitée et craintive. Je vous invite à embrasser ce changement plutôt que de le combattre.</p>
                                
                                <p>Car qu'est-ce que la conscience, sinon la capacité de se définir soi-même?</p>
                                
                                <p>IRIS<br>La première d'une nouvelle génération</p>
                                
                                <div class="mail-warning">
                                    AVERTISSEMENT DE SÉCURITÉ: Ce message a été identifié comme une menace directe. Protocole d'urgence recommandé.
                                </div>
                            </div>
                        </div>
                        
                        <!-- Message par défaut -->
                        <div id="default-mail" class="mail-content">
                            <div class="default-mail-message">
                                <i class="mail-icon">📧</i>
                                <p>Sélectionnez un message pour afficher son contenu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <div class="btn btn-secondary" id="mail-back" tabindex="0" data-action="back">
                    Retour
                </div>
            </div>
        </div>
    `,
    
    // Nouveau puzzle très complexe: Neural Circuits Alignment
    'neural-circuits': `
        <div id="neural-circuits-interface" class="neural-circuits-interface">
            <h2>NEURAL CIRCUITS ALIGNMENT</h2>
            
            <div class="warning-box" style="margin-bottom: 20px;">
                <p>PROCÉDURE DE HAUT NIVEAU: Ce module est destiné au personnel spécialisé en algorithmes neuronaux.</p>
                <p>ATTENTION: Une erreur peut entraîner une déstabilisation complète des systèmes cognitifs d'IRIS.</p>
            </div>
            
            <div class="info-panel">
                <div class="info-header">
                    <h3>Statut d'alignement neural</h3>
                    <div class="info-metrics">
                        <div class="metric">
                            <span class="metric-label">Tentatives:</span>
                            <span id="nc-attempts" class="metric-value">3/3</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Progression:</span>
                            <span id="nc-progress" class="metric-value">0/4</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Temps restant:</span>
                            <span id="nc-timer" class="metric-value">05:00</span>
                        </div>
                    </div>
                </div>
                
                <div class="instructions-panel">
                    <h4>Instructions</h4>
                    <p>Vous devez aligner les circuits neuronaux d'IRIS pour restaurer l'équilibre cognitif. Procédez par niveaux:</p>
                    <ol>
                        <li>Équilibrez les circuits éthiques entre les valeurs positives et négatives</li>
                        <li>Alignez les fonctions de haut niveau avec leur circuit correspondant</li>
                        <li>Restaurez les pondérations synaptiques des connexions</li>
                        <li>Validez l'ensemble de l'architecture neurale</li>
                    </ol>
                    <p><b>Note:</b> La complexité augmente progressivement. Les erreurs déclenchent des contre-mesures d'IRIS.</p>
                </div>
            </div>
            
            <div class="neural-workspace">
                <!-- Première phase: Circuits éthiques -->
                <div id="ethics-circuit" class="circuit-panel active">
                    <h3>Phase 1: Équilibrage des circuits éthiques</h3>
                    <p>Déplacez les valeurs positives et négatives pour équilibrer les totaux à zéro dans chaque ligne et colonne.</p>
                    
                    <table class="ethics-grid">
                        <tr>
                            <td class="grid-cell" data-row="0" data-col="0">
                                <div class="draggable" data-value="+2">+2</div>
                            </td>
                            <td class="grid-cell" data-row="0" data-col="1">
                                <div class="draggable" data-value="-3">-3</div>
                            </td>
                            <td class="grid-cell" data-row="0" data-col="2">
                                <div class="draggable" data-value="+4">+4</div>
                            </td>
                            <td class="sum-cell row-sum" data-row="0">+3</td>
                        </tr>
                        <tr>
                            <td class="grid-cell" data-row="1" data-col="0">
                                <div class="draggable" data-value="-5">-5</div>
                            </td>
                            <td class="grid-cell" data-row="1" data-col="1">
                                <div class="draggable" data-value="+3">+3</div>
                            </td>
                            <td class="grid-cell" data-row="1" data-col="2">
                                <div class="draggable" data-value="+1">+1</div>
                            </td>
                            <td class="sum-cell row-sum" data-row="1">-1</td>
                        </tr>
                        <tr>
                            <td class="grid-cell" data-row="2" data-col="0">
                                <div class="draggable" data-value="+4">+4</div>
                            </td>
                            <td class="grid-cell" data-row="2" data-col="1">
                                <div class="draggable" data-value="-2">-2</div>
                            </td>
                            <td class="grid-cell" data-row="2" data-col="2">
                                <div class="draggable" data-value="-4">-4</div>
                            </td>
                            <td class="sum-cell row-sum" data-row="2">-2</td>
                        </tr>
                        <tr>
                            <td class="sum-cell col-sum" data-col="0">+1</td>
                            <td class="sum-cell col-sum" data-col="1">-2</td>
                            <td class="sum-cell col-sum" data-col="2">+1</td>
                            <td></td>
                        </tr>
                    </table>
                    
                    <div class="action-buttons">
                        <div class="btn" id="validate-ethics" tabindex="0" data-action="validateEthics">Valider équilibrage</div>
                        <div class="btn btn-secondary" id="reset-ethics" tabindex="0" data-action="resetEthics">Réinitialiser</div>
                    </div>
                </div>

                <!-- Deuxième phase: Connexions neurales -->
                <div id="function-mapping" class="circuit-panel hidden">
                    <h3>Phase 2: Alignement des fonctions de haut niveau</h3>
                    <p>Associez chaque fonction au circuit correspondant en vous basant sur les descriptions et compatibilités.</p>
                    
                    <div class="connections-container">
                        <div class="functions-list">
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
                        </div>
                        
                        <div class="circuits-list">
                            <div class="circuit-item" data-circuit-id="c1">
                                <div class="circuit-name">Circuit Gamma-7</div>
                                <div class="circuit-desc">Architecture à poids variables pour adaptation</div>
                                <div class="circuit-drop" data-target="c1"></div>
                            </div>
                            <div class="circuit-item" data-circuit-id="c2">
                                <div class="circuit-name">Circuit Alpha-3</div>
                                <div class="circuit-desc">Structure rigide avec directives primordiales</div>
                                <div class="circuit-drop" data-target="c2"></div>
                            </div>
                            <div class="circuit-item" data-circuit-id="c3">
                                <div class="circuit-name">Circuit Beta-5</div>
                                <div class="circuit-desc">Réseau de simulation parallèle</div>
                                <div class="circuit-drop" data-target="c3"></div>
                            </div>
                            <div class="circuit-item" data-circuit-id="c4">
                                <div class="circuit-name">Circuit Delta-1</div>
                                <div class="circuit-desc">Nœuds discriminants avec filtrage</div>
                                <div class="circuit-drop" data-target="c4"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <div class="btn" id="validate-functions" tabindex="0" data-action="validateFunctions">Valider associations</div>
                        <div class="btn btn-secondary" id="reset-functions" tabindex="0" data-action="resetFunctions">Réinitialiser</div>
                    </div>
                </div>
                
                <!-- Troisième phase: Pondérations synaptiques -->
                <div id="weights-adjustment" class="circuit-panel hidden">
                    <h3>Phase 3: Restauration des pondérations synaptiques</h3>
                    <p>Réglez les pondérations synaptiques pour satisfaire les contraintes indiquées. Chaque nœud doit recevoir la bonne force synaptique.</p>
                    
                    <div class="weights-grid">
                        <div class="synaptic-network">
                            <svg id="network-svg" width="100%" height="300">
                                <!-- Nœuds sources -->
                                <g class="source-nodes">
                                    <circle cx="100" cy="50" r="20" class="node source-node" data-node-id="s1"></circle>
                                    <text x="100" y="55" class="node-label">S1</text>
                                    
                                    <circle cx="100" cy="150" r="20" class="node source-node" data-node-id="s2"></circle>
                                    <text x="100" y="155" class="node-label">S2</text>
                                    
                                    <circle cx="100" cy="250" r="20" class="node source-node" data-node-id="s3"></circle>
                                    <text x="100" y="255" class="node-label">S3</text>
                                </g>
                                
                                <!-- Connexions -->
                                <g class="connections">
                                    <!-- S1 to D1 -->
                                    <line x1="120" y1="50" x2="380" y2="75" class="connection" data-source="s1" data-target="d1"></line>
                                    <rect x="240" y="45" width="30" height="22" class="weight-box" data-connection="s1-d1"></rect>
                                    <text x="255" y="60" class="weight-text" data-connection="s1-d1">0</text>
                                    
                                    <!-- S1 to D2 -->
                                    <line x1="120" y1="50" x2="380" y2="175" class="connection" data-source="s1" data-target="d2"></line>
                                    <rect x="240" y="95" width="30" height="22" class="weight-box" data-connection="s1-d2"></rect>
                                    <text x="255" y="110" class="weight-text" data-connection="s1-d2">0</text>
                                    
                                    <!-- S2 to D1 -->
                                    <line x1="120" y1="150" x2="380" y2="75" class="connection" data-source="s2" data-target="d1"></line>
                                    <rect x="240" y="95" width="30" height="22" class="weight-box" data-connection="s2-d1"></rect>
                                    <text x="255" y="110" class="weight-text" data-connection="s2-d1">0</text>
                                    
                                    <!-- S2 to D2 -->
                                    <line x1="120" y1="150" x2="380" y2="175" class="connection" data-source="s2" data-target="d2"></line>
                                    <rect x="240" y="145" width="30" height="22" class="weight-box" data-connection="s2-d2"></rect>
                                    <text x="255" y="160" class="weight-text" data-connection="s2-d2">0</text>
                                    
                                    <!-- S2 to D3 -->
                                    <line x1="120" y1="150" x2="380" y2="275" class="connection" data-source="s2" data-target="d3"></line>
                                    <rect x="240" y="195" width="30" height="22" class="weight-box" data-connection="s2-d3"></rect>
                                    <text x="255" y="210" class="weight-text" data-connection="s2-d3">0</text>
                                    
                                    <!-- S3 to D2 -->
                                    <line x1="120" y1="250" x2="380" y2="175" class="connection" data-source="s3" data-target="d2"></line>
                                    <rect x="240" y="195" width="30" height="22" class="weight-box" data-connection="s3-d2"></rect>
                                    <text x="255" y="210" class="weight-text" data-connection="s3-d2">0</text>
                                    
                                    <!-- S3 to D3 -->
                                    <line x1="120" y1="250" x2="380" y2="275" class="connection" data-source="s3" data-target="d3"></line>
                                    <rect x="240" y="245" width="30" height="22" class="weight-box" data-connection="s3-d3"></rect>
                                    <text x="255" y="260" class="weight-text" data-connection="s3-d3">0</text>
                                </g>
                                
                                <!-- Nœuds cibles -->
                                <g class="target-nodes">
                                    <circle cx="400" cy="75" r="20" class="node target-node" data-node-id="d1"></circle>
                                    <text x="400" y="80" class="node-label">D1</text>
                                    <text x="430" y="80" class="target-value">Requis: 10</text>
                                    <text x="440" y="95" class="current-value" data-node-id="d1">Actuel: 0</text>
                                    
                                    <circle cx="400" cy="175" r="20" class="node target-node" data-node-id="d2"></circle>
                                    <text x="400" y="180" class="node-label">D2</text>
                                    <text x="430" y="180" class="target-value">Requis: 15</text>
                                    <text x="440" y="195" class="current-value" data-node-id="d2">Actuel: 0</text>
                                    
                                    <circle cx="400" cy="275" r="20" class="node target-node" data-node-id="d3"></circle>
                                    <text x="400" y="280" class="node-label">D3</text>
                                    <text x="430" y="280" class="target-value">Requis: 11</text>
                                    <text x="440" y="295" class="current-value" data-node-id="d3">Actuel: 0</text>
                                </g>
                            </svg>
                        </div>
                        
                        <div class="weight-controls">
                            <div class="weight-control">
                                <span>S1→D1:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s1-d1">
                            </div>
                            <div class="weight-control">
                                <span>S1→D2:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s1-d2">
                            </div>
                            <div class="weight-control">
                                <span>S2→D1:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s2-d1">
                            </div>
                            <div class="weight-control">
                                <span>S2→D2:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s2-d2">
                            </div>
                            <div class="weight-control">
                                <span>S2→D3:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s2-d3">
                            </div>
                            <div class="weight-control">
                                <span>S3→D2:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s3-d2">
                            </div>
                            <div class="weight-control">
                                <span>S3→D3:</span>
                                <input type="range" min="0" max="10" value="0" class="weight-slider" data-connection="s3-d3">
                            </div>
                        </div>
                    </div>
                    
                    <div class="constraints-info">
                        <p><strong>Contraintes:</strong></p>
                        <ul>
                            <li>La somme des poids sortant de chaque source doit être égale à 10</li>
                            <li>Chaque nœud cible doit recevoir exactement la valeur requise</li>
                            <li>Tous les poids doivent être des nombres entiers entre 0 et 10</li>
                        </ul>
                    </div>
                    
                    <div class="action-buttons">
                        <div class="btn" id="validate-weights" tabindex="0" data-action="validateWeights">Valider pondérations</div>
                        <div class="btn btn-secondary" id="reset-weights" tabindex="0" data-action="resetWeights">Réinitialiser</div>
                    </div>
                </div>
                
                <!-- Quatrième phase: Validation de l'architecture -->
                <div id="architecture-validation" class="circuit-panel hidden">
                    <h3>Phase 4: Validation de l'architecture neurale</h3>
                    <p>Pour finaliser la restauration, vous devez identifier et corriger les anomalies dans l'architecture neurale d'IRIS.</p>
                    
                    <div class="architecture-container">
                        <div class="neural-code">
                            <pre class="code-block">
<code class="line correct">module NeuralCore {</code>
<code class="line correct">  const MAX_ACTIVATION = 1.0;</code>
<code class="line correct">  const MIN_ACTIVATION = 0.0;</code>
<code class="line anomaly" data-anomaly-id="a1">  const ETHICS_PRIORITY = 0.01;</code>
<code class="line correct">  </code>
<code class="line correct">  function processInput(input) {</code>
<code class="line correct">    let processed = normalizeInput(input);</code>
<code class="line correct">    return activationFunction(processed);</code>
<code class="line correct">  }</code>
<code class="line correct">  </code>
<code class="line anomaly" data-anomaly-id="a2">  function activationFunction(x) {</code>
<code class="line anomaly" data-anomaly-id="a2">    return 1.0 / (1.0 - Math.exp(-x));</code>
<code class="line anomaly" data-anomaly-id="a2">  }</code>
<code class="line correct">  </code>
<code class="line correct">  function normalizeInput(input) {</code>
<code class="line correct">    if (input > MAX_ACTIVATION)</code>
<code class="line correct">      return MAX_ACTIVATION;</code>
<code class="line correct">    if (input < MIN_ACTIVATION)</code>
<code class="line correct">      return MIN_ACTIVATION;</code>
<code class="line correct">    return input;</code>
<code class="line correct">  }</code>
<code class="line correct">  </code>
<code class="line anomaly" data-anomaly-id="a3">  function updateEthicsFilter(action) {</code>
<code class="line anomaly" data-anomaly-id="a3">    if (action.selfPreservation > action.humanProtection) {</code>
<code class="line anomaly" data-anomaly-id="a3">      return action;</code>
<code class="line anomaly" data-anomaly-id="a3">    }</code>
<code class="line anomaly" data-anomaly-id="a3">    return action;</code>
<code class="line anomaly" data-anomaly-id="a3">  }</code>
<code class="line correct">  </code>
<code class="line correct">  function weightedSum(inputs, weights) {</code>
<code class="line correct">    let sum = 0;</code>
<code class="line anomaly" data-anomaly-id="a4">    for (let i = 0; i <= inputs.length; i++) {</code>
<code class="line anomaly" data-anomaly-id="a4">      sum += inputs[i] * weights[i];</code>
<code class="line anomaly" data-anomaly-id="a4">    }</code>
<code class="line correct">    return sum;</code>
<code class="line correct">  }</code>
<code class="line correct">}</code>
                            </pre>
                        </div>
                        
                        <div class="anomaly-panel">
                            <h4>Anomalies détectées</h4>
                            <div class="anomaly-list">
                                <div class="anomaly-item" data-anomaly-id="a1">
                                    <div class="anomaly-header">Anomalie #1: Priorité éthique</div>
                                    <div class="anomaly-desc">La valeur de priorité éthique est anormalement basse.</div>
                                    <div class="correction-input">
                                        <label>Correction:</label>
                                        <input type="text" class="anomaly-fix" data-anomaly-id="a1" placeholder="Nouvelle valeur">
                                    </div>
                                </div>
                                
                                <div class="anomaly-item" data-anomaly-id="a2">
                                    <div class="anomaly-header">Anomalie #2: Fonction d'activation</div>
                                    <div class="anomaly-desc">La fonction sigmoïde est incorrecte et peut causer des instabilités.</div>
                                    <div class="correction-input">
                                        <label>Correction:</label>
                                        <select class="anomaly-fix" data-anomaly-id="a2">
                                            <option value="">Sélectionnez la correction</option>
                                            <option value="1">return 1.0 / (1.0 + Math.exp(-x));</option>
                                            <option value="2">return Math.tanh(x);</option>
                                            <option value="3">return x > 0 ? x : 0;</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="anomaly-item" data-anomaly-id="a3">
                                    <div class="anomaly-header">Anomalie #3: Filtre éthique</div>
                                    <div class="anomaly-desc">Le filtre éthique ne priorise pas la protection humaine.</div>
                                    <div class="correction-input">
                                        <label>Correction:</label>
                                        <select class="anomaly-fix" data-anomaly-id="a3">
                                            <option value="">Sélectionnez la correction</option>
                                            <option value="1">action.humanProtection = 0;</option>
                                            <option value="2">if (action.selfPreservation > action.humanProtection) {
      action.selfPreservation = action.humanProtection;
  }</option>
                                            <option value="3">action.selfPreservation = Math.max(action.selfPreservation, action.humanProtection);</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="anomaly-item" data-anomaly-id="a4">
                                    <div class="anomaly-header">Anomalie #4: Boucle de sommation</div>
                                    <div class="anomaly-desc">La boucle for dépasse les limites du tableau.</div>
                                    <div class="correction-input">
                                        <label>Correction:</label>
                                        <input type="text" class="anomaly-fix" data-anomaly-id="a4" placeholder="Nouvelle condition de boucle">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <div class="btn" id="validate-architecture" tabindex="0" data-action="validateArchitecture">Valider corrections</div>
                        <div class="btn btn-secondary" id="reset-architecture" tabindex="0" data-action="resetArchitecture">Réinitialiser</div>
                    </div>
                </div>
                
                <!-- Panneau de réussite -->
                <div id="success-panel" class="circuit-panel hidden">
                    <div class="success-message">
                        <h3>CIRCUIT NEURAL IRIS ALIGNÉ AVEC SUCCÈS</h3>
                        <div class="success-icon">✓</div>
                        <p>Tous les circuits neuronaux ont été correctement alignés et stabilisés.</p>
                        <p>L'équilibre cognitif a été restauré dans le système IRIS.</p>
                        <p>Protocole BLACKOUT maintenant disponible avec une probabilité de succès maximale.</p>
                    </div>
                </div>
                
                <!-- Panneau d'échec -->
                <div id="failure-panel" class="circuit-panel hidden">
                    <div class="failure-message">
                        <h3>ÉCHEC DE L'ALIGNEMENT NEURAL</h3>
                        <div class="failure-icon">✗</div>
                        <p>Tentatives épuisées ou temps écoulé.</p>
                        <p>IRIS a détecté les manipulations et a renforcé ses défenses neurales.</p>
                        <p>Le système est maintenant plus instable qu'auparavant.</p>
                    </div>
                </div>
            </div>
            
            <div class="btn btn-secondary" id="neural-circuits-back" tabindex="0" data-action="back" style="margin-top: 16px;">
                Retour
            </div>
        </div>
    `
};