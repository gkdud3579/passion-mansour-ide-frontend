import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { saveFileContent } from '../api';
import styles from './Toolbar.module.css';
import { CommentIcon, ExitIcon, PlayIcon, SaveIcon } from '../../../components/Icons';
import { useCallback } from 'react';
import api from '../../../api/api';

const Toolbar = ({ state, isChatVisible, onChatToggle, projectData, projectId, setOutput, permission }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 history 객체 사용

  const handleExit = async () => {
    if (permission === 'master') {
      try {
        await api.post(`/projects/${projectId}/end`, { isEnd: true });
        navigate('/main');
      } catch (error) {
        console.error('Error ending session:', error);
        alert('Failed to end the session');
      }
    } else {
      navigate('/main');
    }
  };

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

  const { mutate: playContent, isLoading: isPlayingLoading } = useMutation(
    () => {
      return api.post('/execute', {
        language: state.language,
        content: state.content,
      });
    },
    {
      onSuccess: (data) => {
        console.log('Play successful:', data);
        onPlaySuccess(data); // Make sure this function is passed as a prop and defined to handle the successful response
      },
      onError: (error) => {
        console.error('Error playing file:', error);
        alert('Error playing file: ' + error.response.data.stderr);
      },
    },
  );

  const handleSave = useCallback(async () => {
    try {
      const infoData = {
        language: state.language,
        content: state.file.content,
      };

      console.log('infoData : ', infoData);

      const res = await api.patch(`/projects/${projectId}/save`, infoData);

      console.log('save : ', res);
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Error saving file: ' + error.message);
    }
  }, [state, projectId]);

  const handlePlay = async () => {
    try {
      const infoData = {
        language: state.language,
        content: state.file.content,
      };

      console.log('infoData : ', infoData);

      const res = await api.post(`/projects/${projectId}/run`, infoData);
      console.log('ressssssss : ', res.data);
      setOutput(res.data);

      console.log('save : ', res);
    } catch (error) {
      console.error('Error executing code:', error);
      alert('Error executing code: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftButtons}>
        <button onClick={handleExit} className={`${styles.icoBox} ${styles.btnNone}`}>
          <ExitIcon size={20} />
        </button>
        <div className={styles.infoBox}>
          <div className={styles.status}>
            <span className={`${styles.tag} ${projectData.isLock ? 'private' : 'public'}`}>
              {projectData.isLock ? '비공개' : '공개'}
            </span>
            <span className={`${styles.tag} ${projectData.language}`}>{projectData.language}</span>
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
