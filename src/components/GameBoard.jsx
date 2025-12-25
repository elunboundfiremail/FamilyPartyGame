import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DiceRoll from './DiceRoll';
import MiniGame from './MiniGame';
import PlayerCard from './PlayerCard';
import VotingSystem from './VotingSystem';
import CircuitBoard from './CircuitBoard';
import MysteryBox from './MysteryBox';
import MysteryBoxResult from './MysteryBoxResult';
import TapGame from './TapGame';
import MemoryGame from './MemoryGame';
import MathGame from './MathGame';
import { getRandomReward } from '../data/mysteryBoxRewards';

function GameBoard({ room, players, currentPlayer, onRollDice, onMiniGameComplete, onEndTurn }) {
  const [showDice, setShowDice] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showVoting, setShowVoting] = useState(false);
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const [showMysteryResult, setShowMysteryResult] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [miniGameData, setMiniGameData] = useState(null);
  const [pendingPoints, setPendingPoints] = useState(0);
  const [mysteryReward, setMysteryReward] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  
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
        // Es un minijuego especial
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
      // Casilla normal
      const position = (currentPlayer.position || 0) + diceResult;
      const spaceTypes = ['trivia', 'acertijo', 'reto', 'rapido', 'conversacion', 'penitencia'];
      const typeIndex = position % spaceTypes.length;
      
      setMiniGameData({
        type: spaceTypes[typeIndex],
        player: currentPlayer
      });
      setShowMiniGame(true);
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

  const handleMiniGameComplete = (points, answer = null, correctAns = null) => {
    setShowMiniGame(false);
    
    // Si es un reto, conversación o trivia, activar votación
    if (miniGameData.type === 'reto' || miniGameData.type === 'conversacion' || miniGameData.type === 'trivia') {
      setPendingPoints(points);
      setCorrectAnswer(correctAns); // Para trivias, mostrar respuesta correcta
      setShowVoting(true);
    } else {
      // Para acertijos y juegos de caja sorpresa, dar puntos directamente
      onMiniGameComplete(points);
      setTimeout(() => {
        onEndTurn();
      }, 1000);
    }
  };

  const handleVoteComplete = (approved, yesVotes, noVotes) => {
    setShowVoting(false);
    
    // Si fue aprobado, dar los puntos, si no, dar 0
    const finalPoints = approved ? pendingPoints : 0;
    
    onMiniGameComplete(finalPoints);
    
    setTimeout(() => {
      onEndTurn();
    }, 1500);
  };

  const isMyTurn = currentPlayer?.id === players.find(p => p.isMe)?.id;

  return (
    <div className="min-h-screen p-4">
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
            <div className="max-h-[600px] overflow-y-auto space-y-3 pr-2">
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
              <CircuitBoard players={players} totalSpaces={boardSpaces} />

              {/* Controles del turno */}
              <div className="text-center mt-6">
                {isMyTurn ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRollDice}
                    disabled={showDice || showMiniGame || showVoting}
                    className="btn-primary text-2xl disabled:opacity-50"
                  >
                    🎲 Lanzar Dado
                  </motion.button>
                ) : (
                  <div className="glass rounded-xl p-4">
                    <p className="text-purple-200">
                      ⏳ Esperando el turno de {currentPlayer?.name}...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <AnimatePresence>
        {showDice && (
          <DiceRoll onComplete={handleDiceComplete} />
        )}
        
        {showMiniGame && miniGameData && (
          <MiniGame 
            type={miniGameData.type}
            player={miniGameData.player}
            onComplete={handleMiniGameComplete}
          />
        )}
        
        {showVoting && (
          <VotingSystem
            players={players}
            currentPlayer={currentPlayer}
            onVoteComplete={handleVoteComplete}
            correctAnswer={correctAnswer}
          />
        )}
        
        {showMysteryBox && (
          <MysteryBox onChoice={handleMysteryChoice} />
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
            onComplete={handleMiniGameComplete}
          />
        )}
        
        {miniGameData?.type === 'memory' && showMiniGame && (
          <MemoryGame
            player={miniGameData.player}
            onComplete={handleMiniGameComplete}
          />
        )}
        
        {miniGameData?.type === 'math' && showMiniGame && (
          <MathGame
            player={miniGameData.player}
            onComplete={handleMiniGameComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameBoard;
