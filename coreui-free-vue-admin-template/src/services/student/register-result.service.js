import registerResultApi from "../../api/student/register-result.api";

const getStudentInfo = async function () {
  let response = await registerResultApi.getStudentInfo();
  return response.data;
};

const getCurrentExamProgram = async function () {
  let response = await registerResultApi.getCurrentExamProgram();
  return response.data;
};

const listExamRoomExamPeriod = async function () {
  let response = await registerResultApi.listExamRoomExamPeriod();
  return response.data;
};

const printExamRegisterResult = async function () {
  let response = await registerResultApi.printExamRegisterResult();
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = "RegisterResult.docx";
  link.click();
};

export default {
  getStudentInfo,
  getCurrentExamProgram,
  listExamRoomExamPeriod,
  printExamRegisterResult
}