import { useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import defaultAvatar from "../../images/defaultAvatar.png";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import AddFrdModal from "./Friends/AddFrd_Modal";
import SentRequestModal from "./Friends/SentRequest_Modal";
import ReceivedRequestsModal from "./Friends/ReceivedRequests_Modal";

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Sidebar({ msgFunc }) {
  const { currentUser } = useAuth();
  const { signout } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [addFrdModalState, setAddFrdModalState] = useState(false);
  const [sentReqModalState, setSentReqModalState] = useState(false);
  const [receivedReqModalState, setReceivedReqModalState] = useState(false);

  const handleSignout = async () => {
    await signout();
    history.push("/Login");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddFrd = () => {
    setAddFrdModalState(!addFrdModalState);
  };

  const handleSentRequests = () => {
    setSentReqModalState(!sentReqModalState);
  };

  const handleReceivedRequests = () => {
    setReceivedReqModalState(!receivedReqModalState);
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_user">
          <Avatar src={defaultAvatar} />
          <h3>{currentUser.displayName}</h3>
        </div>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleAddFrd}>Find friends</MenuItem>
            <MenuItem onClick={handleSentRequests}>Sent requests</MenuItem>
            <MenuItem onClick={handleReceivedRequests}>
              Received requests
            </MenuItem>
            <MenuItem onClick={handleSignout}>Logout</MenuItem>
            {addFrdModalState ? (
              <AddFrdModal show={addFrdModalState} handleClose={handleAddFrd} />
            ) : (
              ""
            )}
            {sentReqModalState ? (
              <SentRequestModal
                show={sentReqModalState}
                handleClose={handleSentRequests}
              />
            ) : (
              ""
            )}
            {receivedReqModalState ? (
              <ReceivedRequestsModal
                show={receivedReqModalState}
                handleClose={handleReceivedRequests}
              />
            ) : (
              ""
            )}
          </Menu>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat msgFunc={msgFunc} sidebarRender={addFrdModalState} />
      </div>
    </div>
  );
}

export default Sidebar;
