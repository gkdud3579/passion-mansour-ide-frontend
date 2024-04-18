import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "./Editor.module.css";
import LanguageSelector from "./LanguageSelector";
import { Box } from "@chakra-ui/react";
import { CODE_SNIPPETS } from "../../Constants";
const Editor = ({ state, setState }) => {
  const [language, setLanguage] = useState("javascript");
  const onSelect = (lang) => {
    setLanguage(lang);
    setState({...state, fileContent:(CODE_SNIPPETS[language])})
    setState({...state, language: language});
  };

  return (
    <Box className={styles.container}>
      <LanguageSelector language={language} onSelect={onSelect} />
      <MonacoEditor
        height="100%"
        theme="vs-light"
        language={language}
        value={state.fileContent}
        defaultValue={CODE_SNIPPETS[language]}
        onChange={(newValue) => {
          setState({...state, fileContent: newValue})
        }}
      />
    </Box>
  );
};
export default Editor;