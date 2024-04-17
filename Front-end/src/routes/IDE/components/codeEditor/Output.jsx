import styles from "./Output.module.css";

const Output = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>결과</span>
      <div className={styles.resultContainer}>
        <span className={styles.result}>11111111111111111111111111111111111111111111111111111111111</span>
      </div>
    </div>
  );
};

export default Output;