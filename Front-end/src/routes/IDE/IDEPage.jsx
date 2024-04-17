import { useState, useRef } from 'react';
import Editor from './components/codeEditor/Editor';
import Toolbar from './components/Toolbar';
import Output from './components/codeEditor/Output';
import Chatting from './components/modal/Chatting';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './IDEPage.module.css';

const IDEPage = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [output, setOutput] = useState(''); // 추가: 코드 실행 결과를 저장
  const [isRunning, setIsRunning] = useState(false); // 추가: 코드 실행 상태
  const editorRef = useRef(null); // 추가: Editor 참조

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  return (
    <ChakraProvider>
      <div className={styles.page}>
        <Toolbar
          onChatToggle={toggleChat}
          editorRef={editorRef}
          setOutput={setOutput}
          setIsRunning={setIsRunning}
          isRunning={isRunning}
        />
        <div className={styles.main}>
          <Editor ref={editorRef} className={styles.editorContainer} />
          <Output output={output} isRunning={isRunning} className={styles.outputContainer} />
          {isChatVisible && <Chatting />}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default IDEPage;
