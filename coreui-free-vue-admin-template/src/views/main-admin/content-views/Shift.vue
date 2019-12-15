<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Shift List
              <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="outline-info" class="float-right mr-3" @click="addExamPeriodModal = true">Add More</CButton>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="listExamPeriod"
        :fields="fields"
        :items-per-page="small ? 10 : 10"
        column-filter
        fixed
        hover
        sorter
        pagination
      >
        <template #number="{item, index}">
          <td>{{index + 1}}</td>
        </template>
        <template #rooms="{item, index}">
          <td class>
<!--            <CSelect :options="item.rooms" />-->
              <select class="form-control">
                <option v-for="examRoom in listExamPeriod.examRooms" :key="examRoom.id">{{ examRoom.code }}</option>
              </select>
          </td>
        </template>
        <template #edit="{item, index}">
          <td class="py-3">
            <CButton
              color="warning"
              variant="outline"
              square
              size="sm"
            >Edit Room</CButton>
          </td>
        </template>
        <template #delete="{item, index}">
          <td class="py-3">
            <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="deleteExamPeriod(item, index)"
            >Delete</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <!-- Add Modal -->
    <CModal title="Add more shifts" :centered="true" :show.sync="addExamPeriodModal" color="info">
      <CCol sm="14">
        <CCard>
          <CCardHeader>
            <strong>Shift Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        label="Exam Period"
                        :value="currentExamProgram.name"
                        horizontal
                        plaintext
                />
              </CCol>
              <CCol sm="12">
                <CInput
                        label="Exam Date"
                        horizontal
                        type="date"
                        v-model="examDate"
                        :is-valid="!$v.examDate.$invalid"
                />
              </CCol>
              <CRow></CRow>
              <CCol sm="3">
                <CInput
                        label="Start time"
                        v-model="startHour"
                        :is-valid="!$v.startHour.$invalid"
                />
              </CCol>
              <CCol sm="3">
                <CInput
                        label="End time"
                        v-model="finishHour"
                        :is-valid="!$v.finishHour.$invalid"
                />
              </CCol>
              <CCol sm="6">
<!--                <CSelect -->
<!--                        label="Subject Name" :options="[1, 2, 3, 4, 5]" />-->
                <label>
                  Subject Name
                  <select class="form-control" v-model="selectedSubjectName" required>
                    <option v-for="term in dropListTerm" :key="term.id">{{ term.subjectName }}</option>
                  </select>
                </label>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <div class="alert alert-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</div>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton @click="addExamPeriod" color="outline-success" :disabled="$v.$invalid">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import shifts_data from "./data/shifts";
import {required, integer, numeric} from "vuelidate/lib/validators";
import examPeriodService from "../../../services/admin/exam-period.service";

const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  { key: "subjectName", _style: "width:10%" },
  { key: "examDate", _style: "width:5%" },
  { key: "startHour", _style: "width:5%" },
  { key: "finishHour", _style: "width:5%" },
  {
    key: "examRooms",
    label: "Rooms",
    _style: "width:5%",
    sorter: false,
    filter: false
  },
  {
    key: "edit",
    label: "",
    _style: "width:3%",
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
const items = shifts_data;

export default {
  name: "shifts",
  props: [],
  data() {
    return {
      addExamPeriodModal: false,
      editExamPeriodModal: false,
      items,
      fields,
      selectedSubjectName: "",
      examDate: "",
      startHour: "",
      finishHour: "",
      modalErrors: "",
      errors: ""
    };
  },
  computed: {
    listExamPeriod() {
      return this.$store.getters.listExamPeriod;
    },
    dropListTerm() {
      return this.$store.getters.examPeriodDropListTerm;
    },
    currentExamProgram() {
      return this.$store.getters.examPeriodCurrentExamProgram;
    }
  },
  validations: {
    examDate: {
      required
    },
    startHour: {
      required,
      numeric,
      integer
    },
    finishHour: {
      required,
      numeric,
      integer
    }
  },
  methods: {
    discardModal() {
      this.addExamPeriodModal = false;
      this.modalErrors = "";
      this.selectedSubjectName = "";
      this.examDate = "";
      this.startHour = "";
      this.finishHour = ""
    },
    async addExamPeriod() {
      const form = {
        examDate: this.examDate,
        startHour: this.startHour,
        finishHour: this.finishHour,
        subjectName: this.selectedSubjectName,
        examProgramName: this.currentExamProgram.name
      };
      let res = await examPeriodService.createExamPeriod(form);
      if (res.errors.length > 0) {
        let temp = res.errors[0].split(".")[2];
        this.modalErrors = (" " + temp).slice(1);
      }
      else {
        this.addExamPeriodModal = false;
        this.modalErrors = "";
        await this.$store.dispatch("listExamPeriod");
        this.selectedSubjectName = "";
        this.examDate = "";
        this.startHour = "";
        this.finishHour = ""
      }
    },
    async deleteExamPeriod(item, index) {
      const form = {
        id: item.id
      };
      let res = await examPeriodService.deleteExamPeriod(form);
      if (!res.errors.length > 0) {
        this.errors = "";
        await this.$store.dispatch("listExamPeriod");
      }
      else {
        let temp = res.errors[0].split(".")[2];
        this.errors = (" " + temp).slice(1);
      }
    },
    async editExamPeriod(item, index) {
    }
  },
  async created() {
    await this.$store.dispatch("examPeriodCurrentExamProgram");
    await this.$store.dispatch("examPeriodDropListTerm");
    await this.$store.dispatch("listExamPeriod");
  }
};
</script>