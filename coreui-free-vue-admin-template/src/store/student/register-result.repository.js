import registerResultService from "../../services/student/register-result.service";

const state = {
    registerResultCurrentExamProgram: {},
    registerResultStudentInfo: {},
    registerResultListExamRoomExamPeriod: []
};

const getters = {
    registerResultCurrentExamProgram(state) {
        return state.registerResultCurrentExamProgram;
    },
    registerResultStudentInfo(state) {
        return state.registerResultStudentInfo;
    },
    registerResultListExamRoomExamPeriod(state) {
        return state.registerResultListExamRoomExamPeriod;
    }
};

const mutations = {
    registerResultCurrentExamProgram(state, currentExamProgram) {
        state.registerResultCurrentExamProgram = {...currentExamProgram};
    },
    registerResultStudentInfo(state, studentInfo) {
        state.registerResultStudentInfo = {...studentInfo};
    },
    registerResultListExamRoomExamPeriod(state, listExamRoomExamPeriod) {
        state.registerResultListExamRoomExamPeriod = [...listExamRoomExamPeriod];
    }
};

const actions = {
    async registerResultCurrentExamProgram({commit}) {
        let data = await registerResultService.getCurrentExamProgram();
        commit("registerResultCurrentExamProgram", data);
    },
    async registerResultStudentInfo({commit}) {
        let data = await registerResultService.getStudentInfo();
        commit("registerResultStudentInfo", data);
    },
    async registerResultListExamRoomExamPeriod({commit}) {
        let data = await registerResultService.listExamRoomExamPeriod();
        commit("registerResultListExamRoomExamPeriod", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
