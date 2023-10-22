import { styled } from "styled-components";

interface inputDataProps {
  placeholder: string;
  isValid: boolean;
  postUserData: () => void;
}

const Button = (props: inputDataProps) => {
  const { placeholder, isValid, postUserData } = props;

  return (
    <LoginBtn type="submit" onClick={postUserData} $isValid={isValid}>
      {placeholder}
    </LoginBtn>
  );
};

export default Button;

const LoginBtn = styled.button<{ $isValid: boolean }>`
  margin-top: 3.2rem;
  border-radius: 99px;
  background-color: #bab9b9;
  display: flex;
  width: 29.6rem;
  padding: 0.8rem 5.2rem;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  font-size: 1.6rem;
  opacity: ${(props) => (props.$isValid ? 1 : 0.5)};

  &:active {
    background-color: #333;
  }
`;
