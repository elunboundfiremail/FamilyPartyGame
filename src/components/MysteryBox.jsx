import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MysteryBox({ onChoice, currentPosition, diceResult }) {
  const [showChoice, setShowChoice] = useState(true);

  const handleNormalChoice = () => {
    setShowChoice(false);
    setTimeout(() => onChoice('normal'), 500);
  };

  const handleMysteryChoice = () => {
    setShowChoice(false);
    setTimeout(() => onChoice('mystery'), 500);
  };

  // Calcular nueva posición
  const newPosition = Math.min((currentPosition || 0) + diceResult, 30);

  // Determinar tipo de casilla de forma aleatoria pero con más peso a conversación
  const getCasillaInfo = () => {
    const random = Math.random();
    if (random < 0.40) { // 40% Conversación (antes 16.6%)
      return { tipo: 'Pregunta Familiar', emoji: '💬', color: 'from-pink-500 to-rose-600' };
    } else if (random < 0.60) { // 20% Trivia
      return { tipo: 'Trivia', emoji: '🎯', color: 'from-blue-500 to-cyan-600' };
    } else if (random < 0.75) { // 15% Reto
      return { tipo: 'Reto Físico', emoji: '💪', color: 'from-orange-500 to-red-600' };
    } else if (random < 0.90) { // 15% Acertijo
      return { tipo: 'Acertijo', emoji: '🧩', color: 'from-purple-500 to-indigo-600' };
    } else { // 10% Otros
      return { tipo: 'Desafío Rápido', emoji: '⚡', color: 'from-yellow-500 to-amber-600' };
    }
  };

  const casillaInfo = getCasillaInfo();

  return (
    <AnimatePresence>
      {showChoice && (
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
              <div className="text-6xl mb-3">🎲</div>
              <h2 className="text-4xl font-bold mb-2">¡Caíste en la casilla {newPosition}!</h2>
              <div className={`inline-block bg-gradient-to-r ${casillaInfo.color} px-6 py-3 rounded-xl mt-3 shadow-lg`}>
                <p className="text-2xl font-bold">
                  {casillaInfo.emoji} {casillaInfo.tipo}
                </p>
              </div>
              <p className="text-xl text-purple-200 mt-4">
                ¿Qué quieres hacer?
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Opción Normal */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNormalChoice}
                className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-2xl border-4 border-yellow-300 shadow-2xl"
              >
                <div className="text-6xl mb-4">{casillaInfo.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">Hacer el Reto</h3>
                <p className="text-sm text-green-100">
                  Juega: <strong>{casillaInfo.tipo}</strong>
                </p>
                <div className="mt-4 text-yellow-200 font-semibold">
                  ✅ Gana puntos respondiendo
                </div>
              </motion.button>

              {/* Opción Caja Sorpresa */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMysteryChoice}
                className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-8 rounded-2xl border-4 border-yellow-300 shadow-2xl animate-pulse"
              >
                <div className="text-6xl mb-4">🎁❓</div>
                <h3 className="text-2xl font-bold mb-2">Caja Sorpresa</h3>
                <p className="text-sm text-purple-100">
                  Ignora el reto y abre una caja misteriosa
                </p>
                <div className="mt-4 text-yellow-200 font-semibold">
                  ⚠️ ¡Arriésgate!
                </div>
              </motion.button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-purple-200">
                💡 <strong>Consejo:</strong> Los retos dan puntos seguros. Las cajas pueden avanzarte... ¡o retrocederte! 🎲
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MysteryBox;
