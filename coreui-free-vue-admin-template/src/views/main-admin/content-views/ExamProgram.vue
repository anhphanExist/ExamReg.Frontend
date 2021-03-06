<template>
  <div>
    <CCard v-if="!spinner">
      <CCardHeader>
        <slot name="header">
          <CRow>
            <CCol sm="5">
              <div class="pt-2">
                <CIcon name="cil-grid"/>
                Danh sách Kì thi
                <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
              </div>
            </CCol>
            <CCol class="d-none d-md-block" sm="7">
              <CButton @click="myModal = true" class="float-right mr-4" color="outline-info">Thêm mới</CButton>
            </CCol>
          </CRow>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
                :fields="fields"
                :items="listExamProgram"
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
          <template #current="{item}">
            <td class="px-3">
              <CIcon name="cil-star" v-if="item.current"/>
            </td>
          </template>
          <template #set_current="{item, index}">
            <td class="py-2">
              <CButton
                      :disabled="item.isCurrent"
                      @click="setCurrent(item, index)"
                      color="success"
                      size="sm"
                      square
                      v-if="!item.current"
                      variant="outline"
              >Mở
              </CButton>
            </td>
          </template>
          <template #edit="{item, index}">
            <td class="py-2">
              <CButton
                      :disabled="item.isCurrent"
                      @click="toggleDetails(index)"
                      color="warning"
                      size="sm"
                      square
                      variant="outline"
              >Sửa
              </CButton>
            </td>
          </template>
          <template #delete="{item, index}">
            <td class="py-2">
              <CButton
                      :disabled="item.isCurrent"
                      @click="deleteExamProgram(item, index)"
                      color="danger"
                      size="sm"
                      square
                      variant="outline"
              >Xoá
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <!-- Modal -->
    <CModal :centered="true" :show.sync="myModal" color="info" title="Add more Exam Program">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Exam Program Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.name.$invalid"
                        horizontal
                        label="Name"
                        placeholder="Enter exam program name"
                        v-model="name"
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
                        class="form-control position-absolute"
                        style="width:92%;left:10px;"
                        v-model="semesterCode">
                  <option :key="semester.id" v-for="semester in dropListSemester">{{ semester.code }}</option>
                </select>
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
        <CButton @click="addExamProgram" color="outline-success">Accept</CButton>
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
    {key: "name", label: "Tên kì thi", _style: "width:13.5%"},
    {key: "semesterCode", label: "Mã kì học", _style: "width: 13.5%"},
    {key: "isCurrent", label:"Đang mở", sorter: false, filter: false, _style: "width: 3%"},
    {
      key: "set_current",
      label: "",
      _style: "width:1%",
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
        successModal: false,
        myModal: false,
        name: "",
        semesterCode: "",
        modalErrors: "",
        errors: "",
        spinner: false,
        modalSpinner: false
      };
    },
    computed: {
      listExamProgram() {
        return this.$store.getters.listExamProgram;
      },
      dropListSemester() {
        return this.$store.getters.examProgramDropListSemester;
      }
    },
    validations: {
      name: {
        required
      }
    },
    methods: {
      discardModal() {
        this.successModal = false;
        this.myModal = false;
        this.modalErrors = "";
        this.name = "";
        this.semesterCode = "";
      },
      async addExamProgram() {
        this.modalSpinner = true;
        const form = {
          name: this.name,
          semesterCode: this.semesterCode
        };
        let res = await examProgramService.createExamProgram(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.myModal = false;
          this.modalErrors = "";
          await this.$store.dispatch("listExamProgram");
          this.name = "";
          this.semesterCode = "";
        }
      },
      async deleteExamProgram(item, index) {
        this.spinner = true;
        const form = {
          id: item.id
        };
        let res = await examProgramService.deleteExamProgram(form);
        this.spinner = false;
        if (!res.errors.length > 0) {
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listExamProgram");
        } else {
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
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listExamProgram");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("examProgramDropListSemester");
      await this.$store.dispatch("listExamProgram");
      this.spinner = false;
    }
  };
</script>