import MonacoEditor from '@monaco-editor/react';

const Editor = () => {
  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: false,
  };

  function onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

  return (
    <MonacoEditor
      width="100%"
      height="400"
      language="javascript"
      theme="vs-dark"
      value={'// 여기에 코드를 작성하세요'}
      options={options}
      onChange={onChange}
    />
  );
};

export default Editor;
