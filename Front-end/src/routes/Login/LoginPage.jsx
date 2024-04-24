import { useCallback, useEffect } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Logo } from '../../components/Icons';
import useInput from '../../hooks/userInput';
import axios from 'axios';

const LoginPage = () => {
  const [userId, userIdChange] = useInput('');
  const [userPw, userPwChange] = useInput('');

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access-token')) {
      navigate('/main');
    }
  }, [navigate]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const baseURL = import.meta.env.VITE_API_BASE_URL;

      console.log(baseURL);

      try {
        // 로그인 요청에 필요한 사용자 정보
        const userInfo = {
          loginId: userId,
          password: userPw,
        };

        // 로그인 요청 보내기
        const res = await axios.post(`${baseURL}/members/login`, userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // 토큰 저장
        localStorage.setItem('access-token', res.data.accessToken);
        localStorage.setItem('ud', res.data.members);

        // 로그인 완료 메시지 출력
        console.log(res.data);
        console.log('로그인 완료');

        // 로그인 성공 후 서비스 페이지로 이동
        navigate('/main');
      } catch (error) {
        // 오류 처리
        console.error('로그인 오류:', error);
        window.alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    },
    [userId, userPw, navigate],
  );

  return (
    <div className={styles.container}>
      <Helmet>
        <title>codeVIBE - 로그인</title>
      </Helmet>

      <div className={styles.logo}>
        <Logo size={264} />
      </div>

      <form onSubmit={onSubmit} className={styles.formDiv}>
        <input
          type="text"
          className={styles.inputBox}
          value={userId}
          onChange={userIdChange}
          placeholder="아이디"
          required
        />
        <input
          type="password"
          className={styles.inputBox}
          value={userPw}
          onChange={userPwChange}
          placeholder="비밀번호"
          required
        />

        <button type="submit" className={styles.buttonBox} disabled={userId === '' || userPw === '' ? true : false}>
          로그인
        </button>
      </form>

      <span className={styles.spanMsg}>
        계정이 없으신가요?{' '}
        <Link to="/signup" className={styles.linkMsg}>
          회원가입
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
