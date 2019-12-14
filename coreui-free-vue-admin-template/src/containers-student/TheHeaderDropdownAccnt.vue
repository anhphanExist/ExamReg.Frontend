<template>
  <CDropdown add-menu-classes="pt-0" class="c-header-nav-items" inNav placement="bottom-end">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img class="c-avatar-img" src="./img/2.jpg"/>
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader class="text-center" color="light" tag="div">
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user"/>
      Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings"/>
      Settings
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked"/>
      Logout
    </CDropdownItem>
  </CDropdown>
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