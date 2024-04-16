import React, { useCallback, useState } from 'react';
import ServiceLayout from '../../layouts/ServiceLayout';
import './MainPage.module.css';
import styles from './MainPage.module.css';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { Link } from 'react-router-dom';
import { LANGUAGE_VERSIONS } from '../IDE/Constants';

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
    },
    users: [
      { id: 1, name: '톰' },
      { id: 2, name: '코딩캣' },
    ],
  },
  {
    id: 1,
    title: '열정 만수르 프로젝트 코드리뷰 0411',
    createAt: new Date('2024-04-01'),
    private: true,
    privatePassword: 1234,
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
  const [isMakeOpen, setIsMakeOpen] = useState(false);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onClickMakeOpen = useCallback(() => {
    setIsMakeOpen(!isMakeOpen);
  }, [isMakeOpen]);

  const onClickCancel = useCallback(() => {
    setIsMakeOpen(!isMakeOpen);
  }, [isMakeOpen]);

  const onFilter = useCallback(() => {}, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    console.log('make success!!');
  }, []);

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
              <p>게시글이 없습니다.</p>
            </div>
          ) : (
            <>
              <div className={styles.itemWrapper}>
                {posts.map((data) => {
                  return (
                    <Link to={`/ide?id=${data.id}`} key={data.id} className={styles.itemBox}>
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
                    </Link>
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
            <h3>VIBE IDE 생성</h3>

            <form onSubmit={onSubmit}>
              <input type="checkbox" />

              <input
                type="text"
                className={styles.inputBox}
                value={title}
                onChange={onChangeTitle}
                placeholder="제목"
                required
              />

              <select className={styles.inputSelect}>
                {languages.map((language, idx) => (
                  <option value={language[0]} key={idx}>
                    {language[0]}
                  </option>
                ))}
              </select>

              <select className={styles.inputSelect}>
                {maxUsers.map((count, idx) => (
                  <option value={count} key={idx}>
                    {count}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className={styles.inputBox}
                value={password}
                onChange={onChangePassword}
                maxLength="4"
                placeholder="패스워드 입력 (최대 4글자)"
              />

              <div className={styles.btnBox}>
                <button onClick={onClickCancel}>취소</button>
                <button>확인</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ServiceLayout>
  );
}
