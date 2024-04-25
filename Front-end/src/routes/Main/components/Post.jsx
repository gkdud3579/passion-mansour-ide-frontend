import styles from './Posts.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const Post = ({ type, data, onClickPriviateOpen }) => {
  // 종료된 게시글 보여주기
  if (type === 1) {
    return (
      <div key={data.id} className={styles.itemBox} onClick={() => window.alert('준비중입니다')}>
        <div className={styles.itemLeft}>
          <div className={styles.itemUpperBox}>
            <span className={`${styles.tag} ${data.language}`}>{data.language}</span>
          </div>
          <p className={styles.itemTitle}>{data.title}</p>
          <div className={styles.itemBottomBox}>
            <span>{data.host.nickName}</span>
            <b className={styles.space}>·</b>
            <span>{dayjs(data.createDt).fromNow(false)}</span>
          </div>
        </div>
        <div className={styles.itemRight}>
          <figure className={styles.profileFigure}>
            <img src="img/default_profile.png" className={styles.profileImg} alt={data.host.nickName} />
          </figure>
        </div>
      </div>
    );
  }

  // 진행중인 게시글 보여주기
  return (
    <div
      key={data.id}
      className={styles.itemBox}
      onClick={() => onClickPriviateOpen(data.isLock, data.id, data.title, data.pw)}
    >
      <div className={styles.itemLeft}>
        <div className={styles.itemUpperBox}>
          <span className={`${styles.tag} ${data.isLock ? 'private' : 'public'}`}>
            {data.isLock ? '비공개' : '공개'}
          </span>
          <span className={`${styles.tag} ${data.language}`}>{data.language}</span>
        </div>
        <p className={styles.itemTitle}>{data.title}</p>
        <div className={styles.itemBottomBox}>
          <span>{data.host.nickName}</span>
          <b className={styles.space}>·</b>
          <span style={{ display: 'none' }}>{/* {data.users.length + 1}명 / {data.maxUser}명 */}</span>
          <b className={styles.space} style={{ display: 'none' }}>
            {' '}
            ·{' '}
          </b>
          <span>{dayjs(data.createDt).fromNow(false)}</span>
        </div>
      </div>
      <div className={styles.itemRight}>
        <figure className={styles.profileFigure}>
          <img src="img/default_profile.png" className={styles.profileImg} alt={data.host.nickName} />
        </figure>
        {/* {data.users.length !== 0 && <span style={{ display: 'none' }}>+{data.users.length}</span>} */}
      </div>
    </div>
  );
};

export default Post;
