import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';


function Message({message , key}) {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior : "smooth"});
  },[message])
  
  return (
    <div ref={ref} className={`message ${message.sendId === currentUser.uid && "owner"}`} key={key}>
      <div className="messageInfo">
        <div className="imgContainer">
          <img src={message.sendId === currentUser.uid ? currentUser.photoURL : data.userInfo.photoURL} alt=""/>
        </div>
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt=""/>}
      </div>
    </div>
  )
}

export default Message