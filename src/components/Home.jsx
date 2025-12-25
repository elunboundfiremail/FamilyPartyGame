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
          <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-red-200 via-green-300 to-red-300 bg-clip-text text-transparent drop-shadow-lg">
            🎄 Family Party Navidad 🎅
          </h1>
          <p className="text-center text-red-100 mb-2 font-semibold text-lg">
            ¡El juego perfecto para la familia!
          </p>
          <p className="text-center text-yellow-200 mb-8 text-sm">
            ❄️ Edición Especial Navideña ⛄
          </p>
        </motion.div>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Tu nombre"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-25 border-2 border-yellow-300 border-opacity-50 
                     text-white placeholder-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-semibold"
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
              type="number"
              placeholder="Código de sala (4 dígitos)"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-25 border-2 border-yellow-300 border-opacity-50 
                       text-white text-2xl text-center placeholder-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold"
              maxLength={4}
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
