import axios from "axios";
//export const BASE_URL = "https://navu.shadday.tech";
export const BASE_URL = "http://localhost:8080";

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-type": "application/json"
    }
  });

export default http;