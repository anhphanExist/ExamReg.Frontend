<template>
  <div>
    <CRow v-if="!spinner">
      <CCol col="10">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center"/>
            <strong>{{ currentExamProgram.name }}</strong>
          </CCardHeader>
          <CCardBody>
            <div :key="term.id" v-for="(term, index) in listTerm">
              <CRow v-if="'term.isQualified'">
                <CCol col="8">
                  <CAlert class="alert-dismissible" color="success">
                    {{ term.subjectName }}
                    <CButton
                            class="position-absolute"
                            color="success"
                            style="right:10px;top: 50%;transform: translateY(-50%);"
                            :disabled="true"
                    >Pick your exam time
                    </CButton>
                  </CAlert>
                </CCol>
                <CCol col="3">
                    <select class="form-control mt-2" v-model="selectedExamPeriods[index]">
                      <option v-for="examPeriod in term.examPeriods" :key="examPeriod.id" :value="examPeriod">{{ examPeriod.examDate }}. {{ examPeriod.startHour }}:00 - {{examPeriod.finishHour}}:00</option>
                    </select>
                </CCol>
              </CRow>
              <CRow v-else>
                <CCol col="8">
                  <CAlert class="alert-dismissible" color="danger">
                    {{ term.subjectName }}
                    <CButton
                            class="position-absolute"
                            color="danger"
                            style="right:10px;top: 50%;transform: translateY(-50%);"
                            :disabled="true"
                    >Unqualified!
                    </CButton>
                  </CAlert>
                </CCol>
                <CCol col="2">
                  <CSelect :options="['Restricted']" class="py-2" disabled/>
                </CCol>
                <CCol col="2">
                  <CSelect :options="['Restricted']" class="py-2" disabled/>
                </CCol>
              </CRow>
            </div>
            <CRow>
              <CCol>
                <CButton class="float-right px-4 mt-3 mr-4" color="primary" @click="register">Register</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CModal :centered="true" :show.sync="alertModal" color="info" title="Alert">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Register Result Message</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <div class="alert-success" v-if="!errors.length > 0">{{ registerMessageResult }}</div>
                <div class="alert-danger" v-if="errors.length > 0">{{ registerMessageResult }}</div>
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
  import registerService from "../../services/student/register.service";
  
  export default {
    data() {
      return {
        alertModal: false,
        selectedExamPeriods: [],
        errors: "",
        registerMessageResult: "",
        spinner: false
      };
    },
    computed: {
      listTerm() {
        return this.$store.getters.registerListTerm;
      },
      currentExamProgram() {
        return this.$store.getters.registerCurrentExamProgram;
      },
      listCurrentExamPeriod() {
        return this.$store.getters.registerListCurrentExamPeriod;
      }
    },
    methods: {
      discardModal() {
        this.alertModal = false;
        this.errors = "";
      },
      async register() {
        this.spinner = true;
        const form = {
          examPeriods: this.selectedExamPeriods
        };
        let res = await registerService.registerExam(form);
        if (!res.errors.length > 0) {
          this.errors = "";
          this.registerMessageResult = res.message;
          await this.$store.dispatch("registerListCurrentExamPeriod");
        }
        else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
          this.registerMessageResult = res.message;
        }
        this.spinner = false;
        this.alertModal = true;
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("registerListTerm");
      await this.$store.dispatch("registerCurrentExamProgram");
      await this.$store.dispatch("registerListCurrentExamPeriod");
      this.spinner = false;
    }
  };
</script>
