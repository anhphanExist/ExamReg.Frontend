import axiosApps from "../apps.api";

const listExamPeriod = function() {
    return await axiosApps.post("/exam-period/list");
}

const createExamPeriod = function(examPeriodRequestDTO) {
    return await axiosApps.post("/exam-period/create", examPeriodRequestDTO);
}

const updateExamPeriod = function(examPeriodRequestDTO) {
    return await axiosApps.post("/exam-period/update", examPeriodRequestDTO);
}

const deleteExamPeriod = function(examPeriodRequestDTO) {
    return await axiosApps.post("/exam-period/delete", examPeriodRequestDTO);
}

const getCurrentExamProgram = function() {
    return await axiosApps.post("/exam-period/period-get-current-exam-program")
}

const dropListTerm = function(termRequestFilterDTO) {
    return await axiosApps.post("/exam-period/list-term", termRequestFilterDTO);
}

const selectListAvailableExamRoom = function(examRoomFilterDTO) {
    return await axiosApps.post("/exam-period/list-available-exam-room", examRoomFilterDTO);
}

export default {
    listExamPeriod,
    createExamPeriod,
    updateExamPeriod,
    deleteExamPeriod,
    getCurrentExamProgram,
    dropListTerm,
    selectListAvailableExamRoom
}