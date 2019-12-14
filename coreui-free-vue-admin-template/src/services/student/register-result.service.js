import registerResultApi from "../../api/student/register-result.api";

const getStudentInfo = async function () {
  return await registerResultApi.getStudentInfo();
};

const getCurrentExamProgram = async function () {
  return await registerResultApi.getCurrentExamProgram();
};

const listExamRoomExamPeriod = async function () {
  return await registerResultApi.listExamRoomExamPeriod();
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