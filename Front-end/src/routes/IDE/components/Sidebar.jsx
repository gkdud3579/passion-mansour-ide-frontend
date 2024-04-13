import "./Sidebar.css";

const Sidebar = () => {
  // Sidebar 로직 및 상태 관리 (예: 현재 선택된 파일 표시)

  return (
    <div className="sidebar-container">
      <div className="sidebar-title-container">
        <span className="sidebar-title">Root</span>
        <button>폴더생성</button>
        <button>파일생성</button>
      </div>

      <div className="list-container">
      <ul className="folder-list">
        <li className="folder-item">폴더1</li>
        <li className="folder-item">폴더2</li>
        <li className="folder-item">폴더3</li>
      </ul>
      <ul className="file-list">
        <li className="file-item">파일1.js</li>
        <li className="file-item">파일2.js</li>
        <li className="file-item">파일3.js</li>
      </ul>
      </div>
    </div>
  );
};

export default Sidebar;
