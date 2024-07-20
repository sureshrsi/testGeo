<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Home </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="message">{{ message }}</div>
    </ion-content>
  </ion-page>
</template>

<script>
import { getHello } from "@/services/apiService";

export default {
  name: "HomeOne",
  data() {
    return {
      message: "",
    };
  },
  async mounted() {
    try {
      this.message = await getHello();
    } catch (error) {
      console.error("Error:", error);
    }
  },
};
</script>
