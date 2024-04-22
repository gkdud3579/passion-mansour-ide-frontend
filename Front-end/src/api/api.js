import axios from 'axios';

const api = axios.create({
  // api 연동 필요 임시 주소 사용
  baseURL: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
  withCredentials: true,
});

// access token 재발급
const getRefreshToken = async () => {
  try {
    // 재발급 요청해야 하는 API 주소 필요
    const res = await api.post();
    const accessToken = res.data.data?.accessToken;
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
    const refreshToekn = localStorage.getItem('refresh-token');

    console.log('api 01 : ', config);
    console.log('api 02 : ', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.common['Refresh-Token'] = refreshToekn;
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

    //  401에러가 아니면 그냥 에러 발생
    if (response.status !== 401) {
      return Promise.reject(error);
    }
    // 아닌 경우 토큰 갱신
    config.sent = true; // 무한 재요청 방지
    const accessToken = await getRefreshToken();
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return axios(config); // 재요청
  },
);

export default api;
