<template>
  <CHeader fixed with-subheader light>
    <CToggler in-header class="ml-3 d-lg-none" v-c-emit-root-event:toggle-sidebar-mobile />
    <CToggler in-header class="ml-3 d-md-down-none" v-c-emit-root-event:toggle-sidebar />
    <CHeaderBrand
      class="mx-auto d-lg-none"
      src="./img/exam-svgrepo-com.svg"
      width="97"
      height="46"
      alt="ExamReg Logo"
    />
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink
          class="text-success h4 mt-2 font-weight-bold"
          to="/dashboard"
        >EXAM REGISTRATION</CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0" />
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt
  }
};
</script>
