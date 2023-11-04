import React, { useEffect, useState } from 'react'
import './style.scss'
import Img from "../../../assets/images/chat/img.png";
import Attach from "../../../assets/images/chat/attach.png";

import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { createMessage } from '../../../store/messageSlice';
import { getUserFromLocalStorage } from '../../../store/userSlice';
// import { sendMsgToOpenAI } from '../../../utils/openai';

const socket = io(`${process.env.REACT_APP_API_URL}`);

const Input = () => {
  const [valueText, setValueText] = useState("");
  const [user, setUser] = useState('');

  const dispatch = useDispatch();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (valueText.trim() === "") {
      return;
    }

//     const res = await sendMsgToOpenAI(valueText);
// console.log(res)

    // const senderInfo = {
    //   authorEmail: user?.email,
    //   username: user?.userName,
    //   senders: "user",
    //   messageContent: valueText
    // }

    // dispatch(createMessage(senderInfo))

    // socket.emit('send_messages', senderInfo)

    setValueText("");
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
      setValueText("");
    }
  };

  useEffect(() => {
    setUser(getUserFromLocalStorage())
  }, [socket]);

  return (
    <div className="input-chatbox">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setValueText(e.target.value)}
        onKeyPress={handleKeyPress}
        value={valueText}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Input