import React,{ useEffect, useState } from 'react';
import './MainApp.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from '../axios';

import { useAuth } from '../Auth/AuthContext'
import { Redirect } from 'react-router-dom';


function MainApp() {

  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
    setMessages(response.data);
    });
  }, []);

  useEffect(() => {
      const pusher = new Pusher(process.env.REACT_APP_key, {
      cluster: process.env.REACT_APP_cluster
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      setMessages([...messages,newMessage]);

    });

    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
      };
  },[messages]);



  return (
    <>
    {currentUser ?(
          <div className="app">
            <div className="app_body">
              <Sidebar msgFunc={setMessages} />
              {console.log(messages)}
              <Chat messages={messages}/> 
            </div>
          </div>
      ) : (
            <Redirect to="/Login" />
          )}
    </>
  )
}
export default MainApp;
