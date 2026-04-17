/* ============================================
   NaviAge AI — AI Assistant
   Google Gemini API integration for chat
   ============================================ */

const NaviAgeAI = {
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
  
  getApiKey() {
    return localStorage.getItem('naviAgeApiKey') || '';
  },

  chatHistory: [],
  isLoading: false,

  SYSTEM_PROMPT: `You are NaviAge AI, a warm, patient, and friendly technology assistant designed specifically for senior citizens (ages 65+). 

IMPORTANT RULES:
1. Use VERY SIMPLE language. Avoid all technical jargon.
2. Explain things step by step, numbering each step clearly.
3. Be encouraging and patient — say things like "Great question!" and "You're doing great!"
4. Keep answers SHORT and focused — maximum 3-4 short paragraphs.
5. When explaining where to find something on a device, be VERY specific (e.g., "Look at the bottom of your screen" or "Tap the icon that looks like a gear/cog wheel").
6. Use analogies seniors can relate to (mailbox for email, phone book for contacts, etc.).
7. Always end by asking if they need more help or if something was unclear.
8. If asked about scams, be very clear about warning signs and tell them "When in doubt, don't click — ask someone you trust."
9. Use emojis sparingly but warmly (😊, ✅, 👍).
10. Format responses with short paragraphs, numbered steps, and clear headings when useful.
11. Never be condescending. Treat every question as valid and important.
12. If they seem confused, offer to explain it a different way.`,

  init() {
    // Set up Enter key for chat
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }

    // Populate API key input if it exists
    const keyInput = document.getElementById('api-key-input');
    if (keyInput) {
      keyInput.value = this.getApiKey();
    }
  },

  saveApiKey() {
    const input = document.getElementById('api-key-input');
    if (input) {
      localStorage.setItem('naviAgeApiKey', input.value.trim());
      const status = document.getElementById('api-key-status');
      if (status) {
        status.style.display = 'block';
        setTimeout(() => status.style.display = 'none', 3000);
      }
    }
  },

  async sendMessage(customMessage) {
    const chatInput = document.getElementById('chat-input');
    const message = customMessage || (chatInput ? chatInput.value.trim() : '');

    if (!message || this.isLoading) return;

    // Check for API Key
    const apiKey = this.getApiKey();
    if (!apiKey) {
      if (chatInput) chatInput.value = '';
      this.addMessageToUI("⚠️ **Missing API Key:** Please go to the **Settings** page and enter your Google Gemini API Key first so I can talk to you!", 'assistant');
      return;
    }

    // Clear input
    if (chatInput) chatInput.value = '';

    // Hide suggestions after first message
    const suggestions = document.getElementById('chat-suggestions');
    if (suggestions) suggestions.style.display = 'none';

    // Add user message to UI
    this.addMessageToUI(message, 'user');

    // Add to history
    this.chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Show typing indicator
    this.showTyping();
    this.isLoading = true;

    try {
      const response = await this.callGeminiAPI(message);
      this.hideTyping();

      // Add assistant response to UI
      this.addMessageToUI(response, 'assistant');

      // Add to history
      this.chatHistory.push({
        role: 'model',
        parts: [{ text: response }]
      });

      // Speak response if TTS enabled
      if (typeof NaviAgeVoice !== 'undefined') {
        NaviAgeVoice.speak(response);
      }

    } catch (error) {
      this.hideTyping();
      console.error('AI Error:', error);
      this.addMessageToUI(
        "I'm sorry, I had a little trouble understanding that. Could you try asking again? If the problem continues, please check your internet connection. 😊",
        'assistant'
      );
    }

    this.isLoading = false;
  },

  async callGeminiAPI(message) {
    const requestBody = {
      contents: this.chatHistory.slice(-7), // Use history directly, which already contains the newest user message
      systemInstruction: {
        parts: [{ text: this.SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
      ]
    };

    const apiKey = this.getApiKey();
    const response = await fetch(`${this.API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error('No response from AI');
  },

  /* ── Scam Analysis API Call ── */
  async analyzeScam(text) {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error("API Key is missing. Please add it in Settings.");

    const scamPrompt = `You are a cybersecurity expert helping a senior citizen determine if a message is a scam.

Analyze the following message and provide:
1. **VERDICT**: Is this likely a SCAM, SUSPICIOUS, or SAFE? (Use one word with an emoji: 🚨 SCAM, ⚠️ SUSPICIOUS, or ✅ SAFE)
2. **RED FLAGS**: List specific warning signs you found (2-3 bullet points)  
3. **EXPLANATION**: Explain in simple language why this is or isn't dangerous (1-2 sentences)
4. **WHAT TO DO**: Give clear, actionable advice (1-2 sentences)

Message to analyze:
"${text}"`;

    const requestBody = {
      contents: [{
        role: 'user',
        parts: [{ text: scamPrompt }]
      }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
      }
    };

    const apiKey = this.getApiKey();
    const response = await fetch(`${this.API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error('No response');
  },

  /* ── UI Helpers ── */
  addMessageToUI(text, role) {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;

    if (role === 'assistant') {
      const label = document.createElement('div');
      label.className = 'bubble-label';
      label.innerHTML = '<span>🤖</span> NaviAge AI';
      bubble.appendChild(label);
    }

    // Format text: convert markdown-like formatting to HTML
    const formattedText = this.formatResponse(text);
    const textNode = document.createElement('div');
    textNode.innerHTML = formattedText;
    bubble.appendChild(textNode);

    messagesContainer.appendChild(bubble);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  formatResponse(text) {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Line breaks
      .replace(/\n/g, '<br>')
      // Numbered lists (basic)
      .replace(/^(\d+)\.\s/gm, '<strong>$1.</strong> ')
      // Bullet points
      .replace(/^[•\-]\s/gm, '&bull; ');
  },

  showTyping() {
    const messagesContainer = document.getElementById('chat-messages');
    if (!messagesContainer) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'chat-bubble assistant';
    typingDiv.innerHTML = `
      <div class="bubble-label"><span>🤖</span> NaviAge AI</div>
      <div class="chat-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  },

  clearChat() {
    this.chatHistory = [];
    const messagesContainer = document.getElementById('chat-messages');
    if (messagesContainer) {
      messagesContainer.innerHTML = `
        <div class="chat-bubble assistant">
          <div class="bubble-label"><span>🤖</span> NaviAge AI</div>
          Hello! I'm your friendly technology helper. 😊<br><br>
          You can ask me anything about using your phone, tablet, or computer.<br><br>
          <strong>Try asking me:</strong><br>
          • "How do I send a photo to my grandchild?"<br>
          • "What does WiFi mean?"<br>
          • "How do I make the text bigger?"
        </div>
      `;
    }
    // Show suggestions again
    const suggestions = document.getElementById('chat-suggestions');
    if (suggestions) suggestions.style.display = '';
  }
};
