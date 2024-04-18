import { useCallback, useRef, useState } from 'react';
import { LANGUAGE_VERSIONS } from '../../../IDE/Constants';
import styles from '../../MainPage.module.css';

const languages = Object.entries(LANGUAGE_VERSIONS);
const maxUsers = Array.from({ length: 5 }, (_, i) => i + 1);

const Create = ({ onClickCancel }) => {
  const [form, setForm] = useState({
    isLock: false,
    title: '',
    password: '',
    languageValue: '',
    maxValue: '',
  });

  const titleRef = useRef();
  const languageRef = useRef();
  const maxRef = useRef();
  const pwRef = useRef();

  // 비공개 체크
  const onChangeCheck = useCallback(() => {
    setForm({ ...form, isLock: !form.isLock, password: '' });
  }, [form]);

  const onChangeTitle = useCallback(
    (e) => {
      titleRef.current.style.borderColor = '#d5d5d5';
      setForm({ ...form, title: e.target.value });
    },
    [form],
  );

  const onChangeLanguage = useCallback(
    (e) => {
      languageRef.current.style.borderColor = '#d5d5d5';
      setForm({ ...form, languageValue: e.target.value });
    },
    [form],
  );

  const onChangeMax = useCallback(
    (e) => {
      maxRef.current.style.borderColor = '#d5d5d5';
      setForm({ ...form, maxValue: e.target.value });
    },
    [form],
  );

  const onChangePassword = useCallback(
    (e) => {
      pwRef.current.style.borderColor = '#d5d5d5';
      const value = Number(e.target.value);
      if (isNaN(value)) return;
      setForm({ ...form, password: String(value) });
    },
    [form],
  );

  const onSubmitMake = useCallback(
    (e) => {
      e.preventDefault();

      if (form.title === '') {
        titleRef.current.style.borderColor = '#f00';
        titleRef.current.focus();
        return false;
      }

      if (form.languageValue === '') {
        languageRef.current.style.borderColor = '#f00';
        return false;
      }

      if (form.maxValue === '') {
        maxRef.current.style.borderColor = '#f00';
        return false;
      }

      if (form.isLock && form.password.length !== 4) {
        pwRef.current.style.borderColor = '#f00';
        pwRef.current.focus();
        return false;
      }

      const roomInfo = {
        ...form,
      };

      console.log(roomInfo);
      console.log('make success!!');
    },
    [form],
  );

  return (
    <div className={styles.modalBox}>
      <div className={styles.makeModal}>
        <h3 className={styles.modalTitle}>VIBE IDE 생성</h3>

        <form onSubmit={onSubmitMake}>
          <label className={styles.checkBox}>
            <input type="checkbox" checked={form.isLock} onChange={onChangeCheck} />
            비공개
          </label>

          <input
            type="text"
            className={styles.inputBox}
            ref={titleRef}
            value={form.title}
            onChange={onChangeTitle}
            placeholder="제목"
          />

          <select
            className={styles.inputSelect}
            ref={languageRef}
            value={form.languageValue}
            onChange={onChangeLanguage}
          >
            <option value="">언어 선택</option>
            {languages.map((language, idx) => (
              <option value={language[0]} key={idx}>
                {language[0]}
              </option>
            ))}
          </select>

          <select className={styles.inputSelect} ref={maxRef} value={form.maxValue} onChange={onChangeMax}>
            <option value="">인원 선택</option>
            {maxUsers.map((count, idx) => (
              <option value={count} key={idx}>
                {count}
              </option>
            ))}
          </select>

          {form.isLock && (
            <input
              type="text"
              className={styles.inputBox}
              ref={pwRef}
              value={form.password}
              onChange={onChangePassword}
              maxLength="4"
              placeholder="패스워드 입력 (4글자 숫자만 가능합니다)"
            />
          )}

          <div className={styles.btnBox}>
            <button className={styles.cancel} onClick={() => onClickCancel('make')}>
              취소
            </button>
            <button type="submit" className={styles.confirm}>
              확인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
