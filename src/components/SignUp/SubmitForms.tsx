import { useNavigate } from 'react-router-dom';
import useInputValue from '../../hooks/useInputValue';
import Input from '../Common/Input';
import Button from '../Common/Button';
import axios from 'axios';

const SubmitForms = () => {
  const initInputValue = {
    id: '',
    pw: '',
    checkPassword: '',
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const eng = /^[a-zA-Z]*$/;

  const idValid: boolean = eng.test(inputValue.id);
  const pwValid: boolean = inputValue.pw.length > 0;
  const checkPw: boolean = inputValue.pw === inputValue.checkPassword;
  const isValid: boolean = idValid && pwValid && checkPw;

  const navigate = useNavigate();

  const postUserData = () => {
    // `${import.meta.env.REACT_APP_IP}/apis/signUp`
    axios
      .post('https://api.walkary.fun/apis/signup', {
        userId: inputValue.id,
        password: inputValue.pw,
      })
      .then(data => {
        if (data.status === 200) {
          navigate('/login');
        } else if (data.status === 400) {
          alert('아이디 또는 비밀번호 다시 확인해주세요.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Input
        name={'id'}
        type={'text'}
        title={'아이디'}
        placeholder={'아이디'}
        validText={'아이디를 확인해주세요.'}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={'pw'}
        type={'password'}
        title={'비밀번호'}
        placeholder={'비밀번호'}
        validText={'비밀번호를를 확인해주세요.'}
        required
        handleInput={handleInput}
        isValid={true}
      />
      <Input
        name={'checkPassword'}
        type={'password'}
        title={'비밀번호 확인'}
        placeholder={'비밀번호를 한 번 더 입력해주세요.'}
        validText={'입력하신 비밀번호와 일치하지 않습니다.'}
        required
        handleInput={handleInput}
        isValid={checkPw}
      />
      <Button
        placeholder={'가입 완료하기'}
        isValid={isValid}
        postUserData={postUserData}
      />
    </>
  );
};

export default SubmitForms;
