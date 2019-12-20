import watcherApi from "../../api/admin/watcher.api";

const listExamRoomExamPeriod = async function () {
  let response = await watcherApi.listExamRoomExamPeriod();
  return response.data;
};

const getCurrentExamProgram = async function () {
  let response = await watcherApi.getCurrentExamProgram();
  return response.data;
};

const exportStudent = async function (form) {
  let response = await watcherApi.exportStudent(form.examPeriodId, form.examRoomId);
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = "Exam" +
      form.examProgramName + "_" +
      form.examRoomNumber +
      form.examRoomAmphitheaterName + "_" +
      form.examDate + "_" +
      form.startHour + "_" +
      form.finishHour + "_" +
      form.subjectName +
      ".xlsx";
  link.click();
};

export default {
  listExamRoomExamPeriod,
  getCurrentExamProgram,
  exportStudent
}