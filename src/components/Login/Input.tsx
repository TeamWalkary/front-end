import { styled } from "styled-components";

interface inputDataProps {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const Input = (props: inputDataProps) => {
  const { name, type, placeholder, required, handleInput, isValid } = props;

  return (
    <LoginWrapper>
      <LoginLabel>{placeholder}</LoginLabel>
      <LoginInput
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => handleInput(e)}
      />
      <IdInputValid $isValid={isValid}>
        {placeholder}를 입력해주세요.
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
  opacity: ${(props) => (props.$isValid ? 0 : 1)};
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
  &:active {
    border-bottom: 1px solid #333;
  }
`;
