/* ============================================
   NaviAge AI — Scam Detection Trainer
   Interactive quiz with AI-powered analysis
   ============================================ */

const NaviAgeScamTrainer = {
  score: 0,
  streak: 0,
  currentIndex: 0,
  answered: 0,
  hasAnswered: false,

  /* ── Scam Scenarios ── */
  scenarios: [
    {
      type: 'email',
      from: 'Apple Support <security-alert@app1e-verify.com>',
      subject: '⚠️ Your Apple ID has been locked!',
      content: 'Dear Customer, We detected unusual activity on your Apple ID. Your account will be permanently disabled unless you verify your identity within 24 hours. Click the link below to verify: www.apple-secure-verify.com/login',
      isScam: true,
      explanation: 'This is a SCAM! Real Apple will never email you a random link to "verify" your account. Notice the fake email address (app1e with number "1" instead of letter "l") and the urgency ("24 hours"). Apple would never threaten to disable your account through email.',
      redFlags: ['Fake email address with "1" instead of "l"', 'Creates urgency with "24 hours" threat', 'Suspicious link that isn\'t actually apple.com']
    },
    {
      type: 'text',
      from: 'Unknown Number (+1-555-0123)',
      subject: 'Text Message',
      content: 'Congratulations! You\'ve won a $1,000 Walmart gift card! Claim your prize now before it expires: bit.ly/free-walmart-prize. Reply STOP to opt out.',
      isScam: true,
      explanation: 'This is a SCAM! You cannot win a prize for a contest you never entered. Legitimate companies don\'t send prizes through random text messages. The shortened link (bit.ly) hides a dangerous website. Never click links in unexpected messages.',
      redFlags: ['Prize for a contest you never entered', 'Shortened/hidden link (bit.ly)', 'Urgency: "before it expires"']
    },
    {
      type: 'email',
      from: 'Dr. Sarah Mitchell <sarah.mitchell@cityhospital.org>',
      subject: 'Your Appointment Reminder',
      content: 'Hi, this is a reminder that your annual check-up is scheduled for next Tuesday at 2:00 PM at City Medical Center, 450 Health Blvd. Please bring your insurance card. Call us at (555) 123-4567 if you need to reschedule. Best regards, Dr. Mitchell\'s Office',
      isScam: false,
      explanation: 'This is SAFE! This looks like a legitimate appointment reminder. It has specific details (date, time, address), a real phone number to call, and doesn\'t ask you to click any links or share personal information.',
      redFlags: []
    },
    {
      type: 'phone',
      from: 'Caller ID: "Social Security Admin"',
      subject: 'Phone Call',
      content: '"This is the Social Security Administration. Your Social Security number has been suspended due to suspicious activity. Press 1 to speak to an agent immediately, or a warrant will be issued for your arrest."',
      isScam: true,
      explanation: 'This is a SCAM! The Social Security Administration will NEVER call you to say your number is "suspended" — that\'s not how it works. They will never threaten arrest over the phone. And they will never ask you to press a button to connect. If you\'re worried, hang up and call SSA directly at 1-800-772-1213.',
      redFlags: ['SSA never calls to say your number is "suspended"', 'Threatens arrest (government agencies don\'t do this)', 'Requires immediate action to avoid consequences']
    },
    {
      type: 'email',
      from: 'Amazon.com <order-update@amazon.com>',
      subject: 'Your order has shipped!',
      content: 'Your order #123-4567890-1234567 has been shipped and is on its way! Estimated delivery: Thursday. Track your package at amazon.com. Thank you for shopping with us!',
      isScam: false,
      explanation: 'This appears to be SAFE! The email is from amazon.com (a real domain), mentions a specific order number, doesn\'t ask for personal info, and links to the real amazon.com website. If you did place an order, this is normal.',
      redFlags: []
    },
    {
      type: 'text',
      from: 'Your Bank (555-1234)',
      subject: 'Text Message',
      content: 'ALERT: Your debit card ending in 4589 has been charged $534.99 at ELECTRONICS STORE. If this wasn\'t you, reply YES to cancel or call 1-800-555-FAKE immediately.',
      isScam: true,
      explanation: 'This is likely a SCAM! Real banks may text about suspicious charges, but they will never ask you to reply to a text to "cancel" a charge. They wouldn\'t use a suspicious phone number. If you\'re concerned, call the number on the BACK of your actual bank card, not the number in the text.',
      redFlags: ['Asks you to reply to cancel a charge (banks don\'t do this)', 'Phone number doesn\'t match your bank', 'Creates panic about a large charge']
    },
    {
      type: 'email',
      from: 'Nigerian Prince <prince.abubakar@money.ng>',
      subject: 'Urgent Business Proposal - $10.5 Million USD',
      content: 'Dear Friend, I am Prince Abubakar, and I need your help to transfer $10.5 million USD out of my country. In return, you will receive 30% ($3.15 million). Please reply with your bank account details and full name to begin the process.',
      isScam: true,
      explanation: 'This is a CLASSIC SCAM! No real prince is emailing strangers for help with millions of dollars. This is called a "419 scam" or "advance fee fraud." They will eventually ask you to pay fees to "release" the money. NEVER share your bank details with strangers.',
      redFlags: ['Stranger offering millions of dollars', 'Requests bank account details', 'Too good to be true — it always is!']
    },
    {
      type: 'email',
      from: 'Library System <notifications@publiclibrary.org>',
      subject: 'Book Return Reminder',
      content: 'Hello, this is a friendly reminder that "The Great Gatsby" is due back at the Central Library by Friday. You can renew online at publiclibrary.org or call us at (555) 789-0123. Thank you!',
      isScam: false,
      explanation: 'This is SAFE! This is a standard library reminder. It mentions a specific book, provides real contact info, and doesn\'t ask for any personal information or payment. Libraries regularly send these kinds of reminders.',
      redFlags: []
    },
    {
      type: 'phone',
      from: 'Caller ID: "IRS Tax Department"',
      subject: 'Phone Call',
      content: '"You owe $3,400 in back taxes. If you do not pay within 2 hours using gift cards from Walmart or Target, police will come to arrest you today. Do not hang up or your case will be escalated."',
      isScam: true,
      explanation: 'This is a SCAM! The IRS NEVER asks for payment through gift cards — that\'s an instant red flag. The IRS contacts people by mail first, never through threatening phone calls. And no government agency will demand payment in gift cards. Hang up immediately!',
      redFlags: ['IRS never demands payment by gift card', 'Threatening arrest to create panic', 'Demands immediate payment (2 hours)']
    },
    {
      type: 'text',
      from: 'Grandchild? (Unknown Number)',
      subject: 'Text Message',
      content: 'Hi Grandma/Grandpa! It\'s me, your grandkid. I\'m in trouble and need $2,000 right away. Please don\'t tell Mom and Dad. Can you send it through Venmo or Zelle? I\'ll explain everything later. Love you!',
      isScam: true,
      explanation: 'This is the "GRANDPARENT SCAM" — one of the most common scams targeting seniors! Scammers pretend to be a grandchild in trouble. They ask for money and say "don\'t tell anyone." ALWAYS call your grandchild directly on their real phone number to verify. Never send money based on a text alone.',
      redFlags: ['"Don\'t tell Mom and Dad" — scammers isolate victims', 'Vague about who they are — waits for YOU to say a name', 'Urgency and emotional manipulation']
    }
  ],

  init() {
    this.loadProgress();
    this.renderScenario();
  },

  loadProgress() {
    try {
      const saved = localStorage.getItem('naviage-scam-progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.score = data.score || 0;
        this.streak = data.streak || 0;
        this.answered = data.answered || 0;
        this.currentIndex = data.currentIndex || 0;
      }
    } catch (e) {}
    this.updateStats();
  },

  saveProgress() {
    try {
      localStorage.setItem('naviage-scam-progress', JSON.stringify({
        score: this.score,
        streak: this.streak,
        answered: this.answered,
        currentIndex: this.currentIndex
      }));
    } catch (e) {}
  },

  updateStats() {
    const scoreEl = document.getElementById('scam-score');
    const streakEl = document.getElementById('scam-streak');
    const totalEl = document.getElementById('scam-total');

    if (scoreEl) scoreEl.textContent = this.score;
    if (streakEl) streakEl.textContent = this.streak;
    if (totalEl) totalEl.textContent = `${this.answered}/${this.scenarios.length}`;
  },

  renderScenario() {
    const container = document.getElementById('scam-scenario');
    const resultContainer = document.getElementById('scam-result');
    if (!container) return;

    // Wrap index
    const idx = this.currentIndex % this.scenarios.length;
    const scenario = this.scenarios[idx];
    this.hasAnswered = false;

    // Hide result
    if (resultContainer) {
      resultContainer.style.display = 'none';
      resultContainer.innerHTML = '';
    }

    const typeIcons = { email: '📧', text: '💬', phone: '📞' };
    const typeLabels = { email: 'Email', text: 'Text Message', phone: 'Phone Call' };

    container.innerHTML = `
      <div class="scam-scenario-label">
        <span>${typeIcons[scenario.type]}</span>
        ${typeLabels[scenario.type]} — Is this real or a scam?
      </div>
      <div class="scam-message-preview">
        <span class="from-label">From: ${this.escapeHtml(scenario.from)}</span>
        ${scenario.subject !== 'Text Message' && scenario.subject !== 'Phone Call' ? `<span class="from-label" style="color: var(--color-text-secondary);">Subject: ${this.escapeHtml(scenario.subject)}</span>` : ''}
        <p style="margin-top: var(--space-3); margin-bottom: 0; white-space: pre-line;">${this.escapeHtml(scenario.content)}</p>
      </div>
      <div class="scam-actions">
        <button class="btn btn-danger btn-lg" onclick="NaviAge.ScamTrainer.answer(true)" style="flex:1;">
          🚨 This is a SCAM!
        </button>
        <button class="btn btn-success btn-lg" onclick="NaviAge.ScamTrainer.answer(false)" style="flex:1;">
          ✅ This is SAFE
        </button>
      </div>
    `;
  },

  answer(userSaidScam) {
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    const idx = this.currentIndex % this.scenarios.length;
    const scenario = this.scenarios[idx];
    const isCorrect = (userSaidScam === scenario.isScam);

    this.answered++;
    if (isCorrect) {
      this.score++;
      this.streak++;
    } else {
      this.streak = 0;
    }

    this.updateStats();
    this.saveProgress();

    // Show result
    const resultContainer = document.getElementById('scam-result');
    if (!resultContainer) return;

    const redFlagsHtml = scenario.redFlags.length > 0 
      ? `<div style="margin-top: var(--space-4);">
          <strong>🔍 Warning signs to look for:</strong>
          <ul style="margin-top: var(--space-2); padding-left: var(--space-6); list-style: disc;">
            ${scenario.redFlags.map(f => `<li style="margin-bottom: var(--space-2); color: var(--color-text-secondary);">${f}</li>`).join('')}
          </ul>
        </div>` 
      : '';

    resultContainer.className = `scam-result ${isCorrect ? 'correct' : 'incorrect'}`;
    resultContainer.style.display = '';
    resultContainer.innerHTML = `
      <div class="scam-result-title">
        ${isCorrect ? '✅ Correct!' : '❌ Not quite right'}
        ${isCorrect && this.streak >= 3 ? `<span class="badge badge-warning">🔥 ${this.streak} streak!</span>` : ''}
      </div>
      <p class="scam-result-explanation">${scenario.explanation}</p>
      ${redFlagsHtml}
      <button class="btn btn-primary" onclick="NaviAge.ScamTrainer.next()" style="margin-top: var(--space-6);">
        Next Scenario →
      </button>
    `;

    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  next() {
    this.currentIndex++;
    this.saveProgress();
    this.renderScenario();

    // Scroll to top of quiz
    const quizCard = document.getElementById('scam-quiz-card');
    if (quizCard) quizCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  /* ── AI Scam Checker ── */
  async checkWithAI() {
    const input = document.getElementById('scam-checker-input');
    const resultDiv = document.getElementById('scam-ai-result');
    const btn = document.getElementById('scam-check-btn');
    
    if (!input || !resultDiv || !btn) return;
    
    const text = input.value.trim();
    if (!text) {
      input.focus();
      input.style.borderColor = 'var(--color-danger)';
      setTimeout(() => input.style.borderColor = '', 2000);
      return;
    }

    // Show loading
    btn.disabled = true;
    btn.innerHTML = '<span class="chat-typing" style="padding:0;"><span></span><span></span><span></span></span> Analyzing...';
    resultDiv.style.display = '';
    resultDiv.innerHTML = '<p style="text-align:center;margin:0;">🔍 AI is analyzing this message...</p>';

    try {
      const analysis = await NaviAgeAI.analyzeScam(text);
      resultDiv.innerHTML = `
        <div style="line-height: 1.8;">
          ${this.formatAnalysis(analysis)}
        </div>
      `;
    } catch (error) {
      resultDiv.innerHTML = `
        <p style="color: var(--color-danger);">
          Sorry, I couldn't analyze that right now. Please check your internet connection and try again.
        </p>
      `;
    }

    btn.disabled = false;
    btn.innerHTML = '<i data-lucide="scan" class="icon"></i> Analyze for Scams';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  formatAnalysis(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>')
      .replace(/^[•\-]\s/gm, '&bull; ')
      .replace(/🚨\s*SCAM/g, '<span style="color: var(--color-danger); font-weight: 700; font-size: 1.2em;">🚨 SCAM</span>')
      .replace(/⚠️\s*SUSPICIOUS/g, '<span style="color: var(--color-warning); font-weight: 700; font-size: 1.2em;">⚠️ SUSPICIOUS</span>')
      .replace(/✅\s*SAFE/g, '<span style="color: var(--color-success); font-weight: 700; font-size: 1.2em;">✅ SAFE</span>');
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};
