import { useCallback, useState } from 'react';
import styles from './join.module.css';
import { Link } from 'react-router-dom';

const JoinPage = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const userNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName],
  );

  const userNickNameChange = useCallback(
    (e) => {
      setNickname(e.target.value);
    },
    [setNickname],
  );

  const userIdChange = useCallback(
    (e) => {
      setId(e.target.value);
    },
    [setId],
  );

  const userPwChange = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  const userPwChkChange = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
    },
    [setPasswordCheck],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const userInfo = {
        name,
        nickname,
        id,
        password,
        passwordCheck,
      };

      console.log(userInfo);
      console.log('회원가입 완료');
    },
    [name, nickname, id, password, passwordCheck],
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>로고영역</h1>

      <form onSubmit={onSubmit} className={styles.fromDiv}>
        <input type="text" className={styles.inputBox} value={name} onChange={userNameChange} placeholder="이름" />
        <input
          type="text"
          className={styles.inputBox}
          value={nickname}
          onChange={userNickNameChange}
          placeholder="닉네임"
        />
        <input type="text" className={styles.inputBox} value={id} onChange={userIdChange} placeholder="아이디" />
        <input
          type="text"
          className={styles.inputBox}
          value={password}
          onChange={userPwChange}
          placeholder="비밀번호"
        />
        <input
          type="text"
          className={styles.inputBox}
          value={passwordCheck}
          onChange={userPwChkChange}
          placeholder="비밀번호 확인"
        />

        <button type="submit" className={styles.buttonBox}>
          회원가입
        </button>
      </form>

      <span className={styles.spanMsg}>
        계정이 있으신가요?
        <Link to="/login" className={styles.linkMsg}>
          로그인
        </Link>
      </span>
    </div>
  );
};

export default JoinPage;
