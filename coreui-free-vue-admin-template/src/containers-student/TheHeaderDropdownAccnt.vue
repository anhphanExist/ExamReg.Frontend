<template>
  <div class="d-inline-flex">
    <span class="text-info mt-2 mr-2 font-weight-bold">{{ studentInfo.lastName + " " + studentInfo.givenName }}</span>
    <CDropdown add-menu-classes="pt-0" class="c-header-nav-items" inNav placement="bottom-end">
      <template #toggler>
        <CHeaderNavLink>
          <div class="c-avatar">
            <img class="c-avatar-img" src="/img/avatars/avatar-default.jpg"/>
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownHeader class="text-center" color="light" tag="div">
        <strong>Cài đặt</strong>
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon name="cil-user"/>
        Thông tin cá nhân
      </CDropdownItem>
      <CDropdownItem>
        <CIcon name="cil-settings"/>
        Cài đặt
      </CDropdownItem>
      <CDropdownDivider/>
      <CDropdownItem @click="logout">
        <CIcon name="cil-lock-locked"/>
        Đăng xuất
      </CDropdownItem>
    </CDropdown>
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  import registerResultService from "../services/student/register-result.service";
  
  export default {
    name: "TheHeaderDropdownAccnt",
    data() {
      return {
        studentInfo: {}
      };
    },
    methods: {
      async logout() {
        await Cookies.remove("token");
        await this.$router.push("/login");
      }
    },
    async created() {
      this.studentInfo = {...await registerResultService.getStudentInfo()};
    }
  };
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>