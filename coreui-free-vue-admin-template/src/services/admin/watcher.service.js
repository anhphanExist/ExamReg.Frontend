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
  let blob = await response.blob();
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  console.log(url);
  link.href = url;
  link.download = "Exam" + examPeriodId + "_" + examRoomId + ".docx";
  link.click();
};

export default {
  listExamRoomExamPeriod,
  getCurrentExamProgram,
  exportStudent
}