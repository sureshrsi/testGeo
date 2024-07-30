<template>
  <ion-page>
    <ion-header>
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
    </ion-header>
    <ion-content>
      <ion-card>
        <p>
          Integrated Land and Soil Resources Information System (ILSRIS) is a
          user-friendly web and mobile application which is developed under
          Natural Resources Inventory for Micro Level Agricultural Planning
          (NRIMAP) to provide highly intuitive and effective recommendation
          system which has accurate information and reports for multiple players
          across the Agriculture Ecosystem. Natural Resources Inventory for
          Micro Level Agricultural Planning (under Comprehensive Agriculture
          Management Program NRIMAP) is a pilot project implemented in three
          districts namely Namsai, Lower Subansiri and Tawang selected from
          three elevation regions of Arunachal Pradesh State. ILSRIS is
          designed, developed and implemented by Remote Sensing Instruments LLP
          (RSI LLP), Hyderabad for Arunachal Pradesh Space Applications Centre,
          Department of Science and Technology, Govt. of Arunachal Pradesh.
          ILSRIS is developed using State-of-the-art Geospatial Technologies
          involving Remote Sensing, GIS, Photogrammetry and other GIS
          Technologies. It is implemented using high-resolution satellite data
          from national and international satellite data providers. ILSRIS also
          offers a broad spectrum of maps and information like Base Map,
          Thematic Maps like Agriculture and Other Land Use Land Cover,
          Hydro-geomorphology, Slope, Soil and Soil Derivative Maps, Action Plan
          for Land and Water Resources Development and Crop Suitability Maps on
          1:10,000 scale. A Comprehensive and easy to access soil health report,
          crop suitability and action plan for land and water resources
          development is available for each land parcel and can be downloaded on
          both web and mobile applications. This Highly effective ILSRIS is
          useful for multiple players across agriculture ecosystem and is a
          strong recommendation system for farmers which will in turn increase
          their economic growth by suggesting them to cultivate suitable crops
          with utilizing available nutrients and natural resources.
        </p>
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
