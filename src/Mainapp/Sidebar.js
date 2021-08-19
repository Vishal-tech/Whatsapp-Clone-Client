import react,{ useState,useEffect } from 'react';
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import dp from "../images/dp.jpg"
import {Avatar,IconButton,Menu,MenuItem} from '@material-ui/core';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';


import AddFrdModal from './AddFrd_Modal'
import { useAuth } from '../Auth/AuthContext'
import { useHistory } from 'react-router-dom';

function Sidebar({msgFunc}){
    
    const { currentUser } = useAuth();
    const { signout } = useAuth();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
    const [modalState, setModalState]= useState(false);

    const handleSignout = () => {
		signout();
		history.push('/Login');
	  }; 


	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handleClose = () => {
		setAnchorEl(null);
	  };


    const handleAddFrd = () => {
        setModalState(!modalState);
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_user">
                    <Avatar src={dp} />
                    <h3>{currentUser.displayName}</h3>
                </div>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
						<MoreVertIcon />
					</IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleAddFrd}>Add a friend</MenuItem>
                                <MenuItem onClick={handleSignout}>Logout</MenuItem>
                                <AddFrdModal show={modalState} handleClose={handleAddFrd} />     
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
                <SidebarChat msgFunc={msgFunc} sidebarRender={modalState} />
            </div>
        </div>
       
    )
}

export default Sidebar;