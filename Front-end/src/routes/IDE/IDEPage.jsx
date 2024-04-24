import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useRef } from 'react';
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
  const [output, setOutput] = useState(''); // 추가: 코드 실행 결과를 저장
  const [isRunning, setIsRunning] = useState(false); // 추가: 코드 실행 상태
  // const editorRef = useRef(null);
  const [state, setState] = useState({language:"javascript" , fileContent:""})

  const runCode = async () => {
    // const sourceCode = editorRef.current.getValue();
    const sourceCode = state.fileContent
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
          <Toolbar state={state} onChatToggle={toggleChat} isRunning={isRunning} onRunCode={runCode} />
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
