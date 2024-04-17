import { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "./Editor.module.css";
import LanguageSelector from "./LanguageSelector";

const Editor = () => {
  const [language, setLanguage] = useState("javascript");

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  function handleLanguageSelect(lang) {
    setLanguage(lang);
  }

  function onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  return (
    <div className={styles.container}>
      <LanguageSelector language={language} onSelect={handleLanguageSelect} />
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-light"
        value={"// 여기에 코드를 작성하세요"}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;