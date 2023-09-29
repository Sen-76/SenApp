import { Modal } from 'antd';
import axios from 'axios';

const instance = axios.create({
  timeout: 600000,
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === 422) {
      Modal.error({
        title: 'Api failure',
        content: 'Something wrong. Please check api again!'
      });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
