import { styled } from "styled-components";

interface inputDataProps {
  placeholder: string;
  isValid: boolean;
  onclick?: () => void;
  width?: number;
}

const Button = (props: inputDataProps) => {
  const { placeholder, isValid, onclick, width } = props;

  return (
    <LoginBtn
      type="submit"
      onClick={onclick}
      $isValid={isValid}
      disabled={!isValid}
      $width={width}
    >
      {placeholder}
    </LoginBtn>
  );
};

export default Button;

const LoginBtn = styled.button<{
  $isValid: boolean;
  $width?: number;
}>`
  margin-top: 3.2rem;
  border-radius: 99px;
  background-color: ${(props) => (props.$isValid ? "#333333" : "#DCDCDC")};
  display: flex;
  width: ${(props) => (props.$width ? "16rem" : "29.6rem")};
  padding: 0.8rem 5.2rem;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  font-size: 1.6rem;
`;
