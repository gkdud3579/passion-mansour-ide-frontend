import styles from './Posts.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const Post = ({ data, onClickPriviateOpen }) => {
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
};

export default Post;
