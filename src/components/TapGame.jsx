import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TapGame({ player, onComplete }) {
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [finished, setFinished] = useState(false);

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

  const handleTap = () => {
    if (!finished) {
      setTaps(taps + 1);
    }
  };

  const handleFinish = () => {
    setFinished(true);
    
    // Calcular puntos según taps
    let points = 0;
    if (taps >= 30) points = 25;
    else if (taps >= 20) points = 20;
    else if (taps >= 15) points = 15;
    else if (taps >= 10) points = 10;
    else points = 5;

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
          <div className="text-6xl mb-3">⚡</div>
          <h2 className="text-4xl font-bold mb-2">¡Tap Frenético!</h2>
          <p className="text-xl text-yellow-200">
            Presiona el botón lo más rápido posible
          </p>
        </div>

        {!finished ? (
          <>
            <div className="mb-6 flex justify-between text-2xl">
              <div>⏱️ {timeLeft}s</div>
              <div className="text-yellow-400 font-bold">🎯 {taps} taps</div>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleTap}
              className="w-full h-64 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 
                       rounded-2xl text-white text-6xl font-bold shadow-2xl
                       border-4 border-yellow-300 active:shadow-inner"
            >
              ¡TAP!
            </motion.button>

            <div className="mt-6 text-center text-sm text-gray-300">
              💡 Objetivo: 15+ taps = 15 pts | 20+ = 20 pts | 30+ = 25 pts
            </div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <div className="text-8xl mb-4">
              {taps >= 20 ? '🎉' : taps >= 10 ? '😊' : '😅'}
            </div>
            <h3 className="text-4xl font-bold mb-2">¡Terminado!</h3>
            <p className="text-3xl text-yellow-400 font-bold">
              {taps} taps
            </p>
            <p className="text-2xl mt-4">
              {taps >= 30 ? '+25 puntos ¡Increíble!' :
               taps >= 20 ? '+20 puntos ¡Muy bien!' :
               taps >= 15 ? '+15 puntos ¡Bien!' :
               taps >= 10 ? '+10 puntos ¡Aceptable!' :
               '+5 puntos'}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default TapGame;
