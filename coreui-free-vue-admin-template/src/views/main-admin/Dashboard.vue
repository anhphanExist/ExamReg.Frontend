<template>
  <CCard>
    <CCardHeader>
      <slot>
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Watcher
            </div>
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
        <template #export="{item, index}">
          <td class="py-2">
            <CButton
              color="success"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(index)"
            >Export</CButton>
          </td>
        </template>
        </CDataTable>    
    </CCardBody>
    <!-- Modal -->
  </CCard>
</template>

<script>
import data from "./content-views/data/dash_board";
const items = data;
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  { key: "subject", _style: "width:12%" },
  { key: "room_number", _style: "width:12%" },
  { key: "amphitheater", _style: "width:12%" },
  { key: "exam_date", _style: "width:12%" },
  { key: "duration", _style: "width:12%" },
  { key: "pc_quantity", _style: "width:12%" },
  { key: "pc_available", _style: "width:12%" },
  {
    key: "export",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
];
export default {
    data() {
        return {
            items,
            fields
        }
    }
};
</script>