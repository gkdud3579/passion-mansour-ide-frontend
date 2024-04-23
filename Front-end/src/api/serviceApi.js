import api from './api';

// 유저 정보 불러오기
export const getUser = async ({ id }) => {
  try {
    const res = await api.get(`/user/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

// 진행중인 게시글 불러오기
export const postProjects = async ({ isEnd }) => {
  try {
    const res = await api.post('/projects', isEnd);
    return res.data;
  } catch (err) {
    return err;
  }
};

// IDE 프로젝트 정보 불러오기
export const getPrject = async ({ id }) => {
  try {
    const res = await api.get(`/projects/${id}/get`);
    return res.data;
  } catch (err) {
    return err;
  }
};
