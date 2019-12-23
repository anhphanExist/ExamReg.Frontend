<template>
  <div>
    <CCard v-if="!spinner">
      <CCardHeader>
        <slot name="header">
          <CRow>
            <CCol sm="5">
              <div class="pt-1">
                <CIcon class="mb-1" name="cil-grid"/>
                Danh sách ca thi: {{ currentExamProgram.name }}
                <span class="text-danger ml-4" v-if="errors.length > 0">{{ errors }}</span>
              </div>
            </CCol>
            <CCol class="d-none d-md-block" sm="7">
              <CButton @click="addExamPeriodModal = true" class="float-right mr-3" color="outline-info">Thêm mới
              </CButton>
            </CCol>
          </CRow>
        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
                :fields="fields"
                :items="listExamPeriod"
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
          <template #examRooms="{item, index}">
            <td>
              <!--              <select class="form-control">-->
              <!--                <option :key="examRoom.id" v-for="examRoom in item.examRooms">{{ examRoom.code }}</option>-->
              <!--              </select>-->
              <CDropdown
                      class="text-secondary"
                      color="outline-muted"
                      toggler-text="All rooms"
              >
                <CDropdownItem :key="examRoom.id" v-for="examRoom in item.examRooms">{{ examRoom.code }}</CDropdownItem>
              </CDropdown>
            </td>
          </template>
          <template #edit="{item, index}">
            <td class="py-3">
              <CButton
                      @click="editExamPeriod(item)"
                      color="warning"
                      size="sm"
                      square
                      variant="outline"
              >Sửa phòng thi
              </CButton>
            </td>
          </template>
          <template #delete="{item, index}">
            <td class="py-3">
              <CButton
                      @click="deleteExamPeriod(item, index)"
                      color="danger"
                      size="sm"
                      square
                      variant="outline"
              >Xoá
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
    <!-- Add Modal -->
    <CModal :centered="true" :show.sync="addExamPeriodModal" color="info" title="Add more shifts">
      <CCol sm="14">
        <CCard>
          <CCardHeader>
            <strong>Ca thi</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        :value="currentExamProgram.name"
                        horizontal
                        label="Kì thi"
                        plaintext
                />
              </CCol>
              <CCol sm="12">
                <CInput
                        :is-valid="!$v.examDate.$invalid"
                        horizontal
                        label="Ngày thi"
                        type="date"
                        v-model="examDate"
                />
              </CCol>
              <CCol sm="12">
                <label class="mb-4">
                  Tên môn học
                </label>
                <b-form-select
                  class="form-control position-absolute"
                  style="width: 70%; left: 124px; bottom: 20px;"
                  aria-describedby="input-1-live-feedback"
                  :state="$v.selectedTermId.$dirty ? !$v.selectedTermId.$error : null"
                  v-model="$v.selectedTermId.$model">
                    <option :key="term.id" v-for="term in dropListTerm" :value="term.id">{{ term.subjectName }}</option>
                  </b-form-select>
              </CCol>
              <CCol sm="6">
                <CInput
                        :is-valid="!$v.startHour.$invalid"
                        label="Giờ bắt đầu"
                        v-model="startHour"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                        :is-valid="!$v.finishHour.$invalid"
                        label="Giờ kết thúc"
                        v-model="finishHour"
                />
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
        <CButton :disabled="$v.examDate.$invalid || $v.startHour.$invalid || $v.finishHour.$invalid || $v.selectedTermId.$invalid" @click="addExamPeriod" color="outline-success">Accept</CButton>
      </template>
    </CModal>
    <!-- Edit Modal  -->
    <CModal :centered="true" :show.sync="editExamPeriodModal" color="info" title="Edit shifts">
      <CCol sm="14">
        <CCard>
          <CCardHeader>
            <strong>Ca thi</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                        :value="currentExamProgram.name"
                        horizontal
                        label="Kì thi"
                        plaintext
                />
              </CCol>
              <CCol sm="12">
                <CInput
                        :value="chosenExamPeriod.examDate"
                        horizontal
                        label="Ngày thi"
                        plaintext
                        v-model="chosenExamPeriod.examDate"
                />
              </CCol>
              
              <CCol sm="3">
                <CInput
                        :value="chosenExamPeriod.startHour"
                        label="Giờ bắt đầu"
                        plaintext
                        v-model="chosenExamPeriod.startHour"
                />
              </CCol>
              <CCol sm="3">
                <CInput
                        :value="chosenExamPeriod.finishHour"
                        label="Giờ kết thúc"
                        plaintext
                        v-model="chosenExamPeriod.finishHour"
                />
              </CCol>
              <CCol sm="6">
                <CInput
                        :value="chosenExamPeriod.subjectName"
                        label="Tên môn học"
                        plaintext
                        v-model="chosenExamPeriod.subjectName"
                />
              </CCol>
              <CCol sm="12">
                <label>Phòng thi khả dụng</label>
                <multiselect
                        :multiple="true"
                        :options="optional_rooms"
                        :taggable="true"
                        label="code"
                        placeholder="Search for a room"
                        track-by="code"
                        v-model="value_rooms"
                >
                </multiselect>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <div class="d-flex justify-content-center align-items-center" role="status" v-if="modalSpinner">
        <CSpinner color="success"/>
      </div>
      <div class="alert alert-danger" v-show="!validateEditRooms">Yêu cầu ca thi phải có phòng thi</div>
      <div class="alert alert-danger" v-if="modalErrors.length > 0">{{ modalErrors }}</div>
      <template #footer>
        <CButton @click="discardModal" color="outline-danger">Discard</CButton>
        <CButton :disabled="!validateEditRooms" @click="acceptUpdateExamPeriod" color="outline-success">Accept</CButton>
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
  import Multiselect from 'vue-multiselect'
  import shifts_data from "./data/shifts";
  import {integer, numeric, required} from "vuelidate/lib/validators";
  import examPeriodService from "../../../services/admin/exam-period.service";
  import examRegUtils from "../../../utils/exam-reg-utils";
  
  const fields = [
    {
      key: "number",
      label: "No",
      _style: "width:1%",
      sorter: false,
      filter: false
    },
    {key: "subjectName", label: "Môn học", _style: "width:10%"},
    {key: "examDate", label: "Ngày thi", _style: "width:5%"},
    {key: "startHour", label: "Bắt đầu", _style: "width:5%"},
    {key: "finishHour", label: "Kết thúc", _style: "width:5%"},
    {
      key: "examRooms",
      label: "Các phòng thi",
      _style: "width:5%",
      sorter: false,
      filter: false
    },
    {
      key: "edit",
      label: "",
      _style: "width:3%",
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
  const items = shifts_data;
  
  export default {
    name: "shifts",
    props: [],
    components: {
      Multiselect
    },
    data() {
      return {
        successModal: false,
        addExamPeriodModal: false,
        editExamPeriodModal: false,
        spinner: false,
        modalSpinner: false,
        items,
        fields,
        selectedTermId: "",
        examDate: "",
        startHour: "",
        finishHour: "",
        modalErrors: "",
        errors: "",
        chosenExamPeriod: {},
        value_rooms: [],
        optional_rooms: [],
      };
    },
    computed: {
      listExamPeriod() {
        return this.$store.getters.listExamPeriod;
      },
      dropListTerm() {
        return this.$store.getters.examPeriodDropListTerm;
      },
      currentExamProgram() {
        return this.$store.getters.examPeriodCurrentExamProgram;
      },
      validateEditRooms() {
        return this.value_rooms.length > 0;
      }
    },
    validations: {
      examDate: {
        required
      },
      startHour: {
        required,
        numeric,
        integer
      },
      finishHour: {
        required,
        numeric,
        integer
      },
      selectedTermId: {
        required
      },
      value_rooms: {
        required
      }
    },
    methods: {
      discardModal() {
        this.successModal = false;
        this.editExamPeriodModal = false;
        this.addExamPeriodModal = false;
        this.modalErrors = "";
        this.selectedTermId = "";
        this.examDate = "";
        this.startHour = "";
        this.finishHour = "";
        this.value_rooms = [];
        this.optional_rooms = [];
      },
      async addExamPeriod() {
        this.modalSpinner = true;
        const form = {
          examDate: examRegUtils.inverseDate(this.examDate),
          startHour: this.startHour,
          finishHour: this.finishHour,
          termId: this.selectedTermId,
          examProgramId: this.currentExamProgram.id
        };
        let res = await examPeriodService.createExamPeriod(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.discardModal();
          this.spinner = true;
          await this.$store.dispatch("listExamPeriod");
          this.spinner = false;
        }
      },
      async deleteExamPeriod(item, index) {
        this.spinner = true;
        const form = {
          id: item.id
        };
        let res = await examPeriodService.deleteExamPeriod(form);
        this.spinner = false;
        if (!res.errors.length > 0) {
          this.successModal = true;
          this.errors = "";
          await this.$store.dispatch("listExamPeriod");
        } else {
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
      },
      async editExamPeriod(item) {
        this.chosenExamPeriod = item;
        this.value_rooms = [...item.examRooms];
        const form = {
          examDate: item.examDate,
          startHour: item.startHour,
          finishHour: item.finishHour
        };
        this.optional_rooms = [...await examPeriodService.selectListAvailableExamRoom(form)];
        for (let index = 0; index < this.value_rooms.length; index++) {
          const element = this.value_rooms[index];
          this.optional_rooms.push(element);
        }
        this.editExamPeriodModal = true;
      },
      async acceptUpdateExamPeriod() {
        this.modalSpinner = true;
        const form = {
          id: this.chosenExamPeriod.id,
          examRooms: this.value_rooms
        };
        let res = await examPeriodService.updateExamPeriod(form);
        this.modalSpinner = false;
        if (res.errors.length > 0) {
          let temp = res.errors[0].split(".")[2];
          this.modalErrors = (" " + temp).slice(1);
        } else {
          this.discardModal();
          this.spinner = true;
          await this.$store.dispatch("examPeriodCurrentExamProgram");
          await this.$store.dispatch("examPeriodDropListTerm");
          await this.$store.dispatch("listExamPeriod");
          this.spinner = false;
        }
      }
    },
    async created() {
      this.spinner = true;
      await this.$store.dispatch("examPeriodCurrentExamProgram");
      await this.$store.dispatch("examPeriodDropListTerm");
      await this.$store.dispatch("listExamPeriod");
      this.spinner = false;
    }
  };
</script>