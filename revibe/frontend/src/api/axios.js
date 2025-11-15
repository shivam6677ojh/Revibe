import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { useMemo } from 'react';

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
});

export function useApi() {
  const { getToken } = useAuth();
  
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE
    });
    
    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      console.log('Sending token:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    
    return instance;
  }, [getToken]);
  
  return api;
}

export default baseApi;
