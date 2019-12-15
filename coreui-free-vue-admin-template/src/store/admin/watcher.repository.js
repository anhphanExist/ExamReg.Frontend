import watcherService from "../../services/admin/watcher.service";

const state = {
    listExamRoomExamPeriod: [],
    errors: []
};

const getters = {
    listExamRoomExamPeriod(state) {
        return state.listExamRoomExamPeriod;
    }
};

const mutations = {
    listExamRoomExamPeriod(state, listExamRoomExamPeriod) {
        state.listExamRoomExamPeriod = [...listExamRoomExamPeriod];
    }
};

const actions = {
    async listExamRoomExamPeriod({ commit }) {
        let data = await watcherService.listExamRoomExamPeriod();
        commit("listExamRoomExamPeriod", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
