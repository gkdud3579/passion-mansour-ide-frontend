import { useMutation } from 'react-query';
import { playFileContent, saveFileContent } from '../api';
import styles from './Toolbar.module.css';
import { CommentIcon, ExitIcon, PlayIcon, SaveIcon } from '../../../components/Icons';

const Toolbar = ({
  onPlaySuccess,
  state,
  isChatVisible,
  onChatToggle,
  projectId,
  language,
  fileContent,
  file,
  projectData,
}) => {
  const { mutate: saveContent, isLoading: isSavingLoading } = useMutation(saveFileContent, {
    onSuccess: (data) => {
      console.log('Save successful:', data);
      alert('Save successful!');
    },
    onError: (error) => {
      console.error('Error saving file:', error);
      alert('Error saving file: ' + error.message);
    },
  });

  const { mutate: playContent, isLoading: isPlayingLoading } = useMutation(playFileContent, {
    onSuccess: (data) => {
      console.log('Play successful:', data);
      onPlaySuccess(data);
      alert('Play successful!');
    },
    onError: (error) => {
      console.error('Error playing file:', error);
      alert('Error playing file: ' + error.message);
    },
  });
  

  const handleSave = async () => {
    try {
      const savedData = await saveFileContent({
        projectId: projectData.id, // 현재 프로젝트의 ID
        language: state.language,
        fileContent: state.fileContent,
      });
      console.log('File saved successfully:', savedData);
      alert('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file: ' + error.message);
    }
  };
  

  const handlePlay = async () => {
    setIsRunning(true);
    try {
      const result = await executeCode(state.language, state.fileContent);
      setOutput(result.output);
    } catch (error) {
      console.error('Error executing code: ', error);
    }
    setIsRunning(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button className={`${styles.icoBox} ${styles.btnNone}`}>
          <ExitIcon size={20} />
        </button>
        <div className={styles.infoBox}>
          <div className={styles.status}>
            <span className={`${styles.tag} ${projectData.isLock ? 'private' : 'public'}`}>
              {projectData.isLock ? '비공개' : '공개'}
            </span>
            <span className={`${styles.tag} ${projectData.tagLanguage}`}>{projectData.tagLanguage}</span>
            <span style={{ display: 'none' }}>4/5</span>
          </div>
          <span className={styles.title}>{projectData.title}</span>
        </div>
      </div>
      <div className={styles.rightButtons}>
        <button
          onClick={onChatToggle}
          className={`${styles.icoBox} ${isChatVisible ? styles.btnActive : styles.btnNone}`}
        >
          <CommentIcon size={20} />
        </button>
        <button onClick={handleSave} className={`${styles.icoBox} ${styles.btnNone}`} disabled={isSavingLoading}>
          <SaveIcon size={18} />
        </button>
        <button onClick={handlePlay} className={`${styles.icoBox} ${styles.btnNone}`} disabled={isPlayingLoading}>
          <PlayIcon size={15} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
