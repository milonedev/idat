// src/utils/socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Ajusta según tu backend

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = (token) => {
  socket.io.opts.extraHeaders = {
    'x-token': token,
  };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};