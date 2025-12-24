import { motion } from 'framer-motion';

function Lobby({ room, players, isHost, onStartGame, onLeaveRoom }) {
  const playerColors = ['bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 max-w-2xl w-full text-white shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sala de Espera</h1>
          <div className="inline-block glass px-6 py-3 rounded-xl">
            <p className="text-sm text-purple-200">Código de Sala</p>
            <p className="text-3xl font-bold tracking-widest">{room.code}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            👥 Jugadores ({players.length}/6)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${playerColors[index]} rounded-xl p-4 shadow-lg`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">
                    {['🧑', '👨', '👩', '🧔', '👴', '👵'][index]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{player.name}</p>
                    {player.isHost && (
                      <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded">
                        👑 Anfitrión
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {isHost ? (
            <>
              <button
                onClick={onStartGame}
                disabled={players.length < 2}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎮 Iniciar Juego
              </button>
              <p className="text-center text-sm text-purple-200">
                {players.length < 2 ? '⚠️ Mínimo 2 jugadores para empezar' : '✅ Listo para comenzar'}
              </p>
            </>
          ) : (
            <div className="text-center p-4 glass rounded-xl">
              <p className="text-purple-200">⏳ Esperando a que el anfitrión inicie el juego...</p>
            </div>
          )}
          
          <button
            onClick={onLeaveRoom}
            className="w-full py-3 px-6 rounded-xl text-purple-200 hover:text-white transition border border-purple-400 hover:border-purple-300"
          >
            🚪 Salir de la Sala
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-purple-200">
          <p>💡 Comparte el código con tu familia para que se unan</p>
        </div>
      </motion.div>
    </div>
  );
}

export default Lobby;
