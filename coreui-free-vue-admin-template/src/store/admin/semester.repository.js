import semesterService from "../../services/admin/semester.service";

const state = {
    listSemester: [],
    errors: []
};

const getters = {
    listSemester(state) {
        return state.listSemester;
    }
};

const mutations = {
    listSemester(state, listSemester) {
        state.listSemester = [...listSemester];
    }
};

const actions = {
    async listSemester({ commit }) {
        let data = await semesterService.listSemester();
        commit("listSemester", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
