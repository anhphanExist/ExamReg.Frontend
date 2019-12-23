<template>
  <div>
    <div v-if="!spinner">
      <CCard>
        <CCardHeader>
          <slot>
            <CRow>
              <CCol sm="5">
                <div>
                  <CIcon name="cil-grid"/>
                  Phiếu báo dự thi
                </div>
              </CCol>
            </CRow>
          </slot>
        </CCardHeader>
        <CCardBody id="section-to-print">
          <CRow>
            <CCol sm=4></CCol>
            <CCol sm=5>
              <h3 style="font-family:Lato,sans-serif;">{{ currentExamProgram.name }}</h3>
            </CCol>
            <CCol sm=3></CCol>
          </CRow>
          <CRow class="pt-3 px-5">
            <CCol sm="3">
              <CInput
                      :value="studentInfo.lastName + ' ' + studentInfo.givenName"
                      label="Họ và tên:"
                      plaintext
              />
            </CCol>
            <CCol sm="3">
              <CInput
                      :value="studentInfo.studentNumber"
                      label="Mã số sinh viên:"
                      plaintext
              />
            </CCol>
            <CCol sm="3">
              <CInput
                      :value="studentInfo.email"
                      label="Email:"
                      plaintext
              />
            </CCol>
            <CCol sm="3">
              <CInput
                      :value="studentInfo.birthday"
                      label="Ngày sinh:"
                      plaintext
              />
            </CCol>
          </CRow>
          <CDataTable
                  :fields="fields"
                  :items="listExamRoomExamPeriod"
                  :items-per-page="50"
                  fixed
                  hover
                  pagination
                  sorter
          >
            <template #number="{item, index}">
              <td>{{index + 1}}</td>
            </template>
          </CDataTable>
        </CCardBody>
        <CCardFooter>
          <CCol>
            <CButton @click="exportResult" class="btn float-right px-4 mr-4" color="primary">Export Result</CButton>
          </CCol>
          <CCol>
            <CButton @click="printResult" class="btn float-right px-4 mr-4" color="info">Print Result</CButton>
          </CCol>
        </CCardFooter>
      </CCard>
    </div>
    
    <div class="d-flex justify-content-center align-items-center" role="status" v-if="spinner">
      <CSpinner color="success"/>
    </div>
  
  </div>
</template>

<script>
  import registerResultService from "../../services/student/register-result.service";
  
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
    {key: "subjectName", label: "Subject", _style: "width:15%"},
    {key: "examDate", label: "Exam Date", _style: "width:10%"},
    {key: "startHour", label: "Start Hour", _style: "width:3%"},
    {key: "finishHour", label: "Finish Hour", _style: "width:3%"},
    {key: "examRoomNumber", label: "Room", _style: "width:5%"},
    {key: "examRoomAmphitheaterName", label: "Amphitheater", _style: "width:5%"}
  ];
  export default {
    data() {
      return {
        items,
        fields,
        spinner: false
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
    methods: {
      printResult() {
        window.print();
      },
      async exportResult() {
        this.spinner = true;
        await registerResultService.printExamRegisterResult();
        this.spinner = false;
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("registerResultCurrentExamProgram");
      await this.$store.dispatch("registerResultStudentInfo");
      await this.$store.dispatch("registerResultListExamRoomExamPeriod");
      this.spinner = false;
    }
  };
</script>

<style>
  @media print {
    body * {
      visibility: hidden;
    }
    #section-to-print, #section-to-print * {
      visibility: visible;
    }
    #section-to-print {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>
