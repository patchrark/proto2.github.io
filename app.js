/**
 * ============================================================================
 * FICHAS INTERACTIVAS - CAA Y DESARROLLO DEL LENGUAJE (IPAD SAFARI)
 * ============================================================================
 * Aplicación educativa táctil y sensorial para niños de 3 a 7 años.
 * Complementaria a fichas físicas con soporte de pictogramas ARASAAC,
 * TTS adaptado, grabación automática y modulación de voz divertida (Helio/Oso).
 */

// ============================================================================
// 1. BASE DE DATOS Y ESTRUCTURAS DE CONTENIDO
// ============================================================================

/**
 * Base de datos para el Modo Categorías (3 Cuadrados Neutros)
 * Artículos, Familiares, Acciones y Objetos.
 */
const CATEGORIAS_DATA = [
  {
    id: 'cat-familia',
    categoria: 'Familiares',
    consigna: '¡Busca 3 FAMILIARES y coloca tus fichas físicas aquí!',
    audioConsigna: 'Busca tres familiares y coloca tus fichas en los recuadros.',
    palabras: ['PAPÁ', 'MAMÁ', 'ABUELA'],
    iconFallback: '👨‍👩‍👧',
    bannerColor: '#f97316'
  },
  {
    id: 'cat-acciones',
    categoria: 'Acciones',
    consigna: '¡Busca 3 ACCIONES y coloca tus fichas físicas aquí!',
    audioConsigna: 'Busca tres acciones y coloca tus fichas en los recuadros.',
    palabras: ['RIEGA', 'HORNEA', 'LEE'],
    iconFallback: '⚡',
    bannerColor: '#10b981'
  },
  {
    id: 'cat-objetos',
    categoria: 'Objetos',
    consigna: '¡Busca 3 OBJETOS y coloca tus fichas físicas aquí!',
    audioConsigna: 'Busca tres objetos y coloca tus fichas en los recuadros.',
    palabras: ['PLANTAS', 'LIBRO', 'PASTEL'],
    iconFallback: '📦',
    bannerColor: '#8b5cf6'
  },
  {
    id: 'cat-articulos',
    categoria: 'Artículos',
    consigna: '¡Busca 3 ARTÍCULOS y coloca tus fichas físicas aquí!',
    audioConsigna: 'Busca tres artículos y coloca tus fichas en los recuadros.',
    palabras: ['UN', 'UNA', 'LAS'],
    iconFallback: '🔹',
    bannerColor: '#0284c7'
  }
];

/**
 * Base de datos para el Modo Oraciones (4 Cuadrados Estrictos con Colores)
 * Cuadrado 1: Amarillo (#f1c40f) - Persona / Familiar
 * Cuadrado 2: Verde (#2ecc71) - Acción / Verbo
 * Cuadrado 3: Azul (#3498db) - Artículo
 * Cuadrado 4: Morado (#9b59b6) - Objeto / Complemento
 */
const ORACIONES_DATA = [
  {
    id: 'oracion-1',
    textoCompleto: 'PAPÁ RIEGA LAS PLANTAS',
    imagen: 'papa_riega.png',
    imagenFallback: 'img/papa_riega.png',
    consigna: 'Mira la imagen y forma la oración con tus 4 fichas de colores:',
    audioConsigna: 'Mira la imagen y forma la oración: Papá riega las plantas.',
    slots: [
      { palabra: 'PAPÁ', rol: 'Persona', colorClass: 'color-amarillo', slotNum: 1, colorHex: '#f1c40f' },
      { palabra: 'RIEGA', rol: 'Acción', colorClass: 'color-verde', slotNum: 2, colorHex: '#2ecc71' },
      { palabra: 'LAS', rol: 'Artículo', colorClass: 'color-azul', slotNum: 3, colorHex: '#3498db' },
      { palabra: 'PLANTAS', rol: 'Objeto', colorClass: 'color-morado', slotNum: 4, colorHex: '#9b59b6' }
    ]
  },
  {
    id: 'oracion-2',
    textoCompleto: 'MAMÁ LEE UN LIBRO',
    imagen: 'mama_lee.png',
    imagenFallback: 'img/mama_lee.png',
    consigna: 'Mira la imagen y forma la oración con tus 4 fichas de colores:',
    audioConsigna: 'Mira la imagen y forma la oración: Mamá lee un libro.',
    slots: [
      { palabra: 'MAMÁ', rol: 'Persona', colorClass: 'color-amarillo', slotNum: 1, colorHex: '#f1c40f' },
      { palabra: 'LEE', rol: 'Acción', colorClass: 'color-verde', slotNum: 2, colorHex: '#2ecc71' },
      { palabra: 'UN', rol: 'Artículo', colorClass: 'color-azul', slotNum: 3, colorHex: '#3498db' },
      { palabra: 'LIBRO', rol: 'Objeto', colorClass: 'color-morado', slotNum: 4, colorHex: '#9b59b6' }
    ]
  },
  {
    id: 'oracion-3',
    textoCompleto: 'ABUELA HORNEA UN PASTEL',
    imagen: 'abuela_hornea.png',
    imagenFallback: 'img/abuela_hornea.png',
    consigna: 'Mira la imagen y forma la oración con tus 4 fichas de colores:',
    audioConsigna: 'Mira la imagen y forma la oración: Abuela hornea un pastel.',
    slots: [
      { palabra: 'ABUELA', rol: 'Persona', colorClass: 'color-amarillo', slotNum: 1, colorHex: '#f1c40f' },
      { palabra: 'HORNEA', rol: 'Acción', colorClass: 'color-verde', slotNum: 2, colorHex: '#2ecc71' },
      { palabra: 'UN', rol: 'Artículo', colorClass: 'color-azul', slotNum: 3, colorHex: '#3498db' },
      { palabra: 'PASTEL', rol: 'Objeto', colorClass: 'color-morado', slotNum: 4, colorHex: '#9b59b6' }
    ]
  }
];

// Mapeo de lemas/búsqueda para la API de ARASAAC (para verbos conjugados y formas plurals)
const ARASAAC_SEARCH_MAP = {
  'riega': 'regar',
  'hornea': 'hornear',
  'lee': 'leer',
  'plantas': 'planta',
  'las': 'las',
  'un': 'un',
  'una': 'una'
};

// IDs pre-validados en ARASAAC para carga instantánea o sin conexión
const ARASAAC_PRELOAD_IDS = {
  'papá': 31146,
  'papa': 31146,
  'mamá': 2458,
  'mama': 2458,
  'abuela': 23710,
  'riega': 2816,
  'regar': 2816,
  'hornea': 5487,
  'hornear': 5487,
  'lee': 7141,
  'leer': 7141,
  'plantas': 3143,
  'planta': 3143,
  'libro': 25191,
  'pastel': 2502,
  'un': 8474,
  'una': 8474,
  'las': 7031
};

// ============================================================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ============================================================================
const state = {
  currentMode: 'menu', // 'menu' | 'categorias' | 'oraciones'
  currentIndex: 0,
  speechSynthVoice: null,
  isTtsSpeaking: false,
  
  // Audio & Mic State
  audioContext: null,
  mediaRecorder: null,
  mediaStream: null,
  recordedAudioBuffer: null,
  recordedBlobUrl: null,
  isRecording: false,
  audioSourceNode: null,
  
  // Speech Recognition
  speechRecognition: null,
  isRecognitionActive: false,
  recognitionTimeoutId: null,
  
  // Cache de Pictogramas ARASAAC
  pictogramCache: new Map()
};

// ============================================================================
// 3. INTEGRACIÓN ASÍNCRONA DE ARASAAC
// ============================================================================

/**
 * Helper asíncrono para buscar y obtener la URL del pictograma oficial de ARASAAC
 * @param {string} palabra - Palabra a buscar (ej: "PAPÁ", "RIEGA", "PLANTAS")
 * @returns {Promise<string>} - URL directa de la imagen del pictograma
 */
async function getArasaacPictogram(palabra) {
  if (!palabra) return null;
  const rawWord = palabra.trim().toLowerCase();
  
  // 1. Verificar si ya está en caché en memoria
  if (state.pictogramCache.has(rawWord)) {
    return state.pictogramCache.get(rawWord);
  }

  // 2. Determinar el término óptimo de búsqueda en español
  const searchTerm = ARASAAC_SEARCH_MAP[rawWord] || rawWord;

  try {
    const searchUrl = `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(searchTerm)}`;
    const response = await fetch(searchUrl);
    
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0]._id) {
        const pictoUrl = `https://api.arasaac.org/api/pictograms/${data[0]._id}`;
        state.pictogramCache.set(rawWord, pictoUrl);
        return pictoUrl;
      }
    }
  } catch (err) {
    console.warn(`[ARASAAC] Error de red consultando "${searchTerm}":`, err);
  }

  // 3. Fallback a ID pre-cargado de respaldo
  if (ARASAAC_PRELOAD_IDS[rawWord]) {
    const fallbackUrl = `https://api.arasaac.org/api/pictograms/${ARASAAC_PRELOAD_IDS[rawWord]}`;
    state.pictogramCache.set(rawWord, fallbackUrl);
    return fallbackUrl;
  }

  return null;
}

// ============================================================================
// 4. SISTEMA DE AUDIO (TTS - WEB SPEECH API)
// ============================================================================

/**
 * Inicializa y busca las mejores voces en español disponibles en Safari / iPad
 */
function initTtsVoices() {
  if (!('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis no está soportado en este navegador');
    return;
  }

  const selectVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Priorizar voces en español de calidad para niños
    state.speechSynthVoice = voices.find(v => v.lang === 'es-ES' && v.name.includes('Mónica')) ||
                             voices.find(v => v.lang === 'es-ES') ||
                             voices.find(v => v.lang.startsWith('es-')) ||
                             voices.find(v => v.lang.includes('es')) ||
                             null;
  };

  selectVoice();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = selectVoice;
  }
}

/**
 * Lee un texto en voz alta con tono pausado (0.85) y amigable (1.1)
 * @param {string} text - Texto a pronunciar
 * @param {Function} [onEndCallback] - Ejecutar cuando termine de hablar
 */
function speakText(text, onEndCallback) {
  if (!('speechSynthesis' in window)) {
    if (onEndCallback) onEndCallback();
    return;
  }

  // Cancelar locuciones previas
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 0.85; // Velocidad pausada según requerimiento
  utterance.pitch = 1.1; // Tono amigable según requerimiento

  if (state.speechSynthVoice) {
    utterance.voice = state.speechSynthVoice;
  }

  // Indicador visual de locución activa
  const speakerBubble = document.getElementById('btn-consigna-speaker');
  if (speakerBubble) speakerBubble.classList.add('speaking');
  state.isTtsSpeaking = true;

  utterance.onend = () => {
    state.isTtsSpeaking = false;
    if (speakerBubble) speakerBubble.classList.remove('speaking');
    if (typeof onEndCallback === 'function') {
      onEndCallback();
    }
  };

  utterance.onerror = (e) => {
    console.warn('Error en SpeechSynthesis:', e);
    state.isTtsSpeaking = false;
    if (speakerBubble) speakerBubble.classList.remove('speaking');
    if (typeof onEndCallback === 'function') {
      onEndCallback();
    }
  };

  window.speechSynthesis.speak(utterance);
}

// ============================================================================
// 5. EFECTOS SONOROS SINTETIZADOS (WEB AUDIO API)
// ============================================================================

/**
 * Obtiene o crea el AudioContext global (compatible con políticas de Safari)
 */
function getAudioContext() {
  if (!state.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioCtx();
  }
  if (state.audioContext.state === 'suspended') {
    state.audioContext.resume();
  }
  return state.audioContext;
}

/**
 * Sonido agradable de botón / toque
 */
function playBubblePop() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch (e) {
    // Audio context ignorado si el usuario aún no interactuó
  }
}

/**
 * Fanfarria musical de felicitación cuando el niño completa el reto
 */
function playCelebrationFanfare() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const noteStart = startTime + idx * 0.1;
      const duration = (idx === notes.length - 1) ? 0.45 : 0.15;

      gain.gain.setValueAtTime(0, noteStart);
      gain.gain.linearRampToValueAtTime(0.2, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + duration);
    });
  } catch (e) {
    console.warn('No se pudo reproducir fanfarria:', e);
  }
}

// ============================================================================
// 6. DETECCIÓN AUTOMÁTICA DE VOZ Y GRABACIÓN (SIN BOTONES EXTRA PARA EL NIÑO)
// ============================================================================

/**
 * Inicializa la captura automática de voz del niño al abrir el modal
 * @param {string} expectedPhrase - Frase esperada para el reconocimiento
 */
async function startAutomaticVoiceDetection(expectedPhrase) {
  const micStatus = document.getElementById('mic-status-container');
  const micText = document.getElementById('mic-status-text');
  const micSubtext = document.getElementById('mic-subtext');
  const waveformCanvas = document.getElementById('audio-waveform-canvas');

  if (micStatus) micStatus.classList.add('mic-listening');
  if (micText) micText.textContent = '¡Escuchando tu voz!... 🎙️';
  if (micSubtext) micSubtext.textContent = 'Habla cerca del iPad';

  // 1. Obtener stream de micrófono e iniciar MediaRecorder
  let recordedChunks = [];
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.mediaStream = stream;

    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 
                     (MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : '');
    
    state.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
    
    state.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    state.mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(recordedChunks, { type: state.mediaRecorder.mimeType || 'audio/webm' });
      state.recordedBlobUrl = URL.createObjectURL(audioBlob);

      // Decodificar el audio a un AudioBuffer para modulación impecable de tono
      try {
        const arrayBuffer = await audioBlob.arrayBuffer();
        const ctx = getAudioContext();
        ctx.decodeAudioData(arrayBuffer, (decodedBuffer) => {
          state.recordedAudioBuffer = decodedBuffer;
          onVoiceRecordingFinished();
        }, (err) => {
          console.warn('Error decodificando audio buffer:', err);
          onVoiceRecordingFinished();
        });
      } catch (err) {
        console.warn('Error procesando audio blob:', err);
        onVoiceRecordingFinished();
      }
    };

    state.mediaRecorder.start(100);
    state.isRecording = true;

    // Conectar visualizador de ondas
    setupAudioWaveform(stream, waveformCanvas);

  } catch (err) {
    console.warn('Permiso de micrófono no concedido o no disponible:', err);
    if (micText) micText.textContent = 'Micrófono en modo supervisión';
    if (micSubtext) micSubtext.textContent = 'Puedes continuar con "Aceptar sin audio"';
  }

  // 2. Iniciar Reconocimiento de Voz Web Speech API (webkitSpeechRecognition)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    try {
      const recognition = new SpeechRecognition();
      state.speechRecognition = recognition;
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        state.isRecognitionActive = true;
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('[Reconocimiento] Niño dijo:', transcript);
        finishVoiceCapture('¡Te escuché genial!');
      };

      recognition.onerror = (e) => {
        console.log('[Reconocimiento] Evento:', e.error);
      };

      recognition.onend = () => {
        state.isRecognitionActive = false;
      };

      recognition.start();
    } catch (e) {
      console.warn('SpeechRecognition no inició:', e);
    }
  }

  // 3. Temporizador de seguridad: si el niño tarda en hablar o ya habló, detener suavemente tras 4.5 segundos
  clearTimeout(state.recognitionTimeoutId);
  state.recognitionTimeoutId = setTimeout(() => {
    if (state.isRecording) {
      finishVoiceCapture('¡Muy bien!');
    }
  }, 4500);
}

/**
 * Detiene la captura de audio y reconocimiento de voz
 * @param {string} finishMessage - Mensaje a mostrar
 */
function finishVoiceCapture(finishMessage) {
  clearTimeout(state.recognitionTimeoutId);

  const micStatus = document.getElementById('mic-status-container');
  const micText = document.getElementById('mic-status-text');
  const micSubtext = document.getElementById('mic-subtext');

  if (micStatus) micStatus.classList.remove('mic-listening');
  if (micText) micText.textContent = finishMessage || '¡Listo!';
  if (micSubtext) micSubtext.textContent = '¡Procesando tu voz divertida!';

  if (state.speechRecognition && state.isRecognitionActive) {
    try {
      state.speechRecognition.stop();
    } catch (e) {}
    state.isRecognitionActive = false;
  }

  if (state.mediaRecorder && state.mediaRecorder.state === 'recording') {
    state.mediaRecorder.stop();
    state.isRecording = false;
  }

  // Apagar pistas del micrófono para ahorrar batería en iPad
  if (state.mediaStream) {
    state.mediaStream.getTracks().forEach(track => track.stop());
    state.mediaStream = null;
  }
}

/**
 * Configura un osciloscopio visualizador en el canvas
 */
function setupAudioWaveform(stream, canvas) {
  if (!canvas) return;
  try {
    const ctx = getAudioContext();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvasCtx = canvas.getContext('2d');

    const draw = () => {
      if (!state.isRecording) {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        canvasCtx.fillStyle = '#ff5722';
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }
    };
    draw();
  } catch (e) {
    console.warn('Visualizador waveform no disponible:', e);
  }
}

// ============================================================================
// 7. MECANISMO DE RECOMPENSA: MODULACIÓN DE VOZ (HELIO, OSO, NORMAL)
// ============================================================================

/**
 * Se ejecuta al terminar de procesar la grabación.
 * REQUISITO: Reproduce AUTOMÁTICAMENTE la voz del niño con efecto de Voz de Helio (1.4x)
 */
function onVoiceRecordingFinished() {
  const micSubtext = document.getElementById('mic-subtext');
  if (micSubtext) micSubtext.textContent = '🎈 ¡Escucha tu Voz de Helio mágica!';

  // Reproducir automáticamente efecto helio con un breve retraso natural
  setTimeout(() => {
    playModulatedVoice(1.4, 'btn-voice-helio');
  }, 400);
}

/**
 * Reproduce el audio del niño con la tasa de velocidad/tono especificada
 * @param {number} rate - Velocidad y modulación de tono (1.4 Helio, 0.7 Oso, 1.0 Normal)
 * @param {string} [activeButtonId] - ID del botón para resaltar visualmente
 */
function playModulatedVoice(rate, activeButtonId) {
  // Resaltar botón activo
  document.querySelectorAll('.btn-voice-effect').forEach(btn => {
    btn.classList.remove('active-effect');
  });
  if (activeButtonId) {
    const targetBtn = document.getElementById(activeButtonId);
    if (targetBtn) targetBtn.classList.add('active-effect');
  }

  // Detener reproducción anterior si existe
  if (state.audioSourceNode) {
    try {
      state.audioSourceNode.stop();
    } catch (e) {}
    state.audioSourceNode = null;
  }

  // Método 1: Reproducción con Web Audio Buffer (Garantiza cambio de tono/pitch perfecto sin corrección)
  if (state.recordedAudioBuffer) {
    try {
      const ctx = getAudioContext();
      const source = ctx.createBufferSource();
      source.buffer = state.recordedAudioBuffer;
      source.playbackRate.value = rate; // 1.4 = Helio (agudo), 0.7 = Oso (grave), 1.0 = Normal
      source.connect(ctx.destination);
      source.start();
      state.audioSourceNode = source;
      return;
    } catch (e) {
      console.warn('Fallo Web Audio buffer playback:', e);
    }
  }

  // Método 2: Fallback con elemento Audio HTML5
  if (state.recordedBlobUrl) {
    const audio = new Audio(state.recordedBlobUrl);
    audio.playbackRate = rate;
    audio.preservesPitch = false; // Importante para Safari y navegadores WebKit
    audio.webkitPreservesPitch = false;
    audio.play().catch(e => console.warn('Audio play bloqueado:', e));
    return;
  }

  // Si no hay grabación (por ejemplo, omitida o sin micrófono), usar TTS con tono modulado como recompensa
  const currentPhrase = getCurrentPhraseText();
  speakFallbackWithModulation(currentPhrase, rate);
}

/**
 * Fallback TTS con modulación si no hubo audio grabado del niño
 */
function speakFallbackWithModulation(text, rate) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'es-ES';
  utt.rate = rate === 1.4 ? 1.15 : (rate === 0.7 ? 0.7 : 0.85);
  utt.pitch = rate === 1.4 ? 1.6 : (rate === 0.7 ? 0.6 : 1.1);
  if (state.speechSynthVoice) utt.voice = state.speechSynthVoice;
  window.speechSynthesis.speak(utt);
}

// ============================================================================
// 8. RENDERIZADO Y LÓGICA DE JUEGO (CATEGORÍAS Y ORACIONES)
// ============================================================================

/**
 * Cambia la pantalla actual
 * @param {'menu' | 'categorias' | 'oraciones'} mode 
 */
function setMode(mode) {
  state.currentMode = mode;
  state.currentIndex = 0;

  const screenMenu = document.getElementById('screen-menu');
  const screenGame = document.getElementById('screen-game');
  const topNav = document.getElementById('top-nav');
  const modeBadge = document.getElementById('mode-badge');

  if (mode === 'menu') {
    screenMenu.classList.add('active');
    screenGame.classList.remove('active');
    modeBadge.textContent = 'Fichas Interactivas';
    renderProgressDots(0, 0);
  } else {
    screenMenu.classList.remove('active');
    screenGame.classList.add('active');
    
    if (mode === 'categorias') {
      modeBadge.textContent = 'Modo Categorías (3 Fichas)';
      renderCategoriaChallenge(state.currentIndex);
    } else if (mode === 'oraciones') {
      modeBadge.textContent = 'Modo Oraciones (4 Colores)';
      renderOracionChallenge(state.currentIndex);
    }
  }
}

/**
 * Renderiza los puntos de progreso en la barra superior
 */
function renderProgressDots(total, current) {
  const container = document.getElementById('progress-indicators');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = `progress-dot ${i === current ? 'active' : ''} ${i < current ? 'completed' : ''}`;
    container.appendChild(dot);
  }
}

/**
 * Renderiza el reto del Modo Categorías (3 Cuadrados Neutros)
 */
async function renderCategoriaChallenge(index) {
  const challenge = CATEGORIAS_DATA[index];
  if (!challenge) return;

  renderProgressDots(CATEGORIAS_DATA.length, index);

  // 1. Estímulo Visual y Consigna
  const stimulusBox = document.getElementById('stimulus-visual-box');
  const stimulusImg = document.getElementById('stimulus-img');
  const stimulusCategoryIcon = document.getElementById('stimulus-category-icon');
  const consignaBadge = document.getElementById('consigna-badge');
  const targetCategoryLabel = document.getElementById('target-category-label');
  const consignaText = document.getElementById('consigna-text');
  const guideText = document.getElementById('guide-text');

  stimulusImg.style.display = 'none';
  stimulusCategoryIcon.style.display = 'block';
  stimulusCategoryIcon.textContent = challenge.iconFallback;

  consignaBadge.textContent = `RETO ${index + 1} DE ${CATEGORIAS_DATA.length}`;
  targetCategoryLabel.textContent = `CATEGORÍA: ${challenge.categoria.toUpperCase()}`;
  consignaText.textContent = challenge.consigna;
  guideText.textContent = `Coloca tus 3 fichas físicas de ${challenge.categoria}:`;

  // 2. Cuadrados Interactivos (3 Cuadrados Neutros)
  const slotsGrid = document.getElementById('slots-grid');
  slotsGrid.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const palabra = challenge.palabras[i];
    const slotCard = document.createElement('div');
    slotCard.className = 'slot-card slot-neutral-mode';
    slotCard.id = `slot-cat-${i}`;
    slotCard.dataset.word = palabra;

    slotCard.innerHTML = `
      <div class="slot-header">
        <span class="slot-num-badge">${i + 1}</span>
        <span class="slot-role-label">${challenge.categoria}</span>
      </div>
      <div class="slot-drop-zone">
        <img class="slot-pictogram-img" src="" alt="${palabra}" id="picto-cat-${i}">
        <span class="slot-hint-fichas">Coloca tu ficha aquí</span>
      </div>
      <div class="slot-word-label">${palabra}</div>
    `;

    // Al tocar el slot, lee la palabra en voz alta
    slotCard.addEventListener('click', () => {
      playBubblePop();
      speakText(palabra);
    });

    slotsGrid.appendChild(slotCard);

    // Cargar pictograma ARASAAC asíncronamente
    getArasaacPictogram(palabra).then(url => {
      const imgEl = document.getElementById(`picto-cat-${i}`);
      if (imgEl && url) {
        imgEl.src = url;
      }
    });
  }

  // 3. Renderizar bandeja virtual de apoyo con fichas de todas las categorías
  renderVirtualTray(challenge.palabras);

  // 4. Pronunciar la consigna al entrar
  speakText(challenge.audioConsigna);
}

/**
 * Renderiza el reto del Modo Oraciones (4 Cuadrados Estrictos con Código de Colores)
 */
async function renderOracionChallenge(index) {
  const oracion = ORACIONES_DATA[index];
  if (!oracion) return;

  renderProgressDots(ORACIONES_DATA.length, index);

  // 1. Estímulo Visual (Imagen de Apoyo) y Consigna
  const stimulusImg = document.getElementById('stimulus-img');
  const stimulusCategoryIcon = document.getElementById('stimulus-category-icon');
  const consignaBadge = document.getElementById('consigna-badge');
  const targetCategoryLabel = document.getElementById('target-category-label');
  const consignaText = document.getElementById('consigna-text');
  const guideText = document.getElementById('guide-text');

  stimulusCategoryIcon.style.display = 'none';
  stimulusImg.style.display = 'block';

  // Configuración de imagen local con fallback
  stimulusImg.src = oracion.imagen;
  stimulusImg.onerror = () => {
    if (stimulusImg.src !== oracion.imagenFallback) {
      stimulusImg.src = oracion.imagenFallback;
    }
  };

  consignaBadge.textContent = `ORACIÓN ${index + 1} DE ${ORACIONES_DATA.length}`;
  targetCategoryLabel.textContent = 'CÓDIGO DE 4 COLORES';
  consignaText.textContent = `"${oracion.textoCompleto}"`;
  guideText.textContent = 'Coloca tus 4 fichas físicas en el orden correcto:';

  // 2. Cuadrados Interactivos (4 Cuadrados Estrictos)
  const slotsGrid = document.getElementById('slots-grid');
  slotsGrid.innerHTML = '';

  for (let i = 0; i < oracion.slots.length; i++) {
    const slotData = oracion.slots[i];
    const slotCard = document.createElement('div');
    slotCard.className = `slot-card ${slotData.colorClass}`;
    slotCard.id = `slot-ora-${i}`;
    slotCard.dataset.word = slotData.palabra;

    slotCard.innerHTML = `
      <div class="slot-header">
        <span class="slot-num-badge">${slotData.slotNum}</span>
        <span class="slot-role-label">${slotData.rol}</span>
      </div>
      <div class="slot-drop-zone">
        <img class="slot-pictogram-img" src="" alt="${slotData.palabra}" id="picto-ora-${i}">
        <span class="slot-hint-fichas">Ficha física</span>
      </div>
      <div class="slot-word-label">${slotData.palabra}</div>
    `;

    // Al tocar el slot, lee la palabra individualmente
    slotCard.addEventListener('click', () => {
      playBubblePop();
      speakText(slotData.palabra);
    });

    slotsGrid.appendChild(slotCard);

    // Cargar pictograma ARASAAC asíncronamente
    getArasaacPictogram(slotData.palabra).then(url => {
      const imgEl = document.getElementById(`picto-ora-${i}`);
      if (imgEl && url) {
        imgEl.src = url;
      }
    });
  }

  // 3. Renderizar bandeja virtual de apoyo con las palabras de la oración
  renderVirtualTray(oracion.slots.map(s => s.palabra));

  // 4. Pronunciar la consigna al entrar
  speakText(oracion.audioConsigna);
}

/**
 * Renderiza fichas en la bandeja virtual de apoyo
 */
function renderVirtualTray(palabras) {
  const trayList = document.getElementById('tray-tiles-list');
  if (!trayList) return;
  trayList.innerHTML = '';

  palabras.forEach(palabra => {
    const tile = document.createElement('button');
    tile.className = 'tray-tile-item';
    tile.type = 'button';
    tile.innerHTML = `
      <img class="tray-tile-img" src="" alt="${palabra}">
      <span class="tray-tile-text">${palabra}</span>
    `;

    tile.addEventListener('click', () => {
      playBubblePop();
      speakText(palabra);
    });

    trayList.appendChild(tile);

    getArasaacPictogram(palabra).then(url => {
      const img = tile.querySelector('img');
      if (img && url) img.src = url;
    });
  });
}

/**
 * Obtiene el texto de la frase actual para el desafío vocal
 */
function getCurrentPhraseText() {
  if (state.currentMode === 'oraciones') {
    const current = ORACIONES_DATA[state.currentIndex];
    return current ? current.textoCompleto : 'Excelente';
  } else if (state.currentMode === 'categorias') {
    const current = CATEGORIAS_DATA[state.currentIndex];
    return current ? current.palabras.join(' ') : 'Excelente';
  }
  return 'Muy bien';
}

// ============================================================================
// 9. FLUJO DE VALIDACIÓN, MODAL Y CONFETI
// ============================================================================

/**
 * Abre el modal de felicitación, lanza confeti y arranca la detección vocal automática
 */
function handleComprobar() {
  playCelebrationFanfare();
  launchConfetti();

  const modal = document.getElementById('modal-felicitacion');
  const targetPhraseEl = document.getElementById('target-speech-phrase');
  const breakdownEl = document.getElementById('target-speech-breakdown');

  const currentPhrase = getCurrentPhraseText();
  targetPhraseEl.textContent = `"${currentPhrase}"`;

  // Renderizar desglose de palabras con colores
  breakdownEl.innerHTML = '';
  if (state.currentMode === 'oraciones') {
    const current = ORACIONES_DATA[state.currentIndex];
    current.slots.forEach(slot => {
      const pill = document.createElement('span');
      pill.className = `breakdown-word-pill ${slot.colorClass}`;
      pill.textContent = slot.palabra;
      breakdownEl.appendChild(pill);
    });
  } else if (state.currentMode === 'categorias') {
    const current = CATEGORIAS_DATA[state.currentIndex];
    current.palabras.forEach(w => {
      const pill = document.createElement('span');
      pill.className = 'breakdown-word-pill';
      pill.style.background = '#e2e8f0';
      pill.textContent = w;
      breakdownEl.appendChild(pill);
    });
  }

  // Mostrar modal
  modal.classList.add('active');

  // Lectura por voz y arranque automático del reconocimiento
  const congratulationSpeech = `¡Excelente trabajo! Ahora repite con tu voz: ${currentPhrase}`;
  speakText(congratulationSpeech, () => {
    // REQUISITO: Al terminar de leer la frase, inicia automáticamente el reconocimiento de voz y la grabación
    startAutomaticVoiceDetection(currentPhrase);
  });
}

/**
 * Avanza al siguiente reto o felicita al finalizar
 */
function handleNextChallenge() {
  playBubblePop();
  finishVoiceCapture();

  const modal = document.getElementById('modal-felicitacion');
  modal.classList.remove('active');

  if (state.currentMode === 'categorias') {
    if (state.currentIndex < CATEGORIAS_DATA.length - 1) {
      state.currentIndex++;
      renderCategoriaChallenge(state.currentIndex);
    } else {
      speakText('¡Felicitaciones! Has completado todas las categorías.');
      setTimeout(() => setMode('menu'), 1800);
    }
  } else if (state.currentMode === 'oraciones') {
    if (state.currentIndex < ORACIONES_DATA.length - 1) {
      state.currentIndex++;
      renderOracionChallenge(state.currentIndex);
    } else {
      speakText('¡Increíble! Has formado todas las oraciones con tus fichas.');
      setTimeout(() => setMode('menu'), 1800);
    }
  }
}

/**
 * Botón para supervisión adulta: permite avanzar si falla el micrófono o el niño no habla
 */
function handleBypassAudio() {
  playBubblePop();
  finishVoiceCapture('Completado');
  const micSubtext = document.getElementById('mic-subtext');
  if (micSubtext) micSubtext.textContent = '¡Validado por el adulto!';
  setTimeout(() => {
    handleNextChallenge();
  }, 300);
}

// ============================================================================
// 10. ANIMACIÓN DE CONFETI EN CANVAS (SIN LIBRERÍAS EXTERNAS)
// ============================================================================

let confettiParticles = [];
let confettiAnimId = null;

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const colors = ['#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#ff5722', '#ec4899', '#38bdf8'];
  confettiParticles = [];

  for (let i = 0; i < 110; i++) {
    confettiParticles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      r: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -14 - 4,
      gravity: 0.35,
      tilt: Math.random() * 10 - 5,
      tiltAngle: Math.random() * Math.PI,
      tiltAngleInc: Math.random() * 0.08 + 0.04,
      opacity: 1
    });
  }

  cancelAnimationFrame(confettiAnimId);

  const renderParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.tiltAngle += p.tiltAngleInc;
      p.opacity -= 0.005;

      if (p.opacity > 0 && p.y < canvas.height) {
        activeParticles++;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.ellipse(p.x, p.y, p.r, p.r * Math.abs(Math.sin(p.tiltAngle)), 0, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.globalAlpha = 1;
    if (activeParticles > 0) {
      confettiAnimId = requestAnimationFrame(renderParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  confettiAnimId = requestAnimationFrame(renderParticles);
}

// ============================================================================
// 11. INICIALIZACIÓN Y EVENT LISTENERS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar voces TTS
  initTtsVoices();

  // Navegación: Botón Inicio / Menú
  document.getElementById('btn-home').addEventListener('click', () => {
    playBubblePop();
    setMode('menu');
  });

  // Pantalla de Inicio: Tarjeta Categorías
  document.getElementById('card-mode-categorias').addEventListener('click', () => {
    playBubblePop();
    setMode('categorias');
  });

  // Pantalla de Inicio: Tarjeta Oraciones
  document.getElementById('card-mode-oraciones').addEventListener('click', () => {
    playBubblePop();
    setMode('oraciones');
  });

  // Repetir Audio de la consigna
  const repeatAudioHandler = () => {
    playBubblePop();
    if (state.currentMode === 'categorias') {
      const cur = CATEGORIAS_DATA[state.currentIndex];
      if (cur) speakText(cur.audioConsigna);
    } else if (state.currentMode === 'oraciones') {
      const cur = ORACIONES_DATA[state.currentIndex];
      if (cur) speakText(cur.audioConsigna);
    }
  };
  document.getElementById('btn-repeat-audio').addEventListener('click', repeatAudioHandler);
  document.getElementById('btn-consigna-speaker').addEventListener('click', repeatAudioHandler);
  document.getElementById('btn-hint-tts').addEventListener('click', repeatAudioHandler);

  // Toggle Bandeja Virtual de apoyo
  const trayEl = document.getElementById('virtual-tray');
  document.getElementById('btn-toggle-tray').addEventListener('click', () => {
    playBubblePop();
    trayEl.classList.toggle('collapsed');
  });
  document.getElementById('btn-close-tray').addEventListener('click', () => {
    playBubblePop();
    trayEl.classList.add('collapsed');
  });

  // Botón Reiniciar slots
  document.getElementById('btn-clear-slots').addEventListener('click', () => {
    playBubblePop();
    if (state.currentMode === 'categorias') {
      renderCategoriaChallenge(state.currentIndex);
    } else if (state.currentMode === 'oraciones') {
      renderOracionChallenge(state.currentIndex);
    }
  });

  // Botón Principal: ¡COMPROBAR!
  document.getElementById('btn-comprobar').addEventListener('click', () => {
    handleComprobar();
  });

  // Botones de Modulación de Voz en el Modal
  document.getElementById('btn-voice-helio').addEventListener('click', () => {
    playBubblePop();
    playModulatedVoice(1.4, 'btn-voice-helio'); // 🎈 Helio (Agudo x1.4)
  });

  document.getElementById('btn-voice-grave').addEventListener('click', () => {
    playBubblePop();
    playModulatedVoice(0.7, 'btn-voice-grave'); // 🐻 Oso (Grave x0.7)
  });

  document.getElementById('btn-voice-normal').addEventListener('click', () => {
    playBubblePop();
    playModulatedVoice(1.0, 'btn-voice-normal'); // 🗣️ Normal (x1.0)
  });

  // Supervisión adulta: Aceptar sin audio
  document.getElementById('btn-bypass-audio').addEventListener('click', () => {
    handleBypassAudio();
  });

  // Siguiente Reto
  document.getElementById('btn-next-challenge').addEventListener('click', () => {
    handleNextChallenge();
  });

  // Pre-cargar pictogramas en caché en segundo plano
  Object.keys(ARASAAC_PRELOAD_IDS).forEach(word => {
    getArasaacPictogram(word);
  });
});
