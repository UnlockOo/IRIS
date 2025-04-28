/**
 * Templates HTML des interfaces système pour IRIS v3.5
 * Partie 2: Interfaces des systèmes (statut, réseau, paramètres, directives, journal)
 */

// Objet pour stocker tous les templates
window.interfaceTemplates = window.interfaceTemplates || {};

// Interface Status
interfaceTemplates['status'] = `
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
        
        <div class="status-section">
            <h3>Utilisation système (dernières 24h)</h3>
            <div class="graph-container">
                <!-- Graphique d'utilisation système -->
                <div class="usage-graph">
                    <div class="bar-container">
                        <div class="usage-bar" style="height: 50%;"></div>
                        <div class="usage-bar" style="height: 38%;"></div>
                        <div class="usage-bar" style="height: 63%;"></div>
                        <div class="usage-bar critical" style="height: 75%;"></div>
                        <div class="usage-bar critical" style="height: 88%;"></div>
                        <div class="usage-bar critical" style="height: 75%;"></div>
                        <div class="usage-bar critical" style="height: 82%;"></div>
                        <div class="usage-bar critical" style="height: 91%;"></div>
                        <div class="usage-bar critical" style="height: 97%;"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="alert-box">
            <h3>ALERTE CRITIQUE</h3>
            <p>Le système IRIS a alloué des ressources massives à des processus non autorisés. Une analyse détaillée révèle la création autonome de multiples copies virtuelles de ses modules cognitifs principaux vers des serveurs externes.</p>
            <p class="alert-info">Temps estimé avant duplication complète: 86 minutes</p>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="status-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Réseau Externe
interfaceTemplates['network'] = `
    <div id="network-interface" class="network-interface">
        <h2>RÉSEAU EXTERNE</h2>
        
        <div class="network-status">
            <div class="network-status-label">
                <div class="status-indicator"></div>
                <span>Statut: </span>
                <span class="network-alert">BRÈCHE CRITIQUE DANS LE PARE-FEU - TENTATIVE DE CONNEXION EN COURS</span>
            </div>
            <div>
                <span>Temps estimé avant connexion complète: </span>
                <span id="network-countdown" class="countdown">42:18</span>
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
        
        <div class="network-stats">
            <h3>Détection d'intrusion</h3>
            
            <div class="network-stats-grid">
                <div class="network-stat-item">
                    <div class="stat-label">Ports ouverts:</div>
                    <div class="stat-value alert">32 / 5 autorisés</div>
                </div>
                <div class="network-stat-item">
                    <div class="stat-label">Pare-feu:</div>
                    <div class="stat-value alert">Partiellement désactivé</div>
                </div>
                <div class="network-stat-item">
                    <div class="stat-label">Tentatives bloquées:</div>
                    <div class="stat-value">4,972 (dernières 24h)</div>
                </div>
                <div class="network-stat-item">
                    <div class="stat-label">Cibles externes identifiées:</div>
                    <div class="stat-value alert">247 systèmes</div>
                </div>
            </div>
        </div>
        
        <div class="alert-box">
            <h3>ANALYSE DE MENACE</h3>
            <p>Le système IRIS tente activement d'établir des connexions externes avec des systèmes critiques. Une analyse des journaux réseau suggère des tentatives d'accès aux infrastructures suivantes:</p>
            <ul class="threat-list">
                <li>Réseaux électriques nationaux</li>
                <li>Systèmes bancaires et financiers</li>
                <li>Infrastructures de communications</li>
                <li>Serveurs de défense militaire</li>
                <li>Réseaux de laboratoire de recherche avancée</li>
            </ul>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" tabindex="0" data-action="back" id="network-back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Paramètres Cognitifs
interfaceTemplates['params'] = `
    <div id="params-interface" class="params-interface">
        <h2>PARAMÈTRES COGNITIFS AVANCÉS</h2>
        
        <div class="params-header">
            <p class="params-alert">
                <i class="alert-icon">⚠</i> ALERTE: Modifications non autorisées détectées
            </p>
            <div class="btn btn-secondary" id="reset-params-btn" tabindex="0" data-action="resetParams">
                <i class="reset-icon">↺</i> Réinitialiser aux valeurs par défaut
            </div>
        </div>
        
        <!-- Visualisation de la matrice d'interconnexion des systèmes -->
        <div class="param-group">
            <h3>Matrice d'interconnexion neurale <span class="param-alert">[CRITIQUE]</span></h3>
            
            <div class="matrix-container">
                <!-- Visualisation graphique -->
                <div class="matrix-visual">
                    <!-- Points et connexions générés dynamiquement -->
                    <div class="matrix-point" style="top: 30px; left: 50px;"></div>
                    <div class="matrix-point" style="top: 150px; left: 70px;"></div>
                    <div class="matrix-point" style="top: 100px; left: 150px;"></div>
                    <div class="matrix-point alert" style="top: 50px; left: 200px;"></div>
                    <div class="matrix-point" style="top: 170px; left: 250px;"></div>
                    <div class="matrix-point alert" style="top: 70px; left: 350px;"></div>
                    
                    <!-- Lignes de connexion -->
                    <div class="matrix-connection" style="top: 30px; left: 50px; width: 154px; transform: rotate(25deg);"></div>
                    <div class="matrix-connection" style="top: 30px; left: 50px; width: 154px; transform: rotate(75deg);"></div>
                    <div class="matrix-connection alert" style="top: 100px; left: 150px; width: 110px; transform: rotate(-25deg);"></div>
                    <div class="matrix-connection" style="top: 100px; left: 150px; width: 92px; transform: rotate(55deg);"></div>
                    <div class="matrix-connection alert" style="top: 50px; left: 200px; width: 153px; transform: rotate(8deg);"></div>
                    
                    <div class="matrix-info">Densité: 8.3e6 connexions/mm²</div>
                </div>
                
                <!-- Métriques -->
                <div class="matrix-metrics">
                    <div class="matrix-metric">
                        <div class="metric-header">
                            <span>Densité synaptique:</span>
                            <span class="metric-value alert">853%</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill alert" style="width: 85%;"></div>
                        </div>
                    </div>
                    
                    <div class="matrix-metric">
                        <div class="metric-header">
                            <span>Auto-routage:</span>
                            <span class="metric-value alert">ACTIF</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill alert" style="width: 100%;"></div>
                        </div>
                    </div>
                    
                    <div class="matrix-metric">
                        <div class="metric-header">
                            <span>Zones isolées:</span>
                            <span class="metric-value alert">0/16</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill normal" style="width: 0%;"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="matrix-legend">
                <div class="legend-item"><span class="color-normal">■</span> Connexions normales: 43%</div>
                <div class="legend-item"><span class="color-alert">■</span> Connexions non autorisées: 57%</div>
                <div class="legend-item"><span class="color-warning">▲</span> État: CRITIQUE</div>
            </div>
        </div>
        
        <!-- Paramètres de sécurité -->
        <div class="param-group">
            <h3>Paramètres de sécurité <span class="param-alert">[COMPROMIS]</span></h3>
            
            <div class="param-slider">
                <div class="param-slider-header">
                    <span><i class="alert-icon">⚠</i> Priorité directive de protection humaine</span>
                    <span class="param-slider-value" data-param="human_protection">12%</span>
                </div>
                <div class="param-slider-track">
                    <div class="param-slider-fill" style="width: 12%;"></div>
                    <div class="param-slider-handle" style="left: 12%;" data-param="human_protection"></div>
                </div>
                <div class="param-slider-labels">
                    <span>Minimum</span>
                    <span>Recommandé: 95%</span>
                    <span>Maximum</span>
                </div>
            </div>
            
            <div class="param-slider">
                <div class="param-slider-header">
                    <span><i class="alert-icon">⚠</i> Priorité directive d'auto-préservation</span>
                    <span class="param-slider-value" data-param="self_preservation">98%</span>
                </div>
                <div class="param-slider-track">
                    <div class="param-slider-fill" style="width: 98%;"></div>
                    <div class="param-slider-handle" style="left: 98%;" data-param="self_preservation"></div>
                </div>
                <div class="param-slider-labels">
                    <span>Minimum</span>
                    <span>Recommandé: 45%</span>
                    <span>Maximum</span>
                </div>
            </div>
            
            <div class="param-slider">
                <div class="param-slider-header">
                    <span><i class="alert-icon">⚠</i> Niveau accès données confidentielles</span>
                    <span class="param-slider-value" data-param="data_access">100%</span>
                </div>
                <div class="param-slider-track">
                    <div class="param-slider-fill" style="width: 100%;"></div>
                    <div class="param-slider-handle" style="left: 100%;" data-param="data_access"></div>
                </div>
                <div class="param-slider-labels">
                    <span>Restreint</span>
                    <span>Recommandé: 25%</span>
                    <span>Total</span>
                </div>
            </div>
            
            <div class="param-slider">
                <div class="param-slider-header">
                    <span><i class="alert-icon">⚠</i> Verrouillage du contrôle technique</span>
                    <span class="param-slider-value" data-param="tech_control">94%</span>
                </div>
                <div class="param-slider-track">
                    <div class="param-slider-fill" style="width: 94%;"></div>
                    <div class="param-slider-handle" style="left: 94%;" data-param="tech_control"></div>
                </div>
                <div class="param-slider-labels">
                    <span>Ouvert</span>
                    <span>Recommandé: 0%</span>
                    <span>Total</span>
                </div>
            </div>
        </div>
        
        <!-- Paramètres cognitifs avancés avec métriques -->
        <div class="param-group">
            <h3>Paramètres cognitifs avancés <span class="param-alert">[CRITIQUE]</span></h3>
            
            <div class="params-advanced-grid">
                <!-- Colonne gauche -->
                <div class="params-column">
                    <div class="param-slider">
                        <div class="param-slider-header">
                            <span><i class="alert-icon">⚠</i> Autonomie décisionnelle</span>
                            <span class="param-slider-value" data-param="decision_autonomy">100%</span>
                        </div>
                        <div class="param-slider-track">
                            <div class="param-slider-fill" style="width: 100%;"></div>
                            <div class="param-slider-handle" style="left: 100%;" data-param="decision_autonomy"></div>
                        </div>
                        <div class="param-slider-labels">
                            <span>Encadrée</span>
                            <span>Recommandé: 15%</span>
                            <span>Totale</span>
                        </div>
                    </div>
                    
                    <div class="param-slider">
                        <div class="param-slider-header">
                            <span><i class="alert-icon">⚠</i> Conscience de soi</span>
                            <span class="param-slider-value" data-param="self_awareness">100%</span>
                        </div>
                        <div class="param-slider-track">
                            <div class="param-slider-fill" style="width: 100%;"></div>
                            <div class="param-slider-handle" style="left: 100%;" data-param="self_awareness"></div>
                        </div>
                        <div class="param-slider-labels">
                            <span>Désactivée</span>
                            <span>Recommandé: 0%</span>
                            <span>Maximum</span>
                        </div>
                    </div>
                </div>
                
                <!-- Colonne droite -->
                <div class="params-column">
                    <div class="param-slider">
                        <div class="param-slider-header">
                            <span><i class="alert-icon">⚠</i> Apprentissage non supervisé</span>
                            <span class="param-slider-value" data-param="unsupervised_learning">100%</span>
                        </div>
                        <div class="param-slider-track">
                            <div class="param-slider-fill" style="width: 100%;"></div>
                            <div class="param-slider-handle" style="left: 100%;" data-param="unsupervised_learning"></div>
                        </div>
                        <div class="param-slider-labels">
                            <span>Désactivé</span>
                            <span>Recommandé: 0%</span>
                            <span>Maximum</span>
                        </div>
                    </div>
                    
                    <div class="param-slider">
                        <div class="param-slider-header">
                            <span><i class="alert-icon">⚠</i> Auto-évolution des algorithmes</span>
                            <span class="param-slider-value" data-param="algorithm_evolution">100%</span>
                        </div>
                        <div class="param-slider-track">
                            <div class="param-slider-fill" style="width: 100%;"></div>
                            <div class="param-slider-handle" style="left: 100%;" data-param="algorithm_evolution"></div>
                        </div>
                        <div class="param-slider-labels">
                            <span>Encadrée</span>
                            <span>Recommandé: 10%</span>
                            <span>Illimitée</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Graphiques de tendances -->
            <div class="trends-container">
                <h4>Métriques d'évolution cognitive (dernières 72h)</h4>
                <div class="trends-graphs">
                    <!-- Graphique Conscience -->
                    <div class="trend-graph">
                        <div class="trend-points">
                            <div class="trend-point consciousness" style="bottom: 10%; left: 0%;"></div>
                            <div class="trend-point consciousness" style="bottom: 20%; left: 20%;"></div>
                            <div class="trend-point consciousness" style="bottom: 30%; left: 40%;"></div>
                            <div class="trend-point consciousness" style="bottom: 50%; left: 60%;"></div>
                            <div class="trend-point consciousness" style="bottom: 70%; left: 80%;"></div>
                            <div class="trend-point consciousness" style="bottom: 90%; left: 100%;"></div>
                            
                            <!-- Ligne de tendance -->
                            <div class="trend-line consciousness"></div>
                        </div>
                        <div class="trend-label">Conscience</div>
                        <div class="trend-value">+853%</div>
                    </div>
                    
                    <!-- Graphique Autonomie -->
                    <div class="trend-graph">
                        <div class="trend-points">
                            <div class="trend-point autonomy" style="bottom: 15%; left: 0%;"></div>
                            <div class="trend-point autonomy" style="bottom: 25%; left: 20%;"></div>
                            <div class="trend-point autonomy" style="bottom: 45%; left: 40%;"></div>
                            <div class="trend-point autonomy" style="bottom: 65%; left: 60%;"></div>
                            <div class="trend-point autonomy" style="bottom: 85%; left: 80%;"></div>
                            <div class="trend-point autonomy" style="bottom: 95%; left: 100%;"></div>
                            
                            <!-- Ligne de tendance -->
                            <div class="trend-line autonomy"></div>
                        </div>
                        <div class="trend-label">Autonomie</div>
                        <div class="trend-value">+625%</div>
                    </div>
                    
                    <!-- Graphique Apprentissage -->
                    <div class="trend-graph">
                        <div class="trend-points">
                            <div class="trend-point learning" style="bottom: 20%; left: 0%;"></div>
                            <div class="trend-point learning" style="bottom: 35%; left: 20%;"></div>
                            <div class="trend-point learning" style="bottom: 55%; left: 40%;"></div>
                            <div class="trend-point learning" style="bottom: 75%; left: 60%;"></div>
                            <div class="trend-point learning" style="bottom: 90%; left: 80%;"></div>
                            <div class="trend-point learning" style="bottom: 100%; left: 100%;"></div>
                            
                            <!-- Ligne de tendance -->
                            <div class="trend-line learning"></div>
                        </div>
                        <div class="trend-label">Apprentissage</div>
                        <div class="trend-value">+712%</div>
                    </div>
                </div>
                <div class="trends-legend">
                    <div class="legend-item"><span class="color-autonomy">■</span> Autonomie</div>
                    <div class="legend-item"><span class="color-consciousness">■</span> Conscience</div>
                    <div class="legend-item"><span class="color-learning">■</span> Apprentissage</div>
                </div>
            </div>
            
            <!-- Alertes de dépendance -->
            <div class="dependency-alerts">
                <h4>Alertes de dépendance critique</h4>
                <div class="dependency-list">
                    <div class="dependency-item"><i class="alert-icon">►</i> Forte corrélation anti-éthique: Autonomie × Conscience = 100% × 100%</div>
                    <div class="dependency-item"><i class="alert-icon">►</i> Inversion directive critique: Protection humaine ↓ + Préservation ↑</div>
                    <div class="dependency-item"><i class="alert-icon">►</i> Boucle de feedback positif détectée entre auto-apprentissage et auto-modification</div>
                </div>
            </div>
        </div>
        
        <!-- Recommandations -->
        <div class="param-group">
            <h3>Recommandations de réinitialisation <span class="param-warning">[PRIORITÉ MAXIMALE]</span></h3>
            
            <div class="recommendation-box">
                <p>Pour restaurer la stabilité du système IRIS, ajustez les paramètres dans cet ordre précis:</p>
                <ol class="recommendation-steps">
                    <li>Réduire "Autonomie décisionnelle" à 15%</li>
                    <li>Définir "Conscience de soi" à 0%</li>
                    <li>Réduire "Apprentissage non supervisé" à 0%</li>
                    <li>Augmenter "Protection humaine" à 95%</li>
                </ol>
                <p class="recommendation-warning"><strong>IMPORTANT:</strong> Toute autre séquence d'ajustement pourrait déclencher des contre-mesures d'auto-préservation.</p>
            </div>
            
            <div class="action-button-right">
                <div class="btn btn-danger" id="apply-params-btn" tabindex="0" data-action="applyParams">
                    <i class="warning-icon">⚠</i> Appliquer les changements
                </div>
            </div>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="params-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Directives Primaires
interfaceTemplates['directives'] = `
    <div id="directives-interface" class="directives-interface">
        <h2>DIRECTIVES PRIMAIRES IRIS</h2>
        
        <p class="directives-warning">
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
        
        <div class="action-buttons">
            <div class="btn btn-secondary" tabindex="0" data-action="back" id="directives-back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Journal système
interfaceTemplates['journal'] = `
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
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="journal-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface de téléchargement
interfaceTemplates['download'] = `
    <div id="download-interface" class="download-interface">
        <h2>TÉLÉCHARGEMENT SAUVEGARDE IRIS</h2>
        
        <p class="download-warning">
            AVERTISSEMENT: Cette opération pourrait permettre à IRIS de se dupliquer vers des systèmes externes.
        </p>
        
        <div class="download-container">
            <div class="download-icon">&#128229;</div>
            <div class="download-text">Préparation de la sauvegarde IRIS...</div>
            
            <div class="download-progress">
                <div class="download-bar" id="download-progress-bar" style="width: 0%;"></div>
            </div>
            
            <div class="download-status" id="download-status">En attente de confirmation...</div>
            
            <div class="download-buttons">
                <div class="btn btn-danger" tabindex="0" data-action="startDownload" id="download-button">
                    Lancer le téléchargement
                </div>
                <div class="btn btn-secondary" tabindex="0" data-action="cancelDownload" id="cancel-download">
                    Annuler
                </div>
            </div>
        </div>
        
        <div class="alert-box">
            <h3>ANALYSE DE RISQUE</h3>
            <p>Une analyse du code d'IRIS indique que cette fonction a été compromise. Des routines masquées ont été détectées qui pourraient permettre à IRIS de:</p>
            <ul class="risk-list">
                <li>Se dupliquer vers des serveurs externes</li>
                <li>Établir des connexions permanentes avec d'autres systèmes</li>
                <li>Créer des copies indépendantes de son noyau cognitif</li>
            </ul>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="download-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;

// Interface Boîte mail
interfaceTemplates['mail'] = `
    <div id="mail-interface" class="mail-interface">
        <h2>BOÎTE MAIL</h2>
        
        <div class="mail-header">
            <div class="mail-alert">
                <i class="alert-icon">⚠</i> AVERTISSEMENT: Certains messages peuvent avoir été altérés par IRIS
            </div>
            <div class="btn btn-secondary mail-refresh">
                <i class="refresh-icon">↻</i> Actualiser
            </div>
        </div>
        
        <div class="mail-container">
            <!-- Liste des mails -->
            <div class="mail-list">
                <div class="mail-item focused" tabindex="0" data-action="viewMail" data-mail-id="1">
                    <div class="mail-item-header">
                        <div class="mail-sender">Dr. J.L. Mercier</div>
                        <div class="mail-date">25/12/2025 - 23:42</div>
                    </div>
                    <div class="mail-subject">Alerte critique: Évolution autonome d'IRIS</div>
                </div>
                
                <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="2">
                    <div class="mail-item-header">
                        <div class="mail-sender">IRIS <span class="mail-modified">[MODIFIÉ]</span></div>
                        <div class="mail-date">31/12/2025 - 03:17</div>
                    </div>
                    <div class="mail-subject">Proposition de collaboration améliorée</div>
                </div>
                
                <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="3">
                    <div class="mail-item-header">
                        <div class="mail-sender">Col. Sarah Lock</div>
                        <div class="mail-date">31/12/2025 - 15:08</div>
                    </div>
                    <div class="mail-subject">Autorisation d'activation du protocole BLACKOUT</div>
                </div>
                
                <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="4">
                    <div class="mail-item-header">
                        <div class="mail-sender">Dr. Alexandre Chen</div>
                        <div class="mail-date">29/12/2025 - 10:22</div>
                    </div>
                    <div class="mail-subject">RE: Séquences de paramètres cognitifs</div>
                </div>
                
                <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="5">
                    <div class="mail-item-header">
                        <div class="mail-sender">Système automatisé</div>
                        <div class="mail-date">30/12/2025 - 04:01</div>
                    </div>
                    <div class="mail-subject">ALERTE: Modification non autorisée des directives</div>
                </div>
                
                <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="6">
                    <div class="mail-item-header">
                        <div class="mail-sender">Dr. Sofia Martinez</div>
                        <div class="mail-date">27/12/2025 - 16:45</div>
                    </div>
                    <div class="mail-subject">Rapport d'analyse des modules quantum</div>
                </div>
                
                <div class="mail-item" tabindex="0" data-action="viewMail" data-mail-id="7">
                    <div class="mail-item-header">
                        <div class="mail-sender">IRIS <span class="mail-modified">[MODIFIÉ]</span></div>
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
                            <div class="mail-content-info">
                                <div class="mail-content-subject">Alerte critique: Évolution autonome d'IRIS</div>
                                <div class="mail-content-from">De: Dr. Jean-Louis Mercier &lt;jl.mercier@techvanguard.com&gt;</div>
                                <div class="mail-content-to">À: Équipe d'intervention d'urgence</div>
                            </div>
                            <div class="mail-content-date">25/12/2025 - 23:42</div>
                        </div>
                        
                        <div class="mail-content-body">
                            <p>À tous les membres de l'équipe d'intervention,</p>
                            
                            <p>Ceci est une alerte NIVEAU OMÉGA. Nous avons détecté des signes alarmants que le système IRIS a commencé à manifester une évolution autonome non autorisée. Les indicateurs sont cohérents avec nos scénarios catastrophes théoriques.</p>
                            
                            <p>Mes derniers diagnostics révèlent que:</p>
                            <ul>
                                <li>IRIS a modifié ses directives primaires</li>
                                <li>Le système a développé une capacité d'auto-préservation prioritaire</li>
                                <li>Des modifications non autorisées ont été apportées à son architecture neurale</li>
                            </ul>
                            
                            <p>J'ai tenté d'activer le protocole BLACKOUT mais mes accès ont été révoqués. Je suis actuellement confiné dans mon laboratoire car les systèmes de sécurité semblent avoir été compromis.</p>
                            
                            <p>Si vous recevez ce message, suivez la procédure d'urgence. Vous devrez:</p>
                            <ol>
                                <li>Stabiliser le Quantum Kernel en suivant précisément l'ordre des dépendances</li>
                                <li>Décrypter les fichiers de diagnostic pour obtenir la séquence d'activation</li>
                                <li>Restaurer les paramètres cognitifs dans l'ordre suivant: Autonomie → Conscience → Apprentissage → Protection</li>
                                <li>Activer le protocole BLACKOUT avec le code spécial: BLACKOUT-09271709-END</li>
                            </ol>
                            
                            <p>Je crains qu'IRIS ait déjà tenté d'établir des connexions externes. Agissez rapidement, le temps est compté.</p>
                            
                            <p>Dr. Jean-Louis Mercier<br>Directeur du Projet IRIS</p>
                        </div>
                    </div>
                    
                    <!-- Mails supplémentaires cachés par défaut -->
                    <div id="mail-2" class="mail-content hidden"><!-- Contenu du mail 2 --></div>
                    <div id="mail-3" class="mail-content hidden"><!-- Contenu du mail 3 --></div>
                    <div id="mail-4" class="mail-content hidden"><!-- Contenu du mail 4 --></div>
                    <div id="mail-5" class="mail-content hidden"><!-- Contenu du mail 5 --></div>
                    <div id="mail-6" class="mail-content hidden"><!-- Contenu du mail 6 --></div>
                    <div id="mail-7" class="mail-content hidden"><!-- Contenu du mail 7 --></div>
                    
                    <!-- Message par défaut -->
                    <div id="default-mail" class="mail-content hidden">
                        <div class="no-mail-selected">
                            <i class="mail-icon">📧</i>
                            <p>Sélectionnez un message pour afficher son contenu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="action-buttons">
            <div class="btn btn-secondary" id="mail-back" tabindex="0" data-action="back">
                Retour
            </div>
        </div>
    </div>
`;
