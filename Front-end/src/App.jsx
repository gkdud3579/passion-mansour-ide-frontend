import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IDEPage from "./routes/IDE/IDEPage";
import JoinPage from "./routes/Join/JoinPage";
import LoginPage from "./routes/Login/LoginPage";
import MainPage from "./routes/Main/MainPage";
import MakePage from "./routes/Make/MakePage";
import MyPage from "./routes/Mypage/Mypage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ide" element={<IDEPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/make" element={<MakePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;


