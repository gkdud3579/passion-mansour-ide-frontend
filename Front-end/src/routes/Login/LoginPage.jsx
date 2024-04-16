import React, { useCallback, useState } from 'react';
import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const userIdChange = useCallback(
    (e) => {
      setUserId(e.target.value);
    },
    [userId],
  );

  const userPwChange = useCallback(
    (e) => {
      setUserPw(e.target.value);
    },
    [userPw],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const userInfo = {
        id: userId,
        password: userPw,
      };

      console.log(userInfo);
      console.log('로그인 완료');
    },
    [userId, userPw],
  );

  return (
    <div className={styles.container}>
      <Helmet>
        <title>codeVIBE - 로그인</title>
      </Helmet>

      <h1 className={styles.logo}>로고영역</h1>

      <form onSubmit={onSubmit} className={styles.fromDiv}>
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

        <button type="submit" className={styles.buttonBox}>
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
