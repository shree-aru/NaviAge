/* ============================================
   NaviAge AI — Voice Controller
   Web Speech API for voice input & TTS output
   ============================================ */

const NaviAgeVoice = {
  recognition: null,
  isListening: false,
  synthesis: window.speechSynthesis,

  init() {
    // Check for Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          if (finalTranscript) {
            chatInput.value = finalTranscript;
            // Auto-send after voice input
            setTimeout(() => {
              if (typeof NaviAge !== 'undefined' && NaviAge.AI) {
                NaviAge.AI.sendMessage();
              }
            }, 300);
          } else {
            chatInput.value = interimTranscript;
          }
        }
      };

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateUI();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateUI();
      };

      this.recognition.onerror = (event) => {
        console.log('Speech recognition error:', event.error);
        this.isListening = false;
        this.updateUI();
        
        if (event.error === 'not-allowed') {
          this.showPermissionMessage();
        }
      };
    } else {
      // Hide voice button if not supported
      const voiceBtn = document.getElementById('voice-input-btn');
      if (voiceBtn) voiceBtn.style.display = 'none';
    }
  },

  toggleListening() {
    if (!this.recognition) {
      this.showNotSupportedMessage();
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
    } else {
      try {
        this.recognition.start();
      } catch (e) {
        console.log('Recognition already started');
      }
    }
  },

  updateUI() {
    const voiceBtn = document.getElementById('voice-input-btn');
    if (!voiceBtn) return;

    if (this.isListening) {
      voiceBtn.classList.add('btn-danger');
      voiceBtn.classList.remove('btn-ghost');
      voiceBtn.innerHTML = '<i data-lucide="mic-off" style="width:24px;height:24px;"></i>';
      voiceBtn.setAttribute('aria-label', 'Stop listening');
      
      // Pulse animation
      voiceBtn.style.animation = 'pulse 1.5s infinite';
    } else {
      voiceBtn.classList.remove('btn-danger');
      voiceBtn.classList.add('btn-ghost');
      voiceBtn.innerHTML = '<i data-lucide="mic" style="width:24px;height:24px;"></i>';
      voiceBtn.setAttribute('aria-label', 'Voice input');
      voiceBtn.style.animation = '';
    }

    // Re-render Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  /* ── Text-to-Speech ── */
  speak(text) {
    if (!this.synthesis) return;
    if (!NaviAgeAccessibility.preferences.ttsEnabled) return;

    // Cancel any current speech
    this.synthesis.cancel();

    // Clean text (remove markdown, emojis, etc.)
    const cleanText = text
      .replace(/[#*_~`]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/•/g, '')
      .replace(/[^\w\s.,?!;:'-]/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.85; // Slightly slower for seniors
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    // Try to find a nice voice
    const voices = this.synthesis.getVoices();
    const preferred = voices.find(v => v.name.includes('Samantha')) ||
                      voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
                      voices.find(v => v.lang.startsWith('en'));
    if (preferred) {
      utterance.voice = preferred;
    }

    this.synthesis.speak(utterance);
  },

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  },

  showPermissionMessage() {
    alert('Please allow microphone access in your browser settings to use voice input.');
  },

  showNotSupportedMessage() {
    alert('Voice input is not supported in this browser. Please try using Google Chrome.');
  }
};
