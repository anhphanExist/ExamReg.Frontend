import registerService from "../../services/student/register.service";

const state = {
  registerListTerm: [],
  registerListCurrentExamPeriod: [],
  registerCurrentExamProgram: {}
};

const getters = {
  registerListTerm(state) {
    return state.registerListTerm;
  },
  registerListCurrentExamPeriod(state) {
    return state.registerListCurrentExamPeriod;
  },
  registerCurrentExamProgram(state) {
    return state.registerCurrentExamProgram;
  }
};

const mutations = {
  registerListTerm(state, listTerm) {
    state.registerListTerm = [...listTerm];
  },
  registerListCurrentExamPeriod(state, listCurrentExamPeriod) {
    state.registerListCurrentExamPeriod = [...listCurrentExamPeriod];
  },
  registerCurrentExamProgram(state, currentExamProgram) {
    state.registerCurrentExamProgram = {...currentExamProgram};
  }
};

const actions = {
  async registerListTerm({commit}) {
    let data = await registerService.listTerm();
    commit("registerListTerm", data);
  },
  async registerListCurrentExamPeriod({commit}) {
    let data = await registerService.listCurrentExamPeriod();
    commit("registerListCurrentExamPeriod", data);
  },
  async registerCurrentExamProgram({commit}) {
    let data = await registerService.getCurrentExamProgram();
    commit("registerCurrentExamProgram", data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
