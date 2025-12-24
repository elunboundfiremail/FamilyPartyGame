import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiceRoll from './DiceRoll';
import MiniGame from './MiniGame';
import PlayerCard from './PlayerCard';

function GameBoard({ room, players, currentPlayer, onRollDice, onMiniGameComplete, onEndTurn }) {
  const [showDice, setShowDice] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [miniGameData, setMiniGameData] = useState(null);
  
  const boardSpaces = 20; // Número de casillas en el tablero
  const playerColors = ['bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500'];

  const handleRollDice = () => {
    setShowDice(true);
  };

  const handleDiceComplete = (result) => {
    setDiceResult(result);
    setShowDice(false);
    
    // Simular movimiento del jugador
    setTimeout(() => {
      // Determinar tipo de casilla
      const spaceTypes = ['trivia', 'acertijo', 'reto', 'penitencia', 'conversacion'];
      const randomType = spaceTypes[Math.floor(Math.random() * spaceTypes.length)];
      
      setMiniGameData({
        type: randomType,
        player: currentPlayer
      });
      setShowMiniGame(true);
    }, 1000);
  };

  const handleMiniGameComplete = (points) => {
    setShowMiniGame(false);
    onMiniGameComplete(points);
    
    setTimeout(() => {
      onEndTurn();
    }, 1000);
  };

  const isMyTurn = currentPlayer?.id === players.find(p => p.isMe)?.id;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con información de la sala */}
        <div className="glass rounded-xl p-4 mb-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🎮 Family Party</h2>
              <p className="text-sm text-purple-200">Sala: {room.code}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-200">Turno actual:</p>
              <p className="text-xl font-bold">{currentPlayer?.name}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Panel lateral de jugadores */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-white font-bold text-xl mb-3">👥 Jugadores</h3>
            {players.map((player, index) => (
              <PlayerCard 
                key={player.id}
                player={player}
                color={playerColors[index]}
                isCurrentTurn={player.id === currentPlayer?.id}
              />
            ))}
          </div>

          {/* Tablero de juego */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6 text-white min-h-[500px]">
              <h3 className="text-2xl font-bold mb-4 text-center">🎲 Tablero de Juego</h3>
              
              {/* Representación visual del tablero */}
              <div className="relative">
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {[...Array(boardSpaces)].map((_, index) => {
                    const playersOnSpace = players.filter(p => p.position === index);
                    
                    return (
                      <motion.div
                        key={index}
                        className="aspect-square glass rounded-lg flex flex-col items-center justify-center p-2 relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-xs text-purple-200">{index + 1}</span>
                        
                        {/* Mostrar jugadores en esta casilla */}
                        <div className="absolute -top-2 -right-2 flex flex-wrap gap-1">
                          {playersOnSpace.map((player, pIndex) => (
                            <motion.div
                              key={player.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`w-6 h-6 rounded-full ${playerColors[players.indexOf(player)]} 
                                       border-2 border-white shadow-lg flex items-center justify-center text-xs`}
                            >
                              {player.name[0]}
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Icono de tipo de casilla */}
                        <div className="text-2xl mt-1">
                          {index % 5 === 0 ? '⭐' : 
                           index % 3 === 0 ? '🎯' : 
                           index % 2 === 0 ? '🎲' : '❓'}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Controles del turno */}
              <div className="text-center">
                {isMyTurn ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRollDice}
                    disabled={showDice || showMiniGame}
                    className="btn-primary text-2xl disabled:opacity-50"
                  >
                    🎲 Lanzar Dado
                  </motion.button>
                ) : (
                  <div className="glass rounded-xl p-4">
                    <p className="text-purple-200">
                      ⏳ Esperando el turno de {currentPlayer?.name}...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <AnimatePresence>
        {showDice && (
          <DiceRoll onComplete={handleDiceComplete} />
        )}
        
        {showMiniGame && miniGameData && (
          <MiniGame 
            type={miniGameData.type}
            player={miniGameData.player}
            onComplete={handleMiniGameComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameBoard;
