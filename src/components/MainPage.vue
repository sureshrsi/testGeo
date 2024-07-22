<template>
  <ion-page>
    <ion-toolbar>
      <ion-img class="imgsize" :src="imageSrc" alt="Solaris"></ion-img
    ></ion-toolbar>
    <ion-content>
      <ion-card>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <ion-text>
                <h1>SOIL AND LAND RESOURCE INFORMATION SYSTEM</h1>
              </ion-text>
              <ion-text>
                <h3>
                  Natural Resources Inventory for Micro-Level Agricultural
                  Planning (NRIMAP)
                </h3>
              </ion-text>
            </div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col>
            <div>
              <object
                type="image/svg+xml"
                :data="svgData"
                class="svg-content"
              ></object>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-text class="ion-text-justify">
              <h6>
                Arunachal Pradesh Space Applications Centre (APSAC) has developed a remote sensing based field level Soil & Land Resource Information System (SOLARIS) exclusively for the benefit of the farmers of Tawang, Namsai and Lower Subansiri Districts on a Pilot basis, to provide the advisory on Crop Suitability, Site & Crop Specific Nutrient Recommendation and Soil and Water Conservation Measures. This information will be also be useful to the Policy Makers, Planners and Administrators. For more details Click on the following link
              </h6>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-card>
      <ion-card>
        <ion-row>
          <ion-col>
            <div class="image-container">
              <!-- <router-link :to="{ path: '/namsaimapconsole' }"
                ><button><ion-img src="../src/assets/img/NSGRAD.jpg" /></button
              ></router-link> -->
              <!-- <ion-img src="../src/assets/img/NSGRAD.jpg" /> -->
              <button @click="$router.push('/namsaimapconsole')">
                <ion-img :src="nsImg" />
              </button>
              <div class="overlay-text">Namsai</div>
            </div>
          </ion-col>
          <ion-col>
            <div class="image-container">
              <!-- <router-link :to="{ path: '/lsmapconsole' }"
                ><button><ion-img src="../src/assets/img/LSGRAD.jpg" /></button
              ></router-link> -->
              <button @click="$router.push('/lsmapconsole')">
                <ion-img :src="lsImg" />
              </button>
              <div class="overlay-text">Lower Subansari</div>
            </div>
          </ion-col>
          <ion-col>
            <div class="image-container">
              <!-- <router-link :to="{ path: '/twmapconsole' }"
                ><button><ion-img src="../src/assets/img/TWGRAD.jpg" /></button
              ></router-link> -->
              <button @click="$router.push('/twmapconsole')">
                <ion-img :src="twImg" />
              </button>
              <div class="overlay-text">Tawang</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-card>
      <!-- <ion-grid>
        <ion-row>
          <ion-col size="3" class="ion-no-padding ion-no-margin">
            <ion-card class="cardSize">
              <ion-img class="console-image" :src="MapConsole"></ion-img>
              <hr />
              <div class="ion-text-center">
                <ion-text>Namsai</ion-text>
              </div>
            </ion-card>
          </ion-col>
          <ion-col size="9" class="ion-no-padding ion-no-margin">
            <ion-card class="cardSize">
              <ion-row>
                <ion-col>
                  <ion-text>Tawang</ion-text>
                </ion-col>
                <ion-col class="ion-text-end">
                  <ion-text>Head Quarters</ion-text>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-text>District</ion-text>
                </ion-col>
                <ion-col class="ion-text-end">
                  <ion-text>Tawang</ion-text>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-text>Population : 49977</ion-text>
                </ion-col>
              </ion-row>
              <hr />
              <ion-row>
                <ion-col>
                  <ion-text>Area : 2571.89 Sq Km</ion-text>
                </ion-col>
                <ion-col class="ion-text-end">
                  <ion-text>Circle 11</ion-text>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-text> Revenue Villages : 218 </ion-text>
                </ion-col>
                <ion-col class="ion-text-end">
                  <ion-text>Block 6</ion-text>
                </ion-col>
              </ion-row>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid> -->
    </ion-content>
    <ion-footer>
      <ion-row class="ion-padding-left">
        <ion-col>
      <ion-img class="arlogo" :src="arlogo"></ion-img>
    </ion-col>
    <ion-col>
      <ion-img :src="rsiLogo" class="rsiLogo"></ion-img>
    </ion-col>
    </ion-row>
    </ion-footer>
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
  IonRow,
  IonCol,
  IonCard,
  IonText,
  IonGrid,
} from "@ionic/vue";
import Logo from "@/assets/img/SOLARISLogo.png";
import SvgData from "@/assets/img/out3.svg";
import NsImg from "@/assets/img/NSGRAD.jpg";
import LsImg from "@/assets/img/LSGRAD.jpg";
import TwImg from "@/assets/img/TWGRAD.jpg";
import mapConsole from "@/assets/img/Map_Console_Logo.png";
import ArLogo from "@/assets/img/ArLogo.png"
import RSILogo from "@/assets/img/RSILogo.jpg"
export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonImg,
    IonRow,
    IonCol,
    IonCard,
    IonText,
    IonGrid,
  },
  data() {
    return {
      imageSrc: Logo, // Adjust the path according to your project structure
      svgData: SvgData,
      nsImg: NsImg,
      lsImg: LsImg,
      twImg: TwImg,
      MapConsole: mapConsole,
      arlogo:ArLogo,
      rsiLogo:RSILogo
    };
  },
};
</script>
<style scoped>
.svg-content {
  width: 95vw;
  height: 22vh;
}
.imgsize {
  display: block;
  width: 48%;
  height: 100%;
  object-fit: inherit;
  object-position: inherit;
}
object path:hover {
  fill: red;
}

.image-container {
  position: relative;
  display: inline-block;
  border-radius: 1vh;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
}

.arlogo{
  width: 4rem;
  height: 3rem;
  padding-left: 1rem;
}
.rsiLogo{
  width: 12rem;
  height: 3rem;
}
.overlay-text {
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  /* background-color: rgba(
    0,
    0,
    0,
    0.5
  ); */
  padding: 10px;
  border-radius: 5px;
}

.custom-line {
  border-width: thin;
  border: inset;
}
hr {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.console-image {
  position: relative;
  height: 10vh;
  min-height: 5vh;
  min-width: 5vw;
}
.cardSize{
  max-width:max-content;
  max-height:max-content;
}
ion-footer{
  background-color: #3C457C;
}
</style>
