import React, { useState } from "react";
import "./MainApp.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

import { useAuth } from "../../auth/AuthContext";
import { Redirect } from "react-router-dom";

function MainApp() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  return (
    <>
      {currentUser ? (
        <div className="app">
          <div className="app_body">
            <Sidebar msgFunc={setMessages} />
            <Chat messages={messages} setMessages={setMessages} />
          </div>
        </div>
      ) : (
        <Redirect to="/Login" />
      )}
    </>
  );
}
export default MainApp;
