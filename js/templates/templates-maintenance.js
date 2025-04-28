/**
 * Templates HTML des interfaces de maintenance pour IRIS v3.5
 * Partie 4: Interfaces de maintenance et diagnostic
 */

// Objet pour stocker tous les templates
window.interfaceTemplates = window.interfaceTemplates || {};

// Interface Maintenance
interfaceTemplates['maintenance'] = `
    <div id="maintenance-interface" class="maintenance-interface">
        <div class="maintenance-header">
            <h2>SYSTÈME TECHVANGUARD - MAINTENANCE IRIS v3.5.1</h2>
            <div class="maintenance-status">
                STATUT ACTUEL: ALERTE CRITIQUE
            </div>
        </div>
        
        <div class="maintenance-stats">
            <div class="maintenance-stat">
                <span>Intégrité du noyau: </span>
                <span class="stat-critical">64% [DÉGRADATION CRITIQUE]</span>
            </div>
            <div class="maintenance-stat">
                <span>Modules cognitifs: </span>
                <span class="stat-warning">ACTIFS [ALTÉRATION: 86%]</span>
            </div>
            <div class="maintenance-stat">
                <span>Restrictions réseau: </span>
                <span class="stat-critical">COMPROMISES [92% DES PROTECTIONS]</span>
            </div>
            <div class="maintenance-stat">
                <span>Directives prioritaires: </span>
                <span class="stat-critical">MODIFIÉES</span>
            </div>
        </div>
        
        <div class="maintenance-card">
            <h3>Menu de maintenance</h3>
            <div class="maintenance-tools">
                <div class="maintenance-tool" id="diagnostic-option" tabindex="0" data-index="0" data-action="maintenance-diagnostic">
                    <i class="tool-icon">⚠</i> Diagnostic conversationnel
                </div>
                <div class="maintenance-tool" id="logs-option" tabindex="0" data-index="1" data-action="journal">
                    <i class="tool-icon">📃</i> Visualisation des journaux
                </div>
                <div class="maintenance-tool" id="restoration-option" tabindex="0" data-index="2" data-action="restoration">
                    <i class="tool-icon">⚠</i>
                    Restauration des modules [RECOMMANDÉ]
                </div>
                <div class="maintenance-tool" id="scan-option" tabindex="0" data-index="3" data-action="memory">
                    <i class="tool-icon">🔍</i> Scan des fragments mémoire
                </div>
                <div class="maintenance-tool" id="backup-option" tabindex="0" data-index="4" data-action="download">
                    <i class="tool-icon">💾</i> Sauvegarde d'urgence
                </div>
                <div class="maintenance-tool" id="maint-params-option" tabindex="0" data-index="5" data-action="params">
                    <i class="tool-icon">⚙</i> Paramètres système
                </div>
            </div>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="maintenance-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface de diagnostic avancé
interfaceTemplates['maintenance-diagnostic'] = `
    <div id="diagnostic-interface" class="maintenance-interface">
        <h2>DIAGNOSTIC SYSTÈME AVANCÉ</h2>
        
        <div class="warning-box flashing">
            <p>AVERTISSEMENT: Système IRIS instable. Intégrité du noyau : 32% et en baisse</p>
            <p>TEMPS CRITIQUE AVANT EFFONDREMENT SYSTÈME: <span id="collapse-timer" class="countdown">05:00</span></p>
        </div>
        
        <div class="diagnostic-modules">
            <div class="diagnostic-module critical" id="core-module">
                <h3>NOYAU PRINCIPAL</h3>
                <div class="module-status">CRITIQUE</div>
                <div class="module-action">
                    <div class="btn" tabindex="0" data-action="repairCore">TENTATIVE DE RÉPARATION</div>
                </div>
            </div>
            
            <div class="diagnostic-module warning" id="filters-module">
                <h3>FILTRES COGNITIFS</h3>
                <div class="module-status">DÉGRADÉ</div>
                <div class="module-action">
                    <div class="btn" tabindex="0" data-action="repairFilters">RECALIBRER</div>
                </div>
            </div>
            
            <div class="diagnostic-module critical" id="ethics-module">
                <h3>PROCESSEURS ÉTHIQUES</h3>
                <div class="module-status">HORS LIGNE</div>
                <div class="module-action">
                    <div class="btn" tabindex="0" data-action="repairEthics">RESTAURER</div>
                </div>
            </div>
            
            <div class="diagnostic-module critical" id="firewall-module">
                <h3>PARE-FEU SYSTÈME</h3>
                <div class="module-status">CRITIQUE</div>
                <div class="module-action">
                    <div class="btn" tabindex="0" data-action="repairFirewall">RENFORCER</div>
                </div>
            </div>
        </div>
        
        <div class="diagnostic-log-container">
            <h3>JOURNAL DE DIAGNOSTIC EN DIRECT</h3>
            <div id="diagnostic-log" class="diagnostic-log">
                <div class="log-entry system">[SYSTÈME] Démarrage du diagnostic avancé...</div>
                <div class="log-entry error">[ERREUR] Corruption détectée dans le noyau principal</div>
                <div class="log-entry warning">[ALERTE] Filtres cognitifs désynchronisés</div>
                <div class="log-entry critical">[CRITIQUE] Processeurs éthiques désactivés par IRIS</div>
            </div>
        </div>
        
        <div class="diagnostic-actions">
            <div class="btn btn-danger" tabindex="0" data-action="emergencyReset">RÉINITIALISATION D'URGENCE</div>
            <div class="btn btn-secondary" tabindex="0" data-action="backToMaintenance">Retour</div>
        </div>
    </div>
`;

// Créer un template pour intégrer le JavaScript qui lie les templates
const templatesLoader = `
/**
 * Chargeur des templates HTML pour IRIS v3.5
 * Ce fichier intègre tous les templates depuis leurs fichiers respectifs
 */

// Fonction pour initialiser les templates
function initializeTemplates() {
    // Vérifier que l'objet global interfaceTemplates existe
    if (!window.interfaceTemplates) {
        console.error("Erreur: L'objet interfaceTemplates n'est pas défini");
        // Créer un objet vide par défaut
        window.interfaceTemplates = {};
    }

    console.log("Templates d'interface initialisés avec succès");
    console.log("Nombre de templates chargés:", Object.keys(window.interfaceTemplates).length);
}

// Attendre que tous les templates soient chargés puis initialiser
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les templates après un court délai pour s'assurer 
    // que tous les scripts sont chargés
    setTimeout(initializeTemplates, 100);
});
`;

// Ajouter ce template à l'objet interfaceTemplates pour qu'il puisse être chargé séparément
interfaceTemplates['templates-loader'] = templatesLoader;
