import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { createBorder } from "../utils";

const Aug25 = () => {
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
      
      // Request next animation frame
      const points = [
        // 10 points on a cube (3D projected to 2D for visualization)
        // Vertices of a cube centered in the middle of the SVG
        ...[
          // Cube size
          (() => {
            const cx = width / 2;
            const cy = height / 2;
            const size = 80;
            // 8 cube corners
            const cube3D = [
              [-1, -1, -1],
              [1, -1, -1],
              [1, 1, -1],
              [-1, 1, -1],
              [-1, -1, 1],
              [1, -1, 1],
              [1, 1, 1],
              [-1, 1, 1],
            ];
            // 2 extra points: center of front and back face
            const extra3D = [
              [0, 0, -1],
              [0, 0, 1],
            ];
            // Simple 3D to 2D projection
            const project = ([x, y, z]) => {
              // Perspective projection
              const scale = 120 / (z * 40 + 200);
              return {
                x: cx + x * size * scale,
                y: cy + y * size * scale,
              };
            };
            return [...cube3D, ...extra3D].map(project);
          })()
        ].flat()
      ];
      points.forEach((point, index) => {
        // make it move on edge of a square
        // Calculate position on square perimeter based on phase

        // make each pixel do a spining mazy motion based on index and phase
        const angle = phase * 10 + index * 10;
        const x = point.x + Math.cos(angle) * 10;
        const y = point.y + Math.sin(angle) * 10;
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
        .attr("fill", "red");
          
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

export default Aug25;