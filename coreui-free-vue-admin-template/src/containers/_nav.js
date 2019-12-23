export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavTitle",
        _children: ["Quản trị viên"]
      },
      {
        _name: "CSidebarNavItem",
        name: "Sinh viên",
        to: "/dashboard/student",
        icon: "cil-people"
      },
      {
        _name: "CSidebarNavItem",
        name: "Kỳ học",
        to: "/dashboard/semester",
        icon: "cil-drop"
      },
      {
        _name: "CSidebarNavItem",
        name: "Môn học",
        to: "/dashboard/subject",
        icon: "cil-pencil"
      },
      // {
      //   _name: "CSidebarNavItem",
      //   name: "Sinh viên môn học",
      //   to: "/dashboard",
      //   icon: "cil-check"
      // },
      {
        _name: "CSidebarNavItem",
        name: "Phòng thi",
        to: "/dashboard/room",
        icon: "cil-location-pin"
      },
      {
        _name: "CSidebarNavItem",
        name: "Kì thi",
        to: "/dashboard/exam-program",
        icon: "cil-calculator"
      },
      {
        _name: "CSidebarNavItem",
        name: "Ca thi",
        to: "/dashboard/shift",
        icon: "cil-puzzle"
      },
      {
        _name: "CSidebarNavItem",
        name: "Theo dõi",
        to: "/dashboard",
        icon: "cil-laptop"
      }
    ]
  }
];
