<template>
  <div v-if="featureInfo" class="feature-info">
    <ion-content>
      <div>
      <ion-grid>
        <ion-row>
          <ion-segment v-model="selectedSegment" mode="ios" :scrollable="true" :swipe-gesture="true">
          <ion-segment-button value="segment1">
            <ion-label>LULC</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment2">
            <ion-label>HGEOM</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment3">
            <ion-label>SLOPE</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment4">
            <ion-label>SOIL</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment5">
            <ion-label>CROPS</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment6">
            <ion-label>APLAN</ion-label>
          </ion-segment-button>
        </ion-segment>
        </ion-row>
      </ion-grid>
    </div>
        <div v-if="selectedSegment === 'segment1'">
            <ion-row>
              <ion-list>
                <ion-item v-for="(value, key) in featureInfo" :key="key">
                  {{ value }}
                </ion-item>
              </ion-list>
              <!-- <ion-col v-for="(value, key) in featureInfo" :key="key">
                <ion-text
                  ><strong>{{ key }} </strong></ion-text
                ><br />
                <ion-text
                  ><strong> {{ value }} </strong></ion-text
                >
              </ion-col> -->
              <!-- <ion-col>
                <ion-text><strong>Land use Land Cover : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>Closed Forest</ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text><strong>Area(Ha) : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>15614561</ion-text>
              </ion-col> -->
            </ion-row>
        </div>

        <div v-if="selectedSegment === 'segment2'">
            <ion-row>
              <ion-list>
                <ion-item v-for="(value, key) in heomInfo" :key="key">
                  {{ value }}
                </ion-item>
              </ion-list>
              <!-- <ion-col>
                <ion-text><strong>Geom Unit : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>Hill Slopes</ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text><strong>Lithology : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>Kyanite,Garnet,Muscovite,Biotite Schist</ion-text>
              </ion-col>
              <ion-col>
                <ion-text><strong>Ground water Prospects : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>Poor to Moderate</ion-text>
              </ion-col> -->
            </ion-row>
        </div>
        <div v-if="selectedSegment === 'segment3'">
            <ion-row>
              <ion-list>
                <ion-item v-for="(value, key) in slopeInfo" :key="key">
                  {{ value }}
                </ion-item>
              </ion-list>
              <!-- <ion-col>
                <ion-text><strong>Slope Percentage : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>10-15%</ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text><strong>Slope Description : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>Moderately Sloping</ion-text>
              </ion-col> -->
            </ion-row>
        </div>
        <div v-if="selectedSegment === 'segment4'">
            <ion-row>
              <ion-list>
                <ion-item v-for="(value, key) in soilInfo" :key="key">
                  {{ value }}
                </ion-item>
              </ion-list>
              <!-- <ion-col>
                <ion-text><strong>Mapping Unit : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>SC230</ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text><strong>Slope Description : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text
                  >Gently Sloping, Sandy Clay Loam, Shallow, Strongly
                  Acidic</ion-text
                >
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text><strong>Soil class : </strong></ion-text>
              </ion-col>
              <ion-col>
                <ion-text>Fine Loamy Eutric Humicyepts</ion-text>
              </ion-col> -->
            </ion-row>
        </div>
        <div v-if="selectedSegment === 'segment5'">
            <ion-row>
              <ion-list>
                <ion-item v-for="(value, key) in cropsInfo" :key="key">
                  {{ value }}
                </ion-item>
              </ion-list>
              <!-- <ion-col>
                <ion-text
                  ><strong>Highly Suitable Crops(s1): </strong></ion-text
                >
              </ion-col>
              <ion-col>
                <ion-text>SC230</ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text
                  ><strong>Moderately Suitable Crops(s2) : </strong></ion-text
                >
              </ion-col>
              <ion-col>
                <ion-text>-</ion-text>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-text
                  ><strong>Marginally suitable Crops(s3) : </strong></ion-text
                >
              </ion-col>
              <ion-col>
                <ion-text>Paddy,Kiwi</ion-text>
              </ion-col> -->
            </ion-row>
        </div>
        <div v-if="selectedSegment === 'segment6'">
            <ion-row class="ion-padding">
              <ion-list>
                <ion-item v-for="(value, key) in actionPlanInfo" :key="key">
                  {{ value }}
                </ion-item>
              </ion-list>
              <!-- <ion-text
                ><strong
                  >Action Plan for Resources Development :
                </strong></ion-text
              >
            </ion-row>
            <ion-row class="ion-padding ion-text-justify">
              <ion-text
                >Construction of run off disposal channels in the cultivated
                land; application of 8.00 tonnes/ha of lime and application of
                N, K, Cu, B & Mo</ion-text
              > -->
            </ion-row>
        </div>
        <ion-button expand="block" size="small" @click="$router.push('/generatereport')" class="ion-margin" color="primary">Generate Report</ion-button>
    </ion-content>
  </div>
</template>

<script>
import {
  IonTitle,
  IonCard,
  IonContent,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonCardContent,
  IonLabel,
  IonText,
  IonButton,
  IonButtons,
  IonList,
  IonItem,
} from "@ionic/vue";
export default {
  props: {
    featureInfo: Object,
    heomInfo: Object,
    slopeInfo: Object,
    soilInfo: Object,
    cropsInfo: Object,
    actionPlanInfo: Object,
    isOpen: Boolean,
  },
  data() {
    return { selectedSegment: "segment1" };
  },
  components: {
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonText,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
  },
  created() {
    this.print();
  },
  methods: {
    closeFeatureInfo() {
      this.$emit("close");
    },
    print() {
      console.log("++++++++++++++++", this.featureInfo);
    },
    generateReportPage(){
      this.router.push('/generatereport')
    }
  },
};
</script>
<style scoped>
.feature-info {
  position: fixed;
  bottom: 0;
  width: 95%;
  height: 30vh;
  overflow-y: scroll;
  overflow-x: scroll;
  background-color: rgb(205, 204, 204);
  z-index: 999; /* Ensure it appears above other elements */
  border-top: 1px solid #3c457c;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
ion-card {
  overflow-y: scroll;
  overflow-x: scroll;
  /* background-color: #3C457C; */
  color: #a1a0a5;
  border-radius: 0.5rem;
}
.contentBgColor {
  background-color: #3c457c;
}
/* ion-segment {
  background-color: #3c457c;
  } */
ion-segment-button {
  --indicator-color: #3c457c;
  color: #9b9b9b;
}

</style>
