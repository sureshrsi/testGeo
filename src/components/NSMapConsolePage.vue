<template>
  <div>
    <SideMenuContent
      :layers="layers"
      :legendUrl="legendUrl"
      @layer-toggled="updateLegend"
    />
    <!-- <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <CustomLayerSwitcher :layers="layers" />
      </ion-content>
     
    </ion-menu> -->

    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-buttons slot="start">
            <ion-back-button default-href="/main" text="" />
          </ion-buttons>
          <ion-title>
            <ion-img :src="imageSrc" class="imgPadding"> </ion-img>
          </ion-title>
          <ion-button
            slot="end"
            color="primary"
            class="iom-padding-right"
            @click="searchBar"
          >
            <ion-icon name="search-outline"></ion-icon>
          </ion-button>
          <ion-searchbar
            v-if="showSearchBar"
            show-clear-button="always"
            color="primary"
            :clear-icon="trashBin"
            class="search-bar"
            placeholder="Search..."
            v-model="showSearchbar1"
            @ionClear="clearSearch"
            @ionInput="handleInput"
          ></ion-searchbar>
          <!-- <input type="file" accept=".kmz,.kml" @change="handleFileKml" title=""/> -->
          <div slot="end" class="file-upload-container">
            <input
              type="file"
              id="fileInput"
              ref="fileInput"
              @change="handleFileKml"
            />
            <ion-button slot="end" color="primary" @click="triggerFileInput"
              ><ion-icon name="cloud-upload-outline"></ion-icon
            ></ion-button>
          </div>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div id="map" class="map"></div>
        <FeatureInfo
          :featureInfo="featureInfo"
          :heomInfo="heomInfo"
          :slopeInfo="slopeInfo"
          :soilInfo="soilInfo"
          :cropsInfo="cropsInfo"
          :actionPlanInfo="actionPlanInfo"
          :extentImageUrl="extentImageUrl"
          :distCirlce="distCirlce"
          :gridInfo="gridInfo"
          @update:isOpen="isFeatureInfoOpen = $event"
        />

        <!-- <div v-if="featureInfo" class="feature-info">
          <h3>Feature adfssdfsdaf Info</h3>
          <p v-for="(value, key) in featureInfo" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </p>
        </div> -->
        <!-- <div v-if="featureInfo" class="feature-info">
          <h3>Feature Info</h3>
          <ion-pre>
            <h6>{{ featureInfo.soil_code }}</h6>
            <h6>{{ featureInfo.action_pla }}</h6>
          </ion-pre>
        </div> -->
      </ion-content>
    </ion-page>
  </div>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  IonMenuButton,
  IonTitle,
  IonBackButton,
  IonImg,
  IonSearchbar,
  IonIcon,
} from "@ionic/vue";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
// import LayerSwitcher from "ol-layerswitcher";
import { transform, fromLonLat } from "ol/proj";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
// import CustomLayerSwitcherControl from "./CustomLayerSwitcherControl";
import CustomLayerSwitcher from "./CustomLayerSwitcher.vue";
import SideMenuContent from "./SideMenuContent.vue";
import FeatureInfo from "./FeatureInfo.vue";
import Logo from "@/assets/img/SOLARISLogo.png";
import markerImg from "@/assets/img/marker.png";

// Importing JSZip to handle KMZ files
import JSZip from "jszip";
// Importing library to handle KML parsing
import { KML } from "ol/format";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { getCenter, boundingExtent } from "ol/extent";
// import { boundingExtent } from 'ol/extent';
import { toStringHDMS } from "ol/coordinate";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

export default {
  data() {
    return {
      layers: [],
      imageSrc: Logo,
      MarkerImg: markerImg,
      map: null,
      view: null,
      overlay: null,
      distCirlce: [],
      gridInfo: [],
      featureInfo: [],
      heomInfo: [],
      slopeInfo: [],
      soilInfo: [],
      cropsInfo: [],
      actionPlanInfo: [],
      legendUrl: null,
      showSearchBar: false,
      showSearchbar1: "",
      coordinate: "",
      hgeom_lables: {
        gw_prospec: "Ground Water Prospects",
        lithology: "Lithology",
        geom_unit: " Geom Unit",
      },
      soil_lables: {
        soil_code: "Soil Code",
        mapping_un: "Unit Mapping",
        series_nam: "",
        descriptio: "Description",
        soil_toxon: "Soil Class",
        dom_tex: "",
        land_use__: "Land Use / Land Cover",
        physiograp: "Physiography",
        parent_mat: "Parent Material",
        slope____: "Slope(%)",
        drainage_c: "Drainage Class",
        soil_erosi: "Soil Erosion Status",
        soil_depth: "Soil Depth",
        soil_tex: "Soil Texture",
        ph__1_2_5_: "pH(1.2.5)",
        ec__dsm_1_: "EC (dsm-1)",
        oc____: "Organic Carbon (%)",
        ca: "Exchangeable Calcuim (meq/100 g)",
        mg: "Exchangeable Magesium (meq/100 g)",
        na: "Exchangeable Sodium (meq/100 g)",
        k: "Exchangeable Potassium (meq/100 g)",
        cec: "CEC (meq/100 g)",
        bs: "Base Saturation (%)",
        avl_n_kg_h: "Available Nitrogen (kg/ha)",
        avl_p_kg_h: "Available Phosphorus (kg/ha)",
        avl_k_kg_h: "Available Potassium (kg/ha)",
        avl_s_ppm: "Available Sulphur (ppm)",
        avl_fe_ppm: "Available Iron (ppm)",
        avl_mn_ppm: "Available Manganese (ppm)",
        avl_cu_ppm: "Available Copper (ppm)",
        avl_zn_ppm: "Available Zinc (ppm)",
        avl_b_ppm: "Available Boron (ppm)",
        avl_mo_ppm: "Available Molybdenum (ppm)",
        area: "Area (Ha)",
      },
      lulc_lables: {
        lulc: "Land Use Land Cover",
        area_lulc: "Area (Ha)",
      },
      slope_lables: {
        slope_perc: "Slope Percentage",
        slope_desc: "Slope Description",
      },
      popup_labels: {
        lulc: "Land Use Land Cover",
        area_lulc: "Area (Ha)",
        // classifica : "Soil Class",
        // descriptio : "Soil Description",
      },
      ld_labels: { map_unit_d: "Map Unit Description" },
      lc_labels: { land_capab: "Land Capability" },
      li_labels: { land_irrig: "Land Irrigability" },
      cs_labels: {
        fid: "id",
        soil_code: "Soil Code",
        mapping_un: "Mapping Uint",
        code: "Code",
        s1_food_cr: "S1 Food Crops",
        s1_veg_cro: "S1 Vegetable Crops",
        s1_oil_see: "S1 Oil Seeds",
        s1_fr_crop: "S1 Fruit Crops",
        s1_spices: "S1 Spices",
        s1_com__cr: "S1 Commercial Crops",
        s1_h_t_cro: "S1 Highly Tolorent Crops to Acidity",
        s1_sil_cul: "S1 Silvi Culture",

        s2_food_cr: "S2 Food Crops",
        s2_veg_cro: "S2 Vegetable Crops",
        s2_oil_see: "S2 Oil Seeds",
        s2_fr_crop: "S2 Fruit Crops",
        s2_spices: "S2 Spices",
        s2_com__cr: "S2 Commercial Crops",
        s2_h_t_cro: "S2 Highly Tolorent Crops to Acidity",
        s2_sil_cul: "S2 Silvi Culture",

        s3_food_cr: "S3 Food Crops",
        s3_veg_cro: "S3 Vegetable Crops",
        s3_oil_see: "S3 Oil Seeds",
        s3_fr_crop: "S3 Fruit Crops",
        s3_spices: "S3 Spices",
        s3_com__cr: "S3 Commercial Crops",
        s3_h_t_cro: "S3 Highly Tolorent Crops to Acidity",
        s3_sil_cul: "S3 Silvi Culture",
        // s1: "Highly Suitable Crops (S1)",
        // s2: "Moderately Suitable Crops (S2)",
        // s3: "Marginally Suitable Crops (S3)",
      },
      ap_labels: {
        mapping_un: "Mapping Unit",
        conservati: "Soil & Water Conservation Measures and Forest Protection",
        lime_requi: "Lime Requirement (tons/ha as CaO) to raise the pH to 6.4",
        major_nutr: "Application of Major Nutrients",
        micro_nutr: "Application of Micro Nutrients",
      },
      distCircleLables: {
        dist_name: "District Name",
        aa: "Circle Name",
      },
      grid_labels: {
        grid_no: "Grid No",
      },
      featureExtent: "",
      extentImageUrl: "",
      markerLayer: null, // To hold the marker
    };
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
    CustomLayerSwitcher,
    SideMenuContent,
    FeatureInfo,
    IonImg,
    IonSearchbar,
    IonIcon,
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    triggerFileInput() {
      console.log("Triggering file input...");
      this.$refs.fileInput.click(); // Programmatically click the file input
    },
    searchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    initializeMap() {
      const base_url = "https://solaris-ar.com:8085/geoserver";

      const baseLayer = new TileLayer({
        title: "OpenStreetMap",
        type: "base",
        visible: true,
        source: new OSM(),
      });

      const CropSuitabilityLayer = new TileLayer({
        title: "Crop Suitability",
        name: "namsai_crop_suitability5",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_crop_suitability5",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
        crossOrigin: "anonymous", // Ensure this is set for CORS
      });

      const ActionPlaneLayer = new TileLayer({
        title: "Action Plan",
        name: "namsai_action_plan_land_water",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_action_plan_land_water",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const gridLayer = new TileLayer({
        title: "Grid",
        name: "namsai_grid_10k",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_grid_10k",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LandCapLayer = new TileLayer({
        title: "Land Capability",
        name: "namsai_land_capability",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_land_capability",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const LandDegradationLayer = new TileLayer({
        title: "Land Degradation",
        name: "namsai_land_degradation",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_land_degradation",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const SoilInfoLayer = new TileLayer({
        title: "Soil Information",
        name: "namsai_final_soil_soft5",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_final_soil_soft5",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const HgeomLayer = new TileLayer({
        title: "Hydrogeomorphology",
        name: "namsai_hgeom",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_hgeom",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LineamentLayer = new TileLayer({
        title: "Lineament",
        name: "namsai_lineament",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_lineament",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const SlopeLayer = new TileLayer({
        title: "Slope Information",
        name: "namsai_slope",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_slope",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LulcLayer = new TileLayer({
        title: "Land Use Land Cover",
        name: "namsai_lulc",
        visible: true,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_lulc",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const WatershedLayer = new TileLayer({
        title: "Watershed",
        name: "namsai_whs",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_whs",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const DrainPLayer = new TileLayer({
        title: "DrainP",
        name: "namsai_drainp",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_drainp",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const DrainLLayer = new TileLayer({
        title: "DrainL",
        name: "namsai_drainl_new",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:namsai_drainl",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const BasemapLayer = new TileLayer({
        title: "Base Map",
        name: "BaseLayer",
        visible: true,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:BaseLayer",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const CircleLayer = new TileLayer({
        title: "Circle",
        name: "circle_boundary",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "NEW_APWS:circle_boundary",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const layerGroup = new LayerGroup({
        title: "All Layers",
        layers: [
          baseLayer,
          gridLayer,
          ActionPlaneLayer,
          CropSuitabilityLayer,
          LandCapLayer,
          LandDegradationLayer,
          SoilInfoLayer,
          HgeomLayer,
          LineamentLayer,
          SlopeLayer,
          LulcLayer,
          WatershedLayer,
          DrainPLayer,
          DrainLLayer,
          BasemapLayer,
          CircleLayer,
        ],
      });

      // const extent = [
      //   775998.4789000005, 3067108.467, 781057.6884000003, 3072764.0725999996,
      // ];
      // console.log("Original Extent:", extent);

      // const transformedExtent = transformExtent(
      //   extent,
      //   "EPSG:4326",
      //   "EPSG:3857"
      // );
      // console.log("Transformed Extent:", transformedExtent);

      const view = new View({
        center: transform([95.97135, 27.66894], "EPSG:4326", "EPSG:3857"),
        zoom: 9.5,
        // minZoom: 10.5,
        maxZoom: 18,
      });
      this.view = view;

      // marker on the map
      this.markerLayer = new VectorLayer({
        source: new VectorSource(),
      });

      this.map = new Map({
        target: "map",
        layers: [layerGroup, this.markerLayer],
        view: view,
      });

      // this.map.getView().fit(transformedExtent, { size: this.map.getSize() });

      // Save the layers to data for passing to the custom layer switcher
      this.layers = [
        baseLayer,
        gridLayer,
        ActionPlaneLayer,
        CropSuitabilityLayer,
        LandCapLayer,
        LandDegradationLayer,
        SoilInfoLayer,
        HgeomLayer,
        LineamentLayer,
        SlopeLayer,
        LulcLayer,
        WatershedLayer,
        DrainPLayer,
        DrainLLayer,
        BasemapLayer,
        CircleLayer,
      ];

      // Add click event listener to the map
      this.map.on("singleclick", this.getTopMostMapClick);
      this.updateLegend();
      // const layerSwitcher = new LayerSwitcher({
      //   activationMode: "click",
      //   startActive: false,
      //   tipLabel: "Layers", // Optional label for button
      //   groupSelectStyle: "children", // Can be 'children' [default], 'group' or 'none'
      //   target: document.getElementById("layer-switcher"),
      // });

      // map.addControl(layerSwitcher);

      // const customControl = new CustomLayerSwitcherControl({
      //   target: document.getElementById("layer-switcher"),
      // });

      // map.addControl(customControl);
    },
    handleMapClick(event) {
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const source = this.layers[2].getSource(); // Assuming the WMS layer is the third layer
      this.coordinate = event.coordinate;
      const url = source.getFeatureInfoUrl(
        this.coordinate,
        viewResolution,
        view.getProjection(),
        { INFO_FORMAT: "application/json" }
      );

      if (url) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              const feature = data.features[0];
              this.featureInfo = {
                soil_code: feature.properties.soil_code,
                action_pla: feature.properties.action_pla,
              };
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
          });
      }
    },
    updateLegend() {
      // Iterate through flattened layers from top to bottom to find the topmost visible layer
      for (let i = this.layers.length - 1; i >= 0; i--) {
        const layer = this.layers[i];
        if (layer.getVisible() && layer.getSource().getLegendUrl) {
          const legendUrl = layer.getSource().getLegendUrl();
          this.legendUrl = legendUrl;
          break; // Stop after the first visible layer with a legend
        }
      }
    },
    getTopMostMapClick(event) {
      this.getDistrictAndCircle(event);
      this.getGrid(event);
      this.getLulcData(event);
      this.getHGOMData(event);
      this.getSlopeData(event);
      this.getSoilData(event);
      this.getCropsData(event);
      this.getActionPlanData(event);
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;

      // Clear existing markers
      this.markerLayer.getSource().clear();

      // Add a new marker at the clicked location
      const marker = new Feature({
        geometry: new Point(this.coordinate),
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: this.MarkerImg, // Replace with your marker icon path
            anchor: [0.5, 1],
          }),
        })
      );

      this.markerLayer.getSource().addFeature(marker);

      // Iterate through flattened layers from top to bottom to find the topmost visible layer with getFeatureInfoUrl
      for (let i = this.layers.length - 1; i >= 0; i--) {
        const layer = this.layers[i];
        if (
          layer.getVisible() &&
          typeof layer.getSource().getFeatureInfoUrl === "function"
        ) {
          const url = layer
            .getSource()
            .getFeatureInfoUrl(event.coordinate, viewResolution, projection, {
              INFO_FORMAT: "application/json",
            });

          if (url) {
            // console.log("top most url", url);
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                if (data.features && data.features.length > 0) {
                  const feature = data.features[0];
                  // this.featureInfo = feature.properties;
                  this.isFeatureInfoOpen = true;
                } else {
                  this.featureInfo = null;
                }
              })
              .catch((error) => {
                console.error("Error fetching feature info:", error);
                this.featureInfo = null;
              });
            break; // Stop after the first visible layer with feature info
          }
        }
      }
    },
    getLulcData(event) {
      this.featureInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const lulc_url = this.layers[10]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (lulc_url) {
        // console.log("top most url", url);
        fetch(lulc_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.lulc_lables).forEach(([key, value]) => {
                      if (key === k) {
                        console.log(
                          "%%%%%%%%%%%%",
                          value,
                          "&&&&&&&&&&&&&&",
                          data.features[index].properties[k]
                        );
                        this.featureInfo.push(
                          value + " : " + data.features[index].properties[k]
                        );
                        console.log(
                          "%%%%%%%%%%%%%%%%%#@@#@#@@@#%%%%%%%%%%%%%%%%%%%%%",
                          this.featureInfo
                        );
                      }
                    });
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getHGOMData(event) {
      this.heomInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const heom_url = this.layers[7]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (heom_url) {
        // console.log("top most url", url);
        fetch(heom_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.hgeom_lables).forEach(
                      ([key, value]) => {
                        if (key === k) {
                          console.log(
                            "%%%%%%%%%%%%",
                            value,
                            "&&&&&&&&&&&&&&",
                            data.features[index].properties[k]
                          );
                          this.heomInfo.push(
                            value + " : " + data.features[index].properties[k]
                          );
                          console.log(
                            "%%%%%%%%%%%%%%%%%#@@#@#@@@#%%%%%%%%%%%%%%%%%%%%%",
                            this.featureInfo
                          );
                        }
                      }
                    );
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getSlopeData(event) {
      this.slopeInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const slop_url = this.layers[9]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (slop_url) {
        // console.log("top most url", url);
        fetch(slop_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.slope_lables).forEach(
                      ([key, value]) => {
                        if (key === k) {
                          console.log(
                            "%%%%%%%%%%%%",
                            value,
                            "&&&&&&&&&&&&&&",
                            data.features[index].properties[k]
                          );
                          this.slopeInfo.push(
                            value + " : " + data.features[index].properties[k]
                          );
                          console.log(
                            "%%%%%%%%%%%%%%%%%#@@#@#@@@#%%%%%%%%%%%%%%%%%%%%%",
                            this.featureInfo
                          );
                        }
                      }
                    );
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getSoilData(event) {
      this.soilInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const soil_url = this.layers[6]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (soil_url) {
        // console.log("top most url", url);
        fetch(soil_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.soil_lables).forEach(([key, value]) => {
                      if (key === k) {
                        console.log(
                          "%%%%%%%%%%%%",
                          value,
                          "&&&&&&&&&&&&&&",
                          data.features[index].properties[k]
                        );
                        this.soilInfo.push(data.features[index].properties[k]);
                        console.log("Soil Info", this.soilInfo);
                      }
                    });
                  }
                }
              }
              // Get the geometry and calculate the bounding extent
              const feature = data.features[0];
              const geometry = feature.geometry;

              // Log the geometry to inspect its structure
              console.log("Geometry:", geometry);

              // Check if geometry type is Polygon or MultiPolygon
              if (geometry.type === "Polygon") {
                // Check if coordinates exist and calculate the extent
                if (geometry.coordinates.length > 0) {
                  this.featureExtent = boundingExtent(geometry.coordinates[0]);
                }
              } else if (geometry.type === "MultiPolygon") {
                // Flatten the coordinates and calculate the extent
                const allCoordinates = geometry.coordinates.flat(2); // Flatten 2 levels deep
                if (allCoordinates.length > 0) {
                  this.featureExtent = boundingExtent(allCoordinates);
                }
              } else {
                console.warn("Unsupported geometry type:", geometry.type);
                this.featureExtent = null;
              }

              // Log the feature extent for debugging
              console.log("Feature Extent:", this.featureExtent);
              this.isFeatureInfoOpen = true;

              // Display the extent image
              this.displayExtentImage();
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getCropsData(event) {
      this.cropsInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const crops_url = this.layers[3]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (crops_url) {
        // console.log("top most url", url);
        fetch(crops_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.cs_labels).forEach(([key, value]) => {
                      if (key === k) {
                        // console.log(
                        //   "%%%%%%%%%%%%",
                        //   value,
                        //   "&&&&&&&&&&&&&&",
                        //   data.features[index].properties[k]
                        // );
                        this.cropsInfo.push(data.features[index].properties[k]);
                        console.log("crop suitability", this.cropsInfo);
                      }
                    });
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getActionPlanData(event) {
      this.actionPlanInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const action_url = this.layers[2]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (action_url) {
        // console.log("top most url", url);
        fetch(action_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.ap_labels).forEach(([key, value]) => {
                      if (key === k) {
                        console.log(
                          "%%%%%%%%%%%%",
                          value,
                          "&&&&&&&&&&&&&&",
                          data.features[index].properties[k]
                        );
                        this.actionPlanInfo.push(
                          data.features[index].properties[k]
                        );
                        console.log(
                          "%%%%%%%%%%%%%%%%%#@@#@#@@@#%%%%%%%%%%%%%%%%%%%%%",
                          this.featureInfo
                        );
                      }
                    });
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getDistrictAndCircle(event) {
      this.distCirlce = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      const circle_url = this.layers[15]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (circle_url) {
        // console.log("top most url", url);
        fetch(circle_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.distCircleLables).forEach(
                      ([key, value]) => {
                        if (key === k) {
                          console.log(
                            "%%%%%%%%%%%%",
                            value,
                            "&&&&&&&&&&&&&&",
                            data.features[index].properties[k]
                          );
                          this.distCirlce.push(
                            data.features[index].properties[k]
                          );
                          console.log("distCirlce", this.distCirlce);
                        }
                      }
                    );
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    getGrid(event) {
      this.actionPlanInfo = [];
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();
      this.coordinate = event.coordinate;
      let dms = toStringHDMS(this.coordinate, 5);
      const circle_url = this.layers[1]
        .getSource()
        .getFeatureInfoUrl(this.coordinate, viewResolution, projection, {
          INFO_FORMAT: "application/json",
        });
      if (circle_url) {
        // console.log("top most url", url);
        fetch(circle_url)
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              for (let index = 0; index < data.features.length; index++) {
                for (const k in data.features[index].properties) {
                  if (Object.hasOwn(data.features[index].properties, k)) {
                    Object.entries(this.grid_labels).forEach(([key, value]) => {
                      if (key === k) {
                        console.log(
                          "%%%%%%%%%%%%",
                          value,
                          "&&&&&&&&&&&&&&",
                          data.features[index].properties[k]
                        );
                        this.gridInfo.push(
                          data.features[index].properties[k],
                          dms
                        );
                        console.log("grid number", this.gridInfo);
                      }
                    });
                  }
                }
              }
              // const feature = data.features[0];
              // this.featureInfo = feature.properties;
              // console.log("@@@@@@@@@@@!!!!!!!!!!@@@@@@@@@@", this.featureInfo);
              // console.log(
              //   "@@@@@@@@@@@@ Layers @@@@@@@@@",
              //   this.map.getLayers()
              // );
              this.isFeatureInfoOpen = true;
            } else {
              this.featureInfo = null;
            }
          })
          .catch((error) => {
            console.error("Error fetching feature info:", error);
            this.featureInfo = null;
          });
        // Stop after the first visible layer with feature info
      }
    },
    handleInput(event) {
      const value = event.target.value;
      const coordinates = value
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      if (
        coordinates.length === 2 &&
        !isNaN(coordinates[0]) &&
        !isNaN(coordinates[1])
      ) {
        this.zoomToCoordinates(coordinates[0], coordinates[1]);
      } else {
        console.log("Please enter valid coordinates in the format: lat, lng");
      }
    },
    zoomToCoordinates(lat, lng) {
      this.view.setCenter(fromLonLat([lng, lat]));
      this.view.setZoom(10); // Set your desired zoom level
    },
    handleFileKml(event) {
      const file = event.target.files[0];
      const vm = this; // Store reference to 'this'

      if (file) {
        const reader = new FileReader();
        console.log("kml file", file);

        reader.onload = function (e) {
          const kmlData = e.target.result;
          console.log("kml data", kmlData);
          vm.displayKmlOnMap(kmlData); // Use stored reference
        };

        reader.readAsText(file);
      }
    },
    displayKmlOnMap(kmlData) {
      let kmlLayer = null;
      this.map.removeLayer(kmlLayer);
      const vectorSource = new VectorSource({
        format: new KML(),
        url: "data:text/xml;charset=utf-8," + encodeURIComponent(kmlData),
      });
      console.log("vector source", vectorSource);
      kmlLayer = new VectorLayer({
        source: vectorSource,
        title: "kml",
        name: "kml",
        visible: true,
      });
      console.log("kml layer", kmlLayer);
      this.map.addLayer(kmlLayer);

      // Wait for the vector layer to load before fitting the view
      // Use an arrow function to maintain the correct context of 'this'
      vectorSource.once("change", () => {
        console.log("Layer change event triggered");

        if (vectorSource.getState() === "ready") {
          console.log("Vector source is ready, fitting the map view");
          this.map.getView().fit(vectorSource.getExtent(), this.map.getSize());
        }
      });
    },
    displayExtentImage() {
      if (this.featureExtent) {
        const extent = this.featureExtent;
        const projection = this.map.getView().getProjection();
        const size = [100, 100]; // Desired size of the image

        // Prepare the URL for the GetMap request
        const baseUrl = "https://solaris-ar.com:8085/geoserver/wms"; // Replace with your GeoServer URL
        const layerName = this.layers[6].get("name"); // Get the layer name
        const params = new URLSearchParams({
          service: "WMS",
          version: "1.1.1",
          request: "GetMap",
          layers: layerName,
          bbox: extent.join(","), // BBOX in the format 'minX,minY,maxX,maxY'
          width: size[0],
          height: size[1],
          format: "image/png", // Desired image format
          srs: projection.getCode(), // The projection code
        });

        // Construct the full URL
        this.extentImageUrl = `${baseUrl}?${params.toString()}`;
        console.log("type of url", typeof this.extentImageUrl);

        console.log("Extent Image URL:", this.extentImageUrl);
      }
    },
  },

  watch: {
    // Watch for changes in layer visibility to update the legend
    layers: {
      handler: "updateLegend",
      deep: true,
    },
  },
};
</script>

<style scoped>
ion-menu::part(backdrop) {
  background-color: rgba(255, 0, 255, 0.5);
}

ion-menu::part(container) {
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
}

.map {
  height: 100%;
  width: 100%;
}

ion-img {
  height: 2rem;
}

/* search-icon{
  cursor: pointer;
} */

.search-bar {
  position: absolute;
  top: 0.5rem; /*Adjust as needed
  left: 1vh; Adjust as needed */
  /* bottom: 1vh; */
  width: 70%; /*Adjust as needed
  padding-top: 1vh;
  /* font-size: 16px; */
  height: 3rem;
  border-radius: 1rem;
  left: -0.5rem;
  z-index: 99999;
  display: flex;
  align-items: center;
  flex-grow: 8;
  margin-left: 5px;
}
input[type="file"] {
  display: none;
}
</style>
