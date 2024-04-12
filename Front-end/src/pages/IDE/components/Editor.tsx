import { MonacoEditor } from "react-monaco-editor";

const Editor: React.FC = () => {
  // 에디터 설정 및 이벤트 핸들러 정의
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="javascript"
      theme="vs-dark"
      // 에디터 옵션 설정
    />
  );
};

export default Editor;
