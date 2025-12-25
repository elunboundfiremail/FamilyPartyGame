import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function VotingSystem({ players, currentPlayer, onVoteComplete, correctAnswer }) {
  const [votes, setVotes] = useState({});
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const otherPlayers = players.filter(p => p.id !== currentPlayer.id);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Verificar si todos votaron
    const totalVotes = Object.keys(votes).length;
    if (totalVotes === otherPlayers.length && totalVotes > 0) {
      setTimeout(() => {
        calculateResult();
      }, 1000);
    }
  }, [votes]);

  const handleVote = (playerId, approved) => {
    setVotes(prev => ({
      ...prev,
      [playerId]: approved
    }));
    setHasVoted(true);
  };

  const handleTimeOut = () => {
    // Si no todos votaron, contar los votos existentes
    if (Object.keys(votes).length > 0) {
      calculateResult();
    } else {
      // Si nadie votó, se asume que no completó
      onVoteComplete(false, 0);
    }
  };

  const calculateResult = () => {
    const approvals = Object.values(votes).filter(v => v === true).length;
    const rejections = Object.values(votes).filter(v => v === false).length;
    
    // Mayoría simple
    const approved = approvals > rejections;
    
    onVoteComplete(approved, approvals, rejections);
  };

  const myPlayerId = players.find(p => p.isMe)?.id;
  const canIVote = myPlayerId && myPlayerId !== currentPlayer.id;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="glass rounded-3xl p-8 max-w-2xl w-full text-white"
      >
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">👥</div>
          <h2 className="text-3xl font-bold mb-2">¡Votación!</h2>
          <p className="text-purple-200 text-lg">
            ¿{currentPlayer.name} {correctAnswer ? 'respondió correctamente' : 'completó el reto'}?
          </p>
          {correctAnswer && (
            <div className="mt-4 glass rounded-xl p-4">
              <p className="text-yellow-200 font-bold text-xl">
                ✅ Respuesta correcta: {correctAnswer}
              </p>
            </div>
          )}
        </div>

        <div className="glass rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-lg">
              ⏱️ Tiempo: <span className="font-bold text-yellow-400">{timeLeft}s</span>
            </div>
            <div className="text-lg">
              📊 Votos: <span className="font-bold">{Object.keys(votes).length}/{otherPlayers.length}</span>
            </div>
          </div>

          {/* Mostrar quién ha votado */}
          <div className="space-y-2">
            {otherPlayers.map(player => (
              <div key={player.id} className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{player.avatar}</span>
                  <span className="font-semibold">{player.name}</span>
                </div>
                <div>
                  {votes[player.id] !== undefined ? (
                    votes[player.id] ? (
                      <span className="text-green-400 text-2xl">✅</span>
                    ) : (
                      <span className="text-red-400 text-2xl">❌</span>
                    )
                  ) : (
                    <span className="text-gray-400 text-sm">⏳ Esperando...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {canIVote && !hasVoted ? (
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(myPlayerId, true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
                       text-white font-bold py-4 px-6 rounded-xl shadow-lg text-xl"
            >
              ✅ Sí, lo completó
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(myPlayerId, false)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                       text-white font-bold py-4 px-6 rounded-xl shadow-lg text-xl"
            >
              ❌ No lo completó
            </motion.button>
          </div>
        ) : canIVote && hasVoted ? (
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-lg text-purple-200">
              ✅ Ya votaste. Esperando a los demás jugadores...
            </p>
          </div>
        ) : (
          <div className="text-center p-4 glass rounded-xl">
            <p className="text-lg text-yellow-300">
              ⏳ Es tu turno, espera la votación de los demás...
            </p>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-purple-200">
          💡 Voten con honestidad para que el juego sea divertido para todos
        </div>
      </motion.div>
    </motion.div>
  );
}

export default VotingSystem;
