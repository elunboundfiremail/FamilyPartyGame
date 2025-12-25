import { motion } from 'framer-motion';

function ChristmasDecorations() {
  return (
    <>
      {/* Luces navideñas superiores */}
      <div className="fixed top-0 left-0 right-0 h-16 z-50 pointer-events-none">
        <div className="flex justify-around items-center h-full">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className={`w-4 h-4 rounded-full ${
                i % 3 === 0 ? 'bg-red-500' : 
                i % 3 === 1 ? 'bg-green-500' : 
                'bg-yellow-400'
              }`}
              style={{
                boxShadow: `0 0 10px ${
                  i % 3 === 0 ? '#ef4444' : 
                  i % 3 === 1 ? '#22c55e' : 
                  '#fbbf24'
                }`
              }}
            />
          ))}
        </div>
        {/* Cable de las luces */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-700 opacity-50" />
      </div>

      {/* Árbol de Navidad decorativo (esquina inferior derecha) */}
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-4 right-4 text-8xl opacity-30 pointer-events-none z-0"
        style={{ filter: 'blur(2px)' }}
      >
        🎄
      </motion.div>

      {/* Santa en la esquina superior izquierda */}
      <motion.div
        animate={{
          x: [0, 10, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-20 left-4 text-6xl opacity-40 pointer-events-none z-0"
        style={{ filter: 'blur(1px)' }}
      >
        🎅
      </motion.div>

      {/* Regalos decorativos (esquina inferior izquierda) */}
      <motion.div
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-4 left-4 text-7xl opacity-30 pointer-events-none z-0"
        style={{ filter: 'blur(2px)' }}
      >
        🎁
      </motion.div>

      {/* Estrellas brillantes flotantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="fixed text-4xl pointer-events-none z-0"
          style={{
            top: `${15 + i * 10}%`,
            left: `${10 + i * 15}%`,
            filter: 'blur(1px)'
          }}
        >
          ⭐
        </motion.div>
      ))}

      {/* Copos de nieve grandes flotantes (opcionales, más visibles) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`snowflake-${i}`}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.sin(i) * 50, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2
          }}
          className="fixed text-4xl pointer-events-none opacity-60"
          style={{
            left: `${10 + i * 20}%`,
            top: '-50px',
            filter: 'blur(0.5px)',
            zIndex: 9999
          }}
        >
          ❄️
        </motion.div>
      ))}
    </>
  );
}

export default ChristmasDecorations;
