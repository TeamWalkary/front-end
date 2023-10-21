import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import CollectDiary from "./pages/CollectDiary";
import CollectPin from "./pages/CollectPin";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/collectDiary" element={<CollectDiary />} />
        <Route path="/collectPin" element={<CollectPin />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
