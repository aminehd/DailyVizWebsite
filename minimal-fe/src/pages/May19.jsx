import { useEffect, useRef } from "react";
import * as d3 from "d3";

const May19 = () => {
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
    // show the points
  
    const animate = () => {
      phase += 0.025; // Animation speed

      // make two points move in a checker board pattern
      // Create two points that move in a checkerboard pattern in the center
      const points = [
        { x: width/2 - 50, y: height/2 - 50 },
        { x: width/2 + 50, y: height/2 + 50 }
      ];
      
      // Update positions with phase
      points.forEach((point, index) => {
        const offset = index === 0 ? Math.PI/4 : -Math.PI/2;
        // make them go on spiral pattern around the center and 360 (width/ 2, height/ 2)
        // Create randomized motion patterns
        // Use deterministic motion without random noise to reduce visual clutter
        // Add randomness to both radius and angle for unpredictable separation
        const baseRadius = 50 + 20 * Math.sin(phase * 0.5);
        const randomFactor = Math.sin(phase * 3 + index * 7) * 30; // Creates periodic randomness
        const radius = baseRadius + randomFactor;
        
        // Add some jitter to the angle
        const angle = phase * 2 + (index * Math.PI) + Math.cos(phase * 4) * 0.3;
        
        // Apply the calculations with occasional sudden jumps
        point.x = width/2 + Math.cos(angle) * radius * offset;
        point.y = height/2 + Math.sin(angle) * radius * offset;
        


      });
      
      // Remove old circles and draw new ones
      svg.selectAll("circle").remove();
      svg.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 5)
        .attr("fill", "#0f0"); // Green color
      
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

export default May19;