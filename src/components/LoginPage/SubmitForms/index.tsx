import { useNavigate } from "react-router-dom";
import useInputValue from "../../../hooks/useInputValue";
import Input from "../../Common/SubmitForm/Input";
import Button from "../../Common/SubmitForm/Button";
import axios from "axios";

export default function SubmitForms() {
  const initInputValue = {
    id: "",
    pw: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const eng = /^[a-zA-Z]*$/;
  const idValid: boolean = eng.test(inputValue.id);
  // const pwValid: boolean = inputValue.pw.length > 0;
  const isValid: boolean = !!inputValue.id && !!inputValue.pw;

  const navigate = useNavigate();

  const postUserData = () => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/apis/login`, {
        userId: inputValue.id,
        password: inputValue.pw,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/main");
        } else if (res.status === 400) {
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
        validText={"아이디를 확인해주세요."}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        title={"비밀번호"}
        validText={"비밀번호를를 확인해주세요."}
        required
        handleInput={handleInput}
        isValid={true}
      />
      <Button placeholder={"로그인"} isValid={isValid} onclick={postUserData} />
    </>
  );
}
