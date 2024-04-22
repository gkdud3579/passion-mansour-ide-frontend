import api from './api';

// 유저 정보 불러오기
export const getUser = async ({ id }) => {
  try {
    const res = await api(`/user/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

// 진행중인 게시글 불러오기
export const getProceedingPosts = async () => {
  try {
    const res = await api('/posts');
    return res.data;
  } catch (err) {
    return err;
  }
};

// 종료된 게시글 불러오기
export const getEndPosts = async () => {
  try {
    const res = await api('/posts');
    return res.data;
  } catch (err) {
    return err;
  }
};

// 진행중인 게시글 - IDE 정보 불러오기
export const getProceedingPost = async ({ id }) => {
  try {
    const res = await api(`/post/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};
