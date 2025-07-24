<template>
  <div class="d-flex">
    <NavBar v-if="showNavbar" />

    <div class="content flex-grow-1 position-relative p-3">
      <!-- Show Nav toggle button only if NavBar is shown -->
      <button v-if="showNavbar" class="btn NavButton" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        ☰
      </button>

      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();

    // Only hide navbar on login page
    const showNavbar = computed(() => route.name !== "login");

    return {
      showNavbar,
    };
  },
  mounted() {
    this.$store.dispatch('getUsers')

  },

  computed: {

  },
}; 
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  max-height: 99vh;
  min-width: 99vh;
  font-family: "Lato", 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.content {
  width: 100%;
  position: relative;
  padding: 1rem;
  /* Matches .p-3 Bootstrap class */
}

.NavButton {
  background-color: #0c2c47;
  color: #97d3cd;
  font-size: large;
  position: absolute;
  left: 20px;
  top: 30px;
}

.NavButton:hover {
  border: #0c2c47 solid 2px;
}

@font-face {
  font-family: OreganFont;
  src: url("@/assets/Fonts/OregonLdo-d9q7.ttf");
}
</style>
