<template>
  <CCard>
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
            <CButton @click="myModal = true" class="float-right mr-4" color="outline-info">Add More</CButton>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
              :fields="fields"
              :items="listSemester"
              :items-per-page=50
              column-filter
              fixed
              hover
              pagination
              sorter
      >
        <template #number="{item, index}">
          <td>
            {{index + 1}}
          </td>
        </template>
        <template #delete="{item, index}">
          <td class="py-2 px-1">
            <CButton
                    @click="toggleDetails(index)"
                    color="danger"
                    size="sm"
                    square
                    variant="outline"
            >Delete
            </CButton>
          </td>
        </template>
      </CDataTable>
    
    </CCardBody>
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
                <CInput
                        horizontal
                        label="Start year"
                        placeholder="Enter start year"
                        v-model="startYear"
                        :is-valid="!$v.startYear.$invalid"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        horizontal
                        label="End year"
                        placeholder="Enter end year"
                        v-model="endYear"
                        :is-valid="!$v.endYear.$invalid"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="3">
                <label class="py-2"> Half</label>
              </CCol>
              <CCol sm="9">
                <select 
                class="form-control position-absolute"
                v-model="isFirstHalf"
                style="right: 115px;width:195px;"
                >
                    <option selected label="First Half" value="true">true</option>
                    <option label="Second Half" value="false">false</option>
                  </select>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                        horizontal
                        label="Code"
                        plaintext
                        value="Auto generated id 2019_2020_1"
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <div class="alert alert-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</div>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton @click="addSemester" color="outline-success" :disabled="$v.$invalid">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
  import semester from './data/semesters'
  import {required, numeric, maxLength, minLength, integer, not, sameAs} from "vuelidate/lib/validators";
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
        myModal: false,
        isFirstHalf: true,
        startYear: "",
        endYear: "",
        modalErrors: "",
        errors: ""
      }
    },
    computed: {
      listSemester() {
        return this.$store.getters.listSemester;
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
      }
    },
    methods: {
      discardModal() {
        this.myModal = false;
        this.modalErrors = [];
        this.startYear = "";
        this.endYear = "";
        this.isFirstHalf = true;
      },
      async addSemester() {
        const form = {
          startYear: this.startYear,
          endYear: this.endYear,
          isFirstHalf: this.isFirstHalf
        };
        let res = await semesterService.createSemester(form);
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        }
        else {
          this.myModal = false;
          this.modalErrors = "";
          this.startYear = "";
          this.endYear = "";
          this.isFirstHalf = true;
          await this.$store.dispatch("listSemester");
        }
      },
      async deleteSemester(item, index) {
        const form = {
          id: item.id
        };
        let res = await semesterService.deleteSemester(form);
        if (!res.errors.length > 0) {
          this.errors = "";
          await this.$store.dispatch("listSemester");
        }
        else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      }
    },
    async created() {
      await this.$store.dispatch("listSemester");
    }
  };
</script>