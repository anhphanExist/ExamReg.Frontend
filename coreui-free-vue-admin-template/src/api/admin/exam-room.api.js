import axiosApps from "../apps.api";

const listExamRoom = function() {
    return await axiosApps.post("/exam-room/list");
}

const createExamRoom = function(examRoomRequestDTO) {
    return await axiosApps.post("/exam-room/create", examRoomRequestDTO);
}

const updateExamRoom = function(examRoomRequestDTO) {
    return await axiosApps.post("/exam-room/update", examRoomRequestDTO);
}

const deleteExamRoom = function(examRoomRequestDTO) {
    return await axiosApps.post("/exam-room/delete", examRoomRequestDTO);
}

export default {
    listExamRoom,
    createExamRoom,
    updateExamRoom,
    deleteExamRoom
}