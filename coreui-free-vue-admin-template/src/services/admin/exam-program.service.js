import examProgramApi from "../../api/admin/exam-program.api";

const listExamProgram = async function () {
  let response = await examProgramApi.listExamProgram();
  return response.data;
};

const createExamProgram = async function (form) {
  let examProgramRequestDTO = {
    name: form.name,
    semesterCode: form.semesterCode
  };
  let response = await examProgramApi.createExamProgram(examProgramRequestDTO);
  return response.data;
};

const updateExamProgram = async function (form) {
  let examProgramRequestDTO = {
    id: form.id,
    name: form.name,
    semesterCode: form.semesterCode
  };
  let response = await examProgramApi.updateExamProgram(examProgramRequestDTO);
  return response.data;
};

const deleteExamProgram = async function (form) {
  let examProgramRequestDTO = {
    id: form.id
  };
  let response = await examProgramApi.deleteExamProgram(examProgramRequestDTO);
  return response.data;
};

const dropListSemester = async function () {
  let response = await examProgramApi.dropListSemester();
  return response.data;
};

const setCurrentExamProgram = async function (form) {
  let examProgramRequestDTO = {
    id: form.id
  };
  let response = await examProgramApi.setCurrentExamProgram(examProgramRequestDTO);
  return response.data;
  
};

export default {
  listExamProgram,
  createExamProgram,
  updateExamProgram,
  deleteExamProgram,
  dropListSemester,
  setCurrentExamProgram
}