import axios from 'axios';
import { LANGUAGE_VERSIONS } from './Constants';

// Piston API용 인스턴스
const PistonAPI = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

// 새 백엔드 서버용 인스턴스
const BackendAPI = axios.create({
  baseURL: 'http://ec2-54-180-141-29.ap-northeast-2.compute.amazonaws.com/api',
});

export const executeCode = async (language, sourceCode) => {
  const response = await PistonAPI.post('/execute', {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [{ content: sourceCode }],
  });
  return response.data;
};

// export const saveFileContent = async ({ projectId, language, fileContent = '' }) => {
//   const response = await BackendAPI.patch(`/projects/${projectId}/save`, {
//     projectId,
//     language,
//     fileContent,
//   });
//   return response.data;
// };

export const saveFileContent = async ({ projectId, language, fileContent = '' }) => {
  // 요청 본문에는 projectId, language, fileContent 포함
  const response = await BackendAPI.patch(`/projects/${projectId}/save`, {
    language,
    fileContent
  });
  
  return response.data;
};

export const playFileContent = async ({ projectId, language, file = '' }) => {
    const response = await BackendAPI.post(`/projects/{projectId}/run`, {
      projectId,
      language,
      file
    });
    return response.data;
  };