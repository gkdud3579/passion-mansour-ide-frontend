import { useContext, useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styles from './Editor.module.css';
import LanguageSelector from './LanguageSelector';
import { Box } from '@chakra-ui/react';
import { CODE_SNIPPETS } from '../../Constants';
import { ThemeContext } from '@emotion/react';

const Editor = ({ state, setState, isMaster, stompClient }) => {
  const { isDark } = useContext(ThemeContext);
  const [isTheme, setIsTheme] = useState('light');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    if (isDark) {
      setIsTheme('vs-dark');
    } else {
      setIsTheme('light');
    }
  }, [isDark]);

  const onSelect = (lang) => {
    setLanguage(lang);
    setState({
      ...state,
      language: lang,
      content: CODE_SNIPPETS[lang],
      file: {
        name: `Main.${lang}`,
        content: CODE_SNIPPETS[lang],
      },
    });
  };

  const handleEditorChange = (newValue) => {
    setState({
      ...state,
      content: newValue,
      file: {
        ...state.file,
        content: newValue,
      },
    });

    // Send the new code to other users if the current user is the master
    if (isMaster && stompClient && stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        'app/code/change/1',
        JSON.stringify({
          type: 'UPDATE_CODE',
          fileContent: newValue,
        }),
        {},
      );
    }
  };

  return (
    <Box className={styles.container}>
      <LanguageSelector language={language} onSelect={onSelect} />
      <MonacoEditor
        height="100%"
        theme={isTheme}
        language={state.language}
        value={state.content}
        defaultValue={CODE_SNIPPETS[language]}
        options={{ readOnly: !isMaster }}
        onChange={handleEditorChange}
      />
      {isMaster && <p>마스터 모드에서 편집 중입니다!</p>}
    </Box>
  );
};

export default Editor;