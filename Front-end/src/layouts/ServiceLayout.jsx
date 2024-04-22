import { Link, useNavigate } from 'react-router-dom';
import styles from './ServiceLayout.module.css';
import { useCallback, useEffect, useState } from 'react';
import { Logo } from '../components/Icons';
import axios from 'axios';
import api from '../api/api';
import { getUser } from '../api/serviceApi';

export const userInfo = {
  id: new Date(),
  name: '홍길동',
  nickname: '제임슨',
  profile: 'img/default_profile.png',
  createAt: '2024-04-12 10:34:23',
  theme: 'light',
};

// msw - 다음 프로젝트 때 사용해보는걸로
// api 폴더 만들어서 axios 인터셉터 설정 ( base_url )

const ServiceLayout = ({ children }) => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setUserData(userInfo);
  }, []);

  const onLogout = useCallback(() => {
    // 클라이언트 측 로그아웃 처리
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('access-token');

    // 서버로 로그아웃 요청을 보낼 수도 있지만, 보안상의 이유로 클라이언트에서만 처리할 수도 있습니다.
    navigate('/login');
  }, [navigate]);

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
                <img className={styles.profileImg} src={userData.profile} alt={userData.name} />
              </figure>
              <span className={styles.nickname}>{userData.nickname}</span>
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
