<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Room List
              <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="outline-info" @click="myModal = true" class="float-right mr-3">Add More</CButton>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="listExamRoom"
        :fields="fields"
        :items-per-page=50
        column-filter
        fixed
        hover
        sorter
        pagination
      >
        <template #number="{item, index}">
          <td>{{index + 1}}</td>
        </template>
        <template #edit="{item, index}">
          <td class="py-2">
            <CButton
              color="warning"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(index)"
            >Edit</CButton>
          </td>
        </template>
        <template #delete="{item, index}">
          <td class="py-2">
            <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="deleteExamRoom(item, index)"
            >Delete</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <!-- Modal -->
    <CModal title="Add more rooms" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Room Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="4">
                <CInput
                        label="Room Number"
                        v-model="roomNumber"
                        :is-valid="!$v.roomNumber.$invalid"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                        label="Amphitheater"
                        v-model="amphitheaterName"
                        :is-valid="!$v.amphitheaterName.$invalid"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                        label="PC Quantity"
                        v-model="computerNumber"
                        :is-valid="!$v.computerNumber.$invalid"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <p class="text-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</p>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton @click="addExamRoom" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import rooms_data from "./data/rooms";
import {required, integer, numeric} from "vuelidate/lib/validators";
import examRoomService from "../../../services/admin/exam-room.service";
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  { key: "roomNumber", label: "Room",_style: "width:17.5%" },
  { key: "amphitheaterName", label: "Amphitheater Name", _style: "width:17.5%" },
  { key: "computerNumber", label:"PC Quantity",_style: "width:17.5%" },
  {
    key: "edit",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  {
    key: "delete",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];
const items = rooms_data;
export default {
  name: "rooms",
  props: [],
  data() {
    return {
      myModal: false,
      items,
      fields,
      roomNumber: "",
      amphitheaterName: "",
      computerNumber: "",
      modalErrors: "",
      errors: ""
    };
  },
  computed: {
    listExamRoom() {
      return this.$store.getters.listExamRoom;
    }
  },
  validations: {
    roomNumber: {
      required,
      integer,
      numeric
    },
    amphitheaterName: {
      required
    },
    computerNumber: {
      required,
      numeric
    }
  },
  methods: {
    discardModal() {
      this.myModal = false;
      this.roomNumber = "";
      this.amphitheaterName = "";
      this.computerNumber = "";
      this.modalErrors = ""
    },
    async addExamRoom() {
      const form = {
        roomNumber: this.roomNumber,
        amphitheaterName: this.amphitheaterName,
        computerNumber: this.computerNumber
      };
      let res = await examRoomService.createExamRoom(form);
      if (res.errors.length > 0) {
        let temp = res.errors[0].split(".")[2];
        this.modalErrors = (" " + temp).slice(1);
      }
      else {
        this.myModal = false;
        this.modalErrors = "";
        await this.$store.dispatch("listExamRoom");
        this.roomNumber = "";
        this.amphitheaterName = "";
        this.computerNumber = "";
      }
    },
    async deleteExamRoom(item, index) {
      const form = {
        id: item.id
      };
      let res = await examRoomService.deleteExamRoom(form);
      if (!res.errors.length > 0) {
        this.errors = "";
        await this.$store.dispatch("listExamRoom");
      }
      else {
        let temp = res.errors[0].split(".")[2];
        this.errors = (" " + temp).slice(1);
      }
    }
  },
  async created() {
    await this.$store.dispatch("listExamRoom");
  }
};
</script>