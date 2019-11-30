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
        to: "/dashboard",
        icon: "cil-speedometer"
      },
      {
        _name: "CSidebarNavItem",
        name: "Kỳ thi",
        to: "/dashboard",
        icon: "cil-drop"
      },
      {
        _name: "CSidebarNavItem",
        name: "Môn thi",
        to: "/dashboard",
        icon: "cil-pencil"
      },
      {
        _name: "CSidebarNavItem",
        name: "Ca thi",
        to: "/",
        icon: "cil-puzzle"
      },
      {
        _name: "CSidebarNavItem",
        name: "Phòng thi",
        to: "/",
        icon: "cil-cursor"
      }
    ]
  }
];
