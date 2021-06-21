import axios from 'axios';
//export const BASE_URL = "https://navu.shadday.tech";
//export const BASE_URL = "http://localhost:8080";
//const { SNOWPACK_PUBLIC_BASE_URL } = __SNOWPACK_ENV__;

const instance = axios.create({
  baseURL: import.meta.env.SNOWPACK_PUBLIC_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
