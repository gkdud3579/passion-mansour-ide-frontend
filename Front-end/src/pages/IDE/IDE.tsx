import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import OutputBar from './components/OutputBar';
import Toolbar from './components/Toolbar';
import './IDE.css'; // IDE 전체 스타일

const IDE: React.FC = () => {
  return (
    <div className="ide-container">
      <Sidebar />
      <main className="ide-main">
        <Toolbar />
        <Editor />
        <OutputBar />
      </main>
    </div>
  );
};

export default IDE;