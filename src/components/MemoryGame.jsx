import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function MemoryGame({ player, onComplete }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showing, setShowing] = useState(true);
  const [currentShow, setCurrentShow] = useState(-1);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const emojis = ['🦌', '⛄', '🎅', '🎄'];

  useEffect(() => {
    startLevel();
  }, []);

  const startLevel = () => {
    const newSequence = [];
    for (let i = 0; i < level + 2; i++) {
      newSequence.push(Math.floor(Math.random() * 4));
    }
    setSequence(newSequence);
    setUserSequence([]);
    setShowing(true);
    showSequence(newSequence);
  };

  const showSequence = (seq) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < seq.length) {
        setCurrentShow(seq[index]);
        setTimeout(() => setCurrentShow(-1), 400);
        index++;
      } else {
        clearInterval(interval);
        setShowing(false);
      }
    }, 800);
  };

  const handleClick = (index) => {
    if (showing || gameOver) return;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    // Verificar si es correcto
    if (sequence[newUserSequence.length - 1] !== index) {
      // Error
      setGameOver(true);
      calculatePoints(level - 1);
    } else if (newUserSequence.length === sequence.length) {
      // Completó el nivel
      if (level >= 5) {
        setGameOver(true);
        calculatePoints(level);
      } else {
        setTimeout(() => {
          setLevel(level + 1);
          startLevel();
        }, 1000);
      }
    }
  };

  const calculatePoints = (levelsCompleted) => {
    const points = levelsCompleted * 5 + 5;
    setTimeout(() => {
      onComplete(points);
    }, 2000);
  };

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
          <div className="text-6xl mb-3">🧠</div>
          <h2 className="text-4xl font-bold mb-2">Memoria de Renos</h2>
          <p className="text-xl text-yellow-200">
            {showing ? '¡Memoriza la secuencia!' : '¡Repite la secuencia!'}
          </p>
        </div>

        {!gameOver ? (
          <>
            <div className="mb-6 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                Nivel {level} | {sequence.length} secuencias
              </div>
              {!showing && (
                <div className="text-sm text-gray-300 mt-2">
                  Progreso: {userSequence.length}/{sequence.length}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: currentShow === index ? 1.1 : 1,
                    opacity: currentShow === index ? 1 : (showing ? 0.5 : 1)
                  }}
                  onClick={() => handleClick(index)}
                  disabled={showing}
                  className={`h-32 text-6xl rounded-2xl shadow-lg border-4 
                           ${currentShow === index ? 'bg-yellow-400 border-yellow-300' : 'bg-white bg-opacity-20 border-gray-400'}
                           ${showing ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-300">
              💡 Completa 5 niveles para máximos puntos
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-4">
              {level >= 5 ? '🎉' : level >= 3 ? '😊' : '😅'}
            </div>
            <h3 className="text-4xl font-bold mb-2">
              {level >= 5 ? '¡Perfecto!' : '¡Buen intento!'}
            </h3>
            <p className="text-2xl text-yellow-400 font-bold">
              Llegaste al nivel {level}
            </p>
            <p className="text-xl mt-4">
              +{(level - 1) * 5 + 5} puntos
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default MemoryGame;
