import React, { useState } from 'react'
import io from 'socket.io-client';
//componets
import './App.css'
import Chats from './Chats';


const socket=io.connect("https://simplechat-room.herokuapp.com/");

const App = () => {
   const [username,setUsername]=useState("");
   const [roomid,setRoomid]=useState("");
   const [showChat,setShowchat]=useState(false);

   const joinRoom=()=>{
          if(username!=="" && roomid!=="")
          {
                socket.emit("join_room",roomid);
                setShowchat(true);
          }
   }

  return (
    <div className='App'>
       {showChat==false?
      <div className="joinChatContainer">
                  <h3 style={{fontWeight:'bold'}}>JOIN A CHAT</h3>
            <input type="text" placeholder='Username..' onChange={(e)=>setUsername(e.target.value)} />
            <input type="text" placeholder='Room ID..' onChange={(e)=>setRoomid(e.target.value)} />
            <button onClick={joinRoom}>JOIN ROOM</button>
      </div> 
      :
       <Chats socket={socket} username={username} roomid={roomid} />
       }
    </div>
  )
}

export default App
