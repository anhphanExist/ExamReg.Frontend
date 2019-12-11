import termApi from "../../api/admin/term.api";

const listTerm = async function(form) {
  let termRequestFilterDTO = {
    semesterId: form.semesterId,
    semesterCode: form.semesterCode
  };
  let response = await termApi.listTerm(termRequestFilterDTO);
  return response.data;
};

const createTerm = async function(form) {
  let termRequestDTO = {
    subjectName: form.subjectName,
    semesterCode: form.semesterCode
  };
  let response = await termApi.createTerm(termRequestDTO);
  return response.data;
};

const updateTerm = async function(form) {
  let termRequestDTO = {
    id: form.id,
    subjectName: form.subjectName,
    semesterCode: form.semesterCode
  };
  let response = await termApi.updateTerm(termRequestDTO);
  return response.data;
};

const deleteTerm = async function(form) {
  let termRequestDTO = {
    id: form.id,
    subjectName: form.subjectName,
    semesterCode: form.semesterCode
  };
  let response = await termApi.deleteTerm(termRequestDTO);
  return response.data;
};

const importTerm = async function(file) {
  // Tạo form data
  let formData = new FormData();
  // Gán file vào form
  formData.append("file", file);
  // gửi form cho api
  let response = await termApi.importTerm(formData);
  return response.data;
};

const downloadTermTemplate = async function() {
  let response = await termApi.downloadTermTemplate();
  let blob = await response.blob();
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  console.log(url);
  link.href = url;
  link.download = "TermTemplate.xlsx";
  link.click();
};

const exportTerm = async function() {
  let response = await termApi.exportTerm();
  let blob = await response.blob();
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  console.log(url);
  link.href = url;
  link.download = "Term.xlsx";
  link.click();
};

const dropListSemester = async function() {};

export default {
  listTerm,
  createTerm,
  updateTerm,
  deleteTerm,
  importTerm,
  downloadTermTemplate,
  exportTerm
};
