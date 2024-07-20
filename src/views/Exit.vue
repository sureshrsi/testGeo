<template>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
import { App } from "@capacitor/app";

export default defineComponent({
  name: "Exit",
  mounted() {
    App.exitApp();
  },
});
</script>
