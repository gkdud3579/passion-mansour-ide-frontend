import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Editor from './components/codeEditor/Editor';
import Toolbar from './components/Toolbar';
import Output from './components/codeEditor/Output';
import Chatting from './components/modal/Chatting';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './IDEPage.module.css';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { useParams } from 'react-router-dom';
import api from '../../api/api';

const IDEPage = () => {
  const queryClient = new QueryClient();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [output, setOutput] = useState({});
  const [projectData, setProjectData] = useState({});
  const { id: projectId } = useParams();
  const [permission, setPermission] = useState('');
  const [users, setUsers] = useState([
    { id: 'user1', role: 'master' },
    { id: 'user2', role: 'normal' },
  ]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const stompClient = useRef(null);
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
  console.log('2024-04-25 11:30');
  console.log(projectData);

  // project 정보
  // 현재 활성 사용자 변경 (예시로 토글 방식 구현)
  // const toggleUser = () => {
  //   setCurrentUserIndex((currentIndex) => (currentIndex + 1) % users.length);
  // };

  useEffect(() => {
    console.log('2024-04-25 11:30');

    const userInfo = JSON.parse(localStorage.getItem('ud'));
    console.log('userInfo : ', userInfo);

    const connectWebSocket = () => {
      const socket = new SockJS(websocketUrl);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, onConnected, onError);
    };

    const onConnected = (frame) => {
      console.log('Connected: ' + frame);
      stompClient.current.subscribe('/topic/code/1', onMessageReceived);
    };

    const onMessageReceived = (message) => {
      const messageData = JSON.parse(message.body);
      if (messageData.type === 'UPDATE_CODE' && users[currentUserIndex].role !== 'master') {
        setState((prevState) => ({
          ...prevState,
          fileContent: messageData.fileContent,
          file: {
            name: prevState.file.name,
            content: messageData.fileContent,
          },
        }));
      }
    };

    const onError = (error) => {
      console.error('Connection error: ', error);
      setTimeout(connectWebSocket, 5000); // Try to reconnect every 5 seconds
    };

    api
      .get(`/projects/${projectId}/get`)
      .then((res) => {
        console.log('rrrr : ', res);

        setProjectData(res.data);

        console.log('===================================');
        console.log('serverData : ', res);
        console.log('server-id : ', res.data.host.id);
        console.log('local-id : ', userInfo.id);
        if (res.data.host.id === userInfo.id) {
          setPermission('master');
          console.log('master');
        } else {
          setPermission('normal');
          console.log('normal');
        }
      })
      .catch((err) => console.log('eeeeee : ', err));

    connectWebSocket();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
        console.log('Disconnected!');
      }
    };
  }, [users, currentUserIndex]);

  const handlePlaySuccess = (data) => {
    setOutput(data.stdout || data.stderr || data.exception);
  };

  const [isRunning, setIsRunning] = useState(false);
  const [state, setState] = useState({
    language: 'javascript',
    fileContent: '',
    file: {
      name: 'NewFile.js',
      content: '',
    },
  });

  const runCode = async () => {
    setIsRunning(true);
    try {
      const result = await playFileContent(state.language, state.content);
      setOutput(result.output);
    } catch (error) {
      console.error('Error executing code: ', error);
    }
    setIsRunning(false);
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className={styles.page}>
          <Toolbar
            state={state}
            isChatVisible={isChatVisible}
            onChatToggle={toggleChat}
            onPlaySuccess={handlePlaySuccess}
            projectData={projectData}
            projectId={projectId}
            setOutput={setOutput}
          />
          <div className={styles.main}>
            <Editor
              state={state}
              setState={setState}
              isMaster={users[currentUserIndex].role === 'master'}
              stompClient={stompClient} // Ensure this prop is being passed correctly
            />

            <Output output={output} />
            {isChatVisible && <Chatting />}
          </div>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default IDEPage;
