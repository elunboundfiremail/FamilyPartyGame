import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiceRoll from './DiceRoll';
import PlayerCard from './PlayerCard';
import CircuitBoard from './CircuitBoard';
import MysteryBox from './MysteryBox';
import MysteryBoxResult from './MysteryBoxResult';
import TapGame from './TapGame';
import MemoryGame from './MemoryGame';
import MathGame from './MathGame';
import SpokenAnswer from './SpokenAnswer';
import { getRandomReward } from '../data/mysteryBoxRewards';
import { triviaQuestions, acertijos, retos, preguntasConversacion } from '../data/questions';

function GameBoard({ room, players, currentPlayer, onRollDice, onMiniGameComplete, onEndTurn, onSetVotingState, onMarkAsAnswered, onSubmitVote, onClearVotingState }) {
  const [showDice, setShowDice] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [showMysteryResult, setShowMysteryResult] = useState(false);
  const [showSharedQuestion, setShowSharedQuestion] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [miniGameData, setMiniGameData] = useState(null);
  const [mysteryReward, setMysteryReward] = useState(null);
  const [sharedQuestionData, setSharedQuestionData] = useState(null);
  
  const boardSpaces = 30; // Número de casillas en el tablero
  const playerColors = [
    'bg-pink-500', 'bg-purple-500', 'bg-cyan-500', 'bg-yellow-500', 
    'bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-orange-500', 'bg-teal-500', 'bg-lime-500', 'bg-rose-500'
  ];

  const handleRollDice = () => {
    setShowDice(true);
  };

  const handleDiceComplete = (result) => {
    setDiceResult(result);
    setShowDice(false);
    
    // Mostrar opción: casilla normal o caja sorpresa
    setTimeout(() => {
      setShowMysteryBox(true);
    }, 500);
  };

  const handleMysteryChoice = (choice) => {
    setShowMysteryBox(false);
    
    if (choice === 'mystery') {
      // Caja sorpresa
      const reward = getRandomReward();
      setMysteryReward(reward);
      
      if (reward.type === 'minigame') {
        // Es un minijuego especial (tap, memory, math)
        setMiniGameData({
          type: reward.value,
          player: currentPlayer
        });
        setShowMiniGame(true);
      } else {
        // Mostrar resultado de la caja
        setShowMysteryResult(true);
      }
    } else {
      // Casilla normal - ALEATORIA con más peso a conversación
      const random = Math.random();
      let randomType;
      
      if (random < 0.40) { // 40% Conversación
        randomType = 'conversacion';
      } else if (random < 0.60) { // 20% Trivia
        randomType = 'trivia';
      } else if (random < 0.75) { // 15% Reto
        randomType = 'reto';
      } else if (random < 0.90) { // 15% Acertijo
        randomType = 'acertijo';
      } else { // 10% Desafío rápido
        randomType = 'rapido';
      }
      
      // Obtener pregunta según el tipo
      let question;
      if (randomType === 'trivia') {
        const allTrivia = Object.values(triviaQuestions).flat();
        question = allTrivia[Math.floor(Math.random() * allTrivia.length)];
      } else if (randomType === 'acertijo') {
        question = acertijos[Math.floor(Math.random() * acertijos.length)];
      } else if (randomType === 'reto') {
        question = retos[Math.floor(Math.random() * retos.length)];
        if (question.text && !question.q) {
          question.q = question.text;
        }
      } else if (randomType === 'conversacion') {
        const pregunta = preguntasConversacion[Math.floor(Math.random() * preguntasConversacion.length)];
        question = { q: pregunta, points: 10, a: ['Respuesta válida'] };
      } else if (randomType === 'rapido') {
        const pregunta = retos[Math.floor(Math.random() * retos.length)];
        question = { q: pregunta.text || pregunta.q, points: 10, a: ['Completado'] };
      }
      
      // Ir directamente a SpokenAnswer (respuesta hablada + votación)
      setSharedQuestionData(question);
      setShowSharedQuestion(true);
      
      // Inicializar estado de votación en Firebase
      onSetVotingState(question);
    }
  };

  const handleMysteryBoxComplete = (reward) => {
    setShowMysteryResult(false);
    
    // Aplicar recompensa
    let pointsEarned = 0;
    if (reward.type === 'points') {
      pointsEarned = reward.value;
    }
    
    onMiniGameComplete(pointsEarned);
    setTimeout(() => {
      onEndTurn();
    }, 1000);
  };

  const handleSpecialMiniGameComplete = (points) => {
    // Solo para minijuegos especiales de botones (tap, memoria, math)
    setShowMiniGame(false);
    onMiniGameComplete(points);
    setTimeout(() => {
      onEndTurn();
    }, 1000);
  };

  const handleSharedQuestionComplete = (points, winnerId) => {
    setShowSharedQuestion(false);
    onClearVotingState(); // Limpiar estado de votación
    onMiniGameComplete(points);
    setTimeout(() => {
      onEndTurn();
    }, 1500);
  };

  const isMyTurn = currentPlayer?.id === players.find(p => p.isMe)?.id;

  return (
    <div className="min-h-screen p-4 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header con información de la sala */}
        <div className="glass rounded-xl p-4 mb-4 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🎮 Family Party</h2>
              <p className="text-sm text-purple-200">Sala: {room.code}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-200">Turno actual:</p>
              <p className="text-xl font-bold">{currentPlayer?.name}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Panel lateral de jugadores */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-white font-bold text-xl mb-3">👥 Jugadores ({players.length})</h3>
            <div className="max-h-[400px] lg:max-h-[600px] overflow-y-auto space-y-3 pr-2">
              {players.map((player, index) => (
                <PlayerCard 
                  key={player.id}
                  player={player}
                  color={playerColors[index % playerColors.length]}
                  isCurrentTurn={player.id === currentPlayer?.id}
                />
              ))}
            </div>
          </div>

          {/* Tablero de juego */}
          <div className="lg:col-span-2">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4 text-center">🎲 Circuito de Juego</h3>
              
              {/* Nuevo tablero en forma de circuito */}
              <CircuitBoard players={players} totalSpaces={boardSpaces} boardPattern={room.boardPattern} />
            </div>
          </div>
        </div>

        {/* Controles del turno - FUERA del grid, siempre visible */}
        <div className="text-center mt-6 mb-8">
          {isMyTurn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRollDice}
              disabled={showDice || showMiniGame || showSharedQuestion || showMysteryBox || showMysteryResult}
              className="btn-primary text-2xl disabled:opacity-50"
            >
              🎲 Lanzar Dado
            </motion.button>
          ) : (
            <div className="glass rounded-xl p-4 max-w-md mx-auto">
              <p className="text-purple-200">
                ⏳ Esperando el turno de {currentPlayer?.name}...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <AnimatePresence>
        {showDice && (
          <DiceRoll onComplete={handleDiceComplete} />
        )}
        
        {showMysteryBox && (
          <MysteryBox 
            onChoice={handleMysteryChoice}
            currentPosition={currentPlayer?.position || 0}
            diceResult={diceResult}
          />
        )}
        
        {showMysteryResult && mysteryReward && (
          <MysteryBoxResult
            reward={mysteryReward}
            onComplete={handleMysteryBoxComplete}
          />
        )}
        
        {miniGameData?.type === 'tap' && showMiniGame && (
          <TapGame
            player={miniGameData.player}
            onComplete={handleSpecialMiniGameComplete}
          />
        )}
        
        {miniGameData?.type === 'memory' && showMiniGame && (
          <MemoryGame
            player={miniGameData.player}
            onComplete={handleSpecialMiniGameComplete}
          />
        )}
        
        {miniGameData?.type === 'math' && showMiniGame && (
          <MathGame
            player={miniGameData.player}
            onComplete={handleSpecialMiniGameComplete}
          />
        )}
        
        {showSharedQuestion && sharedQuestionData && (
          <SpokenAnswer
            question={sharedQuestionData}
            players={players}
            currentPlayer={currentPlayer}
            onComplete={handleSharedQuestionComplete}
            votingState={room.votingState}
            onMarkAnswered={onMarkAsAnswered}
            onSubmitVote={onSubmitVote}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameBoard;
