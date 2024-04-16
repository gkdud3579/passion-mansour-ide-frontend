import React, { useCallback } from 'react';
import ServiceLayout from '../../layouts/ServiceLayout';
import './MainPage.module.css';
import styles from './MainPage.module.css';
import { Helmet } from 'react-helmet';

/* 더미 데이터 */
const posts = [
  {
    id: 0,
    title: '백준 레벨1 문제 1 문제 풀이 합니다.',
    private: false, // true : 비공개, false : 공개
    privatePassword: '',
    lagnguage: 'javascript',
    maxUser: 5,
    user: {
      id: new Date(),
      name: '홍길동',
      nickname: '제임슨',
      profile: 'img/default_profile.jpg',
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
    title: '백준 레벨1 문제 1 문제 풀이 합니다.',
    private: true, // true : 비공개, false : 공개
    privatePassword: 1234,
    lagnguage: 'java',
    user: {
      id: new Date(),
      name: '홍길동',
      nickname: '코딩맨',
      profile: 'img/default_profile.jpg',
      createAt: '2024-04-13 10:34:23',
      theme: 'dark',
    },
    users: [],
  },
];

export default function MainPage() {
  const onFilter = useCallback(() => {}, []);

  return (
    <ServiceLayout>
      <Helmet>
        <title>codeVIBE - 바이브 IDE</title>
      </Helmet>

      <div className={styles.container}>
        <div>
          <h2>바이브 IDE</h2>
          <button>VIBE IDE 생성</button>
        </div>

        <nav>
          <ul>
            <li>진행중</li>
            <li>종료</li>
          </ul>
        </nav>

        <div>
          <h4>
            진행중인 IDE<span>{posts.length}</span>
          </h4>

          <select onChange={onFilter}>
            <option value="">최신순</option>
            <option value="">최신순</option>
          </select>
        </div>

        {posts.map((data) => {
          return (
            <div key={data.id} className={styles.itemBox}>
              <div className={styles.itemLeft}>
                <div>
                  <span>{data.private ? '비공개' : '공개'}</span>
                  <span className={`${styles.tag} ${data.lagnguage}`}>{data.lagnguage}</span>
                </div>
                <p>{data.title}</p>
                <div></div>
              </div>
              <div className={styles.itemRight}>
                <div>
                  <img src={data.user.profile} alt={data.user.name} />
                  {data.users.length !== 0 && <span>+{data.users.length}</span>}
                </div>
              </div>
            </div>
          );
        })}

        <div>
          <button type="button"></button>
        </div>
      </div>
    </ServiceLayout>
  );
}
