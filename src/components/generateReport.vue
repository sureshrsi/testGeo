<template>
    <ion-content>
<ion-row>
<ion-toolbar class="ion-text-center">
<ion-text><strong>Natural Resources Inventory for Micro Level Agricultural Planning</strong></ion-text>
</ion-toolbar>
</ion-row>
<!-- <ion-row class="ion-padding">
<ion-text color="primary"><strong>Arunachal Pradesh Space Application Centre</strong></ion-text>
</ion-row>
<ion-row>
    <ion-col class="ion-text-center">
<ion-text color="primary"><strong>Government of Arunachal Pradesh</strong></ion-text>
</ion-col>
</ion-row> -->
<div>
    <ion-row>
        <ion-col size="2">
        <ion-img src="../src/assets/img/Map_Console_Logo.png"></ion-img>
        </ion-col>
        <ion-col class="ion-text-center" size="8">
            <!-- <ion-text class="fontSize">Natural Resources Inventory for Micro Level Agricultural Planning</ion-text> -->
            <ion-text class="fontSize ion-padding-top">Arunachal Pradesh Space Application Centre</ion-text><br>
            <ion-text class="fontSizeTwo">Government of Arunachal Pradesh</ion-text>
        </ion-col>
        <ion-col size="2">
        <ion-img src="../src/assets/img/arplogo.jpg"></ion-img>
        </ion-col>
    </ion-row>
</div>
<div>
    <ion-card>
        <ion-card-content>
            <ion-img src="../src/assets/img/temp.png"></ion-img>
        </ion-card-content>
    </ion-card>
</div>
<div class="ion-padding">
<table> 
        <!-- Header -->
        <ion-grid>
          <ion-row>
            <ion-col>
            <ion-th><strong>District</strong></ion-th>
        </ion-col>
        <ion-col>
            <ion-th><strong>Circle</strong></ion-th>
        </ion-col>
        <ion-col>
            <ion-th><strong>Grid</strong></ion-th>
        </ion-col>
        <ion-col>
            <ion-th><strong>Graticule</strong></ion-th>
        </ion-col>
          </ion-row>
        </ion-grid>

        <!-- Body -->
        <ion-tbody>
          <ion-row  v-for="item in items" :key="item.id">
            <ion-col class="ion-padding">{{ item.district}}</ion-col>
            <ion-col class="ion-padding">{{ item.circle }}</ion-col>
            <ion-col class="ion-padding">{{ item.grid }}</ion-col>
            <ion-col class="ion-padding">{{ item.graticule }}</ion-col>
          </ion-row>
        </ion-tbody>
      </table>
    </div>

      <ion-row class="ion-padding-start">
      <ion-text><strong>Soil Information</strong></ion-text>
    </ion-row>
    <div class="ion-padding">
      <table>
<thead>
<tr>
<th scope="row">Soil Code</th>
<td>f4334</td>
<th scope="row">Exchangeable Sodium (meq/100 g)</th>
<td>354545</td>
</tr>
</thead>
<tbody id="test">
<tr>
<th scope="row">Land Use / Land Cover</th>
<td>434343</td>
<th scope="row">Exchangeable Potassium (meq/100 g)</th>
<td>343434</td>
</tr>
<tr>
<th scope="row">Physiography</th>
<td>343434</td>
<th scope="row">CEC (meq/100 g)</th>
<td>3434343</td>
</tr>
<tr>
<th scope="row">Parent Material</th>
<td>434343</td>
<th scope="row">Base Saturation (%)</th>
<td>656565</td>
</tr>
<tr>
<th scope="row">Slope (%)</th>
<td>5577</td>
<th scope="row">Available Nitrogen (kg/ha)</th>
<td>232323</td>
</tr>
<tr>
<th scope="row">Drainage Class</th>
<td>323232</td>						
<th scope="row">Available Phosphorus (kg/ha)</th>
<td>43434</td>
</tr>
<tr>
<th scope="row">Soil Erosion Status</th>
<td>43434</td>						
<th scope="row">Available Potassium (kg/ha)</th>
<td>43434</td>
</tr>
<tr>
<th scope="row">Soil Depth</th>
<td>76767</td>
<th scope="row">Available Sulphur (ppm)</th>
<td>767676</td>
</tr>
<tr>
<th scope="row">Soil Texture</th>
<td>767676</td>
<th scope="row">Available Iron (ppm)</th>
<td>787878</td>
</tr>
<tr>
<th scope="row">pH (1:2.5)</th>
<td>98989</td>
<th scope="row">Available Manganese (ppm)</th>
<td>89898</td>
</tr>
<tr>
<th scope="row">EC (dsm-1)</th>
<td>65767</td>
<th scope="row">Available Copper (ppm)</th>
<td>87906850</td>
</tr>
<tr>
<th scope="row">Organic Carbon (%)</th>
<td>2124134</td>
<th scope="row">Available Zinc (ppm)</th>
<td>212121</td>
</tr>
<tr>
<th scope="row">Exchangeable Calcium (meq/100 g)</th>
<td>21212</td>
<th scope="row">Available Boron (ppm)</th>
<td>1313</td>
</tr>
<tr>
<th scope="row">Exchangeable Magnesium (meq/100 g)</th>
<td>121212</td>
<th scope="row">Available Molybdenum (ppm)</th>
<td>13242</td>
</tr>
                </tbody>
            </table>
        </div>
        <div class="ion-padding-start">
            <ion-row>
            <ion-text><strong>Crop Suitability</strong></ion-text>
        </ion-row>
    </div>
        <div class="ion-padding">
<table width="full">
    <thead>
<tr>
<th scope="row">Highly Suitable Crops (S1)</th>
<td>f4334</td>
</tr>
    </thead>
    <thead>
<tr>
<th scope="row">Moderately Suitable Crops (S2)</th>
<td>f4334</td>
</tr>
    </thead>
    <thead>
<tr>
<th scope="row">Marginally Suitable Crops (S3)</th>
<td>f4334</td>
</tr>
    </thead>
</table>
</div>
<ion-row class="ion-padding-start">
<ion-text><strong>Action Plan</strong></ion-text>
</ion-row>
<div class="ion-padding">
<table>
    <thead>
<tr>
    <th>Action Plan for Soil and Land Resources Development	</th>
    <td>34355</td>
</tr>
    </thead>
</table>
</div>
<div>
<ion-row>
    <ion-col class="ion-text-center fontSizeTwo">
    <ion-text><strong>Powered By</strong></ion-text>
</ion-col>
</ion-row>
</div>  
<ion-row>
    <ion-text class="ion-text-center"><strong>Arunachal Pradesh Space Application Centre & Remote Sensing Instruments LLP</strong></ion-text>
</ion-row>
<ion-row>
    <ion-col class="ion-padding-down">
        <ion-button expand="block" @click="printDownload" size="small" color="primary">Print</ion-button>
    </ion-col>
    <ion-col>
        <ion-button expand="block" @click="$router.back()" size="small" color="primary">Back</ion-button>
    </ion-col>
</ion-row>
</ion-content>
</template>
<script>
import {IonRow, IonCol , IonContent} from "@ionic/vue";
export default{
    data() {
    return {
      items: [
        { district: "Tawang", circle: 'Tawang', grid:"G46B14I", graticule: '27° 40′ 16.63322″ N' }
      ]
    };
  },
  components:{
    IonRow,
    IonCol,
    IonContent
  },
  methods:{
    printDownload() {
      const w = window.open();
      w.document.write(this.$refs.DownloadComp.$el.innerHTML);
      w.document.close();
      w.setTimeout(() => {
        w.print();
      }, 1000);
    },
  },
}
</script>
<style>
    table { 
        border: solid 1px #000000;
        text-align: center;
        padding: 1vh;
        overflow-y: scroll;
        width: 100%;
    }
    table tbody tr td {
        border: solid 1px #000000;
        text-align: center;
    }
    table thead tr th{
        border: solid 1px #000000;
        text-align: center;
    }
    table tbody tr th {
        border: solid 1px #000000;
        text-align: center;
    }
    .fontSize {
            font-size:1rem
        }
        .fontSizeTwo {
            font-size:0.800rem
        }
</style>