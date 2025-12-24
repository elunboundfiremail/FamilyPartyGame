import { useState } from 'react';
import { motion } from 'framer-motion';

function Home({ onCreateRoom, onJoinRoom }) {
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 max-w-md w-full text-white shadow-2xl"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🎉 Family Party 🎉
          </h1>
          <p className="text-center text-purple-200 mb-8">
            ¡El juego perfecto para la familia!
          </p>
        </motion.div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 
                     text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {!showJoin ? (
          <motion.div 
            className="space-y-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <button
              onClick={() => onCreateRoom(playerName)}
              disabled={!playerName.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎮 Crear Nueva Sala
            </button>
            
            <button
              onClick={() => setShowJoin(true)}
              disabled={!playerName.trim()}
              className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚪 Unirse a una Sala
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Código de sala"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 border border-white border-opacity-30 
                       text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              maxLength={6}
            />
            
            <button
              onClick={() => onJoinRoom(roomCode, playerName)}
              disabled={!roomCode.trim() || !playerName.trim()}
              className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ✅ Entrar
            </button>
            
            <button
              onClick={() => setShowJoin(false)}
              className="w-full py-3 px-6 rounded-xl text-purple-200 hover:text-white transition"
            >
              ← Volver
            </button>
          </motion.div>
        )}

        <div className="mt-8 pt-6 border-t border-white border-opacity-20">
          <h3 className="text-center text-purple-200 font-semibold mb-3">
            🎲 Características del Juego
          </h3>
          <ul className="space-y-2 text-sm text-purple-100">
            <li>✨ Tablero estilo Mario Party</li>
            <li>🎯 Trivias, acertijos y retos</li>
            <li>🏆 Sistema de puntos</li>
            <li>👨‍👩‍👧‍👦 Multijugador en tiempo real</li>
            <li>📱 Juega desde tu celular</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
