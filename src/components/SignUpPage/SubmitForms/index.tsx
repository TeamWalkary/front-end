import { useNavigate } from "react-router-dom";
import useInputValue from "../../../hooks/useInputValue";
import Input from "../../Common/SubmitForm/Input";
import Button from "../../Common/SubmitForm/Button";
import axios from "axios";

export default function SubmitForms() {
  const initInputValue = {
    id: "",
    pw: "",
    checkPassword: "",
    phoneNumberValid: "",
    email: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const idRegExp = /^[a-z]+[a-z0-9]{0,19}$/g;
  const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const phoneRegExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const idValid: boolean = idRegExp.test(inputValue.id);
  const pwValid: boolean = pwRegExp.test(inputValue.pw);
  const checkPw: boolean = inputValue.pw === inputValue.checkPassword;
  const phoneNumberValid: boolean = phoneRegExp.test(inputValue.phoneNumber);
  const emailValid: boolean = emailRegExp.test(inputValue.email);
  const isValid: boolean = idValid && pwValid && checkPw;

  const navigate = useNavigate();

  const postUserData = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/apis/signup`, {
        userId: inputValue.id,
        password: inputValue.pw,
      })
      .then((data) => {
        if (data.status === 200) {
          navigate("/login");
        } else if (data.status === 400) {
          alert("아이디 또는 비밀번호 다시 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Input
        name={"id"}
        type={"text"}
        title={"아이디"}
        validText={"20자 이내로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        title={"비밀번호"}
        validText={
          "소문자, 대문자, 특수문자 중 2개 이상 포함하여 8~16자 이내로 입력해주세요."
        }
        required
        handleInput={handleInput}
        isValid={pwValid}
      />
      <Input
        name={"checkPassword"}
        type={"password"}
        title={"비밀번호 확인"}
        validText={"입력하신 비밀번호와 일치하지 않습니다."}
        required
        handleInput={handleInput}
        isValid={checkPw}
      />
      <Input
        name={"phoneNumber"}
        type={"text"}
        title={"전화번호"}
        validText={"01000000000의 형식으로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={phoneNumberValid}
      />
      <Input
        name={"email"}
        type={"text"}
        title={"이메일"}
        validText={"walkary1@walkary.com 형식으로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={emailValid}
      />
      <Button
        placeholder={"가입 완료하기"}
        isValid={isValid}
        onclick={postUserData}
      />
    </>
  );
}
