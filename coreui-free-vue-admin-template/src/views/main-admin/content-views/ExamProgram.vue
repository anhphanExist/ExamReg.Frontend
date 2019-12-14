<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Exam Program List
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
              @click="toggleDetails(index)"
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
            <CCol sm="12">
              <CInput label="Name" placeholder="Enter exam period name" horizontal />
            </CCol>
            <CCol sm="12">
              <CSelect
                label="Code"
                :options="['2019_2019_1', '2019_2020_2', '2019_2020_3']"
                horizontal
              />
            </CCol>
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
import exam_period_data from "./data/exam_periods";
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
      myModal: false
    };
  },
  computed: {
    listExamProgram() {
      return this.$store.getters.listExamProgram;
    }
  },
  methods: {},
  async created() {
    await this.$store.dispatch("listExamProgram");
  }
};
</script>