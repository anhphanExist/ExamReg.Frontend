import termService from "../../services/admin/term.service";

const state = {
    listTerm: [],
    termDropListSemester: [],
    errors: []
};

const getters = {
    listTerm(state) {
        return state.listTerm;
    },
    termDropListSemester(state) {
        return state.termDropListSemester;
    }
};

const mutations = {
    listTerm(state, listTerm) {
        state.listTerm = [...listTerm];
    },
    termDropListSemester(state, termDropListSemester) {
        state.termDropListSemester = [...termDropListSemester];
    }
};

const actions = {
    async listTerm({ commit }) {
        let data = await termService.listTerm();
        commit("listTerm", data);
    },
    async termDropListSemester({ commit }) {
        let data = await termService.dropListSemester();
        commit("termDropListSemester", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};