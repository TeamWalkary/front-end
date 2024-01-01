import { useNavigate } from 'react-router-dom';
import useInputValue from '../../../hooks/useInputValue';
import Input from '../../Common/SubmitForm/Input';
import Button from '../../Common/SubmitForm/Button';
import axios from 'axios';
import { axiosInstance } from '../../../core/api/axios';
import { pinResponseType } from '../../../types/pin';

export default function SubmitForms() {
  const initInputValue = {
    id: '',
    pw: '',
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const idRegExp = /^[a-z]+[a-z0-9]{3,19}$/g;
  const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const idValid: boolean = idRegExp.test(inputValue.id);
  const pwValid: boolean = pwRegExp.test(inputValue.pw);

  const isValid: boolean = idValid && pwValid;

  const navigate = useNavigate();

  const postUserData = () => {
    axiosInstance
      .post(
        '/apis/login',
        {
          userId: inputValue.id,
          password: inputValue.pw,
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.status === 200) {
          navigate('/main');
        }
      })
      .catch(res => {
        console.log(res);
      });
  };

  return (
    <>
      <Input
        name={'id'}
        type={'text'}
        title={'아이디'}
        validText={'아이디를 입력해주세요.'}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={'pw'}
        type={'password'}
        title={'비밀번호'}
        validText={'비밀번호를를 입력해주세요.'}
        required
        handleInput={handleInput}
        isValid={pwValid}
      />
      <Button placeholder={'로그인'} isValid={isValid} onclick={postUserData} />
    </>
  );
}
