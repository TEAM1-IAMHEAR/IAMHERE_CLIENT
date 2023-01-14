import React, { FC } from "react";
import styled from "@emotion/styled";
import { ChatDto } from "../../services/user";
import { Divider } from "@mui/material";

interface Props {
  chat: {
    name: string;
    profileImg?: string;
    currentMessage: string;
    time: string;
  };
}

const ChatRoomItem: FC<Props> = ({ chat }) => {
  console.log(chat.profileImg);

  return (
    <Container>
      <div className="profile-box">
        <img src={chat?.profileImg} alt="" />
        <div className="text-box">
          <p>{chat.name}</p>
          <p>{chat.currentMessage}</p>
        </div>
      </div>
      <p id="time">{chat.time}</p>
    </Container>
  );
};

export default ChatRoomItem;

const Container = styled.div`
  padding: 10px 0;
  margin: auto;
  width: 100%;
  max-width: 320px;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  :hover {
    background-color: #f2f2f2;
    transition: all 0.5s;
  }

  .profile-box {
    display: flex;
    flex-direction: row;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      object-fit: cover;
      border: 1px solid #f2f2f2;
    }

    .text-box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      p:last-child {
        font-size: 14px;
        line-height: 17px;
        color: #898989;
      }
    }
  }
`;
