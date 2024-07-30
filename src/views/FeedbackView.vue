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
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="floating">First Name</ion-label>
          <ion-input v-model="feedback.firstName" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Last Name</ion-label>
          <ion-input v-model="feedback.lastName" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" v-model="feedback.email" required></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Organization</ion-label>
          <ion-input v-model="feedback.organization"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Comments</ion-label>
          <ion-textarea v-model="feedback.comments" required></ion-textarea>
        </ion-item>
      </ion-list>

      <ion-button expand="block" @click="submitFeedback"
        >Submit Feedback</ion-button
      >
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
  data() {
    return {
      feedback: {
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        comments: "",
      },
    };
  },
  methods: {
    submitFeedback() {
      console.log("Feedback submitted:", this.feedback);
      // Here you can handle the form submission, e.g., send it to a server or display a confirmation message
    },
  },
};
</script>
