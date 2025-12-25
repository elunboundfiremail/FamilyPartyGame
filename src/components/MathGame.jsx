import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function MathGame({ player, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !finished) {
      handleFinish();
    }
  }, [timeLeft, finished]);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < 5; i++) {
      const operations = ['+', '-', 'x'];
      const op = operations[Math.floor(Math.random() * operations.length)];
      let a, b, result;
      
      if (op === '+') {
        a = Math.floor(Math.random() * 20) + 1;
        b = Math.floor(Math.random() * 20) + 1;
        result = a + b;
      } else if (op === '-') {
        a = Math.floor(Math.random() * 20) + 10;
        b = Math.floor(Math.random() * 10) + 1;
        result = a - b;
      } else {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        result = a * b;
      }
      
      newQuestions.push({ a, b, op, result });
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    if (answer.trim() === '') return;
    
    const userAnswer = parseInt(answer);
    if (userAnswer === questions[currentQuestion].result) {
      setCorrect(correct + 1);
    }
    
    setAnswer('');
    
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setFinished(true);
    
    // Calcular puntos
    let points = 0;
    if (correct >= 5) points = 25;
    else if (correct >= 4) points = 20;
    else if (correct >= 3) points = 15;
    else if (correct >= 2) points = 10;
    else points = 5;

    setTimeout(() => {
      onComplete(points);
    }, 2000);
  };

  const currentQ = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="glass rounded-3xl p-8 max-w-2xl w-full text-white"
      >
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🔢</div>
          <h2 className="text-4xl font-bold mb-2">¡Matemáticas Navideñas!</h2>
          <p className="text-xl text-yellow-200">
            ¿Cuántos regalos hay en total?
          </p>
        </div>

        {!finished && currentQ ? (
          <>
            <div className="mb-6 flex justify-between text-2xl">
              <div>⏱️ {timeLeft}s</div>
              <div>Pregunta {currentQuestion + 1}/5</div>
              <div className="text-green-400">✅ {correct}</div>
            </div>

            <div className="glass rounded-2xl p-8 mb-6 text-center">
              <p className="text-6xl font-bold mb-4">
                {currentQ.a} {currentQ.op} {currentQ.b} = ?
              </p>
            </div>

            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Tu respuesta"
              className="w-full px-6 py-4 rounded-xl bg-white bg-opacity-25 border-2 border-yellow-300 
                       text-white text-2xl text-center placeholder-yellow-100 focus:outline-none 
                       focus:ring-2 focus:ring-yellow-400 font-bold mb-4"
              autoFocus
            />

            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className="w-full btn-primary text-2xl disabled:opacity-50"
            >
              ✅ Responder
            </button>
          </>
        ) : finished ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-4">
              {correct >= 4 ? '🎉' : correct >= 3 ? '😊' : '😅'}
            </div>
            <h3 className="text-4xl font-bold mb-2">¡Terminado!</h3>
            <p className="text-3xl text-yellow-400 font-bold">
              {correct}/5 correctas
            </p>
            <p className="text-2xl mt-4">
              {correct >= 5 ? '+25 puntos ¡Perfecto!' :
               correct >= 4 ? '+20 puntos ¡Muy bien!' :
               correct >= 3 ? '+15 puntos ¡Bien!' :
               correct >= 2 ? '+10 puntos' :
               '+5 puntos'}
            </p>
          </motion.div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default MathGame;
