import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import MainPage from './components/MainPage';
import DiaryPage from './components/DiaryPage';
import CollectDiaryPage from './components/CollectDiaryPage';
import CollectPinPage from './components/CollectPinPage';
import NotFoundPage from './components/Common/NotFoundPage';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/diary' element={<DiaryPage />} />
          <Route path='/collectDiary' element={<CollectDiaryPage />} />
          <Route path='/collectPin' element={<CollectPinPage />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}
