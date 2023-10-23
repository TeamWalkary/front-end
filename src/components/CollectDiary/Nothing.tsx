import styled from "styled-components";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

const Nothing = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>일기 모아보기</Title>
      <div>
        <header>
          아직 작성된 일기가 없어요.
          <br />
          오늘 날짜로 일기를 써보세요.
        </header>
        <Button
          onclick={() => navigate("/main")}
          placeholder={"일기쓰기"}
          isValid={true}
          width={16}
        />
      </div>
    </Container>
  );
};

export default Nothing;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333333;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 23.6rem;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 23.6rem;
    header {
      color: #a1a1a1;
      text-align: center;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;
