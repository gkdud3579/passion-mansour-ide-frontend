import styles from './TabMenu.module.css';

const TabMenu = ({ tabIndex, onClickTab }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navBox}>
        <li onClick={() => onClickTab(0)} className={`${styles.tabButton} ${tabIndex === 0 && styles.tabActive}`}>
          진행중
        </li>
        <li onClick={() => onClickTab(1)} className={`${styles.tabButton} ${tabIndex === 1 && styles.tabActive}`}>
          종료
        </li>
      </ul>
    </nav>
  );
};

export default TabMenu;
