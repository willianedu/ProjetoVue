<template>
  <header>
    <header-component />
    <router-view />
  </header>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import headerComponent from "@/layouts/_partials/Header.vue";

export default {
  components: {
    headerComponent,
  },
};
</script>