import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../assests/newLogo.svg';
import { ReactComponent as CloseBtn } from '../../../assests/closeBtn.svg';
import { useNavigate } from 'react-router-dom';

type sideNavPropsType = {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideNav = ({ setSideNavOpen }: sideNavPropsType) => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <NavBackGround>
      <NavArea>
        <NavBarHeader>
          <Logo style={{ color: 'white' }} width={60} height={16} />
          <CloseBtn color='white' onClick={() => setSideNavOpen(false)} />
        </NavBarHeader>
        <NavMenu>
          <Navitem onClick={() => navigate('/main')}>홈</Navitem>
          <Navitem onClick={() => window.alert('해당 기능은 준비중입니다.')}>
            핀 모아보기
          </Navitem>
          <Navitem onClick={() => navigate('/collectDiary')}>
            일기 모아보기
          </Navitem>
        </NavMenu>
        <LogOut onClick={handleLogout}>로그아웃</LogOut>
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
  cursor: pointer;
  &:active {
    font-weight: 800;
  }
`;

const LogOut = styled.div`
  position: absolute;
  bottom: 1.6rem;
  color: #333333;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 1.2rem 2rem;
`;
