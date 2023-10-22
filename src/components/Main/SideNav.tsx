import styled from "styled-components";
import { ReactComponent as Logo } from "../../assests/logo.svg";
import { ReactComponent as CloseBtn } from "../../assests/closeBtn.svg";

type sideNavPropsType = {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNav = ({ setSideNavOpen }: sideNavPropsType) => {
  return (
    <NavBackGround>
      <NavArea>
        <NavBarHeader>
          <Logo style={{ color: "white" }} width={60} height={16} />
          <CloseBtn color="white" onClick={() => setSideNavOpen(false)} />
        </NavBarHeader>
        <NavMenu>
          <Navitem>홈</Navitem>
          <Navitem>핀 모아보기</Navitem>
          <Navitem>일기 모아보기</Navitem>
        </NavMenu>
        <LogOut>로그아웃</LogOut>
      </NavArea>
    </NavBackGround>
  );
};

export default SideNav;

const NavBackGround = styled.div`
  position: absolute;
  width: 100%;
  background-color: rgba(51, 51, 51, 0.5);
  height: 100%;
  z-index: 990;
`;

const NavArea = styled.div`
  height: 100%;
  width: 50%;
  position: absolute;
  background-color: #fffefc;
  z-index: 999;
`;

const NavBarHeader = styled.div`
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  color: white;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.2rem;
`;

const Navitem = styled.li`
  padding: 1.2rem 2rem;
  font-size: 1.4rem;
  line-height: 2rem;
  &:active {
    font-weight: 800;
  }
`;

const LogOut = styled.div`
  position: absolute;
  bottom: 1.6rem;
  color: #a1a1a1;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 1.2rem 2rem;
`;
