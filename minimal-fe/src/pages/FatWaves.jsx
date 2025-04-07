import { useEffect, useRef } from "react";
import * as d3 from "d3";

const FatWaves = () => {
  const svgRef = useRef(null);
  
  // Fixed dimensions for a small constant box
  const width = 600;
  const height = 360;
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Create SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    // Create simple pixel border
    const pixelSize = 2;
    const frameColor = "#0f0"; // Forest green color for frame
    const swirlColor = "#0f0"; // Same green for swirl
    
    // Draw pixel border
    const frameGroup = svg.append("g").attr("class", "pixel-frame");
    
    // Top and bottom borders
    for (let x = 0; x < width; x += pixelSize) {
      // Top border
      frameGroup.append("rect")
        .attr("x", x)
        .attr("y", 0)
        .attr("width", pixelSize)
        .attr("height", pixelSize)
        .attr("fill", frameColor);
      
      // Bottom border
      frameGroup.append("rect")
        .attr("x", x)
        .attr("y", height - pixelSize)
        .attr("width", pixelSize)
        .attr("height", pixelSize)
        .attr("fill", frameColor);
    }
    
    // Left and right borders
    for (let y = pixelSize; y < height - pixelSize; y += pixelSize) {
      // Left border
      frameGroup.append("rect")
        .attr("x", 0)
        .attr("y", y)
        .attr("width", pixelSize)
        .attr("height", pixelSize)
        .attr("fill", frameColor);
      
      // Right border
      frameGroup.append("rect")
        .attr("x", width - pixelSize)
        .attr("y", y)
        .attr("width", pixelSize)
        .attr("height", pixelSize)
        .attr("fill", frameColor);
    }
    
    // Create a single swirly cone
    const centerX = width / 2;
    const centerY = height / 2;
    const swirlPath = svg.append("path")
      .attr("class", "swirl-cone")
      .attr("fill", "none")
      .attr("stroke", swirlColor) // Using green for the swirl
      .attr("stroke-width", 1)
      .attr("stroke-linecap", "round");
    
    // Animation function
    let phase = 0;
    const animate = () => {
      phase += 0.025; // Animation speed
      
      // Generate points for the swirly cone
      const points = [];
      const secondaryPoints = []; // Points for the second wave
      const turns = 3; // Number of spiral turns
      const maxRadius = Math.min(width, height) * 0.35; // Maximum radius
      
      // Create spiral points
      for (let i = 0; i <= 120; i++) {
        const t = i / 120;
        const angle = t * Math.PI * 2 * turns + phase;
        const radius = t * maxRadius;
        
        // Crisp, precise wave effects with controlled amplitudes
        const wobble = Math.sin(t * Math.PI * 8 + phase * 3) * (t * 10); // Increased amplitude
        const sinusiEffect1 = Math.sin(t * Math.PI * 12 + phase * 2) * (t * 15); // Increased amplitude
        const sinusiEffect2 = Math.cos(t * Math.PI * 5 - phase) * (t * 8); // Increased amplitude
        
        // Wave effect with sharp transition
        const waveThreshold = 0.4;
        const waveIntensity = t > waveThreshold ? 
            Math.sin(t * Math.PI * 20 + phase * 4) * (t * 25) : 0; // Increased amplitude
            
        // Precise additional effects with controlled magnitudes
        const pulseEffect = Math.sin(phase * 0.5) * (t * 14); // Increased pulsing
        const rippleEffect = Math.sin(t * Math.PI * 30 + phase * 2) * (t * 15); // Increased ripples
        const twistEffect = Math.cos(t * Math.PI * 3 - phase * 1.5) * (t * 20); // Increased twisting
        
        // Precise modulation effects
        const amplitudeModulation = (1 + Math.sin(phase * 0.3)) * 0.5 * (t * 20); // Increased modulation
        const freqMod = Math.sin(t * Math.PI * (6 + Math.sin(phase) * 2) + phase * 2) * (t * 15); // Increased frequency modulation
        
        // Combine effects with balanced weighting
        const combinedEffect = wobble + sinusiEffect1 + sinusiEffect2 + waveIntensity + 
                              pulseEffect + rippleEffect + twistEffect + amplitudeModulation + freqMod;
        
        // Enhanced breathing effect for more dynamic movement
        const breathingFactor = 1 + Math.sin(phase * 0.2) * 0.12; // Increased breathing
        
        const x = centerX + Math.cos(angle) * (radius + combinedEffect) * breathingFactor;
        const y = centerY + Math.sin(angle) * (radius + combinedEffect) * breathingFactor;
        
        points.push([x, y]);
        
        // Create a second, noisier wave that stays relatively close to the first
        // Use a different phase offset and slightly different parameters
        const noisePhase = phase * 1.2;
        const noiseAmplitude = 0.4; // Controls how far the noisy wave can deviate
        
        // Add controlled noise that's proportional to t (distance from center)
        const noise1 = Math.sin(t * Math.PI * 15 + noisePhase * 2.5) * (t * 12) * noiseAmplitude;
        const noise2 = Math.cos(t * Math.PI * 22 - noisePhase * 1.8) * (t * 10) * noiseAmplitude;
        const noise3 = Math.sin(t * Math.PI * 8 + noisePhase * 3.2) * (t * 15) * noiseAmplitude;
        
        // Combine noise effects but keep them bounded
        const noiseCombined = (noise1 + noise2 + noise3) * 0.8;
        
        // Ensure the noisy wave stays relatively close to the main wave
        const maxDeviation = maxRadius * 0.35 * t; // Maximum allowed deviation, increases with t
        const clampedNoise = Math.max(Math.min(noiseCombined, maxDeviation), -maxDeviation);
        
        // Create the second wave with a slightly different radius and the clamped noise
        const secondaryRadius = radius * 0.85; // Slightly smaller radius
        const nx = centerX + Math.cos(angle - 0.2) * (secondaryRadius + combinedEffect * 0.7 + clampedNoise) * breathingFactor;
        const ny = centerY + Math.sin(angle - 0.2) * (secondaryRadius + combinedEffect * 0.7 + clampedNoise) * breathingFactor;
        
        secondaryPoints.push([nx, ny]);
      }
      
      // Create spiral path
      const lineGenerator = d3.line()
        .x(d => d[0])
        .y(d => d[1])
        .curve(d3.curveBasisClosed); // Smooth closed curve for more organic feel
      
      // Apply the path
      swirlPath.attr("d", lineGenerator(points));
      
      // Add subtle glow effect that changes with phase
      const glowIntensity = 2 + Math.sin(phase) * 1;
    //   swirlPath.attr("filter", `blur(${glowIntensity}px)`);
      
      // Request next animation frame
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Clean up
    return () => {
      // No need to cancel animation frame as component will unmount
    };
  }, []);
  
  return (
    <div className="swirl-cone-container" style={{ 
      width: `${width}px`, 
      height: `${height}px`,
      margin: "20px auto",
      overflow: "hidden",
      backgroundColor: "#000000" // Black background
    }}>
      <svg 
        ref={svgRef} 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
      />
    </div>
  );
};

export default FatWaves;