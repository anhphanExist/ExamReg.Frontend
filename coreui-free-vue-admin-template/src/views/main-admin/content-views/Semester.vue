<template>
  <div>
    <CCard v-if="!spinner">
      <CCardHeader>
        <slot name="header">
          <CRow>
            <CCol sm="5">
              <div class="pt-2">
                <CIcon name="cil-grid"/>
                Semester List
                <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
              </div>
            </CCol>
            <CCol class="d-none d-md-block" sm="7">
              <CButton
                      @click="myModal = true"
                      class="float-right mr-4"
                      color="outline-info"
              >Add More
              </CButton>
            </CCol>
          </CRow>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
                :fields="fields"
                :items="listSemester"
                :items-per-page="50"
                column-filter
                fixed
                hover
                pagination
                sorter
        >
          <template #number="{item, index}">
            <td>{{index + 1}}</td>
          </template>
          <template #delete="{item, index}">
            <td class="py-2 px-1">
              <CButton
                      @click="deleteSemester(item, index)"
                      color="danger"
                      size="sm"
                      square
                      variant="outline"
                      :disabled="item.id == currentExamProgram.semesterId"
              >Delete
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <!-- Modal -->
    <CModal :centered="true" :show.sync="myModal" color="info" title="Add more Semesters">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Semester Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput horizontal label="Code" plaintext value="Auto generated id 2019_2020_1"/>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.startYear.$invalid"
                        horizontal
                        label="Start year"
                        placeholder="Enter start year"
                        v-model="startYear"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.endYear.$invalid"
                        horizontal
                        label="End year"
                        placeholder="Enter end year"
                        v-model="endYear"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <label class="py-1">Half</label>
              </CCol>
              <CCol sm="9">
                <b-form-select
                        :state="$v.isFirstHalf.$dirty ? !$v.isFirstHalf.$error : null"
                        aria-describedby="input-1-live-feedback"
                        style="position: absolute;width: 92%;left:11px;"
                        v-model="$v.isFirstHalf.$model"
                >
                  <option label="First Half" selected value="true">true</option>
                  <option label="Second Half" value="false">false</option>
                </b-form-select>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <div class="d-flex justify-content-center align-items-center" role="status" v-if="modalSpinner">
        <CSpinner color="success"/>
      </div>
      <div class="alert alert-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</div>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton :disabled="$v.$invalid" @click="addSemester" color="outline-success">Accept</CButton>
      </template>
    </CModal>
    
    <CModal :centered="true" :show.sync="successModal" color="info" title="Alert">
      <CCol sm="12">
        <CCard>
          <CRow>
            <CCol sm="12">
              <div class="alert-success">Thành công</div>
            </CCol>
          </CRow>
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
  import semester from "./data/semesters";
  import {integer, maxLength, minLength, not, numeric, required, sameAs} from "vuelidate/lib/validators";
  import semesterService from "../../../services/admin/semester.service";
  
  const items = semester;
  const fields = [
    {
      key: "number",
      label: "No",
      _style: "width:1%",
      sorter: false,
      filter: false
    },
    {
      key: "code",
      label: "Semester Code",
      _style: "width:17.5%"
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
    data() {
      return {
        items,
        fields,
        successModal: false,
        myModal: false,
        spinner: false,
        modalSpinner: false,
        isFirstHalf: null,
        startYear: "",
        endYear: "",
        modalErrors: "",
        errors: ""
      };
    },
    computed: {
      listSemester() {
        return this.$store.getters.listSemester;
      },
      currentExamProgram() {
        return this.$store.getters.examPeriodCurrentExamProgram;
      }
    },
    validations: {
      startYear: {
        required,
        numeric,
        integer,
        maxLength: maxLength(4),
        minLength: minLength(4)
      },
      endYear: {
        required,
        numeric,
        integer,
        maxLength: maxLength(4),
        minLength: minLength(4),
        notSameAs: not(sameAs("startYear"))
      },
      isFirstHalf: {
        required
      }
    },
    methods: {
      discardModal() {
        this.successModal = false;
        this.myModal = false;
        this.modalErrors = [];
        this.startYear = "";
        this.endYear = "";
        this.isFirstHalf = true;
      },
      async addSemester() {
        this.modalSpinner = true;
        const form = {
          startYear: this.startYear,
          endYear: this.endYear,
          isFirstHalf: this.isFirstHalf
        };
        let res = await semesterService.createSemester(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.myModal = false;
          this.modalErrors = "";
          this.startYear = "";
          this.endYear = "";
          this.isFirstHalf = true;
          await this.$store.dispatch("listSemester");
        }
      },
      async deleteSemester(item, index) {
        this.spinner = true;
        const form = {
          id: item.id
        };
        let res = await semesterService.deleteSemester(form);
        this.spinner = false;
        if (!res.errors.length > 0) {
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listSemester");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("listSemester");
      await this.$store.dispatch("examPeriodCurrentExamProgram");
      this.spinner = false;
    }
  };
</script>