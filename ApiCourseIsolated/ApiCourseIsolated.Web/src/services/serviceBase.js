/* eslint-disable @typescript-eslint/no-explicit-any */
//import * as FileSaver from 'file-saver';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
//import { fileReader } from '../shared/misc/utils';
import authHeader from './auth-header';
import AuthService from "./auth.service";

export default class ServiceBase {
  constructor() {
    this.config = { headers: authHeader() };
    this.setHeaderInterceptor();
  }

  config: AxiosRequestConfig;

  setHeaderInterceptor = () => {
            /*InterceptorRequest=ok*/
            axios.interceptors.request.use(function (config) {
              //config = this.config; //
              config.headers = authHeader();
              return config;
            }, function (error) {
              // Do something with request error
              return Promise.reject(error);
            });
  };

  redirectOnError = (r: any, message: string, callback: (messageError: string) => any) => {
    if (
      r.response &&
      r.response.status &&
      (r.response.status === 403 || r.response.status === 401)
    ) {
      AuthService.logout();
      const logoutUrl = `${process.env.REACT_APP_HTTP}://${window.location.host}/login`; //logout
      window.location.replace(logoutUrl);
    } else {
      callback(message);
    }
  };

  redirectOnLogout = (r: AxiosResponse) => {
    if (r.status === 401 || r.status === 403){
      AuthService.logout();
      window.location.replace(`${process.env.REACT_APP_HTTP}://${window.location.host}`);
    }
  };

  delete = async <P>(url: string) => {
    //const result = await axios.delete<P>(url, this.config);
    const result = await axios.delete<P>(url);
    this.redirectOnLogout(result);
    return result.data;
  };

  deleteSimple = async (url: string) => {
    try {
          const result = await axios.delete(url);
          this.redirectOnLogout(result);
          return result;
      } catch (error) {
        this.redirectOnError(error);
      }
  };
/*axios.delete(URL, {
  headers: {
    Authorization: authorizationToken
  },
  data: {
    source: source
  }
});*/

 deleteWithBody = async (url: string, dataToDelete?: any) => {
    try {
          const result = await axios.delete(url, { data: dataToDelete });
          this.redirectOnLogout(result);
          return result;
      } catch (error) {
        this.redirectOnError(error);
      }
  };

  get = async <P>(url: string) => {
    //const result = await axios.get<P>(url, this.config);
    const result = await axios.get<P>(url);
    this.redirectOnLogout(result);
    return result.data;
  };

  getSimple = async (url: string) => {
    try {
          //const result = await axios.get(url, this.config);
          const result = await axios.get(url);
          this.redirectOnLogout(result);
          return result;
    } catch (error) {
      this.redirectOnError(error);
    }
  };


  getWithParams = async (url: string, params: object) => {
    try {
          const result = await axios.get(url, params);
          this.redirectOnLogout(result);
          return result;
    } catch (error) {
      this.redirectOnError(error);
    }
  };

  post = async <P>(url: string, data?: any) => {
    const result = await axios.post<P>(url, data, this.config);
    this.redirectOnLogout(result);
    return result.data;
  };

  postWithBody = async (url: string, data?: any) => {
    try{
        const result = await axios.post(url, data);
        this.redirectOnLogout(result);
        return result;
    } catch (error) {
      this.redirectOnError(error);
    }
  };

  put = async <P>(url: string, data?: any) => {
    const result = await axios.put<P>(url, data, this.config);
    this.redirectOnLogout(result);
    return result.data;
  };

  /*download = async (url: string, data?: any) => {
    const config: AxiosRequestConfig = { ...this.config, responseType: 'blob', timeout: 30000 };

    try {
      const response = await axios.post<Blob>(url, data, config);
      const contentDisposition = response.headers['content-disposition'];
      const filename = (contentDisposition.match('filename=(.+);')[1] as string).replace(/"/g, '');
      FileSaver.saveAs(response.data, filename);
    } catch (error) {
      if (!error.response.data) return;
      const msg = (await fileReader(error.response.data)) as string;
      throw Error(msg);
    }
  };*/
}
