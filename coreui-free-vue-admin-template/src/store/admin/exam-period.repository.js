import examPeriodService from "../../services/admin/exam-period.service";

const state = {
    listExamPeriod: [],
    examPeriodCurrentExamProgram: {},
    examPeriodDropListTerm: [],
    errors: []
};

const getters = {
    listExamPeriod(state) {
        return state.listExamPeriod;
    },
    examPeriodCurrentExamProgram(state) {
        return state.examPeriodCurrentExamProgram;
    },
    examPeriodDropListTerm(state) {
        return state.examPeriodDropListTerm;
    }
};

const mutations = {
    listExamPeriod(state, listExamPeriod) {
        state.listExamPeriod = [...listExamPeriod];
    },
    examPeriodCurrentExamProgram(state, examPeriodCurrentExamProgram) {
        state.examPeriodCurrentExamProgram = {...examPeriodCurrentExamProgram};
    },
    examPeriodDropListTerm(state, examPeriodDropListTerm) {
        state.examPeriodDropListTerm = [...examPeriodDropListTerm];
    }
};

const actions = {
    async listExamPeriod({ commit }) {
        let data = await examPeriodService.listExamPeriod();
        commit("listExamPeriod", data);
    },
    async examPeriodCurrentExamProgram({ commit }) {
        let data = await examPeriodService.getCurrentExamProgram();
        commit("examPeriodCurrentExamProgram", data);
    },
    async examPeriodDropListTerm({ commit }) {
        let data = await examPeriodService.dropListTerm();
        commit("examPeriodDropListTerm", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
