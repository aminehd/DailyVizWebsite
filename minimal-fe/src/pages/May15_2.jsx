import { useEffect, useRef } from "react";
import * as d3 from "d3";

const May12 = () => {
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
    
    // Animation function
    let phase = 0;
    const animate = () => {
      phase += 0.025; // Animation speed
      
      // TODO: Add your visualization code here
      // This is where you'll create your animated elements
     
      // make 2 entagled closed waves
      // Create data points for the waves
      const points = Array.from({ length: 100 }, (_, i) => i);
      
      // Define wave paths
      const wave1Path = svg.selectAll(".wave1").data([points]);
      const wave2Path = svg.selectAll(".wave2").data([points]);
      
      // Create paths if they don't exist
      if (wave1Path.empty()) {
        svg.append("path")
          .attr("class", "wave1")
          .attr("fill", "none")
          .attr("stroke", "#0f0")
          .attr("stroke-width", 2);
      }
      
      if (wave2Path.empty()) {
        svg.append("path")
          .attr("class", "wave2")
          .attr("fill", "none")
          .attr("stroke", "#0f0")
          .attr("stroke-width", 2);
      }
      
      // Generate wave data
      // First wave: a simple parametric circle with sinusoidal radius variation
      const lineGenerator = d3.line()
        .x((d, i) => {
          const t = i * Math.PI * 2 / 100;  // Parameter t in [0, 2π]
          const baseRadius = 100;           // Base circle radius
          
          // Create sudden mountains that appear periodically
          const mountainFrequency = 100;      // Number of mountains
          const mountainWidth = 0.3;        // Width of each mountain (in radians)
          const mountainHeight = 12 * Math.sin(phase * 0.5); // Height varies with phase
          
          // Calculate mountain effect - only add height if we're within a mountain zone
          let mountainEffect = 0;
          for (let m = 0; m < mountainFrequency; m++) {
            const mountainCenter = m * (Math.PI * 2 / mountainFrequency);
            const distFromCenter = Math.abs((t - mountainCenter + Math.PI) % (Math.PI * 2) - Math.PI);
            
            if (distFromCenter < mountainWidth) {
              // Create a smooth peak using cosine
              mountainEffect = mountainHeight * Math.cos(distFromCenter / mountainWidth * Math.PI / 2);
            }
          }
          
          return width/2 + Math.cos(t) * (baseRadius + mountainEffect);
        })
        .y((d, i) => {
          const t = i * Math.PI * 2 / 100;  // Parameter t in [0, 2π]
          const baseRadius = 100;           // Base circle radius
          
          // Create sudden mountains that appear periodically
          const mountainFrequency = 100;      // Number of mountains
          const mountainWidth = 0.01;        // Width of each mountain (in radians)
          const mountainHeight = 12 * Math.sin(phase * 0.5 + 1); // Height varies with phase (offset)
          
          // Calculate mountain effect - only add height if we're within a mountain zone
          let mountainEffect = 0;
          for (let m = 0; m < mountainFrequency; m++) {
            const mountainCenter = m * (Math.PI * 2 / mountainFrequency) + 0.2; // Offset from x mountains
            const distFromCenter = Math.abs((t - mountainCenter + Math.PI) % (Math.PI * 2) - Math.PI);
            
            if (distFromCenter < mountainWidth) {
              // Create a smooth peak using cosine
              mountainEffect = mountainHeight * Math.cos(distFromCenter / mountainWidth * Math.PI / 2);
            }
          }
          
          return height/2 + Math.sin(t) * (baseRadius + mountainEffect);
        })
        .curve(d3.curveBasisClosed);
      
      // Second wave: similar to first but with phase shift and different parameters
      const lineGenerator2 = d3.line()
        .x((d, i) => {
          const t = i * Math.PI * 2 / 100;  // Parameter t in [0, 2π]
          const baseRadius = 90;            // Slightly smaller base radius
          
          // Create sudden mountains that appear periodically
          const mountainFrequency = 7;      // Different number of mountains
          const mountainWidth = 0.25;       // Width of each mountain (in radians)
          const mountainHeight = 25 * Math.sin(phase * 0.7); // Height varies with phase
          
          // Calculate mountain effect - only add height if we're within a mountain zone
          let mountainEffect = 0;
          for (let m = 0; m < mountainFrequency; m++) {
            const mountainCenter = m * (Math.PI * 2 / mountainFrequency) + phase * 0.1; // Moving mountains
            const distFromCenter = Math.abs((t - mountainCenter + Math.PI) % (Math.PI * 2) - Math.PI);
            
            if (distFromCenter < mountainWidth) {
              // Create a smooth peak using cosine
              mountainEffect = mountainHeight * Math.cos(distFromCenter / mountainWidth * Math.PI / 2);
            }
          }
          
          return width/2 + Math.cos(t) * (baseRadius + mountainEffect);
        })
        .y((d, i) => {
          const t = i * Math.PI * 2 / 100;  // Parameter t in [0, 2π]
          const baseRadius = 90;            // Slightly smaller base radius
          
          // Create sudden mountains that appear periodically
          const mountainFrequency = 7;      // Different number of mountains
          const mountainWidth = 0.25;       // Width of each mountain (in radians)
          const mountainHeight = 25 * Math.sin(phase * 0.7 + 0.8); // Height varies with phase (offset)
          
          // Calculate mountain effect - only add height if we're within a mountain zone
          let mountainEffect = 0;
          for (let m = 0; m < mountainFrequency; m++) {
            const mountainCenter = m * (Math.PI * 2 / mountainFrequency) + phase * 0.1 + 0.3; // Moving mountains
            const distFromCenter = Math.abs((t - mountainCenter + Math.PI) % (Math.PI * 2) - Math.PI);
            
            if (distFromCenter < mountainWidth) {
              // Create a smooth peak using cosine
              mountainEffect = mountainHeight * Math.cos(distFromCenter / mountainWidth * Math.PI / 2);
            }
          }
          
          return height/2 + Math.sin(t) * (baseRadius + mountainEffect);
        })
        .curve(d3.curveBasisClosed);
      
      // Update the paths
      svg.select(".wave1")
        .attr("d", lineGenerator(points));
      
      svg.select(".wave2")
        .attr("d", lineGenerator2(points));
      
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
    <div className="viz-container" style={{ 
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

export default May12;