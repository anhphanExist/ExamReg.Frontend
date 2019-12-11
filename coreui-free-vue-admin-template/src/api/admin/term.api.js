import axiosApps from "../apps.api";

const listTerm = function(termRequestFilterDTO) {
    return await axiosApps.post("/term/list", termRequestFilterDTO);
}

const createTerm = function(termRequestDTO) {
    return await axiosApps.post("/term/create", termRequestDTO);
}

const updateTerm = function(termRequestDTO) {
    return await axiosApps.post("/term/update", termRequestDTO);
}

const deleteTerm = function(termRequestDTO) {
    return await axiosApps.post("/term/delete", termRequestDTO);
}

const importTerm = function(file) {
    return await axiosApps.post("/term/import", file, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
}

const downloadTermTemplate = function() {
    return await axiosApps.get("/term/download-template", {
        responseType: "blob"
      });
}

const exportTerm = function() {
    return await axiosApps.get("/term/export", {
        responseType: "blob"
      });
}

const dropListSemester = function() {
    return await axiosApps.post("/term/list-semester");
}

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