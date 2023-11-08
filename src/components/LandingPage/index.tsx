import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assests/newLogo.svg';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/login');
  };
  return (
    <Landing>
      <Logo width='185' height='48' />
      <LandingMsg>
        발자취 따라 써보는 <br />
        오늘 하루 일기
      </LandingMsg>
      <LandingBtn onClick={clickHandler}>시작하기</LandingBtn>
    </Landing>
  );
};

export default LandingPage;

const Landing = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
`;

const LandingMsg = styled.div`
  margin: 1.6rem 0 4.8rem 0;
  text-align: center;
  font-size: 16px;
`;

const LandingBtn = styled.button`
  padding: 0.8rem 5.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 99px;
  background: #333;
  color: white;
`;
