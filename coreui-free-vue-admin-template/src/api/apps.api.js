import axios from "axios";
import Router from "../router/index";
import Cookies from "js-cookie";


const axiosApps = axios.create({
  baseURL: "https://localhost:44317/api/ExamReg/APPS",
});

axiosApps.defaults.headers.get["Accepts"] = "application/json";

axiosApps.interceptors.request.use(config => {
  if (Cookies.get("token"))
    config.headers.authorization = "Bearer " + Cookies.get("token");
  return config;
});

axiosApps.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
    await Cookies.remove("token");
    await Cookies.remove("isAdmin");
    await Router.go();
  }
  return Promise.reject(error)
});

export default axiosApps;
