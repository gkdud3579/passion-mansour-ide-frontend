import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Output from './components/Output';
import { ChakraProvider } from '@chakra-ui/react';
import './IDEPage.css';

const IDEPage = () => {
  return (
    <ChakraProvider>
      <div className="IDEPage">
        <Sidebar />
        <main>
          <Toolbar />
          <Editor />
          <Output />
        </main>
      </div>
    </ChakraProvider>
  );
};

export default IDEPage;
