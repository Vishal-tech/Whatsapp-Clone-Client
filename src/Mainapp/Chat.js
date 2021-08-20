import { Avatar, IconButton} from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import react, { useState } from 'react';
import "./Chat.css";
import axios from '../axios';

import { useAuth } from '../Auth/AuthContext'

function Chat( {messages} ){

	const { currentUser } = useAuth();
	const { frduser } = useAuth();
	const [input,setInput]= useState("");

	const sendMessage= async (e)=>{
		e.preventDefault();
		let curTime = new Date().toLocaleString("hi-IN",{dateStyle:"short",timeStyle:"short"});
		await axios.post("/messages/new",{
				message: input,
				name:currentUser.displayName,
				timestamp:curTime,
				received:true,
		});

		setInput("");
	};


	return (
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
						<IconButton >
							<MoreVert />
						</IconButton>
						
				</div>
				</div>

				<div className="chat_body">
					{messages.map((message)=>(
						<p key={message._id} className={`chat_message ${message.name===currentUser.displayName && "chat_receiver"}`}>
								<span className="chat_name">{message.name}</span>
								{message.message}
								<span className="chat_timestamp">{message.timestamp}</span>
						</p>
					))}
				
				</div>

				<div className="chat_footer">
						<InsertEmoticon />
						<form>
								<input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
								<button onClick={sendMessage} type="submit">
										Send a message
								</button>    
						</form>
						<Mic />
				</div>

		</div>
 )
}

export default Chat;