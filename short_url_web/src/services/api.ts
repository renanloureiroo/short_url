import axios, { AxiosError } from "axios";

const token = localStorage.getItem("@shortUrl:token");

const api = axios.create({
  baseURL: "http://localhost:3333",
});

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log(error.response.data);
      // localStorage.removeItem("@shortUrl:token");
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
