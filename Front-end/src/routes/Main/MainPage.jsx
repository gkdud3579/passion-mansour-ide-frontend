import React, { useCallback, useEffect, useRef, useState } from 'react';
import ServiceLayout from '../../layouts/ServiceLayout';
import './MainPage.module.css';
import styles from './MainPage.module.css';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import Post from './components/Post';
import Private from './components/modal/Private';
import Create from './components/modal/Create';
import TabMenu from './components/TabMenu';
import axios from 'axios';
import api from '../../api/api';
import { getMyUser, postProjects } from '../../api/serviceApi';

export default function MainPage() {
  const [items, setItems] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isModal, setIsModal] = useState({ isMake: false, isLock: false });
  const [privateRoom, setPrivateRoom] = useState({ id: 0, title: '', pw: '' });

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('ud'));
    const getData = {
      isEnd: tabIndex === 0 ? false : true,
    };

    if (tabIndex === 1) {
      api
        .post('/board', getData)
        .then((res) => {
          console.log('12313113123123121 : ', res);
          setItems(res.data.projects);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .post('/board', getData)
        .then((res) => {
          console.log('12313113123123121 : ', res);
          setItems(res.data.projects);
        })
        .catch((err) => console.log(err));
    }

    setUserId(userInfo.id);
  }, [tabIndex]);

  const onFilter = useCallback(
    (e) => {
      if (e.target.value === 'new') {
        setItems(
          [...items].sort(function (a, b) {
            return new Date(b.createAt) - new Date(a.createAt);
          }),
        );
      } else {
        setItems(
          [...items].sort(function (a, b) {
            return new Date(a.createAt) - new Date(b.createAt);
          }),
        );
      }
    },
    [items],
  );

  const onClickTab = useCallback((type) => {
    if (type === 0) {
      setTabIndex(0);
      // api
    } else {
      setTabIndex(1);
      // api
    }
  }, []);

  const onClickMakeOpen = useCallback(() => {
    setIsModal({ ...isModal, isMake: !isModal.isMake });
  }, [isModal]);

  // 비공개 비밀번호 모달창 열기
  const onClickPriviateOpen = useCallback(
    (state, id, title, pw) => {
      setPrivateRoom({ id: 0, title: '', pw: '' });

      if (state) {
        setPrivateRoom({ id, title, pw });
        setIsModal({ ...isModal, isLock: !isModal.isLock });
      } else {
        navigate(`/ide/${id}`);
      }
    },
    [isModal, navigate],
  );

  const onClickCancel = useCallback(
    (state) => {
      if (state === 'make') setIsModal({ ...isModal, isMake: !isModal.isMake });
      else if (state === 'private') setIsModal({ ...isModal, isLock: !isModal.isLock });
    },
    [isModal],
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

          <TabMenu tabIndex={tabIndex} onClickTab={onClickTab} />

          <div className={styles.infoBox}>
            <h4 className={styles.infoMsg}>
              {tabIndex === 0 ? '진행중인 IDE' : '종료된 IDE'} <span>{items.length}개</span>
            </h4>

            <select className={styles.selectBox} onChange={onFilter}>
              <option value="new">최신순</option>
              <option value="old">오래된순</option>
            </select>
          </div>

          {tabIndex === 0 && (
            <>
              {items.length === 0 ? (
                <div className={styles.notPostBox}>
                  <p className={styles.notPostTitle}>생성된 IDE가 없습니다.</p>
                  <span className={styles.notPostMsg}>
                    우측 상단에 ‘VIBE IDE 생성' 버튼을 클릭하여
                    <br />
                    VIBE IDE를 실행해보세요
                  </span>
                </div>
              ) : (
                <>
                  <div className={styles.itemWrapper}>
                    {items.map((data) => {
                      return (
                        <Post data={data} key={data.id} type={tabIndex} onClickPriviateOpen={onClickPriviateOpen} />
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
            </>
          )}

          {tabIndex === 1 && (
            <>
              {items.length === 0 ? (
                <div className={styles.notPostBox}>
                  <p className={styles.notPostTitle}>종료된 IDE가 없습니다.</p>
                  <span className={styles.notPostMsg}>
                    우측 상단에 ‘VIBE IDE 생성' 버튼을 클릭하여
                    <br />
                    VIBE IDE를 실행해보세요
                  </span>
                </div>
              ) : (
                <>
                  <div className={styles.itemWrapper}>
                    {items.map((data) => {
                      return <Post data={data} key={data.id} type={tabIndex} />;
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {isModal.isMake && <Create userId={userId} onClickCancel={onClickCancel} />}
      {isModal.isLock && <Private privateRoom={privateRoom} onClickCancel={onClickCancel} />}
    </ServiceLayout>
  );
}
