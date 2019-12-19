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
  return await registerResultApi.printExamRegisterResult();
};

export default {
  getStudentInfo,
  getCurrentExamProgram,
  listExamRoomExamPeriod,
  printExamRegisterResult
}