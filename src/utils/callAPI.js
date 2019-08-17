import axios from "axios";
import { getCookie } from "./controllCookie";
import store from "../store/index";

// This function is for making the interceptor to check and set the token in cookie

// INSIDE OF REQUEST
//  METHOD: GET/POST/PUT/DELETE
//  DOMAIN: localhost...
//  DATA: for post request
//  PARAMS: for get request

export default requests => {
  const reqPromises = [];
  store.commit("setIsLoading", true);
  for (const request of requests) {
    reqPromises.push(requestAPI(request));
  }

  return Promise.all(reqPromises)
    .then(responses => {
      store.commit("setResponse", {
        status: 200,
        method: requests[0].method,
        errors: ""
      });
      return responses.map(response => response.data);
    })
    .catch(error => {
      if (error.response) {
        store.commit("setResponse", {
          status: error.response.status,
          method: requests[0].method,
          errors: error.response.data
        });
      } else {
        store.commit("setResponse", {
          status: 500,
          method: requests[0].method,
          errors: { errorMessage: "500 Sorry it's me, not you." }
        });
      }
      console.log("CATCH CALL API: ", error.response);
    })
    .finally(error => {
      store.commit("setIsLoading", false);
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

  return axios.request(config);
};
