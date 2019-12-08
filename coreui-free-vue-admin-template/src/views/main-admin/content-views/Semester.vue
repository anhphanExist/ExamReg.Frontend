<template>
  <CCard>
    <CCardHeader>
      <slot name="header">
        <CRow>
          <CCol sm="5">
            <div class="pt-2">
              <CIcon name="cil-grid" />
              Semester List
            </div>
          </CCol>
          <CCol sm="7" class="d-none d-md-block">
            <CButton color="outline-info" @click="myModal = true" class="float-right mr-4">Add More</CButton>
          </CCol>
        </CRow>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 10"
        column-filter
        fixed
        hover
        sorter
        pagination
      >
      <template #number="{item, index}">
        <td>
          {{index + 1}}
        </td>
      </template>
      <template #delete="{item, index}">
          <td class="py-2 px-1">
            <CButton
              color="danger"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(index)"
            >Delete</CButton>
          </td>
        </template>
      </CDataTable>
      
    </CCardBody>
    <!-- Modal -->
    <CModal title="Add more Modal" :centered="true" :show.sync="myModal" color="info">
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <strong>Semester Info</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12">
                <CInput
                label="Start year"
                placeholder="Enter start year"
                horizontal
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                label="End year"
                placeholder="Enter end year"
                horizontal
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CSelect
                label="Half"
                :options="['First', 'Second']"
                horizontal
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <CInput
                label="Code"
                value="Auto generated id 2019_2020_1"
                horizontal
                plaintext
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
const items = semester
const fields = [
  {
    key:"number",
    label: "No",
    _style: "width:1%",
    sorter: false,
    filter: false
  },
  {
    key: "code", _style: "width:17.5%"
  },
  {
    key: "delete",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
]
export default {
  data() {
    return {
      items,
      fields,
      myModal: false,
    }
  }
};
</script>