import { ReactComponent as MenuBtn } from '../../../assests/menuBtn.svg';
import { ReactComponent as Calendar } from '../../../assests/Calendar.svg';
import { ReactComponent as Logo } from '../../../assests/newLogo.svg';
import SideNav from './SideNav/index';
import { useState } from 'react';

export default function Nav() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  return (
    {sideNavOpen && <SideNav setSideNavOpen={setSideNavOpen} />}
      <MainHeader>
        <MenuBtn onClick={() => setSideNavOpen(true)} />
        <Logo width='61' height='16' />
        <Calendar />
      </MainHeader>
  )
}
