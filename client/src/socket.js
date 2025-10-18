import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
});

export const joinRoom = (roomId) => {
  socket.emit('join_room', roomId);
};

export const sendMessage = (username, message, roomId = 'general') => {
  socket.emit('send_message', { username, message, roomId });
};