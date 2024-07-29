<template>
  <!-- IonAlert for exit confirmation -->
  <ion-page>
    <MainPage />
    <!-- IonAlert for exit confirmation -->
    <ion-alert
      v-if="showExitAlert"
      :is-open="showExitAlert"
      header="Exit App"
      message="Are you sure you want to exit the app?"
      :buttons="[
        { text: 'Cancel', role: 'cancel', handler: cancelExit },
        { text: 'Exit', role: 'confirm', handler: confirmExit },
      ]"
    ></ion-alert>
  </ion-page>
</template>
<script>
import MainPage from "../components/MainPage.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { App } from "@capacitor/app";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const showExitAlert = ref(false);

    const handleBackButton = () => {
      if (router.currentRoute.value.path === "/main") {
        showExitAlert.value = true;
      } else {
        router.back();
      }
    };

    const cancelExit = () => {
      showExitAlert.value = false;
    };

    const confirmExit = () => {
      App.exitApp();
    };

    onMounted(() => {
      App.addListener("backButton", handleBackButton);
    });

    onUnmounted(() => {
      App.removeListener("backButton", handleBackButton);
    });

    // Listen for Ionic's ionBackButton event to handle swipe back gesture
    document.addEventListener("ionBackButton", (ev) => {
      ev.detail.register(10, (processNextHandler) => {
        handleBackButton();
        processNextHandler();
      });
    });

    return {
      showExitAlert,
      cancelExit,
      confirmExit,
    };
  },
  components: {
    MainPage,
  },
};
</script>
