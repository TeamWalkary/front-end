import { styled } from "styled-components";

interface inputDataProps {
  name: string;
  title: string;
  type: string;
  placeholder: string;
  required?: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  validText: string;
}

const Input = (props: inputDataProps) => {
  const {
    name,
    title,
    type,
    placeholder,
    required,
    handleInput,
    isValid,
    validText,
  } = props;
  // const checkPw = title === "비밀번호 확인";

  return (
    <LoginWrapper>
      <LoginLabel>{title}</LoginLabel>
      <LoginInput
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => handleInput(e)}
      />
      <IdInputValid $isValid={isValid}>
        {/* {checkPw
          ? "입력하신 비밀번호와 일치하지 않습니다."
          : `${title}를 입력해주세요.`} */}
        {validText}
      </IdInputValid>
    </LoginWrapper>
  );
};

export default Input;

const LoginWrapper = styled.div`
  & + & {
    margin-top: 1.2rem;
  }
  width: 29.5rem;
`;

const IdInputValid = styled.p<{ $isValid: boolean }>`
  color: #ff0000;
  font-size: 1.2rem;
  visibility: ${(props) => (props.$isValid ? "hidden" : "visible")};
`;

const LoginLabel = styled.form`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.6rem;
  letter-spacing: -0.025rem;
`;

const LoginInput = styled.input`
  border: none;
  width: 100%;
  height: 2.8rem;
  gap: 0.4rem;
  border-bottom: 1px solid #dcdcdc;
  &:focus {
    outline: none;
    border-bottom: 2px solid #333;
  }
`;
