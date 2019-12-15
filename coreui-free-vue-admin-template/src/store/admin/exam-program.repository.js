import examProgramService from "../../services/admin/exam-program.service";

const state = {
    listExamProgram: [],
    examProgramDropListSemester: [],
    errors: []
};

const getters = {
    listExamProgram(state) {
        return state.listExamProgram;
    },
    examProgramDropListSemester(state) {
        return state.examProgramDropListSemester;
    }
};

const mutations = {
    listExamProgram(state, listExamProgram) {
        state.listExamProgram = [...listExamProgram];
    },
    examProgramDropListSemester(state, examProgramDropListSemester) {
        state.examProgramDropListSemester = [...examProgramDropListSemester];
    }
};

const actions = {
    async listExamProgram({ commit }) {
        let data = await examProgramService.listExamProgram();
        commit("listExamProgram", data);
    },
    async examProgramDropListSemester({ commit }) {
        let data = await examProgramService.dropListSemester();
        commit("examProgramDropListSemester", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
