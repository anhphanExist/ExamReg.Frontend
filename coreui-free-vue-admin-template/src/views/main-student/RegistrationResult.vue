<template>
  <CCard>
    <CCardHeader>
      <slot>
        <CRow>
          <CCol sm="5">
            <div>
              <CIcon name="cil-grid" />
              Registration Result
            </div>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CRow>
          <CCol sm=4></CCol>
          <CCol sm=5>
              <h3>{{ currentExamProgram.name }}</h3>
          </CCol>
          <CCol sm=3></CCol>
      </CRow>
      <CRow class="pt-2 px-5">
          <CCol sm="3">
              <CInput
                horizontal
                label="Name:"
                plaintext
                :value="studentInfo.lastName + ' ' + studentInfo.givenName"
              />
          </CCol>
          <CCol sm="3">
              <CInput
                horizontal
                label="MSSV:"
                plaintext
                :value="studentInfo.studentNumber"
              />
          </CCol>
          <CCol sm="3">
              <CInput
                horizontal
                label="Email:"
                plaintext
                :value="studentInfo.email"
              />
          </CCol>
          <CCol sm="3">
              <CInput
                horizontal
                label="DOB:"
                plaintext
                :value="studentInfo.birthday"
              />
          </CCol>
      </CRow>
      <CDataTable
        :fields="fields"
        :items="listExamRoomExamPeriod"
        :items-per-page="50"
        fixed
        hover
        sorter
        pagination
      >
        <template #number="{item, index}">
          <td>{{index + 1}}</td>
        </template>
      </CDataTable>
      <CCol>
        <CButton color="outline-info" class="float-right px-4 mr-4">Export Result</CButton>
      </CCol>
    </CCardBody>
  </CCard>
</template>

<script>
const items = [
  {
    subjectName: "Computer Network",
    examDate: "12/12/2019",
    startHour: "07:00",
    finishHour: "09:00",
    examRoomNumber: "303",
    examRoomAmphitheaterName: "GD2"
  },
  {
    subjectName: "Optimization",
    examDate: "13/12/2019",
    startHour: "07:00",
    finishHour: "09:00",
    examRoomNumber: "303",
    examRoomAmphitheaterName: "GD2"
  }
];
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false
  },
  { key: "subjectName", label: "Subject",_style: "width:10%" },
  { key: "examDate", label: "Exam Date", _style: "width:10%" },
  { key: "startHour", label: "Start Hour",_style: "width:10%" },
  { key: "finishHour", label: "Finish Hour",_style: "width:10%" },
  { key: "examRoomNumber", label: "Room",_style: "width:10%" },
  { key: "examRoomAmphitheaterName", label: "Amphitheater",_style: "width:10%" }
];
export default {
  data() {
    return {
      items,
      fields
    };
  },
  computed: {
    currentExamProgram() {
      return this.$store.getters.registerResultCurrentExamProgram;
    },
    studentInfo() {
      return this.$store.getters.registerResultStudentInfo;
    },
    listExamRoomExamPeriod() {
      return this.$store.getters.registerResultListExamRoomExamPeriod;
    }
  },
  async created() {
    await this.$store.dispatch("registerResultCurrentExamProgram");
    await this.$store.dispatch("registerResultStudentInfo");
    await this.$store.dispatch("registerResultListExamRoomExamPeriod");
  }
};
</script>
