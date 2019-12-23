<template>
  <div>
  <CCard v-if="!spinner">
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Danh sách Môn học
              <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
            </div>
          </CCol>
          
          <CCol sm="7" class="d-none d-md-block">
            <div class="py-2">
              <CDropdown
                class="float-right"
                toggler-text="More Action"
                color="outline-info"
                placement="bottom-end"
              >
                <div>
                  <input type="file" id="import-term" class="import" ref="termFile" @change="handleFileUploadTerm()"/>
                  <CDropdownItem @click="importTerm">Import Term</CDropdownItem>
                </div>
                <CDropdownItem @click="downloadTermTemplate">Download Term Template</CDropdownItem>
                <CDropdownItem @click="exportTerm">Export Term</CDropdownItem>
              </CDropdown>
              <CButton
                color="outline-info"
                @click="myModal = true"
                class="float-right mr-3"
              >Thêm mới</CButton>
            </div>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="listTerm"
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
            >Sửa</CButton>
          </td>
        </template>
        <template #delete="{item, index}">
          <td class="py-2">
            <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="deleteTerm(item, index)"
            >Xoá</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
    <!-- Modal -->
    <CModal title="Add more term" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Subject Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        horizontal label="Tên môn học"
                        placeholder="Enter Subject Name"
                        v-model="subjectName"
                        :is-valid="!$v.subjectName.$invalid"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <label class="py-2">
                  Kì học
                </label>
              </CCol>
              <CCol sm="9">
                <select 
                style="width:92%; left:10px;"
                class="form-control position-absolute" v-model="semesterCode">
                    <option v-for="semester in dropListSemester" :key="semester.id">{{ semester.code }}</option>
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
        <CButton @click="addTerm" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  
  
    <CModal :centered="true" :show.sync="importResultModal" color="info" title="Alert">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Import Result Message</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <div class="alert-success" v-if="!modalErrors.length > 0">{{ importResultMessage }}</div>
                <div class="alert-danger" v-if="modalErrors.length > 0">{{ importResultMessage }}</div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <template #footer>
        <CButton @click="discardModal" color="primary">Ok</CButton>
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
import subjects from "./data/subjects";
import {required} from "vuelidate/lib/validators";
import termService from "../../../services/admin/term.service";

const items = subjects;
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  {
    key: "subjectName",
    label: "Tên môn học",
    _style: "width:17.5%"
  },
  {
    key: "semesterCode",
    label: "Mã kì học",
    _style: "width: 10%"
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
  data() {
    return {
      successModal: false,
      myModal: false,
      importResultModal: false,
      importResultMessage: "",
      spinner: false,
      modalSpinner: false,
      items,
      fields,
      subjectName: "",
      semesterCode: "",
      errors: "",
      modalErrors: ""
    };
  },
  computed: {
    listTerm() {
      return this.$store.getters.listTerm;
    },
    dropListSemester() {
      return this.$store.getters.termDropListSemester;
    }
  },
  validations: {
    subjectName: {
      required
    }
  },
  methods: {
    discardModal() {
      this.successModal = false;
      this.modalErrors = "";
      this.myModal = false;
      this.importResultModal = false;
      this.importResultMessage = "";
      this.subjectName = "";
      this.semesterCode = "";
    },
    async addTerm() {
      this.modalSpinner = true;
      let form = {
        subjectName: this.subjectName,
        semesterCode: this.semesterCode
      };
      let res = await termService.createTerm(form);
      this.modalSpinner = false;
      if (res.errors.length > 0) {
        let temp = res.errors[0].split(".")[2];
        this.modalErrors = (" " + temp).slice(1);
      }
      else {
        this.myModal = false;
        this.modalErrors = "";
        this.subjectName = "";
        this.semesterCode = "";
        await this.$store.dispatch("listTerm");
      }
    },
    async deleteTerm(item, index) {
      this.spinner = true;
      const form = {
        id: item.id
      };
      let res = await termService.deleteTerm(form);
      this.spinner = false;
      if (!res.errors.length > 0) {
        this.successModal = true;
        this.errors = "";
        await this.$store.dispatch("listTerm");
      }
      else {
        let temp = res.errors[0].split(".")[2];
        this.errors = (" " + temp).slice(1);
      }
    },
    async importTerm() {
      document.getElementById("import-term").click();
    },
    async downloadTermTemplate() {
      this.spinner = true;
      await termService.downloadTermTemplate();
      this.spinner = false;
    },
    async exportTerm() {
      this.spinner = true;
      await termService.exportTerm();
      this.spinner = false;
    },
    async handleFileUploadTerm() {
      this.spinner = true;
      this.file = this.$refs["termFile"].files[0];
      let data = await termService.importTerm(this.file);
      if (data.errors.length > 0) {
        this.spinner = false;
        this.modalErrors = data.errors[0];
        this.importResultMessage = data.message;
        this.importResultModal = true;
      } else {
        await this.$store.dispatch("listTerm");
        this.spinner = false;
        this.importResultMessage = data.message;
        this.importResultModal = true;
      }
    }
  },
  async created() {
    this.spinner = true;
    await this.$store.dispatch("listTerm");
    await this.$store.dispatch("termDropListSemester");
    this.spinner = false;
  }
};
</script>

<style>
  .import {
    display: block;
    visibility: hidden;
    width: 0;
    height: 0;
  }
</style>