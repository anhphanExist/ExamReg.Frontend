<template>
  <div>
    <CCard v-if="!spinner">
      <CCardHeader>
        <slot>
          <CRow>
            <CCol sm="5">
              <div class="pt-2">
                <CIcon name="cil-grid"/>
                Watcher {{ currentExamProgram.name }}
              </div>
            </CCol>
          </CRow>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
                :fields="fields"
                :items="listExamRoomExamPeriod"
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
          <template #export="{item, index}">
            <td class="py-2">
              <CButton
                      color="success"
                      size="sm"
                      square
                      variant="outline"
                      @click="exportStudent(item)"
              >Export
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <!-- Modal -->
    <CModal :centered="true" :show.sync="alertModal" color="info" title="Alert">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Export Result Message</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <div class="alert-success">Xuất excel thành công</div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <template #footer>
        <CButton @click="discardModal" color="primary">Ok</CButton>
      </template>
    </CModal>
    
    <div class="d-flex justify-content-center align-items-center" role="status" v-if="spinner">
      <CSpinner color="success"/>
    </div>
  </div>
</template>

<script>
  import data from "./content-views/data/dash_board";
  import watcherService from "../../services/admin/watcher.service";
  
  const items = data;
  const fields = [
    {
      key: "number",
      label: "No",
      _style: "width:1%",
      sorter: false,
      filter: false
    },
    {key: "subjectName", _style: "width:15%"},
    {key: "examRoomNumber", label: "Room", _style: "width:3%"},
    {key: "examRoomAmphitheaterName", label: "amphi", _style: "width:3%"},
    {key: "examDate", _style: "width:5%"},
    {key: "startHour", label: "Start", _style: "width:1%"},
    {key: "finishHour", label: "Finish", _style: "width:1%"},
    {key: "examRoomComputerNumber", label: "PC Quantity", _style: "width:1%"},
    {key: "currentNumberOfStudentRegistered", label: "Students", _style: "width:3%"},
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
        fields,
        spinner: false,
        alertModal: false
      }
    },
    computed: {
      listExamRoomExamPeriod() {
        return this.$store.getters.watcherListExamRoomExamPeriod;
      },
      currentExamProgram() {
        return this.$store.getters.watcherCurrentExamProgram;
      }
    },
    methods: {
      discardModal() {
        this.alertModal = false;
      },
      async exportStudent(item) {
        this.spinner = true;
        const form = {
          examPeriodId: item.examPeriodId,
          examRoomId: item.examRoomId,
          examProgramName: item.examProgramName,
          examDate: item.examDate,
          startHour: item.startHour,
          finishHour: item.finishHour,
          subjectName: item.subjectName,
          examRoomNumber: item.examRoomNumber,
          examRoomAmphitheaterName: item.examRoomAmphitheaterName
        };
        await watcherService.exportStudent(form);
        this.spinner = false;
        this.alertModal = true;
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("watcherListExamRoomExamPeriod");
      await this.$store.dispatch("watcherCurrentExamProgram");
      this.spinner = false;
    }
  };
</script>