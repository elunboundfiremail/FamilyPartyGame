import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import Lobby from './components/Lobby';
import GameBoard from './components/GameBoard';
import ChristmasDecorations from './components/ChristmasDecorations';
import { useGameRoom } from './hooks/useGameRoom';
import './App.css';

function App() {
  const {
    room,
    players,
    gameState,
    currentPlayer,
    myPlayerId,
    isHost,
    createRoom,
    joinRoom,
    startGame,
    updatePlayerPosition,
    nextTurn,
    leaveRoom,
    setVotingState,
    markAsAnswered,
    submitVote,
    clearVotingState
  } = useGameRoom();

  const [error, setError] = useState('');

  const handleCreateRoom = async (playerName) => {
    try {
      setError('');
      await createRoom(playerName);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleJoinRoom = async (roomCode, playerName) => {
    try {
      setError('');
      await joinRoom(roomCode, playerName);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMiniGameComplete = async (points) => {
    if (currentPlayer && myPlayerId === currentPlayer.id) {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      const newPosition = Math.min((currentPlayer.position || 0) + diceRoll, 20);
      await updatePlayerPosition(currentPlayer.id, newPosition, points);
    }
  };

  const handleEndTurn = async () => {
    await nextTurn();
  };

  // Añadir players con info de si es el jugador actual
  const playersWithMe = players.map(p => ({
    ...p,
    isMe: p.id === myPlayerId
  }));

  return (
    <div className="App min-h-screen">
      <ChristmasDecorations />
      <AnimatePresence mode="wait">
        {!room && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Home 
              onCreateRoom={handleCreateRoom}
              onJoinRoom={handleJoinRoom}
            />
          </motion.div>
        )}

        {room && gameState === 'lobby' && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Lobby
              room={room}
              players={playersWithMe}
              isHost={isHost}
              onStartGame={startGame}
              onLeaveRoom={leaveRoom}
            />
          </motion.div>
        )}

        {room && gameState === 'playing' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameBoard
              room={room}
              players={playersWithMe}
              currentPlayer={currentPlayer}
              onRollDice={() => {}}
              onMiniGameComplete={handleMiniGameComplete}
              onEndTurn={handleEndTurn}
              onSetVotingState={setVotingState}
              onMarkAsAnswered={markAsAnswered}
              onSubmitVote={submitVote}
              onClearVotingState={clearVotingState}
            />
          </motion.div>
        )}

        {room && gameState === 'finished' && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <div className="glass rounded-3xl p-8 max-w-4xl w-full text-white">
              <div className="text-center mb-8">
                <div className="text-8xl mb-3">🎊</div>
                <h1 className="text-5xl font-bold mb-2">¡Juego Terminado!</h1>
                <p className="text-purple-200 text-lg">Ceremonia de Premiación</p>
              </div>

              {/* Premios Especiales */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {/* Ganador por Meta */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-xl p-6 text-center border-2 border-yellow-400"
                >
                  <div className="text-6xl mb-3">🏁</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Primero en la Meta</h3>
                  <p className="text-2xl font-bold">
                    {players.find(p => p.id === room.winner)?.name || players.sort((a, b) => b.position - a.position)[0]?.name}
                  </p>
                  <p className="text-sm text-purple-200 mt-1">
                    Casilla {players.find(p => p.id === room.winner)?.position || players.sort((a, b) => b.position - a.position)[0]?.position}
                  </p>
                </motion.div>

                {/* Mejor Puntaje */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-xl p-6 text-center border-2 border-purple-400"
                >
                  <div className="text-6xl mb-3">⭐</div>
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Mejor Puntaje</h3>
                  <p className="text-2xl font-bold">
                    {players.sort((a, b) => b.points - a.points)[0]?.name}
                  </p>
                  <p className="text-sm text-purple-200 mt-1">
                    {players.sort((a, b) => b.points - a.points)[0]?.points} puntos
                  </p>
                </motion.div>

                {/* Mejor Desempeño (puntos por turno) */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="glass rounded-xl p-6 text-center border-2 border-cyan-400"
                >
                  <div className="text-6xl mb-3">🌟</div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">Mejor Desempeño</h3>
                  <p className="text-2xl font-bold">
                    {players.sort((a, b) => {
                      const avgA = (a.points || 0) / Math.max((a.position || 0), 1);
                      const avgB = (b.points || 0) / Math.max((b.position || 0), 1);
                      return avgB - avgA;
                    })[0]?.name}
                  </p>
                  <p className="text-sm text-purple-200 mt-1">
                    Promedio: {((players.sort((a, b) => {
                      const avgA = (a.points || 0) / Math.max((a.position || 0), 1);
                      const avgB = (b.points || 0) / Math.max((b.position || 0), 1);
                      return avgB - avgA;
                    })[0]?.points || 0) / Math.max((players.sort((a, b) => {
                      const avgA = (a.points || 0) / Math.max((a.position || 0), 1);
                      const avgB = (b.points || 0) / Math.max((b.position || 0), 1);
                      return avgB - avgA;
                    })[0]?.position || 0), 1)).toFixed(1)} pts/casilla
                  </p>
                </motion.div>
              </div>
              
              {/* Clasificación Final */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-center">📊 Clasificación Final</h3>
                <div className="space-y-3">
                  {players
                    .sort((a, b) => {
                      // Ordenar por: 1. Posición, 2. Puntos
                      if (b.position !== a.position) return b.position - a.position;
                      return b.points - a.points;
                    })
                    .map((player, index) => (
                      <motion.div
                        key={player.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="glass rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold w-8">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                            </span>
                            <span className="text-3xl">{player.avatar}</span>
                            <div>
                              <p className="font-bold text-lg">{player.name}</p>
                              <p className="text-sm text-purple-200">
                                Casilla {player.position || 0} • {player.points || 0} puntos
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex gap-2">
                              {room.winner === player.id && (
                                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                                  🏁 META
                                </span>
                              )}
                              {players.sort((a, b) => b.points - a.points)[0]?.id === player.id && (
                                <span className="bg-purple-400 text-purple-900 px-2 py-1 rounded text-xs font-bold">
                                  ⭐ PUNTOS
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Estadísticas del Juego */}
              <div className="glass rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-center">📈 Estadísticas del Juego</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-yellow-400">
                      {Math.max(...players.map(p => p.points || 0))}
                    </p>
                    <p className="text-xs text-purple-200">Puntos Máximos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-cyan-400">
                      {Math.max(...players.map(p => p.position || 0))}
                    </p>
                    <p className="text-xs text-purple-200">Casilla Máxima</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-pink-400">
                      {(players.reduce((sum, p) => sum + (p.points || 0), 0) / players.length).toFixed(0)}
                    </p>
                    <p className="text-xs text-purple-200">Promedio Puntos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-400">
                      {players.length}
                    </p>
                    <p className="text-xs text-purple-200">Jugadores</p>
                  </div>
                </div>
              </div>

              <button
                onClick={leaveRoom}
                className="btn-primary w-full text-xl"
              >
                🏠 Volver al Inicio
              </button>

              <p className="text-center mt-4 text-purple-200 text-sm">
                ¡Gracias por jugar! 🎉 Esperamos que se hayan divertido
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast de errores */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-xl shadow-lg z-50"
          >
            <p className="font-bold">❌ Error</p>
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              className="absolute top-2 right-2 text-white hover:text-red-200"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
