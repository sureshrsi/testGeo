<template>
  <ion-page>
    <ion-content>
      <div ref="contentToConvert" class="content-to-convert">
        <div class="report-title-container">
          <img
            :src="mapLogo"
            alt="Left Image"
            class="report-image left-image"
          />
          <div>
            <h4 class="report-title" style="font-size: 14px">
              Natural Resources Inventory for Micro Level Agricultural Planning
              <h5>{{ pdfinfo }}</h5>
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
            :src="imgLogo"
            alt="Right Image"
            class="report-image right-image"
          />
        </div>
        <!-- First Table -->
        <ion-text style="margin-top: 20px"
          ><strong>Soil Information</strong>
        </ion-text>
        <table border="1" style="margin-top: 10px; margin-bottom: 10px">
          <thead>
            <tr>
              <th>Soil Attribute</th>
              <th>Value</th>
              <th>Soil Attribute</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Soil Code</td>
              <td>LTG355e1</td>
              <td>Exchangeable Sodium (meq/100 g)</td>
              <td>0.03</td>
            </tr>
            <tr>
              <td>Land Use / Land Cover</td>
              <td>Closed Forest</td>
              <td>Exchangeable Potassium (meq/100 g)</td>
              <td>1.5</td>
            </tr>
            <tr>
              <td>Physiography</td>
              <td>Structural Hill - Side Slopes</td>
              <td>CEC (meq/100 g)</td>
              <td>37</td>
            </tr>
            <tr>
              <td>Parent Material</td>
              <td>Schist Complex</td>
              <td>Base Saturation (%)</td>
              <td>38.42</td>
            </tr>
            <tr>
              <td>Slope (%)</td>
              <td>15-35</td>
              <td>Available Nitrogen (kg/ha)</td>
              <td>1530.37 (High)</td>
            </tr>
            <tr>
              <td>Drainage Class</td>
              <td>Moderately Well Drainage</td>
              <td>Available Phosphorus (kg/ha)</td>
              <td>118.18 (High)</td>
            </tr>
            <tr>
              <td>Soil Erosion Status</td>
              <td>Nil to Slight Erosion</td>
              <td>Available Potassium (kg/ha)</td>
              <td>1310.4 (High)</td>
            </tr>
            <tr>
              <td>Soil Depth</td>
              <td>Deep</td>
              <td>Available Sulphur (ppm)</td>
              <td>65.47 (High)</td>
            </tr>
            <tr>
              <td>Soil Texture</td>
              <td>Sandy Loam</td>
              <td>Available Iron (ppm)</td>
              <td>77.58 (High)</td>
            </tr>
            <tr>
              <td>pH (1:2.5)</td>
              <td>4.09</td>
              <td>Available Manganese (ppm)</td>
              <td>0.33 (Low)</td>
            </tr>
            <tr>
              <td>EC (dsm-1)</td>
              <td>0.08</td>
              <td>Available Copper (ppm)</td>
              <td>0.25 (Low)</td>
            </tr>
            <tr>
              <td>Organic Carbon (%)</td>
              <td>5.95</td>
              <td>Available Zinc (ppm)</td>
              <td>0.51 (Low)</td>
            </tr>
            <tr>
              <td>Exchangeable Calcium (meq/100 g)</td>
              <td>6.78</td>
              <td>Available Boron (ppm)</td>
              <td>0.08 (Low)</td>
            </tr>
            <tr>
              <td>Exchangeable Magnesium (meq/100 g)</td>
              <td>5.91</td>
              <td>Available Molybdenum (ppm)</td>
              <td>0.03 (Low)</td>
            </tr>
          </tbody>
        </table>

        <!-- Second Table -->
        <ion-text style="margin-top: 20px"
          ><strong>Crop Suitability Information</strong>
        </ion-text>
        <table border="1" style="margin-top: 10px; margin-bottom: 20px">
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
              <td>S1</td>
              <td>Paddy, Millets, Maize</td>
              <td>Potato</td>
              <td>Mustard</td>
              <td>Banana, Citrus</td>
              <td>Ginger, Turmeric</td>
              <td>Tea, Rubber</td>
              <td>Blueberries, Oats, Stawberries</td>
              <td>Bamboo, Sal, Eucalyptus, Neem, Chir Pine</td>
            </tr>
            <tr>
              <td>S2</td>
              <td>Maize</td>
              <td></td>
              <td>Oil Palm</td>
              <td>Pine Apple</td>
              <td></td>
              <td>Red Sandalwood, Coffee</td>
              <td>Chow Chow</td>
              <td>Neem, Chir Pine</td>
            </tr>
            <tr>
              <td>S3</td>
              <td>Maize</td>
              <td>Cauliflower & Cabbage</td>
              <td></td>
              <td>Groundnut</td>
              <td>Black Pepper</td>
              <td></td>
              <td>Chicory</td>
              <td>Maize</td>
            </tr>
          </tbody>
        </table>

        <!-- Third Table -->
        <ion-text style="margin-top: 20px"
          ><strong>Action Plan Information</strong>
        </ion-text>
        <table border="1" style="margin-top: 10px">
          <thead>
            <tr>
              <th>Action Plan</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mapping_Un</td>
              <td>S432</td>
            </tr>
            <tr>
              <td>Soil & Water Conservation Measures and Forest Protection</td>
              <td>Gap afforestation in the open forest</td>
            </tr>
            <tr>
              <td>Lime Requirement (tons/ha as CaO) to raise the pH to 6.4</td>
              <td>Nil</td>
            </tr>
            <tr>
              <td>Application of Major Nutrients</td>
              <td>Application of 100% of recommended doses of N, P & K</td>
            </tr>
            <tr>
              <td>Application of Micro Nutrients</td>
              <td>Nil</td>
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
      <ion-button @click="generatePdf">Generate PDF</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";
import html2pdf from "html2pdf.js";
import arLogo from "@/assets/img/ArLogo.png";
import cropLogo from "@/assets/img/Map_Console_Logo.png";

export default {
  name: "PdfGenerator",
  props: {
    pdfinfo1: String,
  },
  data() {
    return {
      imgLogo: arLogo,
      mapLogo: cropLogo,
      pdfdata: null,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  },
  methods: {
    generatePdf() {
      console.log("%$%$%$%$%$%$", this.pdfinfo1);
      const element = this.$refs.contentToConvert;
      const options = {
        margin: 1,
        filename: "table.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(options).from(element).save();
    },
  },
};
</script>

<style scoped>
.content-to-convert {
  padding: 20px;
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
</style>
