import axios from "axios";
import { getCookie } from "./controllCookie";
import store from "../store";

// This function is for making the interceptor to check and set the token in cookie

// INSIDE OF REQUEST
//  METHOD: GET/POST/PUT/DELETE
//  DOMAIN: localhost...
//  DATA: for post request
//  PARAMS: for get request

export default requests => {
  const reqPromises = [];
  for (const request of requests) {
    reqPromises.push(requestAPI(request));
  }

  return Promise.all(reqPromises)
    .then(responses => {
      store.commit("setResponse", { status: 200, errors: "" });
      return responses.map(response => response.data);
    })
    .catch(error => {
      console.log("CATCH CALL API: ", error);
    });
};

const requestAPI = request => {
  const config = { baseURL: request.url, method: request.method };

  if (request.method === "GET") {
    if (request.params) {
      config.params = request.params;
    }
  } else {
    const { token } = getCookie();
    config.headers = { "x-access-token": token };

    if (request.method === "POST") {
      config.data = request.data;
    }
  }

  console.log("REQUEST", config);

  return axios.request(config);
};
