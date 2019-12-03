<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              {{caption}}
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CDropdown
              class="float-right"
              toggler-text="More Action"
              color="outline-info"
              placement="bottom-end"
            >
              <CDropdownItem>Import Student</CDropdownItem>
              <CDropdownItem>Download Student Template</CDropdownItem>
              <CDropdownItem>Export Student</CDropdownItem>
              <CDropdownItem>Import Student</CDropdownItem>
              <CDropdownItem>Download Student Term Template</CDropdownItem>
              <CDropdownItem>Export Student Term</CDropdownItem>
            </CDropdown>
            <CButton color="outline-info" @click="myModal = true" class="float-right mr-3">Add More</CButton>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        :items="getShuffledUsersData()"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        pagination
      >
        <template #action="{item}">
          <td>
            <CForm inline>
              <CButton color="outline-success" class="mr-sm-4" type="submit">Reset Password</CButton>
              <CButton color="outline-warning" class="mr-sm-4" type="submit">Edit</CButton>
              <CButton color="outline-danger" class="my-2 my-sm-0" type="submit">Delete</CButton>
            </CForm>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <CModal title="Add more students" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Student Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput label="MSSV" horizontal placeholder="00000000" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput horizontal label="First Name" placeholder="Enter student first name" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput horizontal label="Last Name" placeholder="Enter student last name" />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  horizontal
                  label="Password"
                  type="password"
                  placeholder="Enter student password"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                  label="Email input"
                  placeholder="Enter student email"
                  type="email"
                  horizontal
                  autocomplete="email"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="4">
                <CSelect
                  label="Day"
                  :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]"
                />
              </CCol>
              <CCol sm="4">
                <CSelect label="Month" :options="[1,2,3,4,5,6,7,8,9,10,11,12]" />
              </CCol>
              <CCol sm="4">
                <CSelect
                  label="Year"
                  :options="[1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009]"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <template #footer>
        <CButton @click="myModal = false" color="outline-danger">Discard</CButton>
        <CButton @click="myModal = false" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import studentsData from "../data/student";
export default {
  name: "Table",
  data() {
    return {
      myModal: false
    };
  },
  props: {
    fields: {
      type: Array,
      default() {
        return ["mssv", "fullname", "DOB", "password", "email", "action"];
      }
    },
    caption: {
      type: String,
      default: "Student Table"
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  methods: {
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    getShuffledUsersData() {
      return this.shuffleArray(studentsData.slice(0));
    }
  }
};
</script>

