import studentService from "../../services/admin/student.service";
const state = {
    listStudent: [],
    errors: []
};

const getters = {
    listStudent(state) {
        return state.listStudent;
    }
};

const mutations = {
    listStudent(state, listStudent) {
        state.listStudent = [...listStudent];
    },
    setErrors(state, errors) {
        state.errors = [...errors];
    }
};

const actions = {
    async listStudent({ commit }) {
        let data = await studentService.listStudent();
        commit("listStudent", data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
