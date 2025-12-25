import { motion } from 'framer-motion';

function CircuitBoard({ players, totalSpaces = 30 }) {
  const playerColors = [
    'bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-orange-500', 'bg-teal-500', 'bg-lime-500', 'bg-rose-500'
  ];
  
  // Crear un camino serpenteante tipo gusano (no cuadrado)
  const createSnakeLayout = () => {
    const positions = [];
    
    // Crear un camino serpenteante más orgánico
    // Patrón: va en zigzag con curvas suaves
    const pattern = [
      // Fila 1 (inicio) - de izquierda a derecha
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 },
      // Curva hacia abajo-derecha
      { x: 6, y: 1 },
      // Fila 2 - de derecha a izquierda
      { x: 6, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 2 },
      // Curva hacia abajo-izquierda
      { x: 0, y: 3 },
      // Fila 3 - de izquierda a derecha
      { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
      // Curva hacia abajo-derecha
      { x: 6, y: 5 },
      // Fila 4 - de derecha a izquierda
      { x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 }, { x: 2, y: 6 }, { x: 1, y: 6 },
      // Final
      { x: 0, y: 7 }, { x: 0, y: 8 }
    ];
    
    for (let i = 0; i < Math.min(totalSpaces, pattern.length); i++) {
      positions.push({
        position: i,
        x: pattern[i].x,
        y: pattern[i].y
      });
    }
    
    return positions;
  };

  const layout = createSnakeLayout();

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
      <div className="glass rounded-2xl p-6">
        {/* Tablero con posicionamiento absoluto tipo gusano */}
        <div className="relative" style={{ height: '600px' }}>
          {layout.map((space) => {
            const spaceInfo = getSpaceType(space.position);
            const playersHere = getPlayersOnSpace(space.position);
            
            // Calcular posición en la pantalla
            const left = space.x * 80 + 20;
            const top = space.y * 70 + 20;
            
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
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${spaceInfo.color} 
                          shadow-lg flex flex-col items-center justify-center border-2 border-white border-opacity-40`}
              >
                {/* Conector al siguiente (línea) */}
                {space.position < totalSpaces - 1 && (
                  <div
                    className="absolute bg-yellow-300 opacity-40"
                    style={{
                      width: space.position < totalSpaces - 1 && layout[space.position + 1] ? 
                        `${Math.sqrt(Math.pow((layout[space.position + 1].x - space.x) * 80, 2) + 
                                    Math.pow((layout[space.position + 1].y - space.y) * 70, 2))}px` : '0px',
                      height: '4px',
                      transformOrigin: 'left center',
                      transform: space.position < totalSpaces - 1 && layout[space.position + 1] ?
                        `rotate(${Math.atan2((layout[space.position + 1].y - space.y) * 70, 
                                            (layout[space.position + 1].x - space.x) * 80) * 180 / Math.PI}deg) translateX(40px)` : 'none',
                      zIndex: -1
                    }}
                  />
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
        
        {/* Leyenda */}
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
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
      </div>
    </div>
  );
}

export default CircuitBoard;
