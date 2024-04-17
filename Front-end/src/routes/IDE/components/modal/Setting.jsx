import { useState } from 'react';
import styles from './Setting.module.css';

const Setting = ({ onClose }) => {
  const [selectedValue, setSelectedValue] = useState('light');
  // const [users, setUsers] = useState([
  //   { name: 'Alexander', role: 'Admin' },
  //   { name: 'Jessica', role: 'Developer' },
  //   { name: 'David', role: 'Designer' },
  // ]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2 className={styles.title}>환경설정</h2>
        <div className={styles.dropdownContainer}>
          <span className={styles.themeTitle}>테마</span>
          <select className={styles.theme} value={selectedValue} onChange={handleChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        {/* <div className={styles.dropdownContainer}>
          <span className={styles.authorizationTitle}>권한</span>
          <div className={styles.userList}>
            <ul>
              {users.map((user) => (
                <li key={user.name}>
                  <span>{user.name}</span>
                  <select className={styles.authorization} value={selectedValue} onChange={handleChange}>
                    <option value="master">master</option>
                    <option value="읽기">읽기</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
        <div className={styles.buttonContainer}>
          <button onClick={onClose} className={styles.closeButton}>
            취소
          </button>
          <button className={styles.changeButton}>변경</button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
