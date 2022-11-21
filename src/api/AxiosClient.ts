import axios from 'axios';
import queryString from 'query-string';

const AxiosClient = axios.create({
  baseURL: 'https://637adea910a6f23f7f9a1ef8.mockapi.io/',
  responseType: 'json',
  timeout: 5000,
  paramsSerializer: params => queryString.stringify(params),
});

AxiosClient.interceptors.request.use(
  async config => {
    const newConfig = config;
    // newConfig.headers.common['App-Version'] = APP_CONFIG.version;
    // newConfig.headers.Authorization = 'Bearer ' + getToken();
    return newConfig;
  },
  error => {
    return Promise.reject(error);
  },
);

export default AxiosClient;
