<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Exam Program List
              <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="outline-info" @click="myModal = true" class="float-right mr-4">Add more</CButton>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="listExamProgram"
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
        <template #current="{item}">
          <td class="px-3">
            <CIcon name="cil-star" v-if="item.current" />
          </td>
        </template>
        <template #set_current="{item, index}">
          <td class="py-2">
            <CButton
              v-if="!item.current"
              color="success"
              variant="outline"
              square
              size="sm"
              @click="setCurrent(item, index)"
              :disabled="item.isCurrent"
            >Set Current</CButton>
          </td>
        </template>
        <template #edit="{item, index}">
          <td class="py-2">
            <CButton
              color="warning"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(index)"
              :disabled="item.isCurrent"
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
              @click="deleteExamProgram(item, index)"
              :disabled="item.isCurrent"
            >Delete</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <!-- Modal -->
    <CModal title="Add more Exam Period" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Exam Program Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
               <CCol sm="12">
              <CInput
                      label="Name"
                      placeholder="Enter exam period name"
                      horizontal
                      v-model="name"
                      :is-valid="!$v.name.$invalid"
              />
            </CCol>
            </CRow>
           <CRow>
             <CCol sm="3">
              <label class="py-2">
                Code
              </label>
            </CCol>
            <CCol sm="9">
              <select 
              style="width:92%;left:10px;"
              class="form-control position-absolute" 
              v-model="semesterCode">
                  <option v-for="semester in dropListSemester" :key="semester.id">{{ semester.code }}</option>
                </select>
            </CCol>
           </CRow>
            
          </CCardBody>
        </CCard>
      </CCol>
      <p class="text-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</p>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton @click="addExamProgram" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>
<script>
import exam_period_data from "./data/exam_periods";
import {required} from "vuelidate/lib/validators";
import examProgramService from "../../../services/admin/exam-program.service";
const items = exam_period_data;
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  { key: "name", _style: "width:13.5%" },
  { key: "semesterCode", _style: "width: 13.5%" },
  { key: "isCurrent", sorter: false, filter: false, _style: "width: 1%" },
  {
    key: "set_current",
    label: "",
    _style: "width:2%",
    sorter: false,
    filter: false
  },
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

export default {
  name: "exam_periods",
  props: [],
  data() {
    return {
      items,
      fields,
      myModal: false,
      name: "",
      semesterCode: "",
      modalErrors: "",
      errors: ""
    };
  },
  computed: {
    listExamProgram() {
      return this.$store.getters.listExamProgram;
    },
    dropListSemester() {
      return this.$store.getters.dropListSemester;
    }
  },
  validations: {
    name: {
      required
    }
  },
  methods: {
    discardModal() {
      this.myModal = false;
      this.modalErrors = "";
      this.name = "";
      this.semesterCode = "";
    },
    async addExamProgram() {
      const form = {
        name: this.name,
        semesterCode: this.semesterCode
      };
      let res = await examProgramService.createExamProgram(form);
      if (res.errors.length > 0) {
        let temp = res.errors[0].split(".")[2];
        this.modalErrors = (" " + temp).slice(1);
      }
      else {
        this.myModal = false;
        this.modalErrors = "";
        await this.$store.dispatch("listExamProgram");
        this.name = "";
        this.semesterCode = "";
      }
    },
    async deleteExamProgram(item, index) {
      const form = {
        id: item.id
      };
      let res = await examProgramService.deleteExamProgram(form);
      if (!res.errors.length > 0) {
        this.errors = "";
        await this.$store.dispatch("listExamProgram");
      }
      else {
        let temp = res.errors[0].split(".")[2];
        this.errors = (" " + temp).slice(1);
      }
    },
    async setCurrent(item, index) {
      const form = {
        id: item.id
      };
      let res = await examProgramService.setCurrentExamProgram(form);
      if (!res.errors.length > 0) {
        this.errors = "";
        await this.$store.dispatch("listExamProgram");
      }
      else {
        let temp = res.errors[0].split(".")[2];
        this.errors = (" " + temp).slice(1);
      }
    }
  },
  async created() {
    await this.$store.dispatch("dropListSemester");
    await this.$store.dispatch("listExamProgram");
  }
};
</script>