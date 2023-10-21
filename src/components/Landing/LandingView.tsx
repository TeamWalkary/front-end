import styled from "styled-components";
import { ReactComponent as Logo } from "../../assests/logo.svg";

const LandingView = () => {
  return (
    <Landing>
      <Logo width="183" height="48" />
      <LandingMsg>
        내가 다녀간 장소로 <br />
        적어보는 오늘 하루의 일기
      </LandingMsg>
      <LandingBtn>시작하기</LandingBtn>
    </Landing>
  );
};

export default LandingView;

const Landing = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const LandingMsg = styled.div`
  margin: 16px 0 28px 0;
  text-align: center;
`;

const LandingBtn = styled.button`
  padding: 8px 52px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 99px;
  background: #333;
  color: white;
`;
