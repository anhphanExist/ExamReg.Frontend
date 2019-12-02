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
        name: "Kỳ thi",
        to: "/dashboard/semester",
        icon: "cil-drop"
      },
      {
        _name: "CSidebarNavItem",
        name: "Môn thi",
        to: "/dashboard/subject",
        icon: "cil-pencil"
      },
      {
        _name: "CSidebarNavItem",
        name: "Ca thi",
        to: "/dashboard/shift",
        icon: "cil-puzzle"
      },
      {
        _name: "CSidebarNavItem",
        name: "Phòng thi",
        to: "/dashboard/room",
        icon: "cil-cursor"
      }
    ]
  }
];
