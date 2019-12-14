<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid"/>
              Semester List
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
              :items-per-page="small ? 10 : 10"
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
    <CModal :centered="true" :show.sync="myModal" color="info" title="Add more Modal">
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
              <CCol sm="12">
<!--                <CSelect-->
<!--                        :options="['true', 'false']"-->
<!--                        horizontal-->
<!--                        label="IsFirstHalf"-->
<!--                        :value="isFirstHalf"-->
<!--                        @input="isFirstHalf = $event.target.value"-->
<!--                />-->
                <label>
                  Half
                  <select v-model="isFirstHalf">
                    <option selected label="First Half" value="true">true</option>
                    <option label="Second Half" value="false">false</option>
                  </select>
                </label>
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
    </CModal>
  </CCard>
</template>

<script>
  import semester from './data/semesters'
  import {required, numeric, maxLength, minLength, integer} from "vuelidate/lib/validators";
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
        isFirstHalf: false,
        startYear: "",
        endYear: ""
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
        minLength: minLength(4)
      }
    },
    async created() {
      await this.$store.dispatch("listSemester");
    }
  };
</script>