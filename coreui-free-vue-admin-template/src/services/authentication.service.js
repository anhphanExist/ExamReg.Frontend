import authApi from "../api/authentication.api";
import Cookies from "js-cookie";

const login = async function (form) {
  let loginRequestDTO = {
    username: form.username,
    password: form.password
  };
  let response = await authApi.login(loginRequestDTO);
  if (response.data.token != null)
    Cookies.set("token", response.data.token);
  return response.data;
};

const changePassword = async function (form) {
  let changePasswordRequestDTO = {
    username: form.username,
    password: form.password,
    newPassword: form.newPassword
  };
  let response = await authApi.changePassword(changePasswordRequestDTO);
  return response.data;
};

export default {
  login,
  changePassword
}