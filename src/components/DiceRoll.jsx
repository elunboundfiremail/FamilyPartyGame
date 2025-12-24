import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function DiceRoll({ onComplete }) {
  const [rolling, setRolling] = useState(true);
  const [result, setResult] = useState(1);

  useEffect(() => {
    let interval;
    let timeout;

    if (rolling) {
      // Animación de dados girando
      interval = setInterval(() => {
        setResult(Math.floor(Math.random() * 6) + 1);
      }, 100);

      // Detener después de 2 segundos
      timeout = setTimeout(() => {
        clearInterval(interval);
        const finalResult = Math.floor(Math.random() * 6) + 1;
        setResult(finalResult);
        setRolling(false);
        
        setTimeout(() => {
          onComplete(finalResult);
        }, 1000);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [rolling, onComplete]);

  const diceIcons = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        animate={rolling ? { rotate: 360 } : { rotate: 0 }}
        transition={rolling ? { duration: 0.5, repeat: Infinity, ease: "linear" } : {}}
        className="glass rounded-3xl p-12 text-white"
      >
        <motion.div
          animate={rolling ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-9xl text-center"
        >
          {diceIcons[result - 1]}
        </motion.div>
        <p className="text-center text-2xl font-bold mt-4">
          {rolling ? '🎲 Lanzando...' : `¡Sacaste ${result}!`}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default DiceRoll;
