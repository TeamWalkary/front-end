import { S } from "./style";
//
import { ReactComponent as Logo } from "../../assests/newLogo.svg";
import { ReactComponent as CloseBtn } from "../../assests/CloseBtn.svg";
import { useNavigate } from "react-router-dom";
import SubmitForms from "./SubmitForms";

export default function LoginPage() {
  const navigate = useNavigate();

  const signUpHandler = () => {
    navigate("/signUp");
  };

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <S.LoginArea>
      <Logo width="183" height="48" style={{ marginBottom: "10rem" }} />
      <SubmitForms />
      <S.SignUpBtn onClick={signUpHandler}>회원가입</S.SignUpBtn>
      <S.CloseBtnArea onClick={closeHandler}>
        <CloseBtn />
      </S.CloseBtnArea>
    </S.LoginArea>
  );
}
