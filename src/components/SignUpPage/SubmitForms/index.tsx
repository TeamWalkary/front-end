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
    phoneNumber: "",
    email: "",
    name: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const idRegExp = /^[a-z]+[a-z0-9]{3,19}$/g;
  const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const phoneRegExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const idValid: boolean = idRegExp.test(inputValue.id);
  const pwValid: boolean = pwRegExp.test(inputValue.pw);
  const checkPw: boolean =
    inputValue.pw.length > 0 && inputValue.pw === inputValue.checkPassword;
  const nameValid: boolean = inputValue.name.length >= 2;
  const phoneNumberValid: boolean = phoneRegExp.test(inputValue.phoneNumber);
  const emailValid: boolean = emailRegExp.test(inputValue.email);
  const isValid: boolean =
    idValid &&
    pwValid &&
    checkPw &&
    phoneNumberValid &&
    emailValid &&
    nameValid;

  const navigate = useNavigate();

  const postUserData = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/apis/signup`, {
        userId: inputValue.id,
        password: inputValue.pw,
        username: inputValue.name,
        email: inputValue.email,
        phoneNumber: inputValue.phoneNumber,
      })
      .then((data) => {
        if (data.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.data.message === "이미 존재하는 아이디입니다.") {
          alert("이미 가입된 회원입니다.");
        } else {
          alert(
            "아이디, 비밀번호, 이름, 전화번호, 이메일 모두 조건에 맞게 입력 후 다시 시도해주세요."
          );
        }
        console.log(error);
      });
  };

  return (
    <>
      <Input
        name={"id"}
        type={"text"}
        title={"아이디"}
        validText={"4~20자 이내로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        title={"비밀번호"}
        validText={"대문자,소문자,숫자 포함 8~16자 이내로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={pwValid}
      />
      <Input
        name={"checkPassword"}
        type={"password"}
        title={"비밀번호 확인"}
        validText={"비밀번호를 한 번 더 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={checkPw}
      />
      <Input
        name={"name"}
        type={"text"}
        title={"닉네임"}
        validText={"2~10자 이내로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={nameValid}
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
        width={true}
      />
    </>
  );
}
