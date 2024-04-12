import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./pages/Borad/Board";
import IDE from "./pages/IDE/IDE";
import Join from "./pages/Join/Join";
import Login from "./pages/Login/Login";
import Make from "./pages/Make/Make";
import User from "./pages/User/User";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/ide" element={<IDE />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/make" element={<Make />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;