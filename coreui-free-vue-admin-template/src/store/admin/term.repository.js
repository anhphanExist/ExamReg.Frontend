import termService from "../../services/admin/term.service";

const state = {
    listTerm: [],
    dropListSemester: [],
    errors: []
};

const getters = {
    listTerm(state) {
        return state.listTerm;
    },
    dropListSemester(state) {
        return state.dropListSemester;
    }
};

const mutations = {
    listTerm(state, listTerm) {
        state.listTerm = [...listTerm];
    },
    dropListSemester(state, dropListSemester) {
        state.dropListSemester = [...dropListSemester];
    }
};

const actions = {
    async listTerm({ commit }) {
        let data = await termService.listTerm();
        commit("listTerm", data);
    },
    async dropListSemester({ commit }) {
        let data = await termService.dropListSemester();
        commit("dropListSemester", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};