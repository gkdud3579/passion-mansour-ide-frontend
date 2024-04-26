import { useCallback, useContext, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styles from './Editor.module.css';
import LanguageSelector from './LanguageSelector';
import { Box } from '@chakra-ui/react';
import { CODE_SNIPPETS } from '../../Constants';
import ThemeContext from '../../../../contexts/themeContext';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const Editor = ({
  state,
  setState,
  stompClient,
  permission,
  projectId,
  editorFontSize,
  onFontSizePlus,
  onFontSizeMinus,
}) => {
  const { isDark } = useContext(ThemeContext);
  const [language, setLanguage] = useState('java');
  const isReadOnly = permission === 'normal';

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

  const handleEditorChange = useCallback(
    debounce((newValue) => {
      if (!isReadOnly) {
        setState({
          ...state,
          content: newValue,
          file: {
            ...state.file,
            content: newValue,
          },
        });
      }

      // Send the new code to other users if the current user is the master
      if (stompClient && stompClient.current && stompClient.current.connected) {
        stompClient.current.send(
          `/app/code/change/${projectId}`,
          JSON.stringify({
            type: 'UPDATE_CODE',
            content: newValue,
          }),
          {},
        );
      }
    }, 500),
    [state, stompClient, projectId, isReadOnly],
  );

  return (
    <Box className={styles.container}>
      <LanguageSelector
        language={language}
        onSelect={onSelect}
        onFontSizePlus={onFontSizePlus}
        onFontSizeMinus={onFontSizeMinus}
      />
      <MonacoEditor
        height="100%"
        theme={isDark ? 'vs-dark' : 'light'}
        language={state.language}
        value={state.content}
        defaultValue={CODE_SNIPPETS[language]}
        options={{ readOnly: isReadOnly, fontSize: editorFontSize }}
        onChange={handleEditorChange}
      />
    </Box>
  );
};

export default Editor;
