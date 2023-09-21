import axios from 'axios';

const instance = axios.create({
  timeout: 600000,
  baseURL: 'http://localhost:3001/api/v1'
  // headers: {
  //   Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  //   'Content-Type': 'application/json'
  // }
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    // Add loading spinner or perform other tasks before the request is sent.
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with the successful response.
    return response;
  },
  (error) => {
    // Handle errors globally (e.g., show an error message).
    return Promise.reject(error);
  }
);

export default instance;
