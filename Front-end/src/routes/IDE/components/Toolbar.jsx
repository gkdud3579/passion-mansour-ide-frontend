import styles from "./Toolbar.module.css";

const Toolbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button className={styles.exitButton}>나가기</button>
        <div className={styles.status}>
          <span>공개</span>
          <span>JavaScript</span>
          <span>4/5</span>
        </div>
        <span className={styles.title}>
          백준 레벨 1 문제 1 문제 풀이합니다.
        </span>
      </div>
      <div className={styles.rightButtons}>
        <button>채팅</button>
        <button>저장</button>
        <button>재생</button>
        <button>환경설정</button>
      </div>
    </div>
  );
};

export default Toolbar;
