import React, { useState,useEffect } from 'react'
//importing scrollbar
import ScrollToBottom from 'react-scroll-to-bottom';

const Chats = ({socket,username,roomid}) => {
   const [currentMsg,setCurrentMsg]=useState("");
   const [messageList,setMessageList]=useState([]);

   const send=async()=>{
         if(currentMsg!=="")
         {
               const message={
                     roomid:roomid,
                     author:username,
                     message:currentMsg,
                     time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
               }
               await socket.emit("send_message",message);
               setMessageList((list)=>[...list,message]);
               setCurrentMsg("");
         }
   }

   useEffect(()=>{
         socket.off("receive_message").on("receive_message",(data)=>{
                setMessageList((list)=>[...list,data]);
      })
   },[socket])
  return (
    <div className="myrow my-5">
          <div className="a"></div>
          <div className="b">
          <div className='chat-window'>
          <div className='chat-header'>
                <p>Live Chat</p>
          </div>
          <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                {messageList.map(message=>{
                      return <div className='message' id={username===message.author?"other":"you"}>
                            <div>
                              <div className='message-content'>
                                    <p>{message.message}</p>
                              </div>
                              <div className='message-meta'>
                                    <p id='time'>{message.time}</p>
                                    <p id='author'>{message.author}</p>
                              </div>
                            </div>
                      </div>
                })}
                </ScrollToBottom>
          </div>
          <div className='chat-footer'>
                <input type="text" value={currentMsg} placeholder='..' onChange={(e)=>setCurrentMsg(e.target.value)} onKeyPress={(e)=>{e.key=="Enter" && send();}} />
                <button onClick={send}>&#9658;</button>
          </div>
    </div>
          </div>
          <div className="c"></div>
    </div>
  )
}

export default Chats