import { styled } from "styled-components";
import { ReactComponent as Logo } from "../../assests/logo.svg";
import { ReactComponent as CloseBtn } from "../../assests/CloseBtn.svg";
import { useNavigate } from "react-router-dom";
import LoginData from "./LoginData";

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
      <LoginData />
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
  height: 90vh;
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

const SignUpBtn = styled.div`
  margin-top: 2rem;
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
