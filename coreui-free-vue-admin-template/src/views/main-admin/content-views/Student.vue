<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid"/>
              Student List
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
              :items-per-page="small ? 10 : 10"
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
                    @click="toggleDetails(index)"
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
                    @click="toggleDetails(index)"
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
                <CInput horizontal label="MSSV" placeholder="00000000" v-model="student_add.mssv"/>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        horizontal
                        label="First Name"
                        placeholder="Enter student first name"
                        v-model="student_add.firstname"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        horizontal
                        label="Last Name"
                        placeholder="Enter student last name"
                        v-model="student_add.lastname"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        autocomplete="email"
                        horizontal
                        label="Email"
                        placeholder="Enter student email"
                        type="email"
                        v-model="student_add.email"
                />
              </CCol>
            </CRow>
            
            <CRow>
              <CCol sm="4">
                <CSelect
                        :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]"
                        label="Day-DOB"
                        v-model="student_add.dob.day"
                />
              </CCol>
              <CCol sm="4">
                <CSelect
                        :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                        label="Month-DOB"
                        v-model="student_add.dob.month"
                />
              </CCol>
              <CCol sm="4">
                <CSelect
                        :options="[1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]"
                        label="Year-DOB"
                        v-model="student_add.dob.year"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <p v-if="$v.student_add.mssv.$invalid">Mã số sinh viên không hợp lệ</p>
      <p v-if="$v.student_add.firstname.$invalid">Tên không hợp lệ</p>
      <p v-if="$v.student_add.lastname.$invalid">Họ không hợp lệ</p>
      <p v-if="$v.student_add.email.$invalid">Email không hợp lệ</p>
      <template #footer>
        <CButton @click="myModal = false" color="outline-danger">Discard</CButton>
        <CButton @click="addStudent" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
  import user_data from "./data/students";
  import {alpha, email, integer, minLength, numeric, required} from "vuelidate/lib/validators";

  const fields = [
    {
      key: "number",
      label: "No",
      _style: "width:1%",
      sorter: false,
      filter: false
    },
    {key: "studentNumber", _style: "width:17.5%"},
    {key: "lastName", _style: "width:17.5%"},
    {key: "DOB", _style: "width:17.5%;"},
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
        student_add: {
          mssv: "",
          firstname: "",
          lastname: "",
          email: "",
          dob: {
            day: "",
            month: "",
            year: ""
          }
        },
        items,
        fields
      };
    },
    validations: {
      student_add: {
        mssv: {
          required,
          numeric,
          integer,
          minLen: minLength(6)
        },
        firstname: {
          required
        },
        lastname: {
          required,
          alpha
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
      addStudent() {
        this.myModal = false;
        console.log(this.selected);
        console.log(this.student_add);
      }
    },
    async created() {
      await this.$store.dispatch("listStudent");
    }
  };
</script>