import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
  withCredentials: true, // cors err 피하기
});

// access token 재발급
const getRefreshToken = async () => {
  try {
    const res = await api.post('/members/refresh-token');
    const accessToken = res.data.accessToken;
    return accessToken;
  } catch (err) {
    // 로그아웃 처리
    return err;
  }
};

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 헤더에 엑세스 토큰 담기
    const accessToken = localStorage.getItem('access-token');

    console.log('api 01 : ', config);
    console.log('api 02 : ', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log('api 03 : ', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('api 04 : ', response);
    return response;
  },
  async (error) => {
    const { config, response } = error;

    console.log('api 05 : ', config);
    console.log('api 06 : ', response);
    console.log('api 07 : ', error);

    //  401에러가 아니면 그냥 에러 발생
    if (response.status !== 401) {
      return Promise.reject(error);
    }
    // 아닌 경우 토큰 갱신
    config.sent = true; // 무한 재요청 방지
    const accessToken = await getRefreshToken();
    if (accessToken) {
      localStorage.setItem('access-token', accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return axios(config); // 재요청
  },
);

export default api;
