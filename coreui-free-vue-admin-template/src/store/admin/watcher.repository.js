import watcherService from "../../services/admin/watcher.service";

const state = {
    listWatcher: [],
    errors: []
};

const getters = {
    listWatcher(state) {
        return state.listWatcher;
    }
};

const mutations = {
    listWatcher(state, listWatcher) {
        state.listWatcher = [...listWatcher];
    }
};

const actions = {
    async listWatcher({ commit }) {
        let data = await watcherService.listWatcher();
        commit("listWatcher", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
