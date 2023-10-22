import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import useInputValue from "../../hooks/useInputValue";
import Input from "./Input";

const LoginData = () => {
  const initInputValue = {
    id: "",
    pw: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const idValid: boolean = inputValue.id.length > 0;
  const pwValid: boolean = inputValue.pw.length > 0;
  const isValid: boolean = idValid && pwValid;

  const navigate = useNavigate();

  const postUserData = () => {
    fetch(`${import.meta.env.REACT_APP_IP}/apis/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: inputValue.id,
        pw: inputValue.pw,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message === "Login successful") {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else if (data.message === "잘못된 id 혹은 password 입니다.") {
          alert("아이디 또는 비밀번호 다시 확인해주세요.");
        }
      });
  };

  return (
    <>
      <Input
        name={"id"}
        type={"text"}
        placeholder={"아이디"}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        placeholder={"비밀번호"}
        required
        handleInput={handleInput}
        isValid={pwValid}
      />
      <LoginBtn type="submit" onClick={postUserData} $isValid={isValid}>
        로그인
      </LoginBtn>
    </>
  );
};

export default LoginData;

const LoginBtn = styled.button<{ $isValid: boolean }>`
  margin-top: 5.2rem;
  border-radius: 99px;
  background-color: #bab9b9;
  display: flex;
  width: 29.6rem;
  padding: 0.8rem 5.2rem;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  font-size: 1.6rem;
  opacity: ${(props) => (props.$isValid ? 1 : 0.5)};

  &:active {
    background-color: #333;
  }
`;
