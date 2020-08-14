import { useCallback } from 'react';

export const useApi = () => {
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      try {
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, { method, body, headers });
        return await response.json();
      } catch (e) {
        throw e;
      }
    },
    []
  );
  return { request };
};
