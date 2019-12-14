<template>
  <CCard>
    <CCardHeader>
      <slot>
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid"/>
              Watcher
            </div>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
              :fields="fields"
              :items="listExamRoomExamPeriod"
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
        <template #export="{item, index}">
          <td class="py-2">
            <CButton
                    @click="toggleDetails(index)"
                    color="success"
                    size="sm"
                    square
                    variant="outline"
            >Export
            </CButton>
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
    {key: "subject", _style: "width:10%"},
    {key: "roomNumber", label: "Room", _style: "width:5%"},
    {key: "amphitheaterName", label: "amphi", _style: "width:5%"},
    {key: "examDate", _style: "width:5%"},
    {key: "startHour", label: "Start", _style: "width:1%"},
    {key: "finishHour", label: "Finish", _style: "width:1%"},
    {key: "computerNumber", label: "PC Quantity", _style: "width:5%"},
    {
      key: "export",
      label: "",
      _style: "width:5%",
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
    },
    computed: {
      listExamRoomExamPeriod() {
        return this.$store.getters.listExamRoomExamPeriod;
      }
    },
    async created() {
      await this.$store.dispatch("listExamRoomExamPeriod");
    }
  };
</script>