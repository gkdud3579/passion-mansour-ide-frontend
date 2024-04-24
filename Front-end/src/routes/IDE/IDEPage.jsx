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

const IDEPage = () => {
  const queryClient = new QueryClient();
  const { projectId } = useParams(); // Correctly extracting projectId from the URL
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [output, setOutput] = useState('');
  const [projectData, setProjectData] = useState({});
  const [users, setUsers] = useState([
    { id: 'user1', role: 'master' },
    { id: 'user2', role: 'normal' },
  ]); // Initialize users
  const [currentUserIndex, setCurrentUserIndex] = useState(0); // Initialize currentUserIndex
  const stompClient = useRef(null);
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;

  useEffect(() => {
    const connectWebSocket = () => {
      const socket = new SockJS(websocketUrl);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.current.subscribe('/topic/code/1', (message) => {
          const messageData = JSON.parse(message.body);
          if (messageData.type === 'UPDATE_CODE' && users[currentUserIndex].role !== 'master') {
            // Additional logic here
          }
        });
      }, (error) => {
        console.error('Connection error: ', error);
      });
    };

    connectWebSocket();

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
      }
    };
  }, [projectId, users, currentUserIndex]);

  const handlePlaySuccess = (data) => {
    setOutput(data.stdout || data.stderr || data.exception || '');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className={styles.page}>
          <Toolbar
            state={{ language: 'javascript', fileContent: '' }}
            isChatVisible={isChatVisible}
            onChatToggle={() => setIsChatVisible(!isChatVisible)}
            projectData={projectData}
            onPlaySuccess={handlePlaySuccess}
          />
          <div className={styles.main}>
            <Editor state={{ language: 'javascript', fileContent: '' }} />
            <Output output={output} />
            {isChatVisible && <Chatting />}
          </div>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default IDEPage;
