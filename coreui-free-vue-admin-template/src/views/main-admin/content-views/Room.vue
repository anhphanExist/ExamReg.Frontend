<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Room List
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
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
    <CModal title="Add more rooms" :centered="true" :show.sync="myModal" color="info">
      <CCols sm="12">
        <CCard>
          <CCardHeader>
            <strong>Room Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="4">
                <CInput label="Room Number"/>
              </CCol>
              <CCol sm="4">
                <CInput label="Amphitheater"/>
              </CCol>
              <CCol sm="4">
                <CInput label="PC Quantity"/>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CTextarea label="Description" placeholder="Some note to this room" rows="7" />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCols>
      <template #footer>
        <CButton @click="myModal = false" color="outline-danger">Discard</CButton>
        <CButton @click="myModal = false" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import rooms_data from "./data/rooms";
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  { key: "room_number", _style: "width:17.5%" },
  { key: "amphitheater", _style: "width:17.5%" },
  { key: "pc_quantity", _style: "width:17.5%" },
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
const items = rooms_data;
export default {
  name: "rooms",
  props: [],
  data() {
    return {
      myModal: false,
      items,
      fields
    };
  },
  computed: {
    listExamRoom() {
      return this.$store.getters.listExamRoom;
    }
  },
  async created() {
    await this.$store.dispatch("listExamRoom");
  }
};
</script>