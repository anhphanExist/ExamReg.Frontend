import examRoomApi from "../../api/admin/exam-room.api";

const listExamRoom = async function () {
  let response = await examRoomApi.listExamRoom();
  return response.data;
};

const createExamRoom = async function (form) {
  let examRoomRequestDTO = {
    roomNumber: form.roomNumber,
    amphitheaterName: form.amphitheaterName,
    computerNumber: form.computerNumber
  };
  let response = await examRoomApi.createExamRoom(examRoomRequestDTO);
  return response.data;
};

const updateExamRoom = async function (form) {
  let examRoomRequestDTO = {
    id: form.id,
    roomNumber: form.roomNumber,
    amphitheaterName: form.amphitheaterName,
    computerNumber: form.computerNumber
  };
  let response = await examRoomApi.updateExamRoom(examRoomRequestDTO);
  return response.data;
};

const deleteExamRoom = async function (form) {
  let examRoomRequestDTO = {
    id: form.id
  };
  let response = await examRoomApi.deleteExamRoom(examRoomRequestDTO);
  return response.data;
};

export default {
  listExamRoom,
  createExamRoom,
  updateExamRoom,
  deleteExamRoom
}