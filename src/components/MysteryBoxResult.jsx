import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function MysteryBoxResult({ reward, onComplete }) {
  const [opening, setOpening] = useState(true);

  useEffect(() => {
    // Animación de apertura de caja
    const timer = setTimeout(() => {
      setOpening(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!opening) {
      // Esperar 3 segundos después de mostrar el resultado
      const timer = setTimeout(() => {
        onComplete(reward);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [opening, reward, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      {opening ? (
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1, 1.2, 1],
            rotate: [0, -10, 10, -10, 0]
          }}
          transition={{ duration: 2 }}
          className="text-9xl"
        >
          🎁
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="glass rounded-3xl p-8 max-w-2xl w-full text-white text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.5, repeat: 2 }}
            className="text-9xl mb-6"
          >
            {reward.emoji}
          </motion.div>

          <h2 className="text-4xl font-bold mb-4">{reward.title}</h2>
          <p className="text-2xl mb-6">{reward.message}</p>

          {reward.type === 'points' && (
            <div className={`text-5xl font-bold ${reward.value > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {reward.value > 0 ? '+' : ''}{reward.value} puntos
            </div>
          )}

          {reward.type === 'advance' && (
            <div className="text-5xl font-bold text-blue-400">
              +{reward.value} casillas
            </div>
          )}

          {reward.type === 'retreat' && (
            <div className="text-5xl font-bold text-orange-400">
              {reward.value} casillas
            </div>
          )}

          <div className="mt-6 text-purple-200">
            ⏳ Continuando en 3 segundos...
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default MysteryBoxResult;
