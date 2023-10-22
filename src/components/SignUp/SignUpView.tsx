import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assests/backArrow.svg";
import { styled } from "styled-components";
import SubmitForms from "./SubmitForms";

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
      <SubmitForms />
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
