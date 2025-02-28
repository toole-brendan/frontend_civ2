import React from 'react';
import { 
  Box, 
  Typography, 
  Tooltip, 
  useTheme 
} from '@mui/material';

// SVG Map Component
const WorldMap: React.FC = () => {
  const theme = useTheme();
  
  // Define colors based on theme
  const landColor = theme.palette.mode === 'dark' ? '#2c3440' : '#e0e0e0';
  const borderColor = theme.palette.mode === 'dark' ? '#3c4758' : '#bdbdbd';
  const oceanColor = theme.palette.mode === 'dark' ? '#1c2430' : '#f5f5f5';
  const routeColor = theme.palette.mode === 'dark' ? '#4f5b6b' : '#9e9e9e';
  const activeRouteColor = theme.palette.primary.main;
  const delayedRouteColor = theme.palette.warning.main;
  const criticalRouteColor = theme.palette.error.main;
  
  return (
    <svg 
      viewBox="0 0 1000 500" 
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Ocean background */}
      <rect x="0" y="0" width="1000" height="500" fill={oceanColor} />
      
      {/* Simplified continent shapes */}
      <g stroke={borderColor} strokeWidth="1">
        {/* North America */}
        <path d="M150,120 L280,120 L300,200 L250,250 L200,270 L150,250 L120,200 Z" fill={landColor} />
        
        {/* South America */}
        <path d="M250,300 L300,300 L320,400 L270,450 L220,400 Z" fill={landColor} />
        
        {/* Europe */}
        <path d="M450,100 L550,100 L570,150 L520,200 L450,180 Z" fill={landColor} />
        
        {/* Africa */}
        <path d="M450,220 L550,220 L580,350 L500,400 L420,350 Z" fill={landColor} />
        
        {/* Asia */}
        <path d="M600,100 L800,100 L850,200 L800,300 L700,350 L600,300 L580,200 Z" fill={landColor} />
        
        {/* Australia */}
        <path d="M800,350 L900,350 L920,400 L850,450 L780,400 Z" fill={landColor} />
      </g>
      
      {/* Supply Chain Routes */}
      {/* Taiwan to Austin (On Schedule) */}
      <path 
        d="M780,180 C600,150 400,150 200,200" 
        stroke={activeRouteColor} 
        strokeWidth="2" 
        fill="none" 
        strokeDasharray="5,5"
      />
      
      {/* China to Guadalajara (Delayed) */}
      <path 
        d="M750,200 C600,250 400,250 180,250" 
        stroke={delayedRouteColor} 
        strokeWidth="2" 
        fill="none" 
        strokeDasharray="5,5"
      />
      
      {/* South Korea to Austin (In Production) */}
      <path 
        d="M800,170 C650,100 400,100 200,200" 
        stroke={routeColor} 
        strokeWidth="1" 
        fill="none" 
        strokeDasharray="2,2"
      />
      
      {/* Japan to San Jose (No Issues) */}
      <path 
        d="M820,150 C650,50 400,50 220,220" 
        stroke={routeColor} 
        strokeWidth="1" 
        fill="none" 
        strokeDasharray="2,2"
      />
      
      {/* Malaysia to Guadalajara (Quality Check) */}
      <path 
        d="M720,300 C600,350 400,350 180,250" 
        stroke={routeColor} 
        strokeWidth="1" 
        fill="none" 
        strokeDasharray="2,2"
      />
      
      {/* Supplier Locations */}
      {/* Taiwan */}
      <circle cx="780" cy="180" r="8" fill={activeRouteColor} />
      <text x="790" y="175" fontSize="12" fill={theme.palette.text.primary}>Taiwan</text>
      
      {/* China */}
      <circle cx="750" cy="200" r="8" fill={delayedRouteColor} />
      <text x="760" y="195" fontSize="12" fill={theme.palette.text.primary}>China</text>
      
      {/* South Korea */}
      <circle cx="800" cy="170" r="6" fill={routeColor} />
      <text x="810" y="165" fontSize="12" fill={theme.palette.text.primary}>Korea</text>
      
      {/* Japan */}
      <circle cx="820" cy="150" r="6" fill={routeColor} />
      <text x="830" y="145" fontSize="12" fill={theme.palette.text.primary}>Japan</text>
      
      {/* Malaysia */}
      <circle cx="720" cy="300" r="6" fill={routeColor} />
      <text x="730" y="295" fontSize="12" fill={theme.palette.text.primary}>Malaysia</text>
      
      {/* Warehouse Locations */}
      {/* Austin HQ */}
      <rect x="200" y="200" width="12" height="12" fill={theme.palette.primary.main} />
      <text x="215" y="210" fontSize="12" fill={theme.palette.text.primary}>Austin</text>
      
      {/* San Jose */}
      <rect x="180" y="180" width="12" height="12" fill={theme.palette.primary.main} />
      <text x="195" y="190" fontSize="12" fill={theme.palette.text.primary}>San Jose</text>
      
      {/* Guadalajara */}
      <rect x="180" y="250" width="12" height="12" fill={theme.palette.primary.main} />
      <text x="195" y="260" fontSize="12" fill={theme.palette.text.primary}>Guadalajara</text>
      
      {/* Customs Checkpoints */}
      <polygon 
        points="400,180 410,190 400,200 390,190" 
        fill={delayedRouteColor} 
        stroke={theme.palette.background.paper} 
        strokeWidth="1"
      />
      <text x="415" y="195" fontSize="10" fill={theme.palette.text.primary}>Customs</text>
      
      {/* Shipment Markers */}
      <circle cx="600" cy="150" r="5" fill={activeRouteColor} />
      <circle cx="400" cy="150" r="5" fill={activeRouteColor} />
      
      <circle cx="600" cy="250" r="5" fill={delayedRouteColor} />
      <circle cx="400" cy="250" r="5" fill={delayedRouteColor} />
      
      {/* Legend */}
      <rect x="50" y="400" width="200" height="80" fill={theme.palette.background.paper} fillOpacity="0.8" />
      
      <circle cx="70" cy="420" r="5" fill={activeRouteColor} />
      <text x="80" y="425" fontSize="10" fill={theme.palette.text.primary}>On Schedule</text>
      
      <circle cx="70" cy="440" r="5" fill={delayedRouteColor} />
      <text x="80" y="445" fontSize="10" fill={theme.palette.text.primary}>Minor Delay</text>
      
      <circle cx="70" cy="460" r="5" fill={criticalRouteColor} />
      <text x="80" y="465" fontSize="10" fill={theme.palette.text.primary}>Critical Delay</text>
      
      <rect x="150" cy="420" width="8" height="8" fill={theme.palette.primary.main} />
      <text x="165" y="425" fontSize="10" fill={theme.palette.text.primary}>Warehouse</text>
    </svg>
  );
};

const SupplyChainMap: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Supply Chain Status Map
      </Typography>
      
      <Box 
        sx={{ 
          height: 'calc(100% - 40px)', 
          position: 'relative',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <WorldMap />
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mt: 1
        }}
      >
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View Supply Chain Details →
        </Typography>
      </Box>
    </Box>
  );
};

export default SupplyChainMap; 