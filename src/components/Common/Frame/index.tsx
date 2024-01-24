import { S } from "./style";
//
import { Outlet, useLocation } from "react-router-dom";
import Nav from "../Nav";

export default function Frame() {
  const location = useLocation();

  const isNavVisible =
    location.pathname.startsWith("/main") ||
    location.pathname === "/collectDiary" ||
    location.pathname === "/collectPin";

  return (
    <S.Container>
      <S.Main>
        {isNavVisible && <Nav />}
        <Outlet />
      </S.Main>
    </S.Container>
  );
}
