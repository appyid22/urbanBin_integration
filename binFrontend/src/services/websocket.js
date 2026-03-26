import { io } from 'socket.io-client';

let socket_client = null;

export const connect = (token, onConnect, onError) => {
  const ws_url = import.meta.env.VITE_WS_URL || 'http://localhost:5000';

  if (socket_client) {
    socket_client.disconnect();
  }

  socket_client = io(ws_url, {
    auth: token ? { token: `Bearer ${token}` } : {},
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000
  });

  socket_client.on('connect', () => {
    if (onConnect) onConnect();
  });

  socket_client.on('connect_error', (error) => {
    if (onError) onError(error);
  });

  return socket_client;
};

export const subscribe = (event_name, callback) => {
  if (!socket_client) {
    return () => {};
  }

  socket_client.on(event_name, callback);

  return () => {
    if (socket_client) {
      socket_client.off(event_name, callback);
    }
  };
};

export const disconnect = () => {
  if (socket_client) {
    socket_client.disconnect();
    socket_client = null;
  }
};

export const getClient = () => socket_client;
