import studentApi from "../../api/admin/student.api";

const listStudent = async function () {
    let response = await studentApi.listStudent();
    return response.data;
};

const createStudent = async function (form) {
    let studentRequestDTO = {
        studentNumber: form.studentNumber,
        username: form.username,
        lastName: form.lastName,
        givenName: form.givenName,
        birthday: form.birthday,
        email: form.email
    };
    let response = await studentApi.createStudent(studentRequestDTO);
    return response.data;
};

const updateStudent = async function (form) {
    let studentRequestDTO = {
        id: form.id,
        studentNumber: form.studentNumber,
        username: form.username,
        lastName: form.lastName,
        givenName: form.givenName,
        birthday: form.birthday,
        email: form.email
    };
    let response = await studentApi.updateStudent(studentRequestDTO);
    return response.data;
};

const deleteStudent = async function (form) {
    let studentRequestDTO = {
        id: form.id,
        studentNumber: form.studentNumber,
        username: form.username,
        lastName: form.lastName,
        givenName: form.givenName,
        birthday: form.birthday,
        email: form.email
    };
    let response = await studentApi.deleteStudent(studentRequestDTO);
    return response.data;
};

const resetPassword = async function (form) {
    let studentRequestDTO = {
        id: form.id,
        studentNumber: form.studentNumber
    };
    let response = await studentApi.resetPassword(studentRequestDTO);
    return response.data;
};

const importStudent = async function (file) {
    // Tạo form data
    let formData = new FormData();
    // Gán file vào form
    formData.append("file", file);
    // gửi form cho api
    let response = await studentApi.importStudent(formData);
    return response.data;
};

const downloadStudentTemplate = async function () {
    let response = await studentApi.downloadStudentTemplate();
    let blob = await response.blob();
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    console.log(url);
    link.href = url;
    link.download = "StudentTemplate.xlsx";
    link.click();
};

const exportStudent = async function () {
    let response = await studentApi.exportStudent();
    let blob = await response.blob();
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    console.log(url);
    link.href = url;
    link.download = "Student.xlsx";
    link.click();
};

const importStudentTerm = async function (file) {
    // Tạo form data
    let formData = new FormData();
    // Gán file vào form
    formData.append("file", file);
    // gửi form cho api
    let response = await studentApi.importStudentTerm(formData);
    return response.data;
};

const downloadStudentTermTemplate = async function () {
    let response = await studentApi.downloadStudentTermTemplate();
    let blob = await response.blob();
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    console.log(url);
    link.href = url;
    link.download = "StudentTermTemplate.xlsx";
    link.click();
};

const exportStudentTerm = async function () {
    let response = await studentApi.exportStudentTerm();
    let blob = await response.blob();
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    console.log(url);
    link.href = url;
    link.download = "StudentTerm.xlsx";
    link.click();
};

export default {
    listStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    resetPassword,
    importStudent,
    downloadStudentTemplate,
    exportStudent,
    importStudentTerm,
    downloadStudentTermTemplate,
    exportStudentTerm
};
