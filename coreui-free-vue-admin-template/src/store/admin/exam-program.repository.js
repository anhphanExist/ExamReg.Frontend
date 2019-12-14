import examProgramService from "../../services/admin/exam-program.service";

const state = {
    listExamProgram: [],
    errors: []
};

const getters = {
    listExamProgram(state) {
        return state.listExamProgram;
    }
};

const mutations = {
    listExamProgram(state, listExamProgram) {
        state.listExamProgram = [...listExamProgram];
    }
};

const actions = {
    async listExamProgram({ commit }) {
        let data = await examProgramService.listExamProgram();
        commit("listExamProgram", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
