/* ============================================
   NaviAge AI — Accessibility Controller
   Font sizing, contrast, motion, preferences
   ============================================ */

const NaviAgeAccessibility = {
  preferences: {
    fontSize: 'default',
    highContrast: false,
    reducedMotion: false,
    voiceEnabled: true,
    ttsEnabled: false
  },

  init() {
    this.loadPreferences();
    this.applyAll();
  },

  loadPreferences() {
    try {
      const saved = localStorage.getItem('naviage-preferences');
      if (saved) {
        this.preferences = { ...this.preferences, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.log('Could not load preferences');
    }
  },

  savePreferences() {
    try {
      localStorage.setItem('naviage-preferences', JSON.stringify(this.preferences));
    } catch (e) {
      console.log('Could not save preferences');
    }
  },

  applyAll() {
    this.applyFontSize();
    this.applyHighContrast();
    this.applyReducedMotion();
    this.syncUI();
  },

  /* ── Font Size ── */
  setFontSize(size) {
    this.preferences.fontSize = size;
    this.applyFontSize();
    this.savePreferences();
    this.syncUI();
  },

  applyFontSize() {
    const html = document.documentElement;
    html.classList.remove('font-large', 'font-xl', 'font-max');
    
    switch (this.preferences.fontSize) {
      case 'large':
        html.classList.add('font-large');
        break;
      case 'xl':
        html.classList.add('font-xl');
        break;
      case 'max':
        html.classList.add('font-max');
        break;
    }
  },

  /* ── High Contrast ── */
  toggleHighContrast() {
    this.preferences.highContrast = !this.preferences.highContrast;
    this.applyHighContrast();
    this.savePreferences();
  },

  applyHighContrast() {
    document.documentElement.classList.toggle('high-contrast', this.preferences.highContrast);
    const toggle = document.getElementById('high-contrast-toggle');
    if (toggle) toggle.checked = this.preferences.highContrast;
  },

  /* ── Reduced Motion ── */
  toggleReducedMotion() {
    this.preferences.reducedMotion = !this.preferences.reducedMotion;
    this.applyReducedMotion();
    this.savePreferences();
  },

  applyReducedMotion() {
    document.body.classList.toggle('reduced-motion', this.preferences.reducedMotion);
    const toggle = document.getElementById('reduce-motion-toggle');
    if (toggle) toggle.checked = this.preferences.reducedMotion;
  },

  /* ── Voice ── */
  toggleVoice() {
    this.preferences.voiceEnabled = !this.preferences.voiceEnabled;
    this.savePreferences();
    const toggle = document.getElementById('voice-enabled-toggle');
    if (toggle) toggle.checked = this.preferences.voiceEnabled;
    
    // Show/hide voice button
    const voiceBtn = document.getElementById('voice-input-btn');
    if (voiceBtn) voiceBtn.style.display = this.preferences.voiceEnabled ? '' : 'none';
  },

  /* ── TTS ── */
  toggleTTS() {
    this.preferences.ttsEnabled = !this.preferences.ttsEnabled;
    this.savePreferences();
    const toggle = document.getElementById('tts-enabled-toggle');
    if (toggle) toggle.checked = this.preferences.ttsEnabled;
  },

  /* ── Sync UI controls ── */
  syncUI() {
    // Font size selector
    const fontBtns = document.querySelectorAll('.font-size-option');
    fontBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.size === this.preferences.fontSize);
    });

    // Toggles
    const hcToggle = document.getElementById('high-contrast-toggle');
    if (hcToggle) hcToggle.checked = this.preferences.highContrast;

    const rmToggle = document.getElementById('reduce-motion-toggle');
    if (rmToggle) rmToggle.checked = this.preferences.reducedMotion;

    const voiceToggle = document.getElementById('voice-enabled-toggle');
    if (voiceToggle) voiceToggle.checked = this.preferences.voiceEnabled;

    const ttsToggle = document.getElementById('tts-enabled-toggle');
    if (ttsToggle) ttsToggle.checked = this.preferences.ttsEnabled;

    // Voice button visibility
    const voiceBtn = document.getElementById('voice-input-btn');
    if (voiceBtn) voiceBtn.style.display = this.preferences.voiceEnabled ? '' : 'none';
  },

  /* ── Reset ── */
  resetAll() {
    this.preferences = {
      fontSize: 'default',
      highContrast: false,
      reducedMotion: false,
      voiceEnabled: true,
      ttsEnabled: false
    };
    this.applyAll();
    this.savePreferences();
  }
};
