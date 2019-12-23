import Vue from "vue";
import Router from "vue-router";
import Cookies from "js-cookie";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");

// Main components
const Dashboard = () => import("@/views/main-admin/Dashboard");
const TestView = () => import("@/views/TestView");

//Side bar
const Room = () => import("@/views/main-admin/content-views/Room");
const Semester = () => import("@/views/main-admin/content-views/Semester");
const ExamProgram = () => import("@/views/main-admin/content-views/ExamProgram");
const Shift = () => import("@/views/main-admin/content-views/Shift");
const Student = () => import("@/views/main-admin/content-views/Student");
const Term = () => import("@/views/main-admin/content-views/Term");

// Student-role component
const StudentContainer = () => import("@/containers-student/TheContainer");
const TestRegister = () => import ("@/views/main-student/TestRegister");
const RegistrationResult = () => import("@/views/main-student/RegistrationResult");

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: () => ({y: 0}),
  routes: configRoutes()
});

function configRoutes() {
  return [
    {
      path: "/",
      name: "Quản trị viên",
      redirect: "/dashboard",
      component: TheContainer,
      beforeEnter(to, from, next) {
        if (Cookies.get("token")) {
          let isAdmin = JSON.parse(Cookies.get("isAdmin"));
          if (isAdmin)
            next();
          else
            next("/student-role");
        } else {
          next("/login");
        }
      },
      children: [
        // {
        //   path: "dashboard/student/test-register",
        //   name: "",
        //   component: TestRegister
        // },
        {
          path: "dashboard",
          name: "Theo dõi đăng ký thi",
          component: Dashboard
        },
        {
          path: "/dashboard/room",
          name: "Phòng thi",
          component: Room
        },
        {
          path: "/dashboard/semester",
          name: "Kì học",
          component: Semester
        },
        {
          path: "/dashboard/shift",
          name: "Ca thi",
          component: Shift
        },
        {
          path: "/dashboard/student",
          name: "Sinh viên",
          component: Student
        },
        {
          path: "/dashboard/subject",
          name: "Môn học",
          component: Term
        },
        {
          path: "/dashboard/exam-program",
          name: "Kì thi",
          component: ExamProgram
        },
        // {
        //   path: "/dashboard/test",
        //   component: TestView
        // }
      ]
    },
    {
      path: "/student-role",
      name: "Sinh viên",
      component: StudentContainer,
      beforeEnter(to, from, next) {
        if (Cookies.get("token")) {
          let isAdmin = JSON.parse(Cookies.get("isAdmin"));
          if (!isAdmin)
            next();
          else
            next("/dashboard");
        } else {
          next("/login");
        }
      },
      redirect: "student-role/registration-result",
      children: [{
        path: "/student-role/exam-registration",
        name: "Đăng ký thi",
        component: TestRegister,
      },
        {
          path: "/student-role/registration-result",
          name: "Phiếu báo dự thi",
          component: RegistrationResult
        },
      ]
    },
    {
      path: "/login",
      name: "Đăng nhập",
      component: Login,
      beforeEnter(to, from, next) {
        if (!Cookies.get("token")) {
          next();
        } else {
          next("/dashboard");
        }
      }
    },
  ];
}
