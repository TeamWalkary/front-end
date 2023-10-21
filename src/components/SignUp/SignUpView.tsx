import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assests/backArrow.svg";
import { styled } from "styled-components";

const SignUpView = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };
  return (
    <SignUpArea>
      <SignUpTop>
        <BtnArea onClick={handleBack}>
          <BackArrow />
        </BtnArea>
        회원가입
      </SignUpTop>
      <SignUpWrapper>
        <SignUpLabel>아이디</SignUpLabel>
        <SignUpInput type="text" />
      </SignUpWrapper>
      <SignUpWrapper>
        <SignUpLabel>비밀번호</SignUpLabel>
        <SignUpInput type="password" />
      </SignUpWrapper>
      <SignUpWrapper>
        <SignUpLabel>비밀번호 확인</SignUpLabel>
        <SignUpInput type="password" />
      </SignUpWrapper>
      <SignUpBtn>가입 완료하기</SignUpBtn>
    </SignUpArea>
  );
};

export default SignUpView;

const SignUpArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
  position: relative;
`;

const SignUpTop = styled.div`
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  padding: 1.6rem;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.4rem;
`;

const BtnArea = styled.div`
  position: absolute;
  left: 1.6rem;
`;

const SignUpWrapper = styled.div`
  & + & {
    margin-top: 3.2rem;
  }
  width: 29.5rem;
`;

const SignUpLabel = styled.form`
  color: #333;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.6rem;
  letter-spacing: -0.25px;
`;

const SignUpInput = styled.input`
  border: none;
  width: 100%;
  height: 2.8rem;
  gap: 0.4rem;
  border-bottom: 1px solid #dcdcdc;
  &:focus {
    outline: none;
    border-bottom: 2px solid #333;
  }
`;

const SignUpBtn = styled.button`
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
