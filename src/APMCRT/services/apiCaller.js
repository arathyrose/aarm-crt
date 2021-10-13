import axios from "axios";
export const GET = "GET";
export const POST = "POST";
export const PATCH = "PATCH";
export const DELETE = "DELETE";

function APICaller(method, url, data) {
  return axios({
    method,
    url,
    data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export default APICaller;
