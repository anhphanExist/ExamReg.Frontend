import examPeriodApi from "../../api/admin/exam-period.api";

const listExamPeriod = async function () {
  let response = await examPeriodApi.listExamPeriod();
  return response.data;
};

const createExamPeriod = async function (form) {
  let examPeriodRequestDTO = {
    examDate: form.examDate,
    startHour: form.startHour,
    finishHour: form.finishHour,
    subjectName: form.subjectName,
    examProgramId: form.examProgramId
  };
  let response = await examPeriodApi.createExamPeriod(examPeriodRequestDTO);
  return response.data;
};

const updateExamPeriod = async function (form) {
  let examPeriodRequestDTO = {
    id: form.id,
    examRooms: form.examRooms
  };
  let response = await examPeriodApi.updateExamPeriod(examPeriodRequestDTO);
  return response.data;
};

const deleteExamPeriod = async function (form) {
  let examPeriodRequestDTO = {
    id: form.id
  };
  let response = await examPeriodApi.deleteExamPeriod(examPeriodRequestDTO);
  return response.data;
};

const getCurrentExamProgram = async function () {
  let response = await examPeriodApi.getCurrentExamProgram();
  return response.data;
};

const dropListTerm = async function () {
  let response = await examPeriodApi.dropListTerm();
  return response.data;
};

const selectListAvailableExamRoom = async function (form) {
  let examRoomRequestFilterDTO = {
    examDate: form.examDate,
    startHour: form.startHour,
    finishHour: form.finishHour
  };
  let response = await examPeriodApi.selectListAvailableExamRoom(examRoomRequestFilterDTO);
  return response.data;
};

export default {
  listExamPeriod,
  createExamPeriod,
  updateExamPeriod,
  deleteExamPeriod,
  getCurrentExamProgram,
  dropListTerm,
  selectListAvailableExamRoom
}