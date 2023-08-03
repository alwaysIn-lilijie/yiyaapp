import axios from 'axios';
import { baseURL, headers } from '@/networking/config';
import { resInterceptor } from '@/networking/interceptors';
console.log('==================>>>',baseURL);

export class NetworkService {
  constructor() {
    this.client = axios.create({ baseURL, headers });
    this.client.interceptors.response.use(resInterceptor.onFulfill, resInterceptor.onReject);
  }

  setAccessToken(token) {
    console.log("token",token)
    this.client.defaults.headers.common.authorization = `Bearer ${token}`;
  }

  getAccessToken() {
    return this.client.defaults.headers.common.authorization;
  }

  clearAccessToken() {
    delete this.client.defaults.headers.common.authorization;
  }

  request({ method, url, data, ...config }) {
    console.log('url=' + url);
    return this.client.request({ method, url, data, ...config });
  }
  get({ url, data, ...config }) {
    let method = 'GET';
    return this.client.request({ method, url, data, ...config });
  }
}

export const networkService = new NetworkService();