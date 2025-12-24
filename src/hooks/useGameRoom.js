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
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = async (playerName) => {
    const roomCode = generateRoomCode();
    const roomRef = ref(database, `rooms/${roomCode}`);
    const playerId = push(ref(database, `rooms/${roomCode}/players`)).key;

    const roomData = {
      code: roomCode,
      host: playerId,
      gameState: 'lobby',
      currentPlayerIndex: 0,
      createdAt: Date.now(),
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
    setRoom({ code: roomCode, host: playerId });
    
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
          
          if (Object.keys(roomData.players || {}).length >= 6) {
            reject(new Error('La sala está llena (máximo 6 jugadores)'));
            return;
          }

          const playerId = push(ref(database, `rooms/${roomCode}/players`)).key;
          const avatars = ['🧑', '👨', '👩', '🧔', '👴', '👵'];
          const usedAvatars = Object.values(roomData.players).map(p => p.avatar);
          const availableAvatar = avatars.find(a => !usedAvatars.includes(a)) || '👤';

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
      
      await update(playerRef, {
        position: newPosition,
        points: (player.points || 0) + pointsEarned
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

      // Verificar si alguien ganó (llegó a la casilla final)
      const winner = players.find(p => p.position >= 20);
      if (winner) {
        await update(roomRef, {
          gameState: 'finished',
          winner: winner.id
        });
      }
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
    leaveRoom
  };
}
