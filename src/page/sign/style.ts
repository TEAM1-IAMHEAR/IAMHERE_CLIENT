import styled from "@emotion/styled";

interface Props {
  border: boolean;
}

export const SignBox = styled.div`
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 10px;

  img {
    margin-bottom: 20px;
  }

  .input-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }

  & button {
    border: none;
    padding: 8px 20px;
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(90deg, #5391fc 0%, #514cf6 100%);
    border-radius: 5px;
    color: white;
    font-weight: 500;
  }

  & a {
    color: #6a6a6a;
    text-decoration: none;
    font-size: 13px;
    margin-top: 10px;
  }
`;

export const NameInput = styled.input<Props>`
  width: 100%;
  padding: 8px 20px;
  border: ${({ border }) =>
    border ? "1px solid #5391FC" : "1px solid #bdbdbd"};
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.5s;
`;
