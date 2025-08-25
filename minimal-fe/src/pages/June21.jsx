import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { createBorder } from "../utils";

const June21 = () => {
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
    
    createBorder(frameGroup, width, height, pixelSize, frameColor);
    
   
    
    // Animation function
    let phase = 0;
    const animate = () => {
      phase += 0.025; // Animation speed
      
      // TODO: Add your visualization code here
      // This is where you'll create your animated elements
      
      //      // make two points move in a checker board pattern
      // Create two points that move in a checkerboard pattern in the center
      const points = Array.from({ length: 36 }, (_, i) => {
        const gridSize = 50; // Size of each checker square
        const row = Math.floor(i / 5); // 5 points per row
        const col = i % 5; // 5 points per column
        const x = col * gridSize + gridSize/2 + 4 + width/6; // Center in each square
        const y = row * gridSize + gridSize/2 + height/6;
        return { x, y };
      });
      
      // Update positions with phase
      points.forEach((point, index) => {
        // Store original positions for interpolation
        const originalX = point.x;
        const originalY = point.y;
        const centerX = width/2;
        const centerY = height/2;
        
        // Use sine wave interpolation for smooth movement toward center and back
        const interpolationFactor = Math.sin(phase + index * 0.1) * 0.5 + 0.5; // 0 to 1 range
        
        // Interpolate between original position and center
        point.x = originalX + (centerX - originalX) * interpolationFactor;
        point.y = originalY + (centerY - originalY) * interpolationFactor;
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
      
        //Request next animation frame
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

export default June21;