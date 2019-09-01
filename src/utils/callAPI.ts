import axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { getCookie } from "./controllCookie";
import store from "../store/index";
import domain from "./domain";

// This function is for making the interceptor to check and set the token in cookie

// INSIDE OF REQUEST
//  METHOD: GET/POST/PUT/DELETE
//  DOMAIN: localhost...
//  DATA: for post request
//  PARAMS: for get request

type Requests = AxiosRequestConfig[];

export default (requests: Requests) => {
  const reqPromises = [];
  store.dispatch("ui/setIsLoading", true);
  for (const request of requests) {
    reqPromises.push(requestAPI(request));
  }

  return Promise.all(reqPromises)
    .then((responses: AxiosResponse[]): any => {
      store.dispatch("response/setResponse", {
        status: 200,
        method: requests[0].method,
        errors: ""
      });
      return responses.map(response => response.data);
    })
    .catch((error: AxiosError): void => {
      if (error.response) {
        store.dispatch("response/setResponse", {
          status: error.response.status,
          method: requests[0].method,
          errors: error.response.data
        });
      } else {
        store.dispatch("response/setResponse", {
          status: 500,
          method: requests[0].method,
          errors: { errorMessage: "500 Sorry it's me, not you." }
        });
      }
    })
    .finally((): void => {
      store.dispatch("ui/setIsLoading", false);
    });
};

const requestAPI = (request: AxiosRequestConfig): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = { baseURL: domain, url: request.url, method: request.method };

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
