<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Shift List
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="outline-info" class="float-right mr-3" @click="myModal = true">Add More</CButton>
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
        <template #number="{item, index}">
          <td>{{index + 1}}</td>
        </template>
        <template #rooms="{item, index}">
          <td class>
            <CSelect :options="item.rooms" />
          </td>
        </template>
        <template #edit="{item, index}">
          <td class="py-3">
            <CButton
              color="warning"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(index)"
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
              @click="toggleDetails(index)"
            >Delete</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <!-- Modal -->
    <CModal title="Add more shifts" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="14">
        <CCard>
          <CCardHeader>
            <strong>Shift Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput label="Exam Period" value="Final Term 2019-2020" horizontal plaintext />
              </CCol>
              <CCol sm="12">
                <CInput label="Exam Date" horizontal placeholder="Exam occures on which days?" />
              </CCol>
              <CRow></CRow>
              <CCol sm="3">
                <CInput label="Start time" />
              </CCol>
              <CCol sm="3">
                <CInput label="End time" />
              </CCol>
              <CCol sm="6">
                <CSelect label="Subject Name" :options="[1, 2, 3, 4, 5]" />
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
import shifts_data from "./data/shifts";

const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  { key: "subject_name", _style: "width:12.5%" },
  { key: "exam_date", _style: "width:10%" },
  { key: "start_hour", _style: "width:10%" },
  { key: "finish_hour", _style: "width:10%" },
  {
    key: "rooms",
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
      myModal: false,
      items,
      fields
    };
  }
};
</script>