import styles from './TabMenu.module.css';

const TabMenu = ({ tabIndex, setTabIndex }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navBox}>
        <li onClick={() => setTabIndex(0)} className={`${tabIndex === 0 ? styles.tabActive : styles.tabButton}`}>
          진행중
        </li>
        <li onClick={() => setTabIndex(1)} className={`${tabIndex === 1 ? styles.tabActive : styles.tabButton}`}>
          종료
        </li>
      </ul>
    </nav>
  );
};

export default TabMenu;
