import Vue from "vue";
import Vuex from "vuex";
import examPeriodRepository from "./admin/exam-period.repository";
import examProgramRepository from "./admin/exam-program.repository";
import examRoomRepository from "./admin/exam-room.repository";
import semesterRepository from "./admin/semester.repository";
import studentRepository from "./admin/student.repository";
import termRepository from "./admin/term.repository";
import watcherRepository from "./admin/watcher.repository";
import profileRepository from "./student/profile.repository";
import registerRepository from "./student/register.repository";
import registerResultRepository from "./student/register-result.repository";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
    
    },
    modules: {
        examPeriodRepository,
        examProgramRepository,
        examRoomRepository,
        semesterRepository,
        studentRepository,
        termRepository,
        watcherRepository,
        profileRepository,
        registerRepository,
        registerResultRepository
    }
});