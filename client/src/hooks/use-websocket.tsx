import { useState, useEffect, useCallback, useRef } from 'react';

interface WebSocketMessage {
  type: string;
  [key: string]: any;
}

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  
  // Connect to the WebSocket server
  useEffect(() => {
    // Create the correct WebSocket URL based on the current protocol and host
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    // Create a new WebSocket connection
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;
    
    // Handle connection events
    socket.addEventListener('open', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    });
    
    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
    
    socket.addEventListener('close', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });
    
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    });
    
    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);
  
  // Send a message through the WebSocket
  const sendMessage = useCallback((message: object) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }, []);
  
  return {
    isConnected,
    lastMessage,
    sendMessage
  };
}