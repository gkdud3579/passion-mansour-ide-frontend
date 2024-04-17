import React, { useCallback, useRef, useState } from 'react';
import ServiceLayout from '../../layouts/ServiceLayout';
import './MainPage.module.css';
import styles from './MainPage.module.css';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { Link, useNavigate } from 'react-router-dom';
import { LANGUAGE_VERSIONS } from '../IDE/Constants';
import { CommentIcon, ExitIcon } from '../../components/Icons';

dayjs.locale('ko');
dayjs.extend(relativeTime);

/* 더미 데이터 */
const posts = [
  {
    id: 0,
    title: '백준 레벨1 문제 1 문제 풀이 합니다.',
    createAt: new Date(),
    private: false, // true : 비공개, false : 공개
    privatePassword: '',
    lagnguage: 'javascript',
    maxUser: 5,
    user: {
      id: new Date(),
      name: '홍길동',
      nickname: '제임슨',
      profile: 'img/default_profile.png',
      createAt: '2024-04-12 10:34:23',
      theme: 'light',
      permission: true,
    },
    users: [
      { id: 1, name: '톰', permission: false },
      { id: 2, name: '코딩캣', permission: false },
    ],
  },
  {
    id: 1,
    title: '열정 만수르 프로젝트 코드리뷰 pw:0411',
    createAt: new Date('2024-04-01'),
    private: true,
    privatePassword: '0411',
    lagnguage: 'java',
    maxUser: 4,
    user: {
      id: new Date(),
      name: '홍길동',
      nickname: '코딩맨',
      profile: 'img/default_profile.png',
      createAt: '2024-04-13 10:34:23',
      theme: 'dark',
    },
    users: [],
  },
];

const languages = Object.entries(LANGUAGE_VERSIONS);
const maxUsers = Array.from({ length: 5 }, (_, i) => i + 1);

export default function MainPage() {
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [privatePassword, setPrivatePassword] = useState('');
  const [privateRoom, setPrivateRoom] = useState({ id: 0, title: '', pw: '' });
  const [checked, setChecked] = useState(false);
  const [languageValue, setLanguageValue] = useState('');
  const [isMakeOpen, setIsMakeOpen] = useState(false);
  const [isPrivateOpen, setIsPrivateOpen] = useState(false);

  const titleRef = useRef();
  const languageRef = useRef();
  const maxRef = useRef();
  const pwRef = useRef();
  const pwConfirm = useRef();

  const navigate = useNavigate();

  const onChangeTitle = useCallback((e) => {
    titleRef.current.style.borderColor = '#d5d5d5';
    setTitle(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setPassword(String(value));
  }, []);

  const onChangePrivatePassword = useCallback((e) => {
    pwConfirm.current.style.borderColor = '#d5d5d5';
    const value = Number(e.target.value);
    if (isNaN(value)) return;
    setPrivatePassword(String(e.target.value));
  }, []);

  const onClickMakeOpen = useCallback(() => {
    setIsMakeOpen(!isMakeOpen);
  }, [isMakeOpen]);

  const onClickCancel = useCallback(
    (state) => {
      if (state === 'make') setIsMakeOpen(!isMakeOpen);
      else if (state === 'private') setIsPrivateOpen(!isPrivateOpen);
    },
    [isMakeOpen, isPrivateOpen],
  );

  const onChangeLanguage = useCallback((e) => {
    languageRef.current.style.borderColor = '#d5d5d5';
    setLanguageValue(e.target.value);
  }, []);

  const onFilter = useCallback(() => {}, []);

  const onChangeCheck = useCallback(() => {
    setPassword('');
    setChecked(!checked);
  }, [checked]);

  const onClickPriviateOpen = useCallback(
    (state, id, title, pw) => {
      setPrivatePassword('');
      setPrivateRoom({ id: 0, title: '', pw: '' });

      if (state) {
        setPrivateRoom({ id, title, pw });
        setIsPrivateOpen(!isPrivateOpen);
      } else {
        navigate(`/ide?id=${id}`);
      }
    },
    [isPrivateOpen, navigate],
  );

  const onSubmitMake = useCallback(
    (e) => {
      e.preventDefault();

      if (title === '') {
        titleRef.current.style.borderColor = '#f00';
        return false;
      }

      if (languageValue === '') {
        languageRef.current.style.borderColor = '#f00';
        return false;
      }

      if (maxRef === '') {
        maxRef.current.style.borderColor = '#f00';
        return false;
      }

      if (checked && languageValue.length > 4) {
        pwRef.current.style.borderColor = '#f00';
        return false;
      }

      const roomInfo = {
        title,
        password,
        language: languageValue,
      };

      console.log(roomInfo);
      console.log('make success!!');
    },
    [title, password, languageValue, checked],
  );

  const onSubmitPrivate = useCallback(
    (e) => {
      e.preventDefault();

      if (privatePassword === '') {
        pwConfirm.current.style.borderColor = '#f00';
        pwConfirm.current.focus();
        return false;
      }

      if (privatePassword !== privateRoom.pw) {
        window.alert('올바르지 않는 패스워드 입니다.');
        pwConfirm.current.focus();
        return false;
      }

      navigate(`/ide?id=${privateRoom.id}&private=${privateRoom.pw}`);
    },
    [privatePassword, privateRoom, navigate],
  );

  return (
    <ServiceLayout>
      <Helmet>
        <title>codeVIBE - 바이브 IDE</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.containerInner}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>바이브 IDE</h2>
            <button className={styles.makeBtn} onClick={onClickMakeOpen}>
              VIBE IDE 생성
            </button>
          </div>

          <nav className={styles.nav}>
            <ul className={styles.navBox}>
              <li>진행중</li>
              <li>종료</li>
            </ul>
          </nav>

          <div className={styles.infoBox}>
            <h4 className={styles.infoMsg}>
              진행중인 IDE <span>{posts.length}개</span>
            </h4>

            <select className={styles.selectBox} onChange={onFilter}>
              <option value="new">최신순</option>
              <option value="hot">인기순</option>
            </select>
          </div>

          {posts.length === 0 ? (
            <div>
              <p>생성도</p>
            </div>
          ) : (
            <>
              <div className={styles.itemWrapper}>
                {posts.map((data) => {
                  return (
                    <div
                      key={data.id}
                      className={styles.itemBox}
                      onClick={() => onClickPriviateOpen(data.private, data.id, data.title, data.privatePassword)}
                    >
                      <div className={styles.itemLeft}>
                        <div className={styles.itemUpperBox}>
                          <span className={`${styles.tag} ${data.private ? 'private' : 'public'}`}>
                            {data.private ? '비공개' : '공개'}
                          </span>
                          <span className={`${styles.tag} ${data.lagnguage}`}>{data.lagnguage}</span>
                        </div>
                        <p className={styles.itemTitle}>{data.title}</p>
                        <div className={styles.itemBottomBox}>
                          <span>{data.user.name}</span>
                          <b className={styles.space}>·</b>
                          <span>
                            {data.users.length + 1}명 / {data.maxUser}명
                          </span>
                          <b className={styles.space}> · </b>
                          <span>{dayjs(data.createAt).fromNow(false)}</span>
                        </div>
                      </div>
                      <div className={styles.itemRight}>
                        <figure className={styles.profileFigure}>
                          <img src={data.user.profile} className={styles.profileImg} alt={data.user.name} />
                        </figure>
                        {data.users.length !== 0 && <span>+{data.users.length}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.pagingBox}>
                <button type="button" className={`${styles.pagingBtn} ${styles.pagingActive}`}>
                  1
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isMakeOpen && (
        <div className={styles.modalBox}>
          <div className={styles.makeModal}>
            <h3 className={styles.modalTitle}>VIBE IDE 생성</h3>

            <form onSubmit={onSubmitMake}>
              <label className={styles.checkBox}>
                <input type="checkbox" checked={checked} onChange={onChangeCheck} />
                비공개
              </label>

              <input
                type="text"
                className={styles.inputBox}
                ref={titleRef}
                value={title}
                onChange={onChangeTitle}
                placeholder="제목"
              />

              <select
                className={styles.inputSelect}
                ref={languageRef}
                value={languageValue}
                onChange={onChangeLanguage}
              >
                <option value="">언어 선택</option>
                {languages.map((language, idx) => (
                  <option value={language[0]} key={idx}>
                    {language[0]}
                  </option>
                ))}
              </select>

              <select className={styles.inputSelect} ref={maxRef}>
                {maxUsers.map((count, idx) => (
                  <option value={count} key={idx}>
                    {count}
                  </option>
                ))}
              </select>

              {checked && (
                <input
                  type="text"
                  className={styles.inputBox}
                  ref={pwRef}
                  value={password}
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
      )}

      {isPrivateOpen && (
        <div className={styles.modalBox}>
          <div className={styles.makeModal}>
            <h3 className={styles.privatTitle}>{privateRoom.title} - 패스워드</h3>

            <form onSubmit={onSubmitPrivate}>
              <input
                type="text"
                className={styles.inputBox}
                ref={pwConfirm}
                value={privatePassword}
                onChange={onChangePrivatePassword}
                maxLength="4"
                placeholder="패스워드 입력 (4글자 숫자만 가능합니다)"
              />

              <div className={styles.btnBox}>
                <button className={styles.cancel} onClick={() => onClickCancel('private')}>
                  취소
                </button>
                <button type="submit" className={styles.confirm}>
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ServiceLayout>
  );
}
