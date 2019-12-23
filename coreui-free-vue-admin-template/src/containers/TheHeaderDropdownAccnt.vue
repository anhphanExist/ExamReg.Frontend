<template>
  <div class="d-inline-flex">
    <span class="text-info mt-2 mr-2 font-weight-bold">Quản trị viên</span>
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
  
  export default {
    name: "TheHeaderDropdownAccnt",
    data() {
      return {};
    },
    methods: {
      async logout() {
        await Cookies.remove("token");
        await Cookies.remove("isAdmin");
        await this.$router.push("/login");
      }
    }
  };
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>