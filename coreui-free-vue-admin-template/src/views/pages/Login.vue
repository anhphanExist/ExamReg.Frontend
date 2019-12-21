<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="justify-content-center">
      <CCol md="8">
        <CCardGroup>
          <CCard
                  body-wrapper
                  class="text-center py-5 d-md-down-none"
                  color="success"
                  style="width:44%"
                  text-color="white"
                  variant='outline'
          >
            <h2>EXAM REGISTRATION</h2>
            <p class="text-muted">This is a a login pages, you need to login to access to the one of the best test registration product in
              Vietnam, feels free to contact us if you have further discussion.</p>
<!--            <CButton-->
<!--                    class="mt-3"-->
<!--                    color="danger"-->
<!--                    size="sm"-->
<!--                    square-->
<!--            >-->
<!--              Access Now!-->
<!--            </CButton>-->
          </CCard>
          <CCard class="p-4 justify-content-center">
            <CCardBody>
              <CForm>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                        label="Username"
                        :is-valid="!$v.username.$invalid"
                        v-model = "username"
                        autocomplete="username email"
                        placeholder="Username"
                        invalid-feedback="This field must be filled and accept only alphanumeric"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user"/>
                  </template>
                </CInput>
                <CInput
                        label="Password"
                        autocomplete="curent-password"
                        placeholder="Password"
                        type="password"
                        :is-valid="!$v.password.$invalid"
                        v-model = "password"
                        invalid-feedback="This field must be filled and accept at least 5 characters"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked"/>
                  </template>
                </CInput>
                <CRow>
                  <CCol col="4">
                    <CButton class="px-4" color="success" @click="login" :disabled="$v.$invalid">Login</CButton>
                  </CCol>
                  <CCol col="1">
                    <CSpinner v-if="spinner" color="success"/>
                  </CCol>
                  <CCol class="text-right" col="6">
                    <CButton class="px-0" color="link">Forgot password?</CButton>
                  </CCol>
                </CRow>
                <div class="alert alert-danger mt-2" v-if="errors.length > 0">{{ errors }}</div>
              </CForm>
            </CCardBody>
          </CCard>
          
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
  
  import {alphaNum, minLength, required} from "vuelidate/lib/validators";
  import authService from "../../services/authentication.service";
  
  export default {
    name: 'Login',
    data() {
      return {
        username: "",
        password: "",
        errors: "",
        spinner: false
      };
    },
    validations: {
      username: {
        required,
        alphaNum
      },
      password: {
        required,
        minLength: minLength(5)
      }
    },
    methods: {
      async login() {
        this.spinner = true;
        this.errors = "";
        let form = {
          username: this.username,
          password: this.password
        };
        let res = await authService.login(form);
        if (res.errors.length > 0) {
          this.spinner = false;
          let temp = res.errors[0].split(".")[2];
          this.errors = (" " + temp).slice(1);
        }
        else {
          this.spinner = false;
          await this.$router.push("/dashboard");
        }
      }
    }
  }
</script>
