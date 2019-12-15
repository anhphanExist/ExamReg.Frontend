import registerApi from "../../api/student/register.api";

const listTerm = async function () {
  let response = await registerApi.listTerm();
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