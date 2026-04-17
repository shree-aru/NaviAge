/* ============================================
   NaviAge AI — Main Application Controller
   Navigation, Quick Help, and Initialization
   ============================================ */

const NaviAgeHelp = {
  activeCategory: 'all',
  
  helpCards: [
    {
      id: 'h1',
      category: 'screen',
      title: 'My screen is frozen',
      icon: '❄️',
      steps: [
        'Don\'t panic! This happens sometimes.',
        'Press and hold the Power button on your device for about 10-15 seconds.',
        'The screen will go dark. Wait a few seconds.',
        'Press the Power button again to turn it back on. Everything should work normally now!'
      ]
    },
    {
      id: 'h2',
      category: 'sound',
      title: 'I can\'t hear anything',
      icon: '🔇',
      steps: [
        'Look at the side of your phone or tablet for the volume buttons.',
        'Press the top button (Volume Up) a few times.',
        'If on an iPhone, check the small switch above the volume buttons — make sure you don\'t see orange (that means it\'s muted).',
        'Check if you accidentally connected Bluetooth headphones. Go to Settings > Bluetooth and turn it off to check.'
      ]
    },
    {
      id: 'h3',
      category: 'internet',
      title: 'My internet isn\'t working',
      icon: '📶',
      steps: [
        'First, check if airplane mode is on. Look for an airplane icon ✈️ at the top of your screen.',
        'If it is, go to Settings and turn Airplane Mode OFF.',
        'Next, go to Settings > Wi-Fi. Turn it completely OFF, wait 5 seconds, and turn it back ON.',
        'If it still doesn\'t work, try restarting your device (turn it off and back on).'
      ]
    },
    {
      id: 'h4',
      category: 'apps',
      title: 'An app keeps crashing',
      icon: '💥',
      steps: [
        'Close the app completely. Swipe up from the bottom of your screen and swipe the app away.',
        'Open the app again to see if it works.',
        'If it still crashes, try restarting your device completely.',
        'If it NEVER works, you might need to go to the App Store and see if there is an "Update" available for it.'
      ]
    },
    {
      id: 'h5',
      category: 'security',
      title: 'I think I got a virus',
      icon: '🦠',
      steps: [
        'Phones and tablets rarely get actual "viruses". Usually, it\'s just a deceptive website trying to scare you.',
        'If a website says "Your phone is infected!", DO NOT click any buttons on that website.',
        'Close all your internet browser tabs and clear your browsing history in Settings.',
        'Never install an app just because a website told you to.'
      ]
    },
    {
      id: 'h6',
      category: 'screen',
      title: 'Text is too small to read',
      icon: '🔍',
      steps: [
        'Go to Settings on your device.',
        'Look for "Display & Brightness" or "Accessibility".',
        'Find "Text Size" or "Font Size".',
        'Drag the slider to make the text bigger until it is comfortable to read.'
      ]
    }
  ],

  init() {
    this.renderHelpCards();
  },

  renderHelpCards() {
    const grid = document.getElementById('help-grid');
    if (!grid) return;

    const filtered = this.activeCategory === 'all' 
      ? this.helpCards 
      : this.helpCards.filter(c => c.category === this.activeCategory);

    grid.innerHTML = filtered.map(card => `
      <div class="help-card" onclick="this.classList.toggle('expanded')">
        <div class="help-card-header">
          <div class="help-card-icon" style="background: var(--color-primary-bg); color: var(--color-primary);">
            ${card.icon}
          </div>
          <div class="help-card-title">${card.title}</div>
          <i data-lucide="chevron-down" style="margin-left:auto; transition: transform 0.3s;" class="accordion-icon"></i>
        </div>
        <div class="help-card-steps">
          ${card.steps.map((step, index) => `
            <div class="help-step">
              <div class="help-step-num">${index + 1}</div>
              <div class="help-step-text">${step}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  filterByCategory(category) {
    this.activeCategory = category;

    // Update tabs
    const tabs = document.querySelectorAll('#help-categories .device-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });

    this.renderHelpCards();
  }
};


/* Main Application Orchestrator */
const NaviAge = {
  activePage: 'home',

  init() {
    console.log("NaviAge AI Initializing...");
    
    // Initialize subsystems
    if (typeof NaviAgeAccessibility !== 'undefined') {
      NaviAgeAccessibility.init();
      this.Accessibility = NaviAgeAccessibility;
    }
    
    if (typeof NaviAgeVoice !== 'undefined') {
      NaviAgeVoice.init();
      this.Voice = NaviAgeVoice;
    }
    
    if (typeof NaviAgeAI !== 'undefined') {
      NaviAgeAI.init();
      this.AI = NaviAgeAI;
    }
    
    if (typeof NaviAgeTutorials !== 'undefined') {
      NaviAgeTutorials.init();
      this.Tutorials = NaviAgeTutorials;
    }
    
    if (typeof NaviAgeScamTrainer !== 'undefined') {
      NaviAgeScamTrainer.init();
      this.ScamTrainer = NaviAgeScamTrainer;
    }

    NaviAgeHelp.init();
    this.Help = NaviAgeHelp;

    // Set up accessibility header button
    const accBtn = document.getElementById('accessibility-toggle-btn');
    if (accBtn) {
      accBtn.addEventListener('click', () => {
        this.navigateTo('settings');
      });
    }

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    
    // Check hash for direct navigation
    this.handleHashChange();
    window.addEventListener('hashchange', () => this.handleHashChange());
  },

  handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`page-${hash}`)) {
      this.navigateTo(hash, false);
    }
  },

  navigateTo(pageId, updateHash = true) {
    // Hide current page
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });

    // Show new page
    const newPage = document.getElementById(`page-${pageId}`);
    if (newPage) {
      newPage.classList.add('active');
      this.activePage = pageId;
      
      // Update hash without triggering hashchange event loop
      if (updateHash) {
        history.pushState(null, null, `#${pageId}`);
      }

      // Update bottom navigation
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === pageId);
      });

      // Special handling per page
      this.onPageVisible(pageId);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  },
  
  onPageVisible(pageId) {
    if (pageId === 'assistant') {
      const input = document.getElementById('chat-input');
      if (input) {
        // Focus input after a short delay to allow transition
        setTimeout(() => input.focus(), 300);
      }
    } else if (pageId === 'home') {
      // Re-trigger animations by removing and adding class
      const animatedElements = document.querySelectorAll('#page-home .animate-fade-in-up');
      animatedElements.forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '0';
        void el.offsetWidth; // Trigger reflow
        el.style.animation = null;
      });
    }
  },

  askQuickQuestion(question) {
    this.navigateTo('assistant');
    // Allow page to transition before sending message
    setTimeout(() => {
      if (this.AI) {
        this.AI.sendMessage(question);
      }
    }, 400);
  }
};

// Start application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  NaviAge.init();
});
