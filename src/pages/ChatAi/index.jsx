import React from 'react'
import Messages from '../../components/chat/Messages'
import Input from '../../components/chat/Input'
import './style.scss'

const ChatAi = () => {
  return (
    <div className='chat-with-ai'>
      <div className='chat-space'>
        <Messages />
        <Input />
      </div>
    </div>

  )
}

export default ChatAi