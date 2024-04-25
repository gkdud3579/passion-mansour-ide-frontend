import { useState, useEffect, useRef, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Editor from './components/codeEditor/Editor';
import Toolbar from './components/Toolbar';
import Output from './components/codeEditor/Output';
import Chatting from './components/modal/Chatting';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './IDEPage.module.css';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';

const IDEPage = () => {
  const queryClient = new QueryClient();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [output, setOutput] = useState({});
  const [projectData, setProjectData] = useState({});
  const { id: projectId } = useParams();
  const [permission, setPermission] = useState('');
  const stompClient = useRef(null);
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
  const [userData, setUserData] = useState({});
  const [editorFontSize, setEditorFontSize] = useState(12);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      navigate('/login');
    }

    console.log('projectId:', projectId);
    const userInfo = JSON.parse(localStorage.getItem('ud'));
    console.log('userInfo : ', userInfo);
    setUserData(userInfo);

    const connectWebSocket = () => {
      const socket = new SockJS(websocketUrl);
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, onConnected, onError);
    };

    const onConnected = (frame) => {
      console.log('Connected: ' + frame);
      stompClient.current.subscribe(`/topic/code/${projectId}`, onMessageReceived);
    };

    const onMessageReceived = (message) => {
      const messageData = JSON.parse(message.body);
      if (messageData.type === 'UPDATE_CODE') {
        setState((prevState) => ({
          ...prevState,
          fileContent: messageData.fileContent,
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
  }, [projectId]);

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

  const onFontSizePlus = useCallback(() => {
    setEditorFontSize((prev) => {
      if (prev === 20) return prev;
      else return prev + 1;
    });
  }, []);

  const onFontSizeMinus = useCallback(() => {
    setEditorFontSize((prev) => {
      if (prev === 8) return prev;
      else return prev - 1;
    });
  }, []);

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
            setIsChatVisible={setIsChatVisible}
            onChatToggle={toggleChat}
            onPlaySuccess={handlePlaySuccess}
            projectData={projectData}
            projectId={projectId}
            setOutput={setOutput}
            userData={userData}
          />
          <div className={styles.main}>
            <Editor
              state={state}
              setState={setState}
              permission={permission}
              stompClient={stompClient}
              projectId={projectId} // Ensure this prop is being passed correctly
              editorFontSize={editorFontSize}
              onFontSizePlus={onFontSizePlus}
              onFontSizeMinus={onFontSizeMinus}
            />
            <Output output={output} />

            {isChatVisible && <Chatting websocketUrl={websocketUrl} projectId={projectId} userData={userData} />}
          </div>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default IDEPage;
