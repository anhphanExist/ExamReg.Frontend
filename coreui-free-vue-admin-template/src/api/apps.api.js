import axios from "axios";
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

export default axiosApps;
