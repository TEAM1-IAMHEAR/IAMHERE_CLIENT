import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-kit";
import io from "socket.io-client";

import SendIcon from "/assets/send.png";
import VoiceIcon from "/assets/voice.png";

import Bubble from "./Bubble";

const socket = io("localhost:4000");

const Chat = ({}) => {
  const [state, setState] = useState({ name: "", message: "" });
  const [arrivalChat, setArrivalChat] = useState(null);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", name);
  }, []);

  useEffect(() => {
    arrivalChat && setChat((prev) => [...prev, arrivalChat]); // 채팅 리스트에 추가
  }, [arrivalChat]);

  useEffect(() => {
    socket.on("chat-msg", (name, message) => {
      // 메세지 수신
      setArrivalChat(message);
    });
  }, [socket]);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { message } = state;

    socket.emit("chat-msg", name, message);

    setState({ message: "" });
  };

  function speak(text, opt_prop) {
    if (
      typeof SpeechSynthesisUtterance === "undefined" ||
      typeof window.speechSynthesis === "undefined"
    ) {
      alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
      return;
    }

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || "ko-KR";
    speechMsg.text = text;

    window.speechSynthesis.speak(speechMsg);
  }

  const textRead = (title) => {
    speak(title, {
      rate: 1,
      pitch: 0.8,
    });
  };

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result);
      setState({ ...state, message: result });
    },
  });

  return (
    <SContainer>
      <STop>
        <img
          src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/10/urbanbrush-20221031104718171735.jpg"
          alt="profile-image"
        />
        <div className="profile">
          <p>기준 (19)</p>
          <p>INFJ</p>
        </div>
      </STop>
      <SChatBox>
        {chat.map((chat, i) => {
          let isMine = i % 2 === 0;
          return (
            <Bubble
              isMine={isMine}
              content={chat}
              textRead={textRead}
              key={i}
            />
          );
        })}
      </SChatBox>
      <SInput>
        <div className="input-box">
          <img src={VoiceIcon} alt="" onMouseDown={listen} onMouseUp={stop} />
          <input
            type="text"
            placeholder="친구랑 이야기 해보세요."
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === "Enter") onMessageSubmit(e);
            }}
          />
        </div>

        <img src={SendIcon} alt="" onClick={onMessageSubmit} />
      </SInput>
    </SContainer>
  );
};

export default Chat;

const SContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 50px;
  padding: 25px;
  width: 350px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  background-color: white;
  box-shadow: 0px -1px 20px rgba(66, 66, 66, 0.25);
  border-radius: 40px;
  z-index: 10;
`;

const STop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }
`;

const SChatBox = styled.div`
  position: relative;
  margin: 20px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SInput = styled.div`
  width: 100%;
  height: 40px;
  background: #f2f2f2;
  border-radius: 19px;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  /* justify-content: space-between; */

  .input-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
  input {
    background: #f2f2f2;
    border: none;
    outline: none;
  }

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
