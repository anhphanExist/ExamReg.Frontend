import examProgramService from "../../services/admin/exam-program.service";

const state = {
    listExamProgram: [],
    dropListSemester: [],
    errors: []
};

const getters = {
    listExamProgram(state) {
        return state.listExamProgram;
    },
    dropListSemester(state) {
        return state.dropListSemester;
    }
};

const mutations = {
    listExamProgram(state, listExamProgram) {
        state.listExamProgram = [...listExamProgram];
    },
    dropListSemester(state, dropListSemester) {
        state.dropListSemester = [...dropListSemester];
    }
};

const actions = {
    async listExamProgram({ commit }) {
        let data = await examProgramService.listExamProgram();
        commit("listExamProgram", data);
    },
    async dropListSemester({ commit }) {
        let data = await examProgramService.dropListSemester();
        commit("dropListSemester", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
