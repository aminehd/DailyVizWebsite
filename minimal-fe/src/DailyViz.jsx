import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
// import components
import BarChart from './pages/BarChart'
import ColorfulGrid from './pages/ColorfulGrid'
import MinimalistPixels from './pages/MinimalistPixels'
import EmergentSystem from './pages/EmergentSystem'
import FatWaves from './pages/FatWaves'
import May12 from './pages/May12'
import May15 from './pages/May15'
import May15_2 from './pages/May15_2'
import May19 from './pages/May19'
import May21 from './pages/May21'
import May23 from './pages/May23'
import May28 from './pages/May28'
import June9 from './pages/June9'
import June17 from './pages/June17'
import June19 from './pages/June19'
import June21 from './pages/June21'
import June01 from './pages/June01'
import Aug25 from './pages/08_aug_25'
const DailyViz = () => {
  const madeupdata = [
    { domain: "github.com", count: 1280 },
    { domain: "medium.com", count: 95 },
    { domain: "nytimes.com", count: 82 },
    { domain: "techcrunch.com", count: 78 },
    { domain: "dev.to", count: 65 },
    { domain: "wired.com", count: 58 },
    { domain: "theverge.com", count: 52 },
    { domain: "arstechnica.com", count: 47 },
    { domain: "bloomberg.com", count: 43 },
    { domain: "cnn.com", count: 38 },
    { domain: "washingtonpost.com", count: 35 },  
  ]
    
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ 
          color: '#5bff5b', 
          textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
          fontFamily: 'monospace'
        }}>
          D3 animations
          <Aug25 />
          <June01 />
          <June21 />
          <June19 />
          <June17 />
          <June9 />
          <May28 />
          <May23 />
          <May21 />
          <May19 />
          <May15_2 />
          <May15   />
          <May12 />
          <FatWaves />
        {/* <EmergentSystem /> */}
        </h1>
        <a 
          href="/"  
          style={{
            backgroundColor: '#0f0',
            color: '#121212',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none',
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }}
        >
          BACK TO MAIN
        </a>
      </div>

      {/* Emergent System - NEW */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '20px',
        border: '1px solid #0f0',
        backgroundColor: '#121212',
        borderRadius: '4px'
      }}>
        <h2 style={{ 
          color: '#7fff7f', 
          marginBottom: '20px',
          fontFamily: 'monospace'
        }}>
          EMERGENT SYSTEM
        </h2>
        <EmergentSystem />
      </div>

      {/* Minimalist Pixels Section */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '20px',
        border: '1px solid #0f0',
        backgroundColor: '#121212',
        borderRadius: '4px'
      }}>
        <h2 style={{ 
          color: '#7fff7f', 
          marginBottom: '20px',
          fontFamily: 'monospace'
        }}>
          MINIMALIST PIXELS
        </h2>
        <MinimalistPixels />
      </div>

      {/* Rotating Squares Grid Section */}
      <div style={{ 
        marginBottom: '40px', 
        padding: '20px',
        border: '1px solid #0f0',
        backgroundColor: '#121212',
        borderRadius: '4px'
      }}>
        <h2 style={{ 
          color: '#7fff7f', 
          marginBottom: '20px',
          fontFamily: 'monospace'
        }}>
          ROTATING SQUARES
        </h2>
        <ColorfulGrid />
      </div>
      
      {/* Bar Chart Section */}
      {/* <div style={{ 
        marginBottom: '40px', 
        padding: '20px',
        border: '1px solid #0f0',
        backgroundColor: '#121212',
        borderRadius: '4px'
      }}>
        <h2 style={{ 
          color: '#7fff7f', 
          marginBottom: '20px',
          fontFamily: 'monospace' 
        }}>
          DOMAIN VISUALIZATION
        </h2>
        <div style={{ height: '400px', width: '100%' }}>
          <BarChart data={madeupdata} />
        </div>
      </div> */}
    </div>
  )
}

export default DailyViz 
