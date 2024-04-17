import ServiceLayout from '../../layouts/ServiceLayout';
import styles from './Mypage.module.css';
import { Helmet } from 'react-helmet';

export default function Mypage() {
  return (
    <ServiceLayout>
      <Helmet>
        <title>codeVIBE - 마이페이지</title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <img src="img/sample.png" alt="profile" className={styles.profileImage} />
          <div className={styles.profileDetails}>
            <h2>홍길동</h2>
            <button>프로필 변경</button>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h4 className={styles.infoTitle}>개인정보 설정</h4>
          <input type="text" placeholder="이름" className={styles.inputField} />
          <input type="text" placeholder="닉네임" className={styles.inputField} />
          <input type="text" placeholder="비밀번호" className={styles.inputField} />
          <input type="text" placeholder="비밀번호 확인" className={styles.inputField} />
        </div>

        <div className={styles.settingsSection}>
          <h4 className={styles.settingsTitle}>기본 설정</h4>
          <select className={styles.dropdown}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className={styles.buttonContainer}>
          <button type="button" className={styles.cancelButton}>
            취소
          </button>
          <button type="button" className={styles.saveButton}>
            저장
          </button>
        </div>
      </div>
    </ServiceLayout>
  );
}
