import { Text } from '@chakra-ui/react';
import styles from './Output.module.css';
// import { useState } from 'react';

const Output = ({ output }) => {
  // const [output, setOutput] = useState(null);

  return (
    <div className={styles.container}>
      <span className={styles.title}>결과</span>
      <div className={styles.resultContainer}>
        <span className={styles.result}>
          {output.stdout ? (
            <Text>{output.stdout}</Text>
          ) : output.stderr ? (
            <Text>{output.stderr}</Text>
          ) : (
            'Click "▶️" to see the output here'
          )}
        </span>
      </div>
    </div>
  );
};

export default Output;