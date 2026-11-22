// import axios from "axios";
// import env from "../config/env";

// const api = axios.create({
//   baseURL: env.API_URL,
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const original = error.config;

//     if (error.response?.status === 401 && !original._retry) {
//       original._retry = true;

//       try {
//         await api.post("/auth/refresh");
//         return api(original);
//       } catch (err) {
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios"
import env from "../config/env"

const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true
})

api.interceptors.response.use(

  res => res,

  async error => {

    if (error.response) {

      if (error.response.status === 401) {

        window.location.href = "/login"

      }

      if (error.response.status === 403) {

        window.location.href = "/unauthorized"

      }

    }

    return Promise.reject(error)

  }

)

export default api