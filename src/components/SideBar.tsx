import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Chip, Divider, MenuItem, Modal, Select } from "@mui/material";
import { toast } from "react-toastify";

import Profile from "./chat/Profile";
import { chatListData } from "../contexts/chatList";
import ChatRoomItem from "./chat/ChatRoomItem";
import SignUpPage from "../page/sign/signup";
import { Box } from "@mui/system";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyWord] = useState("");
  const [selectValue, setSelectValue] = useState("ENFP");
  const [data, setData] = useState(chatListData);

  const isLogin = localStorage.getItem("isLogin");

  useEffect(() => {
    if (keyword !== "") {
      setData(chatListData.filter((item) => item.name === keyword));
    } else setData(chatListData);
  }, [keyword]);

  const MBTIList = [
    "ISTP",
    "ISTJ",
    "ISFP",
    "ISFJ",
    "INTP",
    "INFP",
    "INTJ",
    "ENFP",
    "ESFP",
    "ENTP",
  ];

  const logout = () => {
    toast("로그아웃되었습니다.");
  };

  return (
    <>
      {/* <SignIn open={} /> */}
      <SignUpPage open={open} setOpen={setOpen} />

      <SContainer>
        <SBox>
          <SProfile>
            {isLogin && (
              <div className="info-box">
                {/*  <img
                  src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/10/urbanbrush-20221031104718171735.jpg"
                  alt=""
                />
                <div className="profile-text">
                  <p>
                    <span className="bold">기준</span>
                    <span>(19)</span>
                  </p>
                  <p>INTJ</p>
                </div> */}
                <img
                  src="https://item.kakaocdn.net/do/fd0050f12764b403e7863c2c03cd4d2d7154249a3890514a43687a85e6b6cc82"
                  alt=""
                />
                <div className="profile-text">
                  <p>
                    <span className="bold">{localStorage.getItem("name")}</span>
                    <span>(19)</span>
                  </p>
                  <p>ENFP</p>
                </div>
              </div>
            )}

            <span className="logout" onClick={() => setOpen(true)}>
              로그인
            </span>
          </SProfile>
          {isLogin ? (
            <>
              <SSearchBox>
                <Chip
                  label={selectValue}
                  sx={{ color: "white" }}
                  variant="filled"
                  color="primary"
                />
                {/* <Select value={selectValue}>
              {MBTIList.map((item) => (
                <MenuItem onClick={() => setSelectValue(item)}>{item}</MenuItem>
              ))}
            </Select> */}

                <input
                  placeholder="같이 이야기 할 친구를 찾아보세요"
                  value={keyword}
                  onChange={(e) => setKeyWord(e.target.value)}
                />
              </SSearchBox>
              <SList>
                {data.map((item) => (
                  <>
                    <ChatRoomItem chat={item} />
                  </>
                ))}
              </SList>
            </>
          ) : (
            <div
              style={{
                margin: "0 auto",
                width: "100%",
                textAlign: "center",
                paddingTop: "107%",
              }}
            >
              로그인 후 이용해주세요.
            </div>
          )}
        </SBox>
      </SContainer>
    </>
  );
};

export default SideBar;

const SContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
`;

const SBox = styled.div`
  width: 370px;
  max-width: 370px;
  height: 100vh;
  background-color: white;
  box-shadow: 5px 0px 20px rgba(66, 66, 66, 0.15);
  border-radius: 0px 20px 20px 0px;
`;

const SProfile = styled.div`
  padding: 25px;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  background-color: #5200ff;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;

  .info-box {
    display: flex;
    flex-direction: row;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
    }

    .profile-text {
      .bold {
        font-size: 18px;
        font-weight: 600;
      }

      font-size: 14px;
    }
  }

  .logout {
    cursor: pointer;
  }
`;

const SSearchBox = styled.div`
  margin: 15px 25px;
  padding: 5px;
  height: 40px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  border-radius: 20px;
  box-shadow: 0px 0px 2px rgba(175, 175, 175, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  input {
    width: 100%;
    outline: none;
    border: none;
    background-color: #f2f2f2;
  }
`;

const SList = styled.div`
  display: flex;
  flex-direction: column;
`;
