import watcherApi from "../../api/admin/watcher.api";

const listExamRoomExamPeriod = async function () {
  let response = await watcherApi.listExamRoomExamPeriod();
  return response.data;
};

const getCurrentExamProgram = async function () {
  let response = await watcherApi.getCurrentExamProgram();
  return response.data;
};

const exportStudent = async function (examPeriodId, examRoomId) {
  let response = await watcherApi.exportStudent(examPeriodId, examRoomId);
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = "Exam" + examPeriodId + "_" + examRoomId + ".xlsx";
  link.click();
};

export default {
  listExamRoomExamPeriod,
  getCurrentExamProgram,
  exportStudent
}