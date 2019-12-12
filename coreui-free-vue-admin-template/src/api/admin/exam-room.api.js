import axiosApps from "../apps.api";

const listExamRoom = async function () {
    return await axiosApps.post("/exam-room/list");
};

const createExamRoom = async function (examRoomRequestDTO) {
    return await axiosApps.post("/exam-room/create", examRoomRequestDTO);
};

const updateExamRoom = async function (examRoomRequestDTO) {
    return await axiosApps.post("/exam-room/update", examRoomRequestDTO);
};

const deleteExamRoom = async function (examRoomRequestDTO) {
    return await axiosApps.post("/exam-room/delete", examRoomRequestDTO);
};

export default {
    listExamRoom,
    createExamRoom,
    updateExamRoom,
    deleteExamRoom
}