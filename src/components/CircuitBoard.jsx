import { motion } from 'framer-motion';

function CircuitBoard({ players, totalSpaces = 30 }) {
  const playerColors = [
    'bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-orange-500', 'bg-teal-500', 'bg-lime-500', 'bg-rose-500'
  ];
  
  // Crear el circuito en forma de serpiente
  const createSnakeLayout = () => {
    const layout = [];
    const columns = 5;
    const rows = Math.ceil(totalSpaces / columns);
    
    let spaceNumber = 0;
    
    for (let row = 0; row < rows; row++) {
      const rowSpaces = [];
      const isReversed = row % 2 !== 0; // Alterna dirección en cada fila
      
      for (let col = 0; col < columns; col++) {
        if (spaceNumber < totalSpaces) {
          const actualCol = isReversed ? columns - 1 - col : col;
          rowSpaces.push({
            number: spaceNumber,
            row: row,
            col: actualCol,
            position: spaceNumber
          });
          spaceNumber++;
        }
      }
      
      if (isReversed) {
        rowSpaces.reverse();
      }
      
      layout.push(rowSpaces);
    }
    
    return layout;
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass rounded-2xl p-6">
        <div className="space-y-2">
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 justify-center">
              {row.map((space) => {
                const spaceInfo = getSpaceType(space.position);
                const playersHere = getPlayersOnSpace(space.position);
                
                return (
                  <motion.div
                    key={space.position}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: space.position * 0.02 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br ${spaceInfo.color} 
                              shadow-lg flex flex-col items-center justify-center border-2 border-white border-opacity-40`}
                  >
                    {/* Número de casilla - MÁS VISIBLE */}
                    <div className="absolute top-0.5 left-0.5 bg-black bg-opacity-60 rounded-full w-6 h-6 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{space.position + 1}</span>
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
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        {playersHere.map((player, idx) => {
                          const playerIndex = players.indexOf(player);
                          return (
                            <motion.div
                              key={player.id}
                              initial={{ scale: 0, y: -10 }}
                              animate={{ scale: 1, y: 0 }}
                              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${playerColors[playerIndex % playerColors.length]} 
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
                      <div className="absolute -top-6 text-xs font-bold text-green-400">
                        INICIO
                      </div>
                    )}
                    {space.position === totalSpaces - 1 && (
                      <div className="absolute -top-6 text-xs font-bold text-yellow-400">
                        META
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
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
