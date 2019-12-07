<template>
  <CCard>
    <CCardHeader>Semester</CCardHeader>
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