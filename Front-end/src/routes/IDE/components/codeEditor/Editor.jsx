import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import styles from './Editor.module.css';
import LanguageSelector from './LanguageSelector';
import { Box } from '@chakra-ui/react';
import { CODE_SNIPPETS } from '../../Constants';

const Editor = ({ state, setState, isMaster }) => {
  const [language, setLanguage] = useState('javascript');

  const onSelect = (lang) => {
    setLanguage(lang);
    setState({
      ...state,
      language: lang,
      fileContent: CODE_SNIPPETS[lang],
      file: {
        name: `Main.${lang}`,
        content: CODE_SNIPPETS[lang],
      },
    });
  };

  return (
    <Box className={styles.container}>
      <LanguageSelector language={language} onSelect={onSelect} />
      <MonacoEditor
        height="100%"
        theme="vs-light"
        language={state.language}
        value={state.fileContent}
        defaultValue={CODE_SNIPPETS[language]}
        options={{ readOnly: !isMaster }}
        onChange={(newValue) => {
          setState({
            ...state,
            fileContent: newValue,
            file: {
              ...state.file,
              content: newValue,
            },
          });
        }}
      />
    </Box>
  );
};
export default Editor;
