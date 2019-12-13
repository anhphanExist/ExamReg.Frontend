import watcherApi from "../../api/admin/watcher.api";

const listExamRoomExamPeriod = async function () {
  let response = await watcherApi.listExamRoomExamPeriod();
  return response.data;
};

const getCurrentExamProgram = async function () {
};

const exportStudent = async function (examPeriodId, examRoomId) {

};

export default {
  listExamRoomExamPeriod,
  getCurrentExamProgram,
  exportStudent
}