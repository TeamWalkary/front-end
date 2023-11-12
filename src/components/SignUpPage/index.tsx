import { S } from "./style";
//
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assests/backArrow.svg";
import SubmitForms from "./SubmitForms";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <S.SignUpArea>
      <S.SignUpTop>
        <S.BtnArea onClick={handleBack}>
          <BackArrow />
        </S.BtnArea>
        회원가입
      </S.SignUpTop>
      <SubmitForms />
    </S.SignUpArea>
  );
};

export default SignUpPage;
