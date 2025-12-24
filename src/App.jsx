import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import Lobby from './components/Lobby';
import GameBoard from './components/GameBoard';
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
    leaveRoom
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
            <div className="glass rounded-3xl p-8 max-w-2xl w-full text-white text-center">
              <div className="text-8xl mb-6">🏆</div>
              <h1 className="text-5xl font-bold mb-4">¡Juego Terminado!</h1>
              <div className="glass rounded-xl p-6 mb-6">
                <h2 className="text-3xl font-bold mb-4">🥇 Ganador</h2>
                <p className="text-4xl font-bold text-yellow-400">
                  {players.find(p => p.id === room.winner)?.name}
                </p>
                <p className="text-2xl mt-2">
                  {players.find(p => p.id === room.winner)?.points} puntos
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">📊 Clasificación Final</h3>
                <div className="space-y-2">
                  {players
                    .sort((a, b) => b.points - a.points)
                    .map((player, index) => (
                      <div key={player.id} className="glass rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                          </span>
                          <span className="text-xl">{player.avatar}</span>
                          <span className="font-bold">{player.name}</span>
                        </div>
                        <span className="text-xl font-bold">{player.points} pts</span>
                      </div>
                    ))}
                </div>
              </div>

              <button
                onClick={leaveRoom}
                className="btn-primary w-full"
              >
                🏠 Volver al Inicio
              </button>
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
