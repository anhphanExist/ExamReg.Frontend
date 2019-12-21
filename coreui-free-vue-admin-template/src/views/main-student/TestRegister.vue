<template>
  <div>
    <CRow v-if="!spinner">
      <CCol col="12">
        <CCard>
          <CCardHeader class="border-white">
            <CIcon name="cil-justify-center"/>
            <strong>{{ currentExamProgram.name }}</strong>
          </CCardHeader>
          <CCardBody class="border-white">
            <div :key="term.id" v-for="(term, index) in listTerm">
              <CRow v-if="term.isQualified">
                <CCol col="12">
                  <div class="alert alert-success">
                    {{ term.subjectName }}
                    <CButton
                            class="position-absolute"
                            style="right:28%;top: 50%;transform: translateY(-50%);"
                            :disabled="true"
                    >Pick your exam time
                    </CButton>
                    <select
                            class="form-control"
                            style="right:10px;top: 50%;transform: translateY(-50%); width: 25%; position: absolute;"
                            :required="true"
                            v-model="selectedExamPeriods[index]"
                    >
                      <option
                              v-for="examPeriod in term.examPeriods"
                              :key="examPeriod.id"
                              :value="examPeriod"
                      >{{ examPeriod.examDate }}. {{ examPeriod.startHour }}:00 - {{examPeriod.finishHour}}:00</option>
                    </select>
                  </div>
                </CCol>
              </CRow>
              <CRow v-if="!term.isQualified">
                <CCol col="12">
                  <CAlert class="alert-dismissible" color="danger">
                    {{ term.subjectName }}
                    <CButton
                            class="position-absolute"
                            style="right:10px;top: 50%;transform: translateY(-50%);"
                            :disabled="true"
                    >Disqualified!
                    </CButton>
                  </CAlert>
                </CCol>
              </CRow>
            </div>
          </CCardBody>
          <CCardFooter class="border-white">
            <CRow>
              <CCol col="12">
                <CButton
                        class="float-right btn-lg"
                        style="width:20%;"
                        color="primary"
                        @click="register"
                >Register</CButton>
              </CCol>
            </CRow>
          </CCardFooter>
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
      for (let i = 0; i < this.listTerm.length; i++) {
        for (let j = 0; j < this.listTerm[i].examPeriods.length; j++) {
          if (this.listCurrentExamPeriod.some(c => c.id == this.listTerm[i].examPeriods[j].id)) {
            this.selectedExamPeriods[i] = this.listTerm[i].examPeriods[j];
          }
        }
      }
      this.spinner = false;
    }
  };
</script>
