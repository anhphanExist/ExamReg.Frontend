import axiosApps from "../../api/apps.api";

const listExamRoomExamPeriod = async function () {
    return await axiosApps.post("/watcher/list");
};

const getCurrentExamProgram = async function () {
    return await axiosApps.post("/watcher/watcher-get-current-exam-program");
};

const exportStudent = async function (examPeriodId, examRoomId) {
    let url = "/watcher/export-student/" + examPeriodId + "/" + examRoomId;
    return await axiosApps.get(url, {
        responseType: "blob"
    });
};

export default {
    listExamRoomExamPeriod,
    getCurrentExamProgram,
    exportStudent
}