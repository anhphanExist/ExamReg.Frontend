import axiosApps from "../../api/apps.api";

const listTerm = async function() {
    return await axiosApps.post("/exam-register/list-term");
};

const listCurrentExamPeriod = async function() {
    return await axiosApps.post("/exam-register/list-current-exam-period");
};

const registerExam = async function(registerRequestDTO) {
    return await axiosApps.post("/exam-register/register-exam", registerRequestDTO);
};

const getCurrentExamProgram = async function() {
    return await axiosApps.post("/exam-register/register-get-current-exam-program");
};

export default {
  listTerm,
  listCurrentExamPeriod,
  registerExam,
  getCurrentExamProgram
};
