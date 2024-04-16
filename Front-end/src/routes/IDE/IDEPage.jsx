import { useState } from 'react';
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';
import Output from './components/Output';
import Chatting from './components/modal/Chatting';
import { ChakraProvider } from '@chakra-ui/react';
import styles from './IDEPage.module.css';

const IDEPage = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  return (
    <ChakraProvider>
      <div className={styles.page}>
        <Toolbar onChatToggle={toggleChat} />
        <div className={styles.main}>
          {/* <Sidebar /> */}
          <Editor className={styles.editorContainer} />
          <Output className={styles.outputContainer} />
          {isChatVisible && <Chatting />} {/* 채팅 모달을 조건부 렌더링으로 추가합니다 */}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default IDEPage;
