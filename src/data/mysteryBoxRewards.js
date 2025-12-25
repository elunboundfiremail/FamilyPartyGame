// Recompensas y castigos de las Cajas Sorpresa

export const mysteryBoxRewards = {
  // Premios Buenos (50% de probabilidad)
  good: [
    { 
      type: 'points', 
      value: 20, 
      emoji: '⭐', 
      title: '¡Regalo de Santa!', 
      message: '¡Santa te dio +20 puntos!' 
    },
    { 
      type: 'advance', 
      value: 3, 
      emoji: '🚀', 
      title: '¡Trineo Turbo!', 
      message: '¡Avanzas 3 casillas extra!' 
    },
    { 
      type: 'immunity', 
      value: 1, 
      emoji: '🛡️', 
      title: 'Escudo Navideño', 
      message: '¡Inmunidad en la siguiente penitencia!' 
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
      value: 15, 
      emoji: '🎁', 
      title: '¡Regalo Especial!', 
      message: '¡Encontraste +15 puntos!' 
    },
    { 
      type: 'steal', 
      value: 10, 
      emoji: '🎅', 
      title: 'Santa Ladrón', 
      message: '¡Robas 10 puntos al primer lugar!' 
    },
  ],
  
  // Premios Malos (30% de probabilidad)
  bad: [
    { 
      type: 'points', 
      value: -10, 
      emoji: '😱', 
      title: '¡Carbón!', 
      message: 'Te portaste mal... Pierdes 10 puntos' 
    },
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
    { 
      type: 'swap_position', 
      value: 0, 
      emoji: '🔄', 
      title: 'Teletransporte', 
      message: '¡Intercambias posición con el último jugador!' 
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
    { 
      type: 'all_dice', 
      value: 0, 
      emoji: '🎲', 
      title: 'Ruleta Navideña', 
      message: 'Todos tiran el dado, el menor pierde 10 pts' 
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
