import axiosApps from "../apps.api";

const getStudentInfo = async function () {
  return await axiosApps.post("/exam-register-result/get-student-info");
};

const getCurrentExamProgram = async function () {
  return await axiosApps.post("/exam-register-result/result-get-current-exam-program");
};

const listExamRoomExamPeriod = async function () {
  return await axiosApps.post("/exam-register-result/list");
};

const printExamRegisterResult = async function () {
  return await axiosApps.get("/exam-register-result/print", {
    responseType: "blob"
  });
};

export default {
  getStudentInfo,
  getCurrentExamProgram,
  listExamRoomExamPeriod,
  printExamRegisterResult
}