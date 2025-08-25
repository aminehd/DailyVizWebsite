import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { createBorder } from "../utils";

const June01 = () => {
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
      // some points on a circle disk, eveywhere
      const points = Array.from({ length: 100 }, (_, i) => {
        const angle = i * 2 * Math.PI / 10;
        const radius = 0 + i * 10;
        const x = Math.cos(angle) * radius + width / 2 + 4;
        const y = Math.sin(angle) * radius + height / 2 + 4;
        return { x, y };
      });
      // make the points move in a spiral pattern
      points.forEach((point, index) => {
        const spiralAngle = phase * 2 + index * 0.1; // Slower rotation for spiral effect
        const radius = 20 + Math.sin(spiralAngle) * 30; // Oscillating radius between 20 and 50
        const x = point.x + Math.cos(spiralAngle) * radius;
        const y = point.y + Math.sin(spiralAngle) * radius;
        point.x = x;
        point.y = y;
      });
      
      svg.selectAll("circle").remove();
      svg.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 5)
        .attr("fill", "#0f0"); // Green color
      // This is where you'll create your animated elements
      
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

export default June01;