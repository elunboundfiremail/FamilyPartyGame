import { useState, useEffect } from 'react';
import { ref, set, onValue, push, update, remove } from 'firebase/database';
import { database } from '../config/firebase';

export function useGameRoom() {
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState('lobby'); // lobby, playing, finished
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [myPlayerId, setMyPlayerId] = useState(null);

  const generateRoomCode = () => {
    // Generar código de 4 dígitos numéricos
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  const createRoom = async (playerName) => {
    const roomCode = generateRoomCode();
    const roomRef = ref(database, `rooms/${roomCode}`);
    const playerId = push(ref(database, `rooms/${roomCode}/players`)).key;

    // Generar patrón del tablero UNA SOLA VEZ
    const patterns = ['snake', 'spiral', 'zigzag'];
    const boardPattern = patterns[Math.floor(Math.random() * patterns.length)];

    const roomData = {
      code: roomCode,
      host: playerId,
      gameState: 'lobby',
      currentPlayerIndex: 0,
      createdAt: Date.now(),
      boardPattern: boardPattern, // Guardar el patrón
      players: {
        [playerId]: {
          id: playerId,
          name: playerName,
          position: 0,
          points: 0,
          isHost: true,
          avatar: '🧑'
        }
      }
    };

    await set(roomRef, roomData);
    setMyPlayerId(playerId);
    setRoom({ code: roomCode, host: playerId, boardPattern });
    
    // Escuchar cambios en la sala
    listenToRoom(roomCode);
    
    return roomCode;
  };

  const joinRoom = async (roomCode, playerName) => {
    const roomRef = ref(database, `rooms/${roomCode}`);
    
    // Verificar que la sala existe
    return new Promise((resolve, reject) => {
      onValue(roomRef, (snapshot) => {
        if (snapshot.exists()) {
          const roomData = snapshot.val();

          const playerId = push(ref(database, `rooms/${roomCode}/players`)).key;
          const avatars = ['🧑', '👨', '👩', '🧔', '👴', '👵', '👦', '👧', '🧒', '👶', '🧓', '👩‍🦰', '👨‍🦱', '👱‍♀️', '👱‍♂️'];
          const playerCount = Object.keys(roomData.players).length;
          const availableAvatar = avatars[playerCount % avatars.length];

          const playerData = {
            id: playerId,
            name: playerName,
            position: 0,
            points: 0,
            isHost: false,
            avatar: availableAvatar
          };

          const updates = {};
          updates[`rooms/${roomCode}/players/${playerId}`] = playerData;
          
          update(ref(database), updates).then(() => {
            setMyPlayerId(playerId);
            setRoom({ code: roomCode, host: roomData.host });
            listenToRoom(roomCode);
            resolve(roomCode);
          });
        } else {
          reject(new Error('La sala no existe'));
        }
      }, { onlyOnce: true });
    });
  };

  const listenToRoom = (roomCode) => {
    const roomRef = ref(database, `rooms/${roomCode}`);
    
    onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const roomData = snapshot.val();
        setRoom(prev => ({ ...prev, ...roomData }));
        setPlayers(Object.values(roomData.players || {}));
        setGameState(roomData.gameState || 'lobby');
        setCurrentPlayerIndex(roomData.currentPlayerIndex || 0);
      }
    });
  };

  const startGame = async () => {
    if (room && room.host === myPlayerId) {
      const roomRef = ref(database, `rooms/${room.code}`);
      await update(roomRef, {
        gameState: 'playing',
        currentPlayerIndex: 0
      });
    }
  };

  const updatePlayerPosition = async (playerId, newPosition, pointsEarned) => {
    if (room) {
      const playerRef = ref(database, `rooms/${room.code}/players/${playerId}`);
      const player = players.find(p => p.id === playerId);
      
      // No permitir puntos negativos
      const currentPoints = player.points || 0;
      const newPoints = Math.max(0, currentPoints + pointsEarned);
      
      await update(playerRef, {
        position: newPosition,
        points: newPoints
      });
    }
  };

  const nextTurn = async () => {
    if (room) {
      const nextIndex = (currentPlayerIndex + 1) % players.length;
      const roomRef = ref(database, `rooms/${room.code}`);
      await update(roomRef, {
        currentPlayerIndex: nextIndex
      });

      // Verificar si alguien ganó (llegó a la casilla final - ahora 30)
      const winner = players.find(p => p.position >= 30);
      if (winner) {
        await update(roomRef, {
          gameState: 'finished',
          winner: winner.id
        });
      }
    }
  };

  const setVotingState = async (questionData) => {
    if (room) {
      const roomRef = ref(database, `rooms/${room.code}`);
      await update(roomRef, {
        votingState: {
          active: true,
          question: questionData,
          answered: false,
          votes: {}
        }
      });
    }
  };

  const markAsAnswered = async () => {
    if (room) {
      const votingRef = ref(database, `rooms/${room.code}/votingState`);
      await update(votingRef, {
        answered: true
      });
    }
  };

  const submitVote = async (playerId, isCorrect) => {
    if (room) {
      const voteRef = ref(database, `rooms/${room.code}/votingState/votes/${playerId}`);
      await set(voteRef, isCorrect);
    }
  };

  const clearVotingState = async () => {
    if (room) {
      const votingRef = ref(database, `rooms/${room.code}/votingState`);
      await remove(votingRef);
    }
  };

  const leaveRoom = async () => {
    if (room && myPlayerId) {
      const playerRef = ref(database, `rooms/${room.code}/players/${myPlayerId}`);
      await remove(playerRef);

      // Si era el host, eliminar la sala
      if (room.host === myPlayerId) {
        const roomRef = ref(database, `rooms/${room.code}`);
        await remove(roomRef);
      }

      setRoom(null);
      setPlayers([]);
      setMyPlayerId(null);
    }
  };

  return {
    room,
    players,
    gameState,
    currentPlayer: players[currentPlayerIndex],
    myPlayerId,
    isHost: room?.host === myPlayerId,
    createRoom,
    joinRoom,
    startGame,
    updatePlayerPosition,
    nextTurn,
    leaveRoom,
    setVotingState,
    markAsAnswered,
    submitVote,
    clearVotingState
  };
}
