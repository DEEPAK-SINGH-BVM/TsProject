import React, { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext>({ socket: null });

export const SocketProvider: React.FC<{
  userId: string;
  children: React.ReactNode;
}> = ({ userId, children }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {   
    if (!userId) return;

    socketRef.current = io("http://localhost:1001");

    socketRef.current.emit("joinRoom", userId);
    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);
  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
