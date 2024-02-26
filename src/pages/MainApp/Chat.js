import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import "./Chat.css";
import io from "socket.io-client";

import { useAuth } from "../../contexts/AuthContext";

function Chat({ messages, setMessages }) {
  const socket = io("http://localhost:3001", {
    autoConnect: false,
  });

  const { currentUser } = useAuth();
  const { frduser } = useAuth();
  const [isHomePage, setIsHomePage] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.connect();

    // Listen for incoming chat messages
    socket.on("chatMessage", (message) => {
      setMessages([...messages, message]);
    });

    // Clean up the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    let curTime = new Date().toLocaleString("hi-IN", {
      dateStyle: "short",
      timeStyle: "short",
    });

    if (input.trim() !== "") {
      socket.emit("chatMessage", { text: input });
      setInput("");
    }
  };

  console.log("isHomePage", isHomePage);
  return (
    <>
      {isHomePage ? (
        ""
      ) : (
        <div className="chat">
          <div className="chat_header">
            <Avatar />
            <div className="chat_headerInfo">
              <h3>{frduser}</h3>
            </div>
            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chat_body">
            {messages.map(
              (message) => console.log(message)
              // <p key={message._id} className={`chat_message ${message.name === currentUser.displayName && "chat_receiver"}`}>
              // 	<span className="chat_name">{message.name}</span>
              // 	{message.message}
              // 	<span className="chat_timestamp">{message.timestamp}</span>
              // </p>
            )}
          </div>

          <div className="chat_footer">
            <InsertEmoticon />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send a message
              </button>
            </form>
            <Mic />
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
