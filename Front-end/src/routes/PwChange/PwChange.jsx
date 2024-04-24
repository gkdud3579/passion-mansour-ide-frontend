import { useCallback, useState } from 'react';
import styles from './PwChange.module.css';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import api from '../../api/api';
import ServiceLayout from '../../layouts/ServiceLayout';

const PwChange = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });
  const [isState, setIsState] = useState({
    isCurrentPassword: false,
    isPassword: false,
    isPasswordConfirm: false,
  });
  const [msg, setMsg] = useState({
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  });

  const navigate = useNavigate();

  const onChangePw = useCallback(
    (e) => {
      const value = e.target.value;
      setForm({ ...form, currentPassword: value });
    },
    [form],
  );

  const onChangeNewPw = useCallback(
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

  const onChangeNewPwConfirm = useCallback(
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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (form.currentPassword.length === 0) {
        window.alert('현재 비밀번호를 입력해주세요.');
      } else if (!isState.isPassword) {
        window.alert('새 비밀번호가 올바른 형식이 아닙니다');
      } else if (!isState.isPasswordConfirm) {
        window.alert('두 비밀번호가 일치하지 않습니다');
      } else {
        try {
          const userInfo = {
            oldPassword: form.currentPassword,
            newPassword: form.password,
          };

          const res = await api.post(`/members/change-password`, userInfo);

          if (res.status === 200) {
            window.alert('비밀번호가 변경되었습니다.');
            navigate('/main');
          }
        } catch (err) {
          window.alert('현재 비밀번호가 맞지 않습니다.');
          console.log(err);
        }
      }
    },
    [form, isState, navigate],
  );

  return (
    <ServiceLayout>
      <Helmet>
        <title>codeVIBE - 마이페이지</title>
      </Helmet>

      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.formDiv}>
          <h3 className={styles.title}>비밀번호 변경</h3>

          <div className={styles.inputBox}>
            <input
              type="password"
              className={styles.inputText}
              value={form.currentPassword}
              onChange={onChangePw}
              placeholder="현재 비밀번호"
            />
            {msg.password.length > 0 && (
              <span className={!isState.isCurrentPassword ? styles.errMsg : styles.successMsg}>
                {msg.currentPassword}
              </span>
            )}
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              className={styles.inputText}
              value={form.password}
              onChange={onChangeNewPw}
              placeholder="새 비밀번호 입력"
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
              onChange={onChangeNewPwConfirm}
              placeholder="새 비밀번호 확인"
            />
            {msg.passwordConfirm.length > 0 && (
              <span className={!isState.isPasswordConfirm ? styles.errMsg : styles.successMsg}>
                {msg.passwordConfirm}
              </span>
            )}
          </div>

          <div className={styles.btnBox}>
            <button type="button" className={styles.cancel} onClick={() => navigate(-1)}>
              취소
            </button>
            <button type="submit" className={styles.confirm}>
              변경
            </button>
          </div>
        </form>
      </div>
    </ServiceLayout>
  );
};

export default PwChange;
