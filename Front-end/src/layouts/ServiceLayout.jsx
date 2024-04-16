import { Link } from 'react-router-dom';
import styles from './ServiceLayout.module.css';
import { useCallback } from 'react';
import { Logo } from '../components/Icons';

const userInfo = {
  id: new Date(),
  name: '홍길동',
  nickname: '제임슨',
  pofile: 'img/default_profile.png',
  createAt: '2024-04-12 10:34:23',
  theme: 'light',
};

const ServiceLayout = ({ children }) => {
  const onLogout = useCallback(() => {
    console.log('Logout');
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/main">
            <Logo size={150} />
          </Link>

          <nav className={styles.nav}>
            <Link to="/main">바이브 IDE</Link>
          </nav>

          <div className={styles.utilBox}>
            <Link to="/mypage" className={styles.pofileBox}>
              <figure className={styles.profileFigure}>
                <img className={styles.profileImg} src={userInfo.pofile} alt={userInfo.name} />
              </figure>
              <span className={styles.nickname}>{userInfo.nickname}</span>
            </Link>
            <button onClick={onLogout} className={styles.logoutBtn}>
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {children}
    </>
  );
};

export default ServiceLayout;
