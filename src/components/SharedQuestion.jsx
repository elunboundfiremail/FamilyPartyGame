import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SharedQuestion({ question, players, currentPlayer, onComplete }) {
  const [phase, setPhase] = useState('selecting'); // selecting, waiting, answering, validating, result
  const [selectedReader, setSelectedReader] = useState(null);
  const [respondents, setRespondents] = useState([]);
  const [currentRespondent, setCurrentRespondent] = useState(null);
  const [answer, setAnswer] = useState('');

  // Seleccionar lector automáticamente (alguien que NO esté en la misma casilla)
  useEffect(() => {
    if (phase === 'selecting') {
      // Jugadores que NO están en la misma posición que el jugador actual
      const availableReaders = players.filter(p => 
        p.position !== currentPlayer.position && p.id !== currentPlayer.id
      );

      if (availableReaders.length > 0) {
        const randomReader = availableReaders[Math.floor(Math.random() * availableReaders.length)];
        setSelectedReader(randomReader);
        setPhase('waiting');
      } else {
        // Si no hay nadie disponible, el mismo jugador se hace la pregunta
        setPhase('answering');
      }
    }
  }, [phase, players, currentPlayer]);

  const myPlayerId = players.find(p => p.isMe)?.id;
  const amIReader = selectedReader?.id === myPlayerId;
  const amIRespondent = currentPlayer.id === myPlayerId || (currentRespondent?.id === myPlayerId);

  const handleReadyToRespond = () => {
    if (!respondents.includes(myPlayerId)) {
      setRespondents([...respondents, myPlayerId]);
    }
  };

  useEffect(() => {
    // Cuando hay respondentes, el primero puede responder
    if (respondents.length > 0 && phase === 'waiting') {
      const firstRespondent = players.find(p => p.id === respondents[0]);
      setCurrentRespondent(firstRespondent);
      setPhase('answering');
    }
  }, [respondents, phase, players]);

  const handleSubmitAnswer = () => {
    setPhase('validating');
  };

  const handleValidation = (isCorrect) => {
    if (isCorrect) {
      // Respuesta correcta
      onComplete(question.points, currentRespondent.id);
    } else {
      // Respuesta incorrecta - dar oportunidad al siguiente
      const nextRespondents = respondents.slice(1);
      if (nextRespondents.length > 0) {
        const nextRespondent = players.find(p => p.id === nextRespondents[0]);
        setCurrentRespondent(nextRespondent);
        setRespondents(nextRespondents);
        setAnswer('');
        setPhase('answering');
      } else {
        // Nadie más puede responder
        onComplete(0, null);
      }
    }
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
        {/* FASE: Esperando que el lector lea la pregunta */}
        {phase === 'waiting' && (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">📖</div>
              <h2 className="text-3xl font-bold mb-2">Pregunta Compartida</h2>
              <p className="text-xl text-yellow-200">
                {selectedReader?.name} leerá la pregunta
              </p>
            </div>

            {amIReader ? (
              <>
                <div className="glass rounded-xl p-6 mb-6">
                  <p className="text-2xl font-bold mb-4">Lee esta pregunta en voz alta:</p>
                  <p className="text-xl text-yellow-300">{question.q || question.text}</p>
                  <p className="text-sm text-green-300 mt-4">
                    ✅ Respuesta correcta: {question.a ? question.a[0] : 'Validar manualmente'}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-purple-200 mb-4">
                    Espera a que los demás presionen "¡Yo respondo!"
                  </p>
                  {respondents.length > 0 && (
                    <p className="text-green-400 font-bold">
                      {respondents.length} jugador(es) listo(s) para responder
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="glass rounded-xl p-6 mb-6 text-center">
                  <p className="text-xl">
                    {selectedReader?.name} está leyendo la pregunta...
                  </p>
                </div>

                {!respondents.includes(myPlayerId) ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReadyToRespond}
                    className="w-full btn-primary text-2xl py-6"
                  >
                    ⚡ ¡YO RESPONDO!
                  </motion.button>
                ) : (
                  <div className="text-center glass rounded-xl p-6">
                    <p className="text-green-400 text-xl font-bold">
                      ✅ Estás en la lista para responder
                    </p>
                    <p className="text-sm text-purple-200 mt-2">
                      Posición: {respondents.indexOf(myPlayerId) + 1}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* FASE: Alguien está respondiendo */}
        {phase === 'answering' && currentRespondent && (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">💭</div>
              <h2 className="text-3xl font-bold mb-2">
                {currentRespondent.name} está respondiendo
              </h2>
            </div>

            {amIRespondent ? (
              <>
                <div className="glass rounded-xl p-6 mb-6">
                  <p className="text-xl mb-4">{question.q || question.text}</p>
                </div>

                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                  placeholder="Tu respuesta en voz alta..."
                  className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-25 border-2 border-yellow-300 
                           text-white text-xl placeholder-yellow-100 focus:outline-none 
                           focus:ring-2 focus:ring-yellow-400 font-semibold mb-4"
                  autoFocus
                />

                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim()}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  ✅ Enviar Respuesta
                </button>
              </>
            ) : (
              <div className="glass rounded-xl p-6 text-center">
                <p className="text-xl">
                  Espera a que {currentRespondent.name} responda...
                </p>
              </div>
            )}
          </>
        )}

        {/* FASE: El lector valida la respuesta */}
        {phase === 'validating' && (
          <>
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">✅❌</div>
              <h2 className="text-3xl font-bold mb-2">Validar Respuesta</h2>
              <p className="text-xl text-yellow-200">
                {selectedReader?.name}, ¿la respuesta es correcta?
              </p>
            </div>

            <div className="glass rounded-xl p-6 mb-6">
              <p className="text-sm text-purple-200 mb-2">Respuesta de {currentRespondent?.name}:</p>
              <p className="text-2xl font-bold text-yellow-300 mb-4">{answer}</p>
              {question.a && (
                <p className="text-sm text-green-300">
                  ✅ Correcta: {question.a[0]}
                </p>
              )}
            </div>

            {amIReader ? (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleValidation(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                           text-white font-bold py-6 px-6 rounded-xl shadow-2xl text-xl"
                >
                  ✅ CORRECTA
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleValidation(false)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                           text-white font-bold py-6 px-6 rounded-xl shadow-2xl text-xl"
                >
                  ❌ INCORRECTA
                </motion.button>
              </div>
            ) : (
              <div className="glass rounded-xl p-6 text-center">
                <p className="text-xl">
                  Esperando validación de {selectedReader?.name}...
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default SharedQuestion;
