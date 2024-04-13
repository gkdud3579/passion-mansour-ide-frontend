import MonacoEditor from '@monaco-editor/react';
import './Editor.css'; 

const Editor = () => {
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
    };
  
    function onChange(newValue, e) {
      console.log('onChange', newValue, e);
    }
  
    return (
      <div className="editor-container">
        <span className="editor-title">index.js</span>
        <MonacoEditor
          height="100%"
          language="javascript"
          theme="vs-light"
          value={'// 여기에 코드를 작성하세요'}
          options={options}
          onChange={onChange}
        />
      </div>
    );
  };
  
  export default Editor;
