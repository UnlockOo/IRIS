/**
 * Gestion de l'audio pour l'interface IRIS v3.5 (version optimisée)
 */

// Objet audio global
let audio = {};

// Configuration audio
let audioConfig = {
    musicVolume: 0.2,
    effectsVolume: 0.5,
    customMusicUrl: '',
    irisVoiceFrequency: 'medium', // low, medium, high, off
    currentMusic: 'background.mp3' // Musique actuelle
};

/**
 * Initialise l'audio du jeu
 */
function initializeAudio() {
    try {
        // Références vers les éléments DOM
        audio = {
            background: document.getElementById('background-music'),
            key: document.getElementById('key-sound'),
            error: document.getElementById('error-sound'),
            success: document.getElementById('success-sound'),
            voice: document.getElementById('voice'),
            notification: document.getElementById('notification'),
            ambient: document.getElementById('ambient'),
            irisVoices: [
                document.getElementById('iris-voice-1'),
                document.getElementById('iris-voice-2'),
                document.getElementById('iris-voice-3')
            ]
        };

        // Charger la config sauvegardée
        loadAudioConfig();
        
        // Appliquer les volumes initiaux
        applyAudioSettings();
        
        // Synchroniser l'icône mute
        updateVolumeIcon();
        
        // Configurer les événements
        setupAudioEvents();

    } catch (error) {
        console.error("Erreur d'initialisation audio:", error);
        noSoundFallback();
    }
}

/**
 * Met à jour l'icône de volume en fonction de l'état
 */
function updateVolumeIcon() {
    const volumeIcon = document.getElementById('volume-icon');
    if (volumeIcon && audio.background) {
        volumeIcon.textContent = audio.background.muted ? '🔇' : '🔊';
    }
}

/**
 * Configure les événements pour les contrôles audio
 */
function setupAudioEvents() {
    // Événements sur les boutons
    const elements = {
        muteButton: document.getElementById('mute-button'),
        musicSettings: document.getElementById('music-settings'),
        closePanel: document.getElementById('close-music-panel'),
        applySettings: document.getElementById('apply-music-settings')
    };
    
    if (elements.muteButton) elements.muteButton.addEventListener('click', toggleMute);
    if (elements.musicSettings) elements.musicSettings.addEventListener('click', openMusicPanel);
    if (elements.closePanel) elements.closePanel.addEventListener('click', closeMusicPanel);
    if (elements.applySettings) elements.applySettings.addEventListener('click', applyMusicSettingsFromPanel);
}

/**
 * Ouvre le panneau de configuration de la musique
 */
function openMusicPanel() {
    const panel = document.getElementById('music-panel');
    if (!panel) return;
    
    // Remplir les champs avec les valeurs actuelles
    document.getElementById('music-url').value = audioConfig.customMusicUrl;
    document.getElementById('volume-music').value = audioConfig.musicVolume * 100;
    document.getElementById('volume-effects').value = audioConfig.effectsVolume * 100;
    document.getElementById('iris-voice-frequency').value = audioConfig.irisVoiceFrequency;
    
    // Afficher le panneau
    panel.classList.remove('hidden');
}

/**
 * Ferme le panneau de configuration de la musique
 */
function closeMusicPanel() {
    document.getElementById('music-panel')?.classList.add('hidden');
}

/**
 * Applique les paramètres audio depuis le panneau de configuration
 */
function applyMusicSettingsFromPanel() {
    // Récupérer les valeurs du panneau
    audioConfig.customMusicUrl = document.getElementById('music-url').value;
    audioConfig.musicVolume = document.getElementById('volume-music').value / 100;
    audioConfig.effectsVolume = document.getElementById('volume-effects').value / 100;
    audioConfig.irisVoiceFrequency = document.getElementById('iris-voice-frequency').value;
    
    // Appliquer les paramètres
    applyAudioSettings();
    saveAudioConfig();
    closeMusicPanel();
    
    // Notification
    showTemporaryNotification("Configuration audio appliquée");
    
    // Réinitialiser la voix d'IRIS si sa configuration a changé
    if (typeof initializeIrisVoice === 'function') {
        initializeIrisVoice();
    }
}

/**
 * Affiche une notification temporaire
 * @param {string} message - Message à afficher
 */
function showTemporaryNotification(message) {
    const notif = document.createElement('div');
    Object.assign(notif.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        padding: '10px 15px', backgroundColor: 'rgba(0,100,0,0.8)',
        border: '1px solid #00FF00', color: '#FFF',
        borderRadius: '5px', zIndex: '9999', fontSize: '14px'
    });
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

/**
 * Applique tous les réglages audio
 */
function applyAudioSettings() {
    try {
        // Volumes musique & ambiance
        setVolumeIfExists(audio.background, audioConfig.musicVolume);
        setVolumeIfExists(audio.ambient, audioConfig.musicVolume);

        // Volumes effets
        setVolumeIfExists(audio.key, audioConfig.effectsVolume * 0.2);
        setVolumeIfExists(audio.error, audioConfig.effectsVolume * 0.4);
        setVolumeIfExists(audio.success, audioConfig.effectsVolume * 0.6);
        setVolumeIfExists(audio.voice, audioConfig.effectsVolume);
        setVolumeIfExists(audio.notification, audioConfig.effectsVolume * 0.6);

        // Iris voices : config selon la fréquence choisie
        configureIrisVoices();

        // URL personnalisée pour la musique
        applyCustomMusicUrl();
        
    } catch (error) {
        console.error("Erreur lors de l'application des paramètres audio:", error);
    }
    
    // Fonction d'aide pour définir le volume si l'élément existe
    function setVolumeIfExists(element, volume) {
        if (element) element.volume = volume;
    }
}

/**
 * Configure les voix d'IRIS selon la fréquence sélectionnée
 */
function configureIrisVoices() {
    if (!audio.irisVoices) return;
    
    audio.irisVoices.forEach((voiceEl, idx) => {
        if (!voiceEl) return;
        
        let shouldMute = true;
        switch (audioConfig.irisVoiceFrequency) {
            case 'low':    shouldMute = (idx !== 0); break;
            case 'medium': shouldMute = (idx !== 1); break;
            case 'high':   shouldMute = (idx !== 2); break;
            case 'off':
            default:       shouldMute = true;       break;
        }
        
        voiceEl.muted = shouldMute;
        voiceEl.volume = audioConfig.effectsVolume;
    });
}

/**
 * Applique l'URL de musique personnalisée
 */
function applyCustomMusicUrl() {
    if (!audioConfig.customMusicUrl || !audio.background) return;
    
    const sources = audio.background.querySelectorAll('source');
    sources.forEach(src => { src.src = audioConfig.customMusicUrl; });
    
    // Recharger l'audio
    audio.background.load();
    
    // Rétablir la lecture si nécessaire
    if (!audio.background.paused) {
        audio.background.play().catch(err => {
            console.warn("Lecture musique personnalisée impossible:", err);
            
            // Revenir à la source par défaut
            sources.forEach(src => {
                src.src = `audio/music/${audioConfig.currentMusic}`;
            });
            audio.background.load();
            audio.background.play().catch(() => {});
        });
    }
}

/**
 * Sauvegarde la configuration audio dans le localStorage
 */
function saveAudioConfig() {
    try {
        localStorage.setItem('irisAudioConfig', JSON.stringify(audioConfig));
    } catch (error) {
        console.warn("Impossible de sauvegarder la config:", error);
    }
}

/**
 * Charge la configuration audio depuis le localStorage
 */
function loadAudioConfig() {
    try {
        const saved = localStorage.getItem('irisAudioConfig');
        if (saved) {
            const parsed = JSON.parse(saved);
            audioConfig = { ...audioConfig, ...parsed };
            
            // S'assurer que la musique actuelle est définie
            if (!audioConfig.currentMusic) {
                audioConfig.currentMusic = 'background.mp3';
            }
        }
    } catch (error) {
        console.warn("Impossible de charger la config:", error);
    }
}

/**
 * Crée un fallback si l'audio n'est pas disponible
 */
function noSoundFallback() {
    function makeStub() {
        return {
            play() {}, pause() {},
            cloneNode() { return makeStub(); },
            currentTime: 0,
            muted: false,
            volume: 1
        };
    }
    
    audio = {
        background: makeStub(),
        key: makeStub(),
        error: makeStub(),
        success: makeStub(),
        voice: makeStub(),
        notification: makeStub(),
        ambient: makeStub(),
        irisVoices: [makeStub(), makeStub(), makeStub()]
    };
}

/**
 * Commence la lecture de la musique de fond
 */
function playBackgroundMusic() {
    try {
        audio.background?.play()?.catch(err => console.warn("Impossible de jouer la musique:", err));
        audio.ambient?.play()?.catch(err => console.warn("Impossible de jouer l'ambiance:", err));
    } catch (error) {
        console.error("Erreur lors de la lecture:", error);
    }
}

/**
 * Joue un son spécifique
 * @param {HTMLAudioElement} sound - L'élément audio à jouer
 */
function playSound(sound) {
    try {
        if (sound?.play) {
            sound.currentTime = 0;
            sound.play()?.catch(err => console.warn("Impossible de jouer le son:", err));
        }
    } catch (error) {
        console.error("Erreur de lecture de son:", error);
    }
}

/**
 * Joue le son de touche
 */
function playKeySound() {
    try {
        const clone = audio.key?.cloneNode(true);
        if (clone) {
            clone.volume = audioConfig.effectsVolume * 0.2;
            clone.play()?.catch(err => console.warn("Impossible de jouer le son de touche:", err));
        }
    } catch (error) {
        console.error("Erreur son de touche:", error);
    }
}

/**
 * Active/désactive le son
 */
function toggleMute() {
    try {
        if (!audio.background) return;
        
        const wasMuted = audio.background.muted;
        
        // Inverser l'état pour tous les sons
        Object.values(audio).forEach(s => {
            if (Array.isArray(s)) {
                s.forEach(v => v.muted = !wasMuted);
            } else if ('muted' in s) {
                s.muted = !wasMuted;
            }
        });
        
        // Mettre à jour l'icône
        updateVolumeIcon();
        
    } catch (error) {
        console.error("Erreur toggleMute:", error);
    }
}

/**
 * Affiche l'indicateur audio
 * @param {number} duration - Durée d'affichage en millisecondes
 */
function showAudioIndicator(duration) {
    const ind = document.getElementById('audio-indicator');
    if (!ind) return;
    
    ind.classList.remove('hidden');
    
    const prog = ind.querySelector('.audio-indicator-progress');
    if (prog) {
        prog.style.animation = 'none';
        // reflow
        prog.offsetHeight;
        prog.style.animation = `audio-progress ${duration/1000}s linear`;
    }
    
    setTimeout(() => ind.classList.add('hidden'), duration);
}

/**
 * Change la musique de fond avec transition
 * @param {string} musicFile - Nom du fichier audio
 * @param {boolean} forceChange - Forcer le changement même si c'est la même musique
 */
function changeBackgroundMusic(musicFile, forceChange = false) {
    try {
        // Vérifier si on doit changer la musique
        if (!forceChange && audioConfig.currentMusic === musicFile) return;
        
        // Mettre à jour la musique actuelle
        audioConfig.currentMusic = musicFile;
        
        // Si une URL personnalisée est définie et qu'on ne force pas le changement
        if (audioConfig.customMusicUrl && !forceChange) {
            console.log(`URL personnalisée active, musique ${musicFile} non changée`);
            return;
        }
        
        // Référence au lecteur audio
        const bgMusic = audio.background;
        if (!bgMusic) return;
        
        // Sauvegarder l'état actuel
        const currentVolume = bgMusic.volume;
        const wasMuted = bgMusic.muted;
        const wasPlaying = !bgMusic.paused;
        
        if (wasPlaying) {
            // Transition avec fondu
            fadeTransition(bgMusic, musicFile, currentVolume, wasMuted);
        } else {
            // Changement direct sans fondu
            directChange(bgMusic, musicFile, currentVolume, wasMuted);
        }
        
        // Sauvegarder la configuration
        saveAudioConfig();
        console.log(`Musique changée pour ${musicFile}`);
        
    } catch (error) {
        console.error("Erreur lors du changement de musique:", error);
    }
}

/**
 * Effectue une transition en fondu
 * @param {HTMLAudioElement} bgMusic - Élément audio
 * @param {string} musicFile - Nouveau fichier
 * @param {number} targetVolume - Volume final
 * @param {boolean} muted - État muet
 */
function fadeTransition(bgMusic, musicFile, targetVolume, muted) {
    // Fondu sortant
    const fadeOut = setInterval(() => {
        if (bgMusic.volume > 0.05) {
            bgMusic.volume -= 0.05;
        } else {
            clearInterval(fadeOut);
            
            // Changer la source
            const sources = bgMusic.querySelectorAll('source');
            sources.forEach(src => { 
                src.src = `audio/music/${musicFile}`; 
            });
            
            // Recharger l'audio
            bgMusic.load();
            
            // Réinitialiser pour le fondu entrant
            bgMusic.volume = 0;
            bgMusic.muted = muted;
            
            // Lecture et fondu entrant
            bgMusic.play().then(() => {
                fadeMusicIn(bgMusic, targetVolume);
            }).catch(err => {
                console.warn("Impossible de jouer la nouvelle musique:", err);
                bgMusic.volume = targetVolume;
            });
        }
    }, 50);
}

/**
 * Fondu entrant pour la musique
 * @param {HTMLAudioElement} bgMusic - Élément audio
 * @param {number} targetVolume - Volume final
 */
function fadeMusicIn(bgMusic, targetVolume) {
    const fadeIn = setInterval(() => {
        if (bgMusic.volume < targetVolume) {
            bgMusic.volume += 0.05;
            if (bgMusic.volume > targetVolume) {
                bgMusic.volume = targetVolume;
                clearInterval(fadeIn);
            }
        } else {
            clearInterval(fadeIn);
        }
    }, 50);
}

/**
 * Change directement la musique sans fondu
 * @param {HTMLAudioElement} bgMusic - Élément audio
 * @param {string} musicFile - Nouveau fichier
 * @param {number} volume - Volume à appliquer
 * @param {boolean} muted - État muet
 */
function directChange(bgMusic, musicFile, volume, muted) {
    const sources = bgMusic.querySelectorAll('source');
    sources.forEach(src => { 
        src.src = `audio/music/${musicFile}`; 
    });
    
    bgMusic.load();
    bgMusic.volume = volume;
    bgMusic.muted = muted;
}

/**
 * Force la musique spécifique pour le mode BLACKOUT
 */
function forceBlackoutMusic() {
    // Forcer le changement vers background3.mp3, même si c'est déjà la musique actuelle
    changeBackgroundMusic('background3.mp3', true);
}

// Lancer l'initialisation après chargement du DOM
window.addEventListener('DOMContentLoaded', initializeAudio);