import api from './api';

// user info get
export const getMyUser = async () => {
  try {
    const res = await api.get('/members/my-page');
    return res;
  } catch (err) {
    return err;
  }
};

// 유저 정보 불러오기
export const getUser = async (id) => {
  try {
    const res = await api.get(`/user/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

// 진행중인 게시글 불러오기
export const postProjects = async (isEnd) => {
  try {
    const res = await api.post('/board', isEnd);
    return res;
  } catch (err) {
    return err;
  }
};

// IDE 프로젝트 정보 불러오기
export const getPrject = async (id) => {
  try {
    const res = await api.get(`/projects/get/${id}`);
    return res;
  } catch (err) {
    return err;
  }
};
