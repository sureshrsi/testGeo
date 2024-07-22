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
            <ion-back-button default-href="/main" text=""/>
          </ion-buttons>
          <ion-title>
            <ion-img :src="imageSrc"> </ion-img>
          </ion-title>
          <ion-button slot="end" color="primary" class="iom-padding-right">
            <ion-icon name="search-outline"></ion-icon>
          </ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div id="map" class="map"></div>
        <FeatureInfo
          :featureInfo="featureInfo"
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
} from "@ionic/vue";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OSM from "ol/source/OSM";
import LayerGroup from "ol/layer/Group";
// import LayerSwitcher from "ol-layerswitcher";
import { transform, transformExtent } from "ol/proj";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
// import CustomLayerSwitcherControl from "./CustomLayerSwitcherControl";
import CustomLayerSwitcher from "./CustomLayerSwitcher.vue";
import SideMenuContent from "./SideMenuContent.vue";
import FeatureInfo from "./FeatureInfo.vue";
import Logo from "@/assets/img/SOLARISLogo.png";

export default {
  data() {
    return {
      layers: [],
      imageSrc: Logo,
      map: null,
      overlay: null,
      featureInfo: null,
      legendUrl: null,
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
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      let base_url = "https://solaris-ar.com:8085/geoserver";

      const baseLayer = new TileLayer({
        title: "OpenStreetMap",
        type: "base",
        visible: true,
        source: new OSM(),
      });

      const CropSuitabilityLayer = new TileLayer({
        title: "Crop Suitability",
        name: "namsai_crop_suitability",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:namsai_crop_suitability",
            TILED: true,
          },
          serverType: "geoserver",
          transition: 0,
        }),
        crossOrigin: "anonymous", // Ensure this is set for CORS
      });

      const ActionPlaneLayer = new TileLayer({
        title: "Action Plan",
        name: "namsai_land_and_water_action_plan",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:namsai_land_and_water_action_plan",
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
            LAYERS: "APWS:namsai_grid_10k",
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
            LAYERS: "APWS:namsai_land_capability",
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
            LAYERS: "APWS:namsai_land_degradation",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const SoilInfoLayer = new TileLayer({
        title: "Soil Information",
        name: "soil_1_new",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:soil_1_new",
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
            LAYERS: "APWS:namsai_hgeom",
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
            LAYERS: "APWS:namsai_lineament",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const SlopeLayer = new TileLayer({
        title: "Slope Information",
        name: "namsai_slope_new",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:namsai_slope_new",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });

      const LulcLayer = new TileLayer({
        title: "Land Use Land Cover",
        name: "namsai_lulc_1_new",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:namsai_lulc_1_new",
            TILED: true,
          },
          crossOrigin: "anonymous", // Ensure this is set for CORS
          serverType: "geoserver",
          transition: 0,
        }),
      });
      const WatershedLayer = new TileLayer({
        title: "Watershed",
        name: "namsai_watershed_union",
        visible: false,
        source: new TileWMS({
          url: base_url + "/wms", // Replace with your GeoServer WMS URL
          params: {
            LAYERS: "APWS:namsai_watershed_union",
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
            LAYERS: "APWS:namsai_drainp",
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
            LAYERS: "APWS:namsai_drainl_new",
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
            LAYERS: "APWS:BaseLayer",
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
            LAYERS: "APWS:circle_boundary",
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

      this.map = new Map({
        target: "map",
        layers: [layerGroup],
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
            // console.log("top most url", url);
            fetch(url)
              .then((response) => response.json())
              .then((data) => {
                if (data.features && data.features.length > 0) {
                  const feature = data.features[0];
                  this.featureInfo = feature.properties;
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
</style>
