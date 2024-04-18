import axios from 'axios';
import { LANGUAGE_VERSIONS } from './Constants';

// Piston API용 인스턴스
const PistonAPI = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

// 새 백엔드 서버용 인스턴스
const BackendAPI = axios.create({
  baseURL: 'https://your-new-backend-url.com/api',
});

export const executeCode = async (language, sourceCode) => {
  const response = await PistonAPI.post('/execute', {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
  });
  return response.data;
};

export const saveFileContent = async ({ projectId, language, fileContent, fileLanguage = '' }) => {
  const response = await BackendAPI.patch(`/projects/${projectId}/save`, {
    projectId,
    language,
    fileContent,
    fileLanguage,
  });
  return response.data;
};
