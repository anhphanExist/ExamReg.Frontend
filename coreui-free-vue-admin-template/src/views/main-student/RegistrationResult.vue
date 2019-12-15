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
              <h3>Registration Result - 10/12/2019</h3>
          </CCol>
          <CCol sm=3></CCol>
      </CRow>
      <CRow class="pt-2 px-5">
          <CCol sm="3">
              <CInput
                horizontal
                label="Name:"
                plaintext
                value="Student Name"
              />
          </CCol>
          <CCol sm="3">
              <CInput
                horizontal
                label="MSSV:"
                plaintext
                value="17020000"
              />
          </CCol>
          <CCol sm="3">
              <CInput
                horizontal
                label="Email:"
                plaintext
                value="student@mail.com"
              />
          </CCol>
          <CCol sm="3">
              <CInput
                horizontal
                label="DOB:"
                plaintext
                value="29/02/1999"
              />
          </CCol>
      </CRow>
      <CDataTable
        :fields="fields"
        :items="items"
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
    subject: "Computer Network",
    exam_date: "12/12/2019",
    start_hour: "07:00",
    finish_hour: "09:00",
    room: "303",
    amphitheater: "GD2"
  },
  {
    subject: "Optimization",
    exam_date: "13/12/2019",
    start_hour: "07:00",
    finish_hour: "09:00",
    room: "303",
    amphitheater: "GD2"
  }
];
const fields = [
  {
    key: "number",
    label: "No",
    _style: "width:1%",
    sorter: false
  },
  { key: "subject", _style: "width:10%" },
  { key: "exam_date", label: "Exam Date", _style: "width:10%" },
  { key: "start_hour", _style: "width:10%" },
  { key: "finish_hour", _style: "width:10%" },
  { key: "room", _style: "width:10%" },
  { key: "amphitheater", _style: "width:10%" }
];
export default {
  data() {
    return {
      items,
      fields
    };
  }
};
</script>
