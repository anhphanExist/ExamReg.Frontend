<template>
  <div>
    <CRow>
      <CCol lg='12'>
        <CTableWrapper
          hover
          striped
          boredered
          small
          fixed
        />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import CTableWrapper from './Tables/StudentTable.vue'

export default {
  name: "Table",
  components: {CTableWrapper},
};
</script>

