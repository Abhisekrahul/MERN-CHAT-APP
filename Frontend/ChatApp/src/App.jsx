import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./componets/SignUp";
import HomePage from "./componets/HomePage";
import LogIn from "./componets/LogIn";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUser } from "./redux/UserSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));
      socket?.on("getOnlineUser", (onlineUsers) => {
        dispatch(setOnlineUser(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
