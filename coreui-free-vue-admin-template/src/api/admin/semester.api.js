import axiosApps from "../apps.api";

const listSemester = async function () {
    return await axiosApps.post("/semester/list");
};

const createSemester = async function (semesterRequestDTO) {
    return await axiosApps.post("/semester/create", semesterRequestDTO);
};

const deleteSemester = async function (semesterRequestDTO) {
    return await axiosApps.post("/semester/delete", semesterRequestDTO);
};

export default {
    listSemester,
    createSemester,
    deleteSemester
}