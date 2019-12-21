<template>
  <div>
    <CCard v-if="!spinner">
      <CCardHeader>
        <slot name="header">
          <CRow>
            <CCol sm="5">
              <div class="pt-2">
                <CIcon name="cil-grid"/>
                Room List
                <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
              </div>
            </CCol>
            <CCol class="d-none d-md-block" sm="7">
              <CButton @click="myModal = true" class="float-right mr-3" color="outline-info">Add More</CButton>
            </CCol>
          </CRow>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
                :fields="fields"
                :items="listExamRoom"
                :items-per-page=50
                column-filter
                fixed
                hover
                pagination
                sorter
        >
          <template #number="{item, index}">
            <td>{{index + 1}}</td>
          </template>
          <template #edit="{item, index}">
            <td class="py-2">
              <CButton
                      @click="toggleDetails(index)"
                      color="warning"
                      size="sm"
                      square
                      variant="outline"
              >Edit
              </CButton>
            </td>
          </template>
          <template #delete="{item, index}">
            <td class="py-2">
              <CButton
                      @click="deleteExamRoom(item, index)"
                      color="danger"
                      size="sm"
                      square
                      variant="outline"
              >Delete
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <!-- Modal -->
    <CModal :centered="true" :show.sync="myModal" color="info" title="Add more rooms">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Room Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="4">
                <CInput
                        :is-valid="!$v.roomNumber.$invalid"
                        label="Room Number"
                        v-model="roomNumber"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                        :is-valid="!$v.amphitheaterName.$invalid"
                        label="Amphitheater"
                        v-model="amphitheaterName"
                />
              </CCol>
              <CCol sm="4">
                <CInput
                        :is-valid="!$v.computerNumber.$invalid"
                        label="PC Quantity"
                        v-model="computerNumber"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <div class="d-flex justify-content-center align-items-center" role="status" v-if="modalSpinner">
        <CSpinner color="success"/>
      </div>
      <div class="alert alert-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</div>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton @click="addExamRoom" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  
    <CModal :centered="true" :show.sync="successModal" color="info" title="Alert">
      <CCol sm="12">
        <CCard>
          <CRow>
            <CCol sm="12">
              <div class="alert-success">Thành công</div>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
      <template #footer>
        <CButton @click="discardModal" color="primary">Ok</CButton>
      </template>
    </CModal>
    
    <div class="d-flex justify-content-center align-items-center" role="status" v-if="spinner">
      <CSpinner color="success"/>
    </div>
  </div>
</template>

<script>
  import rooms_data from "./data/rooms";
  import {integer, numeric, required} from "vuelidate/lib/validators";
  import examRoomService from "../../../services/admin/exam-room.service";
  
  const fields = [
    {
      key: "number",
      label: "No",
      _style: "width:1%",
      sorter: false,
      filter: false
    },
    {key: "roomNumber", label: "Room", _style: "width:17.5%"},
    {key: "amphitheaterName", label: "Amphitheater Name", _style: "width:17.5%"},
    {key: "computerNumber", label: "PC Quantity", _style: "width:17.5%"},
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
        successModal: false,
        myModal: false,
        spinner: false,
        modalSpinner: false,
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
        this.successModal = false;
        this.myModal = false;
        this.roomNumber = "";
        this.amphitheaterName = "";
        this.computerNumber = "";
        this.modalErrors = ""
      },
      async addExamRoom() {
        this.modalSpinner = true;
        const form = {
          roomNumber: this.roomNumber,
          amphitheaterName: this.amphitheaterName,
          computerNumber: this.computerNumber
        };
        let res = await examRoomService.createExamRoom(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.myModal = false;
          this.modalErrors = "";
          await this.$store.dispatch("listExamRoom");
          this.roomNumber = "";
          this.amphitheaterName = "";
          this.computerNumber = "";
        }
      },
      async deleteExamRoom(item, index) {
        this.spinner = true;
        const form = {
          id: item.id
        };
        let res = await examRoomService.deleteExamRoom(form);
        if (!res.errors.length > 0) {
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listExamRoom");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
        this.spinner = false;
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("listExamRoom");
      this.spinner = false;
    }
  };
</script>