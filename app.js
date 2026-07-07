import { sentences } from './sentences.js';

// -------------------------------------------------------------
// STATE MANAGEMENT
// -------------------------------------------------------------
let activeSentenceId = 1;
let activeMode = 'learn'; // 'learn' | 'listen' | 'speak'
let userProgress = {}; // Format: { [sentenceId]: { learn: false, listen: false, speak: false } }

// Audio Synthesis & Recognition instances
let speechUtterance = null;
let recognition = null;
let isRecording = false;

// -------------------------------------------------------------
// DOM ELEMENTS
// -------------------------------------------------------------
const sentenceNav = document.getElementById('sentence-navigation');
const mainProgress = document.getElementById('main-progress-bar');
const progressText = document.getElementById('progress-text');
const resetProgressBtn = document.getElementById('reset-progress-btn');

// Detail Panel Elements
const activeIdBadge = document.getElementById('active-id-badge');
const activeStatusBadge = document.getElementById('active-status-badge');
const displayJapanese = document.getElementById('display-japanese');
const displayEnglish = document.getElementById('display-english');
const listenMask = document.getElementById('listen-mask');
const englishWrapper = document.getElementById('english-wrapper');
const grammarWrapper = document.getElementById('grammar-wrapper');
const displayGrammarVisualizer = document.getElementById('display-grammar-visualizer');
const noteWrapper = document.getElementById('note-wrapper');
const displayNote = document.getElementById('display-note');

// Controls
const ttsPlayBtn = document.getElementById('tts-play-btn');
const speedRange = document.getElementById('speech-speed-range');
const speedVal = document.getElementById('speed-val');
const prevBtn = document.getElementById('prev-sentence-btn');
const nextBtn = document.getElementById('next-sentence-btn');

// Mode Tabs
const tabButtons = document.querySelectorAll('.tab-btn');

// Speaking Mode Panel Elements
const speakingPanel = document.getElementById('speaking-panel');
const micRecordBtn = document.getElementById('mic-record-btn');
const micIcon = document.getElementById('mic-icon');
const micPulseRing = document.getElementById('mic-pulse-ring');
const speakStatusText = document.getElementById('speak-status-text');
const speechResultCard = document.getElementById('speech-result-card');
const resultScoreNum = document.getElementById('result-score-num');
const scoreCircleProgress = document.getElementById('score-circle-progress');
const scoreEvalText = document.getElementById('score-eval-text');
const userSpeechTranscript = document.getElementById('user-speech-transcript');
const modelSpeechSentence = document.getElementById('model-speech-sentence');
const completeSentenceBtn = document.getElementById('complete-sentence-btn');

// Listening Mode Panel Elements
const listeningPanel = document.getElementById('listening-panel');
const listeningAnswerInput = document.getElementById('listening-answer-input');
const listeningSubmitBtn = document.getElementById('listening-submit-btn');
const listeningResultPanel = document.getElementById('listening-result-panel');
const listeningStatusHeader = document.getElementById('listening-status-header');
const listeningStatusIcon = document.getElementById('listening-status-icon');
const listeningStatusMsg = document.getElementById('listening-status-msg');
const userListeningAnswer = document.getElementById('user-listening-answer');
const modelListeningSentence = document.getElementById('model-listening-sentence');
const completeListeningBtn = document.getElementById('complete-listening-btn');

// -------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------
function init() {
  loadProgress();
  setupEventListeners();
  renderNavigation();
  updateProgressUI();
  selectSentence(activeSentenceId);
  setupSpeechRecognition();
}

// -------------------------------------------------------------
// PROGRESS MANAGEMENT (LocalStorage)
// -------------------------------------------------------------
function loadProgress() {
  const stored = localStorage.getItem('car_english_progress');
  if (stored) {
    userProgress = JSON.parse(stored);
  } else {
    // Initialize empty progress
    sentences.forEach(s => {
      userProgress[s.id] = { learn: false, listen: false, speak: false };
    });
    saveProgress();
  }
}

function saveProgress() {
  localStorage.setItem('car_english_progress', JSON.stringify(userProgress));
}

function markModeCompleted(sentenceId, mode) {
  if (userProgress[sentenceId]) {
    userProgress[sentenceId][mode] = true;
    saveProgress();
    updateProgressUI();
    renderNavigation();
    updateStatusBadge(sentenceId);
  }
}

function resetProgress() {
  if (confirm('すべての学習進捗をリセットしますか？')) {
    sentences.forEach(s => {
      userProgress[s.id] = { learn: false, listen: false, speak: false };
    });
    saveProgress();
    updateProgressUI();
    renderNavigation();
    selectSentence(activeSentenceId);
  }
}

function updateProgressUI() {
  // Calculate completion percentage
  // Total points = 9 sentences * 3 modes = 27 points
  const totalTasks = sentences.length * 3;
  let completedTasks = 0;

  Object.keys(userProgress).forEach(id => {
    const prog = userProgress[id];
    if (prog.learn) completedTasks++;
    if (prog.listen) completedTasks++;
    if (prog.speak) completedTasks++;
  });

  const percent = Math.round((completedTasks / totalTasks) * 100);
  mainProgress.style.width = `${percent}%`;
  progressText.textContent = `${completedTasks} / ${totalTasks} (${percent}%)`;
}

// -------------------------------------------------------------
// UI RENDERING & INTERACTION
// -------------------------------------------------------------
function renderNavigation() {
  sentenceNav.innerHTML = '';
  sentences.forEach(s => {
    const navItem = document.createElement('button');
    navItem.className = `nav-item ${s.id === activeSentenceId ? 'active' : ''}`;
    navItem.setAttribute('data-id', s.id);
    
    // Determine overall status
    const prog = userProgress[s.id] || { learn: false, listen: false, speak: false };
    let statusClass = '';
    if (prog.learn && prog.listen && prog.speak) {
      statusClass = 'completed';
    } else if (prog.learn || prog.listen || prog.speak) {
      statusClass = 'learning';
    }

    navItem.innerHTML = `
      <div class="nav-sentence-title">${s.id}. ${s.japanese}</div>
      <div class="nav-status-dot ${statusClass}"></div>
    `;

    navItem.addEventListener('click', () => {
      selectSentence(s.id);
    });

    sentenceNav.appendChild(navItem);
  });
}

function selectSentence(id) {
  activeSentenceId = id;
  const sentence = sentences.find(s => s.id === id);
  if (!sentence) return;

  // Update navigation items active class
  document.querySelectorAll('.nav-item').forEach(item => {
    if (parseInt(item.getAttribute('data-id')) === id) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Display texts
  activeIdBadge.textContent = `Sentence ${sentence.id}`;
  updateStatusBadge(sentence.id);
  displayJapanese.textContent = sentence.japanese;
  displayEnglish.textContent = sentence.english;
  displayNote.textContent = sentence.note;

  // Render grammar visualization
  renderGrammar(sentence);

  // Stop any active text-to-speech
  window.speechSynthesis.cancel();
  
  // Reset modes
  resetModeState();

  // Mark "learn" as completed automatically when selecting in learn mode
  if (activeMode === 'learn') {
    markModeCompleted(sentence.id, 'learn');
  }

  // Adjust pagination buttons disabled state
  prevBtn.disabled = id === 1;
  nextBtn.disabled = id === sentences.length;
}

function updateStatusBadge(id) {
  const prog = userProgress[id] || { learn: false, listen: false, speak: false };
  activeStatusBadge.className = 'status-badge';
  
  if (prog.learn && prog.listen && prog.speak) {
    activeStatusBadge.textContent = 'マスター';
    activeStatusBadge.classList.add('completed');
  } else if (prog.learn || prog.listen || prog.speak) {
    activeStatusBadge.textContent = '練習中';
    activeStatusBadge.classList.add('learning');
  } else {
    activeStatusBadge.textContent = '未着手';
  }
}

function renderGrammar(sentence) {
  displayGrammarVisualizer.innerHTML = '';
  sentence.elements.forEach(el => {
    const wordBlock = document.createElement('div');
    wordBlock.className = 'word-block';
    wordBlock.title = el.desc; // Hover tooltip with explanation

    const textSpan = document.createElement('span');
    textSpan.className = 'word-text';
    textSpan.textContent = el.text;

    const roleSpan = document.createElement('span');
    // Map role symbols (S1, S2 -> s, V1, V2 -> v)
    let roleClass = 'conj';
    const roleClean = el.role.replace(/[0-9]/g, '').toLowerCase();
    
    if (['s', 'v', 'o', 'c', 'm', '接'].includes(roleClean)) {
      roleClass = roleClean;
    }

    roleSpan.className = `word-role-badge role-${roleClass}`;
    roleSpan.textContent = el.role;

    wordBlock.appendChild(textSpan);
    wordBlock.appendChild(roleSpan);
    displayGrammarVisualizer.appendChild(wordBlock);
  });
}

function switchMode(mode) {
  activeMode = mode;
  
  // Update Tab buttons
  tabButtons.forEach(btn => {
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Switch panels
  if (mode === 'learn') {
    englishWrapper.classList.remove('hidden');
    listenMask.classList.add('hidden');
    grammarWrapper.classList.remove('hidden');
    noteWrapper.classList.remove('hidden');
    speakingPanel.classList.add('hidden');
    listeningPanel.classList.add('hidden');
    
    // Auto-complete learn
    markModeCompleted(activeSentenceId, 'learn');
  } 
  else if (mode === 'listen') {
    englishWrapper.classList.remove('hidden');
    listenMask.classList.remove('hidden'); // Show mask
    grammarWrapper.classList.add('hidden');
    noteWrapper.classList.add('hidden');
    speakingPanel.classList.add('hidden');
    listeningPanel.classList.remove('hidden');
  } 
  else if (mode === 'speak') {
    englishWrapper.classList.remove('hidden');
    listenMask.classList.remove('hidden'); // Hide english until spoken
    // Update mask text for speaking
    listenMask.querySelector('p').textContent = 'マイクに向かって英語を発話してください';
    grammarWrapper.classList.add('hidden');
    noteWrapper.classList.add('hidden');
    speakingPanel.classList.remove('hidden');
    listeningPanel.classList.add('hidden');
  }

  resetModeState();
}

function resetModeState() {
  // Reset Speaking panel state
  isRecording = false;
  if (recognition) recognition.stop();
  micIcon.textContent = 'mic';
  micRecordBtn.classList.remove('recording');
  micPulseRing.classList.remove('active');
  speakStatusText.textContent = 'マイクボタンを押すと録音が始まります';
  speechResultCard.classList.add('hidden');
  completeSentenceBtn.classList.add('hidden');

  // Reset Listening panel state
  listeningAnswerInput.value = '';
  listeningResultPanel.classList.add('hidden');
  completeListeningBtn.classList.add('hidden');

  // If in mask mode, hide the english text
  if (activeMode !== 'learn') {
    listenMask.classList.remove('hidden');
  }
}

// -------------------------------------------------------------
// TEXT TO SPEECH (TTS)
// -------------------------------------------------------------
function playTTS() {
  const sentence = sentences.find(s => s.id === activeSentenceId);
  if (!sentence) return;

  // Cancel any current speech
  window.speechSynthesis.cancel();

  // Create utterance with clean English string
  speechUtterance = new SpeechSynthesisUtterance(sentence.englishRaw);
  speechUtterance.lang = 'en-US';
  
  // Set speed
  speechUtterance.rate = parseFloat(speedRange.value);

  // Find a high-quality English voice if available
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(voice => voice.lang.includes('en-US') && voice.name.includes('Google')) || 
                  voices.find(voice => voice.lang.startsWith('en-'));
  if (enVoice) {
    speechUtterance.voice = enVoice;
  }

  // Animation on play start/end
  ttsPlayBtn.innerHTML = '<span class="material-icons-round">volume_up</span>再声中...';
  ttsPlayBtn.disabled = true;

  speechUtterance.onend = () => {
    ttsPlayBtn.innerHTML = '<span class="material-icons-round">volume_up</span>発音を聴く';
    ttsPlayBtn.disabled = false;
  };

  speechUtterance.onerror = () => {
    ttsPlayBtn.innerHTML = '<span class="material-icons-round">volume_up</span>発音を聴く';
    ttsPlayBtn.disabled = false;
  };

  window.speechSynthesis.speak(speechUtterance);
}

// -------------------------------------------------------------
// SPEECH RECOGNITION (Speaking Mode)
// -------------------------------------------------------------
function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    speakStatusText.textContent = 'ブラウザが音声認識に対応していません。ChromeかEdgeをご利用ください。';
    micRecordBtn.disabled = true;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isRecording = true;
    micIcon.textContent = 'fiber_manual_record';
    micRecordBtn.classList.add('recording');
    micPulseRing.classList.add('active');
    speakStatusText.textContent = '聞き取り中... お手本の英語を発音してください。';
    speechResultCard.classList.add('hidden');
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    speakStatusText.textContent = `エラーが発生しました (${event.error})。もう一度お試しください。`;
    stopRecordingUI();
  };

  recognition.onend = () => {
    stopRecordingUI();
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    evaluateSpeech(transcript);
  };
}

function stopRecordingUI() {
  isRecording = false;
  micIcon.textContent = 'mic';
  micRecordBtn.classList.remove('recording');
  micPulseRing.classList.remove('active');
}

function toggleRecording() {
  if (!recognition) return;
  
  if (isRecording) {
    recognition.stop();
  } else {
    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }
  }
}

function evaluateSpeech(userText) {
  const currentSentence = sentences.find(s => s.id === activeSentenceId);
  if (!currentSentence) return;

  const targetText = currentSentence.englishRaw;

  // Clean strings for comparison
  const cleanUser = cleanText(userText);
  const cleanTarget = cleanText(targetText);

  // Calculate similarity score
  const score = calculateSimilarity(cleanUser, cleanTarget);

  // Reveal correct answer mask
  listenMask.classList.add('hidden');

  // Display results
  userSpeechTranscript.textContent = userText;
  modelSpeechSentence.textContent = targetText;
  resultScoreNum.textContent = score;

  // Set transcript matching color
  if (score >= 80) {
    userSpeechTranscript.className = 'user-transcript matching';
    scoreEvalText.textContent = 'Excellent!';
    scoreEvalText.style.backgroundImage = 'var(--success-gradient)';
    completeSentenceBtn.classList.remove('hidden');
  } else if (score >= 50) {
    userSpeechTranscript.className = 'user-transcript';
    scoreEvalText.textContent = 'Good Effort!';
    scoreEvalText.style.backgroundImage = 'var(--primary-gradient)';
    completeSentenceBtn.classList.add('hidden');
  } else {
    userSpeechTranscript.className = 'user-transcript';
    scoreEvalText.textContent = 'Try Again!';
    scoreEvalText.style.backgroundImage = 'var(--accent-gradient)';
    completeSentenceBtn.classList.add('hidden');
  }

  // Update circular chart progress
  const dashArray = `${score}, 100`;
  scoreCircleProgress.setAttribute('stroke-dasharray', dashArray);
  
  // Set score stroke color
  if (score >= 80) {
    scoreCircleProgress.style.stroke = 'var(--success-color)';
  } else if (score >= 50) {
    scoreCircleProgress.style.stroke = 'var(--primary-color)';
  } else {
    scoreCircleProgress.style.stroke = 'var(--accent-color)';
  }

  speakStatusText.textContent = '判定が完了しました。';
  speechResultCard.classList.remove('hidden');
}

// -------------------------------------------------------------
// LISTENING MODE EVALUATION
// -------------------------------------------------------------
function evaluateListening() {
  const currentSentence = sentences.find(s => s.id === activeSentenceId);
  if (!currentSentence) return;

  const userText = listeningAnswerInput.value.trim();
  const targetText = currentSentence.englishRaw;

  if (!userText) {
    alert('英文を入力してください。');
    return;
  }

  const cleanUser = cleanText(userText);
  const cleanTarget = cleanText(targetText);

  // Simple exact check or high similarity
  const score = calculateSimilarity(cleanUser, cleanTarget);
  const isCorrect = score >= 90; // Allow slight typos for listening

  // Reveal correct answer mask
  listenMask.classList.add('hidden');

  userListeningAnswer.textContent = userText;
  modelListeningSentence.textContent = targetText;

  if (isCorrect) {
    listeningStatusHeader.className = 'listening-status correct';
    listeningStatusIcon.textContent = 'check_circle';
    listeningStatusMsg.textContent = `正解！ (スコア: ${score}点)`;
    userListeningAnswer.className = 'user-transcript matching';
    completeListeningBtn.classList.remove('hidden');
  } else {
    listeningStatusHeader.className = 'listening-status incorrect';
    listeningStatusIcon.textContent = 'error';
    listeningStatusMsg.textContent = `不一致 (スコア: ${score}点)`;
    userListeningAnswer.className = 'user-transcript';
    completeListeningBtn.classList.add('hidden');
  }

  listeningResultPanel.classList.remove('hidden');
}

// -------------------------------------------------------------
// TEXT PROCESSING UTILITIES
// -------------------------------------------------------------
function cleanText(text) {
  // Remove punctuation, convert to lowercase, trim extra spacing
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\[\]]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function calculateSimilarity(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;
  if (len1 === 0) return len2 === 0 ? 100 : 0;
  if (len2 === 0) return 0;

  // Direct word match ratio (useful for speech)
  const words1 = s1.split(' ');
  const words2 = s2.split(' ');
  let matches = 0;

  words1.forEach(w => {
    if (words2.includes(w)) {
      matches++;
    }
  });

  const wordRatio = (matches / Math.max(words1.length, words2.length)) * 100;

  // Character Levenshtein distance ratio
  const matrix = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,    // deletion
          matrix[i][j - 1] + 1,    // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  const levDist = matrix[len1][len2];
  const charRatio = ((Math.max(len1, len2) - levDist) / Math.max(len1, len2)) * 100;

  // Weighted score (50% word match + 50% character match)
  return Math.round((wordRatio + charRatio) / 2);
}

// -------------------------------------------------------------
// EVENT LISTENERS
// -------------------------------------------------------------
function setupEventListeners() {
  // Reset progress
  resetProgressBtn.addEventListener('click', resetProgress);

  // Play audio
  ttsPlayBtn.addEventListener('click', playTTS);

  // Speed slider
  speedRange.addEventListener('input', (e) => {
    speedVal.textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
  });

  // Mode switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = e.currentTarget.getAttribute('data-mode');
      switchMode(mode);
    });
  });

  // Reveal english by clicking mask
  listenMask.addEventListener('click', () => {
    listenMask.classList.add('hidden');
  });

  // Pagination
  prevBtn.addEventListener('click', () => {
    if (activeSentenceId > 1) {
      selectSentence(activeSentenceId - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (activeSentenceId < sentences.length) {
      selectSentence(activeSentenceId + 1);
    }
  });

  // Mic record (Speaking Mode)
  micRecordBtn.addEventListener('click', toggleRecording);

  // Complete sentence buttons
  completeSentenceBtn.addEventListener('click', () => {
    markModeCompleted(activeSentenceId, 'speak');
    alert('スピーキング練習をクリアしました！次の例文へ進みましょう。');
    // If not last, proceed to next
    if (activeSentenceId < sentences.length) {
      selectSentence(activeSentenceId + 1);
    }
  });

  // Listening actions
  listeningSubmitBtn.addEventListener('click', evaluateListening);

  completeListeningBtn.addEventListener('click', () => {
    markModeCompleted(activeSentenceId, 'listen');
    alert('リスニング練習をクリアしました！');
    if (activeSentenceId < sentences.length) {
      selectSentence(activeSentenceId + 1);
    }
  });

  // Make sure voices load (Chrome bug workaround)
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
      // Warm up voices
    };
  }
}

// Run app
window.addEventListener('DOMContentLoaded', init);
