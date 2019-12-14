<template>
  <div>
    <CRow>
      <CCol col="8">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong>Your subjects list</strong>
          </CCardHeader>
          <CCardBody>
            <!-- Subject 1 -->
            <CRow>
              <CCol col="8">
                <CAlert color="success" class="alert-dismissible">
                  Computer Network
                  <CButton
                    class="position-absolute"
                    color="success"
                    style="right:10px;top: 50%;transform: translateY(-50%);"
                  >Pick your exam time</CButton>
                </CAlert>
              </CCol>
              <CCol col="2">
                <CSelect  class="py-2" :options="['07:00 - 09:00','10:00 - 12:00','13:00 - 15:00','16:00 - 18:00']" />
              </CCol>
              <CCol col="2">
                <CSelect  class="py-2" :options="['12/12/2019','13/12/2019','14/12/2019','15/12/2019']" />
              </CCol>
            </CRow>
            <!-- Unqualified -->
            <CRow>
              <CCol col="8">
                <CAlert color="danger" class="alert-dismissible">
                  Signal and System
                  <CButton
                    class="position-absolute"
                    color="danger"
                    style="right:10px;top: 50%;transform: translateY(-50%);"
                  >Unqualified!</CButton>
                </CAlert>
              </CCol>
              <CCol col="2">
                <CSelect class="py-2" :options="['Restricted']" disabled/>
              </CCol>
              <CCol col="2">
                <CSelect class="py-2" :options="['Restricted']" disabled/>
              </CCol>
              <CCol>
                <CButton color="outline-info" class="float-right px-4 mt-3 mr-4">Save</CButton>
              </CCol>
            </CRow>
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {};
</script>
