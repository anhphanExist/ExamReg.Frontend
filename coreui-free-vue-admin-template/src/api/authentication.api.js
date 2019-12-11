import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "https://localhost:44380/api/ExamReg"
});

axiosAuth.default.headers.common.get["Accepts"] = "application/json";

const login = async function(loginRequestDTO) {
  return await axiosAuth.post("/login", loginRequestDTO);
};

const changePassword = async function(changePasswordRequestDTO) {
  return await axiosAuth.post("/change-password", changePasswordRequestDTO);
};

export default {
  login,
  changePassword
};
