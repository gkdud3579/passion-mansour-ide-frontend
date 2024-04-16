import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Not Found</h2>
      <p className={styles.msg}>해당 페이지는 없는 페이지 입니다.</p>
      <Link to="/main" className={styles.btn}>
        메인으로 이동하기
      </Link>
    </div>
  );
};

export default NotFound;
