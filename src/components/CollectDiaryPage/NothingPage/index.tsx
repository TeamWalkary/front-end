import { S } from "./style";
//
import Button from "../../Common/SubmitForm/Button";
import { useNavigate } from "react-router-dom";

export default function NothingPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <header>
        아직 작성된 일기가 없어요.
        <br />
        오늘 날짜로 일기를 써보세요.
      </header>
      <Button
        onclick={() => navigate("/main")}
        placeholder={"일기쓰기"}
        isValid={true}
      />
    </S.Container>
  );
}
