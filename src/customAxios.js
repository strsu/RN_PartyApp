import axios from 'axios';
import useStore from '../AppContext';

export const customAxios = axios.create({
  baseURL: 'http://192.168.1.243:4001',
  //baseURL: 'http://3.36.205.23:5000',
  timeout: 2500,
  maxRedirects: 5,
  withCredentials: true,
  headers: {
    //headers: {"Content-Type" : "application/json"},
    access_token: '',
    uuid: useStore.getState().uuid,
    accept: 'application/json',
  },
  
});

/*instance.interceptors.request.use(
    function (config) {
        // 요청을 보내기 전에 수행할 일
        // ...
        return config;
    },
    function (error) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      return Promise.reject(error);
    });*/