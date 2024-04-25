import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { saveFileContent } from '../api';
import styles from './Toolbar.module.css';
import { CommentIcon, ExitIcon, PlayIcon, SaveIcon } from '../../../components/Icons';
import { useCallback } from 'react';
import api from '../../../api/api';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toolbar = ({
  state,
  isChatVisible,
  setIsChatVisible,
  projectData,
  projectId,
  setOutput,
  permission,
  stompClient,
  userData,
}) => {
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

  const handleChatToggle = useCallback(() => {
    setIsChatVisible(!isChatVisible);
    // 채팅 상태에 따라 메시지 타입 결정
    const messageType = !isChatVisible ? 'JOIN' : 'LEAVE';
    const endpoint = messageType === 'JOIN' ? `/app/chat/join/${projectId}` : `/app/chat/leave/${projectId}`;
    const message = {
      userId: userData.id, // 사용자 ID
      type: messageType,
      timestamp: new Date().toISOString(),
    };

    // 메시지 전송
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(endpoint, JSON.stringify(message), {});
    }
  }, [isChatVisible, setIsChatVisible, userData, projectId, stompClient]);

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
    const toastOps = {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    };

    try {
      const infoData = {
        language: state.language,
        content: state.file.content,
      };

      console.log('infoData : ', infoData);

      const res = await api.patch(`/projects/${projectId}/save`, infoData);

      console.log('save : ', res);

      toast.success('저장되었습니다!', toastOps);
    } catch (error) {
      console.error('Error saving file:', error);
      toast.error(`${error.message}`, toastOps);
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
          onClick={handleChatToggle}
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

        <ToastContainer />
      </div>
    </div>
  );
};

export default Toolbar;
