import "./Toolbar.css";
const Toolbar = () => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-leftButtons">
        <button className="exit-button">나가기</button>
        <div className="toolbar-status">
        <span>공개</span>
        <span>JavaScript</span>
        <span>React</span>
        <span>4/5</span>
        </div>
        <span className="toolbar-title">백준 레벨 1 문제 1 문제 풀이합니다.</span>
      </div>
      <div className="toolbar-rightButtons">
        <button>채팅</button>
        <button>저장</button>
        <button>재생</button>
        <button>환경설정</button>
      </div>
    </div>
  );
};

export default Toolbar;
