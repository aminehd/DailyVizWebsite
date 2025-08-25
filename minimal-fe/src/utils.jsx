export const createBorder = (fmg, width, height, pixelSize, frameColor) => {
    // Top and bottom borders
      for (let x = 0; x < width; x += pixelSize) {
        // Top border
        fmg.append("rect")
          .attr("x", x)
          .attr("y", 0)
          .attr("width", pixelSize)
          .attr("height", pixelSize)
          .attr("fill", frameColor);
        
        // Bottom border
        fmg.append("rect")
          .attr("x", x)
          .attr("y", height - pixelSize)
          .attr("width", pixelSize)
          .attr("height", pixelSize)
          .attr("fill", frameColor);
      }
      
      // Left and right borders
      for (let y = pixelSize; y < height - pixelSize; y += pixelSize) {
        // Left border
        fmg.append("rect")
          .attr("x", 0)
          .attr("y", y)
          .attr("width", pixelSize)
          .attr("height", pixelSize)
          .attr("fill", frameColor);
        
        // Right border
        fmg.append("rect")
          .attr("x", width - pixelSize)
          .attr("y", y)
          .attr("width", pixelSize)
          .attr("height", pixelSize)
          .attr("fill", frameColor);
      }
    }
