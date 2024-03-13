import axios, { AxiosResponse } from 'axios';
import { TypeCommon } from '../types/common';
import { LOCAL_STORAGE_KEY, ROUTERS } from '../constants/common';

const axiosInstance = axios.create({
  baseURL: process.env.VITE_APP_BASE_URL,
  withCredentials: false
});

axiosInstance.interceptors.request.use(
  (config: TypeCommon) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          is_web: true
        }
      : {};
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
      ...headers
    };
    config.counter = config.counter || 0;
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      window.location.pathname !== ROUTERS.LOGIN.PATH
    ) {
      localStorage.clear();
      window.location.assign(ROUTERS.LOGIN.PATH);
    }
    return Promise.reject(error);
  }
);

export const get = ({
  url,
  params,
  headers
}: {
  url: string;
  params?: TypeCommon;
  headers?: TypeCommon;
}): Promise<AxiosResponse> => {
  return axiosInstance.get(url, {
    headers,
    params
  });
};

export const post = ({
  url,
  body,
  type,
  params,
  headers
}: {
  url: string;
  body?: TypeCommon;
  type?: TypeCommon;
  params?: TypeCommon;
  headers?: TypeCommon;
}): Promise<AxiosResponse> => {
  if (type) {
    return axiosInstance.post(url, body, {
      responseType: type,
      headers,
      params
    });
  }
  return axiosInstance.post(url, body, {
    headers,
    params
  });
};

export const put = ({
  url,
  body,
  params,
  headers
}: {
  url: string;
  body?: TypeCommon;
  params: TypeCommon;
  headers?: TypeCommon;
}): Promise<AxiosResponse> => {
  return axiosInstance.put(url, body, {
    headers,
    params
  });
};

export const patch = (
  url: string,
  body?: TypeCommon,
  params?: TypeCommon,
  headers?: TypeCommon
): Promise<AxiosResponse> => {
  return axiosInstance.patch(url, body, {
    headers,
    params
  });
};

export const deleteMethod = ({
  url,
  params,
  headers
}: {
  url: string;
  params: TypeCommon;
  headers?: TypeCommon;
}): Promise<AxiosResponse> => {
  return axiosInstance.delete(url, {
    headers,
    params
  });
};
