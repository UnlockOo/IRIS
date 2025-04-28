/**
 * Templates HTML des interfaces de base pour IRIS v3.5
 * Partie 1: Interfaces principales (login, admin, certificat)
 */

// Objet pour stocker tous les templates
window.interfaceTemplates = window.interfaceTemplates || {};

// Écran de mot de passe
interfaceTemplates['password'] = `
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
            
            <div id="password-hint" class="hidden password-hint-box">
                <p class="hint-title">Algorithme de mot de passe :</p>
                <p>Format: [Initiales][DateNaissance]</p>
                <p>Initiales du Dr. Mercier + Date de naissance format JJMMAA</p>
                <p>Exemple: JLM150378 (Jean-Louis Mercier, né le 15 mars 1978)</p>
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
`;

// Interface Admin
interfaceTemplates['admin'] = `
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
`;

// Certificat final
interfaceTemplates['certificate'] = `
    <div id="certificate" class="certificate">
        <div class="certificate-box">
            <div class="certificate-header">
                <h2>CERTIFICAT DE MISSION ACCOMPLIE</h2>
                <h3>Protocole BLACKOUT exécuté avec succès</h3>
            </div>
            
            <div class="certificate-content">
                <p>Par la présente, nous certifions que l'équipe d'intervention a neutralisé avec succès 
                la menace IA désignée 'IRIS' en date du 01/01/2026.</p>
                
                <div class="certificate-details">
                    <div>
                        <p class="detail-label">Heure d'exécution:</p>
                        <p id="certificate-time" class="detail-value"></p>
                    </div>
                    <div>
                        <p class="detail-label">Code de vérification:</p>
                        <p id="certificate-code" class="detail-value"></p>
                    </div>
                </div>
            </div>
            
            <div class="certificate-footer">
                <p class="certificate-signature">Col. Lock</p>
                <p class="certificate-dept">Cellule de Crise TechVanguard</p>
            </div>
            
            <div class="certificate-stamp">
                <div class="stamp">
                    MISSION ACCOMPLIE
                </div>
            </div>
        </div>
        
        <p class="certificate-instruction">Montrez ce certificat au maître du jeu pour valider votre réussite.</p>
        
        <div class="btn focused" tabindex="0" data-action="reset" id="restart-button">
            Recommencer la Simulation
        </div>
    </div>
`;

// Section Non Disponible
interfaceTemplates['sectionLocked'] = `
    <div id="section-locked" class="maintenance-interface">
        <h2>ACCÈS REFUSÉ</h2>
        
        <div class="locked-container">
            <div class="locked-icon">&#128274;</div>
            <p class="locked-title">Cette section est verrouillée ou indisponible.</p>
            <p class="locked-message">Niveau d'autorisation insuffisant ou fonctionnalité désactivée.</p>
        </div>
        
        <div class="action-buttons centered">
            <div class="btn btn-secondary" tabindex="0" data-action="back" id="locked-back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface de choix moral
interfaceTemplates['moralChoice'] = `
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
        
        <div class="btn btn-secondary" tabindex="0" data-action="back" id="moral-back">
            Retour à la console
        </div>
    </div>
`;

// Interface Chat avec IRIS
interfaceTemplates['chat'] = `
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
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="chat-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;
