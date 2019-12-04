<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Student List
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
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 10"
        column-filter
        fixed
        hover
        sorter
        pagination
      >
        <template #status="{item}">
          <td>
            <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
          </td>
        </template>
        <template #reset="{item, index}">
          <td class="py-2">
            <CButton
              color="success"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(index)"
            >Reset</CButton>
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
              @click="toggleDetails(index)"
            >Delete</CButton>
          </td>
        </template>
        <template #details="{item, index}">
          <CCollapse :show="details.includes(index)">
            <CCardBody>{{index + 1}} - {{item}}</CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
    </CCardBody>
    <!-- Modal -->
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
                  label="Email"
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
                  label="Day-DOB"
                  :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]"
                />
              </CCol>
              <CCol sm="4">
                <CSelect label="Month-DOB" :options="[1,2,3,4,5,6,7,8,9,10,11,12]" />
              </CCol>
              <CCol sm="4">
                <CSelect
                  label="Year-DOB"
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
import user_data from './data/student'

const fields = [
  { key: "mssv", _style: "width:17.5%"},
  { key: "fullname", _style: "width:17.5%" },
  { key: "DOB", _style: "width:17.5%;" },
  { key: "email", _style: "width:17.5%;" },
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

const items = user_data

export default {
  name: "tables",
  data() {
    return {
      myModal: false,
      items,
      fields,
      details: []
    };
  },
};
</script>