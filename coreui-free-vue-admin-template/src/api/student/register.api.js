import axiosApps from "../../api/apps.api";

const listTerm = function(termRequestFilterDTO) {
    return await axiosApps.post("/exam-register/list-term", termRequestFilterDTO);
};

const listCurrentExamPeriod = function() {
    return await axiosApps.post("/exam-register/list-current-exam-period");
};

const registerExam = function(registerRequestDTO) {
    return await axiosApps.post("/exam-register/register-exam", registerRequestDTO);
};

const getCurrentExamProgram = function() {
    return await axiosApps.post("/exam-register/register-get-current-exam-program");
};

export default {
  listTerm,
  listCurrentExamPeriod,
  registerExam,
  getCurrentExamProgram
};
