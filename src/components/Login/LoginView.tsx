import React from "react";
import { styled } from "styled-components";
import { ReactComponent as Logo } from "../../assests/logo.svg";
import { ReactComponent as CloseBtn } from "../../assests/CloseBtn.svg";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const navigate = useNavigate();

  const signUpHandler = () => {
    navigate("/signUp");
  };

  const closeHandler = () => {
    navigate("/");
  };
  return (
    <LoginArea>
      <Logo width="183" height="48" />
      <LoginMsg>
        일상에서 만나는 장소에 핀을 꽂아 <br />
        하루를 의미있게 기억하세요.
      </LoginMsg>
      <LoginWrapper>
        <LoginLabel>아이디</LoginLabel>
        <LoginInput type="text" />
      </LoginWrapper>
      <LoginWrapper>
        <LoginLabel>비밀번호</LoginLabel>
        <LoginInput id="password" type="password" />
      </LoginWrapper>
      <LoginBtn type="submit" value="로그인" />
      <SignUpBtn onClick={signUpHandler}>회원가입</SignUpBtn>
      <CloseBtnArea onClick={closeHandler}>
        <CloseBtn />
      </CloseBtnArea>
    </LoginArea>
  );
};

export default LoginView;

const LoginArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  position: relative;
`;

const LoginMsg = styled.div`
  margin: 1.6rem 0 4.8rem 0;

  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: -0.368px;
`;

const LoginWrapper = styled.div`
  & + & {
    margin-top: 3.2rem;
  }
  width: 29.5rem;
`;

const LoginLabel = styled.form`
  color: #333;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.6rem;
  letter-spacing: -0.025rem;
`;

const LoginInput = styled.input`
  border: none;
  width: 100%;
  height: 2.8rem;
  gap: 0.4rem;
  border-bottom: 1px solid #dcdcdc;
`;

const LoginBtn = styled.input`
  margin-top: 5.2rem;
  border-radius: 99px;
  background-color: #dcdcdc;
  display: flex;
  width: 29.6rem;
  padding: 0.8rem 5.2rem;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  font-size: 1.6rem;

  &:active {
    background-color: #333;
  }
`;

const SignUpBtn = styled.div`
  margin-top: 2rem;
  color: #333;
  text-align: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.368px;
`;

const CloseBtnArea = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;
