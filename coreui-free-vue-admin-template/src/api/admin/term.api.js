import axiosApps from "../apps.api";

const listTerm = async function () {
    return await axiosApps.post("/term/list");
};

const createTerm = async function (termRequestDTO) {
    return await axiosApps.post("/term/create", termRequestDTO);
};

const updateTerm = async function (termRequestDTO) {
    return await axiosApps.post("/term/update", termRequestDTO);
};

const deleteTerm = async function (termRequestDTO) {
    return await axiosApps.post("/term/delete", termRequestDTO);
};

const importTerm = async function (file) {
    return await axiosApps.post("/term/import", file, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

const downloadTermTemplate = async function () {
    return await axiosApps.get("/term/download-template", {
        responseType: "blob"
    });
};

const exportTerm = async function () {
    return await axiosApps.get("/term/export", {
        responseType: "blob"
    });
};

const dropListSemester = async function () {
    return await axiosApps.post("/term/list-semester");
};

export default {
    listTerm,
    dropListSemester,
    createTerm,
    updateTerm,
    deleteTerm,
    importTerm,
    exportTerm,
    downloadTermTemplate
}