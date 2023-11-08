import { styled } from 'styled-components';
import { ReactComponent as Logo } from '../../assests/newLogo.svg';
import { ReactComponent as CloseBtn } from '../../assests/CloseBtn.svg';
import { useNavigate } from 'react-router-dom';
import SubmitForms from './SubmitForms';

const LoginPage = () => {
  const navigate = useNavigate();

  const signUpHandler = () => {
    navigate('/signUp');
  };

  const closeHandler = () => {
    navigate('/');
  };

  return (
    <LoginArea>
      <Logo width='183' height='48' style={{ marginBottom: '10rem' }} />
      <SubmitForms />
      <SignUpBtn onClick={signUpHandler}>회원가입</SignUpBtn>
      <CloseBtnArea onClick={closeHandler}>
        <CloseBtn />
      </CloseBtnArea>
    </LoginArea>
  );
};

export default LoginPage;

const LoginArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
  position: relative;
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
