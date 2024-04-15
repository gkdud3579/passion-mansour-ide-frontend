import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import styles from "./Editor.module.css";
import LanguageSelector from "./LanguageSelector"; // LanguageSelector를 가져옵니다.
import { LANGUAGE_VERSIONS } from "../Constants"; // 언어 버전 정보를 가져옵니다.

const Editor = () => {
  const [language, setLanguage] = useState("javascript"); // 현재 선택된 언어 상태

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  function handleLanguageSelect(lang) {
    setLanguage(lang); // 언어 선택을 상태에 반영
  }

  function onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  return (
    <div className={styles.container}>
      <LanguageSelector language={language} onSelect={handleLanguageSelect} />
      <MonacoEditor
        height="100%"
        language={language} // 선택된 언어로 설정
        theme="vs-light"
        value={"// 여기에 코드를 작성하세요"}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
