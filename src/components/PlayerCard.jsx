import { motion } from 'framer-motion';

function PlayerCard({ player, color, isCurrentTurn }) {
  return (
    <motion.div
      animate={isCurrentTurn ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 0.5, repeat: isCurrentTurn ? Infinity : 0 }}
      className={`${color} rounded-xl p-4 shadow-lg ${isCurrentTurn ? 'ring-4 ring-yellow-400' : ''}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">
            {player.avatar || '👤'}
          </div>
          <div>
            <p className="font-bold text-white">{player.name}</p>
            <p className="text-sm text-white text-opacity-80">
              Posición: {player.position || 0}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{player.points || 0}</p>
          <p className="text-xs text-white text-opacity-80">puntos</p>
        </div>
      </div>
      
      {isCurrentTurn && (
        <div className="mt-2 text-center">
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            🎯 SU TURNO
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default PlayerCard;
