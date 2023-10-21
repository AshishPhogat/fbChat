import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'


function Chat() {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <div>{data.user?.displayName}</div>
        <div className='chatIcons'>
            <span>Camera</span>
            <span>AddFriend</span>
            <span>More</span>
      </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat