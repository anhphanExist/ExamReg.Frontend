import axiosApps from "../apps.api";

const listStudent = async function() {
  return await axiosApps.post("/student/list");
};

const createStudent = async function(studentRequestDTO) {
  return await axiosApps.post("/student/create", studentRequestDTO);
};

const updateStudent = async function(studentRequestDTO) {
  return await axiosApps.post("/student/update", studentRequestDTO);
};

const deleteStudent = async function(studentRequestDTO) {
  return await axiosApps.post("/student/delete", studentRequestDTO);
};

const resetPassword = async function(studentRequestDTO) {
  return await axiosApps.post("/student/reset-password", studentRequestDTO);
};

const importStudent = async function(file) {
  return await axiosApps.post("/student/import-student", file, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const downloadStudentTemplate = async function() {
  return await axiosApps.get("/student/download-student-template", {
    responseType: "blob"
  });
};

const exportStudent = async function() {
  return await axiosApps.get("/student/export-student", {
    responseType: "blob"
  });
};

const importStudentTerm = async function(file) {
  return await axiosApps.post("/student/import-student-term", file, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

const downloadStudentTermTemplate = async function() {
  return await axiosApps.get("/student/download-student-term-template", {
    responseType: "blob"
  });
};

const exportStudentTerm = async function() {
  return await axiosApps.get("/student/export-student-term", {
    responseType: "blob"
  });
};

export default {
  listStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  resetPassword,
  importStudent,
  downloadStudentTemplate,
  exportStudent,
  importStudentTerm,
  downloadStudentTermTemplate,
  exportStudentTerm
};
