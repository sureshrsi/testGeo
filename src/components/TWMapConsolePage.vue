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
          <ion-title>
            <ion-img src="../src/assets/img/SOLARISLogo.png"> </ion-img>
          </ion-title>
          <ion-buttons slot="start">
            <ion-back-button default-href="/main" text="" />
          </ion-buttons>
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
          ></ion-searchbar>
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
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonSearchbar,
} from "@ionic/vue";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
// import LayerSwitcher from "ol-layerswitcher";
import { transform } from "ol/proj";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
// import CustomLayerSwitcherControl from "./CustomLayerSwitcherControl";
import CustomLayerSwitcher from "./CustomLayerSwitcher.vue";
import SideMenuContent from "./SideMenuContent.vue";
import FeatureInfo from "./FeatureInfo.vue";
export default {
  data() {
    return {
      layers: [],
      map: null,
      overlay: null,
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
        mapping_un: "Mapping Unit",
        classifica: "Soil Class",
        descriptio: "Soil Description",
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
        s1: "Highly Suitable Crops (S1)",
        s2: "Moderately Suitable Crops (S2)",
        s3: "Marginally Suitable Crops (S3)",
      },
      ap_labels: { action_pla: "Action Plan for Resources Development" },
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
    IonSearchbar,
    IonBackButton,
    CustomLayerSwitcher,
    SideMenuContent,
    FeatureInfo,
    isFeatureInfoOpen: false, // To control the modal visibility
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
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
        name: "tawang_crop_suitability_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_crop_suitability_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const ActionPlaneLayer = new TileLayer({
        title: "Action Plan",
        name: "tawang_lulc_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_lulc_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const gridLayer = new TileLayer({
        title: "Grid",
        name: "tawang_10k_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_10k_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const CountourLayer = new TileLayer({
        title: "Countour",
        name: "tawang_contour_updated",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_contour_updated",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LandCapLayer = new TileLayer({
        title: "Land Capability",
        name: "tawang_capability_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_capability_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const LandDegradationLayer = new TileLayer({
        title: "Land Degradation",
        name: "tawang_land_degradation_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_land_degradation_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const SoilInfoLayer = new TileLayer({
        title: "Soil Information",
        name: "tawang_soil_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_soil_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const HgeomLayer = new TileLayer({
        title: "Hydrogeomorphology",
        name: "tawang_hgeom_updated",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_hgeom_updated",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LineamentLayer = new TileLayer({
        title: "Lineament",
        name: "tawang_lineament",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_lineament",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const SlopeLayer = new TileLayer({
        title: "Slope Information",
        name: "tawang_slope",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_slope",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LulcLayer = new TileLayer({
        title: "Land Use Land Cover",
        name: "tawang_lulc_01022024",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_lulc_01022024",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const WatershedLayer = new TileLayer({
        title: "Watershed",
        name: "tawang_watershed",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_watershed",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const DrainPLayer = new TileLayer({
        title: "Drainage Poly",
        name: "tawang_drainp",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_drainp",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const DrainLLayer = new TileLayer({
        title: "Drainage Line",
        name: "tawang_drainl",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_drainl",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const BasemapLayer = new TileLayer({
        title: "Base Map",
        name: "Tawang_BaseLayer",
        visible: true,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:Tawang_BaseLayer",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const CircleLayer = new TileLayer({
        title: "Circle",
        name: "tawang_circle_boundary",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:tawang_circle_boundary",
            TILED: true,
          },
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
          CountourLayer,
        ],
      });

      const view = new View({
        center: transform([91.94, 27.65], "EPSG:4326", "EPSG:3857"),
        zoom: 9.5,
        // minZoom: 10.5,
        maxZoom: 18,
      });

      this.map = new Map({
        target: "map",
        layers: [layerGroup],
        view: view,
      });

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
        CountourLayer,
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

      const url = source.getFeatureInfoUrl(
        event.coordinate,
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
      this.getLulcData(event);
      this.getHGOMData(event);
      this.getSlopeData(event);
      this.getSoilData(event);
      this.getCropsData(event);
      this.getActionPlanData(event);
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const projection = view.getProjection();

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
            console.log("top most url", url);
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
      this.cropsInfo = [];
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
                        this.soilInfo.push(
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
                        console.log(
                          "%%%%%%%%%%%%",
                          value,
                          "&&&&&&&&&&&&&&",
                          data.features[index].properties[k]
                        );
                        this.cropsInfo.push(
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
.search-bar {
  /* position:absolute; */
  top: 0.5rem; /*Adjust as needed
  left: 1vh; Adjust as needed */
  /* bottom: 1vh; */
  width: 100%; /*Adjust as needed
  padding-top: 1vh;
  /* font-size: 16px; */
  height: 3rem;
  border-radius: 1rem;
  left: 0rem;
  z-index: 99999;
  display: flex;
  align-items: center;
  flex-grow: 8;
  margin-left: 5px;
}
</style>
