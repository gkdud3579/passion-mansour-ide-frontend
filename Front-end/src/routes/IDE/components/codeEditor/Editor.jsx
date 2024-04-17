import { useState, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styles from './Editor.module.css';
import LanguageSelector from './LanguageSelector';
import { Box } from '@chakra-ui/react';
import { CODE_SNIPPETS } from '../../Constants';

const Editor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box className={styles.container}>
      <LanguageSelector language={language} onSelect={onSelect} />
      <MonacoEditor
        height="100%"
        theme="vs-light"
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </Box>
  );
};

export default Editor;
