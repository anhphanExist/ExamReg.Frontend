<template>
  <div>
    <CCard v-if="!spinner">
      <CCardHeader>
        <slot name="header">
          <CRow>
            <CCol sm="5">
              <div class="pt-2">
                <CIcon name="cil-grid"/>
                Student List
                <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
              </div>
            </CCol>
            <CCol class="d-none d-md-block" sm="7">
              <CDropdown
                      class="float-right"
                      color="outline-info"
                      placement="bottom-end"
                      toggler-text="More Action"
              >
                <div>
                  <input @change="handleFileUploadStudent()" class="import" id="import-student" ref="studentFile"
                         type="file"/>
                  <CDropdownItem @click="importStudent">Import Student</CDropdownItem>
                </div>
                <CDropdownItem @click="downloadStudentTemplate">Download Student Template</CDropdownItem>
                <CDropdownItem @click="exportStudent">Export Student</CDropdownItem>
                <div>
                  <input @change="handleFileUploadStudentTerm()" class="import" id="import-student-term"
                         ref="studentTermFile"
                         type="file"/>
                  <CDropdownItem @click="importStudentTerm">Import Student Term</CDropdownItem>
                </div>
                <CDropdownItem @click="downloadStudentTermTemplate">Download Student Term Template</CDropdownItem>
                <CDropdownItem @click="exportStudentTerm">Export Student Term</CDropdownItem>
              </CDropdown>
              <CButton @click="myModal = true" class="float-right mr-3" color="outline-info">Add More</CButton>
            </CCol>
          </CRow>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
                :fields="fields"
                :items="listStudent"
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
          <template #reset="{item, index}">
            <td class="py-2">
              <CButton
                      @click="resetPassword(item, index)"
                      color="success"
                      size="sm"
                      square
                      variant="outline"
              >Reset
              </CButton>
            </td>
          </template>
          <template #edit="{item, index}">
            <td class="py-2">
              <CButton
                      @click="editDetails(item)"
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
                      @click="deleteStudent(item, index)"
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
    
    
    <!--Add Modal -->
    <CModal :centered="true" :show.sync="myModal" color="info" title="Add more students">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Student Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_add.mssv.$invalid" horizontal
                        invalid-feedback="This field must be filled and only accepts 8 digit integer"
                        label="Student No"
                        placeholder="00000000"
                        v-model="student_add.mssv"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_add.lastName.$invalid"
                        horizontal
                        invalid-feedback="This field must be filled"
                        label="Last Name"
                        placeholder="Enter student first name"
                        v-model="student_add.lastName"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_add.firstName.$invalid"
                        horizontal
                        invalid-feedback="This field must be filled"
                        label="First Name"
                        placeholder="Enter student last name"
                        v-model="student_add.firstName"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_add.email.$invalid"
                        autocomplete="email"
                        horizontal
                        invalid-feedback="This field must be filled and only accepts valid email"
                        label="Email"
                        placeholder="Enter student email"
                        type="email"
                        v-model="student_add.email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_add.birthday.$invalid"
                        horizontal
                        label="Birthday"
                        type="date"
                        v-model="student_add.birthday"
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
        <CButton :disabled="$v.student_add.$invalid" @click="addStudent" color="outline-success">Accept</CButton>
      </template>
    </CModal>
    
    
    <!-- Edit Modal -->
    <CModal :centered="true" :show.sync="editModal" color="info" title="Edit">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Student Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        :value="student_edit.mssv"
                        horizontal
                        label="Student No"
                        plaintext
                        v-model="student_edit.mssv"
                        :disabled="true"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_edit.lastName.$invalid"
                        horizontal
                        invalid-feedback="This field must be filled"
                        label="Last Name"
                        placeholder="Enter student first name"
                        v-model="student_edit.lastName"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_edit.firstName.$invalid"
                        horizontal
                        invalid-feedback="This field must be filled"
                        label="First Name"
                        placeholder="Enter student last name"
                        v-model="student_edit.firstName"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_edit.email.$invalid"
                        autocomplete="email"
                        horizontal
                        invalid-feedback="This field must be filled and only accepts valid email"
                        label="Email"
                        placeholder="Enter student email"
                        type="email"
                        v-model="student_edit.email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.student_edit.birthday.$invalid"
                        horizontal
                        label="Birthday"
                        type="date"
                        v-model="student_edit.birthday"
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
        <CButton :disabled="$v.student_edit.$invalid" @click="acceptEdit" color="outline-success">Accept</CButton>
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
  import user_data from "./data/students";
  import {email, integer, maxLength, minLength, numeric, required} from "vuelidate/lib/validators";
  import studentService from "../../../services/admin/student.service";
  import examRegUtils from "../../../utils/exam-reg-utils";
  
  const fields = [
    {
      key: "number",
      label: "No",
      _style: "width:1%",
      sorter: false,
      filter: false
    },
    {key: "studentNumber", _style: "width:17.5%"},
    {key: "lastName", _style: "width:10%"},
    {key: "givenName", _style: "width: 17.5%"},
    {key: "birthday", _style: "width:17.5%;"},
    {key: "email", _style: "width:17.5%;"},
    {
      key: "reset",
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
  
  const items = user_data;
  
  export default {
    name: "tables",
    props: [],
    data() {
      return {
        successModal: false,
        editModal: false,
        myModal: false,
        importResultModal: false,
        importResultMessage: "",
        spinner: false,
        modalSpinner: false,
        student_edit: {
          id: "",
          mssv: "",
          firstName: "",
          lastName: "",
          email: "",
          birthday: ""
        },
        student_add: {
          mssv: "",
          firstName: "",
          lastName: "",
          email: "",
          birthday: ""
        },
        items,
        fields,
        modalErrors: "",
        errors: "",
        file: ""
      };
    },
    validations: {
      student_add: {
        mssv: {
          required,
          numeric,
          integer,
          minLen: minLength(8),
          maxLen: maxLength(8)
        },
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        birthday: {
          required
        }
      },
      student_edit: {
        mssv: {
          required,
          numeric,
          integer,
          minLen: minLength(8),
          maxLen: maxLength(8)
        },
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        birthday: {
          required
        }
      }
    },
    computed: {
      listStudent() {
        return this.$store.getters.listStudent;
      }
    },
    methods: {
      discardModal() {
        this.myModal = false;
        this.importResultModal = false;
        this.successModal = false;
        this.importResultMessage = "";
        this.editModal = false;
        this.modalErrors = "";
        this.student_add.mssv = "";
        this.student_add.firstName = "";
        this.student_add.lastName = "";
        this.student_add.email = "";
        this.student_add.birthday = "";
      },
      async addStudent() {
        this.modalSpinner = true;
        const form = {
          studentNumber: this.student_add.mssv,
          lastName: this.student_add.lastName,
          givenName: this.student_add.firstName,
          birthday: examRegUtils.inverseDate(this.student_add.birthday),
          email: this.student_add.email
        };
        let res = await studentService.createStudent(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.discardModal();
          await this.$store.dispatch("listStudent");
        }
      },
      editDetails(item) {
        this.student_edit.id = item.id;
        this.student_edit.mssv = item.studentNumber;
        this.student_edit.firstName = item.givenName;
        this.student_edit.lastName = item.lastName;
        this.student_edit.email = item.email;
        this.student_edit.birthday = examRegUtils.inverseDate(item.birthday);
        this.editModal = true;
      },
      async acceptEdit() {
        this.modalSpinner = true;
        const form = {
          id: this.student_edit.id,
          studentNumber: this.student_edit.mssv,
          lastName: this.student_edit.lastName,
          givenName: this.student_edit.firstName,
          birthday: examRegUtils.inverseDate(this.student_edit.birthday),
          email: this.student_edit.email
        };
        let res = await studentService.updateStudent(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.discardModal();
          this.spinner = true;
          await this.$store.dispatch("listStudent");
          this.spinner = false;
        }
      },
      async deleteStudent(item, index) {
        this.spinner = true;
        const form = {
          id: item.id,
          studentNumber: item.studentNumber
        };
        let res = await studentService.deleteStudent(form);
        this.spinner = false;
        if (!res.errors.length > 0) {
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listStudent");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      },
      async resetPassword(item, index) {
        const form = {
          id: item.id,
          studentNumber: item.studentNumber
        };
        let res = await studentService.resetPassword(form);
        if (!res.errors.length > 0) {
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listStudent");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      },
      async importStudent() {
        document.getElementById("import-student").click();
      },
      async downloadStudentTemplate() {
        this.spinner = true;
        await studentService.downloadStudentTemplate();
        this.spinner = false;
      },
      async exportStudent() {
        this.spinner = true;
        await studentService.exportStudent();
        this.spinner = false;
      },
      async importStudentTerm() {
        document.getElementById("import-student-term").click();
      },
      async downloadStudentTermTemplate() {
        this.spinner = true;
        await studentService.downloadStudentTermTemplate();
        this.spinner = false;
      },
      async exportStudentTerm() {
        this.spinner = true;
        await studentService.exportStudentTerm();
        this.spinner = false;
      },
      async handleFileUploadStudent() {
        this.spinner = true;
        this.file = this.$refs["studentFile"].files[0];
        let data = await studentService.importStudent(this.file);
        if (data.errors.length > 0) {
          this.spinner = false;
          this.modalErrors = data.errors[0];
          this.importResultMessage = data.message;
          this.importResultModal = true;
        } else {
          await this.$store.dispatch("listStudent");
          this.spinner = false;
          this.importResultMessage = data.message;
          this.importResultModal = true;
        }
        
      },
      async handleFileUploadStudentTerm() {
        this.spinner = true;
        this.file = this.$refs["studentTermFile"].files[0];
        let data = await studentService.importStudentTerm(this.file);
        if (data.errors.length > 0) {
          this.spinner = false;
          this.modalErrors = data.errors[0];
          this.importResultMessage = data.message;
          this.importResultModal = true;
        } else {
          await this.$store.dispatch("listStudent");
          this.spinner = false;
          this.importResultMessage = data.message;
          this.importResultModal = true;
        }
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("listStudent");
      this.spinner = false;
    }
  };
</script>

<style scoped>
  .import {
    display: block;
    visibility: hidden;
    width: 0;
    height: 0;
  }
</style>