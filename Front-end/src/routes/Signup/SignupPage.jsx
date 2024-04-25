import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Signup.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Logo } from '../../components/Icons';

const SignupPage = () => {
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    id: '',
    password: '',
    passwordConfirm: '',
  });
  const [isState, setIsState] = useState({
    isName: false,
    isNickname: false,
    isId: false,
    isPassword: false,
    isPasswordConfirm: false,
  });
  const [msg, setMsg] = useState({
    name: '',
    nickname: '',
    id: '',
    password: '',
    passwordConfirm: '',
  });

  const nickRef = useRef();
  const idRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('2024-04-24 11시 배포 완료 2');

    if (localStorage.getItem('access-token')) {
      navigate('/main');
    }
  }, [navigate]);

  const onChangeName = useCallback(
    (e) => {
      const value = e.target.value;
      if (value.length < 2 || value.length > 4) {
        setIsState({ ...isState, isName: false });
        setMsg({ ...msg, name: '최소 2자에서 최대 4자 입니다' });
      } else {
        setIsState({ ...isState, isName: true });
        setMsg({ ...msg, name: '' });
      }
      setForm({ ...form, name: value });
    },
    [form, isState, msg],
  );

  const onChangeNickname = useCallback(
    (e) => {
      const value = e.target.value;
      if (value.length < 2 || value.length > 12) {
        setIsState({ ...isState, isNickname: false });
        setMsg({ ...msg, nickname: '최소 2자에서 최대 12자 입니다' });
      } else {
        setIsState({ ...isState, isNickname: false });
        setMsg({ ...msg, nickname: '중복확인 해주세요' });
      }
      setForm({ ...form, nickname: value });
    },
    [form, isState, msg],
  );

  const onChangeId = useCallback(
    (e) => {
      const value = e.target.value;
      const isNumber = /[0-9]/g;
      const isEnglish = /[a-z]/gi;

      if (value.length < 2 || value.length > 12) {
        setIsState({ ...isState, isId: false });
        setMsg({ ...msg, id: '최소 2자에서 최대 12자 입니다' });
      } else if (!isNumber.test(value) || !isEnglish.test(value)) {
        setIsState({ ...isState, isId: false });
        setMsg({ ...msg, id: '영문+숫자 조합으로 입력해주세요' });
      } else {
        setIsState({ ...isState, isId: false });
        setMsg({ ...msg, id: '중복확인 해주세요' });
      }
      setForm({ ...form, id: value });
    },
    [form, isState, msg],
  );

  const onChangePw = useCallback(
    (e) => {
      const value = e.target.value;
      const isRex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,24}$/;
      if (!isRex.test(value)) {
        setIsState({ ...isState, isPassword: false });
        setMsg({ ...msg, password: '숫자+영문자+특수문자 조합으로 6~24자 내에서 사용해야 합니다.' });
      } else if (form.passwordConfirm !== value) {
        setIsState({ ...isState, isPassword: true, isPasswordConfirm: false });
        setMsg({ ...msg, password: '사용가능한 비밀번호 입니다', passwordConfirm: '두 비밀번호가 일치하지 않습니다' });
      } else {
        setIsState({ ...isState, isPassword: true, isPasswordConfirm: true });
        setMsg({ ...msg, password: '사용가능한 비밀번호 입니다', passwordConfirm: '두 비밀번호가 일치합니다' });
      }

      setForm({ ...form, password: value });
    },
    [form, isState, msg],
  );

  const onChangePwConfirm = useCallback(
    (e) => {
      const value = e.target.value;
      if (form.password !== value) {
        setIsState({ ...isState, isPasswordConfirm: false });
        setMsg({ ...msg, passwordConfirm: '두 비밀번호가 일치하지 않습니다' });
      } else {
        setIsState({ ...isState, isPasswordConfirm: true });
        setMsg({ ...msg, passwordConfirm: '두 비밀번호가 일치합니다' });
      }
      setForm({ ...form, passwordConfirm: value });
    },
    [form, isState, msg],
  );

  const onIsNickname = useCallback(() => {
    const value = nickRef.current.value;
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    if (value.length < 2 || value.length > 12) {
      setIsState({ ...isState, isNickname: false });
      setMsg({ ...msg, nickname: '최소 2자에서 최대 12자 입니다' });
    } else {
      axios
        .get(`${baseURL}/members/check-nickname?nickName=${form.nickname}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsState({ ...isState, isNickname: true });
            setMsg({ ...msg, nickname: '사용가능한 닉네임입니다' });
          }
        })
        .catch((err) => {
          setIsState({ ...isState, isNickname: false });
          setMsg({ ...msg, nickname: '사용중인 닉네임입니다' });
          console.log(err);
        });
    }
  }, [form, isState, msg]);

  const onIsId = useCallback(() => {
    const value = idRef.current.value;
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const isNumber = /[0-9]/g;
    const isEnglish = /[a-z]/gi;

    if (value.length < 2 || value.length > 12) {
      setIsState({ ...isState, isId: false });
      setMsg({ ...msg, id: '최소 2자에서 최대 12자 입니다' });
    } else if (!isNumber.test(value) || !isEnglish.test(value)) {
      setIsState({ ...isState, isId: false });
      setMsg({ ...msg, id: '영문+숫자 조합으로 입력해주세요' });
    } else {
      axios
        .get(`${baseURL}/members/check-loginId?loginId=${form.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsState({ ...isState, isId: true });
            setMsg({ ...msg, id: '사용가능한 아이디입니다.' });
          }
        })
        .catch((err) => {
          setIsState({ ...isState, isId: false });
          setMsg({ ...msg, id: '사용중인 아이디입니다' });
          console.log(err);
        });
    }
  }, [form, isState, msg]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const baseURL = import.meta.env.VITE_API_BASE_URL;

      try {
        const userInfo = {
          loginId: form.id,
          password: form.password,
          name: form.name,
          nickName: form.nickname,
        };

        const res = await axios.post(`${baseURL}/members/register`, userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        });

        // 토큰 저장
        localStorage.setItem('access-token', res.data.accessToken);
        localStorage.setItem('ud', res.data.member);

        window.alert('회원가입이 완료되었습니다.');

        navigate('/main');
      } catch (err) {
        window.alert('회원가입에 실패했습니다. 관리자나 운영자에게 문의주세요.');
        console.log(err);
      }
    },
    [form, navigate],
  );

  return (
    <div className={styles.container}>
      <Helmet>
        <title>codeVIBE - 회원가입</title>
      </Helmet>

      <div className={styles.logo}>
        <Logo size={264} />
      </div>

      <form onSubmit={onSubmit} className={styles.formDiv}>
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.inputText}
            value={form.name}
            onChange={onChangeName}
            placeholder="이름"
          />
          {msg.name.length > 0 && (
            <span className={!isState.isName ? styles.errMsg : styles.successMsg}>{msg.name}</span>
          )}
        </div>
        <div className={styles.inputBox}>
          <div className={styles.isChkBox}>
            <input
              type="text"
              className={styles.inputText}
              ref={nickRef}
              value={form.nickname}
              onChange={onChangeNickname}
              placeholder="닉네임"
            />
            <button type="button" className={styles.chkBtn} onClick={onIsNickname}>
              중복확인
            </button>
          </div>
          {msg.nickname.length > 0 && (
            <span className={!isState.isNickname ? styles.errMsg : styles.successMsg}>{msg.nickname}</span>
          )}
        </div>
        <div className={styles.inputBox}>
          <div className={styles.isChkBox}>
            <input
              type="text"
              className={styles.inputText}
              ref={idRef}
              value={form.id}
              onChange={onChangeId}
              placeholder="아이디"
            />
            <button type="button" className={styles.chkBtn} onClick={onIsId}>
              중복확인
            </button>
          </div>
          {msg.id.length > 0 && <span className={!isState.isId ? styles.errMsg : styles.successMsg}>{msg.id}</span>}
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            className={styles.inputText}
            value={form.password}
            onChange={onChangePw}
            placeholder="비밀번호"
          />
          {msg.password.length > 0 && (
            <span className={!isState.isPassword ? styles.errMsg : styles.successMsg}>{msg.password}</span>
          )}
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            className={styles.inputText}
            value={form.passwordConfirm}
            onChange={onChangePwConfirm}
            placeholder="비밀번호 확인"
          />
          {msg.passwordConfirm.length > 0 && (
            <span className={!isState.isPasswordConfirm ? styles.errMsg : styles.successMsg}>
              {msg.passwordConfirm}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={styles.buttonBox}
          disabled={
            !isState.isName || !isState.isNickname || !isState.isId || !isState.isPassword || !isState.isPasswordConfirm
          }
        >
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
