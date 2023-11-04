import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

import { useDispatch } from 'react-redux';
import { getUserFromLocalStorage } from '../../../store/userSlice';
import { getAllMessage } from '../../../store/messageSlice';
import logo_avatar from '../../../assets/images/leosplash-1.png'

import io from 'socket.io-client';
import { getFirstLetter } from '../../../utils';
const socket = io(`${process.env.REACT_APP_URL}`);

const Messages = () => {

  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');

  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(scrollToBottom, [messages])

  useEffect(() => {

    setUser(getUserFromLocalStorage())

    dispatch(getAllMessage(getUserFromLocalStorage()?.email)).then((result) => {
      if (result?.payload?.status === 200) {
        setMessages(result?.payload?.data)
      }
    })

    socket.on('all_message', (data) => {
      console.log(data)
    })

  }, [socket]);

  const Message = ({ message }) => {
    return (
      <div className={'bot' !== message.sender ? 'message owner' : 'message'}>
        <div className="messageInfo">

          {'bot' === message.sender
            ?
            <img
              className='logo-owner'
              src={logo_avatar}
              alt=""
            />
            :
            <div className="avatar-chat-owner chakra-link " to="/settings">
              <div role="group" className="chakra-link-item">
                <div className="chakra-stack">
                  <span className="chakra-avatar ">
                    <div role="img" aria-label={user?.userName} className="chakra-avatar__initials css-uo84k3">
                      {getFirstLetter(user?.userName)}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          }

        </div>
        <div className="messageContent">
          <p>{message.messageContent}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="messages">
      {messages?.map((m, index) => (
        <Message message={m} key={index} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export default Messages