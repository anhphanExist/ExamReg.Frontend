import watcherService from "../../services/admin/watcher.service";

const state = {
    watcherListExamRoomExamPeriod: [],
    watcherCurrentExamProgram: {},
    errors: []
};

const getters = {
    watcherListExamRoomExamPeriod(state) {
        return state.watcherListExamRoomExamPeriod;
    },
    watcherCurrentExamProgram(state) {
        return state.watcherListExamRoomExamPeriod;
    }
};

const mutations = {
    watcherListExamRoomExamPeriod(state, listExamRoomExamPeriod) {
        state.watcherListExamRoomExamPeriod = [...listExamRoomExamPeriod];
    },
    watcherCurrentExamProgram(state, currentExamProgram) {
        state.watcherCurrentExamProgram = {...currentExamProgram};
    }
};

const actions = {
    async watcherListExamRoomExamPeriod({ commit }) {
        let data = await watcherService.listExamRoomExamPeriod();
        commit("watcherListExamRoomExamPeriod", data);
    },
    async watcherCurrentExamProgram({commit}) {
        let data = await watcherService.getCurrentExamProgram();
        commit("watcherCurrentExamProgram", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
