import { S } from "./style";
//
import { ReactComponent as Logo } from "../../assests/newLogo.svg";
import { useNavigate } from "react-router-dom";
import Button from "../Common/SubmitForm/Button";

export default function LandingPage() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/login");
  };

  return (
    <S.Landing>
      <Logo width="185" height="48" />
      <S.LandingMsg>
        발자취 따라 써보는 <br />
        오늘 하루 일기
      </S.LandingMsg>
      <Button placeholder={"시작하기"} isValid={true} onclick={clickHandler} />
    </S.Landing>
  );
}
