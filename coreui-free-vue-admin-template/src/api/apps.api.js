import axios from "axios";

const axiosApps = axios.create({
  baseURL: "https://localhost:44317/api/ExamReg/APPS"
});

axiosApps.default.headers.common.get["Accepts"] = "application/json";

export default axiosApps;
