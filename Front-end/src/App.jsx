import { Route, Routes } from "react-router-dom";
import IDEPage from "./routes/IDE/IDEPage";
import JoinPage from "./routes/Join/JoinPageage";
import LoginPage from "./routes/Login/LoginPage";
import MainPage from "./routes/Main/MainPage";
import MakePage from "./routes/Main/MakePage";
import MyPage from "./routes/Mypage/Mypage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ide" element={<IDEPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/make" element={<MakePage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;


