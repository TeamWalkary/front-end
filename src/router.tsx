import { BrowserRouter, Routes, Route } from "react-router-dom";
//
import Frame from "./components/Common/Frame/index";
import LandingPage from "./components/LandingPage";
import NotFoundPage from "./components/Common/NotFoundPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import MainPage from "./components/MainPage";
import DiaryPage from "./components/DiaryPage";
import CollectDiaryPage from "./components/CollectDiaryPage";
import CollectPinPage from "./components/CollectPinPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Frame />}>
          <Route path='' element={<LandingPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signUp' element={<SignUpPage />} />
          <Route path='main' element={<MainPage />} />
          <Route path='main/:day' element={<MainPage />} />
          <Route path='diary' element={<DiaryPage />} />
          <Route path='collectDiary' element={<CollectDiaryPage />} />
          <Route path='collectPin' element={<CollectPinPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
