<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title>
        <ion-img src="../src/assets/img/SOLARISLogo.png"> </ion-img>
      </ion-title>
      <ion-buttons slot="start">
        <ion-back-button default-href="/main" text="" />
      </ion-buttons>
    </ion-toolbar>
    <ion-content>
      <ion-card style="text-align: center">
        <ion-card-header>
          <ion-card-title
            ><ion-img src="../src/assets/img/ArLogo.png" class="arlogo">
            </ion-img>
            Arunachal Pradesh Space Application Centre</ion-card-title
          >
          <ion-card-subtitle>Dept. of Science & Technology</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>Government of Arunachal Pradesh</p>
          <p>
            Address - Civil Secretariat, ITANAGAR - 791111, Arunachal Pradesh
          </p>
          <p>
            Website:
            <a href="http://www.srsac.arunachal.gov.in" target="_blank"
              >www.srsac.arunachal.gov.in</a
            >
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-img src="../src/assets/img/rsi dark.png"> </ion-img>
        <ion-card-header>
          <ion-card-title>RSI Geotech Pvt. Ltd.</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Plot #7 Type-I IE Kukatpally, Hyderabad, 500072 TS India</p>
          <p>
            Website:
            <a href="http://www.rsigeotech.com" target="_blank"
              >www.rsigeotech.com</a
            >
          </p>
          <p>
            Email: <a href="mailto:info@rsigeotech.com">info@rsigeotech.com</a>
          </p>
          <p>Phone: +91 40 4017 5518 | +91 40 2307 8566</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from "@ionic/vue";

export default {
  data() {
    return {};
  },
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
  },
};
</script>
<style>
.arlogo {
  width: 21vh;
  height: 20vh;
  position: relative;
  text-align: center;
  left: 25%;
}
</style>
