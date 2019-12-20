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
                <CDropdownItem>Import Student</CDropdownItem>
                <CDropdownItem>Download Student Template</CDropdownItem>
                <CDropdownItem>Export Student</CDropdownItem>
                <CDropdownItem>Import Student</CDropdownItem>
                <CDropdownItem>Download Student Term Template</CDropdownItem>
                <CDropdownItem>Export Student Term</CDropdownItem>
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
    <!-- Modal -->
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
                        label="MSSV"
                        placeholder="00000000"
                        v-model="student_add.mssv"
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
                        placeholder="Enter student first name"
                        v-model="student_add.firstName"
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
                        placeholder="Enter student last name"
                        v-model="student_add.lastName"
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
              
              <Ccol sm="3">
                <label class="py-2 px-3">
                  DOB
                </label>
              </Ccol>
              
              <CCol sm="3">
                <select
                        class="form-control position-absolute"
                        style="width: 75%; left:57px;"
                        v-model="student_add.dob.day">
                  <option :key="index" v-for="index in 31">{{ index }}</option>
                </select>
              
              </CCol>
              <CCol sm="3">
                <select
                        class="form-control position-absolute"
                        style="width: 75%;left:57px;"
                        v-model="student_add.dob.month">
                  <option :key="index" v-for="index in 12">{{ index }}</option>
                </select>
              
              </CCol>
              <CCol sm="3">
                <select
                        class="form-control position-absolute"
                        style="width: 75%;left:57px"
                        v-model="student_add.dob.year">
                  <option :key="index" v-for="index in 50">{{ index + 1970 }}</option>
                </select>
              
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <div class="alert alert-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</div>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton :disabled="$v.$invalid" @click="addStudent" color="outline-success">Accept</CButton>
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
        myModal: false,
        spinner: false,
        student_add: {
          mssv: "",
          firstName: "",
          lastName: "",
          email: "",
          dob: {
            day: "",
            month: "",
            year: ""
          }
        },
        items,
        fields,
        modalErrors: "",
        errors: ""
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
        this.modalErrors = "";
        this.student_add.mssv = "";
        this.student_add.firstName = "";
        this.student_add.lastName = "";
        this.student_add.email = "";
        this.student_add.dob.day = "";
        this.student_add.dob.month = "";
        this.student_add.dob.year = "";
      },
      async addStudent() {
        const birthday = new Date(Date.UTC(this.student_add.dob.year, this.student_add.dob.month - 1, this.student_add.dob.day));
        const form = {
          studentNumber: this.student_add.mssv,
          lastName: this.student_add.lastName,
          givenName: this.student_add.firstName,
          birthday: birthday,
          email: this.student_add.email
        };
        
        let res = await studentService.createStudent(form);
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.myModal = false;
          this.modalErrors = "";
          await this.$store.dispatch("listStudent");
          this.student_add.mssv = "";
          this.student_add.firstName = "";
          this.student_add.lastName = "";
          this.student_add.email = "";
          this.student_add.dob.day = "";
          this.student_add.dob.month = "";
          this.student_add.dob.year = "";
        }
      },
      async deleteStudent(item, index) {
        const form = {
          id: item.id,
          studentNumber: item.studentNumber
        };
        let res = await studentService.deleteStudent(form);
        if (!res.errors.length > 0) {
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
          this.errors = "";
          await this.$store.dispatch("listStudent");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      },
      async importStudent() {
      },
      async downloadStudentTemplate() {
      },
      async exportStudent() {
      },
      async importStudentTerm() {
      },
      async downloadStudentTermTemplate() {
      },
      async exportStudentTerm() {
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("listStudent");
      this.spinner = false;
    }
  };
</script>