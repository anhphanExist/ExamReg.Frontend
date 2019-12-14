import examRoomService from "../../services/admin/exam-room.service";

const state = {
    listExamRoom: [],
    errors: []
};

const getters = {
    listExamRoom(state) {
        return state.listExamRoom;
    }
};

const mutations = {
    listExamRoom(state, listExamRoom) {
        state.listExamRoom = [...listExamRoom];
    }
};

const actions = {
    async listExamRoom({ commit }) {
        let data = await examRoomService.listExamRoom();
        commit("listExamRoom", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
