<template>
  <div v-if="lulcInfo" class="feature-info">
    <ion-content>
      <div>
        <ion-grid>
          <ion-row>
            <ion-segment v-model="selectedSegment" mode="ios">
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
              <!-- <ion-segment-button value="segment5">
                <ion-label>CROPS</ion-label>
              </ion-segment-button>
              <ion-segment-button value="segment6">
                <ion-label>APLAN</ion-label>
              </ion-segment-button> -->
            </ion-segment>
          </ion-row>
        </ion-grid>
      </div>
      <div v-if="selectedSegment === 'segment1'">
        <ion-card>
          <ion-card-title>Land Use Land Cover</ion-card-title>
          <div
            v-for="info in lulcInfo"
            v-html="info"
            :key="info"
            style="color: black; padding: 5px; background-color: #ffffff"
          ></div>
        </ion-card>
      </div>

      <div v-if="selectedSegment === 'segment2'">
        <ion-card>
          <ion-card-title>Hydrogeomorphology</ion-card-title>
          <div
            v-for="info in heomInfo"
            v-html="info"
            :key="info"
            style="color: black; padding: 5px; background-color: #ffffff"
          ></div>
          <!-- <ion-list>
            <ion-item v-for="(value, key) in heomInfo" :key="key">
              {{ value }}
            </ion-item>
          </ion-list>
         -->
        </ion-card>
      </div>
      <div v-if="selectedSegment === 'segment3'">
        <ion-card>
          <ion-card-title>Slope Information</ion-card-title>
          <div
            v-for="info in slopeInfo"
            v-html="info"
            :key="info"
            style="color: black; padding: 5px; background-color: #ffffff"
          ></div>
          <!-- <ion-list>
            <ion-item v-for="(value, key) in slopeInfo" :key="key">
              {{ value }}
            </ion-item>
          </ion-list> -->
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
        </ion-card>
      </div>
      <div v-if="selectedSegment === 'segment4'">
        <ion-card>
          <ion-card-title>Soil Information</ion-card-title>
          <div
            v-html="soilInfoUI[1]"
            style="color: black; padding: 5px; background-color: #ffffff"
          ></div>
          <div
            v-html="soilInfoUI[3]"
            style="color: black; padding: 5px; background-color: #ffffff"
          ></div>
          <div
            v-html="soilInfoUI[4]"
            style="color: black; padding: 5px; background-color: #ffffff"
          ></div>
          <!-- <ion-list>
            <ion-item>{{ soilInfoUI[1] }}</ion-item>
            <ion-item>{{ soilInfoUI[3] }}</ion-item>
            <ion-item>{{ soilInfoUI[4] }}</ion-item>
          </ion-list> -->
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
        </ion-card>
      </div>
      <!-- <div v-if="selectedSegment === 'segment5'">
        <ion-card>
          <ion-list>
            <ion-item v-for="(value, key) in cropsInfo" :key="key">
              {{ value }}
            </ion-item>
          </ion-list>
        </ion-card>
        
      </div> -->
      <!-- <div v-if="selectedSegment === 'segment6'">
        <ion-card>
          <ion-list>
            <ion-item v-for="(value, key) in actionPlanInfo" :key="key">
              {{ value }}
            </ion-item>
          </ion-list>
        </ion-card>
      </div> -->
      <ion-card>
        <ion-card-title>Generate Report</ion-card-title>
        <ion-button
          expand="block"
          size="small"
          @click="generateReportPage"
          class="ion-margin"
          color="primary"
          >Crop Suitability / Action Plan</ion-button
        >
      </ion-card>

      <div v-if="loading" class="loading-indicator">
        Generating PDF, please wait...
        <div class="spinner"></div>
        <!-- You can style this spinner with CSS -->
      </div>

      <div v-show="(showDiv = false)">
        <div ref="contentToConvert" class="content-to-convert">
          <div class="report-title-container">
            <img
              slot="start"
              :src="mapLogo"
              alt="Left Image"
              class="report-image left-image"
            />
            <div>
              <h4 class="report-title" style="font-size: 14px">
                Natural Resources Inventory for Micro Level Agricultural
                Planning
                <br />
              </h4>

              <h5 class="report-title" style="font-size: 12px">
                Arunachal Pradesh Space Application Centre <br />
              </h5>
              <br />
              <h6 class="report-title" style="font-size: 10px">
                Government of Arunachal Pradesh
              </h6>
            </div>

            <img
              slot="end"
              :src="imgLogo"
              alt="Right Image"
              class="report-image right-image"
            />
          </div>
          <div style="display: flex">
            <!-- <img
              :src="imgLogo"
              alt="Right Image"
              style="width: 8vh; height: 8vh; margin: 5px"
            /> -->
            <div v-if="extentImageUrl" style="margin: 5px">
              <img
                :src="extentImageUrl"
                alt="Feature Extent Image"
                id="reportImg"
                height="100"
                width="400"
              />
            </div>
            <table border="1" style="margin: 5px">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Circle</th>
                  <th>10k Grid</th>
                  <th style="width: 130px" scope="row">Graticules</th>
                </tr>
              </thead>
              <tbody id="test">
                <tr>
                  <td>{{ distCirlce[0] }}</td>
                  <td>{{ distCirlce[1] }}</td>
                  <td>{{ gridInfo[0] }}</td>
                  <td width="150px" id="latlong">
                    {{ gridInfo[1] }}
                    <!-- 27° 37′ 02.61992″ N 91° 42′ 09.01367″ E -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- First Table -->
          <h6 style="margin-top: 20px"><strong>Soil Information</strong></h6>
          <table border="1" style="margin-top: 10px; margin-bottom: 10px">
            <thead>
              <tr>
                <th>Description</th>
                <th>Value</th>
                <th>Description</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Soil Code</strong></td>
                <td>{{ soilInfo[0] }}</td>
                <td><strong>Exchangeable Sodium (meq/100 g)</strong></td>
                <td>{{ soilInfo[19] }}</td>
              </tr>
              <tr>
                <td><strong>Land Use / Land Cover</strong></td>
                <td>{{ soilInfo[6] }}</td>
                <td><strong>Exchangeable Potassium (meq/100 g)</strong></td>
                <td>{{ soilInfo[20] }}</td>
              </tr>
              <tr>
                <td><strong>Physiography</strong></td>
                <td>{{ soilInfo[7] }}</td>
                <td><strong>CEC (meq/100 g)</strong></td>
                <td>{{ soilInfo[21] }}</td>
              </tr>
              <tr>
                <td><strong>Parent Material</strong></td>
                <td>{{ soilInfo[8] }}</td>
                <td><strong>Base Saturation (%)</strong></td>
                <td>{{ soilInfo[22] }}</td>
              </tr>
              <tr>
                <td><strong>Slope (%)</strong></td>
                <td>{{ soilInfo[9] }}</td>
                <td><strong>Available Nitrogen (kg/ha)</strong></td>
                <td>{{ soilInfo[23] }}</td>
              </tr>
              <tr>
                <td><strong>Drainage</strong></td>
                <td>{{ soilInfo[10] }}</td>
                <td><strong>Available Phosphorus (kg/ha)</strong></td>
                <td>{{ soilInfo[24] }}</td>
              </tr>
              <tr>
                <td><strong>Soil Erosion Status</strong></td>
                <td>{{ soilInfo[11] }}</td>
                <td><strong>Available Potassium (kg/ha)</strong></td>
                <td>{{ soilInfo[25] }}</td>
              </tr>
              <tr>
                <td><strong>Soil Depth</strong></td>
                <td>{{ soilInfo[12] }}</td>
                <td><strong>Available Sulphur (ppm)</strong></td>
                <td>{{ soilInfo[26] }}</td>
              </tr>
              <tr>
                <td><strong>Soil Texture</strong></td>
                <td>{{ soilInfo[13] }}</td>
                <td><strong>Available Iron (ppm)</strong></td>
                <td>{{ soilInfo[27] }}</td>
              </tr>
              <tr>
                <td><strong>pH (1:2.5)</strong></td>
                <td>{{ soilInfo[14] }}</td>
                <td><strong>Available Manganese (ppm)</strong></td>
                <td>{{ soilInfo[28] }}</td>
              </tr>
              <tr>
                <td><strong>EC (dsm-1)</strong></td>
                <td>{{ soilInfo[15] }}</td>
                <td><strong>Available Copper (ppm)</strong></td>
                <td>{{ soilInfo[29] }}</td>
              </tr>
              <tr>
                <td><strong>Organic Carbon (%)</strong></td>
                <td>{{ soilInfo[16] }}</td>
                <td><strong>Available Zinc (ppm)</strong></td>
                <td>{{ soilInfo[30] }}</td>
              </tr>
              <tr>
                <td><strong>Exchangeable Calcium (meq/100 g)</strong></td>
                <td>{{ soilInfo[17] }}</td>
                <td><strong>Available Boron (ppm)</strong></td>
                <td>{{ soilInfo[31] }}</td>
              </tr>
              <tr>
                <td><strong>Exchangeable Magnesium (meq/100 g)</strong></td>
                <td>{{ soilInfo[18] }}</td>
                <td><strong>Available Molybdenum (ppm)</strong></td>
                <td>{{ soilInfo[32] }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Second Table -->
          <h6 style="margin-top: 10px">
            <strong>Crop Suitability Recommendations</strong>
          </h6>
          <table border="1" style="margin-top: 10px; margin-bottom: 10px">
            <thead>
              <tr>
                <th>Category</th>
                <th>Food Crops</th>
                <th>Vegetable Crops</th>
                <th>Oil Seeds</th>
                <th>Fruit Crops</th>
                <th>Spices</th>
                <th>Commercial Crops</th>
                <th>Highly Tolorent Crops to Acidity</th>
                <th>Silvi Culture</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td><strong>Highly Suitable Crops (S1)</strong></td>
                <td>{{ cropsInfo[3] }}</td>
                <td>{{ cropsInfo[4] }}</td>
                <td>{{ cropsInfo[5] }}</td>
                <td>{{ cropsInfo[6] }}</td>
                <td>{{ cropsInfo[7] }}</td>
                <td>{{ cropsInfo[8] }}</td>
                <td>{{ cropsInfo[9] }}</td>
                <td>{{ cropsInfo[10] }}</td>
              </tr>
              <tr>
                <td><strong>Moderately Suitable Crops (S2)</strong></td>
                <td>{{ cropsInfo[11] }}</td>
                <td>{{ cropsInfo[12] }}</td>
                <td>{{ cropsInfo[13] }}</td>
                <td>{{ cropsInfo[14] }}</td>
                <td>{{ cropsInfo[15] }}</td>
                <td>{{ cropsInfo[16] }}</td>
                <td>{{ cropsInfo[17] }}</td>
                <td>{{ cropsInfo[18] }}</td>
              </tr>
              <tr>
                <td><strong>Marginally Suitable Crops (S3)</strong></td>
                <td>{{ cropsInfo[19] }}</td>
                <td>{{ cropsInfo[20] }}</td>
                <td>{{ cropsInfo[21] }}</td>
                <td>{{ cropsInfo[22] }}</td>
                <td>{{ cropsInfo[23] }}</td>
                <td>{{ cropsInfo[24] }}</td>
                <td>{{ cropsInfo[25] }}</td>
                <td>{{ cropsInfo[26] }}</td>
              </tr>
            </tbody>
          </table>

          <!-- Third Table -->
          <h6 style="margin-top: 20px">
            <strong>Action Plan Recommendations</strong>
          </h6>
          <table border="1" style="margin-top: 10px">
            <tbody>
              <tr>
                <th>Activity</th>
                <th>Recommendations</th>
              </tr>
              <tr>
                <td>
                  <strong> Soil & Water Conservation Measures </strong>
                </td>
                <td>{{ actionPlanInfo[1] }}</td>
              </tr>
              <tr>
                <td>
                  <strong>
                    Lime Requirement (tons/ha as CaO) to raise the pH to
                    6.4</strong
                  >
                </td>
                <td>{{ actionPlanInfo[2] }}</td>
              </tr>
              <tr>
                <td><strong>Application of Major Nutrients</strong></td>
                <td>{{ actionPlanInfo[3] }}</td>
              </tr>
              <tr>
                <td><strong>Application of Micro Nutrients</strong></td>
                <td>{{ actionPlanInfo[4] }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Footer -->
          <div class="footer">
            Powered by <br />
            Arunachal Pradesh Space Application Centre & Remote Sensing
            Instruments LLP
          </div>
        </div>
      </div>
    </ion-content>
  </div>
</template>

<script>
import {
  IonCard,
  IonContent,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonCardTitle,
} from "@ionic/vue";
import html2pdf from "html2pdf.js";
import arLogo from "@/assets/img/ArLogo.png";
import cropLogo from "@/assets/img/Map_Console_Logo.png";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export default {
  props: {
    distCirlce: Object,
    gridInfo: Object,
    lulcInfo: Object,
    heomInfo: Object,
    slopeInfo: Object,
    soilInfo: Object,
    soilInfoUI: Object,
    cropsInfo: Object,
    actionPlanInfo: Object,
    isOpen: Boolean,
    extentImageUrl: String,
  },
  data() {
    return {
      selectedSegment: "segment1",
      imgLogo: arLogo,
      mapLogo: cropLogo,
      selectedImage: this.extentImageUrl,
      loading: false, // Add loading state
    };
  },
  components: {
    IonButton,
    IonContent,
    IonRow,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardTitle,
    IonList,
    IonItem,
  },
  methods: {
    closeFeatureInfo() {
      this.$emit("close");
    },
    loadImage() {
      this.selectedImage = this.extentImageUrl;
      console.log("selected image", this.selectedImage);
    },
    print() {
      console.log("++++++++++++++++", this.featureInfo);
    },
    getBase64Image(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = (error) => reject(error);
      });
    },
    async generateReportPage() {
      this.loading = true; // Set loading to true
      try {
        // Generate a date-only timestamp in the format YYYYMMDD
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        const dateStamp = `${day}${month}${year}`;
        const pdfName = this.soilInfo[0] + dateStamp + ".pdf";
        const imageUrl = this.extentImageUrl;
        const base64Image = await this.getBase64Image(imageUrl);

        const element = this.$refs.contentToConvert;
        const imgElement = element.querySelector("#reportImg");
        imgElement.src = base64Image;

        const options = {
          margin: 0.5,
          filename: pdfName,
          image: { type: "png", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        const pdfContent = await html2pdf()
          .set(options)
          .from(element)
          .outputPdf("datauristring");
        const base64String = pdfContent.split(",")[1];

        await Filesystem.writeFile({
          path: pdfName,
          data: base64String,
          directory: Directory.Documents,
          encoding: Encoding.Base64,
        });

        alert("PDF saved successfully! Check your documents folder.");
      } catch (error) {
        console.error("Error generating PDF: ", error);
      } finally {
        this.loading = false; // Set loading to false after process
      }
    },
    // generateReportPage() {
    //   const element = this.$refs.contentToConvert;
    //   const options = {
    //     margin: 0.5,
    //     filename: "table.pdf",
    //     image: { type: "png", quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    //   };
    //   html2pdf().set(options).from(element).save();
    // },
  },
};
</script>
<style scoped>
.feature-info {
  padding-left: 0%;
  position: absolute;
  bottom: 0;
  min-width: 95%;
  height: 30%;
  /* overflow-y: scroll; */
  background-color: rgb(255, 255, 255);
  z-index: 999; /* Ensure it appears above other elements */
  border-top: 1px solid #3c457c;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}
ion-card {
  overflow-y: scroll;
  overflow-x: scroll;
  background-color: #ffffff;
  color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 6px rgb(96, 96, 161);

  padding-top: 10px;
}
ion-card-title {
  color: #0f0e47;
  text-align: center;
  background-color: #ffffff;
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
.content-to-convert {
  /* padding: 10px; */
  background: white;
  font-size: 12px;
  color: black;
}
.report-title {
  text-align: center;
  margin: 0;
  font-weight: bold;
}
.report-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.report-image {
  width: 50px; /* Adjust size as needed */
  height: auto;
  margin: 0 10px; /* Space between images and title */
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
  font-size: 10px;
}
th {
  background-color: #f2f2f2;
  text-align: center;
}
/* Footer styles */
.footer {
  text-align: center;
  padding: 10px;
  bottom: 0;
  width: 100%;
  background-color: white;
  font-size: 12px;
  border-top: 1px solid #ccc;
}

.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's above other elements */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
