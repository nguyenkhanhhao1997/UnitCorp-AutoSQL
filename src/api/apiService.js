import axios from "axios";
let API_URL = "https://localhost:7275/api";
const callApi = (endpoint, method = "GET", body, headers = null) => {
  return (
    axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data: body,
      headers: headers,
    })
      // .then((result) => {
      //   console.log(result.data);
      // })
      .catch((error) => {
        if (error.response) {
          console.log("response", error.response);
        } else if (error.request) {
          console.log("error", error.request);
        } else if (error.message) {
          console.log("message", error.message);
        }
      })
  );
};
export default callApi;
