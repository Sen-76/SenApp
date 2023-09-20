import axios, { InternalAxiosRequestConfig, AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface IRequestConfig extends AxiosRequestConfig {
  args?: Record<string, A>;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const { url, args } = config as IRequestConfig;
  const axiosPromiseArray: A[] = window.axiosPromiseArray ?? [];
  window.axiosPromiseArray = axiosPromiseArray;
  if (args && url) {
    const lostParams: string[] = [];
    const replacedUrl = url.replace(/\{([^}]+)\}/g, (res: A, arg: string) => {
      if (!args[arg]) {
        lostParams.push(arg);
      }
      return args[arg] as string;
    });
    if (lostParams.length) {
      return Promise.reject(new Error('Unable to find corresponding path parameter in args'));
    }
    return { ...config, url: replacedUrl };
  }
  return config;
};
