// Recompensas y castigos de las Cajas Sorpresa

export const mysteryBoxRewards = {
  // Premios Buenos (50% de probabilidad) - REDUCIDOS
  good: [
    { 
      type: 'advance', 
      value: 3, 
      emoji: '🚀', 
      title: '¡Trineo Turbo!', 
      message: '¡Avanzas 3 casillas extra!' 
    },
    { 
      type: 'double', 
      value: 2, 
      emoji: '💫', 
      title: 'Estrella de Navidad', 
      message: '¡Doble puntos en el siguiente minijuego!' 
    },
    { 
      type: 'points', 
      value: 10, 
      emoji: '🎁', 
      title: '¡Regalo Especial!', 
      message: '¡Encontraste +10 puntos!' 
    },
  ],
  
  // Premios Malos (30% de probabilidad) - REDUCIDOS
  bad: [
    { 
      type: 'retreat', 
      value: -2, 
      emoji: '⬅️', 
      title: 'Viento Helado', 
      message: '¡Retrocedes 2 casillas!' 
    },
    { 
      type: 'skip', 
      value: 1, 
      emoji: '❌', 
      title: 'Congelado', 
      message: '¡Pierdes tu próximo turno!' 
    },
  ],
  
  // Premios Mixtos/Interactivos (20% de probabilidad)
  mixed: [
    { 
      type: 'minigame', 
      value: 'tap', 
      emoji: '⚡', 
      title: '¡Desafío Relámpago!', 
      message: 'Presiona el botón lo más rápido posible' 
    },
    { 
      type: 'minigame', 
      value: 'memory', 
      emoji: '🧠', 
      title: 'Memoria de Renos', 
      message: 'Memoriza la secuencia de renos de Santa' 
    },
    { 
      type: 'minigame', 
      value: 'math', 
      emoji: '🔢', 
      title: 'Cuenta Regalos', 
      message: 'Resuelve cálculos rápidos' 
    },
  ]
};

// Función para obtener una recompensa aleatoria
export function getRandomReward() {
  const random = Math.random();
  
  if (random < 0.5) {
    // 50% buenos
    const rewards = mysteryBoxRewards.good;
    return rewards[Math.floor(Math.random() * rewards.length)];
  } else if (random < 0.8) {
    // 30% malos
    const rewards = mysteryBoxRewards.bad;
    return rewards[Math.floor(Math.random() * rewards.length)];
  } else {
    // 20% mixtos
    const rewards = mysteryBoxRewards.mixed;
    return rewards[Math.floor(Math.random() * rewards.length)];
  }
}
