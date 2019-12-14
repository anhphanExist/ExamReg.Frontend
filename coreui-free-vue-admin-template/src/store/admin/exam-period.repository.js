import examPeriodService from "../../services/admin/exam-period.service";

const state = {
    listExamPeriod: [],
    errors: []
};

const getters = {
    listExamPeriod(state) {
        return state.listExamPeriod;
    }
};

const mutations = {
    listExamPeriod(state, listExamPeriod) {
        state.listExamPeriod = [...listExamPeriod];
    }
};

const actions = {
    async listExamPeriod({ commit }) {
        let data = await examPeriodService.listExamPeriod();
        commit("listExamPeriod", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
