import axiosApps from "../apps.api";

const getInfoStudent = async function() {
  return await axiosApps.post("/student-profile/get");
};

const update = async function(studentRequestDTO) {
  return await axiosApps.post("/student-profile/update", studentRequestDTO);
};

export default {
  getInfoStudent,
  update
}