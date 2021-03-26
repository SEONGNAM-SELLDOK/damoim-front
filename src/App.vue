<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { modal } from './components/Modal/Modal'

export default {
  name: "App",
  components: { modal },
  directives: { modal },
  created() {
    const currentPath = this.$router.history.current.path;

    if (!window.localStorage.getItem("authenticated")) {
      this.$router.push("/login");
    }

    if (currentPath === "/" || currentPath === "/app") {
      this.$router.push("/app/dashboard");
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
