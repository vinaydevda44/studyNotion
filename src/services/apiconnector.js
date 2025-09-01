import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = {}, params = {}) => {
  let finalHeaders = { ...headers };

  if (!(bodyData instanceof FormData) && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }

  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: finalHeaders,
    params: params || null,
  });
};
