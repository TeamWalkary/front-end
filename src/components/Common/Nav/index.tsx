import { S } from "./style";
//
import { ReactComponent as MenuBtn } from "../../../assests/menuBtn.svg";
import { ReactComponent as Calendar } from "../../../assests/Calendar.svg";
import { ReactComponent as Logo } from "../../../assests/newLogo.svg";
import SideNav from "./SideNav/index";
import { useState } from "react";
import Today from "../Today";
import { useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const navigate = useNavigate();

  return (
    <>
      {sideNavOpen && <SideNav setSideNavOpen={setSideNavOpen} />}
      <S.MainHeader>
        <MenuBtn onClick={() => setSideNavOpen(true)} />
        {isMainPage ? (
          <Today />
        ) : (
          <Logo
            width="61"
            height="16"
            onClick={() => {
              navigate("main");
            }}
          />
        )}
        <Calendar />
      </S.MainHeader>
    </>
  );
}
