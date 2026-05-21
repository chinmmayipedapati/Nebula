/**
 * Interactive Astrology Chart Wheel Visualizer - Nebula Clone
 * Renders a high-resolution, interactive canvas-based astrological wheel
 * with rotating zodiac segments, house cusps, aspect lines, and clickable planet glyphs.
 */

import { ZODIAC_SIGNS } from './astrologyData.js';

export class AstrologyChartVisualizer {
  constructor(canvas, chartData, onNodeSelected) {
    this.canvas = canvas;
    this.chart = chartData;
    this.onNodeSelected = onNodeSelected;
    this.ctx = canvas.getContext('2d');
    this.planets = []; // Stores screen coordinates for interaction
    
    // Bind interaction events
    this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  // Draw or Redraw the entire chart wheel
  render() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const chart = this.chart;
    
    // Set high-DPI crisp canvas sizes
    const dpr = window.devicePixelRatio || 1;
    const size = canvas.parentElement.clientWidth || 360;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    
    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.45; // Outer radius
    
    // Clear background
    ctx.clearRect(0, 0, size, size);
    
    // Draw outer glow background
    const bgGlow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.1);
    bgGlow.addColorStop(0, 'rgba(18, 19, 36, 0.9)');
    bgGlow.addColorStop(0.8, 'rgba(10, 11, 18, 0.95)');
    bgGlow.addColorStop(1, 'rgba(5, 5, 10, 1)');
    ctx.fillStyle = bgGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
    ctx.fill();
    
    // Astrological convention: Rising sign (Ascendant degree) is placed exactly at 180 degrees (Left side)
    // All planetary and sign degrees are drawn relative to this rotation!
    const ascRad = (chart.placements.sun.absoluteDegree - chart.houseCusps[0]); // Offset calculation
    const rotationOffset = -chart.houseCusps[0] * (Math.PI / 180) + Math.PI; // Rotate Asc to Left Horizon
    
    this.rotationOffset = rotationOffset;
    this.cx = cx;
    this.cy = cy;
    this.R = R;
    
    // 1. DRAW ZODIAC OUTER SEGMENTS (12 Signs, each 30 degrees)
    for (let i = 0; i < 12; i++) {
      const startAngle = (i * 30) * (Math.PI / 180) + rotationOffset;
      const endAngle = ((i + 1) * 30) * (Math.PI / 180) + rotationOffset;
      const sign = ZODIAC_SIGNS[i];
      
      // Segment background
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, startAngle, endAngle);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.04)';
      ctx.fill();
      
      // Outer rim border
      ctx.beginPath();
      ctx.arc(cx, cy, R, startAngle, endAngle);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw Sign Symbol & Name in Segment
      const midAngle = startAngle + 15 * (Math.PI / 180);
      const textDist = R * 0.88;
      const tx = cx + Math.cos(midAngle) * textDist;
      const ty = cy + Math.sin(midAngle) * textDist;
      
      ctx.fillStyle = sign.color || '#ffffff';
      ctx.font = '16px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(sign.symbol, tx, ty);
      
      // Draw sign boundary line
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(startAngle) * (R * 0.78), cy + Math.sin(startAngle) * (R * 0.78));
      ctx.lineTo(cx + Math.cos(startAngle) * R, cy + Math.sin(startAngle) * R);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();
    }
    
    // Draw boundary circle separating outer signs ring and inner houses wheel
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.78, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 2. DRAW 12 HOUSE DIVISIONS
    for (let i = 0; i < 12; i++) {
      const houseDeg = chart.houseCusps[i];
      const rad = houseDeg * (Math.PI / 180) + rotationOffset;
      
      // Draw house line
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(rad) * (R * 0.38), cy + Math.sin(rad) * (R * 0.38));
      ctx.lineTo(cx + Math.cos(rad) * (R * 0.78), cy + Math.sin(rad) * (R * 0.78));
      
      // Ascendant (1st House) and Midheaven (10th House) lines are thick and glowing!
      if (i === 0) {
        ctx.strokeStyle = '#00f2fe'; // Ascendant cyan
        ctx.lineWidth = 2.5;
      } else if (i === 9) {
        ctx.strokeStyle = '#ffd700'; // Midheaven Gold
        ctx.lineWidth = 2;
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
      }
      ctx.stroke();
      
      // Draw House Numbers
      const midRad = ((houseDeg + 15) % 360) * (Math.PI / 180) + rotationOffset;
      const numDist = R * 0.44;
      const nx = cx + Math.cos(midRad) * numDist;
      const ny = cy + Math.sin(midRad) * numDist;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(i + 1, nx, ny);
    }
    
    // Draw inner circle that holds aspects
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.38, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.stroke();
    
    // 3. DRAW ASPECTS IN THE CENTER (Conjunction, Trine, Square, Opposition)
    chart.aspects.forEach(aspect => {
      const p1Data = chart.placements[Object.keys(chart.placements).find(k => chart.placements[k].name === aspect.p1)];
      const p2Data = chart.placements[Object.keys(chart.placements).find(k => chart.placements[k].name === aspect.p2)];
      
      if (!p1Data || !p2Data) return;
      
      const rad1 = p1Data.absoluteDegree * (Math.PI / 180) + rotationOffset;
      const rad2 = p2Data.absoluteDegree * (Math.PI / 180) + rotationOffset;
      
      const startX = cx + Math.cos(rad1) * (R * 0.38);
      const startY = cy + Math.sin(rad1) * (R * 0.38);
      const endX = cx + Math.cos(rad2) * (R * 0.38);
      const endY = cy + Math.sin(rad2) * (R * 0.38);
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      
      // Aspect line colors
      if (aspect.aspect === 'Conjunction') {
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)'; // Cyan
        ctx.setLineDash([2, 2]);
      } else if (aspect.aspect === 'Trine') {
        ctx.strokeStyle = 'rgba(46, 204, 113, 0.4)'; // Green trines
        ctx.setLineDash([]);
      } else if (aspect.aspect === 'Square') {
        ctx.strokeStyle = 'rgba(231, 76, 60, 0.4)'; // Red squares
        ctx.setLineDash([]);
      } else if (aspect.aspect === 'Opposition') {
        ctx.strokeStyle = 'rgba(155, 89, 182, 0.4)'; // Purple oppositions
        ctx.setLineDash([4, 4]);
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([]);
      }
      
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash
    });
    
    // 4. DRAW PLANETARY PLACEMENT NODES
    this.planets = []; // Clear current placements
    
    const keys = Object.keys(chart.placements).filter(k => k !== 'rising');
    
    // Sort planets by degrees to calculate overlaps and push overlapping nodes outwards
    const sortedPlanets = keys.map(k => ({ key: k, ...chart.placements[k] }))
      .sort((a, b) => a.absoluteDegree - b.absoluteDegree);
      
    // Detect overlaps and offset radius slightly for spacing
    for (let i = 0; i < sortedPlanets.length; i++) {
      const p = sortedPlanets[i];
      let pRad = p.absoluteDegree * (Math.PI / 180) + rotationOffset;
      
      // Base radial distance
      let currentRadius = R * 0.62;
      
      // Look at previous planet degree to check proximity (closer than 8 degrees)
      if (i > 0) {
        const prev = sortedPlanets[i - 1];
        if (Math.abs(p.absoluteDegree - prev.absoluteDegree) < 8.0) {
          currentRadius += 18; // Step out
        }
      }
      
      const px = cx + Math.cos(pRad) * currentRadius;
      const py = cy + Math.sin(pRad) * currentRadius;
      
      // Store positioning for mouse click hit testing
      this.planets.push({
        key: p.key,
        name: p.name,
        symbol: p.symbol,
        degree: p.degree,
        sign: p.sign,
        house: p.house,
        interpretation: p.interpretation,
        houseDetail: p.houseDetail,
        x: px,
        y: py,
        radius: 13 // Click radius
      });
      
      // Draw Node Outer Glow Ring
      ctx.beginPath();
      ctx.arc(px, py, 11, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(18, 19, 36, 0.95)';
      ctx.strokeStyle = this.selectedPlanetKey === p.key ? '#ffd700' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = this.selectedPlanetKey === p.key ? 2 : 1;
      
      // Add neon box shadow effect via native canvas shadow
      if (this.selectedPlanetKey === p.key) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
      }
      
      ctx.fill();
      ctx.stroke();
      
      // Reset canvas shadows
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
      
      // Draw Planet Glyph Symbol
      ctx.fillStyle = this.selectedPlanetKey === p.key ? '#ffd700' : '#ffffff';
      ctx.font = '12px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.symbol, px, py);
    }
    
    // Draw Center Astral Emblem (Astrological Sun Symbol or Cosmic Eye)
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd700'; // Center Sun golden dot
    ctx.fill();
  }
  
  // Click detection handler
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Find if clicked inside any planet node coordinates
    const clickedPlanet = this.planets.find(p => {
      const dist = Math.sqrt((mouseX - p.x) ** 2 + (mouseY - p.y) ** 2);
      return dist <= p.radius;
    });
    
    if (clickedPlanet) {
      this.selectedPlanetKey = clickedPlanet.key;
      this.render(); // Redraw with highlighted selected planet
      
      if (this.onNodeSelected) {
        this.onNodeSelected(clickedPlanet);
      }
    }
  }
  
  // Mouse hover cursor change
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const isHovering = this.planets.some(p => {
      const dist = Math.sqrt((mouseX - p.x) ** 2 + (mouseY - p.y) ** 2);
      return dist <= p.radius;
    });
    
    this.canvas.style.cursor = isHovering ? 'pointer' : 'default';
  }
}
