import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import "./SidebarChat.css";

function SidebarChat({ msgFunc, sidebarRender }) {
  const handleChatChange = (name, chat) => {};

  const ChatEntries = () => {
    var frds = [];
    // for (const [key, value] of Object.entries(friends)) {
    //   frds.push(
    //     <div
    //       className="sidebarChat"
    //       onClick={() => handleChatChange(value.name, value.chat)}
    //     >
    //       <Avatar />
    //       <div className="sidebarChat_info">
    //         <h2>{value.name}</h2>
    //       </div>
    //     </div>
    //   );
    // }
    return frds;
  };

  return <div>{ChatEntries()}</div>;
}

export default SidebarChat;
