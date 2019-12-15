<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="1">
            <div class="pt-3">
              <CIcon name="cil-grid" />
              Subjects
            </div>
          </CCol>
          <CCol sm="4" class="d-none d-md-block">
            <div class="py-2">
              <CSelect
                class="float-left"
                :options="['Semster 2019_2020_1','Semster 2019_2020_2','Semster 2019_2020_3']"
              />
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <div class="py-2">
              <CDropdown
                class="float-right"
                toggler-text="More Action"
                color="outline-info"
                placement="bottom-end"
              >
                <CDropdownItem>1</CDropdownItem>
                <CDropdownItem>2</CDropdownItem>
                <CDropdownItem>3</CDropdownItem>
              </CDropdown>
              <CButton
                color="outline-info"
                @click="myModal = true"
                class="float-right mr-3"
              >Add More</CButton>
            </div>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="listTerm"
        :fields="fields"
        :item-per-page="small ? 10:10"
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
              @click="deleteTerm(item, index)"
            >Delete</CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
    <!-- Modal -->
    <CModal title="Add more subject" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Subject Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        horizontal label="Name"
                        placeholder="Enter Subject Name"
                        v-model="subjectName"
                        :is-valid="!$v.subjectName.$invalid"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
<!--                <CSelect-->
<!--                  horizontal-->
<!--                  label="Semester"-->
<!--                  :options="['Semster 2019_2020_1','Semster 2019_2020_2','Semster 2019_2020_3']"-->
<!--                />-->
                <label>
                  Semester
                  <select v-model="semesterCode">
                    <option v-for="semester in dropListSemester" value="semester.code" :key="semester.id">{{ semester.code }}</option>
                  </select>
                </label>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton @click="addTerm" color="outline-success">Accept</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import subjects from "./data/subjects";
import {required} from "vuelidate/lib/validators";
import termService from "../../../services/admin/term.service";

const items = subjects;
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  {
    key: "subjectName",
    label: "Subject Name",
    _style: "width:17.5%"
  },
  {
    key: "semesterCode",
    label: "Semester Code",
    _style: "width: 10%"
  },
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
export default {
  data() {
    return {
      myModal: false,
      items,
      fields,
      subjectName: "",
      semesterCode: "",
      errors: "",
      modalErrors: ""
    };
  },
  computed: {
    listTerm() {
      return this.$store.getters.listTerm;
    },
    dropListSemester() {
      return this.$store.getters.dropListSemester;
    }
  },
  validations: {
    subjectName: {
      required
    }
  },
  methods: {
    discardModal() {
      this.modalErrors = "";
      this.myModal = false;
      this.subjectName = "";
      this.semesterCode = "";
    },
    async addTerm() {
      let form = {
        subjectName: this.subjectName,
        semesterCode: this.semesterCode
      };
      let res = await termService.createTerm(form);
      if (res.errors.length > 0) {
        let temp = res.errors[0].split(".")[2];
        this.modalErrors = (" " + temp).slice(1);
      }
      else {
        this.myModal = false;
        this.modalErrors = "";
        this.subjectName = "";
        this.semesterCode = "";
        await this.$store.dispatch("listTerm");
      }
    },
    async deleteTerm(item, index) {
      const form = {
        id: item.id
      };
      let res = await termService.deleteTerm(form);
      if (!res.errors.length > 0) {
        this.errors = "";
        await this.$store.dispatch("listTerm");
      }
      else {
        let temp = res.errors[0].split(".")[2];
        this.errors = (" " + temp).slice(1);
      }
    }
  },
  async created() {
    await this.$store.dispatch("listTerm");
    await this.$store.dispatch("dropListSemester");
  }
};
</script>