import { useMutation } from 'react-query';
import { saveFileContent, playFileContent } from '../api';
import styles from './Toolbar.module.css';
import { CommentIcon, ExitIcon, PlayIcon, SaveIcon } from '../../../components/Icons';

const Toolbar = ({
  state,
  isChatVisible,
  onChatToggle,
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
      // Assume onPlaySuccess function is defined elsewhere or pass it as a prop
      // onPlaySuccess(data);
      alert('Play successful!');
    },
    onError: (error) => {
      console.error('Error playing file:', error);
      alert('Error playing file: ' + error.message);
    },
  });

  const handleSave = async () => {
    try {
      await saveContent({
        projectId: projectData.id,
        language: state.language,
        fileContent: state.fileContent,
      });
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file: ' + error.message);
    }
  };

  const handlePlay = async () => {
    try {
      await playContent({
        projectId: projectData.id,
        language: state.language,
        fileContent: state.fileContent, // Assuming fileContent is correct
      });
    } catch (error) {
      console.error('Error playing file:', error);
      alert('Error playing file: ' + error.message);
    }
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
          </div>
          <span className={styles.title}>{projectData.title}</span>
        </div>
      </div>
      <div className={styles.rightButtons}>
        <button onClick={onChatToggle}
          className={`${styles.icoBox} ${isChatVisible ? styles.btnActive : styles.btnNone}`}>
          <CommentIcon size={20} />
        </button>
        <button onClick={handleSave}
          className={`${styles.icoBox} ${styles.btnNone}`}
          disabled={isSavingLoading}>
          <SaveIcon size={18} />
        </button>
        <button onClick={handlePlay}
          className={`${styles.icoBox} ${styles.btnNone}`}
          disabled={isPlayingLoading}>
          <PlayIcon size={15} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
