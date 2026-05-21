import React from "react";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";
import { useSelector } from "react-redux";

const Root = () => {
  const { auth } = useSelector((state: any) => state);
  let userId = auth?.user?._id;
  console.log("userId", userId);

  return (
    <SocketProvider userId={userId}>
      <App />
    </SocketProvider>
  );
};

export default Root;
