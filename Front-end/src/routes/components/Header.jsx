import { Link } from 'react-router-dom';
import styles from './header.module.css';

const userInfo = {
  id: new Date(),
  name: '홍길동',
  nickname: '제임슨',
  pofile: './abc.jpg',
  createAt: '2024-04-12 10:34:23',
};

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link to="/main">
          <h1 className={styles.logo}>Logo</h1>
        </Link>

        <nav className={styles.nav}>
          <Link to="/main">바이브 IDE</Link>
        </nav>

        <Link to="/mypage">{userInfo.nickname}</Link>
      </div>
    </header>
  );
};

export default Header;
