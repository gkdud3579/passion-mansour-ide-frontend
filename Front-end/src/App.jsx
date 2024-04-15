import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IDEPage from './routes/IDE/IDEPage';
import JoinPage from './routes/Join/JoinPage';
import MainPage from './routes/Main/MainPage';
import MyPage from './routes/Mypage/Mypage';
import LoginPage from './routes/Login/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/ide" element={<IDEPage />} />
        </Routes>
      </BrowserRouter>

      {/*
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
