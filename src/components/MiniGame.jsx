import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { triviaQuestions, acertijos, retos, penitencias, preguntasConversacion, desafiosRapidos, adivinanzasRapidas } from '../data/questions';

function MiniGame({ type, player, onComplete }) {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // Seleccionar pregunta según el tipo
    let selectedQuestion;
    
    switch(type) {
      case 'trivia':
        const allTrivia = Object.values(triviaQuestions).flat();
        selectedQuestion = allTrivia[Math.floor(Math.random() * allTrivia.length)];
        break;
      case 'acertijo':
        selectedQuestion = acertijos[Math.floor(Math.random() * acertijos.length)];
        break;
      case 'reto':
        selectedQuestion = retos[Math.floor(Math.random() * retos.length)];
        break;
      case 'penitencia':
        selectedQuestion = penitencias[Math.floor(Math.random() * penitencias.length)];
        break;
      case 'conversacion':
        const pregunta = preguntasConversacion[Math.floor(Math.random() * preguntasConversacion.length)];
        selectedQuestion = { q: pregunta, points: 10 };
        break;
      case 'rapido':
        const rapido = desafiosRapidos[Math.floor(Math.random() * desafiosRapidos.length)];
        selectedQuestion = { 
          text: rapido.text, 
          points: rapido.points,
          time: rapido.time,
          instruction: `¡Tienes ${rapido.time} segundos!`
        };
        break;
    }
    
    setQuestion(selectedQuestion);
  }, [type]);

  useEffect(() => {
    if (type === 'trivia' || type === 'acertijo' || type === 'rapido') {
      const timeLimit = type === 'rapido' ? (question?.time || 30) : 30;
      setTimer(timeLimit);
      
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [type, question]);

  const handleTimeout = () => {
    setIsCorrect(false);
    setShowResult(true);
    setTimeout(() => onComplete(0), 2000);
  };

  const handleSubmit = () => {
    if (type === 'trivia') {
      const normalizedAnswer = userAnswer.toLowerCase().trim();
      const correct = question.a.some(ans => 
        normalizedAnswer === ans.toLowerCase() || 
        normalizedAnswer.includes(ans.toLowerCase())
      );
      
      // Para trivias, los demás votarán si respondió bien
      // Pasamos la respuesta del usuario y la correcta
      onComplete(
        correct ? question.points : 0,
        userAnswer,
        question.a[0] // Respuesta correcta
      );
    } else if (type === 'acertijo') {
      const normalizedAnswer = userAnswer.toLowerCase().trim();
      const correct = question.a.some(ans => 
        normalizedAnswer === ans.toLowerCase() || 
        normalizedAnswer.includes(ans.toLowerCase())
      );
      
      setIsCorrect(correct);
      setShowResult(true);
      
      setTimeout(() => {
        onComplete(correct ? question.points : 0);
      }, 2000);
    } else if (type === 'rapido') {
      // Para desafíos rápidos, los demás votarán
      onComplete(question.points);
    } else if (type === 'reto' || type === 'conversacion') {
      // Para retos y conversación, siempre dan puntos si se completan (luego votarán)
      onComplete(question.points);
    } else if (type === 'penitencia') {
      onComplete(0); // Las penitencias no dan puntos
    }
  };

  if (!question) return null;

  const getIcon = () => {
    switch(type) {
      case 'trivia': return '🧠';
      case 'acertijo': return '🤔';
      case 'reto': return '🎯';
      case 'penitencia': return '😱';
      case 'conversacion': return '💬';
      case 'rapido': return '⚡';
      default: return '❓';
    }
  };

  const getTitle = () => {
    switch(type) {
      case 'trivia': return 'Trivia';
      case 'acertijo': return 'Acertijo';
      case 'reto': return 'Reto';
      case 'penitencia': return 'Penitencia';
      case 'conversacion': return 'Pregunta de Conversación';
      case 'rapido': return 'Desafío Rápido';
      default: return 'Minijuego';
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
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">{getIcon()}</div>
          <h2 className="text-3xl font-bold mb-2">{getTitle()}</h2>
          <p className="text-purple-200">Jugador: {player.name}</p>
        </div>

        {!showResult ? (
          <>
            <div className="glass rounded-xl p-6 mb-6">
              <p className="text-xl mb-4">
                {type === 'reto' || type === 'penitencia' || type === 'rapido' ? question.text : question.q}
              </p>
              
              {(type === 'trivia' || type === 'acertijo' || type === 'rapido') && (
                <div className="flex items-center justify-between text-sm text-purple-200">
                  <span>⏱️ Tiempo: {timer}s</span>
                  <span>🏆 Puntos: {question.points}</span>
                </div>
              )}
              
              {(type === 'reto' || type === 'conversacion') && (
                <p className="text-center text-yellow-300 mt-4">
                  🏆 +{question.points} puntos
                </p>
              )}
            </div>

            {(type === 'trivia' || type === 'acertijo') ? (
              <>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Escribe tu respuesta..."
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-20 border border-white 
                           border-opacity-30 text-white placeholder-purple-200 focus:outline-none 
                           focus:ring-2 focus:ring-pink-400 mb-4"
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  ✅ Responder
                </button>
              </>
            ) : type === 'rapido' ? (
              <div className="space-y-3">
                {question.instruction && (
                  <div className="glass rounded-lg p-3 text-sm text-yellow-300 font-bold text-center">
                    ⚡ {question.instruction}
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="w-full btn-primary"
                >
                  ✅ ¡Listo, lo completé!
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {question.instruction && (
                  <div className="glass rounded-lg p-3 text-sm text-purple-200">
                    💡 <strong>Instrucción:</strong> {question.instruction}
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="w-full btn-primary"
                >
                  {type === 'penitencia' ? '😅 Aceptar Penitencia' : '✅ ¡Listo, completé el reto!'}
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className={`text-8xl mb-4 ${isCorrect ? 'animate-bounce' : ''}`}>
              {isCorrect ? '🎉' : '😔'}
            </div>
            <h3 className={`text-4xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
            </h3>
            {!isCorrect && (type === 'trivia' || type === 'acertijo') && (
              <p className="text-purple-200">
                Respuesta correcta: {question.a[0]}
              </p>
            )}
            <p className="text-2xl mt-4">
              {isCorrect ? `+${question.points} puntos` : '+0 puntos'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default MiniGame;
