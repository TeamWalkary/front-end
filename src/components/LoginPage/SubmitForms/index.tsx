import { useNavigate } from "react-router-dom";
import useInputValue from "../../../hooks/useInputValue";
import Input from "../../Common/SubmitForm/Input";
import Button from "../../Common/SubmitForm/Button";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../../core/atom";

export default function SubmitForms() {
  const initInputValue = {
    id: "",
    pw: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const idRegExp = /^[a-z]+[a-z0-9]{3,19}$/g;
  const pwRegExp = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  const idValid: boolean = idRegExp.test(inputValue.id);
  const pwValid: boolean = pwRegExp.test(inputValue.pw);
  const isValid: boolean = idValid && pwValid;

  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenState);

  const postUserData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/apis/login`,
        {
          userId: inputValue.id,
          password: inputValue.pw,
        }
      );

      if (res.status === 200) {
        // console.log(res.headers.authorization);
        await setToken(res.headers.authorization);
        navigate("/main");
        const token = res.headers.authorization;
        res.cookie("access_token", token, {
          secure: true, // HTTPS에서만 전송
          httpOnly: true, // JavaScript에서 접근 불가
          sameSite: "strict", // 같은 사이트에서만 쿠키 전송
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        alert("아이디 또는 비밀번호 다시 확인해주세요.");
      }
    }
  };

  return (
    <>
      <Input
        name={"id"}
        type={"text"}
        title={"아이디"}
        validText={"아이디를 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        title={"비밀번호"}
        validText={"비밀번호를를 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={pwValid}
      />
      <Button placeholder={"로그인"} isValid={isValid} onclick={postUserData} />
    </>
  );
}
