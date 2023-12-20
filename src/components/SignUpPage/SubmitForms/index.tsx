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
  const checkPw: boolean = inputValue.pw === inputValue.checkPassword;
  const nameValid: boolean = inputValue.name.length > 0;
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
        console.log(data.data.message);
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
        placeholder={"20자 이내로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        title={"비밀번호"}
        placeholder={"영문,숫자,특수문자 포함 8~16자 이내로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={pwValid}
      />
      <Input
        name={"checkPassword"}
        type={"password"}
        title={"비밀번호 확인"}
        placeholder={"비밀번호를 한 번 더 입력해주세요."}
        validText={"입력하신 비밀번호와 일치하지 않습니다."}
        required
        handleInput={handleInput}
        isValid={checkPw}
      />
      <Input
        name={"name"}
        type={"text"}
        title={"이름"}
        placeholder={"이름을 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={nameValid}
      />
      <Input
        name={"phoneNumber"}
        type={"text"}
        title={"전화번호"}
        placeholder={"01000000000의 형식으로 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={phoneNumberValid}
      />
      <Input
        name={"email"}
        type={"text"}
        title={"이메일"}
        placeholder={"walkary1@walkary.com 형식으로 입력해주세요."}
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
