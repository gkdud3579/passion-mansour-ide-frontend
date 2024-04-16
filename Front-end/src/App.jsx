import { BrowserRouter, Routes, Route, Router, Navigate, useLocation } from 'react-router-dom';
import IDEPage from './routes/IDE/IDEPage';
import SignupPage from './routes/Signup/SignupPage';
import MainPage from './routes/Main/MainPage';
import MyPage from './routes/Mypage/Mypage';
import LoginPage from './routes/Login/LoginPage';
import './global.css';
import { useEffect } from 'react';
// import { AuthProvider } from './contexts/AuthContext';
// import PrivateRoute from './utils/PrivateRoute';

function App() {
  // useEffect(() => {
  //   userInfo.theme;
  // }, []);

  // useEffect(() => {
  //   if (userInfo.theme === 'dark') {
  //     document.body.style.backgroundColor = '#27272A';
  //     document.body.style.color = 'white';
  //   } else {
  //     document.body.style.backgroundColor = 'white';
  //     document.body.style.color = '#27272A';
  //   }
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ide" element={<IDEPage />} />
        </Routes>
      </BrowserRouter>

      {/*

      

      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
            <PrivateRoute path="/main" element={<MainPage />} />
            <PrivateRoute path="/mypage" element={<MyPage />} />
            <PrivateRoute path="/ide" element={<IDEPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>

      


      <Switch> 5xx 버전에만 동작
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={LoginPage} />
        <Route path="/join" component={JoinPage} />
        <Route path="/main" component={MainPage} />
        <Route path="/ide" component={IDEPage} />
        <Route path="/mypage" component={MyPage} />
      </Switch>
 
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ide" element={<IDEPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
      */}
    </>
  );
}

export default App;
