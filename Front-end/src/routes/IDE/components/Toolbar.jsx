import { useState } from 'react';
import styles from './Toolbar.module.css';
import Setting from './modal/Setting';
import { CommentIcon, ExitIcon, PlayIcon, SaveIcon, SettingIcon } from '../../../components/Icons';

const Toolbar = ({ onChatToggle, onRunCode, isRunning }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button className={styles.exitButton}>
          <ExitIcon size={20} />
        </button>
        <div className={styles.status}>
          <span>공개</span>
          <span>JavaScript</span>
          <span>4/5</span>
        </div>
        <span className={styles.title}>백준 레벨 1 문제 1 문제 풀이합니다.</span>
      </div>
      <div className={styles.rightButtons}>
        <button onClick={onChatToggle}>
          <CommentIcon size={20} />
        </button>
        <button>
          <SaveIcon size={20} />
        </button>
        <button disabled={isRunning} onClick={onRunCode}>
          <PlayIcon size={20} />
        </button>
        <button onClick={toggleSettings}>
          <SettingIcon size={20} />
        </button>
        {isSettingsOpen && <Setting onClose={toggleSettings} />}
      </div>
    </div>
  );
};

export default Toolbar;
