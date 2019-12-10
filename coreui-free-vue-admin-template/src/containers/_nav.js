export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavTitle",
        _children: ["Admin"]
      },
      {
        _name: "CSidebarNavItem",
        name: "Sinh viên",
        to: "/dashboard/student",
        icon: "cil-speedometer"
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
      {
        _name: "CSidebarNavItem",
        name: "Phòng thi",
        to: "/dashboard/room",
        icon: "cil-cursor"
      },
      {
        _name: "CSidebarNavItem",
        name: "Kì thi",
        to: "/dashboard/exam_period",
        icon: "cil-calculator"
      },
      {
        _name: "CSidebarNavItem",
        name: "Ca thi",
        to: "/dashboard/shift",
        icon: "cil-puzzle"
      }
    ]
  }
];
