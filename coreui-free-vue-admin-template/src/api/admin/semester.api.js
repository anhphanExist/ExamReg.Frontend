import axiosApps from "../apps.api";

const listSemester = function() {
    return await axiosApps.post("/semester/list");
}

const createSemester = function(semesterRequestDTO) {
    return await axiosApps.post("/semester/create", semesterRequestDTO);
}

const deleteSemester = function(semesterRequestDTO) {
    return await axiosApps.post("/semester/delete", semesterRequestDTO);
}

export default {
    listSemester,
    createSemester,
    deleteSemester
}