//<ROOT>/shared/APIKit.js
import axios from "axios";
// import { useHistory } from "react-router-dom";

// eslint-disable-next-line react-hooks/rules-of-hooks
// const history = useHistory();

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: "http://sitea-c-1229:8001/api/v1",
  timeout: 10000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    // if (config.status == 401) {
    //   history.push("/");
    // }
    return config;
  });

  // APIKit.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response.status >= 500) {
  //       //Raven.captureException(error);
  //       console.log(error);
  //     }

  //     if (error.response.status === 401) {
  //       window.location = window.url("login");
  //       return Promise.reject(error);
  //     }
  //     return Promise.reject(error);
  //   }
  // );
};

export default APIKit;
