import { useEffect, useRef } from "react";
import * as d3 from "d3";

const May15 = () => {
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
      
      // Define cube parameters
      const cubeSize = 100;
      const centerX = width / 2;
      const centerY = height / 2;
      const perspective = 500;
      
      // Define cube vertices in 3D space (front face and back face)
      const frontTopLeft = { x: -cubeSize/2, y: -cubeSize/2, z: cubeSize/2 };
      const frontTopRight = { x: cubeSize/2, y: -cubeSize/2, z: cubeSize/2 };
      const frontBottomRight = { x: cubeSize/2, y: cubeSize/2, z: cubeSize/2 };
      const frontBottomLeft = { x: -cubeSize/2, y: cubeSize/2, z: cubeSize/2 };
      
      const backTopLeft = { x: -cubeSize/2, y: -cubeSize/2, z: -cubeSize/2 };
      const backTopRight = { x: cubeSize/2, y: -cubeSize/2, z: -cubeSize/2 };
      const backBottomRight = { x: cubeSize/2, y: cubeSize/2, z: -cubeSize/2 };
      const backBottomLeft = { x: -cubeSize/2, y: cubeSize/2, z: -cubeSize/2 };
      
      // Function to project 3D point to 2D
      const project = (point, rotationX, rotationY) => {
        // Apply rotation
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        
        // Rotate around Y axis
        const rotY = {
          x: point.x * cosY - point.z * sinY,
          y: point.y,
          z: point.x * sinY + point.z * cosY
        };
        
        // Rotate around X axis
        const rotXY = {
          x: rotY.x,
          y: rotY.y * cosX - rotY.z * sinX,
          z: rotY.y * sinX + rotY.z * cosX
        };
        
        // Project to 2D
        const scale = perspective / (perspective + rotXY.z);
        return {
          x: centerX + rotXY.x * scale,
          y: centerY + rotXY.y * scale,
          z: rotXY.z
        };
      };
      
      // Calculate rotation based on phase
      const rotationX = Math.sin(phase * 0.3) * 0.3 + Math.PI * 0.1;
      const rotationY = phase * 0.2;
      
      // Project cube vertices
      const projFrontTL = project(frontTopLeft, rotationX, rotationY);
      const projFrontTR = project(frontTopRight, rotationX, rotationY);
      const projFrontBR = project(frontBottomRight, rotationX, rotationY);
      const projFrontBL = project(frontBottomLeft, rotationX, rotationY);
      
      const projBackTL = project(backTopLeft, rotationX, rotationY);
      const projBackTR = project(backTopRight, rotationX, rotationY);
      const projBackBR = project(backBottomRight, rotationX, rotationY);
      const projBackBL = project(backBottomLeft, rotationX, rotationY);
      
      // Calculate positions for dots with z-coordinate for depth
      // Front to back movement for dots
      const dotZOffset = Math.sin(phase * 1.5) * cubeSize; // Move between front and back faces
      
      // Dot 1 - moves between front top edge and back top edge
      const dot1Z = cubeSize/2 - dotZOffset;
      const dot1 = {
        x: -cubeSize/2 + (cubeSize * (0.5 + 0.5 * Math.sin(phase * 2))),
        y: -cubeSize/2,
        z: dot1Z
      };
      
      // Dot 2 - moves between front right edge and back right edge
      const dot2Z = cubeSize/2 - dotZOffset;
      const dot2 = {
        x: cubeSize/2,
        y: -cubeSize/2 + (cubeSize * (0.5 + 0.5 * Math.sin(phase * 2 + Math.PI * 2/3))),
        z: dot2Z
      };
      
      // Dot 3 - moves between front left edge and back left edge
      const dot3Z = cubeSize/2 - dotZOffset;
      const dot3 = {
        x: -cubeSize/2,
        y: -cubeSize/2 + (cubeSize * (0.5 + 0.5 * Math.sin(phase * 2 + Math.PI * 4/3))),
        z: dot3Z
      };
      
      // Project the dots
      const projDot1 = project(dot1, rotationX, rotationY);
      const projDot2 = project(dot2, rotationX, rotationY);
      const projDot3 = project(dot3, rotationX, rotationY);
      
      // Draw or update cube edges
      svg.selectAll(".cube-edge").remove();
      
      // Front face
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontTL.x).attr("y1", projFrontTL.y)
        .attr("x2", projFrontTR.x).attr("y2", projFrontTR.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontTR.x).attr("y1", projFrontTR.y)
        .attr("x2", projFrontBR.x).attr("y2", projFrontBR.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontBR.x).attr("y1", projFrontBR.y)
        .attr("x2", projFrontBL.x).attr("y2", projFrontBL.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontBL.x).attr("y1", projFrontBL.y)
        .attr("x2", projFrontTL.x).attr("y2", projFrontTL.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1);
      
      // Back face
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projBackTL.x).attr("y1", projBackTL.y)
        .attr("x2", projBackTR.x).attr("y2", projBackTR.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.5);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projBackTR.x).attr("y1", projBackTR.y)
        .attr("x2", projBackBR.x).attr("y2", projBackBR.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.5);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projBackBR.x).attr("y1", projBackBR.y)
        .attr("x2", projBackBL.x).attr("y2", projBackBL.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.5);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projBackBL.x).attr("y1", projBackBL.y)
        .attr("x2", projBackTL.x).attr("y2", projBackTL.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.5);
      
      // Connect front and back faces
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontTL.x).attr("y1", projFrontTL.y)
        .attr("x2", projBackTL.x).attr("y2", projBackTL.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.7);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontTR.x).attr("y1", projFrontTR.y)
        .attr("x2", projBackTR.x).attr("y2", projBackTR.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.7);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontBR.x).attr("y1", projFrontBR.y)
        .attr("x2", projBackBR.x).attr("y2", projBackBR.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.7);
      
      svg.append("line").attr("class", "cube-edge")
        .attr("x1", projFrontBL.x).attr("y1", projFrontBL.y)
        .attr("x2", projBackBL.x).attr("y2", projBackBL.y)
        .attr("stroke", "#0f0").attr("stroke-width", 1).attr("stroke-opacity", 0.7);
      
      // Draw dots with opacity based on z-position
      svg.selectAll(".cube-dot").remove();
      
      // Calculate opacity based on z-position (closer dots are brighter)
      const getOpacity = (z) => {
        // Map z from [-cubeSize/2, cubeSize/2] to [0.3, 1]
        return 0.3 + 0.7 * ((z + cubeSize/2) / cubeSize);
      };
      
      // Calculate size based on z-position (closer dots are larger)
      const getSize = (z) => {
        // Map z from [-cubeSize/2, cubeSize/2] to [3, 6]
        return 3 + 3 * ((z + cubeSize/2) / cubeSize);
      };
      
      // Draw the dots
      svg.append("circle").attr("class", "cube-dot")
        .attr("cx", projDot1.x).attr("cy", projDot1.y)
        .attr("r", getSize(projDot1.z))
        .attr("fill", "#0f0")
        .attr("fill-opacity", getOpacity(projDot1.z));
      
      svg.append("circle").attr("class", "cube-dot")
        .attr("cx", projDot2.x).attr("cy", projDot2.y)
        .attr("r", getSize(projDot2.z))
        .attr("fill", "#0f0")
        .attr("fill-opacity", getOpacity(projDot2.z));
      
      svg.append("circle").attr("class", "cube-dot")
        .attr("cx", projDot3.x).attr("cy", projDot3.y)
        .attr("r", getSize(projDot3.z))
        .attr("fill", "#0f0")
        .attr("fill-opacity", getOpacity(projDot3.z));
      
      // Create a line generator for reference (to maintain compatibility with the rest of the code)
      const lineGenerator = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasisClosed);
      
     
      
      // Update the paths
      svg.select(".wave1")
        .attr("d", lineGenerator(points));
      

      
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

export default May15;