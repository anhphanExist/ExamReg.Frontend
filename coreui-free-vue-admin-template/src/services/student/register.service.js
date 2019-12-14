import registerApi from "../../api/student/register.api";

const listTerm = async function (form) {
  let termRequestFilterDTO = {
    studentNumber: form.studentNumber,
    semesterId: form.semesterId,
    semesterCode: form.semesterCode
  };
  let response = await registerApi.listTerm(termRequestFilterDTO);
  return response.data;
};

const listCurrentExamPeriod = async function () {
  let response = await registerApi.listCurrentExamPeriod();
  return response.data;
};

const registerExam = async function (form) {
  let registerRequestDTO = {
    examPeriods: form.examPeriods
  };
  let response = await registerApi.registerExam(registerRequestDTO);
  return response.data;
};

const getCurrentExamProgram = async function () {
  let response = await registerApi.getCurrentExamProgram();
  return response.data;
};

export default {
  listTerm,
  listCurrentExamPeriod,
  registerExam,
  getCurrentExamProgram
};