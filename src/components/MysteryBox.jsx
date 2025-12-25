import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MysteryBox({ onChoice }) {
  const [showChoice, setShowChoice] = useState(true);

  const handleNormalChoice = () => {
    setShowChoice(false);
    setTimeout(() => onChoice('normal'), 500);
  };

  const handleMysteryChoice = () => {
    setShowChoice(false);
    setTimeout(() => onChoice('mystery'), 500);
  };

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
              <div className="text-6xl mb-3">🎁</div>
              <h2 className="text-4xl font-bold mb-2">¡Elige tu Destino!</h2>
              <p className="text-xl text-red-200">
                ¿Quieres jugar normal o arriesgarte con una sorpresa?
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
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold mb-2">Casilla Normal</h3>
                <p className="text-sm text-green-100">
                  Juega el minijuego de la casilla donde caíste
                </p>
                <div className="mt-4 text-yellow-200 font-semibold">
                  ✅ Seguro y predecible
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
                  Algo aleatorio: ¡puede ser increíble o terrible!
                </p>
                <div className="mt-4 text-yellow-200 font-semibold">
                  ⚠️ ¡Arriésgate!
                </div>
              </motion.button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-red-200">
                💡 <strong>Consejo:</strong> Las cajas sorpresa pueden darte hasta +20 puntos... ¡o hacerte retroceder! 🎲
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MysteryBox;
