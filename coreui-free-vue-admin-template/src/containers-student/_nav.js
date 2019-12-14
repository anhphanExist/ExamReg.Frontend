export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavTitle",
        _children: ["Student"]
      },
      {
        _name: "CSidebarNavItem",
        name: "Exam Registration",
        to: "/student-role/exam-registration",
        icon: "cil-speedometer"
      },
      {
        _name: "CSidebarNavItem",
        name: "Registration Result",
        to: "/student-role/registration-result",
        icon: "cil-drop"
      },
    ]
  }
];
