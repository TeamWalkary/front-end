import { Outlet } from "react-router-dom";

export default function Frame() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}
