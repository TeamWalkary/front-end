import { S } from "./style";

interface inputDataProps {
  placeholder: string;
  isValid: boolean;
  onclick?: () => void;
  width?: number;
}

export default function Button(props: inputDataProps) {
  const { placeholder, isValid, onclick, width } = props;

  return (
    <S.LoginBtn
      type="submit"
      onClick={onclick}
      $isValid={isValid}
      disabled={!isValid}
      $width={width}
    >
      {placeholder}
    </S.LoginBtn>
  );
}
