<template>
  <CCard>
    <CCardHeader>Shift Table</CCardHeader>
    <CCardBody></CCardBody>
    <!-- Modal -->
    <CModal title="Add more rooms" :centered="true" :show.sync="myModal" color="info">
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody></CCardBody>
      </CCard>
    </CModal>
  </CCard>
</template>

<script>
export default {};
</script>