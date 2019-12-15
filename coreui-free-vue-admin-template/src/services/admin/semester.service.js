import semesterApi from "../../api/admin/semester.api";

const listSemester = async function () {
  let response = await semesterApi.listSemester();
  return response.data;
};

const createSemester = async function (form) {
  let semesterRequestDTO = {
    startYear: form.startYear,
    endYear: form.endYear,
    isFirstHalf: form.isFirstHalf
  };
  let response = await semesterApi.createSemester(semesterRequestDTO);
  return response.data;
};

const deleteSemester = async function (form) {
  let semesterRequestDTO = {
    id: form.id
  };
  let response = await semesterApi.deleteSemester(semesterRequestDTO);
  return response.data;
};

export default {
  listSemester,
  createSemester,
  deleteSemester
}