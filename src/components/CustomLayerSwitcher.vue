<template>
  <ion-card>
    <ion-list>
      <ion-item v-for="layer in layers" :key="layer.get('title')">
        <ion-label>{{ layer.get("title") }}</ion-label>
        <ion-toggle
          :checked="layer.getVisible()"
          @ionChange="toggleLayer(layer)"
        >
        </ion-toggle>
      </ion-item>
    </ion-list>
  </ion-card>
</template>

<script>
import { IonCard, IonItem, IonLabel, IonList, IonToggle } from "@ionic/vue";

export default {
  props: {
    layers: Array,
  },
  components: {
    IonCard,
    IonItem,
    IonLabel,
    IonList,
    IonToggle,
  },
  methods: {
    toggleLayer(layer) {
      layer.setVisible(!layer.getVisible());
    },
  },
};
</script>
