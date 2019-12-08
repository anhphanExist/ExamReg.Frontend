import Vue from "vue";
import Router from "vue-router";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
// const Dashboard = () => import("@/views/Dashboard");

const Colors = () => import("@/views/theme/Colors");
const Typography = () => import("@/views/theme/Typography");

const Charts = () => import("@/views/charts/Charts");
const Widgets = () => import("@/views/widgets/Widgets");

// Views - Components
const Cards = () => import("@/views/base/Cards");
const Forms = () => import("@/views/base/Forms");
const Switches = () => import("@/views/base/Switches");
const Tables = () => import("@/views/base/Tables");
const Tabs = () => import("@/views/base/Tabs");
const Breadcrumbs = () => import("@/views/base/Breadcrumbs");
const Carousels = () => import("@/views/base/Carousels");
const Collapses = () => import("@/views/base/Collapses");
const Jumbotrons = () => import("@/views/base/Jumbotrons");
const ListGroups = () => import("@/views/base/ListGroups");
const Navs = () => import("@/views/base/Navs");
const Navbars = () => import("@/views/base/Navbars");
const Paginations = () => import("@/views/base/Paginations");
const Popovers = () => import("@/views/base/Popovers");
const ProgressBars = () => import("@/views/base/ProgressBars");
const Tooltips = () => import("@/views/base/Tooltips");

// Views - Buttons
const StandardButtons = () => import("@/views/buttons/StandardButtons");
const ButtonGroups = () => import("@/views/buttons/ButtonGroups");
const Dropdowns = () => import("@/views/buttons/Dropdowns");
const BrandButtons = () => import("@/views/buttons/BrandButtons");

// Views - Icons
const CoreUIIcons = () => import("@/views/icons/CoreUIIcons");
const Brands = () => import("@/views/icons/Brands");
const Flags = () => import("@/views/icons/Flags");

// Views - Notifications
const Alerts = () => import("@/views/notifications/Alerts");
const Badges = () => import("@/views/notifications/Badges");
const Modals = () => import("@/views/notifications/Modals");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");

// Users
const Users = () => import("@/views/users/Users");
const User = () => import("@/views/users/User");

// Main components 
const Dashboard = () => import("@/views/main-admin/Dashboard")
//Side bar
const Room = () => import("@/views/main-admin/content-views/Room")
const Semester = () => import("@/views/main-admin/content-views/Semester")
const ExamPeriod = () => import("@/views/main-admin/content-views/ExamPeriod")
const Shift = () => import("@/views/main-admin/content-views/Shift")
const Student = () => import("@/views/main-admin/content-views/Student")
const Subject = () => import("@/views/main-admin/content-views/Subject")

Vue.use(Router);

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Main",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "",
          component: Dashboard
        },
        {
          path: "dashboard/room",
          name: "Room",
          component: Room
        },
        {
          path: "/dashboard/semester",
          name: "Semester",
          component: Semester
        },
        {
          path: "/dashboard/shift",
          name: "Shift",
          component: Shift
        },
        {
          path: "/dashboard/student",
          name: "Student",
          component: Student
        },
        {
          path: "/dashboard/subject",
          name: "Subject",
          component: Subject
        },
        {
          path: "/dashboard/exam_period",
          name: "ExamPeriod",
          component: ExamPeriod
        }
      ]
    }
  ];
}