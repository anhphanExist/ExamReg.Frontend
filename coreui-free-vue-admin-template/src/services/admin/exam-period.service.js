import examPeriodApi from "../../api/admin/exam-period.api";

const listExamPeriod = async function () {
  let response = await examPeriodApi.listExamPeriod();
  return response.data;
};

const createExamPeriod = async function (form) {

};

const updateExamPeriod = async function (form) {

};

const deleteExamPeriod = async function (form) {

};

const getCurrentExamProgram = async function () {

};

const dropListTerm = async function (form) {

};

const selectListAvailableExamRoom = async function (form) {

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