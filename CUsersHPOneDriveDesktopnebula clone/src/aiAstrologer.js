/**
 * AstroAI Chat Processor - Nebula Clone
 * A highly sophisticated, client-side NLP astrology agent.
 * Generates deeply immersive, personal, and encouraging responses tailored 
 * directly to the user's actual birth chart placements and aspects.
 */

export class AstroAIChatProcessor {
  constructor(userChart) {
    this.chart = userChart;
  }

  // Set or update chart dynamically
  setChart(chart) {
    this.chart = chart;
  }

  // Processes user message and returns a fully personalized astrological response
  getResponse(message) {
    if (!this.chart) {
      return {
        text: "Greetings, seeker. Before I can read the cosmic currents for you, please initialize your birth details so the stars can guide my eyes.",
        suggestions: ["How do I calculate my birth chart?"]
      };
    }

    const text = message.toLowerCase();
    const placements = this.chart.placements;
    const sun = placements.sun;
    const moon = placements.moon;
    const rising = placements.rising;
    const venus = placements.venus;
    const mars = placements.mars;

    // Default response structure
    let responseText = "";
    let suggestions = [];

    // Topic detection
    let isLove = text.includes('love') || text.includes('relationship') || text.includes('partner') || text.includes('marriage') || text.includes('date') || text.includes('romance') || text.includes('single');
    let isCareer = text.includes('job') || text.includes('career') || text.includes('money') || text.includes('work') || text.includes('finance') || text.includes('profession') || text.includes('success');
    let isChart = text.includes('chart') || text.includes('placements') || text.includes('ascendant') || text.includes('moon') || text.includes('rising') || text.includes('sun sign') || text.includes('planet');
    let isFuture = text.includes('future') || text.includes('transit') || text.includes('destiny') || text.includes('happen') || text.includes('prediction') || text.includes('forecast') || text.includes('month');
    let isGreeting = text.includes('hello') || text.includes('hi ') || text.includes('hey') || text.includes('greetings') || text.includes('welcome') || text.includes('who are you');

    if (isGreeting) {
      responseText = `Greetings, seeker. I am **AstroAI**, your personal celestial oracle and cosmic guide. 

Looking at your celestial fingerprint, I see the Sun shining brightly in **${sun.sign}** (${sun.degree}°), anchored by the emotional depths of a **${moon.sign} Moon** (${moon.degree}°), all expressed through your **${rising.sign} Ascendant**. 

I am here to decrypt your birth chart, reveal compatibility secrets, or interpret the current planetary transits governing your path. What cosmic mystery shall we solve today?`;
      
      suggestions = [
        "What does my Moon sign say about my hidden emotions?",
        "Will I find career success this year?",
        "Tell me about my romantic blueprint"
      ];
    } 
    else if (isLove) {
      responseText = `Ah, the sacred alignment of Venus and Mars. Let us peer into your romantic layout, seeker. 

With your **Venus in ${venus.sign}**, you approach love with a ${venus.sign === 'Pisces' || venus.sign === 'Cancer' || venus.sign === 'Scorpio' ? 'deeply intuitive, emotional, and soul-seeking bond' : venus.sign === 'Aries' || venus.sign === 'Leo' || venus.sign === 'Sagittarius' ? 'highly passionate, expressive, and adventurous drive' : venus.sign === 'Gemini' || venus.sign === 'Libra' || venus.sign === 'Aquarius' ? 'highly intellectual, communicative, and socially free spirit' : 'highly reliable, practical, and sensory-driven commitment'}. 

Specifically, **Venus in the ${venus.house} House** reveals that you find romantic sparks through ${venus.house === 5 || venus.house === 7 ? 'direct romance, creative self-expression, and close one-on-one partnerships' : venus.house === 9 || venus.house === 11 ? 'higher learning, travel, community networks, and shared ideals' : 'your daily work, intimate transformations, and nested security'}. 

Combined with your **${sun.sign} Sun** ego and **${moon.sign} Moon** emotional core, this reveals that you seek a partner who respects your independence while honoring your ${moon.sign === 'Scorpio' || moon.sign === 'Pisces' || moon.sign === 'Cancer' ? 'need for intense emotional safety' : 'intellectual and social horizons'}. 

*Cosmic advice:* Currently, transiting Venus is casting a supportive aspect on your natal Venus. This is a powerful cycle to release old relationship baggage and open your heart to authentic vulnerabilities.`;
      
      suggestions = [
        "How does my Moon sign affect my love life?",
        "What kind of partner matches my chart best?",
        "Am I compatible with a Taurus?"
      ];
    } 
    else if (isCareer) {
      responseText = `The alignment of your Tenth House (Midheaven) and Saturn governs your career trajectory and material abundance, seeker. 

Your **Ascendant in ${rising.sign}** sets a life lens of natural ${rising.sign === 'Aries' || rising.sign === 'Leo' || rising.sign === 'Sagittarius' ? 'leadership, vital passion, and charismatic action' : rising.sign === 'Taurus' || rising.sign === 'Virgo' || rising.sign === 'Capricorn' ? 'reliability, highly practical organization, and patient growth' : 'curiosity, strong mental flow, and social connection'}. 

Looking at your chart, your **Sun is placed in the ${sun.house} House**. This house positions your vital life force directly in the area of **${
        sun.house === 1 || sun.house === 2 ? 'self-identity, personal values, and wealth creation' :
        sun.house === 3 || sun.house === 9 ? 'intellect, communication, publishing, and global learning' :
        sun.house === 10 || sun.house === 11 ? 'professional heights, public reputation, and massive social networks' :
        'private self-reflection, nested family structures, and creative projects'
      }**. 

With your **Saturn (the cosmic taskmaster) placed in ${placements.saturn.sign}**, your professional success requires discipline, patience, and conquering structural fears. You are built for long-term growth; avoid rushing into hollow victories.

*Cosmic forecast:* Jupiter, the planet of abundance, is currently aspecting your house of work. A creative risk taken in the next few weeks carries highly supportive cosmic backing. Focus on expanding your unique skill set rather than simply trying to please others.`;

      suggestions = [
        "What is my greatest career block?",
        "How do I activate financial abundance?",
        "What is the significance of my Midheaven?"
      ];
    } 
    else if (isChart) {
      responseText = `Let us decode the coordinates of your astrological blueprint, seeker. 

Here are the key pillars of your unique cosmic fingerprint:
- **Sun in ${sun.sign} (${sun.degree}°):** Governs your conscious mind and ego. You express your light through the ${sun.sign === 'Aries' || sun.sign === 'Leo' || sun.sign === 'Sagittarius' ? 'vibrant fire of self-expression' : 'grounded strength of earth'}.
- **Moon in ${moon.sign} (${moon.degree}°):** Governs your subconscious habits, emotional reactions, and what makes you feel safe.
- **Rising in ${rising.sign} (${rising.degree}°):** The sign rising on the Eastern Horizon at your birth. This is your cosmic filter—how you greet the world and the energetic vibration others feel from you first.

I also see a powerful aspect: your **${this.chart.aspects[0]?.p1 || 'Sun'}** forms a **${this.chart.aspects[0]?.aspect || 'Conjunction'}** with your **${this.chart.aspects[0]?.p2 || 'Mercury'}**. This means your ${
        this.chart.aspects[0] ? 'energies are deeply blended, driving intense focus and a unique personality flow.' : 'cosmic forces are balanced, granting you steady focus and intuitive clarity.'
      }

Tap any node on the interactive Chart Wheel above to dive deep into each planet's specific house placement!`;

      suggestions = [
        "Tell me about my Rising sign's ruler",
        "What is my Twelfth House shadow?",
        "What do the aspect lines in the center mean?"
      ];
    } 
    else if (isFuture) {
      responseText = `The planetary clocks are ticking, seeker. Let us look at the celestial currents governing your immediate timeline. 

Currently, the outer transit of **Pluto in Aquarius** is triggering a major restructuring of your social circles and intellectual goals, especially since your Sun resides in **${sun.sign}**. 

You are entering a 6-month cycle of intense transformation. Old friendships or habits that no longer align with your true frequency will gently fall away. This is not a loss; it is space-clearing for your authentic destiny.

Additionally, with **Jupiter transiting your solar ${moon.house === 1 || moon.house === 5 || moon.house === 9 ? 'fire houses' : 'earth and water sectors'}**, emotional healing is highly supported. Your intuition is exceptionally sharp. Trust the quiet hunches that arrive in the early morning.

*Cosmic key:* Focus on your **${rising.sign} Rising** energy. Greet the world with courage, remain open to unexpected paths, and remember that you are the co-creator of your chart's potential.`;

      suggestions = [
        "What transits are happening this week?",
        "How do I prepare for retrograde?",
        "Give me a spiritual advice for today"
      ];
    } 
    else {
      // Catch-all philosophical cosmic response
      responseText = `The universe whispers in subtle signs, seeker. Your question touching on *"${message}"* holds a deep resonance with your **${sun.sign} Sun** and **${moon.sign} Moon** placements.

In astrology, nothing is accidental. If you are feeling a sense of friction or looking for answers, the cosmos suggests looking at your **${placements.saturn.house} House of Saturn (discipline)** and your **${placements.jupiter.house} House of Jupiter (expansion)**. 

To give you the most detailed alignment, are you currently feeling blocked in your professional path, or is your heart searching for clarity in a romantic partnership? Tell me more, and let us consult the planetary degrees.`;

      suggestions = [
        "I feel blocked in my career",
        "I am looking for romantic clarity",
        "Explain the planetary transits right now"
      ];
    }

    return {
      text: responseText,
      suggestions: suggestions
    };
  }
}
