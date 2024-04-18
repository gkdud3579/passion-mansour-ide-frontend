import { useMutation } from 'react-query';
import { saveFileContent } from '../api';
import styles from './Toolbar.module.css';
import { CommentIcon, ExitIcon, PlayIcon, SaveIcon } from '../../../components/Icons';

const Toolbar = ({ state, onChatToggle, onRunCode, isRunning, editorRef, projectId, language }) => {
  const {
    mutate: saveContent,
    isLoading,
    isError,
    error,
  } = useMutation(saveFileContent, {
    onSuccess: (data) => {
      console.log('Save successful:', data);
      alert('Save successful!');
    },
    onError: (error) => {
      console.error('Error saving file:', error);
      alert('Error saving file: ' + error.message);
    },
  });

  const handleSave = () => {
    // const fileContent = editorRef.current.getValue();
    // console.log('Sending data to server:', { projectId, language, fileContent }); 
    // saveContent({ projectId, language, fileContent });
    console.log(state);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button className={styles.exitButton}>
          <ExitIcon size={20} />
        </button>
        <div className={styles.status}>
          <span>공개</span>
          <span>JavaScript</span>
          <span>4/5</span>
        </div>
        <span className={styles.title}>백준 레벨 1 문제 1 문제 풀이합니다.</span>
      </div>
      <div className={styles.rightButtons}>
        <button onClick={onChatToggle}>
          <CommentIcon size={20} />
        </button>
        <button onClick={handleSave} disabled={isLoading}>
          <SaveIcon size={20} />
        </button>
        <button>
          <PlayIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
