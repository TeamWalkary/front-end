import { S } from "./style";
//
import { ReactComponent as Logo } from "../../../../assests/newLogo.svg";
import { ReactComponent as CloseBtn } from "../../../../assests/closeBtn.svg";
import { useNavigate } from "react-router-dom";

type sideNavPropsType = {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideNav({ setSideNavOpen }: sideNavPropsType) {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <S.NavBackGround>
      <S.NavArea>
        <S.NavBarHeader>
          <Logo style={{ color: "white" }} width={60} height={16} />
          <CloseBtn color="white" onClick={() => setSideNavOpen(false)} />
        </S.NavBarHeader>
        <S.NavMenu>
          <S.Navitem onClick={() => navigate("/main")}>홈</S.Navitem>
          <S.Navitem onClick={() => window.alert("해당 기능은 준비중입니다.")}>
            핀 모아보기
          </S.Navitem>
          <S.Navitem onClick={() => navigate("/collectDiary")}>
            일기 모아보기
          </S.Navitem>
        </S.NavMenu>
        <S.LogOut onClick={handleLogout}>로그아웃</S.LogOut>
      </S.NavArea>
    </S.NavBackGround>
  );
}
