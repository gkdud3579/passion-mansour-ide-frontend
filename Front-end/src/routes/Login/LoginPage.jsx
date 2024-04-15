import React, { useCallback, useState } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';

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
      <h1 className={styles.logo}>로고영역</h1>

      <form onSubmit={onSubmit} className={styles.fromDiv}>
        <input type="text" className={styles.inputBox} value={userId} onChange={userIdChange} placeholder="아이디" />
        <input
          type="password"
          className={styles.inputBox}
          value={userPw}
          onChange={userPwChange}
          placeholder="비밀번호"
        />

        <button type="submit" className={styles.buttonBox}>
          로그인
        </button>
      </form>

      <span className={styles.spanMsg}>
        계정이 없으신가요?{' '}
        <Link to="/join" className={styles.linkMsg}>
          회원가입
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
