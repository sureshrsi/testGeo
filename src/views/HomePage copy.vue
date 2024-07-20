<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar class="header-color">
        <ion-img
          src="../../assets/img/SOLARISLogo.png"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-title> SOIL AND LAND RESOURCE INFORMATION SYSTEM </ion-title>
        <object
          type="image/svg+xml"
          data="../../public/assets/img/out3.svg"
          class="svg-content"
        ></object>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
} from "@ionic/vue";

export default {
  data() {
    return {};
  },
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
  },
};
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.svg-content {
  width: 100%;
  height: auto;
}

path {
  stroke-opacity: 10px;
}
</style>
