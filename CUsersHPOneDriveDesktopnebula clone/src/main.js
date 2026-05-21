import './style.css';
import { 
  calculateBirthChart, 
  getHoroscope, 
  calculateCompatibility, 
  ZODIAC_SIGNS 
} from './astrologyData.js';
import { AstrologyChartVisualizer } from './chartVisualizer.js';
import { AstroAIChatProcessor } from './aiAstrologer.js';

// Application State
const state = {
  profile: null,        // User birth details
  chart: null,          // Calculated birth chart data
  activeTab: 'feed',    // 'feed', 'chart', 'match', 'chat'
  horoscopeType: 'daily',// 'daily', 'weekly', 'monthly'
  chatProcessor: null,  // AstroAI instance
  selectedPlanet: null, // Planet focused in chart view
  chatHistory: []       // Conversational record
};

// Core Nodes
const app = document.querySelector('#app');

// Initialize App
function init() {
  // Setup Background Starry Element
  const starryBg = document.createElement('div');
  starryBg.className = 'starry-bg';
  document.body.appendChild(starryBg);
  
  // Render Animated Splash Screen immediately
  app.innerHTML = `
    <div id="splash-screen">
      <div class="splash-logo-wrap">
        <div class="splash-constellations"></div>
        <div class="splash-galaxy-orb">
          <i class="fa-solid fa-moon"></i>
        </div>
      </div>
      <h1 class="splash-title-brand gold-gradient-text">NEBULA</h1>
      <p class="splash-subtitle-brand">Your Cosmic AI & Astrologer</p>
      <div class="splash-progress-bar-bg">
        <div class="splash-progress-bar-fill"></div>
      </div>
    </div>
  `;
  
  // Simulated Loading & Planetary Alignment
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
      splash.classList.add('fade-out-splash');
    }
    
    // After fade-out animation completes, clean DOM and load app
    setTimeout(() => {
      // Load existing profile from LocalStorage
      const cached = localStorage.getItem('nebula_astro_profile');
      if (cached) {
        state.profile = JSON.parse(cached);
        state.chart = calculateBirthChart(
          state.profile.birthDate,
          state.profile.birthTime,
          state.profile.location,
          state.profile.timezone || 5.5
        );
        state.chatProcessor = new AstroAIChatProcessor(state.chart);
        
        // Add default initial greeting to chat history
        const welcomeText = `Welcome back, ${state.profile.name}. The planetary transits have shifted since you last walked these halls. Speak, and let us reveal what the stars hold.`;
        state.chatHistory.push({ sender: 'bot', text: welcomeText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        
        renderAppFrame();
        switchTab('feed');
      } else {
        renderOnboarding();
      }
    }, 500);
  }, 2500); // 2.5 seconds loading experience
}

// 1. RENDER ONBOARDING PROFILE SETUP FORM
function renderOnboarding() {
  app.innerHTML = `
    <div class="onboarding-container">
      <!-- Premium Celestial Banner Graphic -->
      <div class="onboarding-banner">
        <div class="onboarding-banner-overlay"></div>
        <div class="onboarding-banner-content">
          <h1 class="gold-gradient-text" style="margin: 0; font-weight: 700;">NEBULA</h1>
          <p style="font-size: 9px; text-transform: uppercase; letter-spacing: 0.25em; color: var(--c-accent); margin: 4px 0 0;">Cosmic AstroAI Oracle</p>
        </div>
      </div>
      
      <p class="onboarding-subtitle" style="margin-bottom: 24px;">Your personalized stellar blueprint, compatibility oracle, and cosmic AI astrologer chat.</p>
      
      <div class="cosmic-form">
        <h2 style="font-family: var(--heading); font-size: 16px; margin-bottom: 18px;" class="gold-gradient-text">Calculate Birth Chart</h2>
        
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" id="ob-name" class="cosmic-input" placeholder="Enter your name" value="Chinmayi" />
        </div>
        
        <div class="form-group">
          <label>Birth Date</label>
          <input type="date" id="ob-date" class="cosmic-input" value="1999-11-12" />
        </div>
        
        <div class="form-group">
          <label>Birth Time</label>
          <input type="time" id="ob-time" class="cosmic-input" value="08:45" />
        </div>
        
        <div class="form-group">
          <label>Birth Location</label>
          <input type="text" id="ob-location" class="cosmic-input" placeholder="e.g. New York, USA" value="Hyderabad, India" />
        </div>
        
        <button id="btn-submit-profile" class="cosmic-btn">Consult the Stars <i class="fa-solid fa-wand-magic-sparkles" style="margin-left: 8px;"></i></button>
      </div>
    </div>
  `;

  document.getElementById('btn-submit-profile').addEventListener('click', () => {
    const name = document.getElementById('ob-name').value.trim();
    const birthDate = document.getElementById('ob-date').value;
    const birthTime = document.getElementById('ob-time').value;
    const location = document.getElementById('ob-location').value.trim();

    if (!name || !birthDate || !birthTime || !location) {
      alert("Seeker, please complete all fields to align your celestial coordinates!");
      return;
    }

    state.profile = { name, birthDate, birthTime, location, timezone: 5.5 };
    localStorage.setItem('nebula_astro_profile', JSON.stringify(state.profile));
    
    // Calculate Chart
    state.chart = calculateBirthChart(birthDate, birthTime, location, 5.5);
    state.chatProcessor = new AstroAIChatProcessor(state.chart);
    
    // Initial chat greeting
    const welcomeText = `Greetings, seeker **${name}**. I see the Sun shining brightly in **${state.chart.placements.sun.sign}**, anchored by the emotional depths of a **${state.chart.placements.moon.sign} Moon**, expressed through your **${state.chart.placements.rising.sign} Ascendant**. What cosmic mystery shall we solve today?`;
    state.chatHistory.push({ sender: 'bot', text: welcomeText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });

    // Transition with Galaxy Spinner
    app.innerHTML = `
      <div class="onboarding-container" style="justify-content: center;">
        <i class="fa-solid fa-arrows-spin fa-spin" style="font-size: 64px; color: var(--c-gold); text-shadow: 0 0 20px var(--c-gold-glow); margin-bottom: 24px;"></i>
        <h2 class="gold-gradient-text" style="font-family: var(--heading);">Aligning the Planets...</h2>
        <p style="color: var(--c-text-muted); font-size: 13px; margin-top: 8px;">Drawing aspects and calculating astronomical degrees...</p>
      </div>
    `;

    setTimeout(() => {
      renderAppFrame();
      switchTab('feed');
    }, 2000);
  });
}

// 2. RENDER STICKY APP FRAMES AND BOTTOM NAVIGATION BAR
function renderAppFrame() {
  app.innerHTML = `
    <!-- Top Header Sticky -->
    <header class="main-header">
      <div class="title">NEBULA</div>
      <div class="profile-badge" id="profile-badge-sign">
        ${state.chart.placements.sun.symbol} ${state.chart.placements.sun.sign}
      </div>
    </header>
    
    <!-- Tab view content slots -->
    <main style="flex-grow: 1; overflow-y: auto; padding-bottom: 20px;">
      
      <!-- VIEW 1: HOROSCOPE FEED -->
      <section id="view-feed" class="app-view">
        <div class="feed-container">
          <div class="tab-row">
            <div class="tab-btn active" data-type="daily">Daily</div>
            <div class="tab-btn" data-type="weekly">Weekly</div>
            <div class="tab-btn" data-type="monthly">Monthly</div>
          </div>
          
          <div id="horoscope-feed-body"></div>
        </div>
      </section>
      
      <!-- VIEW 2: BIRTH CHART -->
      <section id="view-chart" class="app-view">
        <div class="chart-container">
          <h2 class="chart-title">Stellar Map</h2>
          <p class="chart-subtitle">${state.profile.name}'s Interactive Celestial Fingerprint</p>
          
          <div class="canvas-wrapper">
            <canvas id="chart-canvas"></canvas>
          </div>
          <p class="canvas-tip"><i class="fa-solid fa-hand-pointer"></i> Tap planet symbols above to decrypt placements</p>
          
          <div id="focused-planet-details"></div>
          
          <h3 style="text-align: left; margin: 24px 0 12px; font-size: 15px;" class="gold-gradient-text">Complete Planetary Placements</h3>
          <div class="placement-list" id="placements-list-container"></div>
        </div>
      </section>
      
      <!-- VIEW 3: COMPATIBILITY -->
      <section id="view-match" class="app-view">
        <div class="match-container">
          <h2 class="chart-title">Cosmic Matchmaker</h2>
          <p class="chart-subtitle">Calculate compatibility between two birth charts</p>
          
          <div class="profile-slots">
            <div class="profile-slot active">
              <div class="slot-heading">Your Sign</div>
              <div class="slot-name">${state.profile.name}</div>
              <div class="slot-sign">${state.chart.placements.sun.symbol} ${state.chart.placements.sun.sign}</div>
            </div>
            
            <i class="fa-solid fa-heart-pulse" style="font-size: 24px; color: var(--c-primary); text-shadow: 0 0 10px var(--c-primary-glow);"></i>
            
            <div class="profile-slot" id="partner-slot-ui">
              <div class="slot-heading">Partner's Sign</div>
              <div class="slot-name" style="color: var(--c-accent);" id="p-slot-name-label">Select partner</div>
              <div class="slot-sign" id="p-slot-sign-label">—</div>
            </div>
          </div>
          
          <!-- Select Partner Form Dropdown (Content Depth) -->
          <div class="cosmic-form" style="margin-bottom: 24px; text-align: left;">
            <div class="form-group" style="margin-bottom: 12px;">
              <label>Choose Partner's Sun Sign</label>
              <select id="compatibility-partner-sign" class="cosmic-input" style="background-color: #0b0c16;">
                ${ZODIAC_SIGNS.map(s => `<option value="${s.name}">${s.symbol} ${s.name} (${s.element})</option>`).join('')}
              </select>
            </div>
            <button id="btn-run-compatibility" class="cosmic-btn" style="background: linear-gradient(135deg, var(--c-accent) 0%, #0099ff 100%); box-shadow: 0 4px 10px var(--c-accent-glow);">Calculate Match</button>
          </div>
          
          <div id="compatibility-results-container" style="display: none;"></div>
        </div>
      </section>
      
      <!-- VIEW 4: AI CHAT -->
      <section id="view-chat" class="app-view">
        <div class="chat-container">
          <div class="chat-messages" id="chat-feed-box"></div>
          
          <!-- Typing Indicator -->
          <div id="chat-typing-ui" style="display: none; padding-left: 20px; padding-bottom: 8px;">
            <div class="typing-indicator">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
          </div>
          
          <div class="suggestions-row" id="chat-suggestions-box"></div>
          
          <div class="chat-input-bar">
            <input type="text" id="chat-user-input" class="chat-input-field" placeholder="Ask AstroAI about love, career, transits..." />
            <button id="chat-btn-send" class="chat-send-btn"><i class="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>
      </section>
      
    </main>
    
    <!-- Sticky Bottom Navigation -->
    <nav class="bottom-nav">
      <div class="nav-item active" data-tab="feed">
        <i class="fa-solid fa-calendar-day"></i>
        <span>Horoscope</span>
      </div>
      <div class="nav-item" data-tab="chart">
        <i class="fa-solid fa-circle-nodes"></i>
        <span>Birth Chart</span>
      </div>
      <div class="nav-item" data-tab="match">
        <i class="fa-solid fa-user-group"></i>
        <span>Compatibility</span>
      </div>
      <div class="nav-item" data-tab="chat">
        <i class="fa-solid fa-comment-dots"></i>
        <span>AstroAI</span>
      </div>
    </nav>
  `;

  // Bind Navigation Tabs
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(ni => ni.classList.remove('active'));
      item.classList.add('active');
      switchTab(item.getAttribute('data-tab'));
    });
  });

  // Bind Horoscope Sub-tabs
  const feedTabs = document.querySelectorAll('.tab-row .tab-btn');
  feedTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      feedTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.horoscopeType = tab.getAttribute('data-type');
      updateHoroscopeFeed();
    });
  });

  // Bind Chat inputs
  document.getElementById('chat-btn-send').addEventListener('click', submitUserMessage);
  document.getElementById('chat-user-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitUserMessage();
  });

  // Bind Compatibility Trigger
  document.getElementById('btn-run-compatibility').addEventListener('click', runCompatibilityTest);
}

// 3. ROUTER / TAB SWITCHER
function switchTab(tabId) {
  state.activeTab = tabId;
  
  // Update view elements visibility
  const views = document.querySelectorAll('.app-view');
  views.forEach(v => v.classList.remove('active'));
  
  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.classList.add('active');
  
  // View-specific initializations
  if (tabId === 'feed') {
    updateHoroscopeFeed();
  } 
  else if (tabId === 'chart') {
    initChartWheel();
  } 
  else if (tabId === 'chat') {
    renderChatFeed();
  }
}

// 4. TAB VIEW: DAILY FEED RENDERER
function updateHoroscopeFeed() {
  const sunSign = state.chart.placements.sun.sign;
  const moonSign = state.chart.placements.moon.sign;
  const hData = getHoroscope(sunSign, moonSign, state.horoscopeType);
  
  const container = document.getElementById('horoscope-feed-body');
  container.innerHTML = `
    <!-- Top Overall Score Card -->
    <div class="cosmic-card gold-rim" style="text-align: center;">
      <h3 style="font-size: 15px; text-transform: uppercase; color: var(--c-gold); letter-spacing: 0.1em; margin-bottom: 8px;">Stellar Harmony Index</h3>
      <div style="font-size: 40px; font-weight: bold; color: var(--c-gold); text-shadow: 0 0 10px var(--c-gold-glow); font-family: var(--heading);">${hData.overallScore}%</div>
      <p style="font-size: 12px; color: var(--c-text-muted); margin-top: 6px;">Stellar coordinates alignment for ${state.profile.name} today</p>
    </div>
    
    <!-- Quotes Panel -->
    <div class="quote-box">
      "${hData.quote}"
    </div>
    
    <!-- Scores Circle Breakdown Grid -->
    <div class="scores-grid">
      <div class="score-cell love">
        <div class="score-circle">${hData.categories.love.score}%</div>
        <div class="score-title">Love</div>
      </div>
      <div class="score-cell career">
        <div class="score-circle">${hData.categories.career.score}%</div>
        <div class="score-title">Career</div>
      </div>
      <div class="score-cell wellness">
        <div class="score-circle">${hData.categories.wellness.score}%</div>
        <div class="score-title">Wellness</div>
      </div>
    </div>
    
    <!-- Categories Explanations Cards -->
    <div class="cosmic-card">
      <div class="category-header" style="color: #ff4d4d;">
        <i class="fa-solid fa-heart-pulse"></i> ${hData.categories.love.title}
      </div>
      <p style="font-size: 13.5px; line-height: 1.55;">${hData.categories.love.text}</p>
    </div>
    
    <div class="cosmic-card cyan-rim">
      <div class="category-header" style="color: var(--c-accent);">
        <i class="fa-solid fa-briefcase"></i> ${hData.categories.career.title}
      </div>
      <p style="font-size: 13.5px; line-height: 1.55;">${hData.categories.career.text}</p>
    </div>
    
    <div class="cosmic-card gold-rim">
      <div class="category-header" style="color: var(--c-gold);">
        <i class="fa-solid fa-wand-magic-sparkles"></i> ${hData.categories.spiritual.title}
      </div>
      <p style="font-size: 13.5px; line-height: 1.55;">${hData.categories.spiritual.text}</p>
    </div>
  `;
}

// 5. TAB VIEW: BIRTH CHART GRAPHIC
function initChartWheel() {
  const canvas = document.getElementById('chart-canvas');
  if (!canvas) return;
  
  // Render complete placements list
  const listContainer = document.getElementById('placements-list-container');
  const placements = state.chart.placements;
  
  const planetsKeys = Object.keys(placements);
  
  listContainer.innerHTML = planetsKeys.map(k => {
    const p = placements[k];
    return `
      <div class="placement-item" data-planet="${k}">
        <div class="item-left">
          <div class="item-glyph">${p.symbol}</div>
          <div class="item-body">
            <span style="font-weight: 600;">${p.name}</span> in ${p.sign}
          </div>
        </div>
        <div class="item-right">${p.degree}° / H${p.house}</div>
      </div>
    `;
  }).join('');
  
  // Bind placements list items clicks
  document.querySelectorAll('.placement-item').forEach(item => {
    item.addEventListener('click', () => {
      const pKey = item.getAttribute('data-planet');
      focusPlanetNode(pKey);
    });
  });
  
  // Setup Canvas Visualizer Draw Call
  const visualizer = new AstrologyChartVisualizer(canvas, state.chart, (clickedNode) => {
    focusPlanetNode(clickedNode.key);
  });
  
  state.visualizer = visualizer;
  visualizer.render();
  
  // Select first planet (Sun) by default
  focusPlanetNode('sun');
}

// Focuses and updates detailed interpretation card for a planet placement
function focusPlanetNode(pKey) {
  state.selectedPlanet = pKey;
  if (state.visualizer) {
    state.visualizer.selectedPlanetKey = pKey;
    state.visualizer.render();
  }
  
  const planet = state.chart.placements[pKey];
  if (!planet) return;
  
  const container = document.getElementById('focused-planet-details');
  container.innerHTML = `
    <div class="selected-planet-panel">
      <div class="planet-title">
        <div class="planet-name">${planet.symbol} ${planet.name} in ${planet.sign}</div>
        <div class="planet-degree">${planet.degree}° / House ${planet.house}</div>
      </div>
      <p class="planet-desc" style="font-size: 13.5px; line-height: 1.55;">
        ${planet.interpretation}
        <br/><br/>
        <span style="color: var(--c-accent); font-weight: 600;">${planet.houseDetail || ''}</span>
      </p>
    </div>
  `;
}

// 6. TAB VIEW: COMPATIBILITY LOGIC
function runCompatibilityTest() {
  const selectSign = document.getElementById('compatibility-partner-sign').value;
  
  // Generate a mock birth chart for the partner based on their chosen Sun Sign
  // This is highly mathematically consistent and allows calculating true compatibility aspects!
  const partnerSignIndex = ZODIAC_SIGNS.findIndex(s => s.name === selectSign);
  const pSunDeg = (partnerSignIndex * 30) + 15; // Set degrees exactly inside sign
  const pMoonDeg = (pSunDeg + 120) % 360;       // Mathematically flowing moon
  const pVenusDeg = (pSunDeg + 28) % 360;       // Mercury/Venus orbital boundaries
  
  const partnerChart = {
    placements: {
      sun: { sign: selectSign, absoluteDegree: pSunDeg },
      moon: { sign: ZODIAC_SIGNS[Math.floor(pMoonDeg / 30)].name, absoluteDegree: pMoonDeg },
      venus: { sign: ZODIAC_SIGNS[Math.floor(pVenusDeg / 30)].name, absoluteDegree: pVenusDeg }
    }
  };
  
  const results = calculateCompatibility(state.chart, partnerChart);
  
  // Update partner slot label
  document.getElementById('p-slot-name-label').innerText = selectSign;
  document.getElementById('p-slot-sign-label').innerText = `${ZODIAC_SIGNS[partnerSignIndex].symbol} ${selectSign}`;
  
  const container = document.getElementById('compatibility-results-container');
  container.style.display = 'block';
  container.innerHTML = `
    <!-- Overlapping Circular Score Indicator -->
    <div class="match-circle-wrap">
      <div class="match-circle-outer"></div>
      <div class="match-score">${results.overallScore}%</div>
    </div>
    
    <h3 style="font-family: var(--heading); margin-bottom: 20px;" class="gold-gradient-text">Overall Harmony Match</h3>
    
    <!-- Match Categories Grid -->
    <div class="match-grid">
      <div class="match-cell">
        <div class="match-cell-head">
          <span>Romantic Spark</span>
          <span style="font-weight: 700;">${results.scores.romance}%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill" style="width: ${results.scores.romance}%;"></div>
        </div>
      </div>
      
      <div class="match-cell">
        <div class="match-cell-head">
          <span>Communication</span>
          <span style="font-weight: 700;">${results.scores.communication}%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill" style="width: ${results.scores.communication}%;"></div>
        </div>
      </div>
      
      <div class="match-cell">
        <div class="match-cell-head">
          <span>Intimacy</span>
          <span style="font-weight: 700;">${results.scores.intimacy}%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill" style="width: ${results.scores.intimacy}%;"></div>
        </div>
      </div>
      
      <div class="match-cell">
        <div class="match-cell-head">
          <span>Shared Values</span>
          <span style="font-weight: 700;">${results.scores.values}%</span>
        </div>
        <div class="match-bar-bg">
          <div class="match-bar-fill" style="width: ${results.scores.values}%;"></div>
        </div>
      </div>
    </div>
    
    <!-- Full compatibility sections report -->
    <div class="match-report">
      <div class="report-section">
        <div class="report-title"><i class="fa-solid fa-heart" style="color: #ff4d4d;"></i> ${results.sections.romance.title}</div>
        <p class="report-text">${results.sections.romance.text}</p>
      </div>
      
      <div class="report-section">
        <div class="report-title"><i class="fa-solid fa-comments" style="color: var(--c-accent);"></i> ${results.sections.communication.title}</div>
        <p class="report-text">${results.sections.communication.text}</p>
      </div>
      
      <div class="report-section">
        <div class="report-title"><i class="fa-solid fa-triangle-exclamation" style="color: var(--c-gold);"></i> ${results.sections.challenges.title}</div>
        <p class="report-text">${results.sections.challenges.text}</p>
      </div>
    </div>
  `;
  
  // Smooth scroll to compatibility results
  container.scrollIntoView({ behavior: 'smooth' });
}

// 7. TAB VIEW: ASTROAI CHAT ROOM
function renderChatFeed() {
  const box = document.getElementById('chat-feed-box');
  if (!box) return;
  
  box.innerHTML = state.chatHistory.map(msg => `
    <div class="chat-bubble ${msg.sender}">
      ${msg.text.split('\n\n').map(p => `<p>${p}</p>`).join('')}
    </div>
  `).join('');
  
  box.scrollTop = box.scrollHeight;
  
  // Render quick prompt suggestions
  const suggestionsBox = document.getElementById('chat-suggestions-box');
  const lastMsg = state.chatHistory[state.chatHistory.length - 1];
  
  if (lastMsg && lastMsg.sender === 'bot' && lastMsg.suggestions) {
    suggestionsBox.innerHTML = lastMsg.suggestions.map(s => `
      <div class="suggestion-pill">${s}</div>
    `).join('');
    
    // Bind pill clicks
    document.querySelectorAll('.suggestion-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        submitUserMessage(pill.innerText);
      });
    });
  } else {
    suggestionsBox.innerHTML = '';
  }
}

function submitUserMessage(presetText = null) {
  const input = document.getElementById('chat-user-input');
  const messageText = (typeof presetText === 'string' ? presetText : input.value).trim();
  
  if (!messageText) return;
  
  // Clear input
  input.value = '';
  
  // Add to history
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.chatHistory.push({ sender: 'user', text: messageText, time });
  renderChatFeed();
  
  // Show Typing Indicator
  const typingUi = document.getElementById('chat-typing-ui');
  typingUi.style.display = 'block';
  
  // Auto scroll
  const box = document.getElementById('chat-feed-box');
  box.scrollTop = box.scrollHeight;
  
  // Simulated AI response latency for natural typewriter effect
  setTimeout(() => {
    typingUi.style.display = 'none';
    
    const botRes = state.chatProcessor.getResponse(messageText);
    state.chatHistory.push({ 
      sender: 'bot', 
      text: botRes.text, 
      suggestions: botRes.suggestions,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    });
    
    renderChatFeed();
  }, 1500);
}

// Fire App
init();
