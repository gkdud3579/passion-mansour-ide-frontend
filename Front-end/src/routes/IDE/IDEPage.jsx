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

const IDEPage = () => {
  const queryClient = new QueryClient();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [output, setOutput] = useState('');
  const [currentUser] = useState({ id: 'user1', role: 'master' });  // user1 is the master
  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:7382/websocket');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame);
      },
      (error) => {
        console.error('Connection error: ', error);
      },
    );

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
        console.log('Disconnected!');
      }
    };
  }, []);

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

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className={styles.page}>
          <Toolbar state={state} onChatToggle={toggleChat} onPlaySuccess={handlePlaySuccess} projectId={"your-project-id"} />
          <div className={styles.main}>
            <Editor state={state} setState={setState} isMaster={currentUser.role === 'master'} />
            <Output output={output} />
            {isChatVisible && <Chatting />}
          </div>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default IDEPage;
