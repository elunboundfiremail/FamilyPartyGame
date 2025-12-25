import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function SpokenAnswer({ question, players, currentPlayer, onComplete }) {
  const [answered, setAnswered] = useState(false);
  const [votes, setVotes] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);

  const myPlayerId = players.find(p => p.isMe)?.id;
  const amIAnswering = currentPlayer.id === myPlayerId;
  const otherPlayers = players.filter(p => p.id !== currentPlayer.id);

  useEffect(() => {
    if (answered) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            calculateResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [answered]);

  useEffect(() => {
    // Si todos votaron, calcular resultado
    if (answered && Object.keys(votes).length === otherPlayers.length && otherPlayers.length > 0) {
      setTimeout(() => {
        calculateResult();
      }, 500);
    }
  }, [votes, answered, otherPlayers.length]);

  const handleAnswered = () => {
    setAnswered(true);
  };

  const handleVote = (playerId, isCorrect) => {
    setVotes(prev => ({
      ...prev,
      [playerId]: isCorrect
    }));
  };

  const calculateResult = () => {
    const correctVotes = Object.values(votes).filter(v => v === true).length;
    const incorrectVotes = Object.values(votes).filter(v => v === false).length;
    
    // Mayoría simple
    const approved = correctVotes > incorrectVotes;
    
    onComplete(approved ? question.points : 0);
  };

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
        {/* Fase: Jugador responde hablando */}
        {!answered ? (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🎤</div>
              <h2 className="text-3xl font-bold mb-2">Responde en Voz Alta</h2>
              <p className="text-xl text-yellow-200">
                {currentPlayer.name}, responde la pregunta hablando
              </p>
            </div>

            <div className="glass rounded-xl p-6 mb-6">
              <p className="text-2xl font-bold mb-4 text-center">
                {question.q || question.text}
              </p>
            </div>

            {amIAnswering ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnswered}
                  className="w-full btn-primary text-2xl py-6"
                >
                  ✅ Ya respondí en voz alta
                </motion.button>

                <p className="text-center text-sm text-purple-200 mt-4">
                  Responde la pregunta hablando y presiona el botón
                </p>
              </>
            ) : (
              <div className="glass rounded-xl p-6 text-center">
                <p className="text-xl">
                  Espera a que {currentPlayer.name} responda...
                </p>
                <div className="mt-4 text-6xl animate-pulse">
                  🎤
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Fase: Los demás votan */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">👥</div>
              <h2 className="text-3xl font-bold mb-2">¿Respondió Correctamente?</h2>
              <p className="text-xl text-yellow-200">
                {currentPlayer.name} ya respondió
              </p>
            </div>

            <div className="glass rounded-xl p-6 mb-6">
              <p className="text-lg mb-3 text-purple-200">Pregunta:</p>
              <p className="text-xl font-bold mb-4">{question.q || question.text}</p>
              
              {question.a && (
                <div className="bg-green-500 bg-opacity-20 border-2 border-green-400 rounded-lg p-3">
                  <p className="text-green-300 text-sm">✅ Respuesta correcta:</p>
                  <p className="text-green-200 font-bold text-lg">{question.a[0]}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-purple-200 mb-3">
                <span>⏱️ Tiempo: {timeLeft}s</span>
                <span>📊 Votos: {Object.keys(votes).length}/{otherPlayers.length}</span>
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
                        <span className="text-gray-400 text-sm">⏳</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!amIAnswering && !votes[myPlayerId] ? (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVote(myPlayerId, true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                           text-white font-bold py-6 px-6 rounded-xl shadow-2xl text-xl"
                >
                  ✅ CORRECTA
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVote(myPlayerId, false)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                           text-white font-bold py-6 px-6 rounded-xl shadow-2xl text-xl"
                >
                  ❌ INCORRECTA
                </motion.button>
              </div>
            ) : amIAnswering ? (
              <div className="glass rounded-xl p-6 text-center">
                <p className="text-lg text-yellow-300">
                  ⏳ Esperando que los demás voten...
                </p>
              </div>
            ) : (
              <div className="text-center glass rounded-xl p-4">
                <p className="text-lg text-purple-200">
                  ✅ Ya votaste. Esperando a los demás...
                </p>
              </div>
            )}

            <div className="mt-4 text-center text-sm text-purple-200">
              💡 Voten con honestidad para que sea divertido
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default SpokenAnswer;
