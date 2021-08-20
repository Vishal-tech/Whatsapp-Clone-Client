import { Avatar } from '@material-ui/core';
import React,{useState,useEffect} from 'react';

import { useAuth } from '../Auth/AuthContext'
import "./SidebarChat.css";
import axios from '../axios';

function SidebarChat({msgFunc,sidebarRender}) {
    const { currentUser } = useAuth();
    const { FrdUser } = useAuth();
    const [chatChange,setChatChange]=useState();

    const [isMount, setIsMount] = useState(true);
    const [chats, setChats] = useState([]);
    const [friends, setFriends] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        console.log("1")
        axios.get('/chats',{params:{currentUser:currentUser.displayName}}).then((response) => {
            setChats(response.data);
        })
    },[sidebarRender])

    useEffect(() => {
        console.log("2")
        chats.map((chat_doc)=>{
            var frd = chat_doc.friends;
            setFriends(frd);
        })
    }, [chats])

    useEffect(() => {
        if(isMount){
            return;
        }
        console.log("3")
        setLoading(false);
    }, [friends])

    useEffect(() => {
        if(isMount){
            setIsMount(false);
            return;
        }
        console.log(chatChange);
        axios.post('/changeChat',{
            chat:chatChange,
        }).then((response)=>{
            console.log(`Chat changed`);
            msgFunc(response.data);
        })
        .catch((error) => {
            console.log(error)
            console.log(`Error : chat not changed`);
          });
    }, [chatChange])


    const handleChatChange = (name,chat) =>{
        FrdUser(name);
        setChatChange(chat);
    }
        
    const ChatEntries=()=>{
        var frds = []
        for (const [key, value] of Object.entries(friends)){
           frds.push(<div className="sidebarChat" onClick={()=>handleChatChange(value.name,value.chat)}>
                        <Avatar />
                        <div className="sidebarChat_info">
                            <h2>{value.name}</h2>
                        </div>
                    </div>
            )}
            return frds
        }   

    return (
        <div>
            <div className="sidebarChat" onClick={()=>handleChatChange('Global chat','messagecontents')}>
                <Avatar />
                <div className="sidebarChat_info">
                    <h2>Global chat</h2>
                </div>
            </div>
        {!loading && ChatEntries()}
        </div>
    )
}

export default SidebarChat;

