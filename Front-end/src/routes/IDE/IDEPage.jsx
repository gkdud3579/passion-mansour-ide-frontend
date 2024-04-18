import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useRef } from 'react';
import Editor from './components/codeEditor/Editor';
import Toolbar from './components/Toolbar';
import Output from './components/codeEditor/Output';
import Chatting from './components/modal/Chatting';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './IDEPage.module.css';
import { executeCode } from './api';

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
      const result = await executeCode('javascript', sourceCode); // 언어와 소스코드를 인자로 넘깁니다.
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
          <Toolbar state={state} onChatToggle={toggleChat} isRunning={isRunning} onRunCode={runCode} />
          <div className={styles.main}>
            <Editor state={state} setState={setState} className={styles.editorContainer} />
            <Output output={output} className={styles.outputContainer} />
            {isChatVisible && <Chatting />}
          </div>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default IDEPage;
