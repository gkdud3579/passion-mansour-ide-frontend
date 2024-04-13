import React from 'react';
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import Output from "./components/Output";
import { ChakraProvider } from "@chakra-ui/react";
import "./IDEPage.css";

const IDEPage = () => {
  return (
    <ChakraProvider>
      <div className="ide-page">
        <Toolbar />
        <div className="ide-main">
          <Sidebar />
          <Editor />
        </div>
        <Output />
      </div>
    </ChakraProvider>
  );
};

export default IDEPage;
