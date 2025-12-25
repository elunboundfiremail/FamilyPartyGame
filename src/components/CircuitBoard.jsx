import { motion } from 'framer-motion';

function CircuitBoard({ players, totalSpaces = 30 }) {
  const playerColors = [
    'bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-orange-500', 'bg-teal-500', 'bg-lime-500', 'bg-rose-500'
  ];
  
  // Generar patrón aleatorio del tablero
  const createRandomLayout = () => {
    const patterns = ['snake', 'spiral', 'zigzag'];
    const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
    
    const positions = [];
    
    if (selectedPattern === 'snake') {
      // Patrón serpiente
      let x = 0, y = 0;
      const cols = 6;
      
      for (let i = 0; i < totalSpaces; i++) {
        positions.push({ position: i, x, y });
        
        const row = Math.floor(i / cols);
        const isReversed = row % 2 !== 0;
        
        if ((i + 1) % cols === 0 && i < totalSpaces - 1) {
          y += 2;
          if (isReversed) x = 0;
          else x = cols - 1;
        } else {
          x += isReversed ? -1 : 1;
        }
      }
    } else if (selectedPattern === 'spiral') {
      // Patrón caracol (de afuera hacia adentro)
      const grid = Array(8).fill().map(() => Array(8).fill(false));
      let x = 0, y = 0;
      let dx = 1, dy = 0;
      
      for (let i = 0; i < Math.min(totalSpaces, 30); i++) {
        positions.push({ position: i, x, y });
        grid[y][x] = true;
        
        const nextX = x + dx;
        const nextY = y + dy;
        
        if (nextX < 0 || nextX >= 8 || nextY < 0 || nextY >= 8 || grid[nextY]?.[nextX]) {
          [dx, dy] = [-dy, dx];
        }
        
        x += dx;
        y += dy;
      }
    } else {
      // Patrón zigzag
      for (let i = 0; i < totalSpaces; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const isEven = row % 2 === 0;
        
        positions.push({
          position: i,
          x: isEven ? col : 4 - col,
          y: row * 2
        });
      }
    }
    
    return positions;
  };

  const layout = createRandomLayout();

  const getSpaceType = (position) => {
    if (position === 0) return { emoji: '🏁', type: 'start', color: 'from-green-400 to-green-600' };
    if (position === totalSpaces - 1) return { emoji: '🏆', type: 'finish', color: 'from-yellow-300 via-yellow-400 to-amber-500' };
    
    const types = [
      { emoji: '🧠', type: 'trivia', color: 'from-blue-300 to-blue-400' },
      { emoji: '🤔', type: 'acertijo', color: 'from-purple-300 to-purple-400' },
      { emoji: '🎯', type: 'reto', color: 'from-red-300 to-red-400' },
      { emoji: '⚡', type: 'rapido', color: 'from-orange-300 via-orange-400 to-yellow-400' },
      { emoji: '💬', type: 'conversacion', color: 'from-pink-300 to-pink-400' },
      { emoji: '😱', type: 'penitencia', color: 'from-gray-400 to-gray-500' },
    ];
    
    return types[position % types.length];
  };

  const getPlayersOnSpace = (position) => {
    return players.filter(p => (p.position || 0) === position);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="glass rounded-2xl p-4 sm:p-6">
        {/* Tablero con scroll vertical TÁCTIL para móviles */}
        <div 
          className="relative overflow-y-auto overflow-x-hidden touch-pan-y" 
          style={{ 
            maxHeight: '65vh',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <div className="relative" style={{ minHeight: '750px', paddingBottom: '80px' }}>
            {layout.map((space) => {
              const spaceInfo = getSpaceType(space.position);
              const playersHere = getPlayersOnSpace(space.position);
              
              // Calcular posición RESPONSIVE
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
              const spacing = isMobile ? 60 : 90;
              const vSpacing = isMobile ? 65 : 75;
              const left = space.x * spacing + (isMobile ? 5 : 10);
              const top = space.y * vSpacing + (isMobile ? 5 : 10);
              
              return (
                <motion.div
                  key={space.position}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: space.position * 0.03 }}
                  whileHover={{ scale: 1.15, rotate: 5, zIndex: 50 }}
                  style={{
                    position: 'absolute',
                    left: `${left}px`,
                    top: `${top}px`
                  }}
                  className={`w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${spaceInfo.color} 
                            shadow-lg flex flex-col items-center justify-center border-2 sm:border-3 border-white border-opacity-50`}
                >
                  {/* Línea conectora al siguiente - MEJORADA */}
                  {space.position < totalSpaces - 1 && layout[space.position + 1] && (
                    <svg 
                      className="absolute pointer-events-none"
                      style={{
                        position: 'absolute',
                        left: '40px',
                        top: '40px',
                        width: `${Math.abs((layout[space.position + 1].x - space.x) * 90) + 100}px`,
                        height: `${Math.abs((layout[space.position + 1].y - space.y) * 75) + 100}px`,
                        zIndex: -1,
                        overflow: 'visible'
                      }}
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2={(layout[space.position + 1].x - space.x) * 90}
                        y2={(layout[space.position + 1].y - space.y) * 75}
                        stroke="#FCD34D"
                        strokeWidth="4"
                        strokeOpacity="0.5"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  )}
                
                {/* Número de casilla - MÁS VISIBLE */}
                <div className="absolute top-0.5 left-0.5 bg-black bg-opacity-70 rounded-full w-7 h-7 flex items-center justify-center border border-yellow-300">
                  <span className="text-sm font-bold text-white">{space.position + 1}</span>
                </div>
                
                {/* Emoji del tipo de casilla - ANIMADO */}
                <motion.div 
                  className="text-2xl sm:text-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: space.position * 0.1
                  }}
                >
                  {spaceInfo.emoji}
                </motion.div>
                
                {/* Jugadores en esta casilla */}
                {playersHere.length > 0 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-0.5 flex-wrap max-w-[80px] justify-center">
                    {playersHere.map((player) => {
                      const playerIndex = players.indexOf(player);
                      return (
                        <motion.div
                          key={player.id}
                          initial={{ scale: 0, y: -10 }}
                          animate={{ scale: 1, y: 0 }}
                          className={`w-6 h-6 rounded-full ${playerColors[playerIndex % playerColors.length]} 
                                   border-2 border-white shadow-lg flex items-center justify-center 
                                   text-xs font-bold text-white`}
                        >
                          {player.name[0].toUpperCase()}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
                
                {/* Etiqueta especial para inicio y meta */}
                {space.position === 0 && (
                  <div className="absolute -top-7 text-sm font-bold text-green-400 bg-black bg-opacity-60 px-2 py-1 rounded whitespace-nowrap">
                    🏁 INICIO
                  </div>
                )}
                {space.position === totalSpaces - 1 && (
                  <div className="absolute -top-7 text-sm font-bold text-yellow-400 bg-black bg-opacity-60 px-2 py-1 rounded whitespace-nowrap">
                    🏆 META
                  </div>
                )}
              </motion.div>
            );
          })}
          </div>
        </div>
        
        {/* Leyenda */}
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-lg">🧠</span>
            <span className="text-white">Trivia</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">🤔</span>
            <span className="text-white">Acertijo</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">🎯</span>
            <span className="text-white">Reto</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">⚡</span>
            <span className="text-white">Rápido</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">💬</span>
            <span className="text-white">Charla</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">😱</span>
            <span className="text-white">Penitencia</span>
          </div>
        </div>
        
        <div className="mt-3 text-center text-sm text-yellow-200">
          ⬇️ Desliza hacia abajo para ver más casillas
        </div>
      </div>
    </div>
  );
}

export default CircuitBoard;
