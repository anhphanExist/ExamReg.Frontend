import axiosApps from "../apps.api";

const listExamProgram = async function () {
    return await axiosApps.post("/exam-program/list");
};

const createExamProgram = async function (examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/create", examProgramRequestDTO);
};

const updateExamProgram = async function (examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/update", examProgramRequestDTO);
};

const deleteExamProgram = async function (examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/delete", examProgramRequestDTO);
};

const dropListSemester = async function () {
    return await axiosApps.post("/exam-program/list-semester");
};

const setCurrentExamProgram = async function (examProgramRequestDTO) {
    return await axiosApps.post("/exam-program/set-current", examProgramRequestDTO);
};

export default {
    listExamProgram,
    createExamProgram,
    updateExamProgram,
    deleteExamProgram,
    dropListSemester,
    setCurrentExamProgram
}