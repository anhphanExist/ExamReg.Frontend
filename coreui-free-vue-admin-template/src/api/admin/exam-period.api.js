import axiosApps from "../apps.api";

const listExamPeriod = async function () {
    return await axiosApps.post("/exam-period/list");
};

const createExamPeriod = async function (examPeriodRequestDTO) {
    return await axiosApps.post("/exam-period/create", examPeriodRequestDTO);
};

const updateExamPeriod = async function (examPeriodRequestDTO) {
    return await axiosApps.post("/exam-period/update", examPeriodRequestDTO);
};

const deleteExamPeriod = async function (examPeriodRequestDTO) {
    return await axiosApps.post("/exam-period/delete", examPeriodRequestDTO);
};

const getCurrentExamProgram = async function () {
    return await axiosApps.post("/exam-period/period-get-current-exam-program")
};

const dropListTerm = async function (termRequestFilterDTO) {
    return await axiosApps.post("/exam-period/list-term", termRequestFilterDTO);
};

const selectListAvailableExamRoom = async function (examRoomFilterDTO) {
    return await axiosApps.post("/exam-period/list-available-exam-room", examRoomFilterDTO);
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