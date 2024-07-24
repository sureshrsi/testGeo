<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title
          ><ion-img src="../src/assets/img/SOLARISLogo.png"> </ion-img
        ></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <div class="bgColor">
          <ion-row>
            <ion-col class="ion-text-center" v-show="showNamsai">
              <ion-card>
                <ion-text
                  ><h4>{{ pageTitle }}</h4></ion-text
                >
                <hr />
                <ion-card-content>
                <ion-select
                  interface="popover"
                  label="Select Circle"
                  label-placement="floating"
                  placeholder="Select Circle"
                  fill="outline"
                  v-model="selectedCircleGid"
                  @update:modelValue="getGrid(), getVillage()"
                >
                  <ion-select-option
                    v-for="circle in circleNamesList"
                    :key="circle.gid"
                    :value="circle.gid"
                    >{{ circle.cir_name }}</ion-select-option
                  >
                </ion-select>
              </ion-card-content>
                <ion-segment
                  v-model="selectedSegment"
                  mode="ios"
                  :scrollable="true"
                >
                  <ion-segment-button value="segment1">
                    <ion-label>Grid No</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment2">
                    <ion-label>Village</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment3">
                    <ion-label>Watershed</ion-label>
                  </ion-segment-button>
                </ion-segment>
                <ion-card-content>
                <div v-if="selectedSegment === 'segment1'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Grid No"
                    label-placement="floating"
                    placeholder="Select Grid No"
                    fill="outline"
                  >
                    <ion-select-option
                      v-for="grid in gridNoList"
                      :key="grid.gid"
                      >{{ grid.grid_no }}</ion-select-option
                    >
                  </ion-select>
                </div>
                <div v-if="selectedSegment === 'segment2'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Village"
                    label-placement="floating"
                    placeholder="Select Village"
                    fill="outline"
                  >
                    <ion-select-option
                      v-for="village in villageNamesList"
                      :key="village.gid"
                      >{{ village.name }}</ion-select-option
                    >
                  </ion-select>
                </div>
                <div v-if="selectedSegment === 'segment3'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Watershed"
                    label-placement="floating"
                    placeholder="Select Watershed"
                    fill="outline"
                  >
                    <ion-select-option value="circle1"
                      >Circle 1</ion-select-option
                    >
                    <ion-select-option value="circle2"
                      >Circle 2</ion-select-option
                    >
                  </ion-select>
                </div>
                </ion-card-content>
              </ion-card>
              <ion-card class="cardSize">
                <ion-text><h4>Layer Control</h4></ion-text>
                <ion-card>
                  <ion-list>
                    <ion-item v-for="layer in layers" :key="layer.get('title')">
                      <ion-label>{{ layer.get("title") }}</ion-label>
                      <ion-toggle
                        :checked="layer.getVisible()"
                        @ionChange="toggleLayer(layer)"
                        justify="end"
                        :enable-on-off-labels="true"
                      >
                      </ion-toggle>
                    </ion-item>
                  </ion-list>
                </ion-card>
              </ion-card>
              <ion-card class="cardSize">
                <ion-text><h4>Legend</h4></ion-text>
                <ion-card-content>
                  <div v-if="legendUrl" class="legend">
                    <img :src="legendUrl" alt="Legend Image" /></div
                ></ion-card-content>
              </ion-card>
            </ion-col>

            <!-- ls content -->
            <ion-col class="ion-text-center" v-show="showLS">
              <ion-card>
                <ion-text
                  ><h4>{{ pageTitle }}</h4></ion-text
                >
                <hr />
<ion-card-content>
                <ion-select
                  class="ion-margin-top"
                  interface="popover"
                  label="Select Circle"
                  label-placement="floating"
                  placeholder="Select Circle"
                  fill="outline"
                  v-model="selectedCircleGid"
                  @update:modelValue="getGrid(), getVillage()"
                >
                  <ion-select-option
                    v-for="circle in circleNamesList"
                    :key="circle.gid"
                    :value="circle.gid"
                    >{{ circle.cir_name }}</ion-select-option
                  >
                </ion-select>
              </ion-card-content>

                <ion-segment
                  v-model="selectedSegment"
                  mode="ios"
                  :scrollable="true"
                >
                  <ion-segment-button value="segment1">
                    <ion-label>Grid No</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment2">
                    <ion-label>Village</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment3">
                    <ion-label>Watershed</ion-label>
                  </ion-segment-button>
                </ion-segment>
<ion-card-content>
                <div v-if="selectedSegment === 'segment1'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Grid No"
                    label-placement="floating"
                    placeholder="Select Grid No"
                    fill="outline"
                  >
                    <ion-select-option
                      v-for="grid in gridNoList"
                      :key="grid.gid"
                      >{{ grid.grid_no }}</ion-select-option
                    >
                  </ion-select>
                </div>
                <div v-if="selectedSegment === 'segment2'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Village"
                    label-placement="floating"
                    placeholder="Select Village"
                    fill="outline"
                  >
                    <ion-select-option
                      v-for="village in villageNamesList"
                      :key="village.gid"
                      >{{ village.name }}</ion-select-option
                    >
                  </ion-select>
                </div>
                <div v-if="selectedSegment === 'segment3'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Watershed"
                    label-placement="floating"
                    placeholder="Select Watershed"
                    fill="outline"
                  >
                    <ion-select-option value="circle1"
                      >Circle 1</ion-select-option
                    >
                    <ion-select-option value="circle2"
                      >Circle 2</ion-select-option
                    >
                  </ion-select>
                </div>
              </ion-card-content>
              </ion-card>
              <ion-card class="cardSize">
                <ion-text><h4>Layer Control</h4></ion-text>
                <ion-card>
                  <ion-list>
                    <ion-item v-for="layer in layers" :key="layer.get('title')">
                      <ion-label>{{ layer.get("title") }}</ion-label>
                      <ion-toggle
                        :checked="layer.getVisible()"
                        @ionChange="toggleLayer(layer)"
                        justify="end"
                        :enable-on-off-labels="true"
                      >
                      </ion-toggle>
                    </ion-item>
                  </ion-list>
                </ion-card>
              </ion-card>
              <ion-card class="cardSize">
                <ion-text><h4>Legend</h4></ion-text>
                <ion-card-content>
                  <div v-if="legendUrl" class="legend">
                    <img :src="legendUrl" alt="Legend Image" /></div
                ></ion-card-content>
              </ion-card>
            </ion-col>

            <!-- tw content -->
            <ion-col class="ion-text-center" v-show="showTW">
              <ion-card>
                <ion-text
                  ><h4>{{ pageTitle }}</h4></ion-text
                >
                <hr />
<ion-card-content>
                <ion-select
                  class="ion-margin-top"
                  interface="popover"
                  label="Select Circle"
                  label-placement="floating"
                  placeholder="Select Circle"
                  fill="outline"
                  v-model="selectedCircleGid"
                  @update:modelValue="getGrid(), getVillage()"
                >
                  <ion-select-option
                    v-for="circle in circleNamesList"
                    :key="circle.gid"
                    :value="circle.gid"
                    >{{ circle.cir_name }}</ion-select-option
                  >
                </ion-select>
              </ion-card-content>
                <ion-segment
                  v-model="selectedSegment"
                  mode="ios"
                  :scrollable="true"
                >
                  <ion-segment-button value="segment1">
                    <ion-label>Grid No</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment2">
                    <ion-label>Village</ion-label>
                  </ion-segment-button>
                  <ion-segment-button value="segment3">
                    <ion-label>Watershed</ion-label>
                  </ion-segment-button>
                </ion-segment>
<ion-card-content>
                <div v-if="selectedSegment === 'segment1'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Grid No"
                    label-placement="floating"
                    placeholder="Select Grid No"
                    fill="outline"
                  >
                    <ion-select-option
                      v-for="grid in gridNoList"
                      :key="grid.gid"
                      >{{ grid.grid_no }}</ion-select-option
                    >
                  </ion-select>
                </div>
                <div v-if="selectedSegment === 'segment2'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Village"
                    label-placement="floating"
                    placeholder="Select Village"
                    fill="outline"
                  >
                    <ion-select-option
                      v-for="village in villageNamesList"
                      :key="village.gid"
                      >{{ village.name }}</ion-select-option
                    >
                  </ion-select>
                </div>
                <div v-if="selectedSegment === 'segment3'">
                  <ion-select
                    class="ion-margin-top"
                    interface="popover"
                    label="Select Watershed"
                    label-placement="floating"
                    placeholder="Select Watershed"
                    fill="outline"
                  >
                    <ion-select-option value="circle1"
                      >Circle 1</ion-select-option
                    >
                    <ion-select-option value="circle2"
                      >Circle 2</ion-select-option
                    >
                  </ion-select>
                </div>
              </ion-card-content>
              </ion-card>

              <ion-card class="cardSize">
                <ion-text><h4>Layer Control</h4></ion-text>
                <ion-card>
                  <ion-list>
                    <ion-item v-for="layer in layers" :key="layer.get('title')">
                      <ion-label>{{ layer.get("title") }}</ion-label>
                      <ion-toggle
                        :checked="layer.getVisible()"
                        @ionChange="toggleLayer(layer)"
                        justify="end"
                        :enable-on-off-labels="true"
                      >
                      </ion-toggle>
                    </ion-item>
                  </ion-list>
                </ion-card>
              </ion-card>
              <ion-card class="cardSize">
                <ion-text><h4>Legend</h4></ion-text>
                <ion-card-content>
                  <div v-if="legendUrl" class="legend">
                    <img :src="legendUrl" alt="Legend Image" /></div
                ></ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row>
          <ion-text class="textAlign" color="light">
        About Us|Feedback|Contact Us
      </ion-text>
    </ion-row>
        </div>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
<script>
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonCard,
  IonLabel,
  IonToggle,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonImg,
  IonText,
  IonRow,
  IonCol,
  IonCardContent,
} from "@ionic/vue";
import { useRoute } from "vue-router";
import axios from "axios";
// import { getGridDetails } from "../services/sideMenuApi";
export default {
  props: {
    layers: Array,
    legendUrl: String,
  },
  data() {
    return {
      selectedSegment: "segment1",
      circleNamesList: "",
      selectedCircleGid: "",
      gridNoList: "",
      villageNamesList: "",
      showNamsai: "",
    };
  },
  components: {
    IonToolbar,
    IonContent,
    IonHeader,
    IonMenu,
    IonButtons,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonCard,
    IonLabel,
    IonToggle,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonImg,
    IonText,
    IonRow,
    IonCol,
    IonCardContent,
  },
  computed: {
    pageTitle() {
      return this.getPageTitle();
    },
  },
  created() {
    this.getCircle();
  },
  methods: {
    toggleLayer(layer) {
      layer.setVisible(!layer.getVisible());
    },
    getPageTitle() {
      const route = useRoute();

      switch (route.path) {
        case "/":
          return "Home";
        case "/namsaimapconsole":
          this.showNamsai = true;
          return "Namsai";
        case "/lsmapconsole":
          this.showLS = true;
          return "Lower Subansari";
        case "/twmapconsole":
          this.showTW = true;
          return "Tawang";
        // Add more cases for other routes
        default:
          return "Default Title";
      }
    },
    async getCircle() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/circle/getcircle`
        );
        this.circleNamesList = response.data;
        console.log("Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getGrid() {
      try {
        console.log("selected circle name", this.selectedCircleGid);
        const response = await axios.get(
          `http://localhost:3000/api/v1/grid/getGridByCircleGid`,
          {
            params: { query: this.selectedCircleGid },
          }
        );
        this.gridNoList = response.data;
        console.log("Data:", this.gridNoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async getVillage() {
      try {
        console.log("selected circle name", this.selectedCircleGid);
        const response = await axios.get(
          `http://localhost:3000/api/v1/village/getVillageByCircleGid`,
          {
            params: { query: this.selectedCircleGid },
          }
        );
        this.villageNamesList = response.data;
        console.log("Data:", this.gridNoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
<style>
.bgColor {
  background-color: #3c457c;
}
hr {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.segment-button-checked {
  color: #e6e7ea;
  /* background-color: #3c457c; */
}
ion-segment-button{
  color: rgb(108, 106, 106);
}
/* ion-segment{
  color:rgb(237, 11, 11);
} */
/* ion-img{
  height:2rem;
  width:10rem;
  padding-left: 1rem;
  justify-content: center;
  display: flex;
  align-items: center;
} */
 .cardSize{
  height: 15.6rem;
  overflow-y: scroll;
 }
ion-card{
  border-radius: 1rem;
}
.textAlign{
  align-items: center;
  text-align: center;
}
</style>
