export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavTitle",
        _children: ["Sinh viên"]
      },
      {
        _name: "CSidebarNavItem",
        name: "Đăng ký thi",
        to: "/student-role/exam-registration",
        icon: "cil-speedometer"
      },
      {
        _name: "CSidebarNavItem",
        name: "Phiếu báo dự thi",
        to: "/student-role/registration-result",
        icon: "cil-drop"
      },
    ]
  }
];
