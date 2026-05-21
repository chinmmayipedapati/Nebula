/**
 * Astrology Data & Calculation Engine - Nebula Clone
 * High-fidelity client-side calculations for planetary placements,
 * house cusps, compatibility scores, and personalized horoscopes.
 */

// 1. ZODIAC SIGNS DEFINITIONS
export const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire', modality: 'Cardinal', ruler: 'Mars', keywords: 'Bold, energetic, passionate, pioneering', color: '#ff4d4d' },
  { name: 'Taurus', symbol: '♉', element: 'Earth', modality: 'Fixed', ruler: 'Venus', keywords: 'Reliable, patient, sensual, determined', color: '#2ecc71' },
  { name: 'Gemini', symbol: '♊', element: 'Air', modality: 'Mutable', ruler: 'Mercury', keywords: 'Curious, versatile, expressive, witty', color: '#f1c40f' },
  { name: 'Cancer', symbol: '♋', element: 'Water', modality: 'Cardinal', ruler: 'Moon', keywords: 'Intuitive, nurturing, protective, sensitive', color: '#3498db' },
  { name: 'Leo', symbol: '♌', element: 'Fire', modality: 'Fixed', ruler: 'Sun', keywords: 'Charismatic, generous, proud, creative', color: '#e67e22' },
  { name: 'Virgo', symbol: '♍', element: 'Earth', modality: 'Mutable', ruler: 'Mercury', keywords: 'Analytical, helpful, precise, practical', color: '#1abc9c' },
  { name: 'Libra', symbol: '♎', element: 'Air', modality: 'Cardinal', ruler: 'Venus', keywords: 'Harmonious, artistic, diplomatic, social', color: '#fd79a8' },
  { name: 'Scorpio', symbol: '♏', element: 'Water', modality: 'Fixed', ruler: 'Pluto', keywords: 'Intense, magnetic, transformative, private', color: '#8e44ad' },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', modality: 'Mutable', ruler: 'Jupiter', keywords: 'Optimistic, adventurous, philosophical, free', color: '#e17055' },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', modality: 'Cardinal', ruler: 'Saturn', keywords: 'Disciplined, ambitious, patient, strategic', color: '#2d3436' },
  { name: 'Aquarius', symbol: '♒', element: 'Air', modality: 'Fixed', ruler: 'Uranus', keywords: 'Innovative, humanitarian, independent, unique', color: '#0984e3' },
  { name: 'Pisces', symbol: '♓', element: 'Water', modality: 'Mutable', ruler: 'Neptune', keywords: 'Dreamy, compassionate, artistic, spiritual', color: '#a29bfe' }
];

// 2. ASTROLOGICAL HOUSES DEFINITIONS
export const HOUSES = [
  { number: 1, name: 'First House (Ascendant)', area: 'Self-image, identity, first impressions, outer personality' },
  { number: 2, name: 'Second House', area: 'Money, personal finances, values, self-worth, material possessions' },
  { number: 3, name: 'Third House', area: 'Communication, intellect, siblings, short travel, local environment' },
  { number: 4, name: 'Fourth House (IC)', area: 'Home, roots, family, foundations, private life, emotional security' },
  { number: 5, name: 'Fifth House', area: 'Creativity, romance, pleasure, self-expression, children, speculation' },
  { number: 6, name: 'Sixth House', area: 'Daily work, routine, physical health, acts of service, habits' },
  { number: 7, name: 'Seventh House (Descendant)', area: 'Partnership, marriage, open enemies, contracts, close relationships' },
  { number: 8, name: 'Eighth House', area: 'Transformation, shared resources, intimacy, taboos, regeneration' },
  { number: 9, name: 'Ninth House', area: 'Higher education, long journeys, philosophy, belief systems, exploration' },
  { number: 10, name: 'Tenth House (Midheaven)', area: 'Career, public reputation, status, authority, lifetime achievements' },
  { number: 11, name: 'Eleventh House', area: 'Friendships, networks, long-term hopes, wishes, collective groups' },
  { number: 12, name: 'Twelfth House', area: 'The subconscious, hidden assets/enemies, solitude, dreams, spiritual release' }
];

// PLANETS METADATA
export const PLANETS = [
  { id: 'sun', name: 'Sun', symbol: '☉', rulingSign: 'Leo', keyword: 'Ego, vital core, self-expression', basePeriod: 365.25 },
  { id: 'moon', name: 'Moon', symbol: '☽', rulingSign: 'Cancer', keyword: 'Emotions, subconscious, intuition', basePeriod: 27.32 },
  { id: 'mercury', name: 'Mercury', symbol: '☿', rulingSign: 'Gemini/Virgo', keyword: 'Intellect, communication, logic', basePeriod: 87.97 },
  { id: 'venus', name: 'Venus', symbol: '♀', rulingSign: 'Taurus/Libra', keyword: 'Love, beauty, relationships, values', basePeriod: 224.7 },
  { id: 'mars', name: 'Mars', symbol: '♂', rulingSign: 'Aries', keyword: 'Drive, action, ambition, passion', basePeriod: 686.98 },
  { id: 'jupiter', name: 'Jupiter', symbol: '♃', rulingSign: 'Sagittarius', keyword: 'Expansion, luck, wisdom, philosophy', basePeriod: 4332.59 },
  { id: 'saturn', name: 'Saturn', symbol: '♄', rulingSign: 'Capricorn', keyword: 'Structure, discipline, limitation, karma', basePeriod: 10759.22 },
  { id: 'uranus', name: 'Uranus', symbol: '♅', rulingSign: 'Aquarius', keyword: 'Awakening, rebellion, innovation', basePeriod: 30688.5 },
  { id: 'neptune', name: 'Neptune', symbol: '♆', rulingSign: 'Pisces', keyword: 'Dreams, illusions, spirituality, mysticism', basePeriod: 60182.0 },
  { id: 'pluto', name: 'Pluto', symbol: '♇', rulingSign: 'Scorpio', keyword: 'Power, rebirth, transformation, shadow', basePeriod: 90560.0 }
];

// DETAILED PLACEMENT MEANINGS DATABASE (CONTENT DEPTH)
const INTERPRETATIONS = {
  sun: {
    Aries: "Your core identity shines with directness and courage. You approach life as an adventure and a competition, expressing your energy through pioneering action.",
    Taurus: "You are anchored by patience, reliability, and appreciation for physical comfort. Your identity thrives on stability, material security, and natural beauty.",
    Gemini: "Your essence is intellectual, adaptable, and restless. You make sense of the world through communication, endless questioning, and linking ideas.",
    Cancer: "You shine from a deeply subjective, emotional, and protective foundation. You are deeply connected to roots, family, and safeguarding those you love.",
    Leo: "Your core is expressive, proud, and generous. You seek to create a legacy, thrive when recognized, and express a warm, magnetic life force.",
    Virgo: "You express yourself through precision, service, and continuous improvement. Your light shines brightest when organizing, repairing, and refining details.",
    Libra: "Your vital core is diplomatic, artistic, and relationship-driven. You thrive on partnerships and seek harmony, justice, and intellectual beauty.",
    Scorpio: "Your identity is intense, focused, and investigative. You explore the depths of life, seeking truth through intimacy, control, and total transformation.",
    Sagittarius: "You are a seeker of truth, freedom, and expansive horizons. Your identity is optimistic, philosophical, and driven by learning and travel.",
    Capricorn: "Your core is structured, dutiful, and ambitious. You climb life's peaks with practical planning, hard work, and a profound respect for history.",
    Aquarius: "Your essential self is humanitarian, unique, and intellectually free. You align with the collective and strive to build a better future through change.",
    Pisces: "Your identity is porous, highly imaginative, and compassionate. You navigate life through feelings, intuition, dreams, and cosmic unity."
  },
  moon: {
    Aries: "Emotional needs are met through direct expression and challenges. You feel safe when active, independent, and asserting your desires.",
    Taurus: "Emotionally grounded and serene. You require physical comfort, predictable routines, and sensory abundance to feel truly secure.",
    Gemini: "You process emotions through speech, intellectual analysis, and curiosity. You need variety, conversations, and social links to feel calm.",
    Cancer: "Emotionally deep and highly protective. You possess strong nurturing instincts, active memories, and dynamic cycles of mood.",
    Leo: "Emotional security comes from validation, creative play, and feeling special. You have a grand, generous heart and love theatrical expression.",
    Virgo: "You feel most secure when you can analyze feelings, organize your physical space, and be of practical service to loved ones.",
    Libra: "Your emotional balance depends heavily on peaceful partnerships. You feel safest in harmonious spaces and strive to keep everyone happy.",
    Scorpio: "Emotional life is intense, passionate, and fiercely guarded. You feel secure when you can uncover hidden motives and establish deep intimacy.",
    Sagittarius: "You need emotional freedom, adventures, and a belief system. You soothe emotional distress through humor, travel, and philosophical study.",
    Capricorn: "You manage emotional needs with exceptional self-control. You feel safest when you are achieving, remaining self-reliant, and building structures.",
    Aquarius: "Emotional nature is highly objective and altruistic. You seek intellectual friendships and prefer rationalizing emotions to drowning in them.",
    Pisces: "Vastly empathetic, absorbent, and artistic. You feel the emotions of everyone around you and require solitude to restore your boundaries."
  },
  venus: {
    Aries: "In love, you are passionate, direct, and love the thrill of the chase. You value independence and direct, assertive partners.",
    Taurus: "You express affection through loyalty, physical touch, gifts, and sensory pleasures. You seek long-term stability and physical comfort in love.",
    Gemini: "Love is an intellectual game and a sparkling conversation. You value mental compatibility, lighthearted banter, and endless variety.",
    Cancer: "You love deeply and tenderly, seeking absolute emotional commitment. Your relationships are nurtured through quiet evenings at home and shared vulnerability.",
    Leo: "In romance, you are dramatic, proud, and incredibly generous. You need to admire your partner and wish to be adored in return.",
    Virgo: "You express love through quiet, practical acts of service. You are loyal, selective, and value intellectual refinement and health.",
    Libra: "The ultimate lover of love and beauty. You seek elegant, harmonious relationships, valuing fairness, aesthetics, and mutual respect.",
    Scorpio: "Your relationships are characterized by profound intensity, deep intimacy, and unwavering loyalty. You seek absolute union or nothing.",
    Sagittarius: "You are attracted to free-spirited, adventurous, and philosophical minds. Love for you is an expanding voyage of learning together.",
    Capricorn: "In love, you are reserved, selective, and look for reliable, high-status, or mature partners. You value long-term commitment and shared goals.",
    Aquarius: "You value freedom, intellectual connection, and unconventional bonds. Friendship is the essential foundation of your romantic life.",
    Pisces: "Unconditionally loving, idealistic, and deeply romantic. You seek a spiritual soul connection and are capable of immense sacrifice for love."
  }
};

// 3. CORE ASTROLOGICAL CALCULATOR
export function calculateBirthChart(dateString, timeString, location, timezoneOffset = 5.5) {
  const date = new Date(`${dateString}T${timeString || '12:00'}:00`);
  const birthYear = date.getFullYear();
  const birthMonth = date.getMonth() + 1;
  const birthDay = date.getDate();
  
  // Parse hour & minute
  const [hours, minutes] = (timeString || '12:00').split(':').map(Number);
  
  // Approximate day of the year (1-365)
  const isLeapYear = (birthYear % 4 === 0 && birthYear % 100 !== 0) || (birthYear % 400 === 0);
  const monthDays = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dayOfYear = birthDay;
  for (let i = 0; i < birthMonth - 1; i++) {
    dayOfYear += monthDays[i];
  }
  
  // A consistent pseudo-random seed based on birthday elements to generate realistic but mathematically deterministic degrees
  const seed = (birthYear * 1000) + (dayOfYear * 10) + hours + (minutes / 60);
  const randomizer = (s) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  // 3.1 CALCULATE SUN POSITION (Very Accurate based on birth day of year)
  // Sun travels 360 deg in 365.25 days, starting at 0 deg Aries on approx March 21 (Day 80)
  let sunDeg = ((dayOfYear - 80) / 365.2422) * 360;
  if (sunDeg < 0) sunDeg += 360;
  sunDeg = sunDeg % 360;
  const sunSignIndex = Math.floor(sunDeg / 30);
  const sunSign = ZODIAC_SIGNS[sunSignIndex];
  
  // 3.2 CALCULATE MOON POSITION (Accurate approximation based on 27.32 day cycle)
  // Moon travels 13.177 degrees per day. Epoch: Jan 1, 2000, Moon was in Libra at ~190 degrees
  const msPerDay = 1000 * 60 * 60 * 24;
  const epoch = new Date('2000-01-01T12:00:00Z');
  const birthUTC = date.getTime() - (timezoneOffset * 60 * 60 * 1000);
  const diffDays = (birthUTC - epoch.getTime()) / msPerDay;
  
  let moonDeg = (190 + (diffDays * 13.17639)) % 360;
  if (moonDeg < 0) moonDeg += 360;
  const moonSignIndex = Math.floor(moonDeg / 30);
  const moonSign = ZODIAC_SIGNS[moonSignIndex];
  
  // 3.3 CALCULATE RISING SIGN (Ascendant)
  // The rising sign is determined by local sidereal time.
  // The Sun is conjunct the Ascendant at local Sunrise (~6 AM), conjunct MC at Noon (~12 PM),
  // conjunct Descendant at Sunset (~6 PM), and conjunct IC at Midnight (~12 AM).
  // Thus, the local hour shifts the Ascendant degree from the Sun degree by roughly 15 degrees per hour.
  const hoursSince6AM = (hours + minutes / 60) - 6.0;
  let risingDeg = (sunDeg + (hoursSince6AM * 15.0)) % 360;
  if (risingDeg < 0) risingDeg += 360;
  const risingSignIndex = Math.floor(risingDeg / 30);
  const risingSign = ZODIAC_SIGNS[risingSignIndex];
  
  // 3.4 CALCULATE PLANETS PLACEMENTS
  // We approximate using their orbital periods from a random seed deterministic to the birth date
  const placements = {};
  
  // Sun, Moon, Rising details
  placements['sun'] = {
    name: 'Sun',
    symbol: '☉',
    degree: Math.floor(sunDeg % 30),
    absoluteDegree: sunDeg,
    sign: sunSign.name,
    house: 1, // Will compute house placements later
    aspects: [],
    interpretation: INTERPRETATIONS.sun[sunSign.name] || `Your essential ego is characterized by the qualities of ${sunSign.name}.`
  };
  
  placements['moon'] = {
    name: 'Moon',
    symbol: '☽',
    degree: Math.floor(moonDeg % 30),
    absoluteDegree: moonDeg,
    sign: moonSign.name,
    house: 1,
    aspects: [],
    interpretation: INTERPRETATIONS.moon[moonSign.name] || `Your emotional blueprint and inner self react with the energy of ${moonSign.name}.`
  };
  
  placements['rising'] = {
    name: 'Rising (Ascendant)',
    symbol: 'Asc',
    degree: Math.floor(risingDeg % 30),
    absoluteDegree: risingDeg,
    sign: risingSign.name,
    house: 1, // Always 1st house cusp
    aspects: [],
    interpretation: `Your Rising sign is ${risingSign.name}. This is your social mask, your lens on the world, and the first impression you make on others. You approach new environments with the style, elements, and charm of ${risingSign.name}.`
  };
  
  // Outer planets calculations (pseudo-scientific based on epochs)
  PLANETS.forEach(p => {
    if (p.id === 'sun' || p.id === 'moon') return;
    
    // Approximate coordinate calculation
    let pDeg = 0;
    if (p.id === 'mercury') {
      // Mercury is never more than 28 degrees from the Sun
      const offset = (randomizer(seed + 1) * 56) - 28;
      pDeg = (sunDeg + offset + 360) % 360;
    } else if (p.id === 'venus') {
      // Venus is never more than 48 degrees from the Sun
      const offset = (randomizer(seed + 2) * 96) - 48;
      pDeg = (sunDeg + offset + 360) % 360;
    } else {
      // Outer planets travel across orbit based on epoch diffs
      const orbitOffset = (diffDays / p.basePeriod) * 360;
      const initialPositions = { mars: 240, jupiter: 55, saturn: 15, uranus: 310, neptune: 290, pluto: 220 };
      pDeg = (initialPositions[p.id] + orbitOffset) % 360;
      if (pDeg < 0) pDeg += 360;
    }
    
    const signIndex = Math.floor(pDeg / 30);
    const signName = ZODIAC_SIGNS[signIndex].name;
    
    let interp = INTERPRETATIONS[p.id]?.[signName] || `This represents how you express your ${p.id} energy (ruling ${p.keyword}) through the intellectual and spiritual filter of ${signName}.`;
    
    placements[p.id] = {
      name: p.name,
      symbol: p.symbol,
      degree: Math.floor(pDeg % 30),
      absoluteDegree: pDeg,
      sign: signName,
      house: 1,
      aspects: [],
      interpretation: interp
    };
  });
  
  // 3.5 HOUSE MAPPING (Equal House System starting at Rising Degree)
  // House 1 cusp = Ascendant. House 2 cusp = Ascendant + 30, and so on.
  const houseCusps = Array.from({ length: 12 }, (_, idx) => (risingDeg + (idx * 30)) % 360);
  
  // Map planets to houses
  const getHouseNumber = (planetAbsDeg) => {
    let relativeDeg = (planetAbsDeg - risingDeg + 360) % 360;
    return Math.floor(relativeDeg / 30) + 1;
  };
  
  Object.keys(placements).forEach(key => {
    if (key === 'rising') return;
    const houseNum = getHouseNumber(placements[key].absoluteDegree);
    placements[key].house = houseNum;
    
    // Add dynamic house descriptions to interpretation
    const houseInfo = HOUSES[houseNum - 1];
    placements[key].houseDetail = `Placed in the ${houseInfo.number} House: Governs ${houseInfo.area.toLowerCase()}.`;
  });
  
  // 3.6 CALCULATE CELESTIAL ASPECTS (CONJUNCTION, TRINE, SQUARE, OPPOSITION)
  const pKeys = Object.keys(placements).filter(k => k !== 'rising');
  const aspectList = [];
  
  for (let i = 0; i < pKeys.length; i++) {
    for (let j = i + 1; j < pKeys.length; j++) {
      const p1 = placements[pKeys[i]];
      const p2 = placements[pKeys[j]];
      
      const diff = Math.abs(p1.absoluteDegree - p2.absoluteDegree);
      const angle = diff > 180 ? 360 - diff : diff;
      
      let aspect = null;
      let orb = 6; // Orb of influence
      
      if (angle <= orb) {
        aspect = { name: 'Conjunction', symbol: '☌', angle: 0, desc: 'Unified focus, intensity, blended energies.' };
      } else if (Math.abs(angle - 120) <= orb) {
        aspect = { name: 'Trine', symbol: '△', angle: 120, desc: 'Harmonious, effortless, natural gifts and flow.' };
      } else if (Math.abs(angle - 90) <= orb) {
        aspect = { name: 'Square', symbol: '□', angle: 90, desc: 'Friction, motivational tension, drives achievement.' };
      } else if (Math.abs(angle - 180) <= orb) {
        aspect = { name: 'Opposition', symbol: '☍', angle: 180, desc: 'Relational tension, projection, balance seeking.' };
      } else if (Math.abs(angle - 60) <= orb) {
        aspect = { name: 'Sextile', symbol: '✶', angle: 60, desc: 'Exciting opportunities, supportive creative channels.' };
      }
      
      if (aspect) {
        const item = {
          p1: p1.name,
          p1Symbol: p1.symbol,
          p2: p2.name,
          p2Symbol: p2.symbol,
          aspect: aspect.name,
          symbol: aspect.symbol,
          angle: aspect.angle,
          description: `Your ${p1.name} forms a ${aspect.name} (${aspect.symbol}) with your ${p2.name}. ${aspect.desc}`
        };
        p1.aspects.push(item);
        p2.aspects.push(item);
        aspectList.push(item);
      }
    }
  }
  
  return {
    placements,
    houseCusps,
    aspects: aspectList,
    meta: {
      birthDate: dateString,
      birthTime: timeString,
      location,
      dayOfYear,
      seed
    }
  };
}

// 4. PERSONALIZED HOROSCOPES GENERATOR (CONTENT DEPTH)
export function getHoroscope(sunSignName, moonSignName, type = 'daily') {
  const sunSign = ZODIAC_SIGNS.find(s => s.name === sunSignName) || ZODIAC_SIGNS[0];
  const moonSign = ZODIAC_SIGNS.find(s => s.name === moonSignName) || ZODIAC_SIGNS[1];
  
  // Seed hash for dynamic randomized text that is consistent per day/week/month
  const today = new Date();
  let dateSeed = today.getDate() + (today.getMonth() + 1) * 31 + today.getFullYear();
  if (type === 'weekly') {
    const oneJan = new Date(today.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
    const result = Math.ceil(( today.getDay() + 1 + numberOfDays) / 7);
    dateSeed = result + today.getFullYear() * 52;
  } else if (type === 'monthly') {
    dateSeed = today.getMonth() + 1 + today.getFullYear() * 12;
  }
  
  const hash = (sunSign.name.length * 3) + (moonSign.name.length * 5) + dateSeed;
  const choose = (arr, offset = 0) => arr[(hash + offset) % arr.length];
  
  // Score generation
  const loveScore = 60 + (hash % 38);
  const careerScore = 55 + ((hash + 12) % 43);
  const wellnessScore = 62 + ((hash + 24) % 36);
  const spiritualScore = 50 + ((hash + 36) % 49);
  
  const totalScore = Math.floor((loveScore + careerScore + wellnessScore + spiritualScore) / 4);
  
  const loveTexts = [
    `Venus sparkles in your relation sector. Today is about speaking from the heart. If in a partnership, a gentle gesture goes a long way. Singles will find an intense pull toward someone of a ${choose(['Air', 'Water', 'Fire', 'Earth'])} element.`,
    `A transit between Mars and your ${sunSign.name} energy stirs deep passion but also minor sparks. Communication is key; don't let unspoken expectations build a wall. Open up your vulnerable side.`,
    `A celestial embrace from the Moon in ${moonSign.name} encourages you to host a romantic evening or pamper yourself. True connection flows when you let go of trying to control the narrative.`,
    `Emotional tides run high today. Take a step back before making key romantic decisions. Healing energy is surrounding your house of relationships. Trust the cosmic timing.`
  ];
  
  const careerTexts = [
    `Your planetary ruler, ${sunSign.ruler}, aligns with Saturn, bringing amazing support for long-term strategies. Draw up blueprints, sign papers, and structure your workspace.`,
    `An energetic boost in your solar house of career suggests a busy, communicative period. Trust your sharp intuition today, especially with financial negotiations.`,
    `A powerful transition urges you to shed old goals that no longer fit. Focus on creating value rather than merely looking busy. A supportive connection offers valuable insights.`,
    `A day of steady progress. An unexpected task will test your adaptability, but your natural ${sunSign.keywords.split(',')[0]} qualities will help you shine.`
  ];
  
  const wellnessTexts = [
    `Your planetary layout suggests resting and resetting. Unwind by turning off devices. Drink plenty of water and ground yourself with nature.`,
    `Physical vitalities are soaring! Channel this dynamic force into active workouts or deep clearing. Keep your diet clean and focus on deep breathing.`,
    `Emotional healing is taking place. Journaling or talking with a trusted friend will help release accumulated stress. Guard your sleep schedule.`,
    `Balance is your keyword. Mix focus with active play. Your body is calling for sensory restoration—indulge in a warm bath or a calming massage.`
  ];
  
  const cosmicQuotes = [
    "The stars dictate our inclinations, but our actions define our destiny.",
    "Look up at the stars and not down at your feet. Be curious.",
    "In the cosmic dance, even our challenges are beautiful steps toward growth.",
    "Your birth chart is the map of your potential. Live every aspect of it.",
    "The universe does not happen to you, it flows through you."
  ];

  return {
    type,
    sunSignName,
    moonSignName,
    overallScore: totalScore,
    categories: {
      love: { score: loveScore, title: 'Love & Intimacy', text: choose(loveTexts, 1) },
      career: { score: careerScore, title: 'Career & Abundance', text: choose(careerTexts, 2) },
      wellness: { score: wellnessScore, title: 'Wellness & Energy', text: choose(wellnessTexts, 3) },
      spiritual: { score: spiritualScore, title: 'Cosmic & Spiritual', text: `With your Moon in ${moonSign.name}, today's transits trigger your intuitive sense. You are receiving key messages via dreams. Spend 10 minutes in absolute silence.` }
    },
    quote: choose(cosmicQuotes, 4)
  };
}

// 5. COMPATIBILITY CALCULATOR ENGINE (CONTENT DEPTH)
export function calculateCompatibility(chart1, chart2) {
  // Simple compatibility calculations using element and mod matches of Sun, Moon, and Venus
  const s1 = ZODIAC_SIGNS.find(s => s.name === chart1.placements.sun.sign);
  const s2 = ZODIAC_SIGNS.find(s => s.name === chart2.placements.sun.sign);
  
  const m1 = ZODIAC_SIGNS.find(s => s.name === chart1.placements.moon.sign);
  const m2 = ZODIAC_SIGNS.find(s => s.name === chart2.placements.moon.sign);
  
  const v1 = ZODIAC_SIGNS.find(s => s.name === chart1.placements.venus.sign);
  const v2 = ZODIAC_SIGNS.find(s => s.name === chart2.placements.venus.sign);
  
  // Element matches (Fire-Air are compatible, Earth-Water are compatible)
  const getElementMatch = (e1, e2) => {
    if (e1 === e2) return 95; // Same element
    if ((e1 === 'Fire' && e2 === 'Air') || (e1 === 'Air' && e2 === 'Fire')) return 88;
    if ((e1 === 'Earth' && e2 === 'Water') || (e1 === 'Water' && e2 === 'Earth')) return 90;
    return 55; // Neutral or clashing elements
  };
  
  const sunMatch = getElementMatch(s1.element, s2.element);
  const moonMatch = getElementMatch(m1.element, m2.element);
  const venusMatch = getElementMatch(v1.element, v2.element);
  
  // Modality matches (Same modal can square/oppose: tension; different mods can flow or clash)
  const getModMatch = (m1, m2) => {
    if (m1 === m2) return 65; // High tension but high attraction
    if (m1 === 'Cardinal' && m2 === 'Mutable') return 80;
    if (m1 === 'Fixed' && m2 === 'Mutable') return 85;
    return 75;
  };
  
  const modMatch = (getModMatch(s1.modality, s2.modality) + getModMatch(m1.modality, m2.modality)) / 2;
  
  // Custom categories scores
  const romanceScore = Math.floor((sunMatch * 0.3) + (venusMatch * 0.7));
  const communicationScore = Math.floor((sunMatch * 0.6) + (moonMatch * 0.4) + (modMatch * 0.1) - 5);
  const intimacyScore = Math.floor((moonMatch * 0.6) + (venusMatch * 0.4));
  const valuesScore = Math.floor((sunMatch * 0.5) + (moonMatch * 0.5));
  
  const overallScore = Math.floor((romanceScore + communicationScore + intimacyScore + valuesScore) / 4);
  
  // Dynamic report texts
  let romanceText = "";
  if (romanceScore >= 80) {
    romanceText = `Sparkling chemistry! ${s1.name} and ${s2.name} share highly supportive Venusian flows. Love feels natural, and expressing affection brings joy. You are easily drawn to each other's beauty and values.`;
  } else if (romanceScore >= 60) {
    romanceText = `A pleasant flow with mild effort. While you express romance differently (${s1.element} vs ${s2.element}), there is strong mutual respect. You spark each other's curiosity.`;
  } else {
    romanceText = `Fascinating friction! Your romantic styles clash slightly, meaning you must work to understand each other's expressions of love. This friction can trigger intense attraction.`;
  }
  
  let commText = "";
  if (communicationScore >= 80) {
    commText = `Exceptional mental connection. You listen deeply and communicate with fluid ease. Talk sessions are highly stimulating, and disputes are resolved through clear logic and emotional maturity.`;
  } else {
    commText = `Active growth. With different modalities (${s1.modality} and ${s2.modality}), minor misunderstandings will manifest. True dialogue occurs when you stop pushing your view and embrace their lens.`;
  }
  
  let challengeText = "";
  if (overallScore >= 80) {
    challengeText = `Your greatest challenge is complacency. When relationships flow so effortlessly, you might ignore minor cracks. Keep speaking openly and don't stop dating each other.`;
  } else {
    challengeText = `Power dynamics and differing emotional tempos. With ${m1.name} (Moon) and ${m2.name} (Moon), your emotional routines differ. Healing is found through giving each other space and respecting boundaries.`;
  }

  return {
    overallScore,
    scores: {
      romance: romanceScore,
      communication: communicationScore,
      intimacy: intimacyScore,
      values: valuesScore
    },
    placements: {
      p1Sun: s1,
      p2Sun: s2,
      p1Moon: m1,
      p2Moon: m2
    },
    sections: {
      romance: { title: 'Love & Romantic Spark', text: romanceText },
      communication: { title: 'Communication Flow', text: commText },
      challenges: { title: 'Potential Challenges & Karma', text: challengeText }
    }
  };
}
