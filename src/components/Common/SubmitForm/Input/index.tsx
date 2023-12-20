import { S } from "./style";

interface inputDataProps {
  name: string;
  title: string;
  type: string;
  required?: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isValid: boolean;
  validText?: string;
}

export default function Input(props: inputDataProps) {
  const {
    name,
    title,
    type,
    required,
    handleInput,
    placeholder,
    isValid,
    validText,
  } = props;
  // const checkPw = title === "비밀번호 확인";

  return (
    <S.LoginWrapper>
      <S.LoginLabel>{title}</S.LoginLabel>
      <S.LoginInput
        id={name}
        type={type}
        name={name}
        required={required}
        onChange={(e) => handleInput(e)}
        autoComplete="off"
        placeholder={placeholder}
      />
      <S.IdInputValid $isValid={isValid}>{validText}</S.IdInputValid>
    </S.LoginWrapper>
  );
}
