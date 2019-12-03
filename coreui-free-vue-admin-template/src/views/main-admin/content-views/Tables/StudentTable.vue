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
                color="outline-primary"
                placement="bottom-end"
            >
              <CDropdownItem>Import Student</CDropdownItem>
              <CDropdownItem>Download Student Template</CDropdownItem>
              <CDropdownItem>Export Student</CDropdownItem>
              <CDropdownItem>Import Student</CDropdownItem>
              <CDropdownItem>Download Student Term Template</CDropdownItem>
              <CDropdownItem>Export Student Term</CDropdownItem>
            </CDropdown>
            <CButton color="outline-primary" @click="myModal = true" class="float-right mr-3">Add More</CButton>
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
    <CModal
      title="Add more students"
      :show.sync="myModal"
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
    }
  },
  props: {
    fields: {
      type: Array,
      default() {
        return ["mssv", "fullname", "DOB", "username", "email", "action"];
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

