import React from "react";
import Editor from "./components/Editor";
// import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import Output from "./components/Output";
import { ChakraProvider } from "@chakra-ui/react";
import styles from "./IDEPage.module.css";

const IDEPage = () => {
  return (
    <ChakraProvider>
      <div className={styles.page}>
        <Toolbar />
        <div className={styles.main}>
          {/* <Sidebar /> */}
          <Editor className={styles.editorContainer} />
          <Output className={styles.outputContainer} />
        </div>
      </div>
    </ChakraProvider>
  );
};

export default IDEPage;
