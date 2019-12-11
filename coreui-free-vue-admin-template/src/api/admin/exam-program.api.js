import axiosApps from "../apps.api";

const listExamProgram = function() {
    return await axiosApps.post("/exam-program/list");
}

const createExamProgram = function(examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/create", examProgramRequestDTO);
}

const updateExamProgram = function(examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/update", examProgramRequestDTO);
}

const deleteExamProgram = function(examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/delete", examProgramRequestDTO);
}

const dropListSemester = function() {
    return await axiosApps.post("/exam-program/list-semester");
}

const setCurrentExamProgram = function(examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/set-current", examProgramRequestDTO);
}

export default {
    listExamProgram,
    createExamProgram,
    updateExamProgram,
    deleteExamProgram,
    dropListSemester,
    setCurrentExamProgram
}