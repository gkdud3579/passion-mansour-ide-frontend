import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Editor from './components/codeEditor/Editor';
import Toolbar from './components/Toolbar';
import Output from './components/codeEditor/Output';
import Chatting from './components/modal/Chatting';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './IDEPage.module.css';
import { executeCode } from './api';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { getPrject } from '../../api/serviceApi';
import { useParams } from 'react-router-dom';
// /ide/2

const IDEPage = () => {
  const queryClient = new QueryClient();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [output, setOutput] = useState('');
  const [projectData, setProjectData] = useState({});
  const { data } = useParams();
  const [users, setUsers] = useState([
    { id: 'user1', role: 'master' },
    { id: 'user2', role: 'normal' },
  ]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const stompClient = useRef(null);
  // project 정보
  // 현재 활성 사용자 변경 (예시로 토글 방식 구현)
  const toggleUser = () => {
    setCurrentUserIndex((currentIndex) => (currentIndex + 1) % users.length);
  };

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS('http://localhost:7382/websocket');
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

    // API 연동 - 24.04.24 12:30 추가 // 일단 실패가 뜨니 오류 뜰 때 더미 데이터 넣어두었습니다
    getPrject(data)
      .then((res) => setProjectData(res.data))
      .catch((err) =>
        setProjectData({
          id: 0,
          title: '백준 레벨1 문제 1 문제 풀이 합니다.',
          isLock: false,
          tagLanguage: 'javascript',
        }),
      );

    connectWebSocket();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
        console.log('Disconnected!');
      }
    };
  }, [users, currentUserIndex]);

  const handlePlaySuccess = (data) => {
    if (data.stdout) {
      setOutput(data.stdout);
    } else if (data.stderr) {
      setOutput(data.stderr);
    } else if (data.exception) {
      setOutput(data.exception);
    }
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
      const result = await executeCode(state.language, state.fileContent);
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
            projectId="your-project-id"
            projectData={projectData}
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
