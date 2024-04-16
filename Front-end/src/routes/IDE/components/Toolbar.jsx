import { useState } from 'react';
import styles from './Toolbar.module.css';
import Setting from './modal/Setting';

const Toolbar = ({ onChatToggle }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button className={styles.exitButton}>나가기</button>
        <div className={styles.status}>
          <span>공개</span>
          <span>JavaScript</span>
          <span>4/5</span>
        </div>
        <span className={styles.title}>백준 레벨 1 문제 1 문제 풀이합니다.</span>
      </div>
      <div className={styles.rightButtons}>
        <button onClick={onChatToggle}>채팅</button>
        <button>저장</button>
        <button>재생</button>
        <button onClick={toggleSettings}>환경설정</button>
        {isSettingsOpen && <Setting onClose={toggleSettings} />}
      </div>
    </div>
  );
};

export default Toolbar;
