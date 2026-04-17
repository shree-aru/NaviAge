/* ============================================
   NaviAge AI — Tutorial System
   Interactive step-by-step lessons
   ============================================ */

const NaviAgeTutorials = {
  currentTutorial: null,
  currentStep: 0,
  activeFilter: 'all',

  /* ── Tutorial Data ── */
  tutorials: [
    {
      id: 'video-call',
      title: 'How to Make a Video Call',
      description: 'Learn to see and talk to your family face-to-face on your device.',
      device: 'phone',
      difficulty: 'beginner',
      icon: '📹',
      steps: [
        {
          title: 'Open Your Video Call App',
          description: 'Find and tap the app you want to use. Look for FaceTime (iPhone), Google Duo, or WhatsApp on your home screen. The icon usually looks like a camera or video symbol.',
          icon: '📱'
        },
        {
          title: 'Choose Who to Call',
          description: 'Tap on the name of the person you want to call. If you don\'t see their name, tap the search bar at the top and type their name.',
          icon: '👤'
        },
        {
          title: 'Tap the Video Button',
          description: 'Look for a button that looks like a camera or says "Video." Tap it. Your front camera will turn on — you\'ll see yourself on the screen!',
          icon: '🎥'
        },
        {
          title: 'Wait for Them to Answer',
          description: 'You\'ll hear a ringing sound. Wait for the other person to pick up. When they do, you\'ll see their face on your screen!',
          icon: '⏳'
        },
        {
          title: 'End the Call',
          description: 'When you\'re done talking, tap the red button at the bottom of the screen. This hangs up the call. Great job — you made a video call! 🎉',
          icon: '✅'
        }
      ]
    },
    {
      id: 'send-email',
      title: 'How to Send an Email',
      description: 'Send a message to anyone with an email address — like sending a letter, but instant!',
      device: 'computer',
      difficulty: 'beginner',
      icon: '📧',
      steps: [
        {
          title: 'Open Your Email App',
          description: 'On your computer, open your web browser (Chrome, Safari, or Edge) and go to gmail.com. Or look for the Mail or Gmail app on your device.',
          icon: '💻'
        },
        {
          title: 'Click "Compose" or the + Button',
          description: 'Look for a button that says "Compose" or a round button with a "+" sign. It\'s usually in the top-left corner. Click it to start a new email.',
          icon: '✏️'
        },
        {
          title: 'Type the Email Address',
          description: 'In the "To" field at the top, type the email address of the person you want to write to (example: grandchild@email.com). Make sure to type it exactly right!',
          icon: '📝'
        },
        {
          title: 'Write Your Subject and Message',
          description: 'In the "Subject" line, write what your email is about (like "Hello!"). Then click in the big white area below and type your message — just like writing a letter.',
          icon: '💌'
        },
        {
          title: 'Click Send',
          description: 'When you\'re happy with your message, click the blue "Send" button (usually at the bottom). Your email is on its way! ✉️',
          icon: '🚀'
        }
      ]
    },
    {
      id: 'send-photo',
      title: 'How to Send a Photo',
      description: 'Share your favorite photos with family and friends through text message.',
      device: 'phone',
      difficulty: 'beginner',
      icon: '📸',
      steps: [
        {
          title: 'Open Your Messaging App',
          description: 'Find and tap the Messages app on your phone. It usually looks like a green or blue speech bubble on your home screen.',
          icon: '💬'
        },
        {
          title: 'Choose a Conversation',
          description: 'Tap on the name of the person you want to send the photo to. If you don\'t see them, tap the "New Message" button (usually a pencil icon) and type their name.',
          icon: '👤'
        },
        {
          title: 'Tap the Camera or Attachment Icon',
          description: 'Look near the text box at the bottom. You\'ll see a camera icon 📷 or a paperclip icon 📎. Tap it to add a photo.',
          icon: '📷'
        },
        {
          title: 'Select Your Photo',
          description: 'You\'ll see your recent photos. Tap the one you want to send. If you want to take a new photo, tap "Camera" instead.',
          icon: '🖼️'
        },
        {
          title: 'Send the Photo',
          description: 'Tap the blue or green arrow button to send. Your photo is now on its way! The person will see it in just a moment. 📨',
          icon: '✅'
        }
      ]
    },
    {
      id: 'use-google-maps',
      title: 'How to Use Google Maps',
      description: 'Find directions to any place — never get lost again!',
      device: 'phone',
      difficulty: 'intermediate',
      icon: '🗺️',
      steps: [
        {
          title: 'Open Google Maps',
          description: 'Find the Google Maps app on your phone. It looks like a colorful map pin. Tap to open it. Allow it to use your location if it asks.',
          icon: '📍'
        },
        {
          title: 'Search for a Place',
          description: 'Tap the search bar at the top of the screen. Type the name or address of where you want to go (like "Walmart" or "123 Main Street").',
          icon: '🔍'
        },
        {
          title: 'Tap "Directions"',
          description: 'After finding the place, tap the blue "Directions" button. Maps will figure out the best way to get there from where you are right now.',
          icon: '🧭'
        },
        {
          title: 'Choose How You\'re Traveling',
          description: 'At the top, you can choose: car 🚗, bus 🚌, walking 🚶, or bike 🚲. Tap the one that matches how you\'re getting there.',
          icon: '🚗'
        },
        {
          title: 'Tap "Start" and Follow Along',
          description: 'Tap the green "Start" button. The app will talk to you and tell you when to turn. Just follow the voice instructions! It\'s like having a helpful friend in the car. 🎉',
          icon: '▶️'
        }
      ]
    },
    {
      id: 'make-text-bigger',
      title: 'How to Make Text Bigger',
      description: 'Make everything on your screen easier to read by increasing the text size.',
      device: 'phone',
      difficulty: 'beginner',
      icon: '🔍',
      steps: [
        {
          title: 'Open Settings',
          description: 'Find the Settings app on your phone. On iPhone, it looks like a gray gear ⚙️. On Android, it also looks like a gear or cog wheel.',
          icon: '⚙️'
        },
        {
          title: 'Find Display Settings',
          description: 'Scroll down and tap "Display & Brightness" (iPhone) or "Display" (Android). This is where you control how things look on your screen.',
          icon: '🖥️'
        },
        {
          title: 'Tap "Text Size"',
          description: 'Look for "Text Size" or "Font Size" and tap on it. You\'ll see a slider that lets you make text bigger or smaller.',
          icon: '🔤'
        },
        {
          title: 'Drag the Slider to the Right',
          description: 'Put your finger on the slider and drag it to the RIGHT to make text bigger. You\'ll see the preview text change size as you drag.',
          icon: '👆'
        },
        {
          title: 'Done! Check How It Looks',
          description: 'Go back to your home screen and open any app. The text should now be bigger and easier to read! If it\'s too big or small, go back and adjust. 👓',
          icon: '✅'
        }
      ]
    },
    {
      id: 'connect-wifi',
      title: 'How to Connect to WiFi',
      description: 'Connect to the internet at home, at a café, or at the library.',
      device: 'tablet',
      difficulty: 'beginner',
      icon: '📶',
      steps: [
        {
          title: 'Open Settings',
          description: 'Find and tap the Settings app on your device. It looks like a gear or cog wheel ⚙️.',
          icon: '⚙️'
        },
        {
          title: 'Tap "WiFi"',
          description: 'In Settings, look for "WiFi" or "Wi-Fi" near the top of the list. Tap on it. Make sure the WiFi switch is turned ON (it should be green or blue).',
          icon: '📶'
        },
        {
          title: 'Choose Your Network',
          description: 'You\'ll see a list of WiFi networks. Find the name of your home WiFi (it\'s usually written on the back of your router — the box from your internet company).',
          icon: '📋'
        },
        {
          title: 'Enter the Password',
          description: 'Tap on your network name. It will ask for a password. Type the WiFi password (also written on the back of your router, sometimes called "Key" or "Passphrase"). Then tap "Join" or "Connect."',
          icon: '🔑'
        },
        {
          title: 'You\'re Connected!',
          description: 'You\'ll see a checkmark ✓ next to your network name. You\'re now connected to the internet! You can browse websites, watch videos, and more. 🌐',
          icon: '✅'
        }
      ]
    },
    {
      id: 'take-photo',
      title: 'How to Take a Photo',
      description: 'Learn to capture beautiful moments with your phone camera.',
      device: 'phone',
      difficulty: 'beginner',
      icon: '📷',
      steps: [
        {
          title: 'Open the Camera App',
          description: 'Find the Camera app on your phone. It looks like a camera 📷. You can also swipe left from the lock screen on iPhone to quickly open it.',
          icon: '📷'
        },
        {
          title: 'Point at What You Want to Photograph',
          description: 'Hold your phone steady and point it at what you want to take a picture of. You\'ll see the image on your screen — this is your viewfinder.',
          icon: '🎯'
        },
        {
          title: 'Tap the Big Round Button',
          description: 'At the bottom of the screen, you\'ll see a big round white button. Tap it once to take the photo. Hold your phone still when you tap!',
          icon: '⚪'
        },
        {
          title: 'View Your Photo',
          description: 'After taking the photo, you\'ll see a small preview in the corner. Tap it to see your photo in full size. Your photo is automatically saved!',
          icon: '🖼️'
        },
        {
          title: 'Find Your Photos Later',
          description: 'All your photos are saved in the Photos app (iPhone) or Gallery app (Android). Open it anytime to look at your pictures. 📸',
          icon: '✅'
        }
      ]
    },
    {
      id: 'use-browser',
      title: 'How to Browse the Internet',
      description: 'Search for anything online — recipes, news, health info, and more.',
      device: 'computer',
      difficulty: 'beginner',
      icon: '🌐',
      steps: [
        {
          title: 'Open Your Web Browser',
          description: 'Look for Chrome (colorful circle), Safari (compass), or Edge (blue "e") on your computer or tablet. Double-click or tap to open it.',
          icon: '🌐'
        },
        {
          title: 'Click the Address Bar',
          description: 'At the very top of the screen, you\'ll see a long white bar. Click/tap on it. This is where you type web addresses or search for things.',
          icon: '🔗'
        },
        {
          title: 'Type What You\'re Looking For',
          description: 'Type what you want to find. For example: "easy chicken soup recipe" or "weather today." You don\'t need to type a website address — just describe what you want!',
          icon: '⌨️'
        },
        {
          title: 'Press Enter',
          description: 'After typing, press the Enter key on your keyboard (or tap "Search" / "Go" on your phone). You\'ll see a list of results.',
          icon: '↩️'
        },
        {
          title: 'Click on a Result',
          description: 'Click on any result that looks helpful. The blue text are links — they take you to different websites. To go back, click the ← arrow at the top left. 🎉',
          icon: '✅'
        }
      ]
    }
  ],

  init() {
    this.renderTutorialList();
  },

  renderTutorialList() {
    const container = document.getElementById('tutorial-list');
    if (!container) return;

    const filtered = this.activeFilter === 'all' 
      ? this.tutorials 
      : this.tutorials.filter(t => t.device === this.activeFilter);

    container.innerHTML = filtered.map(tutorial => `
      <div class="card card-interactive tutorial-card animate-fade-in" onclick="NaviAge.Tutorials.openTutorial('${tutorial.id}')">
        <div class="tutorial-image">${tutorial.icon}</div>
        <div class="tutorial-meta">
          <span class="tutorial-difficulty ${tutorial.difficulty}">${tutorial.difficulty === 'beginner' ? '🟢 Beginner' : '🟡 Intermediate'}</span>
          <span class="tutorial-steps-count">${tutorial.steps.length} steps</span>
        </div>
        <h3 class="card-title">${tutorial.title}</h3>
        <p class="card-description">${tutorial.description}</p>
      </div>
    `).join('');
  },

  filterByDevice(device) {
    this.activeFilter = device;

    // Update tab UI
    document.querySelectorAll('.device-tab[data-device]').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.device === device);
    });

    this.renderTutorialList();
  },

  openTutorial(id) {
    this.currentTutorial = this.tutorials.find(t => t.id === id);
    if (!this.currentTutorial) return;

    this.currentStep = 0;

    // Hide list, show detail
    document.getElementById('tutorial-list').style.display = 'none';
    document.querySelector('.tutorials-header').style.display = 'none';
    document.getElementById('device-tabs').style.display = 'none';
    
    const detail = document.getElementById('tutorial-detail');
    detail.style.display = '';

    document.getElementById('tutorial-detail-title').textContent = 
      this.currentTutorial.icon + ' ' + this.currentTutorial.title;
    document.getElementById('tutorial-detail-description').textContent = 
      this.currentTutorial.description;

    this.renderCurrentStep();
  },

  renderCurrentStep() {
    const tutorial = this.currentTutorial;
    if (!tutorial) return;

    const step = tutorial.steps[this.currentStep];
    const total = tutorial.steps.length;
    const progress = Math.round(((this.currentStep + 1) / total) * 100);

    // Update progress
    document.getElementById('tutorial-progress-text').textContent = 
      `Step ${this.currentStep + 1} of ${total}`;
    document.getElementById('tutorial-progress-percent').textContent = `${progress}%`;
    document.getElementById('tutorial-progress-bar').style.width = `${progress}%`;

    // Render step card
    const container = document.getElementById('tutorial-steps-container');
    container.innerHTML = `
      <div class="tutorial-step-card active animate-fade-in">
        <div class="step-illustration">${step.icon}</div>
        <div class="step" style="margin-bottom: 0;">
          <div class="step-number" style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: white; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
            ${this.currentStep + 1}
          </div>
          <div class="step-content">
            <h3 class="step-title">${step.title}</h3>
            <p class="step-description">${step.description}</p>
          </div>
        </div>
      </div>
    `;

    // Update navigation buttons
    const prevBtn = document.getElementById('tutorial-prev-btn');
    const nextBtn = document.getElementById('tutorial-next-btn');

    prevBtn.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';
    
    if (this.currentStep === total - 1) {
      nextBtn.innerHTML = '🎉 Complete!';
      nextBtn.classList.remove('btn-primary');
      nextBtn.classList.add('btn-success');
    } else {
      nextBtn.innerHTML = 'Next <i data-lucide="arrow-right" class="icon"></i>';
      nextBtn.classList.remove('btn-success');
      nextBtn.classList.add('btn-primary');
    }

    // Re-render icons
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  nextStep() {
    if (!this.currentTutorial) return;
    
    if (this.currentStep < this.currentTutorial.steps.length - 1) {
      this.currentStep++;
      this.renderCurrentStep();
    } else {
      // Tutorial complete — go back to list
      this.backToList();
    }
  },

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderCurrentStep();
    }
  },

  backToList() {
    this.currentTutorial = null;
    this.currentStep = 0;

    document.getElementById('tutorial-detail').style.display = 'none';
    document.getElementById('tutorial-list').style.display = '';
    document.querySelector('.tutorials-header').style.display = '';
    document.getElementById('device-tabs').style.display = '';
  }
};
