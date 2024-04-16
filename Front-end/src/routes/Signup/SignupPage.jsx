import { useCallback, useState } from 'react';
import styles from './Signup.module.css';
import { Link } from 'react-router-dom';
import useInput from '../../hooks/userInput';
import { Helmet } from 'react-helmet';
import { Logo } from '../../components/Icons';

const SignupPage = () => {
  const [name, onChangeName] = useInput('');
  const [nickname, onChnageNickname] = useInput('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [pwConfirm, setPwConfirm] = useState(false);

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePw = useCallback(
    (e) => {
      setPassword(e.target.value);
      setPwConfirm(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const userPwChkChange = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPwConfirm(e.target.value !== password);
    },
    [password],
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
      <Helmet>
        <title>codeVIBE - 회원가입</title>
      </Helmet>

      <div className={styles.logo}>
        <Logo size={264} />
      </div>

      <form onSubmit={onSubmit} className={styles.fromDiv}>
        <div>
          <input type="text" className={styles.inputBox} value={name} onChange={onChangeName} placeholder="이름" />
        </div>
        <div>
          <input
            type="text"
            className={styles.inputBox}
            value={nickname}
            onChange={onChnageNickname}
            placeholder="닉네임"
          />
        </div>
        <div>
          <input type="text" className={styles.inputBox} value={id} onChange={onChangeId} placeholder="아이디" />
          {id.length === 0 && <span className={styles.errMsg}>아아디를 입력해주세요</span>}
          {id.length === 0 && <span className={styles.successMsg}>사용가능한 아이디입니다.</span>}
        </div>
        <div>
          <input
            type="password"
            className={styles.inputBox}
            value={password}
            onChange={onChangePw}
            placeholder="비밀번호"
          />
        </div>
        <div>
          <input
            type="password"
            className={styles.inputBox}
            value={passwordCheck}
            onChange={userPwChkChange}
            placeholder="비밀번호 확인"
          />
          {pwConfirm && <span className={styles.errMsg}>두 비밀번호가 일치하지 않습니다.</span>}
        </div>

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

export default SignupPage;
