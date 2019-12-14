import termService from "../../services/admin/term.service";

const state = {
    listTerm: [],
    errors: []
};

const getters = {
    listTerm(state) {
        return state.listTerm;
    }
};

const mutations = {
    listTerm(state, listTerm) {
        state.listTerm = [...listTerm];
    }
};

const actions = {
    async listTerm({ commit }) {
        let data = await termService.listTerm();
        commit("listTerm", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};