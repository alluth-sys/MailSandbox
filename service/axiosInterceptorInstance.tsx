import axios from 'axios';
import {useSession} from 'next-auth/react';

const axiosGraphAPIInterceptorInstance = axios.create({
  baseURL: 'https://graph.microsoft.com/', // Replace with your API base URL
});


// Request interceptor
axiosGraphAPIInterceptorInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
        const { data } = useSession();

        //@ts-ignore
        const accessToken = data?.accessToken;

    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here

    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
axiosGraphAPIInterceptorInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here

    return response;
  },
  (error) => {
    // Handle response errors here

    return Promise.reject(error);
  }
);
// End of Response interceptor

export default axiosGraphAPIInterceptorInstance;