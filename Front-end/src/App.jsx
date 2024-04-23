import { BrowserRouter, Routes, Route, Router, Navigate, useLocation } from 'react-router-dom';
import IDEPage from './routes/IDE/IDEPage';
import SignupPage from './routes/Signup/SignupPage';
import MainPage from './routes/Main/MainPage';
import MyPage from './routes/Mypage/Mypage';
import LoginPage from './routes/Login/LoginPage';
import NotFound from './routes/NotFound/NotFound';
import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateContext from './contexts/privateContext';
import { useEffect, useState } from 'react';
import { ThemeContext } from '@emotion/react';
import PwChange from './routes/PwChange/PwChange';
import TestService from './routes/TestService/TestService';

const queryClient = new QueryClient();

function App() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // dark모드일 경우 스타일링 주기
  useEffect(() => {
    if (localStorage.getItem('theme')) {
      setIsDark(true);
      document.querySelector('html').classList.add('dark');
    } else {
      setIsDark(false);
      document.querySelector('html').classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PrivateContext.Provider value={{ isPrivate, setIsPrivate }}>
            <ThemeContext.Provider value={{ isDark, setIsDark }}>
              <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/pwChange" element={<PwChange />} />
                <Route path="/ide/:id" element={<IDEPage />} />
                <Route path="/test/:id" element={<TestService />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </ThemeContext.Provider>
          </PrivateContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
